import { DEFAULT_SETTINGS } from './defaults';
import { mergeConfigPatch, patchFromPath } from './patch';
import { normalizeConfig } from './store';

describe('patchFromPath', () => {
    it('builds nested settings patches', () => {
        expect(patchFromPath('settings.systemInitMessage', 'hi')).toEqual({
            settings: { systemInitMessage: 'hi' },
        });
    });

    it('builds a scalar top-level patch', () => {
        expect(patchFromPath('defaultChatProvider', 'openai')).toEqual({ defaultChatProvider: 'openai' });
    });

    it('builds an id-targeted provider patch', () => {
        expect(patchFromPath('chatProviders.openai.model', 'gpt-4o')).toEqual({
            chatProviders: [{ id: 'openai', model: 'gpt-4o' }],
        });
    });

    it('rejects empty paths', () => {
        expect(() => patchFromPath('  ', 'x')).toThrow();
    });
});

describe('mergeConfigPatch', () => {
    it('merges settings per field', () => {
        const base = normalizeConfig({ settings: { systemInitMessage: 'old', maxHistoryLength: 5 } });
        const next = mergeConfigPatch(base, { settings: { systemInitMessage: 'new' } });
        expect(next.settings.systemInitMessage).toBe('new');
        expect(next.settings.maxHistoryLength).toBe(5);
    });

    it('updates a provider by id and appends a new one', () => {
        const base = normalizeConfig({
            chatProviders: [{ id: 'a', protocol: 'chat-completions', model: 'm1' }],
        });
        const next = mergeConfigPatch(base, {
            chatProviders: [
                { id: 'a', model: 'm2', models: ['m1', 'm2'] },
                { id: 'b', protocol: 'anthropic-messages', model: 'claude' },
            ],
        });
        expect(next.chatProviders).toHaveLength(2);
        expect(next.chatProviders.find(p => p.id === 'a')!.model).toBe('m2');
        expect(next.chatProviders.find(p => p.id === 'a')!.protocol).toBe('chat-completions');
        expect(next.chatProviders.find(p => p.id === 'b')!.enabled).toBe(true);
    });

    it('resets a setting via the default value', () => {
        const base = normalizeConfig({ settings: { systemInitMessage: 'custom' } });
        const next = mergeConfigPatch(base, { settings: { systemInitMessage: DEFAULT_SETTINGS.systemInitMessage } });
        expect(next.settings.systemInitMessage).toBe(DEFAULT_SETTINGS.systemInitMessage);
    });

    it('rejects a non-object settings patch', () => {
        const base = normalizeConfig({});
        expect(() => mergeConfigPatch(base, { settings: 1 })).toThrow();
    });

    it('rejects unknown top-level and settings keys', () => {
        const base = normalizeConfig({});
        expect(() => mergeConfigPatch(base, { totallyUnknown: 1 })).toThrow(/Unknown config key/);
        expect(() => mergeConfigPatch(base, { settings: { notASetting: 1 } })).toThrow(/Unknown setting/);
    });

    it('deep-merges nested provider options instead of replacing them', () => {
        const base = normalizeConfig({
            chatProviders: [{ id: 'w', protocol: 'workers', model: 'm', options: { accountId: 'a', token: 'secret' } }],
        });
        const next = mergeConfigPatch(base, { chatProviders: [{ id: 'w', options: { accountId: 'b' } }] });
        expect(next.chatProviders[0].options).toEqual({ accountId: 'b', token: 'secret' });
    });

    it('rejects provider paths shorter than list.id.field', () => {
        expect(() => patchFromPath('chatProviders.openai', 'x')).toThrow();
    });
});
