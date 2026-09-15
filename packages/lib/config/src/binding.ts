export interface KVNamespaceBinding {
    get: (key: string) => Promise<string | any>;
    put: (key: string, value: string, info?: { expirationTtl?: number; expiration?: number }) => Promise<void>;
    delete: (key: string) => Promise<void>;
}

export interface APIGuardBinding {
    fetch: (request: Request) => Promise<Response>;
}

export type AiTextGenerationOutput = ReadableStream<Uint8Array> | { response?: string };
export type AiTextToImageOutput = ReadableStream<Uint8Array> | { image?: string };

/** `env.AI.models()` 返回的条目;列模型只需要 name */
export interface AiModelSearchObject {
    id?: string;
    name?: string;
    task?: unknown;
}

export abstract class WorkerAIBinding {
    abstract run(model: string, body: { messages: any[]; stream: boolean }): Promise<AiTextGenerationOutput>;
    abstract run(model: string, body: { prompt: string }): Promise<AiTextToImageOutput>;
    /** 可选:用于按任务类型列出模型;缺失时回退到 accountId + token 的 REST 搜索 */
    models?(params?: { task?: string; page?: number; per_page?: number }): Promise<AiModelSearchObject[]>;
}
