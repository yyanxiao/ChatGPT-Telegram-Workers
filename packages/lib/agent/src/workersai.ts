import type { CompletionOptions } from '@chatgpt-telegram-workers/ai';
import type { AppSettings, ChatProviderConfig, ImageProviderConfig } from '@chatgpt-telegram-workers/config';
import type { ChatAgent, ImageAgent } from './types';
import { createClient, createImageClient, workersCredentials } from '@chatgpt-telegram-workers/ai';
import { ENV } from '@chatgpt-telegram-workers/config';
import { chatAbortSignal } from './providers';
import { consumeTextStream } from './stream';

/** 传输细节全在 ai 包;这里只负责取绑定/凭据并套用 agent 的流式策略 */
export function createWorkersChat(provider: ChatProviderConfig, settings: AppSettings): ChatAgent | null {
    const { accountId, token } = workersCredentials(provider.options);
    const binding = ENV.AI_BINDING ?? undefined;
    if (!binding && (!accountId || !token)) {
        // 未配置凭据时跳过该 provider,而不是抛错导致所有 provider 一起失败
        console.warn(`Workers provider "${provider.id}" skipped: missing AI binding or account id/token`);
        return null;
    }
    const client = createClient('workers', { binding, accountId, apiKey: token });
    return {
        name: provider.id,
        label: provider.label || 'Cloudflare Workers AI',
        model: provider.model,
        modelList: async () => provider.models,
        chat: async (messages, onStream) => {
            const extra = provider.extraParams ?? {};
            const { signal, clear } = chatAbortSignal(settings);
            const options: CompletionOptions = {
                model: provider.model,
                system: settings.systemInitMessage || undefined,
                messages,
                signal,
                ...(settings.maxOutputTokens > 0 ? { maxTokens: settings.maxOutputTokens } : {}),
                ...(Object.keys(extra).length ? { extra } : {}),
            };
            try {
                if (onStream) {
                    return await consumeTextStream(
                        client.stream(options),
                        onStream,
                        settings.telegramMinStreamInterval,
                    );
                }
                return (await client.complete(options)).text;
            } finally {
                clear();
            }
        },
    };
}

export function createWorkersImage(provider: ImageProviderConfig): ImageAgent {
    const { accountId, token } = workersCredentials(provider.options);
    return {
        name: provider.id,
        label: provider.label || 'Cloudflare Workers AI',
        model: provider.model,
        modelList: async () => provider.models,
        generate: async prompt => {
            const binding = ENV.AI_BINDING ?? undefined;
            if (!binding && (!accountId || !token)) {
                throw new Error('Cloudflare account ID and token are required');
            }
            return createImageClient('workers', { model: provider.model, binding, accountId, apiKey: token }).generate(
                prompt,
            );
        },
    };
}
