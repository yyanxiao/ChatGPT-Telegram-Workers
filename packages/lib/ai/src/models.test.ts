import { fetchModels } from './models';
import { jsonResponse } from './testing';

function withFetch(mock: ReturnType<typeof vi.fn>) {
    const original = globalThis.fetch;
    globalThis.fetch = mock as any;
    return () => {
        globalThis.fetch = original;
    };
}

describe('fetchModels', () => {
    it('lists openai-compatible models with bearer auth', async () => {
        const mock = vi
            .fn()
            .mockResolvedValue(jsonResponse({ data: [{ id: 'gpt-4o' }, { id: 'gpt-4o-mini' }, { id: 42 }] }));
        const restore = withFetch(mock);
        try {
            const models = await fetchModels(
                'chat-completions',
                { protocol: 'chat-completions', baseUrl: 'https://proxy.example/v1/', apiKey: 'sk', options: {} },
                'chat',
            );
            expect(models).toEqual(['gpt-4o', 'gpt-4o-mini']);
            const [url, init] = mock.mock.calls[0];
            expect(url).toBe('https://proxy.example/v1/models');
            expect(init.headers.Authorization).toBe('Bearer sk');
        } finally {
            restore();
        }
    });

    it('lists anthropic models with api key headers', async () => {
        const mock = vi.fn().mockResolvedValue(jsonResponse({ data: [{ id: 'claude-sonnet-4' }] }));
        const restore = withFetch(mock);
        try {
            const models = await fetchModels(
                'anthropic-messages',
                { protocol: 'anthropic-messages', baseUrl: '', apiKey: 'ak', options: {} },
                'chat',
            );
            expect(models).toEqual(['claude-sonnet-4']);
            const [url, init] = mock.mock.calls[0];
            expect(url).toBe('https://api.anthropic.com/v1/models');
            expect(init.headers['x-api-key']).toBe('ak');
            expect(init.headers['anthropic-version']).toBe('2023-06-01');
        } finally {
            restore();
        }
    });

    it('searches cloudflare models per task type', async () => {
        const mock = vi
            .fn()
            .mockResolvedValue(jsonResponse({ result: [{ name: '@cf/stable-diffusion-xl' }, { name: null }] }));
        const restore = withFetch(mock);
        try {
            const models = await fetchModels(
                'workers',
                { protocol: 'workers', baseUrl: '', apiKey: '', options: { accountId: 'acc', token: 'tok' } },
                'image',
            );
            expect(models).toEqual(['@cf/stable-diffusion-xl']);
            expect(mock.mock.calls[0][0]).toContain('accounts/acc/ai/models/search?task=Text-to-Image');
        } finally {
            restore();
        }
    });

    it('throws for workers without credentials and returns empty for unknown protocols', async () => {
        const restore = withFetch(vi.fn());
        try {
            await expect(
                fetchModels('workers', { protocol: 'workers', baseUrl: '', apiKey: '', options: {} }, 'chat'),
            ).rejects.toThrow('account ID and token');
            await expect(
                fetchModels('unknown', { protocol: 'unknown', baseUrl: '', apiKey: '', options: {} }, 'chat'),
            ).resolves.toEqual([]);
        } finally {
            restore();
        }
    });
});
