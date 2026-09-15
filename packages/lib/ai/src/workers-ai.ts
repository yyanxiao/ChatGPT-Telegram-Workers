import type { SSEMessage } from './sse';
import type {
    ClientConfig,
    CompletionOptions,
    CompletionResult,
    LLMClient,
    Protocol,
    SSEParseResult,
    WorkersAIBinding,
    WorkersImageOutput,
    WorkersTextOutput,
} from './types';
import { buildChatCompletionsBody, ChatCompletionsClient } from './chat-completions';
import { parseJSONSync } from './fetch';
import { adaptMessageImages } from './image';
import { iterSSEMessages, isDoneSentinel } from './sse';

/** 从 provider.options 提取 Workers AI 凭据 */
export function workersCredentials(options: Record<string, unknown> | undefined): { accountId: string; token: string } {
    const pick = (key: string) => {
        const value = options?.[key];
        return typeof value === 'string' ? value.trim() : '';
    };
    return { accountId: pick('accountId'), token: pick('token') };
}

/** Cloudflare Workers AI 账户级端点根,不区分文本/图片 */
export function workersApiBaseUrl(accountId: string): string {
    return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai`;
}

/** 文本生成的 OpenAI 兼容端点 */
export function workersChatBaseUrl(accountId: string): string {
    return `${workersApiBaseUrl(accountId)}/v1`;
}

/** 图片生成端点(绑定之外的 REST 路径) */
export function workersImageRunUrl(accountId: string, model: string): string {
    return `${workersApiBaseUrl(accountId)}/run/${model}`;
}

/** 绑定返回的 SSE 中增量文本位于 `data.response` 字段;错误在 `errors[0].message` */
export function parseWorkersSSE(sse: SSEMessage): SSEParseResult {
    if (isDoneSentinel(sse.data)) {
        return { finish: true };
    }
    const payload = parseJSONSync(sse.data);
    const error = payload?.errors?.[0]?.message;
    if (typeof error === 'string' && error) {
        return { error };
    }
    const delta = payload?.response;
    return typeof delta === 'string' ? { delta } : {};
}

async function* bindingTextStream(output: WorkersTextOutput): AsyncIterable<string> {
    if (!(output instanceof ReadableStream)) {
        yield* bindingOutputToText(output);
        return;
    }
    const response = new Response(output, { headers: { 'content-type': 'text/event-stream' } });
    for await (const sse of iterSSEMessages(response)) {
        const { delta, finish, error } = parseWorkersSSE(sse);
        if (error) {
            throw new Error(error);
        }
        if (finish) {
            return;
        }
        if (delta) {
            yield delta;
        }
    }
}

/** 非流式绑定输出:优先文本,失败时抛出 Cloudflare 的错误信息 */
function bindingOutputToText(output: WorkersTextOutput): string {
    const error = (output as { errors?: Array<{ message?: string }> }).errors?.[0]?.message;
    if (error) {
        throw new Error(error);
    }
    if (output instanceof ReadableStream) {
        throw new Error('Unexpected streaming output for a non-streaming request');
    }
    return output.response ?? '';
}

function bindingImageResponse(output: WorkersImageOutput): Response {
    if (output instanceof ReadableStream) {
        return new Response(output, { headers: { 'content-type': 'image/jpeg' } });
    }
    return Response.json({ result: output });
}

function base64ToBlob(base64: string, mimeType: string): Blob {
    const binary = atob(base64);
    return new Blob([Uint8Array.from(binary, c => c.charCodeAt(0))], { type: mimeType });
}

/** 把 Workers AI 的图片响应(JSON 里的 base64 或二进制流)统一成 Blob */
export async function workersImageToBlob(output: Response): Promise<Blob> {
    const contentType = output.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const { result } = (await output.json()) as { result?: { image?: unknown } };
        const image = result?.image;
        if (typeof image !== 'string') {
            throw new TypeError('Invalid image response');
        }
        return base64ToBlob(image, 'image/png');
    }
    return output.blob();
}

/**
 * Workers AI 文本协议:有绑定时走 `env.AI.run`(支持流式),
 * 否则回退到 REST —— 它本身就是 OpenAI 兼容的 chat-completions。
 */
export class WorkersAIClient implements LLMClient {
    readonly protocol: Protocol = 'workers';
    private readonly config: ClientConfig;
    private readonly fallback: ChatCompletionsClient | null;

    constructor(config: ClientConfig = {}) {
        this.config = config;
        this.fallback = config.binding
            ? null
            : new ChatCompletionsClient({
                  ...config,
                  baseUrl: config.baseUrl || (config.accountId ? workersChatBaseUrl(config.accountId) : undefined),
              });
    }

    /** 绑定调用把 model 作为 run 的第一个参数,body 里不再重复携带 */
    private bindingBody(options: CompletionOptions, stream: boolean): { messages: unknown[]; stream: boolean } {
        const { model: _model, stream: _stream, ...body } = buildChatCompletionsBody(options, false);
        return { ...body, stream };
    }

    private rest(): ChatCompletionsClient {
        if (!this.config.baseUrl && !this.config.accountId) {
            throw new Error('Cloudflare account ID is required');
        }
        if (!this.fallback) {
            throw new Error('Cloudflare Workers AI binding is unavailable');
        }
        return this.fallback;
    }

    /** workers 是纯文本协议:先剥离图片再交给绑定或 REST */
    private async adapt(options: CompletionOptions): Promise<CompletionOptions> {
        return { ...options, messages: await adaptMessageImages(options.messages, 'none', this.config.fetch) };
    }

    async complete(options: CompletionOptions): Promise<CompletionResult> {
        const adapted = await this.adapt(options);
        const binding = this.config.binding;
        if (!binding) {
            return this.rest().complete(adapted);
        }
        const output = await binding.run(adapted.model, this.bindingBody(adapted, false));
        return { text: bindingOutputToText(output) };
    }

    async *stream(options: CompletionOptions): AsyncIterable<string> {
        const adapted = await this.adapt(options);
        const binding = this.config.binding;
        if (!binding) {
            yield* this.rest().stream(adapted);
            return;
        }
        const output = await binding.run(adapted.model, this.bindingBody(adapted, true));
        yield* bindingTextStream(output);
    }
}

export interface WorkersImageOptions {
    model: string;
    prompt: string;
    /** 模型专属生成参数(negative_prompt/width/height/num_steps/…),合并进请求体 */
    extraParams?: Record<string, unknown>;
    /** 优先使用的绑定 */
    binding?: WorkersAIBinding;
    /** 无绑定时的 REST 凭据 */
    accountId?: string;
    apiKey?: string;
    fetch?: typeof fetch;
}

/** 生成图片:有绑定走绑定,否则 POST 到 `/ai/run/{model}`,`prompt` 固定不被 extraParams 覆盖 */
export async function generateWorkersImage(options: WorkersImageOptions): Promise<Blob> {
    const body = { ...options.extraParams, prompt: options.prompt };
    if (options.binding) {
        return workersImageToBlob(bindingImageResponse(await options.binding.run(options.model, body)));
    }
    if (!options.accountId) {
        throw new Error('Cloudflare account ID is required');
    }
    const doFetch = options.fetch || fetch;
    const response = await doFetch(workersImageRunUrl(options.accountId, options.model), {
        method: 'POST',
        headers: {
            ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return workersImageToBlob(response);
}
