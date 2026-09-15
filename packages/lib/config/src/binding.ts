import type { Ai } from '@cloudflare/workers-types';

export interface KVNamespaceBinding {
    get: (key: string) => Promise<string | any>;
    put: (key: string, value: string, info?: { expirationTtl?: number; expiration?: number }) => Promise<void>;
    delete: (key: string) => Promise<void>;
}

export interface APIGuardBinding {
    fetch: (request: Request) => Promise<Response>;
}

/**
 * Workers AI 绑定(`env.AI`):直接采用官方 `@cloudflare/workers-types` 的 `Ai`。
 * 不再手写 `run` 的结构体,模型与输入/输出的定义始终与 Cloudflare 对齐。
 */
export type WorkerAIBinding = Ai;
