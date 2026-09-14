import type { AppConfig } from './types';
import { DEFAULT_SETTINGS } from './defaults';
import { normalizeConfig } from './store';

/** 补丁中按 id 合并的列表字段 */
const LIST_KEYS = ['chatProviders', 'imageProviders', 'plugins', 'customCommands'];

/** 允许补丁覆盖的顶层字段 */
const TOP_LEVEL_KEYS = new Set(['defaultChatProvider', 'defaultImageProvider', 'settings', ...LIST_KEYS]);

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** 递归深合并:纯对象逐键合并,数组/标量整体替换 */
function deepMerge(base: unknown, incoming: unknown): unknown {
    if (!isRecord(base) || !isRecord(incoming)) {
        return incoming;
    }
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(incoming)) {
        result[key] = isRecord(value) && isRecord(result[key]) ? deepMerge(result[key], value) : value;
    }
    return result;
}

function mergeById(base: { id?: string }[], incoming: unknown): { id?: string }[] {
    if (!Array.isArray(incoming)) {
        throw new Error('Expected an array');
    }
    const result = [...base];
    for (const raw of incoming) {
        if (!isRecord(raw)) {
            continue;
        }
        const id = typeof raw.id === 'string' ? raw.id : '';
        const index = id ? result.findIndex(item => item.id === id) : -1;
        if (index >= 0) {
            // 深合并,避免部分 patch 抹掉 provider.options / plugin.env 的其它键
            result[index] = deepMerge(result[index], raw) as { id?: string };
        } else {
            result.push(raw);
        }
    }
    return result;
}

/**
 * 把补丁合并进配置,用于管理页快捷指令修改全局配置:
 * - `settings` 按键浅合并;
 * - 提供商/插件/自定义命令列表按 `id` 合并(新 id 追加,嵌套对象深合并);
 * - 其余顶层字段直接覆盖。
 * 未知的顶层/settings 键会抛错,避免“看似成功实则丢弃”。
 */
export function mergeConfigPatch(base: AppConfig, patch: Record<string, unknown>): AppConfig {
    const merged: Record<string, unknown> = { ...structuredClone(base) };
    for (const [key, value] of Object.entries(patch)) {
        if (!TOP_LEVEL_KEYS.has(key)) {
            throw new Error(`Unknown config key: ${key}`);
        }
        if (key === 'settings') {
            if (!isRecord(value)) {
                throw new Error('settings must be an object');
            }
            for (const settingKey of Object.keys(value)) {
                if (!Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, settingKey)) {
                    throw new Error(`Unknown setting: ${settingKey}`);
                }
            }
            merged.settings = { ...(merged.settings as Record<string, unknown>), ...value };
        } else if (LIST_KEYS.includes(key)) {
            merged[key] = mergeById((merged[key] as { id?: string }[]) || [], value);
        } else {
            merged[key] = value;
        }
    }
    return normalizeConfig(merged);
}

/**
 * 把点分路径展开成嵌套补丁,例如:
 * - `settings.systemInitMessage` → `{settings:{systemInitMessage:...}}`
 * - `defaultChatProvider` → `{defaultChatProvider:...}`
 * - `chatProviders.openai.model` → `{chatProviders:[{id:'openai',model:...}]}`
 */
export function patchFromPath(path: string, value: unknown): Record<string, unknown> {
    const parts = path
        .split('.')
        .map(part => part.trim())
        .filter(Boolean);
    if (parts.length === 0) {
        throw new Error('Empty key');
    }

    if (parts[0] === 'chatProviders' || parts[0] === 'imageProviders') {
        if (parts.length < 3) {
            throw new Error(`Provider key needs <list>.<id>.<field>: ${path}`);
        }
        const item: Record<string, unknown> = { id: parts[1] };
        let node = item;
        for (let i = 2; i < parts.length - 1; i++) {
            const next: Record<string, unknown> = {};
            node[parts[i]] = next;
            node = next;
        }
        node[parts[parts.length - 1]] = value;
        return { [parts[0]]: [item] };
    }

    const root: Record<string, unknown> = {};
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
        const next: Record<string, unknown> = {};
        node[parts[i]] = next;
        node = next;
    }
    node[parts[parts.length - 1]] = value;
    return root;
}
