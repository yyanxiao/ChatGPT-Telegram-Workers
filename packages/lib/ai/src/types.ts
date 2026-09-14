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

/** Workers AI 绑定返回:文本生成 */
export type WorkersTextOutput = ReadableStream<Uint8Array> | { response?: string };
/** Workers AI 绑定返回:图片生成 */
export type WorkersImageOutput = ReadableStream<Uint8Array> | { image?: string };

/**
 * Workers AI 绑定(与 Cloudflare 的 `env.AI` 结构一致)。
 * 用结构化类型声明,binding 由调用方注入,从而 ai 包无需依赖 config。
 */
export interface WorkersAIBinding {
    run(model: string, body: { messages: unknown[]; stream: boolean }): Promise<WorkersTextOutput>;
    run(model: string, body: { prompt: string }): Promise<WorkersImageOutput>;
}

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
