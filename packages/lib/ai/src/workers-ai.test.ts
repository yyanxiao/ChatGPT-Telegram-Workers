import type { CompletionOptions, WorkersAIBinding } from './types';
import { collectStream, chunksToStream, jsonResponse, sseEvent } from './testing';
import {
    generateWorkersImage,
    parseWorkersSSE,
    WorkersAIClient,
    workersChatBaseUrl,
    workersImageRunUrl,
} from './workers-ai';

const options: CompletionOptions = {
    model: '@cf/qwen/qwen1.5-7b-chat-awq',
    system: 'be nice',
    messages: [{ role: 'user', content: 'hi' }],
    maxTokens: 256,
};

function bindingWith(impl: (model: string, body: any) => Promise<any>): WorkersAIBinding {
    return { run: impl as any };
}

describe('workers urls', () => {
    it('builds chat and image endpoints from the account id', () => {
        expect(workersChatBaseUrl('acct')).toBe('https://api.cloudflare.com/client/v4/accounts/acct/ai/v1');
        expect(workersImageRunUrl('acct', '@cf/flux')).toBe(
            'https://api.cloudflare.com/client/v4/accounts/acct/ai/run/@cf/flux',
        );
    });
});

describe('parseWorkersSSE', () => {
    it('reads the response delta', () => {
        expect(parseWorkersSSE({ event: null, data: '{"response":"he"}' })).toEqual({ delta: 'he' });
    });

    it('finishes on [DONE]', () => {
        expect(parseWorkersSSE({ event: null, data: '[DONE]' })).toEqual({ finish: true });
    });

    it('ignores non-text payloads', () => {
        expect(parseWorkersSSE({ event: null, data: '{"usage":1}' })).toEqual({});
    });
});

describe('WorkersAIClient with a binding', () => {
    it('calls the binding with model, messages and stream flag', async () => {
        const calls: any[] = [];
        const client = new WorkersAIClient({
            binding: bindingWith(async (model, body) => {
                calls.push({ model, body });
                return { response: 'hello' };
            }),
        });
        const result = await client.complete(options);
        expect(result.text).toBe('hello');
        expect(calls[0].model).toBe('@cf/qwen/qwen1.5-7b-chat-awq');
        expect(calls[0].body.stream).toBe(false);
        expect(calls[0].body.messages).toEqual([
            { role: 'system', content: 'be nice' },
            { role: 'user', content: 'hi' },
        ]);
        expect(calls[0].body.model).toBeUndefined();
    });

    it('strips image parts from messages before calling the binding', async () => {
        const calls: any[] = [];
        const client = new WorkersAIClient({
            binding: bindingWith(async (_model, body) => {
                calls.push(body);
                return { response: 'hello' };
            }),
        });
        await client.complete({
            model: '@cf/qwen/qwen1.5-7b-chat-awq',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'look' },
                        { type: 'image', image: 'https://example.com/cat.png' },
                        { type: 'image', image: new Uint8Array([1, 2, 3]) },
                    ],
                },
            ],
        });
        expect(calls[0].messages).toEqual([{ role: 'user', content: [{ type: 'text', text: 'look' }] }]);
    });

    it('streams binding SSE deltas', async () => {
        const client = new WorkersAIClient({
            binding: bindingWith(async () =>
                chunksToStream([sseEvent(null, '{"response":"he"}'), sseEvent(null, '{"response":"llo"}')]),
            ),
        });
        expect(await collectStream(client.stream(options))).toEqual(['he', 'llo']);
    });

    it('stops at [DONE]', async () => {
        const client = new WorkersAIClient({
            binding: bindingWith(async () =>
                chunksToStream([
                    sseEvent(null, '{"response":"ok"}'),
                    sseEvent(null, '[DONE]'),
                    sseEvent(null, '{"response":"nope"}'),
                ]),
            ),
        });
        expect(await collectStream(client.stream(options))).toEqual(['ok']);
    });
});

describe('WorkersAIClient REST fallback', () => {
    it('posts to the OpenAI-compatible endpoint without a binding', async () => {
        let url = '';
        const client = new WorkersAIClient({
            accountId: 'acct',
            apiKey: 'tok',
            fetch: (async (input: any) => {
                url = String(input);
                return jsonResponse({ choices: [{ message: { content: 'rest' }, finish_reason: 'stop' }] });
            }) as typeof fetch,
        });
        const result = await client.complete(options);
        expect(result.text).toBe('rest');
        expect(url).toBe('https://api.cloudflare.com/client/v4/accounts/acct/ai/v1/chat/completions');
    });

    it('throws without binding or account id', async () => {
        const client = new WorkersAIClient({});
        await expect(client.complete(options)).rejects.toThrow(/account ID/i);
    });
});

describe('generateWorkersImage', () => {
    it('uses the binding and decodes a base64 image', async () => {
        const blob = await generateWorkersImage({
            model: '@cf/flux',
            prompt: 'a cat',
            binding: bindingWith(async () => ({ image: 'QUJD' })),
        });
        expect(blob.type).toBe('image/png');
        expect(await blob.text()).toBe('ABC');
    });

    it('passes a binary binding stream through', async () => {
        const blob = await generateWorkersImage({
            model: '@cf/flux',
            prompt: 'a cat',
            binding: bindingWith(async () => chunksToStream(['abc'])),
        });
        expect(blob.type).toBe('image/jpeg');
        expect(await blob.text()).toBe('abc');
    });

    it('merges extraParams into the binding body without overriding the prompt', async () => {
        const bodies: any[] = [];
        await generateWorkersImage({
            model: '@cf/flux',
            prompt: 'a cat',
            extraParams: { prompt: 'hijacked', num_steps: 6, negative_prompt: 'blurry' },
            binding: bindingWith(async (_model, body) => {
                bodies.push(body);
                return { image: 'QUJD' };
            }),
        });
        expect(bodies[0]).toEqual({ prompt: 'a cat', num_steps: 6, negative_prompt: 'blurry' });
    });

    it('falls back to the REST run endpoint', async () => {
        let url = '';
        let body: any = null;
        const blob = await generateWorkersImage({
            model: '@cf/flux',
            prompt: 'a cat',
            extraParams: { guidance: 7.5 },
            accountId: 'acct',
            apiKey: 'tok',
            fetch: (async (input: any, init: any) => {
                url = String(input);
                body = JSON.parse(init.body);
                return new Response('imagebytes', { headers: { 'content-type': 'image/png' } });
            }) as typeof fetch,
        });
        expect(url).toBe('https://api.cloudflare.com/client/v4/accounts/acct/ai/run/@cf/flux');
        expect(body).toEqual({ prompt: 'a cat', guidance: 7.5 });
        expect(await blob.text()).toBe('imagebytes');
    });

    it('throws without binding or account id', async () => {
        await expect(generateWorkersImage({ model: 'm', prompt: 'p' })).rejects.toThrow(/account ID/i);
    });
});
