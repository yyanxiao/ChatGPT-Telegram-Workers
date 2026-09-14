import type { AppSettings } from '../shared/types';
import { esc, fragment } from '../shared/dom';

interface FieldDef {
    key: keyof AppSettings;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'list' | 'select' | 'textarea';
    options?: string[];
    placeholder?: string;
    group: GroupId;
}

type GroupId = 'general' | 'chat' | 'telegram' | 'access' | 'history' | 'image';

const GROUPS: { id: GroupId; label: string; footer?: string }[] = [
    {
        id: 'general',
        label: 'General',
        footer: 'Public Base URL is the HTTPS domain used for the webhook and admin links.',
    },
    { id: 'chat', label: 'Chat & Streaming' },
    { id: 'telegram', label: 'Telegram' },
    { id: 'access', label: 'Access Control', footer: 'Allowed IDs accept multiple values separated by commas.' },
    { id: 'history', label: 'History' },
    { id: 'image', label: 'Image Generation' },
];

const FIELDS: FieldDef[] = [
    { key: 'publicBaseUrl', label: 'Public Base URL', type: 'text', group: 'general' },
    { key: 'systemInitMessage', label: 'System Prompt', type: 'textarea', group: 'general' },
    { key: 'language', label: 'Language', type: 'select', options: ['zh-cn', 'zh-hant', 'en', 'pt'], group: 'general' },
    { key: 'updateBranch', label: 'Update Branch', type: 'text', group: 'general' },

    { key: 'streamMode', label: 'Stream Mode', type: 'boolean', group: 'chat' },
    { key: 'safeMode', label: 'Safe Mode', type: 'boolean', group: 'chat' },
    { key: 'debugMode', label: 'Debug Mode', type: 'boolean', group: 'chat' },
    { key: 'devMode', label: 'Dev Mode', type: 'boolean', group: 'chat' },
    { key: 'chatCompleteApiTimeout', label: 'API Timeout (s)', type: 'number', group: 'chat' },
    { key: 'maxOutputTokens', label: 'Max Output Tokens', type: 'number', group: 'chat' },
    { key: 'telegramMinStreamInterval', label: 'Stream Interval (ms)', type: 'number', group: 'chat' },
    {
        key: 'defaultParseMode',
        label: 'Parse Mode',
        type: 'select',
        options: ['Markdown', 'MarkdownV2', 'HTML'],
        group: 'chat',
    },
    { key: 'extraMessageContext', label: 'Extra Message Context', type: 'boolean', group: 'chat' },
    { key: 'showReplyButton', label: 'Show Reply Button', type: 'boolean', group: 'chat' },
    { key: 'hideCommandButtons', label: 'Hide Command Buttons', type: 'list', group: 'chat' },
    { key: 'modelListColumns', label: 'Model List Columns', type: 'number', group: 'chat' },

    { key: 'telegramApiDomain', label: 'Telegram API Domain', type: 'text', group: 'telegram' },
    { key: 'telegramPhotoSizeOffset', label: 'Photo Size Offset', type: 'number', group: 'telegram' },
    {
        key: 'telegramImageTransferMode',
        label: 'Image Transfer',
        type: 'select',
        options: ['base64', 'url'],
        group: 'telegram',
    },

    { key: 'allowAllUsers', label: 'Allow All Users', type: 'boolean', group: 'access' },
    { key: 'allowedUserIds', label: 'Allowed User IDs', type: 'list', group: 'access' },
    { key: 'allowedGroupIds', label: 'Allowed Group IDs', type: 'list', group: 'access' },
    { key: 'groupChatBotEnable', label: 'Group Bot Enable', type: 'boolean', group: 'access' },
    { key: 'groupChatBotShareMode', label: 'Group Share Mode', type: 'boolean', group: 'access' },

    { key: 'autoTrimHistory', label: 'Auto Trim History', type: 'boolean', group: 'history' },
    { key: 'maxHistoryLength', label: 'Max History Length', type: 'number', group: 'history' },
    { key: 'maxTokenLength', label: 'Max Token Length', type: 'number', group: 'history' },
    { key: 'historyImagePlaceholder', label: 'History Image Placeholder', type: 'text', group: 'history' },

    { key: 'imageSize', label: 'Image Size', type: 'text', group: 'image' },
    { key: 'imageQuality', label: 'Image Quality', type: 'text', group: 'image' },
    { key: 'imageStyle', label: 'Image Style', type: 'text', group: 'image' },
];

/** 全局参数:iOS 分组列表,布尔项为开关,值右对齐。 */
export class SettingsForm extends HTMLElement {
    private settings: AppSettings = {};
    private aboutInfo: { version: string | null; chat: any; image: any } | null = null;

    set value(settings: AppSettings) {
        this.settings = { ...settings };
        this.render();
    }

    /** 顶部 About 信息(版本号、当前模型),由宿主在 load 后注入 */
    set about(v: { version: string | null; chat: any; image: any } | null) {
        this.aboutInfo = v;
        if (this.settings) {
            this.render();
        }
    }

    get value(): AppSettings {
        const out: AppSettings = { ...this.settings };
        for (const field of FIELDS) {
            const input = this.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
                `[name="${field.key}"]`,
            );
            if (!input) {
                continue;
            }
            if (field.type === 'boolean') {
                out[field.key] = (input as HTMLInputElement).checked;
            } else if (field.type === 'number') {
                out[field.key] = Number(input.value);
            } else if (field.type === 'list') {
                out[field.key] = input.value
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
            } else {
                out[field.key] = input.value || (field.key === 'historyImagePlaceholder' ? null : input.value);
            }
        }
        return out;
    }

    private renderField(field: FieldDef): string {
        const value = this.settings[field.key];
        const name = `name="${field.key}"`;
        if (field.type === 'boolean') {
            return `<label class="list-row">
                <span class="row-main"><span class="row-title">${esc(field.label)}</span></span>
                <input type="checkbox" class="switch" ${name} ${value ? 'checked' : ''} aria-label="${esc(field.label)}" />
            </label>`;
        }
        if (field.type === 'textarea') {
            return `<div class="row-stack">
                <span class="row-label">${esc(field.label)}</span>
                <textarea class="bare" ${name} aria-label="${esc(field.label)}">${esc(value ?? '')}</textarea>
            </div>`;
        }
        let control: string;
        if (field.type === 'number') {
            control = `<input class="bare" type="number" inputmode="decimal" ${name} value="${esc(value ?? 0)}" aria-label="${esc(field.label)}" />`;
        } else if (field.type === 'list') {
            const list = Array.isArray(value) ? value.join(', ') : '';
            control = `<input class="bare" type="text" ${name} value="${esc(list)}" placeholder="Comma separated" aria-label="${esc(field.label)}" />`;
        } else if (field.type === 'select') {
            const opts = (field.options || [])
                .map(o => `<option value="${esc(o)}" ${o === value ? 'selected' : ''}>${esc(o)}</option>`)
                .join('');
            control = `<select class="bare" ${name} aria-label="${esc(field.label)}">${opts}</select>`;
        } else {
            control = `<input class="bare" type="text" ${name} value="${esc(value ?? '')}" placeholder="${esc(field.placeholder || '')}" aria-label="${esc(field.label)}" />`;
        }
        return `<div class="row-field">
            <span class="row-label">${esc(field.label)}</span>
            ${control}
        </div>`;
    }

    private render(): void {
        const sections = GROUPS.map(group => {
            const rows = FIELDS.filter(f => f.group === group.id)
                .map(f => this.renderField(f))
                .join('');
            const footer = group.footer ? `<p class="group-footer">${esc(group.footer)}</p>` : '';
            return `<h2 class="section-h">${esc(group.label)}</h2><section class="list-group">${rows}</section>${footer}`;
        }).join('');
        // About:版本号与当前模型摘要(原 /version、/system 的信息移到这里)
        const a = this.aboutInfo;
        const modelText = (x: any): string => (x ? `${x.label || x.name} · ${x.model}` : 'Not configured');
        const about = a
            ? `<h2 class="section-h">About</h2>
               <section class="list-group">
                   <div class="list-row">
                       <span class="row-main"><span class="row-title">Version</span></span>
                       <span class="row-value mono">${esc(a.version || 'unknown')}</span>
                   </div>
                   <div class="list-row">
                       <span class="row-main"><span class="row-title">Chat Model</span></span>
                       <span class="row-value">${esc(modelText(a.chat))}</span>
                   </div>
                   <div class="list-row">
                       <span class="row-main"><span class="row-title">Image Model</span></span>
                       <span class="row-value">${esc(modelText(a.image))}</span>
                   </div>
               </section>`
            : '';
        this.replaceChildren(fragment(sections + about));
    }
}

customElements.define('settings-form', SettingsForm);
