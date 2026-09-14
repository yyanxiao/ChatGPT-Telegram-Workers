import { workersCredentials } from './workers-ai';

export type ProviderKind = 'chat' | 'image';

/**
 * 拉取模型列表所需的最小字段集。
 * 同时兼容 config 中的 provider 和管理页传入的脱敏 provider。
 */
export interface ModelSource {
    protocol: string;
    baseUrl: string;
    apiKey: string;
    options: Record<string, unknown>;
}

const OPENAI_DEFAULT_BASE = 'https://api.openai.com/v1';
const ANTHROPIC_DEFAULT_BASE = 'https://api.anthropic.com/v1';

function trimBase(url: string): string {
    return url.trim().replace(/\/+$/, '');
}

async function getJSON(url: string, headers: Record<string, string>): Promise<any> {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        let detail = `${response.status} ${response.statusText}`;
        try {
            const data = await response.json();
            detail = data?.error?.message || data?.message || detail;
        } catch {
            // 保留状态文本
        }
        throw new Error(detail);
    }
    return response.json();
}

function idsFrom(data: any): string[] {
    if (!Array.isArray(data?.data)) {
        return [];
    }
    return data.data
        .map((item: any) => item?.id)
        .filter((id: unknown): id is string => typeof id === 'string' && id.length > 0);
}

/**
 * 从提供商拉取可选模型列表。
 * - chat-completions / responses / images:GET {base}/models(Bearer)
 * - anthropic-messages:GET {base}/models(x-api-key + anthropic-version)
 * - workers:Cloudflare 模型搜索接口(按任务类型)
 */
export async function fetchModels(protocol: string, provider: ModelSource, kind: ProviderKind): Promise<string[]> {
    switch (protocol) {
        case 'chat-completions':
        case 'responses':
        case 'images': {
            const base = trimBase(provider.baseUrl) || OPENAI_DEFAULT_BASE;
            const data = await getJSON(`${base}/models`, {
                Authorization: `Bearer ${provider.apiKey}`,
            });
            return idsFrom(data);
        }
        case 'anthropic-messages': {
            const base = trimBase(provider.baseUrl) || ANTHROPIC_DEFAULT_BASE;
            const data = await getJSON(`${base}/models`, {
                'x-api-key': provider.apiKey,
                'anthropic-version': '2023-06-01',
            });
            return idsFrom(data);
        }
        case 'workers': {
            const { accountId, token } = workersCredentials(provider.options);
            if (!accountId || !token) {
                throw new Error('Cloudflare account ID and token are required');
            }
            const task = kind === 'image' ? 'Text-to-Image' : 'Text Generation';
            const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/models/search?task=${encodeURIComponent(task)}`;
            const data = await getJSON(url, { Authorization: `Bearer ${token}` });
            if (!Array.isArray(data?.result)) {
                return [];
            }
            return data.result
                .map((model: any) => model?.name)
                .filter((name: unknown): name is string => typeof name === 'string' && name.length > 0);
        }
        default:
            return [];
    }
}
