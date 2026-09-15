import type { Ai, AiModelsSearchObject, AiModelsSearchParams } from '@cloudflare/workers-types';
import type { ChatProtocol } from './protocols';

export type ImageInput = string | URL | Uint8Array;

export interface TextPart {
    type: 'text';
    text: string;
}

export interface ImagePart {
    type: 'image';
    image: ImageInput;
    mimeType?: string;
}

export type Part = TextPart | ImagePart;

export type Role = 'system' | 'user' | 'assistant';

export interface Message {
    role: Role;
    content: string | Part[];
}

export interface Usage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
}

export interface CompletionOptions {
    model: string;
    messages: Message[];
    system?: string;
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    stop?: string | string[];
    signal?: AbortSignal;
    headers?: Record<string, string>;
    extra?: Record<string, unknown>;
}

export interface CompletionResult {
    text: string;
    usage?: Usage;
    stopReason?: string | null;
}

/** 聊天协议标识(与 protocols.ts 的 ChatProtocol 同一来源) */
export type Protocol = ChatProtocol;

/**
 * `models()` 返回的条目。字段取自官方 `AiModelsSearchObject`(来源变更会在编译期暴露),
 * 但整体保持宽松:绑定与账号级 REST 搜索共用此形状,后者是不受信任的 JSON,
 * 因此字段可选、`task` 不做收窄,由解析方按运行时形状判断。
 */
export type WorkersAIModelInfo = Partial<Pick<AiModelsSearchObject, 'id' | 'name'>> & { task?: unknown };

/**
 * 需要 multipart 信封的图片输入(flux-2 系列等)。
 * `body` 是 FormData 编码后的流,`contentType` 必须带上与之一致的 boundary,
 * 否则 Cloudflare 会以 5006 "required properties at '/' are 'multipart'" 拒绝。
 *
 * 必须是 type 而非 interface:interface 没有隐式索引签名,无法赋给官方 `Ai.run`
 * 兜底重载的 `Record<string, unknown>` 参数。
 */
export type WorkersImageMultipartInput = {
    multipart: {
        body: ReadableStream<Uint8Array>;
        contentType?: string | null;
    };
};

/** 扁平的图片生成参数,至少含 prompt */
export type WorkersImageParams = { prompt: string } & Record<string, unknown>;

/**
 * 图片生成输入:
 * - 普通模型是扁平的生成参数(至少含 prompt);
 * - 输入 schema 要求 `multipart` 的模型必须用信封包裹(见上)。
 */
export type WorkersImageInput = WorkersImageParams | WorkersImageMultipartInput;

/**
 * Workers AI 绑定:直接以官方 `@cloudflare/workers-types` 的 `Ai` 为基础,
 * 不再手写 `run` 的结构体,模型与输入/输出的定义始终与 Cloudflare 对齐。
 *
 * 只取实际用到的成员:`models` 保持可选(老运行时可能没有该方法,缺失时回退到
 * 账户级 REST 列表)。官方 `Ai` 满足此类型,由 types.test.ts 的编译期断言守护。
 */
export type WorkersAIBinding = Pick<Ai, 'run'> & {
    models?(params?: AiModelsSearchParams): Promise<WorkersAIModelInfo[]>;
};

/** 图片传输方式:URL 直传,或抓取后内联为 base64 */
export type ImageTransfer = 'url' | 'base64';

export interface ClientConfig {
    apiKey?: string;
    /** 自定义携带 API Key 的请求头名(缺省按协议内置:Bearer / x-api-key);Azure 用 `api-key` */
    apiKeyHeader?: string;
    baseUrl?: string;
    headers?: Record<string, string>;
    fetch?: typeof fetch;
    /** 图片传输方式,仅对同时支持 URL 与 base64 的协议生效(见 protocols.ts 的 chatImageSupport) */
    imageTransfer?: ImageTransfer;
    /** workers 协议:Cloudflare 账号 id,用于拼接 REST 端点 */
    accountId?: string;
    /** workers 协议:优先使用的 AI 绑定,缺省时回退到 REST */
    binding?: WorkersAIBinding;
}

export interface LLMClient {
    readonly protocol: Protocol;
    complete: (options: CompletionOptions) => Promise<CompletionResult>;
    stream: (options: CompletionOptions) => AsyncIterable<string>;
}

export interface SSEParseResult {
    delta?: string;
    finish?: boolean;
    error?: string;
}
