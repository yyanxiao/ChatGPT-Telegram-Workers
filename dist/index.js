import require$$0 from 'url';

const en = {
  env: { system_init_message: "You are a helpful assistant" },
  command: {
    help: {
      summary: "The following commands are currently supported:\n",
      help: "Get command help",
      new: "Start a new conversation",
      start: "Get your ID and start a new conversation",
      img: "Generate an image, the complete command format is `/img image description`, for example `/img beach at moonlight`",
      version: "Get the current version number to determine whether to update",
      system: "View some system information",
      redo: "Redo the last conversation, /redo with modified content or directly /redo",
      echo: "Echo the message",
      models: "switch chat model",
      admin: "Open the admin panel (Mini App)"
    },
    new: { new_chat_start: "A new conversation has started" }
  },
  callback_query: {
    open_model_list: "Open models list",
    select_provider: "Select a provider:",
    select_model: "Choose model:",
    change_model: "Change model to "
  }
};
const pt = {
  env: { system_init_message: "Você é um assistente útil" },
  command: {
    help: {
      summary: "Os seguintes comandos são suportados atualmente:\n",
      help: "Obter ajuda sobre comandos",
      new: "Iniciar uma nova conversa",
      start: "Obter seu ID e iniciar uma nova conversa",
      img: "Gerar uma imagem, o formato completo do comando é `/img descrição da imagem`, por exemplo `/img praia ao luar`",
      version: "Obter o número da versão atual para determinar se é necessário atualizar",
      system: "Ver algumas informações do sistema",
      redo: "Refazer a última conversa, /redo com conteúdo modificado ou diretamente /redo",
      echo: "Repetir a mensagem",
      models: "Mudar o modelo de diálogo",
      admin: "Abrir o painel de administração (Mini App)"
    },
    new: { new_chat_start: "Uma nova conversa foi iniciada" }
  },
  callback_query: {
    open_model_list: "Abra a lista de modelos",
    select_provider: "Escolha um fornecedor de modelos.:",
    select_model: "Escolha um modelo:",
    change_model: "O modelo de diálogo já foi modificado para"
  }
};
const zhHans = {
  env: { system_init_message: "你是一个得力的助手" },
  command: {
    help: {
      summary: "当前支持以下命令:\n",
      help: "获取命令帮助",
      new: "发起新的对话",
      start: "获取你的ID, 并发起新的对话",
      img: "生成一张图片, 命令完整格式为 `/img 图片描述`, 例如`/img 月光下的沙滩`",
      version: "获取当前版本号, 判断是否需要更新",
      system: "查看当前一些系统信息",
      redo: "重做上一次的对话, /redo 加修改过的内容 或者 直接 /redo",
      echo: "回显消息",
      models: "切换对话模型",
      admin: "打开管理后台 (Mini App)"
    },
    new: { new_chat_start: "新的对话已经开始" }
  },
  callback_query: {
    open_model_list: "打开模型列表",
    select_provider: "选择一个模型提供商:",
    select_model: "选择一个模型:",
    change_model: "对话模型已修改至"
  }
};
const zhHant = {
  env: { system_init_message: "你是一個得力的助手" },
  command: {
    help: {
      summary: "當前支持的命令如下：\n",
      help: "獲取命令幫助",
      new: "開始一個新對話",
      start: "獲取您的ID並開始一個新對話",
      img: "生成圖片，完整命令格式為`/img 圖片描述`，例如`/img 海灘月光`",
      version: "獲取當前版本號確認是否需要更新",
      system: "查看一些系統信息",
      redo: "重做上一次的對話 /redo 加修改過的內容 或者 直接 /redo",
      echo: "回显消息",
      models: "切換對話模式",
      admin: "打開管理後台 (Mini App)"
    },
    new: { new_chat_start: "開始一個新對話" }
  },
  callback_query: {
    open_model_list: "打開模型清單",
    select_provider: "選擇一個模型供應商:",
    select_model: "選擇一個模型:",
    change_model: "對話模型已經修改至"
  }
};
function loadI18n(lang) {
  switch (lang?.toLowerCase()) {
    case "cn":
    case "zh-cn":
    case "zh-hans":
      return zhHans;
    case "zh-tw":
    case "zh-hk":
    case "zh-mo":
    case "zh-hant":
      return zhHant;
    case "pt":
    case "pt-br":
      return pt;
    case "en":
    case "en-us":
      return en;
    default:
      return en;
  }
}
const DEFAULT_SETTINGS = {
  language: "zh-cn",
  updateBranch: "master",
  publicBaseUrl: "",
  telegramApiDomain: "https://api.telegram.org",
  defaultParseMode: "Markdown",
  systemInitMessage: null,
  streamMode: true,
  chatCompleteApiTimeout: 0,
  maxOutputTokens: 0,
  telegramMinStreamInterval: 0,
  telegramPhotoSizeOffset: 1,
  telegramImageTransferMode: "base64",
  modelListColumns: 1,
  allowAllUsers: false,
  allowedUserIds: [],
  allowedGroupIds: [],
  groupChatBotEnable: true,
  groupChatBotShareMode: true,
  autoTrimHistory: true,
  maxHistoryLength: 20,
  maxTokenLength: -1,
  historyImagePlaceholder: null,
  showReplyButton: false,
  extraMessageContext: false,
  extraMessageMediaCompatible: ["image"],
  hideCommandButtons: [],
  safeMode: true,
  debugMode: false,
  devMode: false,
  imageSize: "1024x1024",
  imageQuality: "standard",
  imageStyle: "vivid"
};
const DEFAULT_CONFIG = {
  version: 1,
  defaultChatProvider: null,
  defaultImageProvider: null,
  settings: { ...DEFAULT_SETTINGS },
  chatProviders: [],
  imageProviders: [],
  plugins: [],
  customCommands: []
};
function cloneDefaultConfig() {
  return structuredClone(DEFAULT_CONFIG);
}
const MASKED_API_KEY = "••••••••";
const GLOBAL_CONFIG_KEY = "config:global";
function asString(value, fallback = "") {
  return typeof value === "string" ? value : value === null || value === void 0 ? fallback : String(value);
}
function asStringArray(value) {
  if (Array.isArray(value)) {
    return value.filter((v) => typeof v === "string");
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
}
function normalizeSettings(raw) {
  const input = asRecord(raw);
  const settings = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS)) {
    const value = input[key];
    if (value === void 0) {
      continue;
    }
    const fallback = DEFAULT_SETTINGS[key];
    if (typeof fallback === "boolean") {
      settings[key] = value === true || value === "true";
    } else if (typeof fallback === "number") {
      const blank = value === null || value === void 0 || value === "";
      const n = blank ? Number.NaN : Number(value);
      settings[key] = Number.isFinite(n) ? n : fallback;
    } else if (Array.isArray(fallback)) {
      settings[key] = asStringArray(value);
    } else if (fallback === null) {
      settings[key] = value === null || value === void 0 || value === "" ? null : String(value);
    } else {
      settings[key] = asString(value, fallback);
    }
  }
  if (settings.telegramImageTransferMode !== "url" && settings.telegramImageTransferMode !== "base64") {
    settings.telegramImageTransferMode = DEFAULT_SETTINGS.telegramImageTransferMode;
  }
  return settings;
}
const LEGACY_CHAT_PROTOCOL = {
  openai: "chat-completions",
  mistral: "chat-completions",
  deepseek: "chat-completions",
  groq: "chat-completions",
  xai: "chat-completions",
  cohere: "chat-completions",
  azure: "chat-completions",
  gemini: "chat-completions",
  google: "chat-completions",
  "openai-compatible": "chat-completions",
  anthropic: "anthropic-messages",
  workers: "workers"
};
const LEGACY_IMAGE_PROTOCOL = {
  openai: "images",
  workers: "workers"
};
const CHAT_PROTOCOLS$1 = ["chat-completions", "anthropic-messages", "responses", "workers"];
const IMAGE_PROTOCOLS$1 = ["images", "workers"];
function resolveChatProtocol(raw) {
  const value = asString(raw.protocol) || asString(raw.template);
  if (!value) {
    return null;
  }
  const protocol = CHAT_PROTOCOLS$1.includes(value) ? value : LEGACY_CHAT_PROTOCOL[value];
  return protocol ?? null;
}
function resolveImageProtocol(raw) {
  const value = asString(raw.protocol) || asString(raw.template);
  if (!value) {
    return null;
  }
  const protocol = IMAGE_PROTOCOLS$1.includes(value) ? value : LEGACY_IMAGE_PROTOCOL[value];
  return protocol ?? null;
}
function normalizeModels(raw) {
  const fromArray = (value) => Array.isArray(value) ? value.filter((v) => typeof v === "string").map((v) => v.trim()).filter(Boolean) : [];
  const explicit = fromArray(raw.models);
  if (explicit.length) {
    return [...new Set(explicit)];
  }
  const legacy = asString(raw.modelsList).trim();
  if (legacy.startsWith("[")) {
    try {
      const parsed = fromArray(JSON.parse(legacy));
      if (parsed.length) {
        return [...new Set(parsed)];
      }
    } catch {
    }
  } else if (legacy && !legacy.startsWith("http")) {
    return [legacy];
  }
  const single = asString(raw.model).trim();
  return single ? [single] : [];
}
function activeModel(raw, models) {
  const model = asString(raw.model).trim();
  return model && models.includes(model) ? model : models[0] ?? "";
}
function normalizeChatProvider(raw, index) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const protocol = resolveChatProtocol(raw);
  if (!protocol) {
    return null;
  }
  const models = normalizeModels(raw);
  return {
    id: asString(raw.id) || `chat-${index + 1}`,
    protocol,
    label: asString(raw.label) || protocol,
    enabled: raw.enabled !== false,
    apiKey: asString(raw.apiKey),
    baseUrl: asString(raw.baseUrl),
    model: activeModel(raw, models),
    models,
    extraParams: asRecord(raw.extraParams),
    options: asRecord(raw.options)
  };
}
function normalizeImageProvider(raw, index) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const protocol = resolveImageProtocol(raw);
  if (!protocol) {
    return null;
  }
  const models = normalizeModels(raw);
  return {
    id: asString(raw.id) || `image-${index + 1}`,
    protocol,
    label: asString(raw.label) || protocol,
    enabled: raw.enabled !== false,
    apiKey: asString(raw.apiKey),
    baseUrl: asString(raw.baseUrl),
    model: activeModel(raw, models),
    models,
    options: asRecord(raw.options)
  };
}
function normalizePlugin(raw, index) {
  if (!raw || typeof raw !== "object" || !raw.command) {
    return null;
  }
  return {
    id: asString(raw.id) || `plugin-${index + 1}`,
    command: asString(raw.command),
    description: asString(raw.description),
    scope: asStringArray(raw.scope),
    template: typeof raw.template === "string" ? raw.template : JSON.stringify(raw.template ?? ""),
    env: Object.fromEntries(Object.entries(asRecord(raw.env)).map(([k, v]) => [k, asString(v)])),
    enabled: raw.enabled !== false
  };
}
function normalizeCustomCommand(raw, index) {
  if (!raw || typeof raw !== "object" || !raw.command) {
    return null;
  }
  return {
    id: asString(raw.id) || `custom-${index + 1}`,
    command: asString(raw.command),
    description: asString(raw.description),
    scope: asStringArray(raw.scope),
    value: asString(raw.value),
    enabled: raw.enabled !== false
  };
}
function normalizeList(raw, fn) {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map(fn).filter((item) => item !== null);
}
function normalizeConfig(raw) {
  const input = asRecord(raw);
  return {
    version: 1,
    defaultChatProvider: input.defaultChatProvider ? asString(input.defaultChatProvider) : null,
    defaultImageProvider: input.defaultImageProvider ? asString(input.defaultImageProvider) : null,
    settings: normalizeSettings(input.settings),
    chatProviders: normalizeList(input.chatProviders, normalizeChatProvider),
    imageProviders: normalizeList(input.imageProviders, normalizeImageProvider),
    plugins: normalizeList(input.plugins, normalizePlugin),
    customCommands: normalizeList(input.customCommands, normalizeCustomCommand)
  };
}
const SECRET_KEY_PATTERN = /token|key|secret|password|credential/i;
const NON_SECRET_OPTION_KEYS =  new Set(["apiKeyHeader"]);
function isSecretKey(key) {
  return !NON_SECRET_OPTION_KEYS.has(key) && SECRET_KEY_PATTERN.test(key);
}
function maskSecrets(record) {
  const masked = {};
  for (const [key, value] of Object.entries(record)) {
    masked[key] = isSecretKey(key) && typeof value === "string" && value ? MASKED_API_KEY : value;
  }
  return masked;
}
function unmaskSecrets(incoming, existing) {
  const restored = {};
  for (const [key, value] of Object.entries(incoming)) {
    restored[key] = value === MASKED_API_KEY ? existing?.[key] ?? "" : value;
  }
  return restored;
}
function maskProvider(provider) {
  return {
    id: provider.id,
    protocol: provider.protocol,
    label: provider.label,
    enabled: provider.enabled,
    hasApiKey: !!provider.apiKey,
    apiKey: provider.apiKey ? MASKED_API_KEY : "",
    baseUrl: provider.baseUrl,
    model: provider.model,
    models: provider.models,
    extraParams: "extraParams" in provider ? provider.extraParams : {},
    options: maskSecrets(provider.options)
  };
}
function maskConfig(config) {
  return {
    version: 1,
    defaultChatProvider: config.defaultChatProvider,
    defaultImageProvider: config.defaultImageProvider,
    settings: config.settings,
    chatProviders: config.chatProviders.map(maskProvider),
    imageProviders: config.imageProviders.map(maskProvider),
    plugins: config.plugins.map((plugin) => ({ ...plugin, env: maskSecrets(plugin.env) })),
    customCommands: config.customCommands
  };
}
function unmaskKey(incoming, existing) {
  if (incoming === MASKED_API_KEY) {
    return existing ?? "";
  }
  return incoming;
}
function unmaskConfig(incoming, existing) {
  const chatExisting = new Map(existing.chatProviders.map((p) => [p.id, p]));
  const imageExisting = new Map(existing.imageProviders.map((p) => [p.id, p]));
  const pluginExisting = new Map(existing.plugins.map((p) => [p.id, p]));
  const unmaskProviderOptions = (provider, existingProvider) => ({
    ...provider,
    apiKey: unmaskKey(provider.apiKey, existingProvider?.apiKey),
    options: unmaskSecrets(provider.options, existingProvider?.options)
  });
  return normalizeConfig({
    ...incoming,
    version: 1,
    chatProviders: incoming.chatProviders.map((p) => unmaskProviderOptions(p, chatExisting.get(p.id))),
    imageProviders: incoming.imageProviders.map((p) => unmaskProviderOptions(p, imageExisting.get(p.id))),
    plugins: incoming.plugins.map((p) => ({
      ...p,
      env: unmaskSecrets(p.env, pluginExisting.get(p.id)?.env)
    }))
  });
}
class ConfigStore {
  constructor(database, ttlMs = 5e3) {
    this.database = database;
    this.ttlMs = ttlMs;
  }
  database;
  ttlMs;
  cache = null;
  setDatabase(database) {
    this.database = database;
  }
  async load(force = false) {
    if (!this.database) {
      return cloneDefaultConfig();
    }
    if (!force && this.cache && Date.now() - this.cache.at < this.ttlMs) {
      return this.cache.config;
    }
    let config = cloneDefaultConfig();
    try {
      const raw = await this.database.get(GLOBAL_CONFIG_KEY);
      if (raw) {
        config = normalizeConfig(typeof raw === "string" ? JSON.parse(raw) : raw);
      }
    } catch (e) {
      console.error("Failed to load config", e);
    }
    this.cache = { config, at: Date.now() };
    return config;
  }
  async save(config) {
    const normalized = normalizeConfig(config);
    await this.database.put(GLOBAL_CONFIG_KEY, JSON.stringify(normalized));
    this.cache = { config: normalized, at: Date.now() };
    return normalized;
  }
  invalidate() {
    this.cache = null;
  }
}
const BUILD_TIMESTAMP = 1789366042;
const BUILD_VERSION = "131bbf4";
class Environment {
  BUILD_TIMESTAMP = BUILD_TIMESTAMP;
  BUILD_VERSION = BUILD_VERSION;
  TELEGRAM_TOKEN = "";
  ADMIN_ID = "";
  ADMIN_PASSWORD = "";
  TELEGRAM_SECRET_TOKEN = "";
  PUBLIC_BASE_URL = "";
  AI_BINDING = null;
  API_GUARD = null;
  DATABASE = null;
  I18N = loadI18n();
  CONFIG = cloneDefaultConfig();
  CUSTOM_MESSAGE_RENDER = null;
  store = null;
  constructor() {
    this.merge = this.merge.bind(this);
  }
  merge(source) {
    if (!source) {
      return;
    }
    if (source.AI) {
      this.AI_BINDING = source.AI;
    }
    if (source.DATABASE) {
      this.DATABASE = source.DATABASE;
    }
    if (source.API_GUARD) {
      this.API_GUARD = source.API_GUARD;
    }
    if (source.TELEGRAM_TOKEN) {
      this.TELEGRAM_TOKEN = `${source.TELEGRAM_TOKEN}`.trim();
    }
    if (source.ADMIN_ID !== void 0 && source.ADMIN_ID !== null && `${source.ADMIN_ID}` !== "") {
      this.ADMIN_ID = `${source.ADMIN_ID}`.trim();
    }
    if (source.ADMIN_PASSWORD !== void 0 && source.ADMIN_PASSWORD !== null) {
      this.ADMIN_PASSWORD = `${source.ADMIN_PASSWORD}`;
    }
    if (source.TELEGRAM_SECRET_TOKEN !== void 0 && source.TELEGRAM_SECRET_TOKEN !== null && `${source.TELEGRAM_SECRET_TOKEN}`.trim() !== "") {
      this.TELEGRAM_SECRET_TOKEN = `${source.TELEGRAM_SECRET_TOKEN}`.trim();
    }
    if (source.PUBLIC_BASE_URL !== void 0 && source.PUBLIC_BASE_URL !== null && `${source.PUBLIC_BASE_URL}`.trim() !== "") {
      this.PUBLIC_BASE_URL = `${source.PUBLIC_BASE_URL}`.trim().replace(/\/+$/, "");
    }
  }
  get publicBaseUrl() {
    return this.PUBLIC_BASE_URL || this.CONFIG.settings.publicBaseUrl || "";
  }
  getConfigStore() {
    if (!this.store) {
      this.store = new ConfigStore(this.DATABASE);
    } else {
      this.store.setDatabase(this.DATABASE);
    }
    return this.store;
  }
  async loadConfig(force = false) {
    if (!this.DATABASE) {
      return this.CONFIG;
    }
    this.CONFIG = await this.getConfigStore().load(force);
    this.I18N = loadI18n(this.CONFIG.settings.language.toLowerCase());
    return this.CONFIG;
  }
}
const ENV = new Environment();
const LIST_KEYS = ["chatProviders", "imageProviders", "plugins", "customCommands"];
const TOP_LEVEL_KEYS =  new Set(["defaultChatProvider", "defaultImageProvider", "settings", ...LIST_KEYS]);
function isRecord(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function deepMerge(base, incoming) {
  if (!isRecord(base) || !isRecord(incoming)) {
    return incoming;
  }
  const result = { ...base };
  for (const [key, value] of Object.entries(incoming)) {
    result[key] = isRecord(value) && isRecord(result[key]) ? deepMerge(result[key], value) : value;
  }
  return result;
}
function mergeById(base, incoming) {
  if (!Array.isArray(incoming)) {
    throw new Error("Expected an array");
  }
  const result = [...base];
  for (const raw of incoming) {
    if (!isRecord(raw)) {
      continue;
    }
    const id = typeof raw.id === "string" ? raw.id : "";
    const index = id ? result.findIndex((item) => item.id === id) : -1;
    if (index >= 0) {
      result[index] = deepMerge(result[index], raw);
    } else {
      result.push(raw);
    }
  }
  return result;
}
function mergeConfigPatch(base, patch) {
  const merged = { ...structuredClone(base) };
  for (const [key, value] of Object.entries(patch)) {
    if (!TOP_LEVEL_KEYS.has(key)) {
      throw new Error(`Unknown config key: ${key}`);
    }
    if (key === "settings") {
      if (!isRecord(value)) {
        throw new Error("settings must be an object");
      }
      for (const settingKey of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, settingKey)) {
          throw new Error(`Unknown setting: ${settingKey}`);
        }
      }
      merged.settings = { ...merged.settings, ...value };
    } else if (LIST_KEYS.includes(key)) {
      merged[key] = mergeById(merged[key] || [], value);
    } else {
      merged[key] = value;
    }
  }
  return normalizeConfig(merged);
}
function patchFromPath(path, value) {
  const parts = path.split(".").map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) {
    throw new Error("Empty key");
  }
  if (parts[0] === "chatProviders" || parts[0] === "imageProviders") {
    if (parts.length < 3) {
      throw new Error(`Provider key needs <list>.<id>.<field>: ${path}`);
    }
    const item = { id: parts[1] };
    let node2 = item;
    for (let i = 2; i < parts.length - 1; i++) {
      const next = {};
      node2[parts[i]] = next;
      node2 = next;
    }
    node2[parts[parts.length - 1]] = value;
    return { [parts[0]]: [item] };
  }
  const root = {};
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = {};
    node[parts[i]] = next;
    node = next;
  }
  node[parts[parts.length - 1]] = value;
  return root;
}
const PAGE_HTML = "<!doctype html>\n<html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\" />\n        <meta name=\"color-scheme\" content=\"light dark\" />\n        <meta name=\"theme-color\" content=\"#f2f2f7\" media=\"(prefers-color-scheme: light)\" />\n        <meta name=\"theme-color\" content=\"#000000\" media=\"(prefers-color-scheme: dark)\" />\n        <title>ChatGPT-Telegram-Workers</title>\n        <!-- Telegram Mini App SDK:管理后台在 TMA 内打开时用它获取 initData 自动登录 -->\n        <script src=\"https://telegram.org/js/telegram-web-app.js\"></script>\n      <script type=\"module\" crossorigin>\nconst P=\"/rpc\";async function S(i,e,t){const a=await(await fetch(P,{method:\"POST\",headers:{\"Content-Type\":\"application/json\",...t},body:JSON.stringify({method:i,params:e})})).json().catch(()=>({}));if(a.error)throw new Error(a.error.message||`RPC ${i} failed`);return a.result}function h(i){const e=document.createElement(\"template\");return e.innerHTML=i.trim(),e.content.firstElementChild}function I(i){const e=document.createElement(\"template\");return e.innerHTML=i.trim(),e.content}function o(i){return String(i??\"\").replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/\"/g,\"&quot;\")}let C;function b(i,e=!1){let t=document.querySelector(\".toast\");t||(t=document.createElement(\"div\"),t.className=\"toast\",t.setAttribute(\"role\",\"status\"),t.setAttribute(\"aria-live\",\"polite\"),document.body.appendChild(t)),t.classList.toggle(\"error\",e),t.textContent=i,t.classList.remove(\"show\"),t.offsetWidth,t.classList.add(\"show\"),clearTimeout(C),C=setTimeout(()=>t?.classList.remove(\"show\"),2200)}function k(i){return`${i}-${Math.random().toString(36).slice(2,8)}`}function M(i,e,t=\"Tap again to confirm\",s=3e3){if(i.dataset.armed===\"1\"){i.dataset.armed=\"\",i.classList.remove(\"armed\"),e();return}const a=i.innerHTML;i.dataset.armed=\"1\",i.classList.add(\"armed\"),i.textContent=t;const n=()=>{i.dataset.armed===\"1\"&&(i.dataset.armed=\"\",i.classList.remove(\"armed\"),i.innerHTML=a,i.removeEventListener(\"focusout\",n))};setTimeout(n,s),i.addEventListener(\"focusout\",n)}const q={bot:'<rect width=\"16\" height=\"12\" x=\"4\" y=\"9\" rx=\"3.5\"/><path d=\"M12 9V5\"/><path d=\"M9.5 5h5\"/><path d=\"M2.5 13.5v3\"/><path d=\"M21.5 13.5v3\"/><path d=\"M8.8 13.8v1.6\"/><path d=\"M15.2 13.8v1.6\"/>',image:'<rect width=\"17\" height=\"17\" x=\"3.5\" y=\"3.5\" rx=\"3.5\"/><circle cx=\"9\" cy=\"9\" r=\"1.8\"/><path d=\"m20.5 14.5-3.3-3.3a2 2 0 0 0-2.8 0L6.5 19\"/>',gear:'<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>',puzzle:'<path d=\"M14 7V5.5A1.5 1.5 0 0 0 12.5 4h-1A1.5 1.5 0 0 0 10 5.5V7H7a2 2 0 0 0-2 2v2.6h1.4a1.6 1.6 0 0 1 0 3.2H5V19a2 2 0 0 0 2 2h2.6v-1.4a1.6 1.6 0 0 1 3.2 0V21H17a2 2 0 0 0 2-2v-3h1.4a1.6 1.6 0 0 0 0-3.2H19V9a2 2 0 0 0-2-2h-3z\"/>',terminal:'<path d=\"m6 8 4 4-4 4\"/><path d=\"M12.5 17H19\"/>',\"chevron-left\":'<path d=\"m14.5 5.5-6.5 6.5 6.5 6.5\"/>',\"chevron-right\":'<path d=\"m9.5 5.5 6.5 6.5-6.5 6.5\"/>',plus:'<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>',trash:'<path d=\"M4 6.5h16\"/><path d=\"M15.5 6.5V5a1.5 1.5 0 0 0-1.5-1.5h-4A1.5 1.5 0 0 0 8.5 5v1.5\"/><path d=\"M18.5 6.5v12a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-12\"/>',check:'<path d=\"m4.5 12.5 5 5L19.5 7\"/>',x:'<path d=\"M6 6l12 12\"/><path d=\"M18 6 6 18\"/>',\"minus-circle\":'<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 12h8\"/>',refresh:'<path d=\"M20.5 12a8.5 8.5 0 1 1-2.49-6.01\"/><path d=\"M20.5 3.5v4h-4\"/>',external:'<path d=\"M7.5 7.5h9v9\"/><path d=\"M7.5 16.5 16.5 7.5\"/>',doc:'<path d=\"M14 2.5H7A2 2 0 0 0 5 4.5v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5l-5-5z\"/><path d=\"M14 2.5v5h5\"/><path d=\"M9 12.5h6\"/><path d=\"M9 16h6\"/>',warning:'<path d=\"M12 3.5 2.8 19.2a1.6 1.6 0 0 0 1.4 2.4h15.6a1.6 1.6 0 0 0 1.4-2.4L12 3.5z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.5h.01\"/>',\"check-circle\":'<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12.5 2.8 2.8L16.5 9\"/>',\"x-circle\":'<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m9 9 6 6\"/><path d=\"m15 9-6 6\"/>',globe:'<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z\"/><path d=\"M3 12h18\"/>',star:'<path d=\"m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3z\"/>',lock:'<rect width=\"16\" height=\"10.5\" x=\"4\" y=\"10.5\" rx=\"3\"/><path d=\"M8 10.5V7a4 4 0 0 1 8 0v3.5\"/>',logout:'<path d=\"M9.5 20.5H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h3.5\"/><path d=\"m15.5 16.5 4.5-4.5-4.5-4.5\"/><path d=\"M20 12H9.5\"/>',link:'<path d=\"M10 13.5a5 5 0 0 0 7.5.5l2.5-2.5a5 5 0 0 0-7-7l-1.4 1.4\"/><path d=\"M14 10.5a5 5 0 0 0-7.5-.5L4 12.5a5 5 0 0 0 7 7l1.4-1.4\"/>'};function l(i,e=!0){const t=q[i]??\"\";return`<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"${e?' aria-hidden=\"true\" focusable=\"false\"':\"\"}>${t}</svg>`}class R extends HTMLElement{connectedCallback(){this.render(),this.load()}render(){this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <div class=\"nav-brand\"><span class=\"nav-appicon\">${l(\"bot\")}</span><strong>ChatGPT-Telegram-Workers</strong></div>\n                <span class=\"nav-badge\" id=\"version\">…</span>\n            </header>\n            <main>\n                <section class=\"hero\">\n                    <div class=\"app-icon\">${l(\"bot\")}</div>\n                    <div class=\"status-chip ok\">${l(\"check-circle\")}Deployed successfully</div>\n                    <p class=\"muted\" id=\"meta\"></p>\n                    <div id=\"token-alert\" style=\"width:100%\"></div>\n                </section>\n\n                <h2 class=\"section-h\">Getting started</h2>\n                <section class=\"list-group\">\n                    <a class=\"list-row\" id=\"admin-link\" href=\"/admin\">\n                        <span class=\"row-icon\" style=\"background:var(--blue)\">${l(\"gear\")}</span>\n                        <span class=\"row-main\">\n                            <span class=\"row-title\">Configure your bot</span>\n                            <span class=\"row-sub\">Telegram token, AI providers and options</span>\n                        </span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                    <a class=\"list-row\" id=\"init-link\" href=\"/init\">\n                        <span class=\"row-icon\" style=\"background:var(--green)\">${l(\"link\")}</span>\n                        <span class=\"row-main\">\n                            <span class=\"row-title\">Bind the webhook</span>\n                            <span class=\"row-sub\">Register with Telegram and publish commands</span>\n                        </span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                    <a class=\"list-row\" href=\"/help\">\n                        <span class=\"row-icon\" style=\"background:var(--orange)\">${l(\"doc\")}</span>\n                        <span class=\"row-main\">\n                            <span class=\"row-title\">Help &amp; commands</span>\n                            <span class=\"row-sub\">Quick start and bot command reference</span>\n                        </span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                </section>\n\n                <h2 class=\"section-h\">Bot commands</h2>\n                <section class=\"list-group\" id=\"commands\"></section>\n\n                <h2 class=\"section-h\">Tools</h2>\n                <section class=\"list-group\">\n                    <a class=\"list-row\" id=\"interpolate-link\" href=\"/interpolate\">\n                        <span class=\"row-icon\" style=\"background:var(--purple)\">${l(\"terminal\")}</span>\n                        <span class=\"row-main\">\n                            <span class=\"row-title\">Template playground</span>\n                            <span class=\"row-sub\">Preview how plugin templates render with your data</span>\n                        </span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                </section>\n\n                <h2 class=\"section-h\">Resources</h2>\n                <section class=\"list-group\">\n                    <a class=\"list-row\" id=\"docs-link\" href=\"https://github.com/TBXark/ChatGPT-Telegram-Workers/tree/master/doc\" target=\"_blank\" rel=\"noopener\">\n                        <span class=\"row-icon\" style=\"background:var(--teal)\">${l(\"doc\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Documentation</span></span>\n                        ${l(\"external\")}\n                    </a>\n                    <a class=\"list-row\" id=\"repo-link\" href=\"https://github.com/TBXark/ChatGPT-Telegram-Workers\" target=\"_blank\" rel=\"noopener\">\n                        <span class=\"row-icon\" style=\"background:var(--text-3)\">${l(\"globe\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Source code</span></span>\n                        ${l(\"external\")}\n                    </a>\n                    <a class=\"list-row\" id=\"issues-link\" href=\"https://github.com/TBXark/ChatGPT-Telegram-Workers/issues\" target=\"_blank\" rel=\"noopener\">\n                        <span class=\"row-icon\" style=\"background:var(--red)\">${l(\"warning\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Report an issue</span></span>\n                        ${l(\"external\")}\n                    </a>\n                </section>\n\n                <footer class=\"page-footer\" id=\"build\"></footer>\n            </main>\n          </div>\n        `))}set(e,t){const s=this.querySelector(`#${e}`);s&&(s.textContent=t)}link(e,t){const s=this.querySelector(`#${e}`);s&&t&&(s.href=t)}async load(){try{const e=await S(\"pages.info\");if(this.set(\"version\",`v${e.version}`),this.set(\"meta\",`${e.domain}`),this.set(\"build\",`build ${e.timestamp}`),this.link(\"admin-link\",e.adminUrl),this.link(\"init-link\",e.initUrl),this.link(\"interpolate-link\",e.interpolateUrl),this.link(\"docs-link\",e.docsUrl),this.link(\"repo-link\",e.repoUrl),this.link(\"issues-link\",e.issuesUrl),!e.hasToken){const t=h(`<div class=\"alert warn\">${l(\"warning\")}<span>TELEGRAM_TOKEN is not set. Add it to your environment before binding the webhook.</span></div>`);this.querySelector(\"#token-alert\")?.replaceChildren(t)}this.renderCommands(e.commands)}catch{this.set(\"meta\",\"Failed to load page info.\"),this.renderCommands([])}}renderCommands(e){const t=this.querySelector(\"#commands\");if(t){if(!e.length){t.replaceChildren(h('<div class=\"list-row\"><span class=\"row-main\"><span class=\"row-sub\">No commands available yet. Bind the webhook to publish them.</span></span></div>'));return}t.replaceChildren(...e.map(({command:s,description:a})=>h(`<div class=\"list-row\">\n                        <span class=\"row-main\">\n                            <span class=\"row-title\" style=\"font-family:var(--mono);font-size:15px;color:var(--blue)\">${o(s)}</span>\n                            ${a?`<span class=\"row-sub\">${o(a)}</span>`:\"\"}\n                        </span>\n                    </div>`)))}}}customElements.define(\"page-home\",R);const N=[{title:\"Configure the bot\",sub:\"Set TELEGRAM_TOKEN and your AI provider API keys in the environment, or manage them later in the admin panel.\",color:\"var(--blue)\",icon:\"gear\"},{title:\"Bind the webhook\",sub:\"Open the bind page to register this deployment with Telegram and publish the bot commands.\",color:\"var(--green)\",icon:\"link\"},{title:\"Start chatting\",sub:\"Find your bot in Telegram and send a message. Use /help in chat to list everything it can do.\",color:\"var(--orange)\",icon:\"bot\"}];class D extends HTMLElement{connectedCallback(){this.render(),this.load()}render(){this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <a class=\"nav-left\" href=\"/\">${l(\"chevron-left\")}Home</a>\n                <span class=\"nav-title\">Help</span>\n            </header>\n            <main>\n                <section class=\"hero\" style=\"padding-bottom:8px\">\n                    <div class=\"app-icon\">${l(\"doc\")}</div>\n                    <h1>Help</h1>\n                    <p class=\"muted\">Everything you need to run and use your bot.</p>\n                </section>\n\n                <h2 class=\"section-h\">Quick start</h2>\n                <section class=\"list-group\">\n                    ${N.map((e,t)=>`\n                        <div class=\"list-row\">\n                            <span class=\"row-num\">${t+1}</span>\n                            <span class=\"row-main\">\n                                <span class=\"row-title\">${e.title}</span>\n                                <span class=\"row-sub\">${e.sub}</span>\n                            </span>\n                        </div>`).join(\"\")}\n                </section>\n\n                <h2 class=\"section-h\">Bot commands</h2>\n                <section class=\"list-group\" id=\"commands\"></section>\n\n                <h2 class=\"section-h\">Resources</h2>\n                <section class=\"list-group\">\n                    <a class=\"list-row\" id=\"admin-link\" href=\"/admin\">\n                        <span class=\"row-icon\" style=\"background:var(--blue)\">${l(\"gear\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Admin panel</span><span class=\"row-sub\">Providers, settings, plugins</span></span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                    <a class=\"list-row\" id=\"interpolate-link\" href=\"/interpolate\">\n                        <span class=\"row-icon\" style=\"background:var(--purple)\">${l(\"terminal\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Template playground</span><span class=\"row-sub\">Test plugin templates</span></span>\n                        ${l(\"chevron-right\")}\n                    </a>\n                    <a class=\"list-row\" id=\"docs-link\" href=\"https://github.com/TBXark/ChatGPT-Telegram-Workers/tree/master/doc\" target=\"_blank\" rel=\"noopener\">\n                        <span class=\"row-icon\" style=\"background:var(--teal)\">${l(\"doc\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Documentation</span></span>\n                        ${l(\"external\")}\n                    </a>\n                    <a class=\"list-row\" id=\"issues-link\" href=\"https://github.com/TBXark/ChatGPT-Telegram-Workers/issues\" target=\"_blank\" rel=\"noopener\">\n                        <span class=\"row-icon\" style=\"background:var(--red)\">${l(\"warning\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Report an issue</span></span>\n                        ${l(\"external\")}\n                    </a>\n                </section>\n\n                <footer class=\"page-footer\">ChatGPT-Telegram-Workers</footer>\n            </main>\n          </div>\n        `))}async load(){let e;try{e=await S(\"pages.info\")}catch{this.renderCommands([]);return}this.link(\"admin-link\",e.adminUrl),this.link(\"interpolate-link\",e.interpolateUrl),this.link(\"docs-link\",e.docsUrl),this.link(\"issues-link\",e.issuesUrl),this.link(\"repo-link\",e.repoUrl),this.renderCommands(e.commands??[])}renderCommands(e){const t=this.querySelector(\"#commands\");if(t){if(!e.length){t.replaceChildren(h('<div class=\"list-row\"><span class=\"row-main\"><span class=\"row-sub\">No commands available yet.</span></span></div>'));return}t.replaceChildren(...e.map(({command:s,description:a})=>h(`<div class=\"list-row\">\n                        <span class=\"row-main\">\n                            <span class=\"row-title\" style=\"font-family:var(--mono);font-size:15px;color:var(--blue)\">${o(s)}</span>\n                            ${a?`<span class=\"row-sub\">${o(a)}</span>`:\"\"}\n                        </span>\n                    </div>`)))}}link(e,t){const s=this.querySelector(`#${e}`);s&&t&&(s.href=t)}}customElements.define(\"page-help\",D);const $=\"ctw-admin-token\";function H(){return localStorage.getItem($)}function E(i){i?localStorage.setItem($,i):localStorage.removeItem($)}function g(i,e){const t=H();return S(i,e,t?{Authorization:`Bearer ${t}`}:void 0)}const v={authInfo:()=>g(\"admin.authInfo\"),loginInitData:i=>g(\"admin.login\",{initData:i}),loginPassword:i=>g(\"admin.login\",{password:i}),meta:()=>g(\"admin.meta\"),getConfig:()=>g(\"admin.config.get\"),saveConfig:i=>g(\"admin.config.save\",i),agents:()=>g(\"admin.agents\"),models:(i,e)=>g(\"admin.models\",{kind:i,provider:e}),bind:()=>g(\"init.bind\"),pageInfo:()=>g(\"pages.info\")};class O extends HTMLElement{connectedCallback(){this.render(),this.querySelector(\"#retry\")?.addEventListener(\"click\",()=>this.run()),this.run()}render(){this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <a class=\"nav-left\" href=\"/\">${l(\"chevron-left\")}Home</a>\n                <span class=\"nav-title\">Bind Webhook</span>\n            </header>\n            <main>\n                <section class=\"hero\">\n                    <div class=\"big-status\" id=\"status-icon\"><div class=\"spinner\"></div></div>\n                    <h1 id=\"status-title\">Binding webhook…</h1>\n                    <p class=\"muted\" id=\"domain\"></p>\n                </section>\n\n                <h2 class=\"section-h\">Telegram response</h2>\n                <div class=\"code-block\" id=\"result\" role=\"status\"><pre>Contacting Telegram...</pre></div>\n\n                <div class=\"btn-row\">\n                    <button type=\"button\" class=\"btn\" id=\"retry\">${l(\"refresh\")}<span>Retry</span></button>\n                </div>\n            </main>\n          </div>\n        `))}showStatus(e){const t=this.querySelector(\"#status-icon\"),s=this.querySelector(\"#status-title\");if(!t||!s)return;if(e===\"no-token\"){t.className=\"big-status err\",t.replaceChildren(h(`${l(\"warning\")}`)),s.textContent=\"TELEGRAM_TOKEN is not set\";return}const a=e===\"ok\";t.className=a?\"big-status ok\":\"big-status err\",t.replaceChildren(h(l(a?\"check-circle\":\"x-circle\"))),s.textContent=a?\"Webhook bound successfully\":\"Binding finished with errors\"}setResult(e){this.querySelector(\"#result\")?.replaceChildren(h(\"<pre></pre>\"));const t=this.querySelector(\"#result pre\");t&&(t.textContent=e)}async run(){const e=this.querySelector(\"#retry\"),t=this.querySelector(\"#status-icon\"),s=this.querySelector(\"#status-title\");if(!(!e||!t||!s)){e.disabled=!0,t.className=\"big-status\",t.replaceChildren(h('<div class=\"spinner\"></div>')),s.textContent=\"Binding webhook…\",this.setResult(\"Contacting Telegram...\");try{const a=await v.bind(),n=this.querySelector(\"#domain\");n&&(n.textContent=a.domain??location.host),this.showStatus(a.tokenMissing?\"no-token\":a.outcome),this.setResult(JSON.stringify(a.result??a,null,2))}catch(a){this.showStatus(\"error\");const n=a.message||\"Failed to reach the server.\";this.setResult(n.toLowerCase().includes(\"unauthorized\")?\"Unauthorized. Open /admin, log in, then retry.\":\"Failed to reach the server.\")}finally{e.disabled=!1}}}}customElements.define(\"page-init\",O);const U=/\\{\\{#each(?::(\\w+))?\\s+(\\w+)\\s+in\\s+([\\w.[\\]]+)\\}\\}([\\s\\S]*?)\\{\\{\\/each(?::\\1)?\\}\\}/g,B=/\\{\\{#if(?::(\\w+))?\\s+([\\w.[\\]]+)\\}\\}([\\s\\S]*?)(?:\\{\\{#else(?::\\1)?\\}\\}([\\s\\S]*?))?\\{\\{\\/if(?::\\1)?\\}\\}/g,_=/\\{\\{([\\w.[\\]]+)\\}\\}/g;function w(i,e){if(i===\".\")return e[\".\"]??e;try{return i.split(\".\").reduce((t,s)=>{if(s.includes(\"[\")&&s.includes(\"]\")){const[a,n]=s.split(\"[\"),c=n.slice(0,-1);let r=Number.parseInt(c,10);return Number.isNaN(r)&&(r=w(c,e)),t?.[a]?.[r]}return t?.[s]},e)}catch(t){console.error(`Error evaluating expression: ${i}`,t);return}}function x(i,e,t){const s=(c,r,p,m)=>w(c,m)?r:p||\"\",a=(c,r,p,m)=>{const u=w(r,m);return Array.isArray(u)?u.map(d=>{const f={...m,[c]:d,\".\":d};return x(p,f)}).join(\"\"):(console.warn(`Expression \"${r}\" did not evaluate to an array`),\"\")};return((c,r)=>(c=c.replace(U,(p,m,u,d,f)=>a(u,d,f,r)),c=c.replace(B,(p,m,u,d,f)=>s(u,d,f,r)),c.replace(_,(p,m)=>{const u=w(m,r);return u===void 0?`{{${m}}}`:String(u)})))(i,e)}const F=`\n<b>DNS query: {{Question[0].name}}</b>\n<code>Status: {{#if TC}}TC,{{/if}}{{#if RD}}RD,{{/if}}{{#if RA}}RA,{{/if}}{{#if AD}}AD,{{/if}}{{#if CD}}CD,{{/if}}{{Status}}</code>\n\n<b>Answer</b>{{#each answer in Answer}}\n<code>{{answer.name}}, {{answer.type}}, (TTL: {{answer.TTL}}),{{answer.data}}</code>{{/each}}\n`,z=JSON.stringify({Status:0,TC:!1,RD:!0,RA:!0,AD:!1,CD:!1,Question:[{name:\"google.com\",type:1}],Answer:[{name:\"google.com\",type:1,TTL:300,data:\"172.217.24.110\"}]},null,2);class G extends HTMLElement{connectedCallback(){this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <a class=\"nav-left\" href=\"/\">${l(\"chevron-left\")}Home</a>\n                <span class=\"nav-title\">Template Playground</span>\n            </header>\n            <main class=\"pg-grid\">\n                <section class=\"pane\" id=\"template-area\">\n                    <div class=\"pane-head\"><span>${l(\"doc\")}Template</span></div>\n                    <textarea id=\"template\" placeholder=\"Enter your template, using {{variable name}} to represent variables.\" spellcheck=\"false\" aria-label=\"Template\"></textarea>\n                </section>\n                <section class=\"pane\" id=\"data-area\">\n                    <div class=\"pane-head\"><span>${l(\"terminal\")}Data · JSON</span></div>\n                    <textarea id=\"data\" placeholder=\"Enter data in JSON format.\" spellcheck=\"false\" aria-label=\"Data JSON\"></textarea>\n                </section>\n                <section class=\"pane preview-area\">\n                    <div class=\"pane-head\"><span>${l(\"image\")}Preview</span></div>\n                    <pre id=\"preview\" role=\"region\" aria-label=\"Rendered preview\"></pre>\n                </section>\n            </main>\n          </div>\n        `));const e=this.querySelector(\"#template\"),t=this.querySelector(\"#data\"),s=()=>this.updatePreview(e.value,t.value);e.addEventListener(\"input\",s),t.addEventListener(\"input\",s),e.value=F,t.value=z,s()}updatePreview(e,t){const s=this.querySelector(\"#preview\");if(s)try{s.innerHTML=x(e,JSON.parse(t))}catch(a){s.replaceChildren(h(`<span class=\"error\">${a.message}</span>`))}}}customElements.define(\"page-interpolate\",G);function j(){const i=window.Telegram?.WebApp?.initData;if(i)return i;const e=window.location.hash.replace(/^#/,\"\");return e?new URLSearchParams(e).get(\"tgWebAppData\")??\"\":\"\"}function V(){try{window.Telegram?.WebApp?.ready?.(),window.Telegram?.WebApp?.expand?.()}catch{}}class W extends HTMLElement{connectedCallback(){this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <div class=\"nav-brand\"><span class=\"nav-appicon\">${l(\"bot\")}</span><strong>Admin</strong></div>\n            </header>\n            <main>\n                <section class=\"hero\">\n                    <div class=\"app-icon\" style=\"background:var(--blue)\"><div class=\"spinner\"></div></div>\n                    <h1>Checking…</h1>\n                    <p class=\"muted\">Verifying authorization.</p>\n                </section>\n            </main>\n            </div>`)),this.attempt()}async attempt(){V();const e=j();if(e)try{const{token:s}=await v.loginInitData(e);E(s),this.dispatchEvent(new CustomEvent(\"logged-in\",{bubbles:!0}));return}catch(s){b(`TMA login failed: ${s.message}`,!0)}let t={passwordEnabled:!1,hasToken:!1};try{t=await v.authInfo()??t}catch{}this.renderPassword(t.passwordEnabled)}renderPassword(e){if(!e){this.replaceChildren(h(`\n                <div class=\"contents\">\n                <header class=\"navbar\">\n                    <div class=\"nav-brand\"><span class=\"nav-appicon\">${l(\"bot\")}</span><strong>Admin</strong></div>\n                </header>\n                <main>\n                    <section class=\"hero\">\n                        <div class=\"app-icon\" style=\"background:var(--red)\">${l(\"lock\")}</div>\n                        <h1>Cannot sign in</h1>\n                        <p class=\"muted\">Opened outside the Telegram Mini App and ADMIN_PASSWORD is not set.</p>\n                    </section>\n                </main>\n            </div>`));return}this.replaceChildren(h(`\n            <div class=\"contents\">\n            <header class=\"navbar\">\n                <div class=\"nav-brand\"><span class=\"nav-appicon\">${l(\"bot\")}</span><strong>Admin</strong></div>\n            </header>\n            <main>\n                <section class=\"hero\">\n                    <div class=\"app-icon\">${l(\"lock\")}</div>\n                    <h1>Admin</h1>\n                    <p class=\"muted\">Enter the administrator password to continue.</p>\n                </section>\n                <section class=\"list-group\">\n                    <div class=\"list-row\">\n                        <input class=\"bare\" style=\"text-align:left\" type=\"password\" id=\"pwd\" placeholder=\"Password\"\n                            autocomplete=\"current-password\" aria-label=\"Password\" />\n                    </div>\n                </section>\n                <div class=\"btn-row\"><button type=\"button\" class=\"btn\" id=\"login\">Log In</button></div>\n            </main>\n            </div>`));const t=async()=>{const s=this.querySelector(\"#pwd\").value,a=this.querySelector(\"#login\");if(!a.disabled){a.disabled=!0,a.textContent=\"Logging In…\";try{const{token:n}=await v.loginPassword(s);E(n),this.dispatchEvent(new CustomEvent(\"logged-in\",{bubbles:!0}))}catch(n){b(n.message,!0),a.disabled=!1,a.textContent=\"Log In\"}}};this.querySelector(\"#login\")?.addEventListener(\"click\",t),this.querySelector(\"#pwd\")?.addEventListener(\"keydown\",s=>{s.key===\"Enter\"&&t()})}}customElements.define(\"admin-login\",W);class J extends HTMLElement{pushed_=!1;pageEl=null;meta=null;get pushed(){return this.pushed_}connectedCallback(){this.addEventListener(\"close\",()=>{this.pushed_&&history.back()}),window.addEventListener(\"popstate\",this.onPopState)}disconnectedCallback(){window.removeEventListener(\"popstate\",this.onPopState)}onPopState=()=>{this.pushed_&&this.pop()};push(e){if(this.pushed_)return;const t=h(`\n            <div class=\"push-page\" role=\"dialog\" aria-label=\"${e.title}\">\n                <header class=\"navbar\">\n                    <button type=\"button\" class=\"nav-left\" data-back>${l(\"chevron-left\")}${e.back}</button>\n                    <span class=\"nav-title\">${e.title}</span>\n                </header>\n                <div class=\"push-content\"></div>\n            </div>\n        `);this.pushed_=!0,this.pageEl=t,this.meta=e,this.classList.add(\"pushed\"),this.appendChild(t),t.querySelector(\"[data-back]\")?.addEventListener(\"click\",()=>history.back()),e.mount(t.querySelector(\".push-content\")),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add(\"open\"))),history.pushState({ctwPush:!0},\"\")}pop(){if(!this.pushed_||!this.pageEl)return;this.pushed_=!1;const e=this.pageEl;this.pageEl=null;const t=this.meta;this.meta=null,this.classList.remove(\"pushed\"),e.classList.remove(\"open\"),e.classList.add(\"leaving\"),setTimeout(()=>{e.remove(),t?.onClose?.(),this.dispatchEvent(new CustomEvent(\"pop\",{detail:t}))},380)}popInstant(){if(!this.pushed_)return;this.pushed_=!1,this.pageEl?.remove(),this.pageEl=null;const e=this.meta;this.meta=null,this.classList.remove(\"pushed\"),e?.onClose?.(),history.replaceState(null,\"\")}}customElements.define(\"nav-stack\",J);const K=[{id:\"general\",label:\"General\",footer:\"Public Base URL is the HTTPS domain used for the webhook and admin links.\"},{id:\"chat\",label:\"Chat & Streaming\"},{id:\"telegram\",label:\"Telegram\"},{id:\"access\",label:\"Access Control\",footer:\"Allowed IDs accept multiple values separated by commas.\"},{id:\"history\",label:\"History\"},{id:\"image\",label:\"Image Generation\"}],T=[{key:\"publicBaseUrl\",label:\"Public Base URL\",type:\"text\",group:\"general\"},{key:\"systemInitMessage\",label:\"System Prompt\",type:\"textarea\",group:\"general\"},{key:\"language\",label:\"Language\",type:\"select\",options:[\"zh-cn\",\"zh-hant\",\"en\",\"pt\"],group:\"general\"},{key:\"updateBranch\",label:\"Update Branch\",type:\"text\",group:\"general\"},{key:\"streamMode\",label:\"Stream Mode\",type:\"boolean\",group:\"chat\"},{key:\"safeMode\",label:\"Safe Mode\",type:\"boolean\",group:\"chat\"},{key:\"debugMode\",label:\"Debug Mode\",type:\"boolean\",group:\"chat\"},{key:\"devMode\",label:\"Dev Mode\",type:\"boolean\",group:\"chat\"},{key:\"chatCompleteApiTimeout\",label:\"API Timeout (s)\",type:\"number\",group:\"chat\"},{key:\"maxOutputTokens\",label:\"Max Output Tokens\",type:\"number\",group:\"chat\"},{key:\"telegramMinStreamInterval\",label:\"Stream Interval (ms)\",type:\"number\",group:\"chat\"},{key:\"defaultParseMode\",label:\"Parse Mode\",type:\"select\",options:[\"Markdown\",\"MarkdownV2\",\"HTML\"],group:\"chat\"},{key:\"extraMessageContext\",label:\"Extra Message Context\",type:\"boolean\",group:\"chat\"},{key:\"showReplyButton\",label:\"Show Reply Button\",type:\"boolean\",group:\"chat\"},{key:\"hideCommandButtons\",label:\"Hide Command Buttons\",type:\"list\",group:\"chat\"},{key:\"modelListColumns\",label:\"Model List Columns\",type:\"number\",group:\"chat\"},{key:\"telegramApiDomain\",label:\"Telegram API Domain\",type:\"text\",group:\"telegram\"},{key:\"telegramPhotoSizeOffset\",label:\"Photo Size Offset\",type:\"number\",group:\"telegram\"},{key:\"telegramImageTransferMode\",label:\"Image Transfer\",type:\"select\",options:[\"base64\",\"url\"],group:\"telegram\"},{key:\"allowAllUsers\",label:\"Allow All Users\",type:\"boolean\",group:\"access\"},{key:\"allowedUserIds\",label:\"Allowed User IDs\",type:\"list\",group:\"access\"},{key:\"allowedGroupIds\",label:\"Allowed Group IDs\",type:\"list\",group:\"access\"},{key:\"groupChatBotEnable\",label:\"Group Bot Enable\",type:\"boolean\",group:\"access\"},{key:\"groupChatBotShareMode\",label:\"Group Share Mode\",type:\"boolean\",group:\"access\"},{key:\"autoTrimHistory\",label:\"Auto Trim History\",type:\"boolean\",group:\"history\"},{key:\"maxHistoryLength\",label:\"Max History Length\",type:\"number\",group:\"history\"},{key:\"maxTokenLength\",label:\"Max Token Length\",type:\"number\",group:\"history\"},{key:\"historyImagePlaceholder\",label:\"History Image Placeholder\",type:\"text\",group:\"history\"},{key:\"imageSize\",label:\"Image Size\",type:\"text\",group:\"image\"},{key:\"imageQuality\",label:\"Image Quality\",type:\"text\",group:\"image\"},{key:\"imageStyle\",label:\"Image Style\",type:\"text\",group:\"image\"}];class X extends HTMLElement{settings={};aboutInfo=null;set value(e){this.settings={...e},this.render()}set about(e){this.aboutInfo=e,this.settings&&this.render()}get value(){const e={...this.settings};for(const t of T){const s=this.querySelector(`[name=\"${t.key}\"]`);s&&(t.type===\"boolean\"?e[t.key]=s.checked:t.type===\"number\"?e[t.key]=Number(s.value):t.type===\"list\"?e[t.key]=s.value.split(\",\").map(a=>a.trim()).filter(Boolean):e[t.key]=s.value||(t.key===\"historyImagePlaceholder\"?null:s.value))}return e}renderField(e){const t=this.settings[e.key],s=`name=\"${e.key}\"`;if(e.type===\"boolean\")return`<label class=\"list-row\">\n                <span class=\"row-main\"><span class=\"row-title\">${o(e.label)}</span></span>\n                <input type=\"checkbox\" class=\"switch\" ${s} ${t?\"checked\":\"\"} aria-label=\"${o(e.label)}\" />\n            </label>`;if(e.type===\"textarea\")return`<div class=\"row-stack\">\n                <span class=\"row-label\">${o(e.label)}</span>\n                <textarea class=\"bare\" ${s} aria-label=\"${o(e.label)}\">${o(t??\"\")}</textarea>\n            </div>`;let a;if(e.type===\"number\")a=`<input class=\"bare\" type=\"number\" inputmode=\"decimal\" ${s} value=\"${o(t??0)}\" aria-label=\"${o(e.label)}\" />`;else if(e.type===\"list\"){const n=Array.isArray(t)?t.join(\", \"):\"\";a=`<input class=\"bare\" type=\"text\" ${s} value=\"${o(n)}\" placeholder=\"Comma separated\" aria-label=\"${o(e.label)}\" />`}else if(e.type===\"select\"){const n=(e.options||[]).map(c=>`<option value=\"${o(c)}\" ${c===t?\"selected\":\"\"}>${o(c)}</option>`).join(\"\");a=`<select class=\"bare\" ${s} aria-label=\"${o(e.label)}\">${n}</select>`}else a=`<input class=\"bare\" type=\"text\" ${s} value=\"${o(t??\"\")}\" placeholder=\"${o(e.placeholder||\"\")}\" aria-label=\"${o(e.label)}\" />`;return`<div class=\"row-field\">\n            <span class=\"row-label\">${o(e.label)}</span>\n            ${a}\n        </div>`}render(){const e=K.map(n=>{const c=T.filter(p=>p.group===n.id).map(p=>this.renderField(p)).join(\"\"),r=n.footer?`<p class=\"group-footer\">${o(n.footer)}</p>`:\"\";return`<h2 class=\"section-h\">${o(n.label)}</h2><section class=\"list-group\">${c}</section>${r}`}).join(\"\"),t=this.aboutInfo,s=n=>n?`${n.label||n.name} · ${n.model}`:\"Not configured\",a=t?`<h2 class=\"section-h\">About</h2>\n               <section class=\"list-group\">\n                   <div class=\"list-row\">\n                       <span class=\"row-main\"><span class=\"row-title\">Version</span></span>\n                       <span class=\"row-value mono\">${o(t.version||\"unknown\")}</span>\n                   </div>\n                   <div class=\"list-row\">\n                       <span class=\"row-main\"><span class=\"row-title\">Chat Model</span></span>\n                       <span class=\"row-value\">${o(s(t.chat))}</span>\n                   </div>\n                   <div class=\"list-row\">\n                       <span class=\"row-main\"><span class=\"row-title\">Image Model</span></span>\n                       <span class=\"row-value\">${o(s(t.image))}</span>\n                   </div>\n               </section>`:\"\";this.replaceChildren(I(e+a))}}customElements.define(\"settings-form\",X);class Q extends HTMLElement{kind=\"chat\";protocols=[];provider;opts;addingModel=!1;fetched=null;fetching=!1;open(e,t,s,a){this.kind=e,this.protocols=t,this.provider=s,this.opts=a,this.addingModel=!1,this.fetched=null,this.fetching=!1,this.render()}close(){this.dispatchEvent(new CustomEvent(\"close\",{bubbles:!0,composed:!0}))}addModels(e){for(const t of e){const s=t.trim();s&&!this.provider.models.includes(s)&&this.provider.models.push(s)}this.provider.model=this.provider.model||this.provider.models[0]||\"\",this.provider.label||(this.provider.label=this.protocols.find(t=>t.id===this.provider.protocol)?.label||\"\"),this.addingModel=!1,this.render()}async fetchModels(){if(!this.fetching){this.fetching=!0,this.render();try{const e=await v.models(this.kind,this.provider);if(e.error)throw new Error(e.error);this.fetched=e.models}catch(e){b(e.message,!0)}finally{this.fetching=!1,this.render()}}}render(){const e=this.provider,t=this.protocols.find(d=>d.id===e.protocol),s=this.protocols.map(d=>`<option value=\"${o(d.id)}\" ${d.id===e.protocol?\"selected\":\"\"}>${o(d.label)}</option>`).join(\"\"),a=(t?.optionFields||[]).map(d=>`\n                <div class=\"row-field\">\n                    <span class=\"row-label\">${o(d.label)}${d.required?' <span style=\"color:var(--red)\">*</span>':\"\"}</span>\n                    <input class=\"bare\" data-opt=\"${o(d.key)}\" value=\"${o(e.options?.[d.key]??\"\")}\" placeholder=\"${o(d.placeholder||\"\")}\" aria-label=\"${o(d.label)}\" />\n                </div>`).join(\"\"),n=e.models.map(d=>`\n                <div class=\"list-row\">\n                    <button type=\"button\" class=\"row-btn\" data-remove-model=\"${o(d)}\" aria-label=\"Remove model ${o(d)}\">${l(\"minus-circle\")}</button>\n                    <button type=\"button\" class=\"row-main row-main-btn\" data-pick-model=\"${o(d)}\">\n                        <span class=\"row-title\" style=\"font-family:var(--mono);font-size:15px\">${o(d)}</span>\n                    </button>\n                    ${e.model===d?`<span class=\"row-check\">${l(\"check\")}</span>`:\"\"}\n                </div>`).join(\"\"),c=e.models.length?\"\":'<div class=\"list-row\"><span class=\"row-main\"><span class=\"row-sub\">No models. Add one to use this provider.</span></span></div>',r=this.addingModel?`<div class=\"list-row\">\n                  <input class=\"bare left mono\" data-model-input placeholder=\"model name\" aria-label=\"Model name\" />\n                  <button type=\"button\" class=\"row-btn blue\" data-cancel-model aria-label=\"Cancel\">Cancel</button>\n                  <button type=\"button\" class=\"row-btn blue\" data-confirm-model aria-label=\"Add model\">Add</button>\n              </div>`:`<button type=\"button\" class=\"list-row\" data-add-model>\n                  <span class=\"row-icon\" style=\"background:var(--green)\">${l(\"plus\")}</span>\n                  <span class=\"row-main\"><span class=\"row-title\">Add Model</span></span>\n              </button>`,p=t?.modelList===\"none\"?\"\":`<button type=\"button\" class=\"list-row\" data-fetch-models>\n                      <span class=\"row-icon\" style=\"background:var(--teal)\">${l(\"refresh\")}</span>\n                      <span class=\"row-main\"><span class=\"row-title\">Fetch Models</span><span class=\"row-sub\">Load the model list from the API</span></span>\n                      <span class=\"row-value\">${this.fetching?'<div class=\"spinner\"></div>':this.fetched?`${this.fetched.length} found`:\"\"}</span>\n                  </button>`,m=this.fetched&&this.fetched.length?`<h2 class=\"section-h\">Fetched models</h2>\n                   <section class=\"list-group\">\n                       ${this.fetched.map(d=>`\n                               <button type=\"button\" class=\"list-row\" data-add-fetched=\"${o(d)}\">\n                                   <span class=\"row-main\"><span class=\"row-title\" style=\"font-family:var(--mono);font-size:15px\">${o(d)}</span></span>\n                                   ${e.models.includes(d)?`<span class=\"row-check\">${l(\"check\")}</span>`:l(\"plus\")}\n                               </button>`).join(\"\")}\n                       <button type=\"button\" class=\"list-row\" data-add-all-fetched>\n                           <span class=\"row-main\"><span class=\"row-title\">Add All</span></span>\n                       </button>\n                   </section>`:\"\",u=this.opts.isDraft?\"\":`<h2 class=\"section-h\"></h2>\n               <section class=\"list-group\">\n                   <button type=\"button\" class=\"list-row destructive\" data-remove>Delete Provider</button>\n               </section>`;this.replaceChildren(h(`\n            <main>\n                <h2 class=\"section-h\">Provider</h2>\n                <section class=\"list-group\">\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">Name</span>\n                        <input class=\"bare\" data-field=\"label\" value=\"${o(e.label)}\" placeholder=\"${o(t?.label||e.protocol)}\" aria-label=\"Name\" />\n                    </div>\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">API Format</span>\n                        <select class=\"bare\" data-apply-protocol aria-label=\"API format\">${s}</select>\n                    </div>\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">Base URL</span>\n                        <input class=\"bare\" type=\"url\" inputmode=\"url\" data-field=\"baseUrl\" value=\"${o(e.baseUrl)}\" placeholder=\"https://api.example.com/v1\" aria-label=\"Base URL\" />\n                    </div>\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">API Key</span>\n                        <input class=\"bare\" type=\"password\" data-field=\"apiKey\" value=\"${o(e.apiKey)}\"\n                            placeholder=\"${e.hasApiKey?\"Unchanged\":\"Required\"}\" autocomplete=\"off\" aria-label=\"API key\" />\n                    </div>\n                    ${a}\n                </section>\n                <p class=\"group-footer\">API format switch resets the base URL and protocol options.</p>\n\n                <h2 class=\"section-h\">Models</h2>\n                <section class=\"list-group\">${c}${n}${r}${p}</section>\n                <p class=\"group-footer\">Tap a model to make it the default. The checkmark marks the current default.</p>\n                ${m}\n\n                <h2 class=\"section-h\">Options</h2>\n                <section class=\"list-group\">\n                    <label class=\"list-row\">\n                        <span class=\"row-main\"><span class=\"row-title\">Enabled</span></span>\n                        <input type=\"checkbox\" class=\"switch\" data-toggle-enabled ${e.enabled?\"checked\":\"\"} />\n                    </label>\n                    <button type=\"button\" class=\"list-row\" data-toggle-default>\n                        <span class=\"row-icon\" style=\"background:var(--orange)\">${l(\"star\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Set as Default</span><span class=\"row-sub\">Use for every request by default</span></span>\n                        ${this.opts.isDefault?`<span class=\"row-check\">${l(\"check\")}</span>`:\"\"}\n                    </button>\n                </section>\n\n                <h2 class=\"section-h\">Extra Params</h2>\n                <section class=\"list-group\">\n                    <div class=\"row-stack\">\n                        <span class=\"row-label\">JSON, merged into chat completion requests</span>\n                        <textarea class=\"bare code\" data-field=\"extraParams\" placeholder='{\"key\":\"value\"}' spellcheck=\"false\">${o(JSON.stringify(e.extraParams||{},null,2))}</textarea>\n                    </div>\n                </section>\n                ${u}\n            </main>\n        `)),this.bind()}bind(){const e=this.provider,t=()=>this.render();this.querySelectorAll(\"[data-field]\").forEach(n=>{const c=n.dataset.field,r=()=>{if(c===\"extraParams\"){try{e.extraParams=JSON.parse(n.value||\"{}\")}catch{}return}e[c]=n.value};n.addEventListener(\"input\",r),n.addEventListener(\"change\",r)}),this.querySelectorAll(\"[data-opt]\").forEach(n=>{const c=n.dataset.opt,r=()=>{e.options={...e.options,[c]:n.value}};n.addEventListener(\"input\",r),n.addEventListener(\"change\",r)}),this.querySelector(\"[data-apply-protocol]\")?.addEventListener(\"change\",n=>{const c=this.protocols.find(r=>r.id===n.target.value);e.protocol=n.target.value,e.baseUrl=c?.defaultBaseUrl||\"\",e.options={},t()}),this.querySelectorAll(\"[data-pick-model]\").forEach(n=>{n.addEventListener(\"click\",()=>{e.model=n.dataset.pickModel,t()})}),this.querySelectorAll(\"[data-remove-model]\").forEach(n=>{n.addEventListener(\"click\",()=>{const c=n.dataset.removeModel;e.models=e.models.filter(r=>r!==c),e.model===c&&(e.model=e.models[0]||\"\"),t()})}),this.querySelector(\"[data-add-model]\")?.addEventListener(\"click\",()=>{this.addingModel=!0,t(),this.querySelector(\"[data-model-input]\")?.focus()}),this.querySelector(\"[data-cancel-model]\")?.addEventListener(\"click\",()=>{this.addingModel=!1,t()});const s=()=>{const n=this.querySelector(\"[data-model-input]\")?.value.trim();n?this.addModels([n]):(this.addingModel=!1,t())};this.querySelector(\"[data-confirm-model]\")?.addEventListener(\"click\",s),this.querySelector(\"[data-model-input]\")?.addEventListener(\"keydown\",n=>{n.key===\"Enter\"&&(n.preventDefault(),s())}),this.querySelector(\"[data-fetch-models]\")?.addEventListener(\"click\",()=>this.fetchModels()),this.querySelectorAll(\"[data-add-fetched]\").forEach(n=>{n.addEventListener(\"click\",()=>this.addModels([n.dataset.addFetched]))}),this.querySelector(\"[data-add-all-fetched]\")?.addEventListener(\"click\",()=>this.addModels(this.fetched||[])),this.querySelector(\"[data-toggle-enabled]\")?.addEventListener(\"change\",n=>{e.enabled=n.target.checked}),this.querySelector(\"[data-toggle-default]\")?.addEventListener(\"click\",()=>{this.opts.onDefault(!this.opts.isDefault),this.opts.isDefault=!this.opts.isDefault,t()});const a=this.querySelector(\"[data-remove]\");a?.addEventListener(\"click\",()=>M(a,()=>{this.opts.onRemove(),this.close()},\"Tap again to delete\"))}}customElements.define(\"provider-form\",Q);class Y extends HTMLElement{kind=\"chat\";protocols=[];providers=[];defaultId=null;configure(e,t,s,a){this.kind=e,this.protocols=t,this.providers=s.map(n=>({...n,models:[...n.models||[]]})),this.defaultId=a,this.render()}get value(){return{providers:this.providers,defaultId:this.defaultId}}get backLabel(){return this.kind===\"chat\"?\"Chat\":\"Image\"}tint(e){const t=[\"var(--blue)\",\"var(--purple)\",\"var(--teal)\",\"var(--orange)\",\"var(--green)\",\"var(--red)\"];return t[e%t.length]}render(){const e=this.providers.map((s,a)=>{const n=this.defaultId===s.id,c=[s.model||\"No model\",`${s.models.length} model${s.models.length===1?\"\":\"s\"}`,s.enabled?\"\":\"Disabled\"].filter(Boolean).join(\" · \");return`\n                <button type=\"button\" class=\"list-row\" data-edit=\"${o(s.id)}\">\n                    <span class=\"row-icon\" style=\"background:${this.tint(a)}\">${o((s.label||s.protocol)[0].toUpperCase())}</span>\n                    <span class=\"row-main\">\n                        <span class=\"row-title\">${o(s.label||s.protocol)}</span>\n                        <span class=\"row-sub\">${o(c)}</span>\n                    </span>\n                    ${n?`<span class=\"row-check\">${l(\"check\")}</span>`:\"\"}\n                    ${l(\"chevron-right\")}\n                </button>\n            `}).join(\"\"),t=this.providers.length?\"\":'<div class=\"list-row\"><span class=\"row-main\"><span class=\"row-sub\">No providers yet. Add one to start chatting.</span></span></div>';this.replaceChildren(h(`\n            <main>\n                <section class=\"list-group\">\n                    <button type=\"button\" class=\"list-row\" data-add>\n                        <span class=\"row-icon\" style=\"background:var(--green)\">${l(\"plus\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">Add Provider</span><span class=\"row-sub\">Custom API endpoint</span></span>\n                    </button>\n                </section>\n                <section class=\"list-group\">${t}${e}</section>\n                <p class=\"group-footer\">Tap a provider to edit its endpoint, models and options. The checkmark marks the default provider for ${this.kind===\"chat\"?\"chat\":\"image generation\"}.</p>\n            </main>\n        `)),this.querySelector(\"[data-add]\")?.addEventListener(\"click\",()=>{const s=this.protocols[0];if(!s)return;const a=this.blank(s);this.openForm(a,!0)}),this.querySelectorAll(\"[data-edit]\").forEach(s=>{s.addEventListener(\"click\",()=>{const a=this.providers.find(n=>n.id===s.dataset.edit);a&&this.openForm(a,!1)})})}blank(e){return{id:k(this.kind),protocol:e.id,label:\"\",enabled:!0,hasApiKey:!1,apiKey:\"\",baseUrl:e.defaultBaseUrl,model:\"\",models:[],extraParams:{},options:{}}}openForm(e,t){t&&this.providers.push(e),this.dispatchEvent(new CustomEvent(\"push\",{bubbles:!0,composed:!0,detail:{title:t?\"Add Provider\":e.label||e.protocol,back:this.backLabel,onClose:()=>{t&&!e.models.length&&(this.providers=this.providers.filter(s=>s.id!==e.id)),this.render()},autosave:!0,mount:s=>{const a=document.createElement(\"provider-form\");a.open(this.kind,this.protocols,e,{isDraft:t,isDefault:this.defaultId===e.id,onDefault:n=>{n?this.defaultId=e.id:this.defaultId===e.id&&(this.defaultId=null)},onRemove:()=>{this.providers=this.providers.filter(n=>n.id!==e.id),this.defaultId===e.id&&(this.defaultId=null)}}),s.replaceChildren(a)}}}))}}customElements.define(\"provider-page\",Y);const Z=[{id:\"all_private_chats\",label:\"Private Chats\"},{id:\"all_group_chats\",label:\"Group Chats\"},{id:\"all_chat_administrators\",label:\"Chat Administrators\"}];function ee(i,e){if(e===\"plugin\")return\"var(--orange)\";const t=[\"var(--green)\",\"var(--teal)\",\"var(--blue)\",\"var(--purple)\"];return t[i%t.length]}class te extends HTMLElement{kind=\"plugin\";item;opts;open(e,t,s){this.kind=e,this.item=t,this.opts=s,this.render()}close(){this.dispatchEvent(new CustomEvent(\"close\",{bubbles:!0,composed:!0}))}render(){const e=this.item,t=Z.map(p=>`\n            <label class=\"list-row\">\n                <span class=\"row-main\"><span class=\"row-title\">${p.label}</span><span class=\"row-sub\">${p.id}</span></span>\n                <input type=\"checkbox\" class=\"switch\" data-scope=\"${p.id}\" ${e.scope.includes(p.id)?\"checked\":\"\"} aria-label=\"${p.label}\" />\n            </label>`).join(\"\"),s=this.kind===\"plugin\"?\"Template\":\"Value\",a=this.kind===\"plugin\"?\"JSON or remote URL\":'/setenvs {\"defaultChatProvider\":\"openai\"} or any text',n=this.kind===\"plugin\"?\"JSON template or remote URL. The rendered result is sent as the reply\":\"Values starting with /setenv, /setenvs, /delenv or JSON are applied as a config patch (admin only); anything else expands as a text alias\",c=this.kind===\"plugin\"?e.template:e.value,r=this.kind===\"plugin\"?`<h2 class=\"section-h\">Environment</h2>\n                   <section class=\"list-group\">\n                       <div class=\"row-stack\">\n                           <span class=\"row-label\">JSON key-value pairs, available when rendering the template</span>\n                           <textarea class=\"bare code\" data-env placeholder='{\"KEY\":\"value\"}' spellcheck=\"false\">${o(JSON.stringify(e.env||{},null,2))}</textarea>\n                       </div>\n                   </section>`:\"\";this.replaceChildren(h(`\n            <main>\n                <h2 class=\"section-h\">Command</h2>\n                <section class=\"list-group\">\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">Command</span>\n                        <input class=\"bare mono\" data-field=\"command\" value=\"${o(e.command)}\" placeholder=\"/command\" aria-label=\"Command\" />\n                    </div>\n                    <div class=\"row-field\">\n                        <span class=\"row-label\">Description</span>\n                        <input class=\"bare\" data-field=\"description\" value=\"${o(e.description)}\" placeholder=\"What it does\" aria-label=\"Description\" />\n                    </div>\n                    <label class=\"list-row\">\n                        <span class=\"row-main\"><span class=\"row-title\">Enabled</span></span>\n                        <input type=\"checkbox\" class=\"switch\" data-field-enabled ${e.enabled?\"checked\":\"\"} aria-label=\"Enabled\" />\n                    </label>\n                </section>\n\n                <h2 class=\"section-h\">Scope</h2>\n                <section class=\"list-group\">${t}</section>\n                <p class=\"group-footer\">Choose which chats expose the command. It is also registered in the Telegram command menu.</p>\n\n                <h2 class=\"section-h\">${s}</h2>\n                <section class=\"list-group\">\n                    <div class=\"row-stack\">\n                        <span class=\"row-label\">${n}</span>\n                        <textarea class=\"bare code\" data-field-content placeholder=\"${o(a)}\" spellcheck=\"false\">${o(c)}</textarea>\n                    </div>\n                </section>\n                ${r}\n\n                <section class=\"list-group\">\n                    <button type=\"button\" class=\"list-row destructive\" data-remove>Delete Command</button>\n                </section>\n            </main>\n        `)),this.bind()}bind(){const e=this.item;this.querySelector('[data-field=\"command\"]')?.addEventListener(\"input\",s=>{e.command=s.target.value}),this.querySelector('[data-field=\"description\"]')?.addEventListener(\"input\",s=>{e.description=s.target.value}),this.querySelector(\"[data-field-enabled]\")?.addEventListener(\"change\",s=>{e.enabled=s.target.checked}),this.querySelectorAll(\"[data-scope]\").forEach(s=>{s.addEventListener(\"change\",()=>{const a=s.dataset.scope;s.checked&&!e.scope.includes(a)?e.scope.push(a):s.checked||(e.scope=e.scope.filter(n=>n!==a))})}),this.querySelector(\"[data-field-content]\")?.addEventListener(\"input\",s=>{this.kind===\"plugin\"?e.template=s.target.value:e.value=s.target.value}),this.querySelector(\"[data-env]\")?.addEventListener(\"input\",s=>{try{e.env=JSON.parse(s.target.value||\"{}\")}catch{}});const t=this.querySelector(\"[data-remove]\");t?.addEventListener(\"click\",()=>M(t,()=>{this.opts.onRemove(),this.close()},\"Tap again to delete\"))}}customElements.define(\"item-form\",te);class A extends HTMLElement{kind=\"plugin\";items=[];set value(e){this.items=e.map(t=>({...t,scope:[...t.scope||[]],env:{...t.env}})),this.render()}get value(){return this.items}get addLabel(){return this.kind===\"plugin\"?\"Add Plugin\":\"Add Command\"}get backLabel(){return this.kind===\"plugin\"?\"Plugins\":\"Commands\"}blank(){return this.kind===\"plugin\"?{id:k(\"plugin\"),command:\"/\",description:\"\",scope:[],template:\"\",env:{},enabled:!0}:{id:k(\"custom\"),command:\"/\",description:\"\",scope:[],value:\"\",enabled:!0}}render(){const e=this.items.map((s,a)=>`\n                <button type=\"button\" class=\"list-row\" data-edit=\"${o(s.id)}\">\n                    <span class=\"row-icon\" style=\"background:${ee(a,this.kind)}\">${l(this.kind===\"plugin\"?\"puzzle\":\"terminal\")}</span>\n                    <span class=\"row-main\">\n                        <span class=\"row-title\" style=\"font-family:var(--mono);font-size:15px\">${o(s.command||\"/\")}</span>\n                        <span class=\"row-sub\">${o(s.description||(s.enabled?\"Enabled\":\"Disabled\"))}</span>\n                    </span>\n                    ${s.enabled?\"\":'<span class=\"row-value\">Off</span>'}\n                    ${l(\"chevron-right\")}\n                </button>`).join(\"\"),t=this.items.length?\"\":`<div class=\"list-row\"><span class=\"row-main\"><span class=\"row-sub\">${this.kind===\"plugin\"?\"No plugin commands yet.\":\"No custom commands yet.\"}</span></span></div>`;this.replaceChildren(h(`\n            <main>\n                <section class=\"list-group\">\n                    <button type=\"button\" class=\"list-row\" data-add>\n                        <span class=\"row-icon\" style=\"background:var(--green)\">${l(\"plus\")}</span>\n                        <span class=\"row-main\"><span class=\"row-title\">${this.addLabel}</span></span>\n                    </button>\n                </section>\n                <section class=\"list-group\">${t}${e}</section>\n            </main>\n        `)),this.querySelector(\"[data-add]\")?.addEventListener(\"click\",()=>{const s=this.blank();this.items.push(s),this.openForm(s)}),this.querySelectorAll(\"[data-edit]\").forEach(s=>{s.addEventListener(\"click\",()=>{const a=this.items.find(n=>n.id===s.dataset.edit);a&&this.openForm(a)})})}openForm(e){this.dispatchEvent(new CustomEvent(\"push\",{bubbles:!0,composed:!0,detail:{title:e.command||this.addLabel,back:this.backLabel,onClose:()=>this.render(),autosave:!0,mount:t=>{const s=document.createElement(\"item-form\");s.open(this.kind,e,{onRemove:()=>{this.items=this.items.filter(a=>a.id!==e.id)}}),t.replaceChildren(s)}}}))}}class se extends A{kind=\"plugin\"}customElements.define(\"plugins-page\",se);class ae extends A{kind=\"custom\"}customElements.define(\"commands-page\",ae);const y=[{id:\"providers\",label:\"Chat\",title:\"Chat Providers\",icon:\"bot\",tint:\"var(--blue)\"},{id:\"image\",label:\"Image\",title:\"Image Providers\",icon:\"image\",tint:\"var(--purple)\"},{id:\"settings\",label:\"Settings\",title:\"Settings\",icon:\"gear\",tint:\"var(--text-3)\"},{id:\"plugins\",label:\"Plugins\",title:\"Plugins\",icon:\"puzzle\",tint:\"var(--orange)\"},{id:\"commands\",label:\"Commands\",title:\"Custom Commands\",icon:\"terminal\",tint:\"var(--green)\"}];class ne extends HTMLElement{config=null;meta=null;agents=null;info=null;tab=\"providers\";pages={};nav=null;connectedCallback(){this.addEventListener(\"logged-in\",()=>this.load()),this.addEventListener(\"push\",e=>{this.nav?.push(e.detail),this.updateFab()}),this.renderLoginGate()}renderLoginGate(){this.replaceChildren(h(\"<admin-login></admin-login>\"))}async load(){try{[this.meta,this.config,this.agents,this.info]=await Promise.all([v.meta(),v.getConfig(),v.agents().catch(()=>({chat:null,image:null})),v.pageInfo().catch(()=>null)]),this.renderShell()}catch(e){b(e.message,!0),E(null),this.renderLoginGate()}}pageEl(e){return this.querySelector(`.page-root[data-tab=\"${e}\"]`)}renderShell(){if(!this.config||!this.meta)return;const e=h(`\n            <div class=\"admin-app\">\n                <nav-stack>\n                    ${y.map(t=>`<div class=\"page-root\" data-tab=\"${t.id}\" hidden></div>`).join(\"\")}\n                </nav-stack>\n                <button type=\"button\" class=\"save-fab\" data-save>Save</button>\n                <nav class=\"tabbar\" role=\"tablist\" aria-label=\"Admin sections\">\n                    ${y.map(t=>`<button type=\"button\" role=\"tab\" class=\"tab-btn\" data-tab=\"${t.id}\" aria-selected=\"${t.id===this.tab}\">\n                            ${l(t.icon)}<span>${t.label}</span>\n                        </button>`).join(\"\")}\n                </nav>\n            </div>\n        `);e.querySelectorAll(\".tab-btn\").forEach(t=>{t.addEventListener(\"click\",()=>this.switchTab(t.dataset.tab))}),e.querySelector(\"[data-save]\")?.addEventListener(\"click\",()=>this.save()),this.nav=e.querySelector(\"nav-stack\"),this.nav?.addEventListener(\"pop\",t=>{t.detail?.autosave&&(this.collect(),this.persist()),this.updateFab()}),this.replaceChildren(e),this.pages={};for(const t of y)this.renderTab(t.id);this.activateTab(this.tab)}renderTab(e){const t=this.config,s=this.meta,a=this.pageEl(e),n=y.find(p=>p.id===e);if(!a)return;const c=h(`\n            <div>\n                <header class=\"navbar\">\n                    <div class=\"nav-brand\"><span class=\"nav-appicon\" style=\"background:${n.tint}\">${l(n.icon)}</span><strong>${n.title}</strong></div>\n                </header>\n            </div>\n        `);let r;if(e===\"providers\"||e===\"image\"){const p=e===\"providers\";r=document.createElement(\"provider-page\"),r.configure(p?\"chat\":\"image\",p?s.chatProtocols:s.imageProtocols,p?t.chatProviders:t.imageProviders,p?t.defaultChatProvider:t.defaultImageProvider)}else e===\"settings\"?(r=document.createElement(\"settings-form\"),r.value=t.settings,r.about={version:this.info?`${this.info.version} (${new Date(this.info.timestamp*1e3).toISOString().slice(0,10)})`:null,chat:this.agents?.chat??null,image:this.agents?.image??null}):e===\"plugins\"?(r=document.createElement(\"plugins-page\"),r.value=t.plugins):(r=document.createElement(\"commands-page\"),r.value=t.customCommands);this.pages[e]=r,c.append(r),a.replaceChildren(c)}activateTab(e){for(const t of y)this.pageEl(t.id)?.toggleAttribute(\"hidden\",t.id!==e);this.querySelectorAll(\".tab-btn\").forEach(t=>{t.setAttribute(\"aria-selected\",String(t.dataset.tab===e)),t.classList.toggle(\"active\",t.dataset.tab===e)}),this.updateFab()}switchTab(e){e!==this.tab&&(this.nav?.pushed&&this.nav.popInstant(),this.collect(),this.tab=e,this.activateTab(e))}collect(){if(!this.config)return;const e=this.pages.providers;if(e){const{providers:s,defaultId:a}=e.value;this.config.chatProviders=s,this.config.defaultChatProvider=a}const t=this.pages.image;if(t){const{providers:s,defaultId:a}=t.value;this.config.imageProviders=s,this.config.defaultImageProvider=a}this.pages.settings&&(this.config.settings=this.pages.settings.value),this.pages.plugins&&(this.config.plugins=this.pages.plugins.value),this.pages.commands&&(this.config.customCommands=this.pages.commands.value)}async save(){const e=[...this.querySelectorAll(\"[data-save]\")];if(!e.some(t=>t.disabled)){this.collect(),e.forEach(t=>{t.disabled=!0,t.textContent=\"Saving…\"});try{await this.persist(),this.nav?.pushed&&this.nav.popInstant(),await this.load()}catch(t){b(t.message,!0)}finally{e.forEach(t=>{t.disabled=!1,t.textContent=\"Save\"})}}}async persist(){try{await v.saveConfig(this.config),b(\"Saved\")}catch(e){b(e.message,!0)}}updateFab(){const e=this.querySelector(\".save-fab\");e&&(e.style.display=this.tab===\"settings\"||(this.nav?.pushed??!1)?\"\":\"none\")}}customElements.define(\"admin-app\",ne);const L={\"/\":{tag:\"page-home\",page:\"home\"},\"/help\":{tag:\"page-help\",page:\"help\"},\"/init\":{tag:\"page-init\",page:\"init\"},\"/interpolate\":{tag:\"page-interpolate\",page:\"interpolate\"},\"/admin\":{tag:\"admin-app\",page:\"admin\"}};function ie(){const i=location.pathname.replace(/\\/+$/,\"\")||\"/\",e=L[i]??L[\"/\"];document.body.dataset.page=e.page;const t=document.getElementById(\"app\");t&&t.replaceChildren(document.createElement(e.tag))}ie();\n\n</script>\n      <style>\n:root{--bg: #f2f2f7;--bg-elevated: #ffffff;--fill-1: rgba(120, 120, 128, .16);--fill-2: rgba(120, 120, 128, .26);--text: #000000;--text-2: #6c6c70;--text-3: #8e8e93;--sep: rgba(60, 60, 67, .24);--blue: #007aff;--green: #34c759;--red: #ff3b30;--orange: #ff9500;--purple: #af52de;--teal: #30b0c7;--nav-h: 44px;--tab-h: 49px;--radius-group: 12px;--blur-bg: color-mix(in srgb, var(--bg) 78%, transparent);--font: -apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Segoe UI\", Roboto, \"PingFang SC\", \"Microsoft YaHei\", sans-serif;--mono: ui-monospace, \"SF Mono\", SFMono-Regular, Menlo, Consolas, monospace;--push-ease: cubic-bezier(.32, .72, 0, 1);--push-ms: .34s}@media(prefers-color-scheme:dark){:root{--bg: #000000;--bg-elevated: #1c1c1e;--fill-1: rgba(120, 120, 128, .32);--fill-2: rgba(120, 120, 128, .44);--text: #ffffff;--text-2: rgba(235, 235, 245, .66);--text-3: rgba(235, 235, 245, .42);--sep: rgba(84, 84, 88, .6);--blue: #0a84ff;--green: #30d158;--red: #ff453a;--orange: #ff9f0a;--purple: #bf5af2;--teal: #40cbe0;--blur-bg: color-mix(in srgb, var(--bg) 72%, transparent)}}*,*:before,*:after{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;min-height:100dvh;background:var(--bg);color:var(--text);font-family:var(--font);font-size:17px;line-height:1.45;-webkit-font-smoothing:antialiased}h1,h2,h3,p{margin:0}a{color:var(--blue);text-decoration:none}:focus-visible{outline:2px solid var(--blue);outline-offset:-2px;border-radius:6px}::selection{background:color-mix(in srgb,var(--blue) 30%,transparent)}page-home,page-help,page-init,page-interpolate,admin-app{display:block}.icon{width:22px;height:22px;flex:none}.muted{color:var(--text-2);font-size:15px}.hidden{display:none!important}.contents{display:contents}main{display:block;max-width:640px;margin:0 auto;padding-top:16px;padding-bottom:calc(40px + env(safe-area-inset-bottom))}.page-footer{margin:8px 32px 0;color:var(--text-3);font-size:13px;text-align:center}.navbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;height:calc(var(--nav-h) + env(safe-area-inset-top));padding:env(safe-area-inset-top) 0 0;background:var(--blur-bg);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.navbar:after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--sep)}.nav-title{position:absolute;left:50%;transform:translate(-50%);max-width:46%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:17px;font-weight:600;pointer-events:none}.nav-left,.nav-right{display:flex;align-items:center;gap:2px;min-height:var(--nav-h);padding:0 10px;border:0;background:none;color:var(--blue);font:inherit;font-size:17px;cursor:pointer;-webkit-tap-highlight-color:transparent}.nav-left{margin-left:4px}.nav-left .icon{width:24px;height:24px;margin-left:-6px}.nav-left:active,.nav-right:active{opacity:.45}.nav-right{margin-left:auto;margin-right:8px;font-weight:600}.nav-right:disabled{opacity:.4;cursor:default}.nav-brand{display:flex;align-items:center;gap:9px;min-width:0;padding:0 10px 0 16px;font-size:17px;font-weight:700}.nav-brand strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nav-appicon{display:grid;place-items:center;width:28px;height:28px;border-radius:7px;background:var(--blue);color:#fff;flex:none}.nav-appicon .icon{width:17px;height:17px}.nav-badge{flex:none;margin-left:auto;margin-right:14px;padding:3px 9px;border-radius:999px;background:var(--fill-1);color:var(--text-2);font-size:12px;font-weight:600}.admin-app{max-width:640px;margin:0 auto;min-height:100dvh;position:relative}.tabbar{position:fixed;left:50%;transform:translate(-50%);bottom:0;z-index:30;display:flex;width:100%;max-width:640px;height:calc(var(--tab-h) + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);background:var(--blur-bg);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.tabbar:before{content:\"\";position:absolute;left:0;right:0;top:0;height:1px;background:var(--sep)}.tab-btn{flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:1px;min-width:0;padding:5px 2px 0;border:0;background:none;color:var(--text-3);font:inherit;font-size:10px;font-weight:500;letter-spacing:.01em;cursor:pointer;-webkit-tap-highlight-color:transparent}.tab-btn .icon{width:26px;height:26px;stroke-width:1.7}.tab-btn:active{opacity:.55}.tab-btn.active{color:var(--blue)}.page-root{padding-bottom:calc(var(--tab-h) + env(safe-area-inset-bottom) + 28px)}nav-stack{position:relative;display:block}nav-stack.pushed{min-height:100dvh}.page-root{background:var(--bg);transition:transform var(--push-ms) var(--push-ease),opacity var(--push-ms) var(--push-ease)}.page-root[hidden]{display:none}nav-stack.pushed .page-root.active{transform:translate(-26%);opacity:.6}.push-page{position:absolute;inset:0;z-index:25;display:flex;flex-direction:column;background:var(--bg);transform:translate(100%);transition:transform var(--push-ms) var(--push-ease);overscroll-behavior:contain}.push-page.open{transform:translate(0)}.push-page.leaving{transform:translate(100%)}.push-content{flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch}.section-h{margin:6px 32px 8px;color:var(--text-2);font-size:13px;font-weight:400;text-transform:uppercase;letter-spacing:.04em}.section-h:first-child{margin-top:8px}.list-group{margin:0 16px 24px;border-radius:var(--radius-group);background:var(--bg-elevated);overflow:hidden}.list-row{position:relative;display:flex;align-items:center;gap:12px;width:100%;min-height:44px;padding:10px 16px;border:0;background:none;color:inherit;font:inherit;text-align:left;-webkit-tap-highlight-color:transparent}a.list-row,button.list-row,label.list-row{cursor:pointer}a.list-row:active,button.list-row:active,label.list-row:active{background:var(--fill-2)}.list-row+.list-row:before,.list-row+.row-stack:before,.list-row+.row-field:before,.row-stack+.list-row:before,.row-stack+.row-stack:before,.row-stack+.row-field:before,.row-field+.list-row:before,.row-field+.row-stack:before,.row-field+.row-field:before{content:\"\";position:absolute;top:0;left:16px;right:0;height:1px;background:var(--sep)}.list-row.destructive{justify-content:center;color:var(--red);font-size:17px;min-height:46px}.list-row.destructive:active{background:none}.list-row.destructive.armed{background:var(--red);color:#fff}.row-icon{display:grid;place-items:center;width:29px;height:29px;border-radius:7px;background:var(--blue);color:#fff;flex:none}.row-icon .icon{width:17px;height:17px}.row-num{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--fill-1);color:var(--text-2);font-size:15px;font-weight:600;flex:none}.row-main{flex:1 1 auto;min-width:0}.row-title{display:block;font-size:17px;line-height:1.3;overflow-wrap:anywhere}.row-sub{display:block;margin-top:1px;color:var(--text-2);font-size:13px;line-height:1.4;overflow-wrap:anywhere}.row-value{flex:none;max-width:45%;color:var(--text-2);font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-value.mono{font-family:var(--mono);font-size:13px}.row-chevron{color:var(--text-3);width:17px;height:17px;flex:none}.row-check{display:flex;color:var(--blue);flex:none}.row-check .icon{width:19px;height:19px;stroke-width:2.4}.row-btn{display:flex;align-items:center;border:0;background:none;color:var(--red);padding:10px;margin:-10px 0 -10px -12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.row-btn .icon{width:21px;height:21px}.row-btn:active{opacity:.45}.row-btn.blue{color:var(--blue);margin:-10px -12px -10px 0}.bare{flex:1 1 0;min-width:0;border:0;background:none;color:var(--text);font:inherit;font-size:17px;text-align:right;padding:6px 0;-webkit-tap-highlight-color:transparent}.bare::placeholder{color:var(--text-3)}.bare:focus{outline:none}.bare:focus-visible{outline:none}.bare.mono{font-family:var(--mono);font-size:14px}.bare.left{text-align:left}select.bare{appearance:none;-webkit-appearance:none;text-align:right;color:var(--text-2);cursor:pointer;padding-right:0}input[type=number].bare::-webkit-inner-spin-button,input[type=number].bare::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.row-stack{position:relative;display:block;padding:10px 16px 12px}.row-stack .row-label{display:block;margin-bottom:6px;color:var(--text-2);font-size:13px}.row-field{position:relative;display:block;padding:8px 16px 10px}.row-field .row-label{display:block;margin-bottom:3px;color:var(--text-2);font-size:13px;line-height:1.3}.row-field .bare{display:block;width:100%;text-align:left;padding:2px 0 3px;text-overflow:ellipsis}.row-field select.bare{text-align:left}textarea.bare{display:block;width:100%;min-height:96px;text-align:left;resize:vertical;line-height:1.5}textarea.bare.code{font-family:var(--mono);font-size:13.5px;min-height:120px}.group-footer{margin:-14px 32px 24px;color:var(--text-2);font-size:13px;line-height:1.45}.row-main-btn{display:block;flex:1 1 auto;min-width:0;border:0;background:none;padding:0;color:inherit;font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent}.row-main-btn:active{opacity:.5}.row-value .spinner{width:16px;height:16px;border-width:2px;margin:4px 0}.switch{appearance:none;-webkit-appearance:none;position:relative;width:51px;height:31px;margin:0;border-radius:999px;background:var(--fill-1);transition:background .2s ease;cursor:pointer;flex:none}.switch:after{content:\"\";position:absolute;top:2px;left:2px;width:27px;height:27px;border-radius:50%;background:#fff;box-shadow:0 2px 5px #00000047;transition:transform .2s ease}.switch:checked{background:var(--green)}.switch:checked:after{transform:translate(20px)}.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:50px;border:0;border-radius:12px;background:var(--blue);color:#fff;font:inherit;font-size:17px;font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:filter .15s ease,opacity .15s ease}.btn:active{filter:brightness(.82)}.btn:disabled{opacity:.45;cursor:default}.btn.gray{background:var(--fill-1);color:var(--text)}.btn.plain{background:none;color:var(--blue);min-height:44px}.btn-row{display:flex;gap:12px;padding:0 16px;margin-bottom:24px}.save-fab{position:fixed;left:50%;transform:translate(-50%);bottom:calc(var(--tab-h) + env(safe-area-inset-bottom) + 12px);z-index:31;display:flex;align-items:center;justify-content:center;width:min(calc(100% - 32px),608px);height:44px;border:0;border-radius:12px;background:var(--blue);color:#fff;font:inherit;font-size:16px;font-weight:600;box-shadow:0 8px 24px #00000047;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:filter .15s ease,opacity .15s ease}.save-fab:active{filter:brightness(.82)}.save-fab:disabled{opacity:.45;cursor:default}.admin-app main{padding-bottom:calc(var(--tab-h) + 72px + env(safe-area-inset-bottom))}.hero{display:flex;flex-direction:column;align-items:center;gap:10px;padding:32px 24px 20px;text-align:center}.app-icon{display:grid;place-items:center;width:86px;height:86px;border-radius:21px;background:var(--blue);color:#fff;box-shadow:0 10px 26px color-mix(in srgb,var(--blue) 34%,transparent)}.app-icon .icon{width:44px;height:44px;stroke-width:1.6}.hero h1{font-size:28px;font-weight:800;letter-spacing:-.4px;line-height:1.15;overflow-wrap:anywhere}.hero .muted{max-width:420px;overflow-wrap:anywhere}.status-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:999px;font-size:15px;font-weight:600}.status-chip .icon{width:18px;height:18px}.status-chip.ok{background:color-mix(in srgb,var(--green) 15%,transparent);color:var(--green)}.status-chip.err{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red)}.status-chip.warn{background:color-mix(in srgb,var(--orange) 16%,transparent);color:var(--orange)}.big-status{display:grid;place-items:center;width:84px;height:84px;border-radius:50%}.big-status.ok{color:var(--green);background:color-mix(in srgb,var(--green) 15%,transparent)}.big-status.err{color:var(--red);background:color-mix(in srgb,var(--red) 14%,transparent)}.big-status .icon{width:42px;height:42px;stroke-width:2}.spinner{width:22px;height:22px;border:2.5px solid var(--fill-1);border-top-color:var(--blue);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.alert{display:flex;align-items:flex-start;gap:10px;width:100%;border-radius:var(--radius-group);padding:12px 16px;font-size:15px;line-height:1.45}.alert .icon{width:20px;height:20px;margin-top:1px}.alert.warn{background:color-mix(in srgb,var(--orange) 15%,transparent);color:color-mix(in srgb,var(--orange) 80%,var(--text))}.alert.err{background:color-mix(in srgb,var(--red) 13%,transparent);color:color-mix(in srgb,var(--red) 85%,var(--text))}.code-block{margin:0 16px 24px;border-radius:var(--radius-group);background:var(--bg-elevated);overflow:auto;-webkit-overflow-scrolling:touch;max-height:50dvh}.code-block pre{margin:0;padding:13px 16px;font-family:var(--mono);font-size:13px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}.toast{position:fixed;left:50%;bottom:max(28px,calc(env(safe-area-inset-bottom) + 16px));transform:translate(-50%) translateY(10px);max-width:calc(100vw - 40px);padding:11px 20px;border-radius:999px;background:color-mix(in srgb,var(--bg-elevated) 90%,transparent);-webkit-backdrop-filter:saturate(180%) blur(16px);backdrop-filter:saturate(180%) blur(16px);box-shadow:0 6px 24px #00000038;color:var(--text);font-size:15px;font-weight:600;opacity:0;transition:opacity .22s ease,transform .22s ease;pointer-events:none;z-index:40}.toast.error{color:var(--red)}.toast.show{opacity:1;transform:translate(-50%) translateY(0)}admin-app-body .toast,body[data-page=admin] .toast{bottom:calc(var(--tab-h) + env(safe-area-inset-bottom) + 18px)}.pg-grid{display:flex;flex-direction:column;gap:12px;padding:12px 16px calc(20px + env(safe-area-inset-bottom));max-width:1440px;margin:0 auto;width:100%}.pane{display:flex;flex-direction:column;min-height:0;border-radius:var(--radius-group);background:var(--bg-elevated);overflow:hidden}.pane-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 14px;border-bottom:1px solid var(--sep);color:var(--text-2);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}.pane-head .icon{width:15px;height:15px}.pane textarea,.pane pre{flex:1 1 auto;min-height:0;margin:0;border:0;padding:12px 14px;background:none;color:var(--text);font-family:var(--mono);font-size:13px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;-webkit-overflow-scrolling:touch;outline:none;resize:none}.pane textarea{min-height:220px}.pane .error{color:var(--red)}@media(min-width:900px){body[data-page=interpolate]{height:100dvh;display:flex;flex-direction:column;overflow:hidden}body[data-page=interpolate] page-interpolate{display:flex;flex-direction:column;flex:1;min-height:0}body[data-page=interpolate] .pg-grid{flex:1 1 auto;display:grid;grid-template-areas:\"template data\" \"preview preview\";grid-template-columns:1fr 1fr;grid-template-rows:minmax(0,1.15fr) minmax(0,1fr);min-height:0}body[data-page=interpolate] #template-area{grid-area:template}body[data-page=interpolate] #data-area{grid-area:data}body[data-page=interpolate] .preview-area{grid-area:preview}body[data-page=interpolate] .pane textarea{min-height:0}}@media(min-width:900px){.hero{padding-top:64px}.hero h1{font-size:34px}}@media(min-width:680px){.admin-app{border-left:1px solid var(--sep);border-right:1px solid var(--sep)}.push-page{left:calc(50% - 320px);right:auto;width:640px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}}\n\n</style>\n    </head>\n\n    <body>\n        <div id=\"app\"></div>\n    </body>\n</html>\n";
function contentToText(content) {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content.filter((item) => item?.type === "text").map((item) => item.text ?? "").join("");
  }
  return "";
}
function extractSystem(options) {
  const systems = [];
  if (options.system) {
    systems.push(options.system);
  }
  const messages = [];
  for (const message of options.messages) {
    if (message.role === "system") {
      const text = contentToText(message.content);
      if (text) {
        systems.push(text);
      }
    } else {
      messages.push(message);
    }
  }
  return { system: systems.length > 0 ? systems.join("\n\n") : void 0, messages };
}
function sumTokens(inputTokens, outputTokens) {
  if (inputTokens === void 0 || outputTokens === void 0) {
    return void 0;
  }
  return inputTokens + outputTokens;
}
function joinUrl(base, path) {
  const trimmed = (base || "").replace(/\/+$/, "");
  const queryIndex = trimmed.indexOf("?");
  if (queryIndex === -1) {
    return `${trimmed}${path}`;
  }
  return `${trimmed.slice(0, queryIndex)}${path}${trimmed.slice(queryIndex)}`;
}
async function postJSON(url, options) {
  const doFetch = options.fetch || fetch;
  const response = await doFetch(url, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(options.body),
    signal: options.signal
  });
  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }
  return response;
}
async function extractErrorMessage(response) {
  const fallback = `${response.status} ${response.statusText}`;
  try {
    const data = await response.json();
    return data?.error?.message || data?.errors?.[0]?.message || data?.message || fallback;
  } catch {
    return fallback;
  }
}
function parseJSONSync(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
const DEFAULT_IMAGE_MIME_TYPE = "image/jpeg";
function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
function toDataURI(base64, mimeType) {
  return `data:${mimeType};base64,${base64}`;
}
function normalizeBytes(image) {
  return image instanceof Uint8Array ? image : new Uint8Array(image);
}
function parseDataURI(url) {
  const match = /^data:([^;,]+);base64,(.+)$/s.exec(url);
  if (!match) {
    return null;
  }
  return { mimeType: match[1], base64: match[2] };
}
function resolveImage(image, defaultMimeType = DEFAULT_IMAGE_MIME_TYPE) {
  if (typeof image === "string" || image instanceof URL) {
    const url = image.toString();
    const dataURI = parseDataURI(url);
    if (dataURI) {
      return { base64: dataURI.base64, mimeType: dataURI.mimeType };
    }
    if (/^(https?|blob):/i.test(url)) {
      return { url };
    }
    return { base64: url, mimeType: defaultMimeType };
  }
  return { base64: bytesToBase64(normalizeBytes(image)), mimeType: defaultMimeType };
}
function imageFormatFromBase64(base64) {
  switch (base64.charAt(0)) {
    case "/":
      return "image/jpeg";
    case "i":
      return "image/png";
    case "U":
      return "image/webp";
    case "R":
      return "image/gif";
    default:
      throw new Error("Unsupported image format");
  }
}
const IMAGE_FETCH_CACHE =  new Map();
const IMAGE_FETCH_CACHE_MAX_ITEMS = 10;
const IMAGE_FETCH_CACHE_MAX_AGE = 1e3 * 60 * 60;
function cachedDataURI(url, doFetch) {
  const hit = IMAGE_FETCH_CACHE.get(url);
  if (hit && Date.now() - hit.time < IMAGE_FETCH_CACHE_MAX_AGE) {
    return hit.value;
  }
  if (IMAGE_FETCH_CACHE.size >= IMAGE_FETCH_CACHE_MAX_ITEMS) {
    const oldest = IMAGE_FETCH_CACHE.keys().next().value;
    if (oldest !== void 0) {
      IMAGE_FETCH_CACHE.delete(oldest);
    }
  }
  const value = fetchImageAsBase64(url, doFetch).then(({ base64, mimeType }) => toDataURI(base64, mimeType)).catch((e) => {
    IMAGE_FETCH_CACHE.delete(url);
    throw e;
  });
  IMAGE_FETCH_CACHE.set(url, { time: Date.now(), value });
  return value;
}
async function fetchImageAsBase64(url, doFetch = fetch) {
  const response = await doFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image ${url}: ${response.status} ${response.statusText}`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  const base64 = bytesToBase64(bytes);
  return { base64, mimeType: imageFormatFromBase64(base64) };
}
async function adaptMessageImages(messages, mode, doFetch = fetch) {
  if (mode === "url") {
    return messages;
  }
  const rendered = [];
  for (const message of messages) {
    if (typeof message.content === "string") {
      rendered.push(message);
      continue;
    }
    const parts = [];
    for (const part of message.content) {
      if (part.type !== "image") {
        parts.push(part);
        continue;
      }
      if (mode === "none") {
        continue;
      }
      const url = part.image instanceof URL ? part.image.href : typeof part.image === "string" ? part.image : null;
      if (url === null || url.startsWith("data:")) {
        parts.push(part);
        continue;
      }
      parts.push({ ...part, image: await cachedDataURI(url, doFetch) });
    }
    rendered.push({ role: message.role, content: parts });
  }
  return rendered;
}
const WORKERS_FIELDS = [
  { key: "accountId", label: "Account ID", type: "text" },
  { key: "token", label: "API Token", type: "password" }
];
const API_KEY_HEADER_FIELD = {
  key: "apiKeyHeader",
  label: "API Key Header",
  type: "text",
  placeholder: "api-key (Azure only)"
};
const CHAT_PROTOCOLS = [
  {
    id: "chat-completions",
    label: "OpenAI Chat Completions",
    defaultBaseUrl: "https://api.openai.com/v1",
    optionFields: [API_KEY_HEADER_FIELD],
    modelList: "openai"
  },
  {
    id: "anthropic-messages",
    label: "Anthropic Messages",
    defaultBaseUrl: "https://api.anthropic.com/v1",
    modelList: "anthropic"
  },
  {
    id: "responses",
    label: "OpenAI Responses",
    defaultBaseUrl: "https://api.openai.com/v1",
    optionFields: [API_KEY_HEADER_FIELD],
    modelList: "openai"
  },
  {
    id: "workers",
    label: "Cloudflare Workers AI",
    defaultBaseUrl: "",
    optionFields: WORKERS_FIELDS,
    modelList: "workers"
  }
];
const IMAGE_PROTOCOLS = [
  {
    id: "images",
    label: "OpenAI Images",
    defaultBaseUrl: "https://api.openai.com/v1",
    modelList: "openai"
  },
  {
    id: "workers",
    label: "Cloudflare Workers AI",
    defaultBaseUrl: "",
    optionFields: WORKERS_FIELDS,
    modelList: "workers"
  }
];
const CHAT_IMAGE_SUPPORT = {
  "chat-completions": "both",
  "anthropic-messages": "inline",
  responses: "both",
  workers: "none"
};
function chatImageSupport(protocol) {
  return CHAT_IMAGE_SUPPORT[protocol] ?? "url";
}
function imageAdaptMode(protocol, imageTransfer) {
  switch (chatImageSupport(protocol)) {
    case "none":
      return "none";
    case "inline":
      return "base64";
    default:
      return imageTransfer === "base64" ? "base64" : "url";
  }
}
function findChatProtocol(id) {
  return CHAT_PROTOCOLS.find((p) => p.id === id) ?? null;
}
function isDoneSentinel(data) {
  return data.trim().startsWith("[DONE]");
}
class LineDecoder {
  static NEWLINE_REGEXP = /\r\n|[\n\r]/g;
  buffer = "";
  trailingCR = false;
  textDecoder = null;
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = `\r${text}`;
      this.trailingCR = false;
    }
    if (text.endsWith("\r")) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = text[text.length - 1] === "\n" || text[text.length - 1] === "\r";
    let lines = text.split(LineDecoder.NEWLINE_REGEXP);
    if (lines.length === 1 && !trailingNewline) {
      this.buffer += lines[0];
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer + lines[0], ...lines.slice(1)];
      this.buffer = "";
    }
    if (!trailingNewline) {
      this.buffer = lines.pop() || "";
    }
    return lines;
  }
  flush() {
    const lines = this.buffer ? [this.buffer] : [];
    this.buffer = "";
    this.trailingCR = false;
    return lines;
  }
  decodeText(chunk) {
    if (!this.textDecoder) {
      this.textDecoder = new TextDecoder("utf-8");
    }
    return this.textDecoder.decode(chunk, { stream: true });
  }
}
class SSEDecoder {
  event = null;
  data = [];
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (this.event === null && this.data.length === 0) {
        return null;
      }
      const sse = {
        event: this.event,
        data: this.data.join("\n")
      };
      this.event = null;
      this.data = [];
      return sse;
    }
    if (line.startsWith(":")) {
      return null;
    }
    const index = line.indexOf(":");
    const fieldName = index === -1 ? line : line.substring(0, index);
    let value = index === -1 ? "" : line.substring(index + 1);
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldName === "event") {
      this.event = value;
    } else if (fieldName === "data") {
      this.data.push(value);
    }
    return null;
  }
  flush() {
    if (this.event === null && this.data.length === 0) {
      return null;
    }
    const sse = {
      event: this.event,
      data: this.data.join("\n")
    };
    this.event = null;
    this.data = [];
    return sse;
  }
}
async function* iterSSEMessages(response) {
  if (!response.body) {
    throw new Error("Attempted to iterate over a response with no body");
  }
  const lineDecoder = new LineDecoder();
  const sseDecoder = new SSEDecoder();
  const reader = response.body.getReader();
  try {
    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      if (result.value) {
        for (const line of lineDecoder.decode(result.value)) {
          const sse = sseDecoder.decode(line);
          if (sse) {
            yield sse;
          }
        }
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = sseDecoder.decode(line);
      if (sse) {
        yield sse;
      }
    }
    const remaining = sseDecoder.flush();
    if (remaining) {
      yield remaining;
    }
  } finally {
    reader.cancel().catch(() => {
    });
  }
}
const DEFAULT_BASE_URL$2 = "https://api.anthropic.com/v1";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MAX_TOKENS = 4096;
function toUsage$2(usage) {
  if (!usage) {
    return void 0;
  }
  const inputTokens = usage.input_tokens;
  const outputTokens = usage.output_tokens;
  return {
    inputTokens,
    outputTokens,
    totalTokens: sumTokens(inputTokens, outputTokens)
  };
}
function renderPart$2(part) {
  if (part.type === "text") {
    return { type: "text", text: part.text };
  }
  const image = resolveImage(part.image, part.mimeType || DEFAULT_IMAGE_MIME_TYPE);
  if (image.base64) {
    return {
      type: "image",
      source: { type: "base64", media_type: image.mimeType || DEFAULT_IMAGE_MIME_TYPE, data: image.base64 }
    };
  }
  return null;
}
function renderContent$1(content) {
  if (typeof content === "string") {
    return content;
  }
  return content.map(renderPart$2).filter((part) => part !== null);
}
function buildAnthropicMessagesBody(options, stream) {
  const { system, messages } = extractSystem(options);
  return {
    ...options.extra,
    model: options.model,
    max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
    ...system ? { system } : {},
    ...options.temperature !== void 0 ? { temperature: options.temperature } : {},
    ...options.topP !== void 0 ? { top_p: options.topP } : {},
    ...options.stop ? { stop_sequences: Array.isArray(options.stop) ? options.stop : [options.stop] } : {},
    ...stream ? { stream: true } : {},
    messages: messages.map((message) => ({
      role: message.role,
      content: renderContent$1(message.content)
    }))
  };
}
function parseAnthropicMessagesResponse(data) {
  if (data?.error) {
    throw new Error(data.error.message || "Unknown error");
  }
  return {
    text: contentToText(data?.content),
    usage: toUsage$2(data?.usage),
    stopReason: data?.stop_reason ?? null
  };
}
function parseAnthropicMessagesSSE(sse) {
  if (isDoneSentinel(sse.data)) {
    return { finish: true };
  }
  const payload = parseJSONSync(sse.data);
  if (!payload) {
    return {};
  }
  switch (payload.type) {
    case "content_block_delta":
      if (payload.delta?.type === "text_delta" && typeof payload.delta.text === "string") {
        return { delta: payload.delta.text };
      }
      return {};
    case "message_stop":
      return { finish: true };
    case "error":
      return { error: payload.error?.message || "Unknown error" };
    default:
      return {};
  }
}
class AnthropicMessagesClient {
  protocol = "anthropic-messages";
  config;
  constructor(config = {}) {
    this.config = config;
  }
  endpoint() {
    return joinUrl(this.config.baseUrl || DEFAULT_BASE_URL$2, "/messages");
  }
  headers(options, stream) {
    return {
      "content-type": "application/json",
      ...stream ? { accept: "text/event-stream" } : {},
      ...this.config.apiKey ? { "x-api-key": this.config.apiKey } : {},
      "anthropic-version": ANTHROPIC_VERSION,
      ...this.config.headers,
      ...options.headers
    };
  }
  async request(options, stream) {
    const mode = imageAdaptMode(this.protocol, this.config.imageTransfer);
    const adapted = { ...options, messages: await adaptMessageImages(options.messages, mode, this.config.fetch) };
    return postJSON(this.endpoint(), {
      headers: this.headers(options, stream),
      body: buildAnthropicMessagesBody(adapted, stream),
      signal: options.signal,
      fetch: this.config.fetch
    });
  }
  async complete(options) {
    const response = await this.request(options, false);
    return parseAnthropicMessagesResponse(await response.json());
  }
  async *stream(options) {
    const response = await this.request(options, true);
    for await (const sse of iterSSEMessages(response)) {
      const { delta, finish, error } = parseAnthropicMessagesSSE(sse);
      if (error) {
        throw new Error(error);
      }
      if (finish) {
        return;
      }
      if (delta) {
        yield delta;
      }
    }
  }
}
const DEFAULT_BASE_URL$1 = "https://api.openai.com/v1";
function toUsage$1(usage) {
  if (!usage) {
    return void 0;
  }
  const inputTokens = usage.prompt_tokens;
  const outputTokens = usage.completion_tokens;
  return {
    inputTokens,
    outputTokens,
    totalTokens: usage.total_tokens ?? sumTokens(inputTokens, outputTokens)
  };
}
function renderPart$1(part) {
  if (part.type === "text") {
    return { type: "text", text: part.text };
  }
  const image = resolveImage(part.image, part.mimeType || DEFAULT_IMAGE_MIME_TYPE);
  if (image.base64) {
    return {
      type: "image_url",
      image_url: { url: toDataURI(image.base64, image.mimeType || DEFAULT_IMAGE_MIME_TYPE) }
    };
  }
  if (image.url) {
    return { type: "image_url", image_url: { url: image.url } };
  }
  return null;
}
function renderMessage(message) {
  if (typeof message.content === "string") {
    return { role: message.role, content: message.content };
  }
  return {
    role: message.role,
    content: message.content.map(renderPart$1).filter((part) => part !== null)
  };
}
function buildChatCompletionsBody(options, stream) {
  const messages = [...options.messages];
  if (options.system) {
    messages.unshift({ role: "system", content: options.system });
  }
  return {
    ...options.extra,
    model: options.model,
    ...stream ? { stream: true } : {},
    ...options.maxTokens !== void 0 ? { max_tokens: options.maxTokens } : {},
    ...options.temperature !== void 0 ? { temperature: options.temperature } : {},
    ...options.topP !== void 0 ? { top_p: options.topP } : {},
    ...options.stop ? { stop: options.stop } : {},
    messages: messages.map(renderMessage)
  };
}
function parseChatCompletionsResponse(data) {
  if (data?.error) {
    throw new Error(data.error.message || "Unknown error");
  }
  const choice = data?.choices?.at(0);
  if (!choice) {
    throw new Error("Empty response from provider");
  }
  return {
    text: contentToText(choice.message?.content),
    usage: toUsage$1(data?.usage),
    stopReason: choice?.finish_reason ?? null
  };
}
function parseChatCompletionsSSE(sse) {
  if (isDoneSentinel(sse.data)) {
    return { finish: true };
  }
  const payload = parseJSONSync(sse.data);
  if (!payload) {
    return {};
  }
  if (payload.error) {
    return { error: payload.error.message || "Unknown error" };
  }
  const delta = payload.choices?.at(0)?.delta?.content;
  return typeof delta === "string" ? { delta } : {};
}
class ChatCompletionsClient {
  protocol = "chat-completions";
  config;
  constructor(config = {}) {
    this.config = config;
  }
  endpoint() {
    return joinUrl(this.config.baseUrl || DEFAULT_BASE_URL$1, "/chat/completions");
  }
  headers(options, stream) {
    const keyHeader = this.config.apiKeyHeader || "authorization";
    const apiKeyValue = this.config.apiKeyHeader ? this.config.apiKey : `Bearer ${this.config.apiKey}`;
    return {
      "content-type": "application/json",
      ...stream ? { accept: "text/event-stream" } : {},
      ...this.config.apiKey ? { [keyHeader]: apiKeyValue } : {},
      ...this.config.headers,
      ...options.headers
    };
  }
  async request(options, stream) {
    const mode = imageAdaptMode(this.protocol, this.config.imageTransfer);
    const adapted = { ...options, messages: await adaptMessageImages(options.messages, mode, this.config.fetch) };
    return postJSON(this.endpoint(), {
      headers: this.headers(options, stream),
      body: buildChatCompletionsBody(adapted, stream),
      signal: options.signal,
      fetch: this.config.fetch
    });
  }
  async complete(options) {
    const response = await this.request(options, false);
    return parseChatCompletionsResponse(await response.json());
  }
  async *stream(options) {
    const response = await this.request(options, true);
    for await (const sse of iterSSEMessages(response)) {
      const { delta, finish, error } = parseChatCompletionsSSE(sse);
      if (error) {
        throw new Error(error);
      }
      if (finish) {
        return;
      }
      if (delta) {
        yield delta;
      }
    }
  }
}
const DEFAULT_BASE_URL = "https://api.openai.com/v1";
function toUsage(usage) {
  if (!usage) {
    return void 0;
  }
  const inputTokens = usage.input_tokens;
  const outputTokens = usage.output_tokens;
  return {
    inputTokens,
    outputTokens,
    totalTokens: usage.total_tokens ?? sumTokens(inputTokens, outputTokens)
  };
}
function textPartType(role) {
  return role === "assistant" ? "output_text" : "input_text";
}
function renderPart(part, role) {
  if (part.type === "text") {
    return { type: textPartType(role), text: part.text };
  }
  const image = resolveImage(part.image, part.mimeType || DEFAULT_IMAGE_MIME_TYPE);
  if (image.base64) {
    return { type: "input_image", image_url: toDataURI(image.base64, image.mimeType || DEFAULT_IMAGE_MIME_TYPE) };
  }
  if (image.url) {
    return { type: "input_image", image_url: image.url };
  }
  return null;
}
function renderContent(message) {
  if (typeof message.content === "string") {
    return [{ type: textPartType(message.role), text: message.content }];
  }
  return message.content.map((part) => renderPart(part, message.role)).filter((part) => part !== null);
}
function buildResponsesBody(options, stream) {
  const { system, messages } = extractSystem(options);
  return {
    ...options.extra,
    model: options.model,
    ...system ? { instructions: system } : {},
    ...stream ? { stream: true } : {},
    ...options.maxTokens !== void 0 ? { max_output_tokens: options.maxTokens } : {},
    ...options.temperature !== void 0 ? { temperature: options.temperature } : {},
    ...options.topP !== void 0 ? { top_p: options.topP } : {},
    input: messages.map((message) => ({
      role: message.role,
      content: renderContent(message)
    }))
  };
}
function parseResponsesResponse(data) {
  if (data?.error) {
    throw new Error(data.error.message || "Unknown error");
  }
  const text = (data?.output || []).flatMap((item) => item?.content || []).filter((item) => item?.type === "output_text").map((item) => item.text ?? "").join("");
  const incomplete = data?.incomplete_details?.reason;
  return {
    text,
    usage: toUsage(data?.usage),
    stopReason: incomplete ?? (data?.status === "completed" ? "stop" : null)
  };
}
function parseResponsesSSE(sse) {
  if (isDoneSentinel(sse.data)) {
    return { finish: true };
  }
  const payload = parseJSONSync(sse.data);
  if (!payload) {
    return {};
  }
  switch (payload.type || sse.event) {
    case "response.output_text.delta":
      return typeof payload.delta === "string" ? { delta: payload.delta } : {};
    case "response.completed":
    case "response.incomplete":
      return { finish: true };
    case "response.failed":
      return { error: payload.response?.error?.message || "Response failed" };
    case "error":
      return { error: payload.message || "Unknown error" };
    default:
      return {};
  }
}
class ResponsesClient {
  protocol = "responses";
  config;
  constructor(config = {}) {
    this.config = config;
  }
  endpoint() {
    return joinUrl(this.config.baseUrl || DEFAULT_BASE_URL, "/responses");
  }
  headers(options, stream) {
    const keyHeader = this.config.apiKeyHeader || "authorization";
    const apiKeyValue = this.config.apiKeyHeader ? this.config.apiKey : `Bearer ${this.config.apiKey}`;
    return {
      "content-type": "application/json",
      ...stream ? { accept: "text/event-stream" } : {},
      ...this.config.apiKey ? { [keyHeader]: apiKeyValue } : {},
      ...this.config.headers,
      ...options.headers
    };
  }
  async request(options, stream) {
    const mode = imageAdaptMode(this.protocol, this.config.imageTransfer);
    const adapted = { ...options, messages: await adaptMessageImages(options.messages, mode, this.config.fetch) };
    return postJSON(this.endpoint(), {
      headers: this.headers(options, stream),
      body: buildResponsesBody(adapted, stream),
      signal: options.signal,
      fetch: this.config.fetch
    });
  }
  async complete(options) {
    const response = await this.request(options, false);
    return parseResponsesResponse(await response.json());
  }
  async *stream(options) {
    const response = await this.request(options, true);
    for await (const sse of iterSSEMessages(response)) {
      const { delta, finish, error } = parseResponsesSSE(sse);
      if (error) {
        throw new Error(error);
      }
      if (finish) {
        return;
      }
      if (delta) {
        yield delta;
      }
    }
  }
}
function workersCredentials(options) {
  const pick = (key) => {
    const value = options?.[key];
    return typeof value === "string" ? value.trim() : "";
  };
  return { accountId: pick("accountId"), token: pick("token") };
}
function workersApiBaseUrl(accountId) {
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai`;
}
function workersChatBaseUrl(accountId) {
  return `${workersApiBaseUrl(accountId)}/v1`;
}
function workersImageRunUrl(accountId, model) {
  return `${workersApiBaseUrl(accountId)}/run/${model}`;
}
function parseWorkersSSE(sse) {
  if (isDoneSentinel(sse.data)) {
    return { finish: true };
  }
  const payload = parseJSONSync(sse.data);
  const error = payload?.errors?.[0]?.message;
  if (typeof error === "string" && error) {
    return { error };
  }
  const delta = payload?.response;
  return typeof delta === "string" ? { delta } : {};
}
async function* bindingTextStream(output) {
  if (!(output instanceof ReadableStream)) {
    yield* bindingOutputToText(output);
    return;
  }
  const response = new Response(output, { headers: { "content-type": "text/event-stream" } });
  for await (const sse of iterSSEMessages(response)) {
    const { delta, finish, error } = parseWorkersSSE(sse);
    if (error) {
      throw new Error(error);
    }
    if (finish) {
      return;
    }
    if (delta) {
      yield delta;
    }
  }
}
function bindingOutputToText(output) {
  const error = output.errors?.[0]?.message;
  if (error) {
    throw new Error(error);
  }
  if (output instanceof ReadableStream) {
    throw new Error("Unexpected streaming output for a non-streaming request");
  }
  return output.response ?? "";
}
function bindingImageResponse(output) {
  if (output instanceof ReadableStream) {
    return new Response(output, { headers: { "content-type": "image/jpeg" } });
  }
  return Response.json({ result: output });
}
function base64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  return new Blob([Uint8Array.from(binary, (c) => c.charCodeAt(0))], { type: mimeType });
}
async function workersImageToBlob(output) {
  const contentType = output.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const { result } = await output.json();
    const image = result?.image;
    if (typeof image !== "string") {
      throw new TypeError("Invalid image response");
    }
    return base64ToBlob(image, "image/png");
  }
  return output.blob();
}
class WorkersAIClient {
  protocol = "workers";
  config;
  fallback;
  constructor(config = {}) {
    this.config = config;
    this.fallback = config.binding ? null : new ChatCompletionsClient({
      ...config,
      baseUrl: config.baseUrl || (config.accountId ? workersChatBaseUrl(config.accountId) : void 0)
    });
  }
  bindingBody(options, stream) {
    const { model: _model, stream: _stream, ...body } = buildChatCompletionsBody(options, false);
    return { ...body, stream };
  }
  rest() {
    if (!this.config.baseUrl && !this.config.accountId) {
      throw new Error("Cloudflare account ID is required");
    }
    if (!this.fallback) {
      throw new Error("Cloudflare Workers AI binding is unavailable");
    }
    return this.fallback;
  }
  async adapt(options) {
    return { ...options, messages: await adaptMessageImages(options.messages, "none", this.config.fetch) };
  }
  async complete(options) {
    const adapted = await this.adapt(options);
    const binding = this.config.binding;
    if (!binding) {
      return this.rest().complete(adapted);
    }
    const output = await binding.run(adapted.model, this.bindingBody(adapted, false));
    return { text: bindingOutputToText(output) };
  }
  async *stream(options) {
    const adapted = await this.adapt(options);
    const binding = this.config.binding;
    if (!binding) {
      yield* this.rest().stream(adapted);
      return;
    }
    const output = await binding.run(adapted.model, this.bindingBody(adapted, true));
    yield* bindingTextStream(output);
  }
}
async function generateWorkersImage(options) {
  if (options.binding) {
    return workersImageToBlob(
      bindingImageResponse(await options.binding.run(options.model, { prompt: options.prompt }))
    );
  }
  if (!options.accountId) {
    throw new Error("Cloudflare account ID is required");
  }
  const doFetch = options.fetch || fetch;
  const response = await doFetch(workersImageRunUrl(options.accountId, options.model), {
    method: "POST",
    headers: {
      ...options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {},
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: options.prompt })
  });
  return workersImageToBlob(response);
}
async function generateOpenAIImage(config, prompt) {
  const base = (config.baseUrl || "https://api.openai.com/v1").replace(/\/+$/, "");
  const body = {
    prompt,
    n: 1,
    ...config.size ? { size: config.size } : {},
    model: config.model
  };
  if (config.model === "dall-e-3") {
    if (config.quality) {
      body.quality = config.quality;
    }
    if (config.style) {
      body.style = config.style;
    }
  }
  const doFetch = config.fetch || fetch;
  const response = await doFetch(`${base}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (data?.error?.message) {
    throw new Error(data.error.message);
  }
  const url = data?.data?.at(0)?.url;
  if (typeof url !== "string" || !url) {
    throw new Error("Image generation returned no url");
  }
  return url;
}
function createImageClient(protocol, config) {
  if (protocol === "workers") {
    return {
      protocol,
      generate: (prompt) => generateWorkersImage({
        model: config.model,
        prompt,
        binding: config.binding,
        accountId: config.accountId,
        apiKey: config.apiKey,
        fetch: config.fetch
      })
    };
  }
  return {
    protocol,
    generate: (prompt) => generateOpenAIImage(config, prompt)
  };
}
const OPENAI_DEFAULT_BASE = "https://api.openai.com/v1";
const ANTHROPIC_DEFAULT_BASE = "https://api.anthropic.com/v1";
function trimBase(url) {
  return url.trim().replace(/\/+$/, "");
}
async function getJSON(url, headers) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const data = await response.json();
      detail = data?.error?.message || data?.message || detail;
    } catch {
    }
    throw new Error(detail);
  }
  return response.json();
}
function idsFrom(data) {
  if (!Array.isArray(data?.data)) {
    return [];
  }
  return data.data.map((item) => item?.id).filter((id) => typeof id === "string" && id.length > 0);
}
async function fetchModels(protocol, provider, kind) {
  switch (protocol) {
    case "chat-completions":
    case "responses":
    case "images": {
      const base = trimBase(provider.baseUrl) || OPENAI_DEFAULT_BASE;
      const data = await getJSON(`${base}/models`, {
        Authorization: `Bearer ${provider.apiKey}`
      });
      return idsFrom(data);
    }
    case "anthropic-messages": {
      const base = trimBase(provider.baseUrl) || ANTHROPIC_DEFAULT_BASE;
      const data = await getJSON(`${base}/models`, {
        "x-api-key": provider.apiKey,
        "anthropic-version": "2023-06-01"
      });
      return idsFrom(data);
    }
    case "workers": {
      const { accountId, token } = workersCredentials(provider.options);
      if (!accountId || !token) {
        throw new Error("Cloudflare account ID and token are required");
      }
      const task = kind === "image" ? "Text-to-Image" : "Text Generation";
      const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/models/search?task=${encodeURIComponent(task)}`;
      const data = await getJSON(url, { Authorization: `Bearer ${token}` });
      if (!Array.isArray(data?.result)) {
        return [];
      }
      return data.result.map((model) => model?.name).filter((name) => typeof name === "string" && name.length > 0);
    }
    default:
      return [];
  }
}
function createClient(protocol, config = {}) {
  switch (protocol) {
    case "anthropic-messages":
      return new AnthropicMessagesClient(config);
    case "chat-completions":
      return new ChatCompletionsClient(config);
    case "responses":
      return new ResponsesClient(config);
    case "workers":
      return new WorkersAIClient(config);
    default:
      throw new Error(`Unknown protocol: ${protocol}`);
  }
}
const UPDATE_STEP = 30;
async function consumeTextStream(stream, onStream, minIntervalMs = 0) {
  let text = "";
  let emitted = 0;
  let lastEmitAt = 0;
  try {
    for await (const delta of stream) {
      text += delta;
      const now = Date.now();
      if (text.length - emitted < UPDATE_STEP || now - lastEmitAt < minIntervalMs) {
        continue;
      }
      emitted = text.length;
      lastEmitAt = now;
      await onStream(`${text}
...`);
    }
  } catch (e) {
    if (e?.name !== "AbortError") {
      text += `
Error: ${e.message}`;
    }
  }
  return text;
}
function chatAbortSignal(settings) {
  if (settings.chatCompleteApiTimeout <= 0) {
    return { clear: () => {
    } };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), settings.chatCompleteApiTimeout * 1e3);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}
function apiKeyHeader(provider) {
  const value = provider.options?.apiKeyHeader;
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function clientConfig(provider, settings) {
  return {
    baseUrl: provider.baseUrl || void 0,
    apiKey: provider.apiKey || void 0,
    apiKeyHeader: apiKeyHeader(provider),
    imageTransfer: settings.telegramImageTransferMode
  };
}
function createChatAgent(protocol, provider, settings) {
  const client = createClient(protocol, clientConfig(provider, settings));
  return {
    name: provider.id,
    label: provider.label || findChatProtocol(protocol)?.label || protocol,
    model: provider.model || provider.models[0] || "",
    modelList: async () => provider.models,
    chat: async (messages, onStream) => {
      const extra = provider.extraParams ?? {};
      const { signal, clear } = chatAbortSignal(settings);
      const options = {
        model: provider.model,
        system: settings.systemInitMessage || void 0,
        messages,
        signal,
        ...settings.maxOutputTokens > 0 ? { maxTokens: settings.maxOutputTokens } : {},
        ...Object.keys(extra).length ? { extra } : {}
      };
      try {
        if (onStream) {
          return await consumeTextStream(
            client.stream(options),
            onStream,
            settings.telegramMinStreamInterval
          );
        }
        return (await client.complete(options)).text;
      } finally {
        clear();
      }
    }
  };
}
function createImageAgent(provider, settings) {
  const client = createImageClient("images", {
    model: provider.model,
    baseUrl: provider.baseUrl || void 0,
    apiKey: provider.apiKey || void 0,
    size: settings.imageSize,
    quality: settings.imageQuality,
    style: settings.imageStyle
  });
  return {
    name: provider.id,
    label: provider.label || "OpenAI Images",
    model: provider.model || provider.models[0] || "",
    modelList: async () => provider.models,
    generate: (prompt) => client.generate(prompt)
  };
}
function createWorkersChat(provider, settings) {
  const { accountId, token } = workersCredentials(provider.options);
  const binding = ENV.AI_BINDING ?? void 0;
  if (!binding && (!accountId || !token)) {
    console.warn(`Workers provider "${provider.id}" skipped: missing AI binding or account id/token`);
    return null;
  }
  const client = createClient("workers", { binding, accountId, apiKey: token });
  return {
    name: provider.id,
    label: provider.label || "Cloudflare Workers AI",
    model: provider.model,
    modelList: async () => provider.models,
    chat: async (messages, onStream) => {
      const extra = provider.extraParams ?? {};
      const { signal, clear } = chatAbortSignal(settings);
      const options = {
        model: provider.model,
        system: settings.systemInitMessage || void 0,
        messages,
        signal,
        ...settings.maxOutputTokens > 0 ? { maxTokens: settings.maxOutputTokens } : {},
        ...Object.keys(extra).length ? { extra } : {}
      };
      try {
        if (onStream) {
          return await consumeTextStream(
            client.stream(options),
            onStream,
            settings.telegramMinStreamInterval
          );
        }
        return (await client.complete(options)).text;
      } finally {
        clear();
      }
    }
  };
}
function createWorkersImage(provider) {
  const { accountId, token } = workersCredentials(provider.options);
  return {
    name: provider.id,
    label: provider.label || "Cloudflare Workers AI",
    model: provider.model,
    modelList: async () => provider.models,
    generate: async (prompt) => {
      const binding = ENV.AI_BINDING ?? void 0;
      if (!binding && (!accountId || !token)) {
        throw new Error("Cloudflare account ID and token are required");
      }
      return createImageClient("workers", { model: provider.model, binding, accountId, apiKey: token }).generate(
        prompt
      );
    }
  };
}
function buildChatAgents(config) {
  return config.chatProviders.filter((provider) => provider.enabled).map(
    (provider) => provider.protocol === "workers" ? createWorkersChat(provider, config.settings) : createChatAgent(provider.protocol, provider, config.settings)
  ).filter((agent) => agent !== null);
}
function buildImageAgents(config) {
  return config.imageProviders.filter((provider) => provider.enabled).map(
    (provider) => provider.protocol === "workers" ? createWorkersImage(provider) : createImageAgent(provider, config.settings)
  ).filter((agent) => agent !== null);
}
function loadChatLLM(config) {
  const agents = buildChatAgents(config);
  if (config.defaultChatProvider) {
    const found = agents.find((agent) => agent.name === config.defaultChatProvider);
    if (found) {
      return found;
    }
  }
  return agents.at(0) ?? null;
}
function loadImageGen(config) {
  const agents = buildImageAgents(config);
  if (config.defaultImageProvider) {
    const found = agents.find((agent) => agent.name === config.defaultImageProvider);
    if (found) {
      return found;
    }
  }
  return agents.at(0) ?? null;
}
function textOf(message) {
  if (typeof message.content === "string") {
    return message.content;
  }
  return message.content.filter((part) => part.type === "text").map((part) => part.text).join("");
}
function trimHistory(history, maxLength, maxToken) {
  let list = history;
  if (maxLength >= 0 && list.length > maxLength) {
    list = list.slice(-maxLength);
  }
  if (maxToken > 0) {
    let tokens = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      tokens += textOf(list[i]).length;
      if (tokens > maxToken) {
        list = list.slice(i + 1);
        break;
      }
    }
  }
  return list;
}
async function loadHistory(key, config) {
  let history = [];
  try {
    const parsed = JSON.parse(await ENV.DATABASE.get(key));
    if (Array.isArray(parsed)) {
      history = parsed;
    }
  } catch (e) {
    console.error(e);
  }
  const { autoTrimHistory, maxHistoryLength, maxTokenLength } = config.settings;
  if (autoTrimHistory && maxHistoryLength > 0) {
    history = trimHistory(history, maxHistoryLength, maxTokenLength);
  }
  return history;
}
function stripImages(message, placeholder) {
  if (typeof message.content === "string") {
    return message;
  }
  const imageCount = message.content.filter((part) => part.type === "image").length;
  const lastText = message.content.findLast((part) => part.type === "text");
  if (imageCount === 0 || !lastText) {
    return message;
  }
  const content = message.content.filter((part) => part.type !== "image").map(
    (part) => part === lastText ? { type: "text", text: part.text + ` ${placeholder}`.repeat(imageCount) } : part
  );
  return { role: message.role, content };
}
async function requestCompletionsFromLLM(message, historyKey, config, agent, modifier, onStream) {
  if (!historyKey) {
    throw new Error("History key not found");
  }
  const { autoTrimHistory, maxHistoryLength, historyImagePlaceholder } = config.settings;
  const historyDisabled = autoTrimHistory && maxHistoryLength <= 0;
  let history = await loadHistory(historyKey, config);
  if (modifier) {
    const modified = modifier(history, message);
    history = modified.history;
    message = modified.message;
  }
  if (!message) {
    throw new Error("Message is empty");
  }
  const text = await agent.chat([...history, message], onStream);
  if (!historyDisabled) {
    const stored = historyImagePlaceholder ? stripImages(message, historyImagePlaceholder) : message;
    const next = [...history, stored, { role: "assistant", content: text }];
    await ENV.DATABASE.put(historyKey, JSON.stringify(next)).catch(console.error);
  }
  return text;
}
class RpcError extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "RpcError";
    this.code = code;
  }
}
function jsonResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
function createRpcHandler(methods) {
  return async (request, env) => {
    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: { code: -32700, message: "parse error" } });
    }
    const method = typeof payload?.method === "string" ? payload.method : "";
    if (!Object.prototype.hasOwnProperty.call(methods, method)) {
      return jsonResponse({ error: { code: -32601, message: `method not found: ${method}` } });
    }
    const handler = methods[method];
    try {
      const result = await handler(payload.params, { request, env });
      return jsonResponse({ result: result === void 0 ? null : result });
    } catch (e) {
      if (e instanceof RpcError) {
        return jsonResponse({ error: { code: e.code, message: e.message } });
      }
      console.error(e);
      return jsonResponse({ error: { code: -32603, message: "internal error" } });
    }
  };
}
const encoder = new TextEncoder();
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const MAX_AUTH_AGE_SECONDS = 60 * 60 * 24;
function base64UrlEncode(bytes) {
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function bytesToHex(bytes) {
  let hex = "";
  for (const b of bytes) {
    hex += b.toString(16).padStart(2, "0");
  }
  return hex;
}
function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - padded.length % 4) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}
async function hmac(key, data) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(signature);
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
async function validateInitData(initData, botToken) {
  if (!initData || !botToken) {
    return { ok: false, reason: "missing initData or token" };
  }
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) {
    return { ok: false, reason: "missing hash" };
  }
  params.delete("hash");
  const dataCheckString = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort().join("\n");
  const secretKey = await hmac(encoder.encode("WebAppData"), encoder.encode(botToken));
  const computed = bytesToHex(await hmac(secretKey, encoder.encode(dataCheckString)));
  if (!timingSafeEqual(encoder.encode(computed), encoder.encode(hash.toLowerCase()))) {
    return { ok: false, reason: "invalid hash" };
  }
  const authDate = Number(params.get("auth_date") || "0");
  if (!authDate || Math.floor(Date.now() / 1e3) - authDate > MAX_AUTH_AGE_SECONDS) {
    return { ok: false, reason: "expired" };
  }
  const userRaw = params.get("user");
  if (!userRaw) {
    return { ok: false, reason: "missing user" };
  }
  try {
    const user = JSON.parse(userRaw);
    if (!user?.id) {
      return { ok: false, reason: "invalid user" };
    }
    return { ok: true, user };
  } catch {
    return { ok: false, reason: "invalid user json" };
  }
}
const SESSION_KEY_LABEL = "ctw-admin-session";
async function createSession(userId, ttlSeconds = SESSION_TTL_SECONDS) {
  if (!ENV.TELEGRAM_TOKEN) {
    throw new Error("Cannot create admin session: TELEGRAM_TOKEN is not set");
  }
  const payload = JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1e3) + ttlSeconds });
  const payloadB64 = base64UrlEncode(encoder.encode(payload));
  const key = await hmac(encoder.encode(SESSION_KEY_LABEL), encoder.encode(ENV.TELEGRAM_TOKEN));
  const sig = base64UrlEncode(await hmac(key, encoder.encode(payloadB64)));
  return `${payloadB64}.${sig}`;
}
async function verifySession(token) {
  if (!token || !ENV.TELEGRAM_TOKEN) {
    return null;
  }
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) {
    return null;
  }
  const key = await hmac(encoder.encode(SESSION_KEY_LABEL), encoder.encode(ENV.TELEGRAM_TOKEN));
  const expected = base64UrlEncode(await hmac(key, encoder.encode(payloadB64)));
  if (!timingSafeEqual(encoder.encode(expected), encoder.encode(sig))) {
    return null;
  }
  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));
    if (payload.exp < Math.floor(Date.now() / 1e3)) {
      return null;
    }
    return payload.sub;
  } catch {
    return null;
  }
}
function checkPassword(password) {
  const expected = ENV.ADMIN_PASSWORD;
  if (!expected) {
    return false;
  }
  const a = encoder.encode(password || "");
  const b = encoder.encode(expected);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
function isAdmin(userId) {
  return !!ENV.ADMIN_ID && `${userId}` === ENV.ADMIN_ID;
}
function extractBearer(header) {
  if (!header) {
    return null;
  }
  const [scheme, token] = header.split(" ");
  if (!token || scheme.toLowerCase() !== "bearer") {
    return null;
  }
  return token;
}
async function requireAuth(request) {
  const userId = await verifySession(extractBearer(request.headers.get("Authorization")));
  if (!userId || !isAdmin(userId)) {
    throw new RpcError(401, "unauthorized");
  }
  return userId;
}
function createAdminMethods() {
  return {
    "admin.login": async (params) => {
      const body = params ?? {};
      if (body.initData) {
        const result = await validateInitData(body.initData, ENV.TELEGRAM_TOKEN);
        if (!result.ok) {
          throw new RpcError(401, `initData ${result.reason}`);
        }
        if (!isAdmin(result.user.id)) {
          throw new RpcError(403, "not admin");
        }
        return { token: await createSession(`${result.user.id}`) };
      }
      if (body.password !== void 0) {
        if (!ENV.ADMIN_PASSWORD) {
          throw new RpcError(400, "password login disabled");
        }
        if (!ENV.ADMIN_ID) {
          throw new RpcError(400, "ADMIN_ID must be set to use password login");
        }
        if (!checkPassword(body.password)) {
          throw new RpcError(401, "invalid password");
        }
        return { token: await createSession(ENV.ADMIN_ID) };
      }
      throw new RpcError(400, "missing credentials");
    },
    "admin.authInfo": () => ({
      passwordEnabled: !!ENV.ADMIN_PASSWORD && !!ENV.ADMIN_ID,
      hasAdminId: !!ENV.ADMIN_ID,
      hasToken: !!ENV.TELEGRAM_TOKEN
    }),
    "admin.meta": async (_params, ctx) => {
      await requireAuth(ctx.request);
      return {
        chatProtocols: CHAT_PROTOCOLS,
        imageProtocols: IMAGE_PROTOCOLS
      };
    },
    "admin.config.get": async (_params, ctx) => {
      await requireAuth(ctx.request);
      await ENV.loadConfig(true);
      return maskConfig(ENV.CONFIG);
    },
    "admin.config.save": async (params, ctx) => {
      await requireAuth(ctx.request);
      const incoming = params;
      const current = await ENV.loadConfig(true);
      const next = unmaskConfig(incoming, current);
      await ENV.getConfigStore().save(next);
      await ENV.loadConfig(true);
      return { ok: true };
    },
    "admin.agents": async (_params, ctx) => {
      await requireAuth(ctx.request);
      await ENV.loadConfig(true);
      const chat = loadChatLLM(ENV.CONFIG);
      const image = loadImageGen(ENV.CONFIG);
      return {
        chat: chat ? { name: chat.name, label: chat.label, model: chat.model } : null,
        image: image ? { name: image.name, label: image.label, model: image.model } : null
      };
    },
    "admin.models": async (params, ctx) => {
      await requireAuth(ctx.request);
      const body = params ?? {};
      if (!body.provider) {
        return { models: [] };
      }
      await ENV.loadConfig(true);
      try {
        const provider = unmaskProviderFromStore(body.provider, body.kind === "image" ? "image" : "chat");
        const models = await fetchModels(provider.protocol, provider, body.kind === "image" ? "image" : "chat");
        return { models };
      } catch (e) {
        throw new RpcError(400, e.message);
      }
    }
  };
}
function unmaskProviderFromStore(provider, kind) {
  const stored = (kind === "image" ? ENV.CONFIG.imageProviders : ENV.CONFIG.chatProviders).find(
    (p) => p.id === provider.id
  );
  const options = { ...provider.options };
  for (const [key, value] of Object.entries(options)) {
    if (value === MASKED_API_KEY) {
      options[key] = stored?.options?.[key] ?? "";
    }
  }
  return {
    protocol: provider.protocol,
    baseUrl: provider.baseUrl,
    apiKey: provider.apiKey === MASKED_API_KEY ? stored?.apiKey ?? "" : provider.apiKey,
    options
  };
}
const TELEGRAM_AUTH_CHECKER = {
  default(chatType) {
    if (isGroupChat(chatType)) {
      return ["administrator", "creator"];
    }
    return null;
  }};
function isGroupChat(type) {
  return type === "group" || type === "supergroup";
}
const DEFAULT_API_DOMAIN = "https://api.telegram.org";
let transportConfig = {};
function configureTelegram(config) {
  transportConfig = config;
}
function getTelegramConfig() {
  return transportConfig;
}
class APIClientBase {
  token;
  baseURL;
  constructor(token, baseURL) {
    this.token = token;
    const domain = baseURL || getTelegramConfig().apiDomain || DEFAULT_API_DOMAIN;
    this.baseURL = domain.replace(/\/+$/, "");
    this.request = this.request.bind(this);
    this.requestJSON = this.requestJSON.bind(this);
  }
  uri(method) {
    return `${this.baseURL}/bot${this.token}/${method}`;
  }
  jsonRequest(method, params) {
    return fetch(this.uri(method), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
  }
  formDataRequest(method, params) {
    const formData = new FormData();
    for (const key in params) {
      const value = params[key];
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Blob) {
        formData.append(key, value, "blob");
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
    return fetch(this.uri(method), {
      method: "POST",
      body: formData
    });
  }
  request(method, params) {
    for (const key in params) {
      if (params[key] instanceof File || params[key] instanceof Blob) {
        return this.formDataRequest(method, params);
      }
    }
    return this.jsonRequest(method, params);
  }
  async requestJSON(method, params) {
    return this.request(method, params).then((res) => res.json());
  }
}
function createTelegramBotAPI(token, baseURL) {
  const client = new APIClientBase(token, baseURL);
  return new Proxy(client, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return (...args) => {
        if (typeof prop === "string" && prop.endsWith("WithReturns")) {
          const method = prop.slice(0, -11);
          return Reflect.apply(target.requestJSON, target, [method, ...args]);
        }
        return Reflect.apply(target.request, target, [prop, ...args]);
      };
    }
  });
}
class Update2MessageHandler {
  messageHandlers;
  constructor(messageHandlers) {
    this.messageHandlers = messageHandlers;
  }
  loadMessage(body) {
    if (body.edited_message) {
      throw new Error("Ignore edited message");
    }
    if (body.message) {
      return body.message;
    }
    throw new Error("Invalid message");
  }
  handle = async (update, context) => {
    const message = this.loadMessage(update);
    for (const handler of this.messageHandlers) {
      const result = await handler.handle(message, context);
      if (result) {
        return result;
      }
    }
    return null;
  };
}
const DEFAULT_PARSE_MODE = "Markdown";
class MessageContext {
  chat_id;
  message_id = null;
  reply_to_message_id = null;
  parse_mode = null;
  allow_sending_without_reply = null;
  disable_web_page_preview = null;
  constructor(chatID) {
    this.chat_id = chatID;
  }
  static fromMessage(message) {
    const ctx = new MessageContext(message.chat.id);
    if (message.chat.type === "group" || message.chat.type === "supergroup") {
      ctx.reply_to_message_id = message.message_id;
      ctx.allow_sending_without_reply = true;
    } else {
      ctx.reply_to_message_id = null;
    }
    return ctx;
  }
  static fromCallbackQuery(callbackQuery) {
    const chat = callbackQuery.message?.chat;
    if (!chat) {
      throw new Error("Chat not found");
    }
    const ctx = new MessageContext(chat.id);
    if (chat.type === "group" || chat.type === "supergroup") {
      ctx.reply_to_message_id = callbackQuery.message.message_id;
      ctx.allow_sending_without_reply = true;
    } else {
      ctx.reply_to_message_id = null;
    }
    return ctx;
  }
}
class MessageSender {
  api;
  context;
  constructor(token, context) {
    this.api = createTelegramBotAPI(token);
    this.context = context;
    this.sendRichText = this.sendRichText.bind(this);
    this.sendPlainText = this.sendPlainText.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
  }
  static fromMessage(token, message) {
    return new MessageSender(token, MessageContext.fromMessage(message));
  }
  static fromCallbackQuery(token, callbackQuery) {
    return new MessageSender(token, MessageContext.fromCallbackQuery(callbackQuery));
  }
  static fromUpdate(token, update) {
    if (update.callback_query) {
      return MessageSender.fromCallbackQuery(token, update.callback_query);
    }
    if (update.message) {
      return MessageSender.fromMessage(token, update.message);
    }
    throw new Error("Invalid update");
  }
  update(context) {
    if (!this.context) {
      this.context = context;
      return this;
    }
    for (const key in context) {
      this.context[key] = context[key];
    }
    return this;
  }
  async sendMessage(message, context) {
    if (context?.message_id) {
      const params = {
        chat_id: context.chat_id,
        message_id: context.message_id,
        parse_mode: context.parse_mode || void 0,
        text: message
      };
      if (context.disable_web_page_preview) {
        params.link_preview_options = {
          is_disabled: true
        };
      }
      return this.api.editMessageText(params);
    } else {
      const params = {
        chat_id: context.chat_id,
        parse_mode: context.parse_mode || void 0,
        text: message
      };
      if (context.reply_to_message_id) {
        params.reply_parameters = {
          message_id: context.reply_to_message_id,
          chat_id: context.chat_id,
          allow_sending_without_reply: context.allow_sending_without_reply || void 0
        };
      }
      if (context.disable_web_page_preview) {
        params.link_preview_options = {
          is_disabled: true
        };
      }
      return this.api.sendMessage(params);
    }
  }
  renderMessage(parse_mode, message) {
    const render = getTelegramConfig().renderMessage;
    if (render) {
      return render(parse_mode, message);
    }
    return message;
  }
  async sendLongMessage(message, context) {
    const chatContext = { ...context };
    const limit = 4096;
    if (message.length <= limit) {
      const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext);
      if (resp.status === 200) {
        return resp;
      }
    }
    chatContext.parse_mode = null;
    let lastMessageResponse = null;
    for (let i = 0; i < message.length; i += limit) {
      const msg = message.slice(i, Math.min(i + limit, message.length));
      if (i > 0) {
        chatContext.message_id = null;
      }
      lastMessageResponse = await this.sendMessage(msg, chatContext);
      if (lastMessageResponse.status !== 200) {
        break;
      }
    }
    if (lastMessageResponse === null) {
      throw new Error("Send message failed");
    }
    return lastMessageResponse;
  }
  sendRawMessage(message) {
    return this.api.sendMessage(message);
  }
  editRawMessage(message) {
    return this.api.editMessageText(message);
  }
  sendRichText(message, parseMode = getTelegramConfig().defaultParseMode || DEFAULT_PARSE_MODE) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    return this.sendLongMessage(message, {
      ...this.context,
      parse_mode: parseMode
    });
  }
  sendPlainText(message) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    return this.sendLongMessage(message, {
      ...this.context,
      parse_mode: null
    });
  }
  sendPhoto(photo) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      photo
    };
    if (this.context.reply_to_message_id) {
      params.reply_parameters = {
        message_id: this.context.reply_to_message_id,
        chat_id: this.context.chat_id,
        allow_sending_without_reply: this.context.allow_sending_without_reply || void 0
      };
    }
    return this.api.sendPhoto(params);
  }
}
async function chatWithMessage(message, params, context, modifier) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    try {
      const msg = await sender.sendPlainText("...").then((r) => r.json());
      sender.update({
        message_id: msg.result.message_id
      });
    } catch (e) {
      console.error(e);
    }
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    setTimeout(
      () => api.sendChatAction({
        chat_id: message.chat.id,
        action: "typing"
      }).catch(console.error),
      0
    );
    let onStream = null;
    let nextEnableTime = null;
    if (ENV.CONFIG.settings.streamMode) {
      onStream = async (text) => {
        try {
          if (nextEnableTime && nextEnableTime > Date.now()) {
            return;
          }
          const resp = await sender.sendPlainText(text);
          if (resp.status === 429) {
            const retryAfter = Number.parseInt(resp.headers.get("Retry-After") || "");
            if (retryAfter) {
              nextEnableTime = Date.now() + retryAfter * 1e3;
              return;
            }
          }
          nextEnableTime = null;
          if (resp.ok) {
            const respJson = await resp.json();
            sender.update({
              message_id: respJson.result.message_id
            });
          }
        } catch (e) {
          console.error(e);
        }
      };
    }
    const agent = loadChatLLM(ENV.CONFIG);
    if (agent === null) {
      return sender.sendPlainText("LLM is not enable");
    }
    const answer = await requestCompletionsFromLLM(
      params,
      context.SHARE_CONTEXT.chatHistoryKey,
      ENV.CONFIG,
      agent,
      modifier,
      onStream
    );
    if (nextEnableTime !== null && nextEnableTime > Date.now()) {
      await new Promise((resolve) => setTimeout(resolve, (nextEnableTime ?? 0) - Date.now()));
    }
    return sender.sendRichText(answer);
  } catch (e) {
    let errMsg = `Error: ${e.message}`;
    if (errMsg.length > 2048) {
      errMsg = errMsg.substring(0, 2048);
    }
    return sender.sendPlainText(errMsg);
  }
}
async function extractImageURL(fileId, context) {
  if (!fileId) {
    return null;
  }
  const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
  const file = await api.getFileWithReturns({ file_id: fileId });
  const filePath = file.result.file_path;
  if (filePath) {
    const url = URL.parse(
      `${ENV.CONFIG.settings.telegramApiDomain}/file/bot${context.SHARE_CONTEXT.botToken}/${filePath}`
    );
    if (url) {
      return url;
    }
  }
  return null;
}
function extractImageFileID(message) {
  if (message.photo && message.photo.length > 0) {
    const offset = ENV.CONFIG.settings.telegramPhotoSizeOffset;
    const length = message.photo.length;
    const sizeIndex = Math.max(0, Math.min(offset >= 0 ? offset : length + offset, length - 1));
    return message.photo[sizeIndex]?.file_id;
  } else if (message.document && message.document.thumbnail) {
    return message.document.thumbnail.file_id;
  }
  return null;
}
async function extractUserMessageItem(message, context) {
  const settings = ENV.CONFIG.settings;
  let text = message.text || message.caption || "";
  const urls = await extractImageURL(extractImageFileID(message), context).then((u) => u ? [u] : []);
  if (settings.extraMessageContext && message.reply_to_message && message.reply_to_message.from && `${message.reply_to_message.from.id}` !== `${context.SHARE_CONTEXT.botId}`) {
    const extraText = message.reply_to_message.text || message.reply_to_message.caption || "";
    if (extraText) {
      text = `${text}
The following is the referenced context: ${extraText}`;
    }
    if (settings.extraMessageMediaCompatible.includes("image") && message.reply_to_message.photo) {
      const url = await extractImageURL(extractImageFileID(message.reply_to_message), context);
      if (url) {
        urls.push(url);
      }
    }
  }
  const params = {
    role: "user",
    content: text
  };
  if (urls.length > 0) {
    const contents = new Array();
    if (text) {
      contents.push({ type: "text", text });
    }
    for (const url of urls) {
      contents.push({ type: "image", image: url });
    }
    params.content = contents;
  }
  return params;
}
const INTERPOLATE_LOOP_REGEXP = /\{\{#each(?::(\w+))?\s+(\w+)\s+in\s+([\w.[\]]+)\}\}([\s\S]*?)\{\{\/each(?::\1)?\}\}/g;
const INTERPOLATE_CONDITION_REGEXP = /\{\{#if(?::(\w+))?\s+([\w.[\]]+)\}\}([\s\S]*?)(?:\{\{#else(?::\1)?\}\}([\s\S]*?))?\{\{\/if(?::\1)?\}\}/g;
const INTERPOLATE_VARIABLE_REGEXP = /\{\{([\w.[\]]+)\}\}/g;
function evaluateExpression(expr, localData) {
  if (expr === ".") {
    return localData["."] ?? localData;
  }
  try {
    return expr.split(".").reduce((value, key) => {
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const indexExpr = indexStr.slice(0, -1);
        let index = Number.parseInt(indexExpr, 10);
        if (Number.isNaN(index)) {
          index = evaluateExpression(indexExpr, localData);
        }
        return value?.[arrayKey]?.[index];
      }
      return value?.[key];
    }, localData);
  } catch (error) {
    console.error(`Error evaluating expression: ${expr}`, error);
    return void 0;
  }
}
function interpolate(template, data, formatter) {
  const processConditional = (condition, trueBlock, falseBlock, localData) => {
    const result = evaluateExpression(condition, localData);
    return result ? trueBlock : falseBlock || "";
  };
  const processLoop = (itemName, arrayExpr, loopContent, localData) => {
    const array = evaluateExpression(arrayExpr, localData);
    if (!Array.isArray(array)) {
      console.warn(`Expression "${arrayExpr}" did not evaluate to an array`);
      return "";
    }
    return array.map((item) => {
      const itemData = { ...localData, [itemName]: item, ".": item };
      return interpolate(loopContent, itemData);
    }).join("");
  };
  const processTemplate = (tmpl, localData) => {
    tmpl = tmpl.replace(
      INTERPOLATE_LOOP_REGEXP,
      (_, alias, itemName, arrayExpr, loopContent) => processLoop(itemName, arrayExpr, loopContent, localData)
    );
    tmpl = tmpl.replace(
      INTERPOLATE_CONDITION_REGEXP,
      (_, alias, condition, trueBlock, falseBlock) => processConditional(condition, trueBlock, falseBlock, localData)
    );
    return tmpl.replace(INTERPOLATE_VARIABLE_REGEXP, (_, expr) => {
      const value = evaluateExpression(expr, localData);
      if (value === void 0) {
        return `{{${expr}}}`;
      }
      if (formatter) {
        return formatter(value);
      }
      return String(value);
    });
  };
  return processTemplate(template, data);
}
function interpolateObject(obj, data) {
  if (obj === null || obj === void 0) {
    return null;
  }
  if (typeof obj === "string") {
    return interpolate(obj, data);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => interpolateObject(item, data));
  }
  if (typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateObject(value, data);
    }
    return result;
  }
  return obj;
}
async function executeRequest(template, data, fetchImpl = fetch) {
  const urlRaw = interpolate(template.url, data, encodeURIComponent);
  const url = new URL(urlRaw);
  if (template.query) {
    for (const [key, value] of Object.entries(template.query)) {
      url.searchParams.append(key, interpolate(value, data));
    }
  }
  const method = template.method;
  const headers = Object.fromEntries(
    Object.entries(template.headers || {}).map(([key, value]) => {
      return [key, interpolate(value, data)];
    })
  );
  for (const key of Object.keys(headers)) {
    if (headers[key] === null) {
      delete headers[key];
    }
  }
  let body = null;
  if (template.body) {
    if (template.body.type === "json") {
      body = JSON.stringify(interpolateObject(template.body.content, data));
    } else if (template.body.type === "form") {
      body = new URLSearchParams();
      for (const [key, value] of Object.entries(template.body.content)) {
        body.append(key, interpolate(value, data));
      }
    } else {
      body = interpolate(template.body.content, data);
    }
  }
  const response = await fetchImpl(url, {
    method,
    headers,
    body
  });
  const renderOutput = async (type, temple, response2) => {
    switch (type) {
      case "text":
        return interpolate(temple, await response2.text());
      case "blob":
        throw new Error("Invalid output type");
      case "json":
      default:
        return interpolate(temple, await response2.json());
    }
  };
  if (!response.ok) {
    const content2 = await renderOutput(
      template.response?.error?.input_type,
      template.response.error?.output,
      response
    );
    return {
      type: template.response.error.output_type,
      content: content2
    };
  }
  if (template.response.content.input_type === "blob") {
    if (template.response.content.output_type !== "image") {
      throw new Error("Invalid output type");
    }
    return {
      type: "image",
      content: await response.blob()
    };
  }
  const content = await renderOutput(
    template.response.content?.input_type,
    template.response.content?.output,
    response
  );
  return {
    type: template.response.content.output_type,
    content
  };
}
function formatInput(input, type) {
  if (type === "json") {
    return JSON.parse(input);
  } else if (type === "space-separated") {
    return input.trim().split(" ").filter(Boolean);
  } else if (type === "comma-separated") {
    return input.split(",").map((item) => item.trim()).filter(Boolean);
  } else {
    return input;
  }
}
async function loadChatRoleWithContext(chatId, speakerId, context) {
  const { groupAdminsKey } = context.SHARE_CONTEXT;
  if (!groupAdminsKey) {
    return null;
  }
  let groupAdmin = null;
  try {
    groupAdmin = JSON.parse(await ENV.DATABASE.get(groupAdminsKey));
  } catch (e) {
    console.error(e);
  }
  if (groupAdmin === null || !Array.isArray(groupAdmin) || groupAdmin.length === 0) {
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const result = await api.getChatAdministratorsWithReturns({ chat_id: chatId });
    if (result == null) {
      return null;
    }
    groupAdmin = result.result;
    await ENV.DATABASE.put(groupAdminsKey, JSON.stringify(groupAdmin), { expiration: Date.now() / 1e3 + 120 });
  }
  for (let i = 0; i < groupAdmin.length; i++) {
    const user = groupAdmin[i];
    if (`${user.user?.id}` === `${speakerId}`) {
      return user.status;
    }
  }
  return "member";
}
function parseSetEnv(arg) {
  const index = arg.indexOf("=");
  if (index <= 0) {
    throw new Error("Format: /setenv KEY=VALUE");
  }
  const key = arg.slice(0, index).trim();
  const value = arg.slice(index + 1);
  return { patch: patchFromPath(key, value), summary: `${key}=${value}` };
}
function parseSetEnvs(arg) {
  let data;
  try {
    data = JSON.parse(arg);
  } catch {
    throw new Error('Format: /setenvs {"KEY":"VALUE"}');
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error('Format: /setenvs {"KEY":"VALUE"}');
  }
  return { patch: data, summary: JSON.stringify(data) };
}
function parseDelEnv(arg) {
  const key = arg.trim();
  const parts = key.split(".");
  if (parts[0] === "settings" && parts.length === 2 && parts[1] in DEFAULT_SETTINGS) {
    const defaults = DEFAULT_SETTINGS;
    return {
      patch: { settings: { [parts[1]]: defaults[parts[1]] } },
      summary: `reset ${key}`
    };
  }
  if (key === "defaultChatProvider" || key === "defaultImageProvider") {
    return { patch: { [key]: null }, summary: `reset ${key}` };
  }
  throw new Error(`Unsupported key: ${key}`);
}
function isConfigShortcutValue(value) {
  const text = value.trim();
  return text.startsWith("/setenv") || text.startsWith("/delenv") || text.startsWith("{");
}
function parseConfigShortcut(value) {
  const text = value.trim();
  if (text.startsWith("/setenvs")) {
    return parseSetEnvs(text.slice("/setenvs".length).trim());
  }
  if (text.startsWith("/setenv")) {
    return parseSetEnv(text.slice("/setenv".length).trim());
  }
  if (text.startsWith("/delenv")) {
    return parseDelEnv(text.slice("/delenv".length).trim());
  }
  if (text.startsWith("{")) {
    return parseSetEnvs(text);
  }
  return null;
}
function applyConfigShortcut(current, shortcut) {
  return mergeConfigPatch(current, shortcut.patch);
}
const MENU_COMMANDS = ["/new", "/redo", "/img", "/admin", "/models", "/help"];
const SERVICE_MESSAGE_FIELDS = [
  "new_chat_members",
  "left_chat_member",
  "new_chat_title",
  "new_chat_photo",
  "delete_chat_photo",
  "group_chat_created",
  "supergroup_chat_created",
  "channel_chat_created",
  "message_auto_delete_timer_changed",
  "migrate_to_chat_id",
  "migrate_from_chat_id",
  "pinned_message",
  "connected_website",
  "write_access_allowed",
  "passport_data",
  "proximity_alert_triggered",
  "boost_added",
  "chat_background_set",
  "successful_payment",
  "refunded_payment",
  "users_shared",
  "chat_shared",
  "gift",
  "unique_gift",
  "gift_upgrade_sent",
  "forum_topic_created",
  "forum_topic_edited",
  "forum_topic_closed",
  "forum_topic_reopened",
  "general_forum_topic_hidden",
  "general_forum_topic_unhidden",
  "giveaway",
  "giveaway_created",
  "giveaway_winners",
  "giveaway_completed",
  "video_chat_scheduled",
  "video_chat_started",
  "video_chat_ended",
  "video_chat_participants_invited",
  "web_app_data"
];
function isServiceMessage(message) {
  const record = message;
  return SERVICE_MESSAGE_FIELDS.some((field) => record[field] !== void 0);
}
class ServiceMessageFilter {
  handle = async (update, _context) => {
    if (update.message && isServiceMessage(update.message)) {
      throw new Error("Ignore service message");
    }
    return null;
  };
}
class EnvChecker {
  handle = async (update, context) => {
    if (!ENV.DATABASE) {
      return MessageSender.fromUpdate(context.SHARE_CONTEXT.botToken, update).sendPlainText("DATABASE Not Set");
    }
    return null;
  };
}
class AccessFilter {
  handle = async (update, context) => {
    const settings = ENV.CONFIG.settings;
    if (settings.allowAllUsers) {
      return null;
    }
    const sender = MessageSender.fromUpdate(context.SHARE_CONTEXT.botToken, update);
    let chatType = "";
    let chatID = 0;
    let userID = 0;
    if (update.message) {
      chatType = update.message.chat.type;
      chatID = update.message.chat.id;
      userID = update.message.from?.id || 0;
    } else if (update.callback_query?.message) {
      chatType = update.callback_query.message.chat.type;
      chatID = update.callback_query.message.chat.id;
      userID = update.callback_query.from.id;
    }
    if (!chatType || !chatID) {
      throw new Error("Invalid chat type or chat id");
    }
    const text = `You are not in the white list, please contact the administrator to add you to the white list. Your chat_id: ${chatID}`;
    const allowedUsers =  new Set([...settings.allowedUserIds, ...ENV.ADMIN_ID ? [ENV.ADMIN_ID] : []]);
    if (chatType === "private") {
      if (allowedUsers.has(`${userID}`) || allowedUsers.has(`${chatID}`)) {
        return null;
      }
      return sender.sendPlainText(text);
    }
    if (isGroupChat(chatType)) {
      if (!settings.groupChatBotEnable) {
        throw new Error("Not support");
      }
      if (!settings.allowedGroupIds.includes(`${chatID}`)) {
        return sender.sendPlainText(text);
      }
      return null;
    }
    return sender.sendPlainText(`Not support chat type: ${chatType}`);
  };
}
class SaveLastMessage {
  handle = async (message, context) => {
    if (!ENV.CONFIG.settings.debugMode) {
      return null;
    }
    const lastMessageKey = `last_message:${context.SHARE_CONTEXT.chatHistoryKey}`;
    await ENV.DATABASE.put(lastMessageKey, JSON.stringify(message), { expirationTtl: 3600 });
    return null;
  };
}
class CallbackQueryHandler {
  handle = async (update, context) => {
    const cb = update.callback_query;
    if (!cb) {
      return null;
    }
    const token = context.SHARE_CONTEXT.botToken;
    const api = createTelegramBotAPI(token);
    const answer = (text) => api.answerCallbackQuery({ callback_query_id: cb.id, text: text || void 0 }).then((r) => r.json()).catch(() => void 0);
    const ok = () => new Response("OK", { status: 200 });
    try {
      const parts = (cb.data || "").split(":");
      if (!["m", "mp", "im", "ip"].includes(parts[0])) {
        await answer();
        return ok();
      }
      const kind = parts[0] === "m" || parts[0] === "mp" ? "chat" : "image";
      if (cb.message && isGroupChat(cb.message.chat.type)) {
        const role = await loadChatRoleWithContext(cb.message.chat.id, cb.from.id, context);
        if (!role || !["administrator", "creator"].includes(role)) {
          await answer("No permission");
          return ok();
        }
      }
      const providers = kind === "image" ? ENV.CONFIG.imageProviders : ENV.CONFIG.chatProviders;
      const providerIdx = Number(parts[1]);
      const provider = providers[providerIdx];
      if (!provider) {
        await answer("Model list changed, send the command again");
        return ok();
      }
      const edit = (text, keyboard) => cb.message ? api.editMessageText({
        chat_id: cb.message.chat.id,
        message_id: cb.message.message_id,
        text,
        reply_markup: keyboard
      }).then((r) => r.json()).catch(() => void 0) : Promise.resolve(void 0);
      if (parts[0] === "mp" || parts[0] === "ip") {
        if (!provider.models.length) {
          await answer("No models for this provider");
          return ok();
        }
        await edit(
          `${provider.label}
${ENV.I18N.callback_query.select_model}`,
          modelKeyboard(kind, providerIdx, provider.model, provider.models)
        );
        return ok();
      }
      const model = provider.models[Number(parts[2])];
      if (!model) {
        await answer("Model list changed, send the command again");
        return ok();
      }
      const next = structuredClone(ENV.CONFIG);
      const nextProvider = (kind === "image" ? next.imageProviders : next.chatProviders)[providerIdx] ?? provider;
      nextProvider.model = model;
      if (kind === "image") {
        next.defaultImageProvider = nextProvider.id;
      } else {
        next.defaultChatProvider = nextProvider.id;
      }
      ENV.CONFIG = await ENV.getConfigStore().save(next);
      await answer(model);
      await edit(
        `${ENV.I18N.callback_query.change_model} ${provider.label} / ${model}`,
        modelKeyboard(kind, providerIdx, model, provider.models)
      );
    } catch (e) {
      console.error("callback query error:", e);
      await answer(`ERROR: ${e.message}`).catch(() => void 0);
    }
    return new Response("OK", { status: 200 });
  };
}
function modelKeyboard(kind, providerIdx, current, models) {
  const prefix = kind === "image" ? "im" : "m";
  const inline_keyboard = models.slice(0, 100).map((m, modelIdx) => [
    { text: m === current ? `✓ ${m}` : m, callback_data: `${prefix}:${providerIdx}:${modelIdx}` }
  ]);
  return { inline_keyboard };
}
function providerRow(kind) {
  const providers = kind === "image" ? ENV.CONFIG.imageProviders : ENV.CONFIG.chatProviders;
  const enabled = providers.filter((p) => p.enabled && p.models.length > 0);
  if (enabled.length <= 1) {
    return [];
  }
  const prefix = kind === "image" ? "ip" : "mp";
  return [
    enabled.map((p) => ({
      text: p.label,
      callback_data: `${prefix}:${providers.indexOf(p)}`
    }))
  ];
}
class OldMessageFilter {
  handle = async (message, context) => {
    if (!ENV.CONFIG.settings.safeMode) {
      return null;
    }
    let idList = [];
    try {
      idList = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => "[]")) || [];
    } catch (e) {
      console.error(e);
    }
    if (idList.includes(message.message_id)) {
      throw new Error("Ignore old message");
    } else {
      idList.push(message.message_id);
      if (idList.length > 100) {
        idList.shift();
      }
      await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
    }
    return null;
  };
}
class MessageFilter {
  handle = async (message, _context) => {
    if (message.text) {
      return null;
    }
    if (message.caption) {
      return null;
    }
    if (message.photo) {
      return null;
    }
    throw new Error("Not supported message type");
  };
}
class CommandHandler {
  handle = async (message, context) => {
    if (message.text || message.caption) {
      return await handleCommandMessage(message, context);
    }
    return null;
  };
}
class ChatHandler {
  handle = async (message, context) => {
    const params = await extractUserMessageItem(message, context);
    return chatWithMessage(message, params, context, null);
  };
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function agentSummary(agent) {
  return agent ? `${agent.label} | ${agent.model}` : "Nan";
}
class ImgCommandHandler {
  command = "/img";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const agent = loadImageGen(ENV.CONFIG);
    if (subcommand === "") {
      const providers = ENV.CONFIG.imageProviders.filter((p) => p.enabled && p.models.length > 0);
      const provider = providers.find((p) => p.id === ENV.CONFIG.defaultImageProvider) ?? providers[0];
      const text = `${ENV.I18N.command.help.img}

${agentSummary(agent)}`;
      if (!provider) {
        return sender.sendPlainText(text);
      }
      const providerIdx = ENV.CONFIG.imageProviders.indexOf(provider);
      const keyboard = modelKeyboard("image", providerIdx, provider.model, provider.models);
      const rows = providerRow("image");
      if (rows.length) {
        keyboard.inline_keyboard.push(...rows);
      }
      return sender.sendRawMessage({
        chat_id: message.chat.id,
        text: `${text}
${provider.label}`,
        reply_markup: keyboard
      });
    }
    try {
      if (!agent) {
        return sender.sendPlainText("ERROR: Image generator not found");
      }
      const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
      setTimeout(
        () => api.sendChatAction({
          chat_id: message.chat.id,
          action: "upload_photo"
        }).catch(console.error),
        0
      );
      const img = await agent.generate(subcommand);
      const resp = await sender.sendPhoto(img);
      if (!resp.ok) {
        return sender.sendPlainText(`ERROR: ${resp.statusText} ${await resp.text()}`);
      }
      return resp;
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class HelpCommandHandler {
  command = "/help";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    let helpMsg = `${ENV.I18N.command.help.summary}
`;
    for (const cmd of MENU_COMMANDS) {
      const desc = ENV.I18N.command.help[cmd.substring(1)];
      if (desc) {
        helpMsg += `${cmd}：${desc}
`;
      }
    }
    for (const cmd of ENV.CONFIG.customCommands) {
      if (cmd.enabled && cmd.description) {
        helpMsg += `${cmd.command}：${cmd.description}
`;
      }
    }
    for (const plugin of ENV.CONFIG.plugins) {
      if (plugin.enabled && plugin.description) {
        helpMsg += `${plugin.command}：${plugin.description}
`;
      }
    }
    return sender.sendPlainText(helpMsg);
  };
}
class BaseNewCommandHandler {
  static async handle(showID, message, subcommand, context) {
    await ENV.DATABASE.delete(context.SHARE_CONTEXT.chatHistoryKey);
    const text = ENV.I18N.command.new.new_chat_start + (showID ? `(${message.chat.id})` : "");
    const params = {
      chat_id: message.chat.id,
      text
    };
    if (ENV.CONFIG.settings.showReplyButton && !isGroupChat(message.chat.type)) {
      params.reply_markup = {
        keyboard: [[{ text: "/new" }, { text: "/redo" }]],
        selective: true,
        resize_keyboard: true,
        one_time_keyboard: false
      };
    } else {
      params.reply_markup = {
        remove_keyboard: true,
        selective: true
      };
    }
    return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage(params);
  }
}
class NewCommandHandler extends BaseNewCommandHandler {
  command = "/new";
  scopes = ["all_private_chats", "all_group_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(false, message, subcommand, context);
  };
}
class StartCommandHandler extends BaseNewCommandHandler {
  command = "/start";
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(true, message, subcommand, context);
  };
}
async function adminPanelUrl(context) {
  const base = ENV.publicBaseUrl?.replace(/\/+$/, "");
  if (base) {
    return `${base}/admin`;
  }
  try {
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const info = await api.getWebhookInfo().then((r) => r.json());
    const url = info?.result?.url;
    if (url?.startsWith("https://")) {
      return `${new URL(url).origin}/admin`;
    }
  } catch {
  }
  return null;
}
async function sendAdminPanel(command, message, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  const url = await adminPanelUrl(context);
  if (!url) {
    return sender.sendPlainText("ERROR: admin panel url not found, bind the webhook with /init first");
  }
  const params = {
    chat_id: message.chat.id,
    text: `Open admin panel (${command})`,
    reply_markup: {
      inline_keyboard: [[{ text: "⚙️ Settings", web_app: { url } }]]
    }
  };
  return sender.sendRawMessage(params);
}
class AdminCommandHandler {
  command = "/admin";
  scopes = ["all_private_chats"];
  needAuth = TELEGRAM_AUTH_CHECKER.default;
  privileged = true;
  handle = (message, subcommand, context) => {
    return sendAdminPanel(this.command, message, context);
  };
}
class VersionCommandHandler {
  command = "/version";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const current = {
      ts: ENV.BUILD_TIMESTAMP,
      sha: ENV.BUILD_VERSION
    };
    try {
      const info = `https://raw.githubusercontent.com/TBXark/ChatGPT-Telegram-Workers/${ENV.CONFIG.settings.updateBranch}/dist/buildinfo.json`;
      const online = await fetch(info).then((r) => r.json());
      const timeFormat = (ts) => {
        return new Date(ts * 1e3).toLocaleString("en-US", {});
      };
      if (current.ts < online.ts) {
        const text = `New version detected: ${online.sha}(${timeFormat(online.ts)})
Current version: ${current.sha}(${timeFormat(current.ts)})`;
        return sender.sendPlainText(text);
      }
      return sender.sendPlainText(`Current version: ${current.sha}(${timeFormat(current.ts)}) is up to date`);
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class SystemCommandHandler {
  command = "/system";
  scopes = ["all_private_chats", "all_chat_administrators"];
  needAuth = TELEGRAM_AUTH_CHECKER.default;
  privileged = true;
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const config = ENV.CONFIG;
    const chatAgent = loadChatLLM(config);
    const imageAgent = loadImageGen(config);
    const agent = {
      chat: agentSummary(chatAgent),
      image: agentSummary(imageAgent),
      chatProviders: config.chatProviders.filter((p) => p.enabled).map((p) => p.id),
      imageProviders: config.imageProviders.filter((p) => p.enabled).map((p) => p.id)
    };
    let msg = `<strong>AGENT</strong><pre>${escapeHtml(JSON.stringify(agent, null, 2))}</pre>`;
    if (config.settings.devMode) {
      const baseUrl = config.settings.publicBaseUrl;
      msg += `

<strong>ADMIN</strong><pre>${escapeHtml(JSON.stringify({ publicBaseUrl: baseUrl || "(unset)" }, null, 2))}</pre>`;
    }
    return sender.sendRichText(msg, "HTML");
  };
}
class RedoCommandHandler {
  command = "/redo";
  scopes = ["all_private_chats", "all_group_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const mf = (history, message2) => {
      let nextMessage = message2;
      if (!(history && Array.isArray(history) && history.length > 0)) {
        throw new Error("History not found");
      }
      const historyCopy = structuredClone(history);
      while (true) {
        const data = historyCopy.pop();
        if (data === void 0 || data === null) {
          break;
        } else if (data.role === "user") {
          nextMessage = data;
          break;
        }
      }
      if (subcommand) {
        nextMessage = {
          role: "user",
          content: subcommand
        };
      }
      if (nextMessage === null) {
        throw new Error("Redo message not found");
      }
      return { history: historyCopy, message: nextMessage };
    };
    return chatWithMessage(message, null, context, mf);
  };
}
class ModelsCommandHandler {
  command = "/models";
  scopes = ["all_private_chats", "all_group_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
    const providers = ENV.CONFIG.chatProviders.filter((p) => p.enabled && p.models.length > 0);
    if (!providers.length) {
      return sender.sendPlainText("ERROR: No models. Add a provider in the admin panel first.");
    }
    const provider = providers.find((p) => p.id === ENV.CONFIG.defaultChatProvider) ?? providers[0];
    const providerIdx = ENV.CONFIG.chatProviders.indexOf(provider);
    const keyboard = modelKeyboard("chat", providerIdx, provider.model, provider.models);
    const rows = providerRow("chat");
    if (rows.length) {
      keyboard.inline_keyboard.push(...rows);
    }
    return sender.sendRawMessage({
      chat_id: message.chat.id,
      text: `${agentSummary(loadChatLLM(ENV.CONFIG))}
${provider.label}
${ENV.I18N.callback_query.select_model}`,
      reply_markup: keyboard
    });
  };
}
class EchoCommandHandler {
  command = "/echo";
  handle = (message, subcommand, context) => {
    let msg = "<pre>";
    msg += escapeHtml(JSON.stringify({ message }, null, 2));
    msg += "</pre>";
    return MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message).sendRichText(msg, "HTML");
  };
}
class ConfigShortcutCommandHandler {
  command;
  scopes = ["all_chat_administrators"];
  privileged = true;
  constructor(command) {
    this.command = command;
  }
  handle = (message, subcommand, context) => {
    return handleConfigShortcut(message, `${this.command} ${subcommand}`.trim(), context);
  };
}
class SetEnvCommandHandler extends ConfigShortcutCommandHandler {
  constructor() {
    super("/setenv");
  }
}
class SetEnvsCommandHandler extends ConfigShortcutCommandHandler {
  constructor() {
    super("/setenvs");
  }
}
class DelEnvCommandHandler extends ConfigShortcutCommandHandler {
  constructor() {
    super("/delenv");
  }
}
const SYSTEM_COMMANDS = [
  new StartCommandHandler(),
  new NewCommandHandler(),
  new RedoCommandHandler(),
  new ImgCommandHandler(),
  new AdminCommandHandler(),
  new VersionCommandHandler(),
  new SystemCommandHandler(),
  new ModelsCommandHandler(),
  new HelpCommandHandler(),
  new SetEnvCommandHandler(),
  new SetEnvsCommandHandler(),
  new DelEnvCommandHandler()
];
async function handleSystemCommand(message, raw, command, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    const chatId = message.chat.id;
    const speakerId = message.from?.id || chatId;
    const chatType = message.chat.type;
    const isPrivate = chatType === "private";
    if (command.privileged && isPrivate && ENV.ADMIN_ID && `${speakerId}` !== ENV.ADMIN_ID) {
      return sender.sendPlainText("ERROR: Permission denied");
    }
    if (command.needAuth) {
      const roleList = command.needAuth(chatType);
      if (roleList) {
        const chatRole = await loadChatRoleWithContext(chatId, speakerId, context);
        if (chatRole === null) {
          return sender.sendPlainText("ERROR: Get chat role failed");
        }
        if (!roleList.includes(chatRole)) {
          return sender.sendPlainText(`ERROR: Permission denied, need ${roleList.join(" or ")}`);
        }
      }
    }
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
  const subcommand = raw.substring(command.command.length).trim();
  try {
    return await command.handle(message, subcommand, context);
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
}
async function handlePluginCommand(message, command, description, raw, template, env, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  try {
    const subcommand = raw.substring(command.length).trim();
    if (template.input?.required && !subcommand) {
      throw new Error("Missing required input");
    }
    const DATA = formatInput(subcommand, template.input?.type);
    const { type, content } = await executeRequest(template, {
      DATA,
      ENV: env
    });
    switch (type) {
      case "image":
        return sender.sendPhoto(content);
      case "html":
        return sender.sendRichText(content, "HTML");
      case "markdown":
        return sender.sendRichText(content, "Markdown");
      case "text":
      default:
        return sender.sendPlainText(content);
    }
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}${description ? `
${description}` : ""}`);
  }
}
async function canApplyConfigShortcut(message, speakerId, context) {
  if (ENV.ADMIN_ID && `${speakerId}` === ENV.ADMIN_ID) {
    return true;
  }
  if (!isGroupChat(message.chat.type)) {
    return false;
  }
  const role = await loadChatRoleWithContext(message.chat.id, speakerId, context);
  return role === "administrator" || role === "creator";
}
async function handleConfigShortcut(message, value, context) {
  const sender = MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message);
  const speakerId = message.from?.id || message.chat.id;
  let shortcut;
  try {
    shortcut = parseConfigShortcut(value);
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
  if (shortcut === null) {
    return sender.sendPlainText(`ERROR: Invalid config shortcut: ${value}`);
  }
  if (!await canApplyConfigShortcut(message, speakerId, context)) {
    return sender.sendPlainText("ERROR: Permission denied");
  }
  try {
    const current = await ENV.loadConfig(true);
    const next = applyConfigShortcut(current, shortcut);
    await ENV.getConfigStore().save(next);
    await ENV.loadConfig(true);
    return sender.sendPlainText(`Update config success: ${shortcut.summary}`);
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
}
async function handleCommandMessage(message, context) {
  let text = (message.text || message.caption || "").trim();
  for (const custom of ENV.CONFIG.customCommands) {
    if (custom.enabled && text === custom.command) {
      if (isConfigShortcutValue(custom.value)) {
        return await handleConfigShortcut(message, custom.value, context);
      }
      text = custom.value;
      break;
    }
  }
  if (ENV.CONFIG.settings.devMode) {
    for (const cmd of [...SYSTEM_COMMANDS, new EchoCommandHandler()]) {
      if (text === cmd.command || text.startsWith(`${cmd.command} `)) {
        return await handleSystemCommand(message, text, cmd, context);
      }
    }
  }
  for (const plugin of ENV.CONFIG.plugins) {
    if (!plugin.enabled) {
      continue;
    }
    const key = plugin.command;
    if (text === key || text.startsWith(`${key} `)) {
      try {
        let template = (plugin.template || "").trim();
        if (template.startsWith("http")) {
          template = await fetch(template).then((r) => r.text());
        }
        return await handlePluginCommand(
          message,
          key,
          plugin.description,
          text,
          JSON.parse(template),
          plugin.env,
          context
        );
      } catch (e) {
        return MessageSender.fromMessage(context.SHARE_CONTEXT.botToken, message).sendPlainText(
          `ERROR: invalid plugin template: ${e.message}`
        );
      }
    }
  }
  for (const cmd of SYSTEM_COMMANDS) {
    if (text === cmd.command || text.startsWith(`${cmd.command} `)) {
      return await handleSystemCommand(message, text, cmd, context);
    }
  }
  return null;
}
function commandsBindScope() {
  const scopeCommandMap = {
    all_private_chats: [],
    all_group_chats: [],
    all_chat_administrators: []
  };
  for (const cmd of SYSTEM_COMMANDS) {
    if (!MENU_COMMANDS.includes(cmd.command)) {
      continue;
    }
    if (ENV.CONFIG.settings.hideCommandButtons.includes(cmd.command)) {
      continue;
    }
    if (cmd.scopes) {
      for (const scope of cmd.scopes) {
        if (!scopeCommandMap[scope]) {
          scopeCommandMap[scope] = [];
        }
        const desc = ENV.I18N.command.help[cmd.command.substring(1)] || "";
        if (desc) {
          scopeCommandMap[scope].push({
            command: cmd.command,
            description: desc
          });
        }
      }
    }
  }
  const extras = [
    ...ENV.CONFIG.customCommands.filter((c) => c.enabled).map((c) => ({ command: c.command, description: c.description, scope: c.scope })),
    ...ENV.CONFIG.plugins.filter((p) => p.enabled).map((p) => ({ command: p.command, description: p.description, scope: p.scope }))
  ];
  for (const config of extras) {
    if (!config.scope?.length) {
      continue;
    }
    for (const scope of config.scope) {
      if (!scopeCommandMap[scope]) {
        scopeCommandMap[scope] = [];
      }
      scopeCommandMap[scope].push({
        command: config.command,
        description: config.description || ""
      });
    }
  }
  const result = {};
  for (const scope in scopeCommandMap) {
    result[scope] = {
      commands: scopeCommandMap[scope],
      scope: {
        type: scope
      }
    };
  }
  return result;
}
function commandsDocument() {
  return SYSTEM_COMMANDS.map((command) => {
    return {
      command: command.command,
      description: ENV.I18N.command.help[command.command.substring(1)] || ""
    };
  }).filter((item) => item.description !== "" && MENU_COMMANDS.includes(item.command));
}
class ShareContext {
  botId;
  botToken;
  botName = null;
  chatHistoryKey;
  lastMessageKey;
  groupAdminsKey;
  constructor(token, update) {
    const botId = Number.parseInt(token.split(":")[0]);
    if (!ENV.TELEGRAM_TOKEN || token !== ENV.TELEGRAM_TOKEN) {
      throw new Error("Token not allowed");
    }
    this.botToken = token;
    this.botId = botId;
    const id = update.chatID;
    if (id === void 0 || id === null) {
      throw new Error("Chat id not found");
    }
    let historyKey = `history:${id}`;
    if (botId) {
      historyKey += `:${botId}`;
    }
    switch (update.chatType) {
      case "group":
      case "supergroup":
        if (!ENV.CONFIG.settings.groupChatBotShareMode && update.fromUserID) {
          historyKey += `:${update.fromUserID}`;
        }
        this.groupAdminsKey = `group_admin:${id}`;
        break;
    }
    if (update.isForum && update.isTopicMessage && update.messageThreadID) {
      historyKey += `:${update.messageThreadID}`;
    }
    this.chatHistoryKey = historyKey;
    this.lastMessageKey = `last_message_id:${historyKey}`;
  }
}
class WorkerContext {
  SHARE_CONTEXT;
  constructor(SHARE_CONTEXT) {
    this.SHARE_CONTEXT = SHARE_CONTEXT;
  }
  static from(token, update) {
    const context = new UpdateContext(update);
    const SHARE_CONTEXT = new ShareContext(token, context);
    return new WorkerContext(SHARE_CONTEXT);
  }
}
class UpdateContext {
  fromUserID;
  chatID;
  chatType;
  isForum;
  isTopicMessage;
  messageThreadID;
  constructor(update) {
    if (update.message) {
      this.fromUserID = update.message.from?.id;
      this.chatID = update.message.chat.id;
      this.chatType = update.message.chat.type;
      this.isForum = update.message.chat.is_forum;
      this.isTopicMessage = update.message.is_topic_message;
      this.messageThreadID = update.message.message_thread_id;
    } else if (update.callback_query) {
      this.fromUserID = update.callback_query.from.id;
      this.chatID = update.callback_query.message?.chat.id;
      this.chatType = update.callback_query.message?.chat.type;
      this.isForum = update.callback_query.message?.chat.is_forum;
    } else {
      console.error("Unknown update type");
    }
  }
}
function checkMention(content, entities, botName, botId) {
  let isMention = false;
  for (const entity of entities) {
    const entityStr = content.slice(entity.offset, entity.offset + entity.length);
    switch (entity.type) {
      case "mention":
        if (entityStr === `@${botName}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "text_mention":
        if (`${entity.user?.id}` === `${botId}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "bot_command":
        if (entityStr.endsWith(`@${botName}`)) {
          isMention = true;
          const newEntityStr = entityStr.replace(`@${botName}`, "");
          content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
        }
        break;
    }
  }
  return {
    isMention,
    content
  };
}
class GroupMention {
  handle = async (message, context) => {
    if (!isGroupChat(message.chat.type)) {
      return null;
    }
    const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
    if (replyMe) {
      return null;
    }
    let botName = context.SHARE_CONTEXT.botName;
    if (!botName) {
      const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
      botName = res.result.username || null;
      context.SHARE_CONTEXT.botName = botName;
    }
    if (!botName) {
      throw new Error("Not set bot name");
    }
    let isMention = false;
    if (message.text && message.entities) {
      const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention;
      message.text = res.content.trim();
    }
    if (message.caption && message.caption_entities) {
      const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention || isMention;
      message.caption = res.content.trim();
    }
    if (!isMention) {
      throw new Error("Not mention");
    }
    return null;
  };
}
const SHARE_HANDLER = [
  new ServiceMessageFilter(),
  new EnvChecker(),
  new AccessFilter(),
  new CallbackQueryHandler(),
  new Update2MessageHandler([
    new MessageFilter(),
    new GroupMention(),
    new OldMessageFilter(),
    new SaveLastMessage(),
    new CommandHandler(),
    new ChatHandler()
  ])
];
async function handleUpdate(token, update) {
  await ENV.loadConfig();
  configureTelegram({
    apiDomain: ENV.CONFIG.settings.telegramApiDomain,
    defaultParseMode: ENV.CONFIG.settings.defaultParseMode,
    renderMessage: ENV.CUSTOM_MESSAGE_RENDER
  });
  const context = WorkerContext.from(token, update);
  for (const handler of SHARE_HANDLER) {
    try {
      const result = await handler.handle(update, context);
      if (result) {
        return result;
      }
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: e.message,
          stack: e.stack
        }),
        { status: 500 }
      );
    }
  }
  return null;
}
const DOCS_URL = "https://github.com/TBXark/ChatGPT-Telegram-Workers/tree/master/doc";
const REPO_URL = "https://github.com/TBXark/ChatGPT-Telegram-Workers";
const ISSUES_URL = "https://github.com/TBXark/ChatGPT-Telegram-Workers/issues";
const RPC_PATH = "/rpc";
const PAGE_PATHS =  new Set(["/", "/help", "/init", "/admin", "/interpolate"]);
function errorToString(e) {
  return JSON.stringify({ message: e.message, stack: e.stack });
}
function makeResponse200(resp) {
  if (resp === null) {
    return new Response("NOT HANDLED", { status: 200 });
  }
  if (resp.status === 200) {
    return resp;
  }
  return new Response(resp.body, {
    status: 200,
    headers: { "Original-Status": `${resp.status}`, ...resp.headers }
  });
}
function html(body) {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, must-revalidate" }
  });
}
async function bindWebhook(domain) {
  const token = ENV.TELEGRAM_TOKEN;
  if (!token) {
    return { ok: false, message: "TELEGRAM_TOKEN is not set" };
  }
  const api = createTelegramBotAPI(token);
  const hookMode = ENV.API_GUARD ? "safehook" : "webhook";
  const envBase = ENV.PUBLIC_BASE_URL;
  const kvBase = ENV.CONFIG.settings.publicBaseUrl?.replace(/\/+$/, "");
  const base = envBase || kvBase || `https://${domain}`;
  if (!envBase && !kvBase) {
    try {
      const config = { ...ENV.CONFIG, settings: { ...ENV.CONFIG.settings, publicBaseUrl: base } };
      ENV.CONFIG = await ENV.getConfigStore().save(config);
      console.log(`publicBaseUrl saved to KV: ${base}`);
    } catch (e) {
      console.error("save publicBaseUrl to KV failed:", errorToString(e));
    }
  }
  const url = `${base}/telegram/${token.trim()}/${hookMode}`;
  const result = {
    webhook: await api.setWebhook({
      url,
      ...ENV.TELEGRAM_SECRET_TOKEN ? { secret_token: ENV.TELEGRAM_SECRET_TOKEN } : {}
    }).then((res) => res.json()).catch((e) => errorToString(e)),
    commands: {}
  };
  for (const [scope, data] of Object.entries(commandsBindScope())) {
    result.commands[scope] = await api.setMyCommands(data).then((res) => res.json()).catch((e) => errorToString(e));
  }
  result.menuButton = await api.setChatMenuButton({
    menu_button: {
      type: "web_app",
      text: "Settings",
      web_app: { url: `${base}/admin` }
    }
  }).then((res) => res.json()).catch((e) => errorToString(e));
  return result;
}
async function bindWebHook(domain) {
  const tokenMissing = !ENV.TELEGRAM_TOKEN;
  const result = await bindWebhook(domain);
  const ok = !!result?.webhook?.ok;
  return {
    domain,
    tokenMissing,
    outcome: tokenMissing ? "no-token" : ok ? "ok" : "error",
    result
  };
}
async function telegramWebhook(request, token) {
  try {
    if (ENV.TELEGRAM_SECRET_TOKEN) {
      const provided = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
      if (provided !== ENV.TELEGRAM_SECRET_TOKEN) {
        return new Response("Forbidden", { status: 403 });
      }
    }
    const body = await request.json();
    return makeResponse200(await handleUpdate(token, body));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function telegramSafeHook(request, token) {
  try {
    if (ENV.API_GUARD === void 0 || ENV.API_GUARD === null) {
      return telegramWebhook(request, token);
    }
    console.log("API_GUARD is enabled");
    const url = new URL(request.url);
    url.pathname = url.pathname.replace("/safehook", "/webhook");
    const newRequest = new Request(url, request);
    return makeResponse200(await ENV.API_GUARD.fetch(newRequest));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
function pageInfo(domain) {
  const base = ENV.publicBaseUrl?.replace(/\/+$/, "");
  return {
    domain,
    version: ENV.BUILD_VERSION,
    timestamp: ENV.BUILD_TIMESTAMP,
    adminUrl: base ? `${base}/admin` : "/admin",
    initUrl: "/init",
    interpolateUrl: base ? `${base}/interpolate` : "/interpolate",
    hasToken: !!ENV.TELEGRAM_TOKEN,
    commands: commandsDocument(),
    docsUrl: DOCS_URL,
    repoUrl: REPO_URL,
    issuesUrl: ISSUES_URL
  };
}
function matchTelegramHook(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 3 || parts[0] !== "telegram") {
    return null;
  }
  if (parts[2] !== "webhook" && parts[2] !== "safehook") {
    return null;
  }
  return { token: decodeURIComponent(parts[1]), safe: parts[2] === "safehook" };
}
function createApp(options = {}) {
  const pageHtml = options.adminHtml || PAGE_HTML;
  const rpcMethods = {
    "pages.info": (_params, ctx) => pageInfo(new URL(ctx.request.url).host),
    "init.bind": async (_params, ctx) => {
      await requireAuth(ctx.request);
      return bindWebHook(new URL(ctx.request.url).host);
    },
    ...createAdminMethods()
  };
  const rpc = createRpcHandler(rpcMethods);
  async function setup(env) {
    await options.onRequest?.(env);
    await ENV.loadConfig();
    configureTelegram({
      apiDomain: ENV.CONFIG.settings.telegramApiDomain,
      defaultParseMode: ENV.CONFIG.settings.defaultParseMode,
      renderMessage: ENV.CUSTOM_MESSAGE_RENDER
    });
  }
  return {
    async fetch(request, env) {
      await setup(env);
      const { pathname } = new URL(request.url);
      if (request.method === "GET") {
        if (PAGE_PATHS.has(pathname.replace(/\/+$/, "") || "/")) {
          return html(pageHtml);
        }
      }
      if (request.method === "POST") {
        if (pathname === RPC_PATH) {
          return rpc(request, env);
        }
        const hook = matchTelegramHook(pathname);
        if (hook) {
          return hook.safe ? telegramSafeHook(request, hook.token) : telegramWebhook(request, hook.token);
        }
      }
      return new Response("Not Found", { status: 404 });
    }
  };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var hasOwnProperty;
var hasRequiredHasOwnProperty;

function requireHasOwnProperty () {
	if (hasRequiredHasOwnProperty) return hasOwnProperty;
	hasRequiredHasOwnProperty = 1;
	var own = {}.hasOwnProperty;
	hasOwnProperty = own;
	return hasOwnProperty;
}

var splice_1;
var hasRequiredSplice;

function requireSplice () {
	if (hasRequiredSplice) return splice_1;
	hasRequiredSplice = 1;
	var splice = [].splice;
	splice_1 = splice;
	return splice_1;
}

var chunkedSplice_1;
var hasRequiredChunkedSplice;

function requireChunkedSplice () {
	if (hasRequiredChunkedSplice) return chunkedSplice_1;
	hasRequiredChunkedSplice = 1;
	var splice = requireSplice();
	function chunkedSplice(list, start, remove, items) {
	  var end = list.length;
	  var chunkStart = 0;
	  var parameters;
	  if (start < 0) {
	    start = -start > end ? 0 : end + start;
	  } else {
	    start = start > end ? end : start;
	  }
	  remove = remove > 0 ? remove : 0;
	  if (items.length < 10000) {
	    parameters = Array.from(items);
	    parameters.unshift(start, remove);
	    splice.apply(list, parameters);
	  } else {
	    if (remove) splice.apply(list, [start, remove]);
	    while (chunkStart < items.length) {
	      parameters = items.slice(chunkStart, chunkStart + 10000);
	      parameters.unshift(start, 0);
	      splice.apply(list, parameters);
	      chunkStart += 10000;
	      start += 10000;
	    }
	  }
	}
	chunkedSplice_1 = chunkedSplice;
	return chunkedSplice_1;
}

var miniflat_1;
var hasRequiredMiniflat;

function requireMiniflat () {
	if (hasRequiredMiniflat) return miniflat_1;
	hasRequiredMiniflat = 1;
	function miniflat(value) {
	  return value === null || value === undefined
	    ? []
	    : 'length' in value
	    ? value
	    : [value]
	}
	miniflat_1 = miniflat;
	return miniflat_1;
}

var combineExtensions_1;
var hasRequiredCombineExtensions;

function requireCombineExtensions () {
	if (hasRequiredCombineExtensions) return combineExtensions_1;
	hasRequiredCombineExtensions = 1;
	var hasOwnProperty = requireHasOwnProperty();
	var chunkedSplice = requireChunkedSplice();
	var miniflat = requireMiniflat();
	function combineExtensions(extensions) {
	  var all = {};
	  var index = -1;
	  while (++index < extensions.length) {
	    extension(all, extensions[index]);
	  }
	  return all
	}
	function extension(all, extension) {
	  var hook;
	  var left;
	  var right;
	  var code;
	  for (hook in extension) {
	    left = hasOwnProperty.call(all, hook) ? all[hook] : (all[hook] = {});
	    right = extension[hook];
	    for (code in right) {
	      left[code] = constructs(
	        miniflat(right[code]),
	        hasOwnProperty.call(left, code) ? left[code] : []
	      );
	    }
	  }
	}
	function constructs(list, existing) {
	  var index = -1;
	  var before = [];
	  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
	  }
	  chunkedSplice(existing, 0, 0, before);
	  return existing
	}
	combineExtensions_1 = combineExtensions;
	return combineExtensions_1;
}

var syntax$3 = {};

var fromCharCode_1;
var hasRequiredFromCharCode;

function requireFromCharCode () {
	if (hasRequiredFromCharCode) return fromCharCode_1;
	hasRequiredFromCharCode = 1;
	var fromCharCode = String.fromCharCode;
	fromCharCode_1 = fromCharCode;
	return fromCharCode_1;
}

var regexCheck_1;
var hasRequiredRegexCheck;

function requireRegexCheck () {
	if (hasRequiredRegexCheck) return regexCheck_1;
	hasRequiredRegexCheck = 1;
	var fromCharCode = requireFromCharCode();
	function regexCheck(regex) {
	  return check
	  function check(code) {
	    return regex.test(fromCharCode(code))
	  }
	}
	regexCheck_1 = regexCheck;
	return regexCheck_1;
}

var asciiAlpha_1;
var hasRequiredAsciiAlpha;

function requireAsciiAlpha () {
	if (hasRequiredAsciiAlpha) return asciiAlpha_1;
	hasRequiredAsciiAlpha = 1;
	var regexCheck = requireRegexCheck();
	var asciiAlpha = regexCheck(/[A-Za-z]/);
	asciiAlpha_1 = asciiAlpha;
	return asciiAlpha_1;
}

var asciiAlphanumeric_1;
var hasRequiredAsciiAlphanumeric;

function requireAsciiAlphanumeric () {
	if (hasRequiredAsciiAlphanumeric) return asciiAlphanumeric_1;
	hasRequiredAsciiAlphanumeric = 1;
	var regexCheck = requireRegexCheck();
	var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
	asciiAlphanumeric_1 = asciiAlphanumeric;
	return asciiAlphanumeric_1;
}

var asciiControl_1;
var hasRequiredAsciiControl;

function requireAsciiControl () {
	if (hasRequiredAsciiControl) return asciiControl_1;
	hasRequiredAsciiControl = 1;
	function asciiControl(code) {
	  return (
	    code < 32 || code === 127
	  )
	}
	asciiControl_1 = asciiControl;
	return asciiControl_1;
}

var markdownLineEnding_1;
var hasRequiredMarkdownLineEnding;

function requireMarkdownLineEnding () {
	if (hasRequiredMarkdownLineEnding) return markdownLineEnding_1;
	hasRequiredMarkdownLineEnding = 1;
	function markdownLineEnding(code) {
	  return code < -2
	}
	markdownLineEnding_1 = markdownLineEnding;
	return markdownLineEnding_1;
}

var unicodePunctuationRegex;
var hasRequiredUnicodePunctuationRegex;

function requireUnicodePunctuationRegex () {
	if (hasRequiredUnicodePunctuationRegex) return unicodePunctuationRegex;
	hasRequiredUnicodePunctuationRegex = 1;
	var unicodePunctuation = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
	unicodePunctuationRegex = unicodePunctuation;
	return unicodePunctuationRegex;
}

var unicodePunctuation_1;
var hasRequiredUnicodePunctuation;

function requireUnicodePunctuation () {
	if (hasRequiredUnicodePunctuation) return unicodePunctuation_1;
	hasRequiredUnicodePunctuation = 1;
	var unicodePunctuationRegex = requireUnicodePunctuationRegex();
	var regexCheck = requireRegexCheck();
	var unicodePunctuation = regexCheck(unicodePunctuationRegex);
	unicodePunctuation_1 = unicodePunctuation;
	return unicodePunctuation_1;
}

var unicodeWhitespace_1;
var hasRequiredUnicodeWhitespace;

function requireUnicodeWhitespace () {
	if (hasRequiredUnicodeWhitespace) return unicodeWhitespace_1;
	hasRequiredUnicodeWhitespace = 1;
	var regexCheck = requireRegexCheck();
	var unicodeWhitespace = regexCheck(/\s/);
	unicodeWhitespace_1 = unicodeWhitespace;
	return unicodeWhitespace_1;
}

var hasRequiredSyntax$3;

function requireSyntax$3 () {
	if (hasRequiredSyntax$3) return syntax$3;
	hasRequiredSyntax$3 = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiControl = requireAsciiControl();
	var markdownLineEnding = requireMarkdownLineEnding();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	var www = {tokenize: tokenizeWww, partial: true};
	var domain = {tokenize: tokenizeDomain, partial: true};
	var path = {tokenize: tokenizePath, partial: true};
	var punctuation = {tokenize: tokenizePunctuation, partial: true};
	var namedCharacterReference = {
	  tokenize: tokenizeNamedCharacterReference,
	  partial: true
	};
	var wwwAutolink = {tokenize: tokenizeWwwAutolink, previous: previousWww};
	var httpAutolink = {tokenize: tokenizeHttpAutolink, previous: previousHttp};
	var emailAutolink = {tokenize: tokenizeEmailAutolink, previous: previousEmail};
	var text = {};
	syntax$3.text = text;
	var code = 48;
	while (code < 123) {
	  text[code] = emailAutolink;
	  code++;
	  if (code === 58) code = 65;
	  else if (code === 91) code = 97;
	}
	text[43] = emailAutolink;
	text[45] = emailAutolink;
	text[46] = emailAutolink;
	text[95] = emailAutolink;
	text[72] = [emailAutolink, httpAutolink];
	text[104] = [emailAutolink, httpAutolink];
	text[87] = [emailAutolink, wwwAutolink];
	text[119] = [emailAutolink, wwwAutolink];
	function tokenizeEmailAutolink(effects, ok, nok) {
	  var self = this;
	  var hasDot;
	  return start
	  function start(code) {
	    if (
	      !gfmAtext(code) ||
	      !previousEmail(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkEmail');
	    return atext(code)
	  }
	  function atext(code) {
	    if (gfmAtext(code)) {
	      effects.consume(code);
	      return atext
	    }
	    if (code === 64) {
	      effects.consume(code);
	      return label
	    }
	    return nok(code)
	  }
	  function label(code) {
	    if (code === 46) {
	      return effects.check(punctuation, done, dotContinuation)(code)
	    }
	    if (
	      code === 45 ||
	      code === 95
	    ) {
	      return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code)
	    }
	    if (asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return label
	    }
	    return done(code)
	  }
	  function dotContinuation(code) {
	    effects.consume(code);
	    hasDot = true;
	    return label
	  }
	  function dashOrUnderscoreContinuation(code) {
	    effects.consume(code);
	    return afterDashOrUnderscore
	  }
	  function afterDashOrUnderscore(code) {
	    if (code === 46) {
	      return effects.check(punctuation, nok, dotContinuation)(code)
	    }
	    return label(code)
	  }
	  function done(code) {
	    if (hasDot) {
	      effects.exit('literalAutolinkEmail');
	      effects.exit('literalAutolink');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeWwwAutolink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (
	      (code !== 87 && code - 32 !== 87) ||
	      !previousWww(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkWww');
	    return effects.check(
	      www,
	      effects.attempt(domain, effects.attempt(path, done), nok),
	      nok
	    )(code)
	  }
	  function done(code) {
	    effects.exit('literalAutolinkWww');
	    effects.exit('literalAutolink');
	    return ok(code)
	  }
	}
	function tokenizeHttpAutolink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (
	      (code !== 72 && code - 32 !== 72) ||
	      !previousHttp(self.previous) ||
	      previous(self.events)
	    ) {
	      return nok(code)
	    }
	    effects.enter('literalAutolink');
	    effects.enter('literalAutolinkHttp');
	    effects.consume(code);
	    return t1
	  }
	  function t1(code) {
	    if (code === 84 || code - 32 === 84) {
	      effects.consume(code);
	      return t2
	    }
	    return nok(code)
	  }
	  function t2(code) {
	    if (code === 84 || code - 32 === 84) {
	      effects.consume(code);
	      return p
	    }
	    return nok(code)
	  }
	  function p(code) {
	    if (code === 80 || code - 32 === 80) {
	      effects.consume(code);
	      return s
	    }
	    return nok(code)
	  }
	  function s(code) {
	    if (code === 83 || code - 32 === 83) {
	      effects.consume(code);
	      return colon
	    }
	    return colon(code)
	  }
	  function colon(code) {
	    if (code === 58) {
	      effects.consume(code);
	      return slash1
	    }
	    return nok(code)
	  }
	  function slash1(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return slash2
	    }
	    return nok(code)
	  }
	  function slash2(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return asciiControl(code) ||
	      unicodeWhitespace(code) ||
	      unicodePunctuation(code)
	      ? nok(code)
	      : effects.attempt(domain, effects.attempt(path, done), nok)(code)
	  }
	  function done(code) {
	    effects.exit('literalAutolinkHttp');
	    effects.exit('literalAutolink');
	    return ok(code)
	  }
	}
	function tokenizeWww(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return w2
	  }
	  function w2(code) {
	    if (code === 87 || code - 32 === 87) {
	      effects.consume(code);
	      return w3
	    }
	    return nok(code)
	  }
	  function w3(code) {
	    if (code === 87 || code - 32 === 87) {
	      effects.consume(code);
	      return dot
	    }
	    return nok(code)
	  }
	  function dot(code) {
	    if (code === 46) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === null || markdownLineEnding(code) ? nok(code) : ok(code)
	  }
	}
	function tokenizeDomain(effects, ok, nok) {
	  var hasUnderscoreInLastSegment;
	  var hasUnderscoreInLastLastSegment;
	  return domain
	  function domain(code) {
	    if (code === 38) {
	      return effects.check(
	        namedCharacterReference,
	        done,
	        punctuationContinuation
	      )(code)
	    }
	    if (code === 46  || code === 95 ) {
	      return effects.check(punctuation, done, punctuationContinuation)(code)
	    }
	    if (
	      asciiControl(code) ||
	      unicodeWhitespace(code) ||
	      (code !== 45  && unicodePunctuation(code))
	    ) {
	      return done(code)
	    }
	    effects.consume(code);
	    return domain
	  }
	  function punctuationContinuation(code) {
	    if (code === 46) {
	      hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
	      hasUnderscoreInLastSegment = undefined;
	      effects.consume(code);
	      return domain
	    }
	    if (code === 95) hasUnderscoreInLastSegment = true;
	    effects.consume(code);
	    return domain
	  }
	  function done(code) {
	    if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizePath(effects, ok) {
	  var balance = 0;
	  return inPath
	  function inPath(code) {
	    if (code === 38) {
	      return effects.check(
	        namedCharacterReference,
	        ok,
	        continuedPunctuation
	      )(code)
	    }
	    if (code === 40) {
	      balance++;
	    }
	    if (code === 41) {
	      return effects.check(
	        punctuation,
	        parenAtPathEnd,
	        continuedPunctuation
	      )(code)
	    }
	    if (pathEnd(code)) {
	      return ok(code)
	    }
	    if (trailingPunctuation(code)) {
	      return effects.check(punctuation, ok, continuedPunctuation)(code)
	    }
	    effects.consume(code);
	    return inPath
	  }
	  function continuedPunctuation(code) {
	    effects.consume(code);
	    return inPath
	  }
	  function parenAtPathEnd(code) {
	    balance--;
	    return balance < 0 ? ok(code) : continuedPunctuation(code)
	  }
	}
	function tokenizeNamedCharacterReference(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return inside
	  }
	  function inside(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return inside
	    }
	    if (code === 59) {
	      effects.consume(code);
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return pathEnd(code) ? ok(code) : nok(code)
	  }
	}
	function tokenizePunctuation(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.consume(code);
	    return after
	  }
	  function after(code) {
	    if (trailingPunctuation(code)) {
	      effects.consume(code);
	      return after
	    }
	    return pathEnd(code) ? ok(code) : nok(code)
	  }
	}
	function trailingPunctuation(code) {
	  return (
	    code === 33 ||
	    code === 34 ||
	    code === 39 ||
	    code === 41 ||
	    code === 42 ||
	    code === 44 ||
	    code === 46 ||
	    code === 58 ||
	    code === 59 ||
	    code === 60 ||
	    code === 63 ||
	    code === 95 ||
	    code === 126
	  )
	}
	function pathEnd(code) {
	  return (
	    code === null ||
	    code < 0 ||
	    code === 32 ||
	    code === 60
	  )
	}
	function gfmAtext(code) {
	  return (
	    code === 43  ||
	    code === 45  ||
	    code === 46  ||
	    code === 95  ||
	    asciiAlphanumeric(code)
	  )
	}
	function previousWww(code) {
	  return (
	    code === null ||
	    code < 0 ||
	    code === 32  ||
	    code === 40  ||
	    code === 42  ||
	    code === 95  ||
	    code === 126
	  )
	}
	function previousHttp(code) {
	  return code === null || !asciiAlpha(code)
	}
	function previousEmail(code) {
	  return code !== 47  && previousHttp(code)
	}
	function previous(events) {
	  var index = events.length;
	  while (index--) {
	    if (
	      (events[index][1].type === 'labelLink' ||
	        events[index][1].type === 'labelImage') &&
	      !events[index][1]._balanced
	    ) {
	      return true
	    }
	  }
	}
	return syntax$3;
}

var micromarkExtensionGfmAutolinkLiteral;
var hasRequiredMicromarkExtensionGfmAutolinkLiteral;

function requireMicromarkExtensionGfmAutolinkLiteral () {
	if (hasRequiredMicromarkExtensionGfmAutolinkLiteral) return micromarkExtensionGfmAutolinkLiteral;
	hasRequiredMicromarkExtensionGfmAutolinkLiteral = 1;
	micromarkExtensionGfmAutolinkLiteral = requireSyntax$3();
	return micromarkExtensionGfmAutolinkLiteral;
}

var markdownLineEndingOrSpace_1;
var hasRequiredMarkdownLineEndingOrSpace;

function requireMarkdownLineEndingOrSpace () {
	if (hasRequiredMarkdownLineEndingOrSpace) return markdownLineEndingOrSpace_1;
	hasRequiredMarkdownLineEndingOrSpace = 1;
	function markdownLineEndingOrSpace(code) {
	  return code < 0 || code === 32
	}
	markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace;
	return markdownLineEndingOrSpace_1;
}

var classifyCharacter_1;
var hasRequiredClassifyCharacter;

function requireClassifyCharacter () {
	if (hasRequiredClassifyCharacter) return classifyCharacter_1;
	hasRequiredClassifyCharacter = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	function classifyCharacter(code) {
	  if (
	    code === null ||
	    markdownLineEndingOrSpace(code) ||
	    unicodeWhitespace(code)
	  ) {
	    return 1
	  }
	  if (unicodePunctuation(code)) {
	    return 2
	  }
	}
	classifyCharacter_1 = classifyCharacter;
	return classifyCharacter_1;
}

var resolveAll_1;
var hasRequiredResolveAll;

function requireResolveAll () {
	if (hasRequiredResolveAll) return resolveAll_1;
	hasRequiredResolveAll = 1;
	function resolveAll(constructs, events, context) {
	  var called = [];
	  var index = -1;
	  var resolve;
	  while (++index < constructs.length) {
	    resolve = constructs[index].resolveAll;
	    if (resolve && called.indexOf(resolve) < 0) {
	      events = resolve(events, context);
	      called.push(resolve);
	    }
	  }
	  return events
	}
	resolveAll_1 = resolveAll;
	return resolveAll_1;
}

var assign_1;
var hasRequiredAssign;

function requireAssign () {
	if (hasRequiredAssign) return assign_1;
	hasRequiredAssign = 1;
	var assign = Object.assign;
	assign_1 = assign;
	return assign_1;
}

var shallow_1;
var hasRequiredShallow;

function requireShallow () {
	if (hasRequiredShallow) return shallow_1;
	hasRequiredShallow = 1;
	var assign = requireAssign();
	function shallow(object) {
	  return assign({}, object)
	}
	shallow_1 = shallow;
	return shallow_1;
}

var micromarkExtensionGfmStrikethrough;
var hasRequiredMicromarkExtensionGfmStrikethrough;

function requireMicromarkExtensionGfmStrikethrough () {
	if (hasRequiredMicromarkExtensionGfmStrikethrough) return micromarkExtensionGfmStrikethrough;
	hasRequiredMicromarkExtensionGfmStrikethrough = 1;
	micromarkExtensionGfmStrikethrough = create;
	var classifyCharacter = requireClassifyCharacter();
	var chunkedSplice = requireChunkedSplice();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	function create(options) {
	  var settings = options || {};
	  var single = settings.singleTilde;
	  var tokenizer = {
	    tokenize: tokenizeStrikethrough,
	    resolveAll: resolveAllStrikethrough
	  };
	  if (single === null || single === undefined) {
	    single = true;
	  }
	  return {text: {126: tokenizer}, insideSpan: {null: tokenizer}}
	  function resolveAllStrikethrough(events, context) {
	    var index = -1;
	    var strikethrough;
	    var text;
	    var open;
	    var nextEvents;
	    while (++index < events.length) {
	      if (
	        events[index][0] === 'enter' &&
	        events[index][1].type === 'strikethroughSequenceTemporary' &&
	        events[index][1]._close
	      ) {
	        open = index;
	        while (open--) {
	          if (
	            events[open][0] === 'exit' &&
	            events[open][1].type === 'strikethroughSequenceTemporary' &&
	            events[open][1]._open &&
	            events[index][1].end.offset - events[index][1].start.offset ===
	              events[open][1].end.offset - events[open][1].start.offset
	          ) {
	            events[index][1].type = 'strikethroughSequence';
	            events[open][1].type = 'strikethroughSequence';
	            strikethrough = {
	              type: 'strikethrough',
	              start: shallow(events[open][1].start),
	              end: shallow(events[index][1].end)
	            };
	            text = {
	              type: 'strikethroughText',
	              start: shallow(events[open][1].end),
	              end: shallow(events[index][1].start)
	            };
	            nextEvents = [
	              ['enter', strikethrough, context],
	              ['enter', events[open][1], context],
	              ['exit', events[open][1], context],
	              ['enter', text, context]
	            ];
	            chunkedSplice(
	              nextEvents,
	              nextEvents.length,
	              0,
	              resolveAll(
	                context.parser.constructs.insideSpan.null,
	                events.slice(open + 1, index),
	                context
	              )
	            );
	            chunkedSplice(nextEvents, nextEvents.length, 0, [
	              ['exit', text, context],
	              ['enter', events[index][1], context],
	              ['exit', events[index][1], context],
	              ['exit', strikethrough, context]
	            ]);
	            chunkedSplice(events, open - 1, index - open + 3, nextEvents);
	            index = open + nextEvents.length - 2;
	            break
	          }
	        }
	      }
	    }
	    return removeRemainingSequences(events)
	  }
	  function removeRemainingSequences(events) {
	    var index = -1;
	    var length = events.length;
	    while (++index < length) {
	      if (events[index][1].type === 'strikethroughSequenceTemporary') {
	        events[index][1].type = 'data';
	      }
	    }
	    return events
	  }
	  function tokenizeStrikethrough(effects, ok, nok) {
	    var previous = this.previous;
	    var events = this.events;
	    var size = 0;
	    return start
	    function start(code) {
	      if (
	        code !== 126 ||
	        (previous === 126 &&
	          events[events.length - 1][1].type !== 'characterEscape')
	      ) {
	        return nok(code)
	      }
	      effects.enter('strikethroughSequenceTemporary');
	      return more(code)
	    }
	    function more(code) {
	      var before = classifyCharacter(previous);
	      var token;
	      var after;
	      if (code === 126) {
	        if (size > 1) return nok(code)
	        effects.consume(code);
	        size++;
	        return more
	      }
	      if (size < 2 && !single) return nok(code)
	      token = effects.exit('strikethroughSequenceTemporary');
	      after = classifyCharacter(code);
	      token._open = !after || (after === 2 && before);
	      token._close = !before || (before === 2 && after);
	      return ok(code)
	    }
	  }
	}
	return micromarkExtensionGfmStrikethrough;
}

var syntax$2 = {};

var markdownSpace_1;
var hasRequiredMarkdownSpace;

function requireMarkdownSpace () {
	if (hasRequiredMarkdownSpace) return markdownSpace_1;
	hasRequiredMarkdownSpace = 1;
	function markdownSpace(code) {
	  return code === -2 || code === -1 || code === 32
	}
	markdownSpace_1 = markdownSpace;
	return markdownSpace_1;
}

var factorySpace;
var hasRequiredFactorySpace;

function requireFactorySpace () {
	if (hasRequiredFactorySpace) return factorySpace;
	hasRequiredFactorySpace = 1;
	var markdownSpace = requireMarkdownSpace();
	function spaceFactory(effects, ok, type, max) {
	  var limit = max ? max - 1 : Infinity;
	  var size = 0;
	  return start
	  function start(code) {
	    if (markdownSpace(code)) {
	      effects.enter(type);
	      return prefix(code)
	    }
	    return ok(code)
	  }
	  function prefix(code) {
	    if (markdownSpace(code) && size++ < limit) {
	      effects.consume(code);
	      return prefix
	    }
	    effects.exit(type);
	    return ok(code)
	  }
	}
	factorySpace = spaceFactory;
	return factorySpace;
}

var hasRequiredSyntax$2;

function requireSyntax$2 () {
	if (hasRequiredSyntax$2) return syntax$2;
	hasRequiredSyntax$2 = 1;
	syntax$2.flow = {
	  null: {tokenize: tokenizeTable, resolve: resolveTable, interruptible: true}
	};
	var createSpace = requireFactorySpace();
	var setextUnderlineMini = {tokenize: tokenizeSetextUnderlineMini, partial: true};
	var nextPrefixedOrBlank = {tokenize: tokenizeNextPrefixedOrBlank, partial: true};
	function resolveTable(events, context) {
	  var length = events.length;
	  var index = -1;
	  var token;
	  var inHead;
	  var inDelimiterRow;
	  var inRow;
	  var cell;
	  var content;
	  var text;
	  var contentStart;
	  var contentEnd;
	  var cellStart;
	  while (++index < length) {
	    token = events[index][1];
	    if (inRow) {
	      if (token.type === 'temporaryTableCellContent') {
	        contentStart = contentStart || index;
	        contentEnd = index;
	      }
	      if (
	        (token.type === 'tableCellDivider' || token.type === 'tableRow') &&
	        contentEnd
	      ) {
	        content = {
	          type: 'tableContent',
	          start: events[contentStart][1].start,
	          end: events[contentEnd][1].end
	        };
	        text = {
	          type: 'chunkText',
	          start: content.start,
	          end: content.end,
	          contentType: 'text'
	        };
	        events.splice(
	          contentStart,
	          contentEnd - contentStart + 1,
	          ['enter', content, context],
	          ['enter', text, context],
	          ['exit', text, context],
	          ['exit', content, context]
	        );
	        index -= contentEnd - contentStart - 3;
	        length = events.length;
	        contentStart = undefined;
	        contentEnd = undefined;
	      }
	    }
	    if (
	      events[index][0] === 'exit' &&
	      cellStart &&
	      cellStart + 1 < index &&
	      (token.type === 'tableCellDivider' ||
	        (token.type === 'tableRow' &&
	          (cellStart + 3 < index ||
	            events[cellStart][1].type !== 'whitespace')))
	    ) {
	      cell = {
	        type: inDelimiterRow
	          ? 'tableDelimiter'
	          : inHead
	          ? 'tableHeader'
	          : 'tableData',
	        start: events[cellStart][1].start,
	        end: events[index][1].end
	      };
	      events.splice(index + (token.type === 'tableCellDivider' ? 1 : 0), 0, [
	        'exit',
	        cell,
	        context
	      ]);
	      events.splice(cellStart, 0, ['enter', cell, context]);
	      index += 2;
	      length = events.length;
	      cellStart = index + 1;
	    }
	    if (token.type === 'tableRow') {
	      inRow = events[index][0] === 'enter';
	      if (inRow) {
	        cellStart = index + 1;
	      }
	    }
	    if (token.type === 'tableDelimiterRow') {
	      inDelimiterRow = events[index][0] === 'enter';
	      if (inDelimiterRow) {
	        cellStart = index + 1;
	      }
	    }
	    if (token.type === 'tableHead') {
	      inHead = events[index][0] === 'enter';
	    }
	  }
	  return events
	}
	function tokenizeTable(effects, ok, nok) {
	  var align = [];
	  var tableHeaderCount = 0;
	  var seenDelimiter;
	  var hasDash;
	  return start
	  function start(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return nok(code)
	    }
	    effects.enter('table')._align = align;
	    effects.enter('tableHead');
	    effects.enter('tableRow');
	    if (code === 124) {
	      return cellDividerHead(code)
	    }
	    tableHeaderCount++;
	    effects.enter('temporaryTableCellContent');
	    return inCellContentHead(code)
	  }
	  function cellDividerHead(code) {
	    effects.enter('tableCellDivider');
	    effects.consume(code);
	    effects.exit('tableCellDivider');
	    seenDelimiter = true;
	    return cellBreakHead
	  }
	  function cellBreakHead(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return atRowEndHead(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceHead
	    }
	    if (seenDelimiter) {
	      seenDelimiter = undefined;
	      tableHeaderCount++;
	    }
	    if (code === 124) {
	      return cellDividerHead(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentHead(code)
	  }
	  function inWhitespaceHead(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceHead
	    }
	    effects.exit('whitespace');
	    return cellBreakHead(code)
	  }
	  function inCellContentHead(code) {
	    if (code === null || code < 0 || code === 32 || code === 124) {
	      effects.exit('temporaryTableCellContent');
	      return cellBreakHead(code)
	    }
	    effects.consume(code);
	    return code === 92 ? inCellContentEscapeHead : inCellContentHead
	  }
	  function inCellContentEscapeHead(code) {
	    if (code === 92 || code === 124) {
	      effects.consume(code);
	      return inCellContentHead
	    }
	    return inCellContentHead(code)
	  }
	  function atRowEndHead(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    effects.exit('tableRow');
	    effects.exit('tableHead');
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return effects.check(
	      setextUnderlineMini,
	      nok,
	      createSpace(effects, rowStartDelimiter, 'linePrefix', 4)
	    )
	  }
	  function rowStartDelimiter(code) {
	    if (code === null || code < 0 || code === 32) {
	      return nok(code)
	    }
	    effects.enter('tableDelimiterRow');
	    return atDelimiterRowBreak(code)
	  }
	  function atDelimiterRowBreak(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return rowEndDelimiter(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    if (code === 45) {
	      effects.enter('tableDelimiterFiller');
	      effects.consume(code);
	      hasDash = true;
	      align.push(null);
	      return inFillerDelimiter
	    }
	    if (code === 58) {
	      effects.enter('tableDelimiterAlignment');
	      effects.consume(code);
	      effects.exit('tableDelimiterAlignment');
	      align.push('left');
	      return afterLeftAlignment
	    }
	    if (code === 124) {
	      effects.enter('tableCellDivider');
	      effects.consume(code);
	      effects.exit('tableCellDivider');
	      return atDelimiterRowBreak
	    }
	    return nok(code)
	  }
	  function inWhitespaceDelimiter(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    effects.exit('whitespace');
	    return atDelimiterRowBreak(code)
	  }
	  function inFillerDelimiter(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return inFillerDelimiter
	    }
	    effects.exit('tableDelimiterFiller');
	    if (code === 58) {
	      effects.enter('tableDelimiterAlignment');
	      effects.consume(code);
	      effects.exit('tableDelimiterAlignment');
	      align[align.length - 1] =
	        align[align.length - 1] === 'left' ? 'center' : 'right';
	      return afterRightAlignment
	    }
	    return atDelimiterRowBreak(code)
	  }
	  function afterLeftAlignment(code) {
	    if (code === 45) {
	      effects.enter('tableDelimiterFiller');
	      effects.consume(code);
	      hasDash = true;
	      return inFillerDelimiter
	    }
	    return nok(code)
	  }
	  function afterRightAlignment(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return rowEndDelimiter(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceDelimiter
	    }
	    if (code === 124) {
	      effects.enter('tableCellDivider');
	      effects.consume(code);
	      effects.exit('tableCellDivider');
	      return atDelimiterRowBreak
	    }
	    return nok(code)
	  }
	  function rowEndDelimiter(code) {
	    effects.exit('tableDelimiterRow');
	    if (!hasDash || tableHeaderCount !== align.length) {
	      return nok(code)
	    }
	    if (code === null) {
	      return tableClose(code)
	    }
	    return effects.check(nextPrefixedOrBlank, tableClose, tableContinue)(code)
	  }
	  function tableClose(code) {
	    effects.exit('table');
	    return ok(code)
	  }
	  function tableContinue(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return createSpace(effects, bodyStart, 'linePrefix', 4)
	  }
	  function bodyStart(code) {
	    effects.enter('tableBody');
	    return rowStartBody(code)
	  }
	  function rowStartBody(code) {
	    effects.enter('tableRow');
	    if (code === 124) {
	      return cellDividerBody(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentBody(code)
	  }
	  function cellDividerBody(code) {
	    effects.enter('tableCellDivider');
	    effects.consume(code);
	    effects.exit('tableCellDivider');
	    return cellBreakBody
	  }
	  function cellBreakBody(code) {
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return atRowEndBody(code)
	    }
	    if (code === -2 || code === -1 || code === 32) {
	      effects.enter('whitespace');
	      effects.consume(code);
	      return inWhitespaceBody
	    }
	    if (code === 124) {
	      return cellDividerBody(code)
	    }
	    effects.enter('temporaryTableCellContent');
	    return inCellContentBody(code)
	  }
	  function inWhitespaceBody(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return inWhitespaceBody
	    }
	    effects.exit('whitespace');
	    return cellBreakBody(code)
	  }
	  function inCellContentBody(code) {
	    if (code === null || code < 0 || code === 32 || code === 124) {
	      effects.exit('temporaryTableCellContent');
	      return cellBreakBody(code)
	    }
	    effects.consume(code);
	    return code === 92 ? inCellContentEscapeBody : inCellContentBody
	  }
	  function inCellContentEscapeBody(code) {
	    if (code === 92 || code === 124) {
	      effects.consume(code);
	      return inCellContentBody
	    }
	    return inCellContentBody(code)
	  }
	  function atRowEndBody(code) {
	    effects.exit('tableRow');
	    if (code === null) {
	      return tableBodyClose(code)
	    }
	    return effects.check(
	      nextPrefixedOrBlank,
	      tableBodyClose,
	      tableBodyContinue
	    )(code)
	  }
	  function tableBodyClose(code) {
	    effects.exit('tableBody');
	    return tableClose(code)
	  }
	  function tableBodyContinue(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return createSpace(effects, rowStartBody, 'linePrefix', 4)
	  }
	}
	function tokenizeSetextUnderlineMini(effects, ok, nok) {
	  return start
	  function start(code) {
	    if (code !== 45) {
	      return nok(code)
	    }
	    effects.enter('setextUnderline');
	    return sequence(code)
	  }
	  function sequence(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return sequence
	    }
	    return whitespace(code)
	  }
	  function whitespace(code) {
	    if (code === -2 || code === -1 || code === 32) {
	      effects.consume(code);
	      return whitespace
	    }
	    if (code === null || code === -5 || code === -4 || code === -3) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeNextPrefixedOrBlank(effects, ok, nok) {
	  var size = 0;
	  return start
	  function start(code) {
	    effects.enter('check');
	    effects.consume(code);
	    return whitespace
	  }
	  function whitespace(code) {
	    if (code === -1 || code === 32) {
	      effects.consume(code);
	      size++;
	      return size === 4 ? ok : whitespace
	    }
	    if (code === null || code < 0) {
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	return syntax$2;
}

var micromarkExtensionGfmTable;
var hasRequiredMicromarkExtensionGfmTable;

function requireMicromarkExtensionGfmTable () {
	if (hasRequiredMicromarkExtensionGfmTable) return micromarkExtensionGfmTable;
	hasRequiredMicromarkExtensionGfmTable = 1;
	micromarkExtensionGfmTable = requireSyntax$2();
	return micromarkExtensionGfmTable;
}

var syntax$1 = {};

var sizeChunks_1;
var hasRequiredSizeChunks;

function requireSizeChunks () {
	if (hasRequiredSizeChunks) return sizeChunks_1;
	hasRequiredSizeChunks = 1;
	function sizeChunks(chunks) {
	  var index = -1;
	  var size = 0;
	  while (++index < chunks.length) {
	    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
	  }
	  return size
	}
	sizeChunks_1 = sizeChunks;
	return sizeChunks_1;
}

var prefixSize_1;
var hasRequiredPrefixSize;

function requirePrefixSize () {
	if (hasRequiredPrefixSize) return prefixSize_1;
	hasRequiredPrefixSize = 1;
	var sizeChunks = requireSizeChunks();
	function prefixSize(events, type) {
	  var tail = events[events.length - 1];
	  if (!tail || tail[1].type !== type) return 0
	  return sizeChunks(tail[2].sliceStream(tail[1]))
	}
	prefixSize_1 = prefixSize;
	return prefixSize_1;
}

var hasRequiredSyntax$1;

function requireSyntax$1 () {
	if (hasRequiredSyntax$1) return syntax$1;
	hasRequiredSyntax$1 = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var spaceFactory = requireFactorySpace();
	var prefixSize = requirePrefixSize();
	var tasklistCheck = {tokenize: tokenizeTasklistCheck};
	syntax$1.text = {91: tasklistCheck};
	function tokenizeTasklistCheck(effects, ok, nok) {
	  var self = this;
	  return open
	  function open(code) {
	    if (
	      code !== 91 ||
	      self.previous !== null ||
	      !self._gfmTasklistFirstContentOfListItem
	    ) {
	      return nok(code)
	    }
	    effects.enter('taskListCheck');
	    effects.enter('taskListCheckMarker');
	    effects.consume(code);
	    effects.exit('taskListCheckMarker');
	    return inside
	  }
	  function inside(code) {
	    if (code === -2 || code === 32) {
	      effects.enter('taskListCheckValueUnchecked');
	      effects.consume(code);
	      effects.exit('taskListCheckValueUnchecked');
	      return close
	    }
	    if (code === 88 || code === 120) {
	      effects.enter('taskListCheckValueChecked');
	      effects.consume(code);
	      effects.exit('taskListCheckValueChecked');
	      return close
	    }
	    return nok(code)
	  }
	  function close(code) {
	    if (code === 93) {
	      effects.enter('taskListCheckMarker');
	      effects.consume(code);
	      effects.exit('taskListCheckMarker');
	      effects.exit('taskListCheck');
	      return effects.check({tokenize: spaceThenNonSpace}, ok, nok)
	    }
	    return nok(code)
	  }
	}
	function spaceThenNonSpace(effects, ok, nok) {
	  var self = this;
	  return spaceFactory(effects, after, 'whitespace')
	  function after(code) {
	    return prefixSize(self.events, 'whitespace') &&
	      code !== null &&
	      !markdownLineEndingOrSpace(code)
	      ? ok(code)
	      : nok(code)
	  }
	}
	return syntax$1;
}

var micromarkExtensionGfmTaskListItem;
var hasRequiredMicromarkExtensionGfmTaskListItem;

function requireMicromarkExtensionGfmTaskListItem () {
	if (hasRequiredMicromarkExtensionGfmTaskListItem) return micromarkExtensionGfmTaskListItem;
	hasRequiredMicromarkExtensionGfmTaskListItem = 1;
	micromarkExtensionGfmTaskListItem = requireSyntax$1();
	return micromarkExtensionGfmTaskListItem;
}

var syntax;
var hasRequiredSyntax;

function requireSyntax () {
	if (hasRequiredSyntax) return syntax;
	hasRequiredSyntax = 1;
	var combine = requireCombineExtensions();
	var autolink = requireMicromarkExtensionGfmAutolinkLiteral();
	var strikethrough = requireMicromarkExtensionGfmStrikethrough();
	var table = requireMicromarkExtensionGfmTable();
	var tasklist = requireMicromarkExtensionGfmTaskListItem();
	syntax = create;
	function create(options) {
	  return combine([autolink, strikethrough(options), table, tasklist])
	}
	return syntax;
}

var micromarkExtensionGfm;
var hasRequiredMicromarkExtensionGfm;

function requireMicromarkExtensionGfm () {
	if (hasRequiredMicromarkExtensionGfm) return micromarkExtensionGfm;
	hasRequiredMicromarkExtensionGfm = 1;
	micromarkExtensionGfm = requireSyntax();
	return micromarkExtensionGfm;
}

var fromMarkdown$4 = {};

var ccount_1;
var hasRequiredCcount;

function requireCcount () {
	if (hasRequiredCcount) return ccount_1;
	hasRequiredCcount = 1;
	ccount_1 = ccount;
	function ccount(source, character) {
	  var value = String(source);
	  var count = 0;
	  var index;
	  if (typeof character !== 'string') {
	    throw new Error('Expected character')
	  }
	  index = value.indexOf(character);
	  while (index !== -1) {
	    count++;
	    index = value.indexOf(character, index + character.length);
	  }
	  return count
	}
	return ccount_1;
}

var convert_1;
var hasRequiredConvert$1;

function requireConvert$1 () {
	if (hasRequiredConvert$1) return convert_1;
	hasRequiredConvert$1 = 1;
	convert_1 = convert;
	function convert(test) {
	  if (test == null) {
	    return ok
	  }
	  if (typeof test === 'string') {
	    return typeFactory(test)
	  }
	  if (typeof test === 'object') {
	    return 'length' in test ? anyFactory(test) : allFactory(test)
	  }
	  if (typeof test === 'function') {
	    return test
	  }
	  throw new Error('Expected function, string, or object as test')
	}
	function allFactory(test) {
	  return all
	  function all(node) {
	    var key;
	    for (key in test) {
	      if (node[key] !== test[key]) return false
	    }
	    return true
	  }
	}
	function anyFactory(tests) {
	  var checks = [];
	  var index = -1;
	  while (++index < tests.length) {
	    checks[index] = convert(tests[index]);
	  }
	  return any
	  function any() {
	    var index = -1;
	    while (++index < checks.length) {
	      if (checks[index].apply(this, arguments)) {
	        return true
	      }
	    }
	    return false
	  }
	}
	function typeFactory(test) {
	  return type
	  function type(node) {
	    return Boolean(node && node.type === test)
	  }
	}
	function ok() {
	  return true
	}
	return convert_1;
}

var color_browser;
var hasRequiredColor_browser;

function requireColor_browser () {
	if (hasRequiredColor_browser) return color_browser;
	hasRequiredColor_browser = 1;
	color_browser = identity;
	function identity(d) {
	  return d
	}
	return color_browser;
}

var unistUtilVisitParents;
var hasRequiredUnistUtilVisitParents;

function requireUnistUtilVisitParents () {
	if (hasRequiredUnistUtilVisitParents) return unistUtilVisitParents;
	hasRequiredUnistUtilVisitParents = 1;
	unistUtilVisitParents = visitParents;
	var convert = requireConvert$1();
	var color = requireColor_browser();
	var CONTINUE = true;
	var SKIP = 'skip';
	var EXIT = false;
	visitParents.CONTINUE = CONTINUE;
	visitParents.SKIP = SKIP;
	visitParents.EXIT = EXIT;
	function visitParents(tree, test, visitor, reverse) {
	  var step;
	  var is;
	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }
	  is = convert(test);
	  step = reverse ? -1 : 1;
	  factory(tree, null, [])();
	  function factory(node, index, parents) {
	    var value = typeof node === 'object' && node !== null ? node : {};
	    var name;
	    if (typeof value.type === 'string') {
	      name =
	        typeof value.tagName === 'string'
	          ? value.tagName
	          : typeof value.name === 'string'
	          ? value.name
	          : undefined;
	      visit.displayName =
	        'node (' + color(value.type + (name ? '<' + name + '>' : '')) + ')';
	    }
	    return visit
	    function visit() {
	      var grandparents = parents.concat(node);
	      var result = [];
	      var subresult;
	      var offset;
	      if (!test || is(node, index, parents[parents.length - 1] || null)) {
	        result = toResult(visitor(node, parents));
	        if (result[0] === EXIT) {
	          return result
	        }
	      }
	      if (node.children && result[0] !== SKIP) {
	        offset = (reverse ? node.children.length : -1) + step;
	        while (offset > -1 && offset < node.children.length) {
	          subresult = factory(node.children[offset], offset, grandparents)();
	          if (subresult[0] === EXIT) {
	            return subresult
	          }
	          offset =
	            typeof subresult[1] === 'number' ? subresult[1] : offset + step;
	        }
	      }
	      return result
	    }
	  }
	}
	function toResult(value) {
	  if (value !== null && typeof value === 'object' && 'length' in value) {
	    return value
	  }
	  if (typeof value === 'number') {
	    return [CONTINUE, value]
	  }
	  return [value]
	}
	return unistUtilVisitParents;
}

var escapeStringRegexp;
var hasRequiredEscapeStringRegexp;

function requireEscapeStringRegexp () {
	if (hasRequiredEscapeStringRegexp) return escapeStringRegexp;
	hasRequiredEscapeStringRegexp = 1;
	escapeStringRegexp = string => {
		if (typeof string !== 'string') {
			throw new TypeError('Expected a string');
		}
		return string
			.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
			.replace(/-/g, '\\x2d');
	};
	return escapeStringRegexp;
}

var mdastUtilFindAndReplace;
var hasRequiredMdastUtilFindAndReplace;

function requireMdastUtilFindAndReplace () {
	if (hasRequiredMdastUtilFindAndReplace) return mdastUtilFindAndReplace;
	hasRequiredMdastUtilFindAndReplace = 1;
	mdastUtilFindAndReplace = findAndReplace;
	var visit = requireUnistUtilVisitParents();
	var convert = requireConvert$1();
	var escape = requireEscapeStringRegexp();
	var splice = [].splice;
	function findAndReplace(tree, find, replace, options) {
	  var settings;
	  var schema;
	  if (typeof find === 'string' || (find && typeof find.exec === 'function')) {
	    schema = [[find, replace]];
	  } else {
	    schema = find;
	    options = replace;
	  }
	  settings = options || {};
	  search(tree, settings, handlerFactory(toPairs(schema)));
	  return tree
	  function handlerFactory(pairs) {
	    var pair = pairs[0];
	    return handler
	    function handler(node, parent) {
	      var find = pair[0];
	      var replace = pair[1];
	      var nodes = [];
	      var start = 0;
	      var index = parent.children.indexOf(node);
	      var position;
	      var match;
	      var subhandler;
	      var value;
	      find.lastIndex = 0;
	      match = find.exec(node.value);
	      while (match) {
	        position = match.index;
	        value = replace.apply(
	          null,
	          [].concat(match, {index: match.index, input: match.input})
	        );
	        if (value !== false) {
	          if (start !== position) {
	            nodes.push({type: 'text', value: node.value.slice(start, position)});
	          }
	          if (typeof value === 'string' && value.length > 0) {
	            value = {type: 'text', value: value};
	          }
	          if (value) {
	            nodes = [].concat(nodes, value);
	          }
	          start = position + match[0].length;
	        }
	        if (!find.global) {
	          break
	        }
	        match = find.exec(node.value);
	      }
	      if (position === undefined) {
	        nodes = [node];
	        index--;
	      } else {
	        if (start < node.value.length) {
	          nodes.push({type: 'text', value: node.value.slice(start)});
	        }
	        nodes.unshift(index, 1);
	        splice.apply(parent.children, nodes);
	      }
	      if (pairs.length > 1) {
	        subhandler = handlerFactory(pairs.slice(1));
	        position = -1;
	        while (++position < nodes.length) {
	          node = nodes[position];
	          if (node.type === 'text') {
	            subhandler(node, parent);
	          } else {
	            search(node, settings, subhandler);
	          }
	        }
	      }
	      return index + nodes.length + 1
	    }
	  }
	}
	function search(tree, settings, handler) {
	  var ignored = convert(settings.ignore || []);
	  var result = [];
	  visit(tree, 'text', visitor);
	  return result
	  function visitor(node, parents) {
	    var index = -1;
	    var parent;
	    var grandparent;
	    while (++index < parents.length) {
	      parent = parents[index];
	      if (
	        ignored(
	          parent,
	          grandparent ? grandparent.children.indexOf(parent) : undefined,
	          grandparent
	        )
	      ) {
	        return
	      }
	      grandparent = parent;
	    }
	    return handler(node, grandparent)
	  }
	}
	function toPairs(schema) {
	  var result = [];
	  var key;
	  var index;
	  if (typeof schema !== 'object') {
	    throw new Error('Expected array or object as schema')
	  }
	  if ('length' in schema) {
	    index = -1;
	    while (++index < schema.length) {
	      result.push([
	        toExpression(schema[index][0]),
	        toFunction(schema[index][1])
	      ]);
	    }
	  } else {
	    for (key in schema) {
	      result.push([toExpression(key), toFunction(schema[key])]);
	    }
	  }
	  return result
	}
	function toExpression(find) {
	  return typeof find === 'string' ? new RegExp(escape(find), 'g') : find
	}
	function toFunction(replace) {
	  return typeof replace === 'function' ? replace : returner
	  function returner() {
	    return replace
	  }
	}
	return mdastUtilFindAndReplace;
}

var hasRequiredFromMarkdown$4;

function requireFromMarkdown$4 () {
	if (hasRequiredFromMarkdown$4) return fromMarkdown$4;
	hasRequiredFromMarkdown$4 = 1;
	var ccount = requireCcount();
	var findAndReplace = requireMdastUtilFindAndReplace();
	var unicodePunctuation = requireUnicodePunctuation();
	var unicodeWhitespace = requireUnicodeWhitespace();
	fromMarkdown$4.transforms = [transformGfmAutolinkLiterals];
	fromMarkdown$4.enter = {
	  literalAutolink: enterLiteralAutolink,
	  literalAutolinkEmail: enterLiteralAutolinkValue,
	  literalAutolinkHttp: enterLiteralAutolinkValue,
	  literalAutolinkWww: enterLiteralAutolinkValue
	};
	fromMarkdown$4.exit = {
	  literalAutolink: exitLiteralAutolink,
	  literalAutolinkEmail: exitLiteralAutolinkEmail,
	  literalAutolinkHttp: exitLiteralAutolinkHttp,
	  literalAutolinkWww: exitLiteralAutolinkWww
	};
	function enterLiteralAutolink(token) {
	  this.enter({type: 'link', title: null, url: '', children: []}, token);
	}
	function enterLiteralAutolinkValue(token) {
	  this.config.enter.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkHttp(token) {
	  this.config.exit.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkWww(token) {
	  this.config.exit.data.call(this, token);
	  this.stack[this.stack.length - 1].url = 'http://' + this.sliceSerialize(token);
	}
	function exitLiteralAutolinkEmail(token) {
	  this.config.exit.autolinkEmail.call(this, token);
	}
	function exitLiteralAutolink(token) {
	  this.exit(token);
	}
	function transformGfmAutolinkLiterals(tree) {
	  findAndReplace(
	    tree,
	    [
	      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/i, findUrl],
	      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/, findEmail]
	    ],
	    {ignore: ['link', 'linkReference']}
	  );
	}
	function findUrl($0, protocol, domain, path, match) {
	  var prefix = '';
	  var parts;
	  var result;
	  if (!previous(match)) {
	    return false
	  }
	  if (/^w/i.test(protocol)) {
	    domain = protocol + domain;
	    protocol = '';
	    prefix = 'http://';
	  }
	  if (!isCorrectDomain(domain)) {
	    return false
	  }
	  parts = splitUrl(domain + path);
	  if (!parts[0]) return false
	  result = {
	    type: 'link',
	    title: null,
	    url: prefix + protocol + parts[0],
	    children: [{type: 'text', value: protocol + parts[0]}]
	  };
	  if (parts[1]) {
	    result = [result, {type: 'text', value: parts[1]}];
	  }
	  return result
	}
	function findEmail($0, atext, label, match) {
	  if (!previous(match, true) || /[_-]$/.test(label)) {
	    return false
	  }
	  return {
	    type: 'link',
	    title: null,
	    url: 'mailto:' + atext + '@' + label,
	    children: [{type: 'text', value: atext + '@' + label}]
	  }
	}
	function isCorrectDomain(domain) {
	  var parts = domain.split('.');
	  if (
	    parts.length < 2 ||
	    (parts[parts.length - 1] &&
	      (/_/.test(parts[parts.length - 1]) ||
	        !/[a-zA-Z\d]/.test(parts[parts.length - 1]))) ||
	    (parts[parts.length - 2] &&
	      (/_/.test(parts[parts.length - 2]) ||
	        !/[a-zA-Z\d]/.test(parts[parts.length - 2])))
	  ) {
	    return false
	  }
	  return true
	}
	function splitUrl(url) {
	  var trail = /[!"&'),.:;<>?\]}]+$/.exec(url);
	  var closingParenIndex;
	  var openingParens;
	  var closingParens;
	  if (trail) {
	    url = url.slice(0, trail.index);
	    trail = trail[0];
	    closingParenIndex = trail.indexOf(')');
	    openingParens = ccount(url, '(');
	    closingParens = ccount(url, ')');
	    while (closingParenIndex !== -1 && openingParens > closingParens) {
	      url += trail.slice(0, closingParenIndex + 1);
	      trail = trail.slice(closingParenIndex + 1);
	      closingParenIndex = trail.indexOf(')');
	      closingParens++;
	    }
	  }
	  return [url, trail]
	}
	function previous(match, email) {
	  var code = match.input.charCodeAt(match.index - 1);
	  return (
	    (code !== code || unicodeWhitespace(code) || unicodePunctuation(code)) &&
	    (!email || code !== 47)
	  )
	}
	return fromMarkdown$4;
}

var fromMarkdown$3 = {};

var hasRequiredFromMarkdown$3;

function requireFromMarkdown$3 () {
	if (hasRequiredFromMarkdown$3) return fromMarkdown$3;
	hasRequiredFromMarkdown$3 = 1;
	fromMarkdown$3.canContainEols = ['delete'];
	fromMarkdown$3.enter = {strikethrough: enterStrikethrough};
	fromMarkdown$3.exit = {strikethrough: exitStrikethrough};
	function enterStrikethrough(token) {
	  this.enter({type: 'delete', children: []}, token);
	}
	function exitStrikethrough(token) {
	  this.exit(token);
	}
	return fromMarkdown$3;
}

var fromMarkdown$2 = {};

var hasRequiredFromMarkdown$2;

function requireFromMarkdown$2 () {
	if (hasRequiredFromMarkdown$2) return fromMarkdown$2;
	hasRequiredFromMarkdown$2 = 1;
	fromMarkdown$2.enter = {
	  table: enterTable,
	  tableData: enterCell,
	  tableHeader: enterCell,
	  tableRow: enterRow
	};
	fromMarkdown$2.exit = {
	  codeText: exitCodeText,
	  table: exitTable,
	  tableData: exit,
	  tableHeader: exit,
	  tableRow: exit
	};
	function enterTable(token) {
	  this.enter({type: 'table', align: token._align, children: []}, token);
	  this.setData('inTable', true);
	}
	function exitTable(token) {
	  this.exit(token);
	  this.setData('inTable');
	}
	function enterRow(token) {
	  this.enter({type: 'tableRow', children: []}, token);
	}
	function exit(token) {
	  this.exit(token);
	}
	function enterCell(token) {
	  this.enter({type: 'tableCell', children: []}, token);
	}
	function exitCodeText(token) {
	  var value = this.resume();
	  if (this.getData('inTable')) {
	    value = value.replace(/\\([\\|])/g, replace);
	  }
	  this.stack[this.stack.length - 1].value = value;
	  this.exit(token);
	}
	function replace($0, $1) {
	  return $1 === '|' ? $1 : $0
	}
	return fromMarkdown$2;
}

var fromMarkdown$1 = {};

var hasRequiredFromMarkdown$1;

function requireFromMarkdown$1 () {
	if (hasRequiredFromMarkdown$1) return fromMarkdown$1;
	hasRequiredFromMarkdown$1 = 1;
	fromMarkdown$1.exit = {
	  taskListCheckValueChecked: exitCheck,
	  taskListCheckValueUnchecked: exitCheck,
	  paragraph: exitParagraphWithTaskListItem
	};
	function exitCheck(token) {
	  this.stack[this.stack.length - 2].checked =
	    token.type === 'taskListCheckValueChecked';
	}
	function exitParagraphWithTaskListItem(token) {
	  var parent = this.stack[this.stack.length - 2];
	  var node = this.stack[this.stack.length - 1];
	  var siblings = parent.children;
	  var head = node.children[0];
	  var index = -1;
	  var firstParaghraph;
	  if (
	    parent &&
	    parent.type === 'listItem' &&
	    typeof parent.checked === 'boolean' &&
	    head &&
	    head.type === 'text'
	  ) {
	    while (++index < siblings.length) {
	      if (siblings[index].type === 'paragraph') {
	        firstParaghraph = siblings[index];
	        break
	      }
	    }
	    if (firstParaghraph === node) {
	      head.value = head.value.slice(1);
	      if (head.value.length === 0) {
	        node.children.shift();
	      } else {
	        head.position.start.column++;
	        head.position.start.offset++;
	        node.position.start = Object.assign({}, head.position.start);
	      }
	    }
	  }
	  this.exit(token);
	}
	return fromMarkdown$1;
}

var fromMarkdown;
var hasRequiredFromMarkdown;

function requireFromMarkdown () {
	if (hasRequiredFromMarkdown) return fromMarkdown;
	hasRequiredFromMarkdown = 1;
	var autolinkLiteral = requireFromMarkdown$4();
	var strikethrough = requireFromMarkdown$3();
	var table = requireFromMarkdown$2();
	var taskListItem = requireFromMarkdown$1();
	var own = {}.hasOwnProperty;
	fromMarkdown = configure([
	  autolinkLiteral,
	  strikethrough,
	  table,
	  taskListItem
	]);
	function configure(extensions) {
	  var config = {transforms: [], canContainEols: []};
	  var length = extensions.length;
	  var index = -1;
	  while (++index < length) {
	    extension(config, extensions[index]);
	  }
	  return config
	}
	function extension(config, extension) {
	  var key;
	  var left;
	  var right;
	  for (key in extension) {
	    left = own.call(config, key) ? config[key] : (config[key] = {});
	    right = extension[key];
	    if (key === 'canContainEols' || key === 'transforms') {
	      config[key] = [].concat(left, right);
	    } else {
	      Object.assign(left, right);
	    }
	  }
	}
	return fromMarkdown;
}

var toMarkdown$2 = {};

var hasRequiredToMarkdown$4;

function requireToMarkdown$4 () {
	if (hasRequiredToMarkdown$4) return toMarkdown$2;
	hasRequiredToMarkdown$4 = 1;
	var inConstruct = 'phrasing';
	var notInConstruct = ['autolink', 'link', 'image', 'label'];
	toMarkdown$2.unsafe = [
	  {
	    character: '@',
	    before: '[+\\-.\\w]',
	    after: '[\\-.\\w]',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  },
	  {
	    character: '.',
	    before: '[Ww]',
	    after: '[\\-.\\w]',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  },
	  {
	    character: ':',
	    before: '[ps]',
	    after: '\\/',
	    inConstruct: inConstruct,
	    notInConstruct: notInConstruct
	  }
	];
	return toMarkdown$2;
}

var toMarkdown$1 = {};

var containerPhrasing;
var hasRequiredContainerPhrasing;

function requireContainerPhrasing () {
	if (hasRequiredContainerPhrasing) return containerPhrasing;
	hasRequiredContainerPhrasing = 1;
	containerPhrasing = phrasing;
	function phrasing(parent, context, safeOptions) {
	  var children = parent.children || [];
	  var results = [];
	  var index = -1;
	  var before = safeOptions.before;
	  var after;
	  var handle;
	  var child;
	  while (++index < children.length) {
	    child = children[index];
	    if (index + 1 < children.length) {
	      handle = context.handle.handlers[children[index + 1].type];
	      if (handle && handle.peek) handle = handle.peek;
	      after = handle
	        ? handle(children[index + 1], parent, context, {
	            before: '',
	            after: ''
	          }).charAt(0)
	        : '';
	    } else {
	      after = safeOptions.after;
	    }
	    if (
	      results.length > 0 &&
	      (before === '\r' || before === '\n') &&
	      child.type === 'html'
	    ) {
	      results[results.length - 1] = results[results.length - 1].replace(
	        /(\r?\n|\r)$/,
	        ' '
	      );
	      before = ' ';
	    }
	    results.push(
	      context.handle(child, parent, context, {
	        before: before,
	        after: after
	      })
	    );
	    before = results[results.length - 1].slice(-1);
	  }
	  return results.join('')
	}
	return containerPhrasing;
}

var hasRequiredToMarkdown$3;

function requireToMarkdown$3 () {
	if (hasRequiredToMarkdown$3) return toMarkdown$1;
	hasRequiredToMarkdown$3 = 1;
	var phrasing = requireContainerPhrasing();
	toMarkdown$1.unsafe = [{character: '~', inConstruct: 'phrasing'}];
	toMarkdown$1.handlers = {delete: handleDelete};
	handleDelete.peek = peekDelete;
	function handleDelete(node, _, context) {
	  var exit = context.enter('emphasis');
	  var value = phrasing(node, context, {before: '~', after: '~'});
	  exit();
	  return '~~' + value + '~~'
	}
	function peekDelete() {
	  return '~'
	}
	return toMarkdown$1;
}

var patternCompile_1;
var hasRequiredPatternCompile;

function requirePatternCompile () {
	if (hasRequiredPatternCompile) return patternCompile_1;
	hasRequiredPatternCompile = 1;
	patternCompile_1 = patternCompile;
	function patternCompile(pattern) {
	  var before;
	  var after;
	  if (!pattern._compiled) {
	    before = pattern.before ? '(?:' + pattern.before + ')' : '';
	    after = pattern.after ? '(?:' + pattern.after + ')' : '';
	    if (pattern.atBreak) {
	      before = '[\\r\\n][\\t ]*' + before;
	    }
	    pattern._compiled = new RegExp(
	      (before ? '(' + before + ')' : '') +
	        (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? '\\' : '') +
	        pattern.character +
	        (after || ''),
	      'g'
	    );
	  }
	  return pattern._compiled
	}
	return patternCompile_1;
}

var inlineCode_1;
var hasRequiredInlineCode;

function requireInlineCode () {
	if (hasRequiredInlineCode) return inlineCode_1;
	hasRequiredInlineCode = 1;
	inlineCode_1 = inlineCode;
	inlineCode.peek = inlineCodePeek;
	var patternCompile = requirePatternCompile();
	function inlineCode(node, parent, context) {
	  var value = node.value || '';
	  var sequence = '`';
	  var index = -1;
	  var pattern;
	  var expression;
	  var match;
	  var position;
	  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
	    sequence += '`';
	  }
	  if (
	    /[^ \r\n]/.test(value) &&
	    (/[ \r\n`]/.test(value.charAt(0)) ||
	      /[ \r\n`]/.test(value.charAt(value.length - 1)))
	  ) {
	    value = ' ' + value + ' ';
	  }
	  while (++index < context.unsafe.length) {
	    pattern = context.unsafe[index];
	    if (!pattern.atBreak) continue
	    expression = patternCompile(pattern);
	    while ((match = expression.exec(value))) {
	      position = match.index;
	      if (
	        value.charCodeAt(position) === 10  &&
	        value.charCodeAt(position - 1) === 13
	      ) {
	        position--;
	      }
	      value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
	    }
	  }
	  return sequence + value + sequence
	}
	function inlineCodePeek() {
	  return '`'
	}
	return inlineCode_1;
}

var repeatString;
var hasRequiredRepeatString;

function requireRepeatString () {
	if (hasRequiredRepeatString) return repeatString;
	hasRequiredRepeatString = 1;
	var res = '';
	var cache;
	repeatString = repeat;
	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }
	  if (num === 1) return str;
	  if (num === 2) return str + str;
	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }
	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }
	    num >>= 1;
	    str += str;
	  }
	  res += str;
	  res = res.substr(0, max);
	  return res;
	}
	return repeatString;
}

var markdownTable_1;
var hasRequiredMarkdownTable;

function requireMarkdownTable () {
	if (hasRequiredMarkdownTable) return markdownTable_1;
	hasRequiredMarkdownTable = 1;
	var repeat = requireRepeatString();
	markdownTable_1 = markdownTable;
	var trailingWhitespace = / +$/;
	var space = ' ';
	var lineFeed = '\n';
	var dash = '-';
	var colon = ':';
	var verticalBar = '|';
	var x = 0;
	var C = 67;
	var L = 76;
	var R = 82;
	var c = 99;
	var l = 108;
	var r = 114;
	function markdownTable(table, options) {
	  var settings = options || {};
	  var padding = settings.padding !== false;
	  var start = settings.delimiterStart !== false;
	  var end = settings.delimiterEnd !== false;
	  var align = (settings.align || []).concat();
	  var alignDelimiters = settings.alignDelimiters !== false;
	  var alignments = [];
	  var stringLength = settings.stringLength || defaultStringLength;
	  var rowIndex = -1;
	  var rowLength = table.length;
	  var cellMatrix = [];
	  var sizeMatrix = [];
	  var row = [];
	  var sizes = [];
	  var longestCellByColumn = [];
	  var mostCellsPerRow = 0;
	  var cells;
	  var columnIndex;
	  var columnLength;
	  var largest;
	  var size;
	  var cell;
	  var lines;
	  var line;
	  var before;
	  var after;
	  var code;
	  while (++rowIndex < rowLength) {
	    cells = table[rowIndex];
	    columnIndex = -1;
	    columnLength = cells.length;
	    row = [];
	    sizes = [];
	    if (columnLength > mostCellsPerRow) {
	      mostCellsPerRow = columnLength;
	    }
	    while (++columnIndex < columnLength) {
	      cell = serialize(cells[columnIndex]);
	      if (alignDelimiters === true) {
	        size = stringLength(cell);
	        sizes[columnIndex] = size;
	        largest = longestCellByColumn[columnIndex];
	        if (largest === undefined || size > largest) {
	          longestCellByColumn[columnIndex] = size;
	        }
	      }
	      row.push(cell);
	    }
	    cellMatrix[rowIndex] = row;
	    sizeMatrix[rowIndex] = sizes;
	  }
	  columnIndex = -1;
	  columnLength = mostCellsPerRow;
	  if (typeof align === 'object' && 'length' in align) {
	    while (++columnIndex < columnLength) {
	      alignments[columnIndex] = toAlignment(align[columnIndex]);
	    }
	  } else {
	    code = toAlignment(align);
	    while (++columnIndex < columnLength) {
	      alignments[columnIndex] = code;
	    }
	  }
	  columnIndex = -1;
	  columnLength = mostCellsPerRow;
	  row = [];
	  sizes = [];
	  while (++columnIndex < columnLength) {
	    code = alignments[columnIndex];
	    before = '';
	    after = '';
	    if (code === l) {
	      before = colon;
	    } else if (code === r) {
	      after = colon;
	    } else if (code === c) {
	      before = colon;
	      after = colon;
	    }
	    size = alignDelimiters
	      ? Math.max(
	          1,
	          longestCellByColumn[columnIndex] - before.length - after.length
	        )
	      : 1;
	    cell = before + repeat(dash, size) + after;
	    if (alignDelimiters === true) {
	      size = before.length + size + after.length;
	      if (size > longestCellByColumn[columnIndex]) {
	        longestCellByColumn[columnIndex] = size;
	      }
	      sizes[columnIndex] = size;
	    }
	    row[columnIndex] = cell;
	  }
	  cellMatrix.splice(1, 0, row);
	  sizeMatrix.splice(1, 0, sizes);
	  rowIndex = -1;
	  rowLength = cellMatrix.length;
	  lines = [];
	  while (++rowIndex < rowLength) {
	    row = cellMatrix[rowIndex];
	    sizes = sizeMatrix[rowIndex];
	    columnIndex = -1;
	    columnLength = mostCellsPerRow;
	    line = [];
	    while (++columnIndex < columnLength) {
	      cell = row[columnIndex] || '';
	      before = '';
	      after = '';
	      if (alignDelimiters === true) {
	        size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
	        code = alignments[columnIndex];
	        if (code === r) {
	          before = repeat(space, size);
	        } else if (code === c) {
	          if (size % 2 === 0) {
	            before = repeat(space, size / 2);
	            after = before;
	          } else {
	            before = repeat(space, size / 2 + 0.5);
	            after = repeat(space, size / 2 - 0.5);
	          }
	        } else {
	          after = repeat(space, size);
	        }
	      }
	      if (start === true && columnIndex === 0) {
	        line.push(verticalBar);
	      }
	      if (
	        padding === true &&
	        !(alignDelimiters === false && cell === '') &&
	        (start === true || columnIndex !== 0)
	      ) {
	        line.push(space);
	      }
	      if (alignDelimiters === true) {
	        line.push(before);
	      }
	      line.push(cell);
	      if (alignDelimiters === true) {
	        line.push(after);
	      }
	      if (padding === true) {
	        line.push(space);
	      }
	      if (end === true || columnIndex !== columnLength - 1) {
	        line.push(verticalBar);
	      }
	    }
	    line = line.join('');
	    if (end === false) {
	      line = line.replace(trailingWhitespace, '');
	    }
	    lines.push(line);
	  }
	  return lines.join(lineFeed)
	}
	function serialize(value) {
	  return value === null || value === undefined ? '' : String(value)
	}
	function defaultStringLength(value) {
	  return value.length
	}
	function toAlignment(value) {
	  var code = typeof value === 'string' ? value.charCodeAt(0) : x;
	  return code === L || code === l
	    ? l
	    : code === R || code === r
	    ? r
	    : code === C || code === c
	    ? c
	    : x
	}
	return markdownTable_1;
}

var toMarkdown_1$1;
var hasRequiredToMarkdown$2;

function requireToMarkdown$2 () {
	if (hasRequiredToMarkdown$2) return toMarkdown_1$1;
	hasRequiredToMarkdown$2 = 1;
	var phrasing = requireContainerPhrasing();
	var defaultInlineCode = requireInlineCode();
	var markdownTable = requireMarkdownTable();
	toMarkdown_1$1 = toMarkdown;
	function toMarkdown(options) {
	  var settings = options || {};
	  var padding = settings.tableCellPadding;
	  var alignDelimiters = settings.tablePipeAlign;
	  var stringLength = settings.stringLength;
	  var around = padding ? ' ' : '|';
	  return {
	    unsafe: [
	      {character: '\r', inConstruct: 'tableCell'},
	      {character: '\n', inConstruct: 'tableCell'},
	      {atBreak: true, character: '|', after: '[\t :-]'},
	      {character: '|', inConstruct: 'tableCell'},
	      {atBreak: true, character: ':', after: '-'},
	      {atBreak: true, character: '-', after: '[:|-]'}
	    ],
	    handlers: {
	      table: handleTable,
	      tableRow: handleTableRow,
	      tableCell: handleTableCell,
	      inlineCode: inlineCodeWithTable
	    }
	  }
	  function handleTable(node, _, context) {
	    return serializeData(handleTableAsData(node, context), node.align)
	  }
	  function handleTableRow(node, _, context) {
	    var row = handleTableRowAsData(node, context);
	    var value = serializeData([row]);
	    return value.slice(0, value.indexOf('\n'))
	  }
	  function handleTableCell(node, _, context) {
	    var exit = context.enter('tableCell');
	    var value = phrasing(node, context, {before: around, after: around});
	    exit();
	    return value
	  }
	  function serializeData(matrix, align) {
	    return markdownTable(matrix, {
	      align: align,
	      alignDelimiters: alignDelimiters,
	      padding: padding,
	      stringLength: stringLength
	    })
	  }
	  function handleTableAsData(node, context) {
	    var children = node.children;
	    var index = -1;
	    var length = children.length;
	    var result = [];
	    var subexit = context.enter('table');
	    while (++index < length) {
	      result[index] = handleTableRowAsData(children[index], context);
	    }
	    subexit();
	    return result
	  }
	  function handleTableRowAsData(node, context) {
	    var children = node.children;
	    var index = -1;
	    var length = children.length;
	    var result = [];
	    var subexit = context.enter('tableRow');
	    while (++index < length) {
	      result[index] = handleTableCell(children[index], node, context);
	    }
	    subexit();
	    return result
	  }
	  function inlineCodeWithTable(node, parent, context) {
	    var value = defaultInlineCode(node, parent, context);
	    if (context.stack.indexOf('tableCell') !== -1) {
	      value = value.replace(/\|/g, '\\$&');
	    }
	    return value
	  }
	}
	return toMarkdown_1$1;
}

var toMarkdown = {};

var checkBullet_1;
var hasRequiredCheckBullet;

function requireCheckBullet () {
	if (hasRequiredCheckBullet) return checkBullet_1;
	hasRequiredCheckBullet = 1;
	checkBullet_1 = checkBullet;
	function checkBullet(context) {
	  var marker = context.options.bullet || '*';
	  if (marker !== '*' && marker !== '+' && marker !== '-') {
	    throw new Error(
	      'Cannot serialize items with `' +
	        marker +
	        '` for `options.bullet`, expected `*`, `+`, or `-`'
	    )
	  }
	  return marker
	}
	return checkBullet_1;
}

var checkListItemIndent_1;
var hasRequiredCheckListItemIndent;

function requireCheckListItemIndent () {
	if (hasRequiredCheckListItemIndent) return checkListItemIndent_1;
	hasRequiredCheckListItemIndent = 1;
	checkListItemIndent_1 = checkListItemIndent;
	function checkListItemIndent(context) {
	  var style = context.options.listItemIndent || 'tab';
	  if (style === 1 || style === '1') {
	    return 'one'
	  }
	  if (style !== 'tab' && style !== 'one' && style !== 'mixed') {
	    throw new Error(
	      'Cannot serialize items with `' +
	        style +
	        '` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`'
	    )
	  }
	  return style
	}
	return checkListItemIndent_1;
}

var containerFlow;
var hasRequiredContainerFlow;

function requireContainerFlow () {
	if (hasRequiredContainerFlow) return containerFlow;
	hasRequiredContainerFlow = 1;
	containerFlow = flow;
	var repeat = requireRepeatString();
	function flow(parent, context) {
	  var children = parent.children || [];
	  var results = [];
	  var index = -1;
	  var child;
	  while (++index < children.length) {
	    child = children[index];
	    results.push(
	      context.handle(child, parent, context, {before: '\n', after: '\n'})
	    );
	    if (index + 1 < children.length) {
	      results.push(between(child, children[index + 1]));
	    }
	  }
	  return results.join('')
	  function between(left, right) {
	    var index = -1;
	    var result;
	    while (++index < context.join.length) {
	      result = context.join[index](left, right, parent, context);
	      if (result === true || result === 1) {
	        break
	      }
	      if (typeof result === 'number') {
	        return repeat('\n', 1 + Number(result))
	      }
	      if (result === false) {
	        return '\n\n<!---->\n\n'
	      }
	    }
	    return '\n\n'
	  }
	}
	return containerFlow;
}

var indentLines_1;
var hasRequiredIndentLines;

function requireIndentLines () {
	if (hasRequiredIndentLines) return indentLines_1;
	hasRequiredIndentLines = 1;
	indentLines_1 = indentLines;
	var eol = /\r?\n|\r/g;
	function indentLines(value, map) {
	  var result = [];
	  var start = 0;
	  var line = 0;
	  var match;
	  while ((match = eol.exec(value))) {
	    one(value.slice(start, match.index));
	    result.push(match[0]);
	    start = match.index + match[0].length;
	    line++;
	  }
	  one(value.slice(start));
	  return result.join('')
	  function one(value) {
	    result.push(map(value, line, !value));
	  }
	}
	return indentLines_1;
}

var listItem_1;
var hasRequiredListItem;

function requireListItem () {
	if (hasRequiredListItem) return listItem_1;
	hasRequiredListItem = 1;
	listItem_1 = listItem;
	var repeat = requireRepeatString();
	var checkBullet = requireCheckBullet();
	var checkListItemIndent = requireCheckListItemIndent();
	var flow = requireContainerFlow();
	var indentLines = requireIndentLines();
	function listItem(node, parent, context) {
	  var bullet = checkBullet(context);
	  var listItemIndent = checkListItemIndent(context);
	  var size;
	  var value;
	  var exit;
	  if (parent && parent.ordered) {
	    bullet =
	      (parent.start > -1 ? parent.start : 1) +
	      (context.options.incrementListMarker === false
	        ? 0
	        : parent.children.indexOf(node)) +
	      '.';
	  }
	  size = bullet.length + 1;
	  if (
	    listItemIndent === 'tab' ||
	    (listItemIndent === 'mixed' && ((parent && parent.spread) || node.spread))
	  ) {
	    size = Math.ceil(size / 4) * 4;
	  }
	  exit = context.enter('listItem');
	  value = indentLines(flow(node, context), map);
	  exit();
	  return value
	  function map(line, index, blank) {
	    if (index) {
	      return (blank ? '' : repeat(' ', size)) + line
	    }
	    return (blank ? bullet : bullet + repeat(' ', size - bullet.length)) + line
	  }
	}
	return listItem_1;
}

var hasRequiredToMarkdown$1;

function requireToMarkdown$1 () {
	if (hasRequiredToMarkdown$1) return toMarkdown;
	hasRequiredToMarkdown$1 = 1;
	var defaultListItem = requireListItem();
	toMarkdown.unsafe = [{atBreak: true, character: '-', after: '[:|-]'}];
	toMarkdown.handlers = {
	  listItem: listItemWithTaskListItem
	};
	function listItemWithTaskListItem(node, parent, context) {
	  var value = defaultListItem(node, parent, context);
	  var head = node.children[0];
	  if (typeof node.checked === 'boolean' && head && head.type === 'paragraph') {
	    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	  }
	  return value
	  function check($0) {
	    return $0 + '[' + (node.checked ? 'x' : ' ') + '] '
	  }
	}
	return toMarkdown;
}

var configure_1;
var hasRequiredConfigure;

function requireConfigure () {
	if (hasRequiredConfigure) return configure_1;
	hasRequiredConfigure = 1;
	configure_1 = configure;
	function configure(base, extension) {
	  var index = -1;
	  var key;
	  if (extension.extensions) {
	    while (++index < extension.extensions.length) {
	      configure(base, extension.extensions[index]);
	    }
	  }
	  for (key in extension) {
	    if (key === 'extensions') ; else if (key === 'unsafe' || key === 'join') {
	      base[key] = base[key].concat(extension[key] || []);
	    } else if (key === 'handlers') {
	      base[key] = Object.assign(base[key], extension[key] || {});
	    } else {
	      base.options[key] = extension[key];
	    }
	  }
	  return base
	}
	return configure_1;
}

var toMarkdown_1;
var hasRequiredToMarkdown;

function requireToMarkdown () {
	if (hasRequiredToMarkdown) return toMarkdown_1;
	hasRequiredToMarkdown = 1;
	var autolinkLiteral = requireToMarkdown$4();
	var strikethrough = requireToMarkdown$3();
	var table = requireToMarkdown$2();
	var taskListItem = requireToMarkdown$1();
	var configure = requireConfigure();
	toMarkdown_1 = toMarkdown;
	function toMarkdown(options) {
	  var config = configure(
	    {handlers: {}, join: [], unsafe: [], options: {}},
	    {
	      extensions: [autolinkLiteral, strikethrough, table(options), taskListItem]
	    }
	  );
	  return Object.assign(config.options, {
	    handlers: config.handlers,
	    join: config.join,
	    unsafe: config.unsafe
	  })
	}
	return toMarkdown_1;
}

var remarkGfm;
var hasRequiredRemarkGfm;

function requireRemarkGfm () {
	if (hasRequiredRemarkGfm) return remarkGfm;
	hasRequiredRemarkGfm = 1;
	var syntax = requireMicromarkExtensionGfm();
	var fromMarkdown = requireFromMarkdown();
	var toMarkdown = requireToMarkdown();
	var warningIssued;
	remarkGfm = gfm;
	function gfm(options) {
	  var data = this.data();
	  if (
	    !warningIssued &&
	    ((this.Parser &&
	      this.Parser.prototype &&
	      this.Parser.prototype.blockTokenizers) ||
	      (this.Compiler &&
	        this.Compiler.prototype &&
	        this.Compiler.prototype.visitors))
	  ) {
	    warningIssued = true;
	    console.warn(
	      '[remark-gfm] Warning: please upgrade to remark 13 to use this plugin'
	    );
	  }
	  add('micromarkExtensions', syntax(options));
	  add('fromMarkdownExtensions', fromMarkdown);
	  add('toMarkdownExtensions', toMarkdown(options));
	  function add(field, value) {
	    if (data[field]) data[field].push(value);
	    else data[field] = [value];
	  }
	}
	return remarkGfm;
}

var mdastUtilToString;
var hasRequiredMdastUtilToString;

function requireMdastUtilToString () {
	if (hasRequiredMdastUtilToString) return mdastUtilToString;
	hasRequiredMdastUtilToString = 1;
	mdastUtilToString = toString;
	function toString(node) {
	  return (
	    (node &&
	      (node.value ||
	        node.alt ||
	        node.title ||
	        ('children' in node && all(node.children)) ||
	        ('length' in node && all(node)))) ||
	    ''
	  )
	}
	function all(values) {
	  var result = [];
	  var index = -1;
	  while (++index < values.length) {
	    result[index] = toString(values[index]);
	  }
	  return result.join('')
	}
	return mdastUtilToString;
}

var normalizeIdentifier_1;
var hasRequiredNormalizeIdentifier;

function requireNormalizeIdentifier () {
	if (hasRequiredNormalizeIdentifier) return normalizeIdentifier_1;
	hasRequiredNormalizeIdentifier = 1;
	function normalizeIdentifier(value) {
	  return (
	    value
	      .replace(/[\t\n\r ]+/g, ' ')
	      .replace(/^ | $/g, '')
	      .toLowerCase()
	      .toUpperCase()
	  )
	}
	normalizeIdentifier_1 = normalizeIdentifier;
	return normalizeIdentifier_1;
}

var safeFromInt_1;
var hasRequiredSafeFromInt;

function requireSafeFromInt () {
	if (hasRequiredSafeFromInt) return safeFromInt_1;
	hasRequiredSafeFromInt = 1;
	var fromCharCode = requireFromCharCode();
	function safeFromInt(value, base) {
	  var code = parseInt(value, base);
	  if (
	    code < 9 ||
	    code === 11 ||
	    (code > 13 && code < 32) ||
	    (code > 126 && code < 160) ||
	    (code > 55295 && code < 57344) ||
	    (code > 64975 && code < 65008) ||
	    (code & 65535) === 65535 ||
	    (code & 65535) === 65534 ||
	    code > 1114111
	  ) {
	    return '\uFFFD'
	  }
	  return fromCharCode(code)
	}
	safeFromInt_1 = safeFromInt;
	return safeFromInt_1;
}

var content = {};

var hasRequiredContent$1;

function requireContent$1 () {
	if (hasRequiredContent$1) return content;
	hasRequiredContent$1 = 1;
	Object.defineProperty(content, '__esModule', {value: true});
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var tokenize = initializeContent;
	function initializeContent(effects) {
	  var contentStart = effects.attempt(
	    this.parser.constructs.contentInitial,
	    afterContentStartConstruct,
	    paragraphInitial
	  );
	  var previous;
	  return contentStart
	  function afterContentStartConstruct(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, contentStart, 'linePrefix')
	  }
	  function paragraphInitial(code) {
	    effects.enter('paragraph');
	    return lineStart(code)
	  }
	  function lineStart(code) {
	    var token = effects.enter('chunkText', {
	      contentType: 'text',
	      previous: previous
	    });
	    if (previous) {
	      previous.next = token;
	    }
	    previous = token;
	    return data(code)
	  }
	  function data(code) {
	    if (code === null) {
	      effects.exit('chunkText');
	      effects.exit('paragraph');
	      effects.consume(code);
	      return
	    }
	    if (markdownLineEnding(code)) {
	      effects.consume(code);
	      effects.exit('chunkText');
	      return lineStart
	    }
	    effects.consume(code);
	    return data
	  }
	}
	content.tokenize = tokenize;
	return content;
}

var document$1 = {};

var partialBlankLine_1;
var hasRequiredPartialBlankLine;

function requirePartialBlankLine () {
	if (hasRequiredPartialBlankLine) return partialBlankLine_1;
	hasRequiredPartialBlankLine = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = {
	  tokenize: tokenizePartialBlankLine,
	  partial: true
	};
	function tokenizePartialBlankLine(effects, ok, nok) {
	  return factorySpace(effects, afterWhitespace, 'linePrefix')
	  function afterWhitespace(code) {
	    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
	  }
	}
	partialBlankLine_1 = partialBlankLine;
	return partialBlankLine_1;
}

var hasRequiredDocument;

function requireDocument () {
	if (hasRequiredDocument) return document$1;
	hasRequiredDocument = 1;
	Object.defineProperty(document$1, '__esModule', {value: true});
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var tokenize = initializeDocument;
	var containerConstruct = {
	  tokenize: tokenizeContainer
	};
	var lazyFlowConstruct = {
	  tokenize: tokenizeLazyFlow
	};
	function initializeDocument(effects) {
	  var self = this;
	  var stack = [];
	  var continued = 0;
	  var inspectConstruct = {
	    tokenize: tokenizeInspect,
	    partial: true
	  };
	  var inspectResult;
	  var childFlow;
	  var childToken;
	  return start
	  function start(code) {
	    if (continued < stack.length) {
	      self.containerState = stack[continued][1];
	      return effects.attempt(
	        stack[continued][0].continuation,
	        documentContinue,
	        documentContinued
	      )(code)
	    }
	    return documentContinued(code)
	  }
	  function documentContinue(code) {
	    continued++;
	    return start(code)
	  }
	  function documentContinued(code) {
	    if (inspectResult && inspectResult.flowContinue) {
	      return flowStart(code)
	    }
	    self.interrupt =
	      childFlow &&
	      childFlow.currentConstruct &&
	      childFlow.currentConstruct.interruptible;
	    self.containerState = {};
	    return effects.attempt(
	      containerConstruct,
	      containerContinue,
	      flowStart
	    )(code)
	  }
	  function containerContinue(code) {
	    stack.push([self.currentConstruct, self.containerState]);
	    self.containerState = undefined;
	    return documentContinued(code)
	  }
	  function flowStart(code) {
	    if (code === null) {
	      exitContainers(0, true);
	      effects.consume(code);
	      return
	    }
	    childFlow = childFlow || self.parser.flow(self.now());
	    effects.enter('chunkFlow', {
	      contentType: 'flow',
	      previous: childToken,
	      _tokenizer: childFlow
	    });
	    return flowContinue(code)
	  }
	  function flowContinue(code) {
	    if (code === null) {
	      continueFlow(effects.exit('chunkFlow'));
	      return flowStart(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.consume(code);
	      continueFlow(effects.exit('chunkFlow'));
	      return effects.check(inspectConstruct, documentAfterPeek)
	    }
	    effects.consume(code);
	    return flowContinue
	  }
	  function documentAfterPeek(code) {
	    exitContainers(
	      inspectResult.continued,
	      inspectResult && inspectResult.flowEnd
	    );
	    continued = 0;
	    return start(code)
	  }
	  function continueFlow(token) {
	    if (childToken) childToken.next = token;
	    childToken = token;
	    childFlow.lazy = inspectResult && inspectResult.lazy;
	    childFlow.defineSkip(token.start);
	    childFlow.write(self.sliceStream(token));
	  }
	  function exitContainers(size, end) {
	    var index = stack.length;
	    if (childFlow && end) {
	      childFlow.write([null]);
	      childToken = childFlow = undefined;
	    }
	    while (index-- > size) {
	      self.containerState = stack[index][1];
	      stack[index][0].exit.call(self, effects);
	    }
	    stack.length = size;
	  }
	  function tokenizeInspect(effects, ok) {
	    var subcontinued = 0;
	    inspectResult = {};
	    return inspectStart
	    function inspectStart(code) {
	      if (subcontinued < stack.length) {
	        self.containerState = stack[subcontinued][1];
	        return effects.attempt(
	          stack[subcontinued][0].continuation,
	          inspectContinue,
	          inspectLess
	        )(code)
	      }
	      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
	        inspectResult.flowContinue = true;
	        return inspectDone(code)
	      }
	      self.interrupt =
	        childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
	      self.containerState = {};
	      return effects.attempt(
	        containerConstruct,
	        inspectFlowEnd,
	        inspectDone
	      )(code)
	    }
	    function inspectContinue(code) {
	      subcontinued++;
	      return self.containerState._closeFlow
	        ? inspectFlowEnd(code)
	        : inspectStart(code)
	    }
	    function inspectLess(code) {
	      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
	        self.containerState = {};
	        return effects.attempt(
	          containerConstruct,
	          inspectFlowEnd,
	          effects.attempt(
	            lazyFlowConstruct,
	            inspectFlowEnd,
	            effects.check(partialBlankLine, inspectFlowEnd, inspectLazy)
	          )
	        )(code)
	      }
	      return inspectFlowEnd(code)
	    }
	    function inspectLazy(code) {
	      subcontinued = stack.length;
	      inspectResult.lazy = true;
	      inspectResult.flowContinue = true;
	      return inspectDone(code)
	    }
	    function inspectFlowEnd(code) {
	      inspectResult.flowEnd = true;
	      return inspectDone(code)
	    }
	    function inspectDone(code) {
	      inspectResult.continued = subcontinued;
	      self.interrupt = self.containerState = undefined;
	      return ok(code)
	    }
	  }
	}
	function tokenizeContainer(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.attempt(this.parser.constructs.document, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	function tokenizeLazyFlow(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.lazy(this.parser.constructs.flow, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	document$1.tokenize = tokenize;
	return document$1;
}

var flow = {};

var subtokenize_1;
var hasRequiredSubtokenize;

function requireSubtokenize () {
	if (hasRequiredSubtokenize) return subtokenize_1;
	hasRequiredSubtokenize = 1;
	var assign = requireAssign();
	var chunkedSplice = requireChunkedSplice();
	var shallow = requireShallow();
	function subtokenize(events) {
	  var jumps = {};
	  var index = -1;
	  var event;
	  var lineIndex;
	  var otherIndex;
	  var otherEvent;
	  var parameters;
	  var subevents;
	  var more;
	  while (++index < events.length) {
	    while (index in jumps) {
	      index = jumps[index];
	    }
	    event = events[index];
	    if (
	      index &&
	      event[1].type === 'chunkFlow' &&
	      events[index - 1][1].type === 'listItemPrefix'
	    ) {
	      subevents = event[1]._tokenizer.events;
	      otherIndex = 0;
	      if (
	        otherIndex < subevents.length &&
	        subevents[otherIndex][1].type === 'lineEndingBlank'
	      ) {
	        otherIndex += 2;
	      }
	      if (
	        otherIndex < subevents.length &&
	        subevents[otherIndex][1].type === 'content'
	      ) {
	        while (++otherIndex < subevents.length) {
	          if (subevents[otherIndex][1].type === 'content') {
	            break
	          }
	          if (subevents[otherIndex][1].type === 'chunkText') {
	            subevents[otherIndex][1].isInFirstContentOfListItem = true;
	            otherIndex++;
	          }
	        }
	      }
	    }
	    if (event[0] === 'enter') {
	      if (event[1].contentType) {
	        assign(jumps, subcontent(events, index));
	        index = jumps[index];
	        more = true;
	      }
	    }
	    else if (event[1]._container || event[1]._movePreviousLineEndings) {
	      otherIndex = index;
	      lineIndex = undefined;
	      while (otherIndex--) {
	        otherEvent = events[otherIndex];
	        if (
	          otherEvent[1].type === 'lineEnding' ||
	          otherEvent[1].type === 'lineEndingBlank'
	        ) {
	          if (otherEvent[0] === 'enter') {
	            if (lineIndex) {
	              events[lineIndex][1].type = 'lineEndingBlank';
	            }
	            otherEvent[1].type = 'lineEnding';
	            lineIndex = otherIndex;
	          }
	        } else {
	          break
	        }
	      }
	      if (lineIndex) {
	        event[1].end = shallow(events[lineIndex][1].start);
	        parameters = events.slice(lineIndex, index);
	        parameters.unshift(event);
	        chunkedSplice(events, lineIndex, index - lineIndex + 1, parameters);
	      }
	    }
	  }
	  return !more
	}
	function subcontent(events, eventIndex) {
	  var token = events[eventIndex][1];
	  var context = events[eventIndex][2];
	  var startPosition = eventIndex - 1;
	  var startPositions = [];
	  var tokenizer =
	    token._tokenizer || context.parser[token.contentType](token.start);
	  var childEvents = tokenizer.events;
	  var jumps = [];
	  var gaps = {};
	  var stream;
	  var previous;
	  var index;
	  var entered;
	  var end;
	  var adjust;
	  while (token) {
	    while (events[++startPosition][1] !== token) {
	    }
	    startPositions.push(startPosition);
	    if (!token._tokenizer) {
	      stream = context.sliceStream(token);
	      if (!token.next) {
	        stream.push(null);
	      }
	      if (previous) {
	        tokenizer.defineSkip(token.start);
	      }
	      if (token.isInFirstContentOfListItem) {
	        tokenizer._gfmTasklistFirstContentOfListItem = true;
	      }
	      tokenizer.write(stream);
	      if (token.isInFirstContentOfListItem) {
	        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
	      }
	    }
	    previous = token;
	    token = token.next;
	  }
	  token = previous;
	  index = childEvents.length;
	  while (index--) {
	    if (childEvents[index][0] === 'enter') {
	      entered = true;
	    } else if (
	      entered &&
	      childEvents[index][1].type === childEvents[index - 1][1].type &&
	      childEvents[index][1].start.line !== childEvents[index][1].end.line
	    ) {
	      add(childEvents.slice(index + 1, end));
	      token._tokenizer = token.next = undefined;
	      token = token.previous;
	      end = index + 1;
	    }
	  }
	  tokenizer.events = token._tokenizer = token.next = undefined;
	  add(childEvents.slice(0, end));
	  index = -1;
	  adjust = 0;
	  while (++index < jumps.length) {
	    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
	    adjust += jumps[index][1] - jumps[index][0] - 1;
	  }
	  return gaps
	  function add(slice) {
	    var start = startPositions.pop();
	    jumps.unshift([start, start + slice.length - 1]);
	    chunkedSplice(events, start, 2, slice);
	  }
	}
	subtokenize_1 = subtokenize;
	return subtokenize_1;
}

var content_1;
var hasRequiredContent;

function requireContent () {
	if (hasRequiredContent) return content_1;
	hasRequiredContent = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var prefixSize = requirePrefixSize();
	var subtokenize = requireSubtokenize();
	var factorySpace = requireFactorySpace();
	var content = {
	  tokenize: tokenizeContent,
	  resolve: resolveContent,
	  interruptible: true,
	  lazy: true
	};
	var continuationConstruct = {
	  tokenize: tokenizeContinuation,
	  partial: true
	};
	function resolveContent(events) {
	  subtokenize(events);
	  return events
	}
	function tokenizeContent(effects, ok) {
	  var previous;
	  return start
	  function start(code) {
	    effects.enter('content');
	    previous = effects.enter('chunkContent', {
	      contentType: 'content'
	    });
	    return data(code)
	  }
	  function data(code) {
	    if (code === null) {
	      return contentEnd(code)
	    }
	    if (markdownLineEnding(code)) {
	      return effects.check(
	        continuationConstruct,
	        contentContinue,
	        contentEnd
	      )(code)
	    }
	    effects.consume(code);
	    return data
	  }
	  function contentEnd(code) {
	    effects.exit('chunkContent');
	    effects.exit('content');
	    return ok(code)
	  }
	  function contentContinue(code) {
	    effects.consume(code);
	    effects.exit('chunkContent');
	    previous = previous.next = effects.enter('chunkContent', {
	      contentType: 'content',
	      previous: previous
	    });
	    return data
	  }
	}
	function tokenizeContinuation(effects, ok, nok) {
	  var self = this;
	  return startLookahead
	  function startLookahead(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, prefixed, 'linePrefix')
	  }
	  function prefixed(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    if (
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
	      prefixSize(self.events, 'linePrefix') < 4
	    ) {
	      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
	    }
	    return ok(code)
	  }
	}
	content_1 = content;
	return content_1;
}

var hasRequiredFlow;

function requireFlow () {
	if (hasRequiredFlow) return flow;
	hasRequiredFlow = 1;
	Object.defineProperty(flow, '__esModule', {value: true});
	var content = requireContent();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var tokenize = initializeFlow;
	function initializeFlow(effects) {
	  var self = this;
	  var initial = effects.attempt(
	    partialBlankLine,
	    atBlankEnding,
	    effects.attempt(
	      this.parser.constructs.flowInitial,
	      afterConstruct,
	      factorySpace(
	        effects,
	        effects.attempt(
	          this.parser.constructs.flow,
	          afterConstruct,
	          effects.attempt(content, afterConstruct)
	        ),
	        'linePrefix'
	      )
	    )
	  );
	  return initial
	  function atBlankEnding(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEndingBlank');
	    effects.consume(code);
	    effects.exit('lineEndingBlank');
	    self.currentConstruct = undefined;
	    return initial
	  }
	  function afterConstruct(code) {
	    if (code === null) {
	      effects.consume(code);
	      return
	    }
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    self.currentConstruct = undefined;
	    return initial
	  }
	}
	flow.tokenize = tokenize;
	return flow;
}

var text = {};

var hasRequiredText$1;

function requireText$1 () {
	if (hasRequiredText$1) return text;
	hasRequiredText$1 = 1;
	Object.defineProperty(text, '__esModule', {value: true});
	var assign = requireAssign();
	var shallow = requireShallow();
	var text$1 = initializeFactory('text');
	var string = initializeFactory('string');
	var resolver = {
	  resolveAll: createResolver()
	};
	function initializeFactory(field) {
	  return {
	    tokenize: initializeText,
	    resolveAll: createResolver(
	      field === 'text' ? resolveAllLineSuffixes : undefined
	    )
	  }
	  function initializeText(effects) {
	    var self = this;
	    var constructs = this.parser.constructs[field];
	    var text = effects.attempt(constructs, start, notText);
	    return start
	    function start(code) {
	      return atBreak(code) ? text(code) : notText(code)
	    }
	    function notText(code) {
	      if (code === null) {
	        effects.consume(code);
	        return
	      }
	      effects.enter('data');
	      effects.consume(code);
	      return data
	    }
	    function data(code) {
	      if (atBreak(code)) {
	        effects.exit('data');
	        return text(code)
	      }
	      effects.consume(code);
	      return data
	    }
	    function atBreak(code) {
	      var list = constructs[code];
	      var index = -1;
	      if (code === null) {
	        return true
	      }
	      if (list) {
	        while (++index < list.length) {
	          if (
	            !list[index].previous ||
	            list[index].previous.call(self, self.previous)
	          ) {
	            return true
	          }
	        }
	      }
	    }
	  }
	}
	function createResolver(extraResolver) {
	  return resolveAllText
	  function resolveAllText(events, context) {
	    var index = -1;
	    var enter;
	    while (++index <= events.length) {
	      if (enter === undefined) {
	        if (events[index] && events[index][1].type === 'data') {
	          enter = index;
	          index++;
	        }
	      } else if (!events[index] || events[index][1].type !== 'data') {
	        if (index !== enter + 2) {
	          events[enter][1].end = events[index - 1][1].end;
	          events.splice(enter + 2, index - enter - 2);
	          index = enter + 2;
	        }
	        enter = undefined;
	      }
	    }
	    return extraResolver ? extraResolver(events, context) : events
	  }
	}
	function resolveAllLineSuffixes(events, context) {
	  var eventIndex = -1;
	  var chunks;
	  var data;
	  var chunk;
	  var index;
	  var bufferIndex;
	  var size;
	  var tabs;
	  var token;
	  while (++eventIndex <= events.length) {
	    if (
	      (eventIndex === events.length ||
	        events[eventIndex][1].type === 'lineEnding') &&
	      events[eventIndex - 1][1].type === 'data'
	    ) {
	      data = events[eventIndex - 1][1];
	      chunks = context.sliceStream(data);
	      index = chunks.length;
	      bufferIndex = -1;
	      size = 0;
	      tabs = undefined;
	      while (index--) {
	        chunk = chunks[index];
	        if (typeof chunk === 'string') {
	          bufferIndex = chunk.length;
	          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
	            size++;
	            bufferIndex--;
	          }
	          if (bufferIndex) break
	          bufferIndex = -1;
	        }
	        else if (chunk === -2) {
	          tabs = true;
	          size++;
	        } else if (chunk === -1);
	        else {
	          index++;
	          break
	        }
	      }
	      if (size) {
	        token = {
	          type:
	            eventIndex === events.length || tabs || size < 2
	              ? 'lineSuffix'
	              : 'hardBreakTrailing',
	          start: {
	            line: data.end.line,
	            column: data.end.column - size,
	            offset: data.end.offset - size,
	            _index: data.start._index + index,
	            _bufferIndex: index
	              ? bufferIndex
	              : data.start._bufferIndex + bufferIndex
	          },
	          end: shallow(data.end)
	        };
	        data.end = shallow(token.start);
	        if (data.start.offset === data.end.offset) {
	          assign(data, token);
	        } else {
	          events.splice(
	            eventIndex,
	            0,
	            ['enter', token, context],
	            ['exit', token, context]
	          );
	          eventIndex += 2;
	        }
	      }
	      eventIndex++;
	    }
	  }
	  return events
	}
	text.resolver = resolver;
	text.string = string;
	text.text = text$1;
	return text;
}

var chunkedPush_1;
var hasRequiredChunkedPush;

function requireChunkedPush () {
	if (hasRequiredChunkedPush) return chunkedPush_1;
	hasRequiredChunkedPush = 1;
	var chunkedSplice = requireChunkedSplice();
	function chunkedPush(list, items) {
	  if (list.length) {
	    chunkedSplice(list, list.length, 0, items);
	    return list
	  }
	  return items
	}
	chunkedPush_1 = chunkedPush;
	return chunkedPush_1;
}

var serializeChunks_1;
var hasRequiredSerializeChunks;

function requireSerializeChunks () {
	if (hasRequiredSerializeChunks) return serializeChunks_1;
	hasRequiredSerializeChunks = 1;
	var fromCharCode = requireFromCharCode();
	function serializeChunks(chunks) {
	  var index = -1;
	  var result = [];
	  var chunk;
	  var value;
	  var atTab;
	  while (++index < chunks.length) {
	    chunk = chunks[index];
	    if (typeof chunk === 'string') {
	      value = chunk;
	    } else if (chunk === -5) {
	      value = '\r';
	    } else if (chunk === -4) {
	      value = '\n';
	    } else if (chunk === -3) {
	      value = '\r' + '\n';
	    } else if (chunk === -2) {
	      value = '\t';
	    } else if (chunk === -1) {
	      if (atTab) continue
	      value = ' ';
	    } else {
	      value = fromCharCode(chunk);
	    }
	    atTab = chunk === -2;
	    result.push(value);
	  }
	  return result.join('')
	}
	serializeChunks_1 = serializeChunks;
	return serializeChunks_1;
}

var sliceChunks_1;
var hasRequiredSliceChunks;

function requireSliceChunks () {
	if (hasRequiredSliceChunks) return sliceChunks_1;
	hasRequiredSliceChunks = 1;
	function sliceChunks(chunks, token) {
	  var startIndex = token.start._index;
	  var startBufferIndex = token.start._bufferIndex;
	  var endIndex = token.end._index;
	  var endBufferIndex = token.end._bufferIndex;
	  var view;
	  if (startIndex === endIndex) {
	    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	  } else {
	    view = chunks.slice(startIndex, endIndex);
	    if (startBufferIndex > -1) {
	      view[0] = view[0].slice(startBufferIndex);
	    }
	    if (endBufferIndex > 0) {
	      view.push(chunks[endIndex].slice(0, endBufferIndex));
	    }
	  }
	  return view
	}
	sliceChunks_1 = sliceChunks;
	return sliceChunks_1;
}

var createTokenizer_1;
var hasRequiredCreateTokenizer;

function requireCreateTokenizer () {
	if (hasRequiredCreateTokenizer) return createTokenizer_1;
	hasRequiredCreateTokenizer = 1;
	var assign = requireAssign();
	var markdownLineEnding = requireMarkdownLineEnding();
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var miniflat = requireMiniflat();
	var resolveAll = requireResolveAll();
	var serializeChunks = requireSerializeChunks();
	var shallow = requireShallow();
	var sliceChunks = requireSliceChunks();
	function createTokenizer(parser, initialize, from) {
	  var point = from
	    ? shallow(from)
	    : {
	        line: 1,
	        column: 1,
	        offset: 0
	      };
	  var columnStart = {};
	  var resolveAllConstructs = [];
	  var chunks = [];
	  var stack = [];
	  var effects = {
	    consume: consume,
	    enter: enter,
	    exit: exit,
	    attempt: constructFactory(onsuccessfulconstruct),
	    check: constructFactory(onsuccessfulcheck),
	    interrupt: constructFactory(onsuccessfulcheck, {
	      interrupt: true
	    }),
	    lazy: constructFactory(onsuccessfulcheck, {
	      lazy: true
	    })
	  };
	  var context = {
	    previous: null,
	    events: [],
	    parser: parser,
	    sliceStream: sliceStream,
	    sliceSerialize: sliceSerialize,
	    now: now,
	    defineSkip: skip,
	    write: write
	  };
	  var state = initialize.tokenize.call(context, effects);
	  if (initialize.resolveAll) {
	    resolveAllConstructs.push(initialize);
	  }
	  point._index = 0;
	  point._bufferIndex = -1;
	  return context
	  function write(slice) {
	    chunks = chunkedPush(chunks, slice);
	    main();
	    if (chunks[chunks.length - 1] !== null) {
	      return []
	    }
	    addResult(initialize, 0);
	    context.events = resolveAll(resolveAllConstructs, context.events, context);
	    return context.events
	  }
	  function sliceSerialize(token) {
	    return serializeChunks(sliceStream(token))
	  }
	  function sliceStream(token) {
	    return sliceChunks(chunks, token)
	  }
	  function now() {
	    return shallow(point)
	  }
	  function skip(value) {
	    columnStart[value.line] = value.column;
	    accountForPotentialSkip();
	  }
	  function main() {
	    var chunkIndex;
	    var chunk;
	    while (point._index < chunks.length) {
	      chunk = chunks[point._index];
	      if (typeof chunk === 'string') {
	        chunkIndex = point._index;
	        if (point._bufferIndex < 0) {
	          point._bufferIndex = 0;
	        }
	        while (
	          point._index === chunkIndex &&
	          point._bufferIndex < chunk.length
	        ) {
	          go(chunk.charCodeAt(point._bufferIndex));
	        }
	      } else {
	        go(chunk);
	      }
	    }
	  }
	  function go(code) {
	    state = state(code);
	  }
	  function consume(code) {
	    if (markdownLineEnding(code)) {
	      point.line++;
	      point.column = 1;
	      point.offset += code === -3 ? 2 : 1;
	      accountForPotentialSkip();
	    } else if (code !== -1) {
	      point.column++;
	      point.offset++;
	    }
	    if (point._bufferIndex < 0) {
	      point._index++;
	    } else {
	      point._bufferIndex++;
	      if (point._bufferIndex === chunks[point._index].length) {
	        point._bufferIndex = -1;
	        point._index++;
	      }
	    }
	    context.previous = code;
	  }
	  function enter(type, fields) {
	    var token = fields || {};
	    token.type = type;
	    token.start = now();
	    context.events.push(['enter', token, context]);
	    stack.push(token);
	    return token
	  }
	  function exit(type) {
	    var token = stack.pop();
	    token.end = now();
	    context.events.push(['exit', token, context]);
	    return token
	  }
	  function onsuccessfulconstruct(construct, info) {
	    addResult(construct, info.from);
	  }
	  function onsuccessfulcheck(construct, info) {
	    info.restore();
	  }
	  function constructFactory(onreturn, fields) {
	    return hook
	    function hook(constructs, returnState, bogusState) {
	      var listOfConstructs;
	      var constructIndex;
	      var currentConstruct;
	      var info;
	      return constructs.tokenize || 'length' in constructs
	        ? handleListOfConstructs(miniflat(constructs))
	        : handleMapOfConstructs
	      function handleMapOfConstructs(code) {
	        if (code in constructs || null in constructs) {
	          return handleListOfConstructs(
	            constructs.null
	              ?
	                miniflat(constructs[code]).concat(miniflat(constructs.null))
	              : constructs[code]
	          )(code)
	        }
	        return bogusState(code)
	      }
	      function handleListOfConstructs(list) {
	        listOfConstructs = list;
	        constructIndex = 0;
	        return handleConstruct(list[constructIndex])
	      }
	      function handleConstruct(construct) {
	        return start
	        function start(code) {
	          info = store();
	          currentConstruct = construct;
	          if (!construct.partial) {
	            context.currentConstruct = construct;
	          }
	          if (
	            construct.name &&
	            context.parser.constructs.disable.null.indexOf(construct.name) > -1
	          ) {
	            return nok()
	          }
	          return construct.tokenize.call(
	            fields ? assign({}, context, fields) : context,
	            effects,
	            ok,
	            nok
	          )(code)
	        }
	      }
	      function ok(code) {
	        onreturn(currentConstruct, info);
	        return returnState
	      }
	      function nok(code) {
	        info.restore();
	        if (++constructIndex < listOfConstructs.length) {
	          return handleConstruct(listOfConstructs[constructIndex])
	        }
	        return bogusState
	      }
	    }
	  }
	  function addResult(construct, from) {
	    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
	      resolveAllConstructs.push(construct);
	    }
	    if (construct.resolve) {
	      chunkedSplice(
	        context.events,
	        from,
	        context.events.length - from,
	        construct.resolve(context.events.slice(from), context)
	      );
	    }
	    if (construct.resolveTo) {
	      context.events = construct.resolveTo(context.events, context);
	    }
	  }
	  function store() {
	    var startPoint = now();
	    var startPrevious = context.previous;
	    var startCurrentConstruct = context.currentConstruct;
	    var startEventsIndex = context.events.length;
	    var startStack = Array.from(stack);
	    return {
	      restore: restore,
	      from: startEventsIndex
	    }
	    function restore() {
	      point = startPoint;
	      context.previous = startPrevious;
	      context.currentConstruct = startCurrentConstruct;
	      context.events.length = startEventsIndex;
	      stack = startStack;
	      accountForPotentialSkip();
	    }
	  }
	  function accountForPotentialSkip() {
	    if (point.line in columnStart && point.column < 2) {
	      point.column = columnStart[point.line];
	      point.offset += columnStart[point.line] - 1;
	    }
	  }
	}
	createTokenizer_1 = createTokenizer;
	return createTokenizer_1;
}

var constructs = {};

var movePoint_1;
var hasRequiredMovePoint;

function requireMovePoint () {
	if (hasRequiredMovePoint) return movePoint_1;
	hasRequiredMovePoint = 1;
	function movePoint(point, offset) {
	  point.column += offset;
	  point.offset += offset;
	  point._bufferIndex += offset;
	  return point
	}
	movePoint_1 = movePoint;
	return movePoint_1;
}

var attention_1;
var hasRequiredAttention;

function requireAttention () {
	if (hasRequiredAttention) return attention_1;
	hasRequiredAttention = 1;
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var classifyCharacter = requireClassifyCharacter();
	var movePoint = requireMovePoint();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	var attention = {
	  name: 'attention',
	  tokenize: tokenizeAttention,
	  resolveAll: resolveAllAttention
	};
	function resolveAllAttention(events, context) {
	  var index = -1;
	  var open;
	  var group;
	  var text;
	  var openingSequence;
	  var closingSequence;
	  var use;
	  var nextEvents;
	  var offset;
	  while (++index < events.length) {
	    if (
	      events[index][0] === 'enter' &&
	      events[index][1].type === 'attentionSequence' &&
	      events[index][1]._close
	    ) {
	      open = index;
	      while (open--) {
	        if (
	          events[open][0] === 'exit' &&
	          events[open][1].type === 'attentionSequence' &&
	          events[open][1]._open &&
	          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
	            context.sliceSerialize(events[index][1]).charCodeAt(0)
	        ) {
	          if (
	            (events[open][1]._close || events[index][1]._open) &&
	            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
	            !(
	              (events[open][1].end.offset -
	                events[open][1].start.offset +
	                events[index][1].end.offset -
	                events[index][1].start.offset) %
	              3
	            )
	          ) {
	            continue
	          }
	          use =
	            events[open][1].end.offset - events[open][1].start.offset > 1 &&
	            events[index][1].end.offset - events[index][1].start.offset > 1
	              ? 2
	              : 1;
	          openingSequence = {
	            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
	            start: movePoint(shallow(events[open][1].end), -use),
	            end: shallow(events[open][1].end)
	          };
	          closingSequence = {
	            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
	            start: shallow(events[index][1].start),
	            end: movePoint(shallow(events[index][1].start), use)
	          };
	          text = {
	            type: use > 1 ? 'strongText' : 'emphasisText',
	            start: shallow(events[open][1].end),
	            end: shallow(events[index][1].start)
	          };
	          group = {
	            type: use > 1 ? 'strong' : 'emphasis',
	            start: shallow(openingSequence.start),
	            end: shallow(closingSequence.end)
	          };
	          events[open][1].end = shallow(openingSequence.start);
	          events[index][1].start = shallow(closingSequence.end);
	          nextEvents = [];
	          if (events[open][1].end.offset - events[open][1].start.offset) {
	            nextEvents = chunkedPush(nextEvents, [
	              ['enter', events[open][1], context],
	              ['exit', events[open][1], context]
	            ]);
	          }
	          nextEvents = chunkedPush(nextEvents, [
	            ['enter', group, context],
	            ['enter', openingSequence, context],
	            ['exit', openingSequence, context],
	            ['enter', text, context]
	          ]);
	          nextEvents = chunkedPush(
	            nextEvents,
	            resolveAll(
	              context.parser.constructs.insideSpan.null,
	              events.slice(open + 1, index),
	              context
	            )
	          );
	          nextEvents = chunkedPush(nextEvents, [
	            ['exit', text, context],
	            ['enter', closingSequence, context],
	            ['exit', closingSequence, context],
	            ['exit', group, context]
	          ]);
	          if (events[index][1].end.offset - events[index][1].start.offset) {
	            offset = 2;
	            nextEvents = chunkedPush(nextEvents, [
	              ['enter', events[index][1], context],
	              ['exit', events[index][1], context]
	            ]);
	          } else {
	            offset = 0;
	          }
	          chunkedSplice(events, open - 1, index - open + 3, nextEvents);
	          index = open + nextEvents.length - offset - 2;
	          break
	        }
	      }
	    }
	  }
	  index = -1;
	  while (++index < events.length) {
	    if (events[index][1].type === 'attentionSequence') {
	      events[index][1].type = 'data';
	    }
	  }
	  return events
	}
	function tokenizeAttention(effects, ok) {
	  var before = classifyCharacter(this.previous);
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('attentionSequence');
	    marker = code;
	    return sequence(code)
	  }
	  function sequence(code) {
	    var token;
	    var after;
	    var open;
	    var close;
	    if (code === marker) {
	      effects.consume(code);
	      return sequence
	    }
	    token = effects.exit('attentionSequence');
	    after = classifyCharacter(code);
	    open = !after || (after === 2 && before);
	    close = !before || (before === 2 && after);
	    token._open = marker === 42 ? open : open && (before || !close);
	    token._close = marker === 42 ? close : close && (after || !open);
	    return ok(code)
	  }
	}
	attention_1 = attention;
	return attention_1;
}

var asciiAtext_1;
var hasRequiredAsciiAtext;

function requireAsciiAtext () {
	if (hasRequiredAsciiAtext) return asciiAtext_1;
	hasRequiredAsciiAtext = 1;
	var regexCheck = requireRegexCheck();
	var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
	asciiAtext_1 = asciiAtext;
	return asciiAtext_1;
}

var autolink_1;
var hasRequiredAutolink;

function requireAutolink () {
	if (hasRequiredAutolink) return autolink_1;
	hasRequiredAutolink = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiAtext = requireAsciiAtext();
	var asciiControl = requireAsciiControl();
	var autolink = {
	  name: 'autolink',
	  tokenize: tokenizeAutolink
	};
	function tokenizeAutolink(effects, ok, nok) {
	  var size = 1;
	  return start
	  function start(code) {
	    effects.enter('autolink');
	    effects.enter('autolinkMarker');
	    effects.consume(code);
	    effects.exit('autolinkMarker');
	    effects.enter('autolinkProtocol');
	    return open
	  }
	  function open(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return schemeOrEmailAtext
	    }
	    return asciiAtext(code) ? emailAtext(code) : nok(code)
	  }
	  function schemeOrEmailAtext(code) {
	    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)
	      ? schemeInsideOrEmailAtext(code)
	      : emailAtext(code)
	  }
	  function schemeInsideOrEmailAtext(code) {
	    if (code === 58) {
	      effects.consume(code);
	      return urlInside
	    }
	    if (
	      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) &&
	      size++ < 32
	    ) {
	      effects.consume(code);
	      return schemeInsideOrEmailAtext
	    }
	    return emailAtext(code)
	  }
	  function urlInside(code) {
	    if (code === 62) {
	      effects.exit('autolinkProtocol');
	      return end(code)
	    }
	    if (code === 32 || code === 60 || asciiControl(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return urlInside
	  }
	  function emailAtext(code) {
	    if (code === 64) {
	      effects.consume(code);
	      size = 0;
	      return emailAtSignOrDot
	    }
	    if (asciiAtext(code)) {
	      effects.consume(code);
	      return emailAtext
	    }
	    return nok(code)
	  }
	  function emailAtSignOrDot(code) {
	    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code)
	  }
	  function emailLabel(code) {
	    if (code === 46) {
	      effects.consume(code);
	      size = 0;
	      return emailAtSignOrDot
	    }
	    if (code === 62) {
	      effects.exit('autolinkProtocol').type = 'autolinkEmail';
	      return end(code)
	    }
	    return emailValue(code)
	  }
	  function emailValue(code) {
	    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
	      effects.consume(code);
	      return code === 45 ? emailValue : emailLabel
	    }
	    return nok(code)
	  }
	  function end(code) {
	    effects.enter('autolinkMarker');
	    effects.consume(code);
	    effects.exit('autolinkMarker');
	    effects.exit('autolink');
	    return ok
	  }
	}
	autolink_1 = autolink;
	return autolink_1;
}

var blockQuote_1;
var hasRequiredBlockQuote;

function requireBlockQuote () {
	if (hasRequiredBlockQuote) return blockQuote_1;
	hasRequiredBlockQuote = 1;
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var blockQuote = {
	  name: 'blockQuote',
	  tokenize: tokenizeBlockQuoteStart,
	  continuation: {
	    tokenize: tokenizeBlockQuoteContinuation
	  },
	  exit: exit
	};
	function tokenizeBlockQuoteStart(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    if (code === 62) {
	      if (!self.containerState.open) {
	        effects.enter('blockQuote', {
	          _container: true
	        });
	        self.containerState.open = true;
	      }
	      effects.enter('blockQuotePrefix');
	      effects.enter('blockQuoteMarker');
	      effects.consume(code);
	      effects.exit('blockQuoteMarker');
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    if (markdownSpace(code)) {
	      effects.enter('blockQuotePrefixWhitespace');
	      effects.consume(code);
	      effects.exit('blockQuotePrefixWhitespace');
	      effects.exit('blockQuotePrefix');
	      return ok
	    }
	    effects.exit('blockQuotePrefix');
	    return ok(code)
	  }
	}
	function tokenizeBlockQuoteContinuation(effects, ok, nok) {
	  return factorySpace(
	    effects,
	    effects.attempt(blockQuote, ok, nok),
	    'linePrefix',
	    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4
	  )
	}
	function exit(effects) {
	  effects.exit('blockQuote');
	}
	blockQuote_1 = blockQuote;
	return blockQuote_1;
}

var asciiPunctuation_1;
var hasRequiredAsciiPunctuation;

function requireAsciiPunctuation () {
	if (hasRequiredAsciiPunctuation) return asciiPunctuation_1;
	hasRequiredAsciiPunctuation = 1;
	var regexCheck = requireRegexCheck();
	var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
	asciiPunctuation_1 = asciiPunctuation;
	return asciiPunctuation_1;
}

var characterEscape_1;
var hasRequiredCharacterEscape;

function requireCharacterEscape () {
	if (hasRequiredCharacterEscape) return characterEscape_1;
	hasRequiredCharacterEscape = 1;
	var asciiPunctuation = requireAsciiPunctuation();
	var characterEscape = {
	  name: 'characterEscape',
	  tokenize: tokenizeCharacterEscape
	};
	function tokenizeCharacterEscape(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('characterEscape');
	    effects.enter('escapeMarker');
	    effects.consume(code);
	    effects.exit('escapeMarker');
	    return open
	  }
	  function open(code) {
	    if (asciiPunctuation(code)) {
	      effects.enter('characterEscapeValue');
	      effects.consume(code);
	      effects.exit('characterEscapeValue');
	      effects.exit('characterEscape');
	      return ok
	    }
	    return nok(code)
	  }
	}
	characterEscape_1 = characterEscape;
	return characterEscape_1;
}

var decodeEntity_browser;
var hasRequiredDecodeEntity_browser;

function requireDecodeEntity_browser () {
	if (hasRequiredDecodeEntity_browser) return decodeEntity_browser;
	hasRequiredDecodeEntity_browser = 1;
	var el;
	var semicolon = 59;
	decodeEntity_browser = decodeEntity;
	function decodeEntity(characters) {
	  var entity = '&' + characters + ';';
	  var char;
	  el = el || document.createElement('i');
	  el.innerHTML = entity;
	  char = el.textContent;
	  if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
	    return false
	  }
	  return char === entity ? false : char
	}
	return decodeEntity_browser;
}

var asciiDigit_1;
var hasRequiredAsciiDigit;

function requireAsciiDigit () {
	if (hasRequiredAsciiDigit) return asciiDigit_1;
	hasRequiredAsciiDigit = 1;
	var regexCheck = requireRegexCheck();
	var asciiDigit = regexCheck(/\d/);
	asciiDigit_1 = asciiDigit;
	return asciiDigit_1;
}

var asciiHexDigit_1;
var hasRequiredAsciiHexDigit;

function requireAsciiHexDigit () {
	if (hasRequiredAsciiHexDigit) return asciiHexDigit_1;
	hasRequiredAsciiHexDigit = 1;
	var regexCheck = requireRegexCheck();
	var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
	asciiHexDigit_1 = asciiHexDigit;
	return asciiHexDigit_1;
}

var characterReference_1;
var hasRequiredCharacterReference;

function requireCharacterReference () {
	if (hasRequiredCharacterReference) return characterReference_1;
	hasRequiredCharacterReference = 1;
	var decodeEntity = requireDecodeEntity_browser();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var asciiDigit = requireAsciiDigit();
	var asciiHexDigit = requireAsciiHexDigit();
	function _interopDefaultLegacy(e) {
	  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
	}
	var decodeEntity__default =  _interopDefaultLegacy(decodeEntity);
	var characterReference = {
	  name: 'characterReference',
	  tokenize: tokenizeCharacterReference
	};
	function tokenizeCharacterReference(effects, ok, nok) {
	  var self = this;
	  var size = 0;
	  var max;
	  var test;
	  return start
	  function start(code) {
	    effects.enter('characterReference');
	    effects.enter('characterReferenceMarker');
	    effects.consume(code);
	    effects.exit('characterReferenceMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 35) {
	      effects.enter('characterReferenceMarkerNumeric');
	      effects.consume(code);
	      effects.exit('characterReferenceMarkerNumeric');
	      return numeric
	    }
	    effects.enter('characterReferenceValue');
	    max = 31;
	    test = asciiAlphanumeric;
	    return value(code)
	  }
	  function numeric(code) {
	    if (code === 88 || code === 120) {
	      effects.enter('characterReferenceMarkerHexadecimal');
	      effects.consume(code);
	      effects.exit('characterReferenceMarkerHexadecimal');
	      effects.enter('characterReferenceValue');
	      max = 6;
	      test = asciiHexDigit;
	      return value
	    }
	    effects.enter('characterReferenceValue');
	    max = 7;
	    test = asciiDigit;
	    return value(code)
	  }
	  function value(code) {
	    var token;
	    if (code === 59 && size) {
	      token = effects.exit('characterReferenceValue');
	      if (
	        test === asciiAlphanumeric &&
	        !decodeEntity__default['default'](self.sliceSerialize(token))
	      ) {
	        return nok(code)
	      }
	      effects.enter('characterReferenceMarker');
	      effects.consume(code);
	      effects.exit('characterReferenceMarker');
	      effects.exit('characterReference');
	      return ok
	    }
	    if (test(code) && size++ < max) {
	      effects.consume(code);
	      return value
	    }
	    return nok(code)
	  }
	}
	characterReference_1 = characterReference;
	return characterReference_1;
}

var codeFenced_1;
var hasRequiredCodeFenced;

function requireCodeFenced () {
	if (hasRequiredCodeFenced) return codeFenced_1;
	hasRequiredCodeFenced = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var prefixSize = requirePrefixSize();
	var factorySpace = requireFactorySpace();
	var codeFenced = {
	  name: 'codeFenced',
	  tokenize: tokenizeCodeFenced,
	  concrete: true
	};
	function tokenizeCodeFenced(effects, ok, nok) {
	  var self = this;
	  var closingFenceConstruct = {
	    tokenize: tokenizeClosingFence,
	    partial: true
	  };
	  var initialPrefix = prefixSize(this.events, 'linePrefix');
	  var sizeOpen = 0;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('codeFenced');
	    effects.enter('codeFencedFence');
	    effects.enter('codeFencedFenceSequence');
	    marker = code;
	    return sequenceOpen(code)
	  }
	  function sequenceOpen(code) {
	    if (code === marker) {
	      effects.consume(code);
	      sizeOpen++;
	      return sequenceOpen
	    }
	    effects.exit('codeFencedFenceSequence');
	    return sizeOpen < 3
	      ? nok(code)
	      : factorySpace(effects, infoOpen, 'whitespace')(code)
	  }
	  function infoOpen(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return openAfter(code)
	    }
	    effects.enter('codeFencedFenceInfo');
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return info(code)
	  }
	  function info(code) {
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      effects.exit('chunkString');
	      effects.exit('codeFencedFenceInfo');
	      return factorySpace(effects, infoAfter, 'whitespace')(code)
	    }
	    if (code === 96 && code === marker) return nok(code)
	    effects.consume(code);
	    return info
	  }
	  function infoAfter(code) {
	    if (code === null || markdownLineEnding(code)) {
	      return openAfter(code)
	    }
	    effects.enter('codeFencedFenceMeta');
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return meta(code)
	  }
	  function meta(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('chunkString');
	      effects.exit('codeFencedFenceMeta');
	      return openAfter(code)
	    }
	    if (code === 96 && code === marker) return nok(code)
	    effects.consume(code);
	    return meta
	  }
	  function openAfter(code) {
	    effects.exit('codeFencedFence');
	    return self.interrupt ? ok(code) : content(code)
	  }
	  function content(code) {
	    if (code === null) {
	      return after(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return effects.attempt(
	        closingFenceConstruct,
	        after,
	        initialPrefix
	          ? factorySpace(effects, content, 'linePrefix', initialPrefix + 1)
	          : content
	      )
	    }
	    effects.enter('codeFlowValue');
	    return contentContinue(code)
	  }
	  function contentContinue(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('codeFlowValue');
	      return content(code)
	    }
	    effects.consume(code);
	    return contentContinue
	  }
	  function after(code) {
	    effects.exit('codeFenced');
	    return ok(code)
	  }
	  function tokenizeClosingFence(effects, ok, nok) {
	    var size = 0;
	    return factorySpace(
	      effects,
	      closingSequenceStart,
	      'linePrefix',
	      this.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )
	    function closingSequenceStart(code) {
	      effects.enter('codeFencedFence');
	      effects.enter('codeFencedFenceSequence');
	      return closingSequence(code)
	    }
	    function closingSequence(code) {
	      if (code === marker) {
	        effects.consume(code);
	        size++;
	        return closingSequence
	      }
	      if (size < sizeOpen) return nok(code)
	      effects.exit('codeFencedFenceSequence');
	      return factorySpace(effects, closingSequenceEnd, 'whitespace')(code)
	    }
	    function closingSequenceEnd(code) {
	      if (code === null || markdownLineEnding(code)) {
	        effects.exit('codeFencedFence');
	        return ok(code)
	      }
	      return nok(code)
	    }
	  }
	}
	codeFenced_1 = codeFenced;
	return codeFenced_1;
}

var codeIndented_1;
var hasRequiredCodeIndented;

function requireCodeIndented () {
	if (hasRequiredCodeIndented) return codeIndented_1;
	hasRequiredCodeIndented = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var chunkedSplice = requireChunkedSplice();
	var prefixSize = requirePrefixSize();
	var factorySpace = requireFactorySpace();
	var codeIndented = {
	  name: 'codeIndented',
	  tokenize: tokenizeCodeIndented,
	  resolve: resolveCodeIndented
	};
	var indentedContentConstruct = {
	  tokenize: tokenizeIndentedContent,
	  partial: true
	};
	function resolveCodeIndented(events, context) {
	  var code = {
	    type: 'codeIndented',
	    start: events[0][1].start,
	    end: events[events.length - 1][1].end
	  };
	  chunkedSplice(events, 0, 0, [['enter', code, context]]);
	  chunkedSplice(events, events.length, 0, [['exit', code, context]]);
	  return events
	}
	function tokenizeCodeIndented(effects, ok, nok) {
	  return effects.attempt(indentedContentConstruct, afterPrefix, nok)
	  function afterPrefix(code) {
	    if (code === null) {
	      return ok(code)
	    }
	    if (markdownLineEnding(code)) {
	      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code)
	    }
	    effects.enter('codeFlowValue');
	    return content(code)
	  }
	  function content(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('codeFlowValue');
	      return afterPrefix(code)
	    }
	    effects.consume(code);
	    return content
	  }
	}
	function tokenizeIndentedContent(effects, ok, nok) {
	  var self = this;
	  return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)
	  function afterPrefix(code) {
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)
	    }
	    return prefixSize(self.events, 'linePrefix') < 4 ? nok(code) : ok(code)
	  }
	}
	codeIndented_1 = codeIndented;
	return codeIndented_1;
}

var codeText_1;
var hasRequiredCodeText;

function requireCodeText () {
	if (hasRequiredCodeText) return codeText_1;
	hasRequiredCodeText = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var codeText = {
	  name: 'codeText',
	  tokenize: tokenizeCodeText,
	  resolve: resolveCodeText,
	  previous: previous
	};
	function resolveCodeText(events) {
	  var tailExitIndex = events.length - 4;
	  var headEnterIndex = 3;
	  var index;
	  var enter;
	  if (
	    (events[headEnterIndex][1].type === 'lineEnding' ||
	      events[headEnterIndex][1].type === 'space') &&
	    (events[tailExitIndex][1].type === 'lineEnding' ||
	      events[tailExitIndex][1].type === 'space')
	  ) {
	    index = headEnterIndex;
	    while (++index < tailExitIndex) {
	      if (events[index][1].type === 'codeTextData') {
	        events[tailExitIndex][1].type = events[headEnterIndex][1].type =
	          'codeTextPadding';
	        headEnterIndex += 2;
	        tailExitIndex -= 2;
	        break
	      }
	    }
	  }
	  index = headEnterIndex - 1;
	  tailExitIndex++;
	  while (++index <= tailExitIndex) {
	    if (enter === undefined) {
	      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
	        enter = index;
	      }
	    } else if (
	      index === tailExitIndex ||
	      events[index][1].type === 'lineEnding'
	    ) {
	      events[enter][1].type = 'codeTextData';
	      if (index !== enter + 2) {
	        events[enter][1].end = events[index - 1][1].end;
	        events.splice(enter + 2, index - enter - 2);
	        tailExitIndex -= index - enter - 2;
	        index = enter + 2;
	      }
	      enter = undefined;
	    }
	  }
	  return events
	}
	function previous(code) {
	  return (
	    code !== 96 ||
	    this.events[this.events.length - 1][1].type === 'characterEscape'
	  )
	}
	function tokenizeCodeText(effects, ok, nok) {
	  var sizeOpen = 0;
	  var size;
	  var token;
	  return start
	  function start(code) {
	    effects.enter('codeText');
	    effects.enter('codeTextSequence');
	    return openingSequence(code)
	  }
	  function openingSequence(code) {
	    if (code === 96) {
	      effects.consume(code);
	      sizeOpen++;
	      return openingSequence
	    }
	    effects.exit('codeTextSequence');
	    return gap(code)
	  }
	  function gap(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 96) {
	      token = effects.enter('codeTextSequence');
	      size = 0;
	      return closingSequence(code)
	    }
	    if (code === 32) {
	      effects.enter('space');
	      effects.consume(code);
	      effects.exit('space');
	      return gap
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return gap
	    }
	    effects.enter('codeTextData');
	    return data(code)
	  }
	  function data(code) {
	    if (
	      code === null ||
	      code === 32 ||
	      code === 96 ||
	      markdownLineEnding(code)
	    ) {
	      effects.exit('codeTextData');
	      return gap(code)
	    }
	    effects.consume(code);
	    return data
	  }
	  function closingSequence(code) {
	    if (code === 96) {
	      effects.consume(code);
	      size++;
	      return closingSequence
	    }
	    if (size === sizeOpen) {
	      effects.exit('codeTextSequence');
	      effects.exit('codeText');
	      return ok(code)
	    }
	    token.type = 'codeTextData';
	    return data(code)
	  }
	}
	codeText_1 = codeText;
	return codeText_1;
}

var factoryDestination;
var hasRequiredFactoryDestination;

function requireFactoryDestination () {
	if (hasRequiredFactoryDestination) return factoryDestination;
	hasRequiredFactoryDestination = 1;
	var asciiControl = requireAsciiControl();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownLineEnding = requireMarkdownLineEnding();
	function destinationFactory(
	  effects,
	  ok,
	  nok,
	  type,
	  literalType,
	  literalMarkerType,
	  rawType,
	  stringType,
	  max
	) {
	  var limit = max || Infinity;
	  var balance = 0;
	  return start
	  function start(code) {
	    if (code === 60) {
	      effects.enter(type);
	      effects.enter(literalType);
	      effects.enter(literalMarkerType);
	      effects.consume(code);
	      effects.exit(literalMarkerType);
	      return destinationEnclosedBefore
	    }
	    if (asciiControl(code) || code === 41) {
	      return nok(code)
	    }
	    effects.enter(type);
	    effects.enter(rawType);
	    effects.enter(stringType);
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return destinationRaw(code)
	  }
	  function destinationEnclosedBefore(code) {
	    if (code === 62) {
	      effects.enter(literalMarkerType);
	      effects.consume(code);
	      effects.exit(literalMarkerType);
	      effects.exit(literalType);
	      effects.exit(type);
	      return ok
	    }
	    effects.enter(stringType);
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return destinationEnclosed(code)
	  }
	  function destinationEnclosed(code) {
	    if (code === 62) {
	      effects.exit('chunkString');
	      effects.exit(stringType);
	      return destinationEnclosedBefore(code)
	    }
	    if (code === null || code === 60 || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
	  }
	  function destinationEnclosedEscape(code) {
	    if (code === 60 || code === 62 || code === 92) {
	      effects.consume(code);
	      return destinationEnclosed
	    }
	    return destinationEnclosed(code)
	  }
	  function destinationRaw(code) {
	    if (code === 40) {
	      if (++balance > limit) return nok(code)
	      effects.consume(code);
	      return destinationRaw
	    }
	    if (code === 41) {
	      if (!balance--) {
	        effects.exit('chunkString');
	        effects.exit(stringType);
	        effects.exit(rawType);
	        effects.exit(type);
	        return ok(code)
	      }
	      effects.consume(code);
	      return destinationRaw
	    }
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      if (balance) return nok(code)
	      effects.exit('chunkString');
	      effects.exit(stringType);
	      effects.exit(rawType);
	      effects.exit(type);
	      return ok(code)
	    }
	    if (asciiControl(code)) return nok(code)
	    effects.consume(code);
	    return code === 92 ? destinationRawEscape : destinationRaw
	  }
	  function destinationRawEscape(code) {
	    if (code === 40 || code === 41 || code === 92) {
	      effects.consume(code);
	      return destinationRaw
	    }
	    return destinationRaw(code)
	  }
	}
	factoryDestination = destinationFactory;
	return factoryDestination;
}

var factoryLabel;
var hasRequiredFactoryLabel;

function requireFactoryLabel () {
	if (hasRequiredFactoryLabel) return factoryLabel;
	hasRequiredFactoryLabel = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	function labelFactory(effects, ok, nok, type, markerType, stringType) {
	  var self = this;
	  var size = 0;
	  var data;
	  return start
	  function start(code) {
	    effects.enter(type);
	    effects.enter(markerType);
	    effects.consume(code);
	    effects.exit(markerType);
	    effects.enter(stringType);
	    return atBreak
	  }
	  function atBreak(code) {
	    if (
	      code === null ||
	      code === 91 ||
	      (code === 93 && !data) ||
	      (code === 94 &&
	        !size &&
	        '_hiddenFootnoteSupport' in self.parser.constructs) ||
	      size > 999
	    ) {
	      return nok(code)
	    }
	    if (code === 93) {
	      effects.exit(stringType);
	      effects.enter(markerType);
	      effects.consume(code);
	      effects.exit(markerType);
	      effects.exit(type);
	      return ok
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return atBreak
	    }
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return label(code)
	  }
	  function label(code) {
	    if (
	      code === null ||
	      code === 91 ||
	      code === 93 ||
	      markdownLineEnding(code) ||
	      size++ > 999
	    ) {
	      effects.exit('chunkString');
	      return atBreak(code)
	    }
	    effects.consume(code);
	    data = data || !markdownSpace(code);
	    return code === 92 ? labelEscape : label
	  }
	  function labelEscape(code) {
	    if (code === 91 || code === 92 || code === 93) {
	      effects.consume(code);
	      size++;
	      return label
	    }
	    return label(code)
	  }
	}
	factoryLabel = labelFactory;
	return factoryLabel;
}

var factoryWhitespace;
var hasRequiredFactoryWhitespace;

function requireFactoryWhitespace () {
	if (hasRequiredFactoryWhitespace) return factoryWhitespace;
	hasRequiredFactoryWhitespace = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	function whitespaceFactory(effects, ok) {
	  var seen;
	  return start
	  function start(code) {
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      seen = true;
	      return start
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(
	        effects,
	        start,
	        seen ? 'linePrefix' : 'lineSuffix'
	      )(code)
	    }
	    return ok(code)
	  }
	}
	factoryWhitespace = whitespaceFactory;
	return factoryWhitespace;
}

var factoryTitle;
var hasRequiredFactoryTitle;

function requireFactoryTitle () {
	if (hasRequiredFactoryTitle) return factoryTitle;
	hasRequiredFactoryTitle = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var factorySpace = requireFactorySpace();
	function titleFactory(effects, ok, nok, type, markerType, stringType) {
	  var marker;
	  return start
	  function start(code) {
	    effects.enter(type);
	    effects.enter(markerType);
	    effects.consume(code);
	    effects.exit(markerType);
	    marker = code === 40 ? 41 : code;
	    return atFirstTitleBreak
	  }
	  function atFirstTitleBreak(code) {
	    if (code === marker) {
	      effects.enter(markerType);
	      effects.consume(code);
	      effects.exit(markerType);
	      effects.exit(type);
	      return ok
	    }
	    effects.enter(stringType);
	    return atTitleBreak(code)
	  }
	  function atTitleBreak(code) {
	    if (code === marker) {
	      effects.exit(stringType);
	      return atFirstTitleBreak(marker)
	    }
	    if (code === null) {
	      return nok(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return factorySpace(effects, atTitleBreak, 'linePrefix')
	    }
	    effects.enter('chunkString', {
	      contentType: 'string'
	    });
	    return title(code)
	  }
	  function title(code) {
	    if (code === marker || code === null || markdownLineEnding(code)) {
	      effects.exit('chunkString');
	      return atTitleBreak(code)
	    }
	    effects.consume(code);
	    return code === 92 ? titleEscape : title
	  }
	  function titleEscape(code) {
	    if (code === marker || code === 92) {
	      effects.consume(code);
	      return title
	    }
	    return title(code)
	  }
	}
	factoryTitle = titleFactory;
	return factoryTitle;
}

var definition_1$1;
var hasRequiredDefinition$1;

function requireDefinition$1 () {
	if (hasRequiredDefinition$1) return definition_1$1;
	hasRequiredDefinition$1 = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var factoryDestination = requireFactoryDestination();
	var factoryLabel = requireFactoryLabel();
	var factorySpace = requireFactorySpace();
	var factoryWhitespace = requireFactoryWhitespace();
	var factoryTitle = requireFactoryTitle();
	var definition = {
	  name: 'definition',
	  tokenize: tokenizeDefinition
	};
	var titleConstruct = {
	  tokenize: tokenizeTitle,
	  partial: true
	};
	function tokenizeDefinition(effects, ok, nok) {
	  var self = this;
	  var identifier;
	  return start
	  function start(code) {
	    effects.enter('definition');
	    return factoryLabel.call(
	      self,
	      effects,
	      labelAfter,
	      nok,
	      'definitionLabel',
	      'definitionLabelMarker',
	      'definitionLabelString'
	    )(code)
	  }
	  function labelAfter(code) {
	    identifier = normalizeIdentifier(
	      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
	    );
	    if (code === 58) {
	      effects.enter('definitionMarker');
	      effects.consume(code);
	      effects.exit('definitionMarker');
	      return factoryWhitespace(
	        effects,
	        factoryDestination(
	          effects,
	          effects.attempt(
	            titleConstruct,
	            factorySpace(effects, after, 'whitespace'),
	            factorySpace(effects, after, 'whitespace')
	          ),
	          nok,
	          'definitionDestination',
	          'definitionDestinationLiteral',
	          'definitionDestinationLiteralMarker',
	          'definitionDestinationRaw',
	          'definitionDestinationString'
	        )
	      )
	    }
	    return nok(code)
	  }
	  function after(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('definition');
	      if (self.parser.defined.indexOf(identifier) < 0) {
	        self.parser.defined.push(identifier);
	      }
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	function tokenizeTitle(effects, ok, nok) {
	  return start
	  function start(code) {
	    return markdownLineEndingOrSpace(code)
	      ? factoryWhitespace(effects, before)(code)
	      : nok(code)
	  }
	  function before(code) {
	    if (code === 34 || code === 39 || code === 40) {
	      return factoryTitle(
	        effects,
	        factorySpace(effects, after, 'whitespace'),
	        nok,
	        'definitionTitle',
	        'definitionTitleMarker',
	        'definitionTitleString'
	      )(code)
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
	  }
	}
	definition_1$1 = definition;
	return definition_1$1;
}

var hardBreakEscape_1;
var hasRequiredHardBreakEscape;

function requireHardBreakEscape () {
	if (hasRequiredHardBreakEscape) return hardBreakEscape_1;
	hasRequiredHardBreakEscape = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var hardBreakEscape = {
	  name: 'hardBreakEscape',
	  tokenize: tokenizeHardBreakEscape
	};
	function tokenizeHardBreakEscape(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('hardBreakEscape');
	    effects.enter('escapeMarker');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (markdownLineEnding(code)) {
	      effects.exit('escapeMarker');
	      effects.exit('hardBreakEscape');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	hardBreakEscape_1 = hardBreakEscape;
	return hardBreakEscape_1;
}

var headingAtx_1;
var hasRequiredHeadingAtx;

function requireHeadingAtx () {
	if (hasRequiredHeadingAtx) return headingAtx_1;
	hasRequiredHeadingAtx = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var chunkedSplice = requireChunkedSplice();
	var factorySpace = requireFactorySpace();
	var headingAtx = {
	  name: 'headingAtx',
	  tokenize: tokenizeHeadingAtx,
	  resolve: resolveHeadingAtx
	};
	function resolveHeadingAtx(events, context) {
	  var contentEnd = events.length - 2;
	  var contentStart = 3;
	  var content;
	  var text;
	  if (events[contentStart][1].type === 'whitespace') {
	    contentStart += 2;
	  }
	  if (
	    contentEnd - 2 > contentStart &&
	    events[contentEnd][1].type === 'whitespace'
	  ) {
	    contentEnd -= 2;
	  }
	  if (
	    events[contentEnd][1].type === 'atxHeadingSequence' &&
	    (contentStart === contentEnd - 1 ||
	      (contentEnd - 4 > contentStart &&
	        events[contentEnd - 2][1].type === 'whitespace'))
	  ) {
	    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	  }
	  if (contentEnd > contentStart) {
	    content = {
	      type: 'atxHeadingText',
	      start: events[contentStart][1].start,
	      end: events[contentEnd][1].end
	    };
	    text = {
	      type: 'chunkText',
	      start: events[contentStart][1].start,
	      end: events[contentEnd][1].end,
	      contentType: 'text'
	    };
	    chunkedSplice(events, contentStart, contentEnd - contentStart + 1, [
	      ['enter', content, context],
	      ['enter', text, context],
	      ['exit', text, context],
	      ['exit', content, context]
	    ]);
	  }
	  return events
	}
	function tokenizeHeadingAtx(effects, ok, nok) {
	  var self = this;
	  var size = 0;
	  return start
	  function start(code) {
	    effects.enter('atxHeading');
	    effects.enter('atxHeadingSequence');
	    return fenceOpenInside(code)
	  }
	  function fenceOpenInside(code) {
	    if (code === 35 && size++ < 6) {
	      effects.consume(code);
	      return fenceOpenInside
	    }
	    if (code === null || markdownLineEndingOrSpace(code)) {
	      effects.exit('atxHeadingSequence');
	      return self.interrupt ? ok(code) : headingBreak(code)
	    }
	    return nok(code)
	  }
	  function headingBreak(code) {
	    if (code === 35) {
	      effects.enter('atxHeadingSequence');
	      return sequence(code)
	    }
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('atxHeading');
	      return ok(code)
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(effects, headingBreak, 'whitespace')(code)
	    }
	    effects.enter('atxHeadingText');
	    return data(code)
	  }
	  function sequence(code) {
	    if (code === 35) {
	      effects.consume(code);
	      return sequence
	    }
	    effects.exit('atxHeadingSequence');
	    return headingBreak(code)
	  }
	  function data(code) {
	    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
	      effects.exit('atxHeadingText');
	      return headingBreak(code)
	    }
	    effects.consume(code);
	    return data
	  }
	}
	headingAtx_1 = headingAtx;
	return headingAtx_1;
}

var htmlBlockNames;
var hasRequiredHtmlBlockNames;

function requireHtmlBlockNames () {
	if (hasRequiredHtmlBlockNames) return htmlBlockNames;
	hasRequiredHtmlBlockNames = 1;
	var basics = [
	  'address',
	  'article',
	  'aside',
	  'base',
	  'basefont',
	  'blockquote',
	  'body',
	  'caption',
	  'center',
	  'col',
	  'colgroup',
	  'dd',
	  'details',
	  'dialog',
	  'dir',
	  'div',
	  'dl',
	  'dt',
	  'fieldset',
	  'figcaption',
	  'figure',
	  'footer',
	  'form',
	  'frame',
	  'frameset',
	  'h1',
	  'h2',
	  'h3',
	  'h4',
	  'h5',
	  'h6',
	  'head',
	  'header',
	  'hr',
	  'html',
	  'iframe',
	  'legend',
	  'li',
	  'link',
	  'main',
	  'menu',
	  'menuitem',
	  'nav',
	  'noframes',
	  'ol',
	  'optgroup',
	  'option',
	  'p',
	  'param',
	  'section',
	  'source',
	  'summary',
	  'table',
	  'tbody',
	  'td',
	  'tfoot',
	  'th',
	  'thead',
	  'title',
	  'tr',
	  'track',
	  'ul'
	];
	htmlBlockNames = basics;
	return htmlBlockNames;
}

var htmlRawNames;
var hasRequiredHtmlRawNames;

function requireHtmlRawNames () {
	if (hasRequiredHtmlRawNames) return htmlRawNames;
	hasRequiredHtmlRawNames = 1;
	var raws = ['pre', 'script', 'style', 'textarea'];
	htmlRawNames = raws;
	return htmlRawNames;
}

var htmlFlow_1;
var hasRequiredHtmlFlow;

function requireHtmlFlow () {
	if (hasRequiredHtmlFlow) return htmlFlow_1;
	hasRequiredHtmlFlow = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var fromCharCode = requireFromCharCode();
	var htmlBlockNames = requireHtmlBlockNames();
	var htmlRawNames = requireHtmlRawNames();
	var partialBlankLine = requirePartialBlankLine();
	var htmlFlow = {
	  name: 'htmlFlow',
	  tokenize: tokenizeHtmlFlow,
	  resolveTo: resolveToHtmlFlow,
	  concrete: true
	};
	var nextBlankConstruct = {
	  tokenize: tokenizeNextBlank,
	  partial: true
	};
	function resolveToHtmlFlow(events) {
	  var index = events.length;
	  while (index--) {
	    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
	      break
	    }
	  }
	  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
	    events[index][1].start = events[index - 2][1].start;
	    events[index + 1][1].start = events[index - 2][1].start;
	    events.splice(index - 2, 2);
	  }
	  return events
	}
	function tokenizeHtmlFlow(effects, ok, nok) {
	  var self = this;
	  var kind;
	  var startTag;
	  var buffer;
	  var index;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('htmlFlow');
	    effects.enter('htmlFlowData');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (code === 33) {
	      effects.consume(code);
	      return declarationStart
	    }
	    if (code === 47) {
	      effects.consume(code);
	      return tagCloseStart
	    }
	    if (code === 63) {
	      effects.consume(code);
	      kind = 3;
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      buffer = fromCharCode(code);
	      startTag = true;
	      return tagName
	    }
	    return nok(code)
	  }
	  function declarationStart(code) {
	    if (code === 45) {
	      effects.consume(code);
	      kind = 2;
	      return commentOpenInside
	    }
	    if (code === 91) {
	      effects.consume(code);
	      kind = 5;
	      buffer = 'CDATA[';
	      index = 0;
	      return cdataOpenInside
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      kind = 4;
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    return nok(code)
	  }
	  function commentOpenInside(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return self.interrupt ? ok : continuationDeclarationInside
	    }
	    return nok(code)
	  }
	  function cdataOpenInside(code) {
	    if (code === buffer.charCodeAt(index++)) {
	      effects.consume(code);
	      return index === buffer.length
	        ? self.interrupt
	          ? ok
	          : continuation
	        : cdataOpenInside
	    }
	    return nok(code)
	  }
	  function tagCloseStart(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      buffer = fromCharCode(code);
	      return tagName
	    }
	    return nok(code)
	  }
	  function tagName(code) {
	    if (
	      code === null ||
	      code === 47 ||
	      code === 62 ||
	      markdownLineEndingOrSpace(code)
	    ) {
	      if (
	        code !== 47 &&
	        startTag &&
	        htmlRawNames.indexOf(buffer.toLowerCase()) > -1
	      ) {
	        kind = 1;
	        return self.interrupt ? ok(code) : continuation(code)
	      }
	      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
	        kind = 6;
	        if (code === 47) {
	          effects.consume(code);
	          return basicSelfClosing
	        }
	        return self.interrupt ? ok(code) : continuation(code)
	      }
	      kind = 7;
	      return self.interrupt
	        ? nok(code)
	        : startTag
	        ? completeAttributeNameBefore(code)
	        : completeClosingTagAfter(code)
	    }
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      buffer += fromCharCode(code);
	      return tagName
	    }
	    return nok(code)
	  }
	  function basicSelfClosing(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return self.interrupt ? ok : continuation
	    }
	    return nok(code)
	  }
	  function completeClosingTagAfter(code) {
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeClosingTagAfter
	    }
	    return completeEnd(code)
	  }
	  function completeAttributeNameBefore(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return completeEnd
	    }
	    if (code === 58 || code === 95 || asciiAlpha(code)) {
	      effects.consume(code);
	      return completeAttributeName
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeNameBefore
	    }
	    return completeEnd(code)
	  }
	  function completeAttributeName(code) {
	    if (
	      code === 45 ||
	      code === 46 ||
	      code === 58 ||
	      code === 95 ||
	      asciiAlphanumeric(code)
	    ) {
	      effects.consume(code);
	      return completeAttributeName
	    }
	    return completeAttributeNameAfter(code)
	  }
	  function completeAttributeNameAfter(code) {
	    if (code === 61) {
	      effects.consume(code);
	      return completeAttributeValueBefore
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeNameAfter
	    }
	    return completeAttributeNameBefore(code)
	  }
	  function completeAttributeValueBefore(code) {
	    if (
	      code === null ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 34 || code === 39) {
	      effects.consume(code);
	      marker = code;
	      return completeAttributeValueQuoted
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAttributeValueBefore
	    }
	    marker = undefined;
	    return completeAttributeValueUnquoted(code)
	  }
	  function completeAttributeValueQuoted(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return completeAttributeValueQuotedAfter
	    }
	    if (code === null || markdownLineEnding(code)) {
	      return nok(code)
	    }
	    effects.consume(code);
	    return completeAttributeValueQuoted
	  }
	  function completeAttributeValueUnquoted(code) {
	    if (
	      code === null ||
	      code === 34 ||
	      code === 39 ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96 ||
	      markdownLineEndingOrSpace(code)
	    ) {
	      return completeAttributeNameAfter(code)
	    }
	    effects.consume(code);
	    return completeAttributeValueUnquoted
	  }
	  function completeAttributeValueQuotedAfter(code) {
	    if (code === 47 || code === 62 || markdownSpace(code)) {
	      return completeAttributeNameBefore(code)
	    }
	    return nok(code)
	  }
	  function completeEnd(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return completeAfter
	    }
	    return nok(code)
	  }
	  function completeAfter(code) {
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return completeAfter
	    }
	    return code === null || markdownLineEnding(code)
	      ? continuation(code)
	      : nok(code)
	  }
	  function continuation(code) {
	    if (code === 45 && kind === 2) {
	      effects.consume(code);
	      return continuationCommentInside
	    }
	    if (code === 60 && kind === 1) {
	      effects.consume(code);
	      return continuationRawTagOpen
	    }
	    if (code === 62 && kind === 4) {
	      effects.consume(code);
	      return continuationClose
	    }
	    if (code === 63 && kind === 3) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    if (code === 93 && kind === 5) {
	      effects.consume(code);
	      return continuationCharacterDataInside
	    }
	    if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
	      return effects.check(
	        nextBlankConstruct,
	        continuationClose,
	        continuationAtLineEnding
	      )(code)
	    }
	    if (code === null || markdownLineEnding(code)) {
	      return continuationAtLineEnding(code)
	    }
	    effects.consume(code);
	    return continuation
	  }
	  function continuationAtLineEnding(code) {
	    effects.exit('htmlFlowData');
	    return htmlContinueStart(code)
	  }
	  function htmlContinueStart(code) {
	    if (code === null) {
	      return done(code)
	    }
	    if (markdownLineEnding(code)) {
	      effects.enter('lineEnding');
	      effects.consume(code);
	      effects.exit('lineEnding');
	      return htmlContinueStart
	    }
	    effects.enter('htmlFlowData');
	    return continuation(code)
	  }
	  function continuationCommentInside(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    return continuation(code)
	  }
	  function continuationRawTagOpen(code) {
	    if (code === 47) {
	      effects.consume(code);
	      buffer = '';
	      return continuationRawEndTag
	    }
	    return continuation(code)
	  }
	  function continuationRawEndTag(code) {
	    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
	      effects.consume(code);
	      return continuationClose
	    }
	    if (asciiAlpha(code) && buffer.length < 8) {
	      effects.consume(code);
	      buffer += fromCharCode(code);
	      return continuationRawEndTag
	    }
	    return continuation(code)
	  }
	  function continuationCharacterDataInside(code) {
	    if (code === 93) {
	      effects.consume(code);
	      return continuationDeclarationInside
	    }
	    return continuation(code)
	  }
	  function continuationDeclarationInside(code) {
	    if (code === 62) {
	      effects.consume(code);
	      return continuationClose
	    }
	    return continuation(code)
	  }
	  function continuationClose(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('htmlFlowData');
	      return done(code)
	    }
	    effects.consume(code);
	    return continuationClose
	  }
	  function done(code) {
	    effects.exit('htmlFlow');
	    return ok(code)
	  }
	}
	function tokenizeNextBlank(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.exit('htmlFlowData');
	    effects.enter('lineEndingBlank');
	    effects.consume(code);
	    effects.exit('lineEndingBlank');
	    return effects.attempt(partialBlankLine, ok, nok)
	  }
	}
	htmlFlow_1 = htmlFlow;
	return htmlFlow_1;
}

var htmlText_1;
var hasRequiredHtmlText;

function requireHtmlText () {
	if (hasRequiredHtmlText) return htmlText_1;
	hasRequiredHtmlText = 1;
	var asciiAlpha = requireAsciiAlpha();
	var asciiAlphanumeric = requireAsciiAlphanumeric();
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var htmlText = {
	  name: 'htmlText',
	  tokenize: tokenizeHtmlText
	};
	function tokenizeHtmlText(effects, ok, nok) {
	  var self = this;
	  var marker;
	  var buffer;
	  var index;
	  var returnState;
	  return start
	  function start(code) {
	    effects.enter('htmlText');
	    effects.enter('htmlTextData');
	    effects.consume(code);
	    return open
	  }
	  function open(code) {
	    if (code === 33) {
	      effects.consume(code);
	      return declarationOpen
	    }
	    if (code === 47) {
	      effects.consume(code);
	      return tagCloseStart
	    }
	    if (code === 63) {
	      effects.consume(code);
	      return instruction
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return tagOpen
	    }
	    return nok(code)
	  }
	  function declarationOpen(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return commentOpen
	    }
	    if (code === 91) {
	      effects.consume(code);
	      buffer = 'CDATA[';
	      index = 0;
	      return cdataOpen
	    }
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return declaration
	    }
	    return nok(code)
	  }
	  function commentOpen(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return commentStart
	    }
	    return nok(code)
	  }
	  function commentStart(code) {
	    if (code === null || code === 62) {
	      return nok(code)
	    }
	    if (code === 45) {
	      effects.consume(code);
	      return commentStartDash
	    }
	    return comment(code)
	  }
	  function commentStartDash(code) {
	    if (code === null || code === 62) {
	      return nok(code)
	    }
	    return comment(code)
	  }
	  function comment(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 45) {
	      effects.consume(code);
	      return commentClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = comment;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return comment
	  }
	  function commentClose(code) {
	    if (code === 45) {
	      effects.consume(code);
	      return end
	    }
	    return comment(code)
	  }
	  function cdataOpen(code) {
	    if (code === buffer.charCodeAt(index++)) {
	      effects.consume(code);
	      return index === buffer.length ? cdata : cdataOpen
	    }
	    return nok(code)
	  }
	  function cdata(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 93) {
	      effects.consume(code);
	      return cdataClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = cdata;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return cdata
	  }
	  function cdataClose(code) {
	    if (code === 93) {
	      effects.consume(code);
	      return cdataEnd
	    }
	    return cdata(code)
	  }
	  function cdataEnd(code) {
	    if (code === 62) {
	      return end(code)
	    }
	    if (code === 93) {
	      effects.consume(code);
	      return cdataEnd
	    }
	    return cdata(code)
	  }
	  function declaration(code) {
	    if (code === null || code === 62) {
	      return end(code)
	    }
	    if (markdownLineEnding(code)) {
	      returnState = declaration;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return declaration
	  }
	  function instruction(code) {
	    if (code === null) {
	      return nok(code)
	    }
	    if (code === 63) {
	      effects.consume(code);
	      return instructionClose
	    }
	    if (markdownLineEnding(code)) {
	      returnState = instruction;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return instruction
	  }
	  function instructionClose(code) {
	    return code === 62 ? end(code) : instruction(code)
	  }
	  function tagCloseStart(code) {
	    if (asciiAlpha(code)) {
	      effects.consume(code);
	      return tagClose
	    }
	    return nok(code)
	  }
	  function tagClose(code) {
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return tagClose
	    }
	    return tagCloseBetween(code)
	  }
	  function tagCloseBetween(code) {
	    if (markdownLineEnding(code)) {
	      returnState = tagCloseBetween;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagCloseBetween
	    }
	    return end(code)
	  }
	  function tagOpen(code) {
	    if (code === 45 || asciiAlphanumeric(code)) {
	      effects.consume(code);
	      return tagOpen
	    }
	    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    return nok(code)
	  }
	  function tagOpenBetween(code) {
	    if (code === 47) {
	      effects.consume(code);
	      return end
	    }
	    if (code === 58 || code === 95 || asciiAlpha(code)) {
	      effects.consume(code);
	      return tagOpenAttributeName
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenBetween;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenBetween
	    }
	    return end(code)
	  }
	  function tagOpenAttributeName(code) {
	    if (
	      code === 45 ||
	      code === 46 ||
	      code === 58 ||
	      code === 95 ||
	      asciiAlphanumeric(code)
	    ) {
	      effects.consume(code);
	      return tagOpenAttributeName
	    }
	    return tagOpenAttributeNameAfter(code)
	  }
	  function tagOpenAttributeNameAfter(code) {
	    if (code === 61) {
	      effects.consume(code);
	      return tagOpenAttributeValueBefore
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeNameAfter;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenAttributeNameAfter
	    }
	    return tagOpenBetween(code)
	  }
	  function tagOpenAttributeValueBefore(code) {
	    if (
	      code === null ||
	      code === 60 ||
	      code === 61 ||
	      code === 62 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 34 || code === 39) {
	      effects.consume(code);
	      marker = code;
	      return tagOpenAttributeValueQuoted
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeValueBefore;
	      return atLineEnding(code)
	    }
	    if (markdownSpace(code)) {
	      effects.consume(code);
	      return tagOpenAttributeValueBefore
	    }
	    effects.consume(code);
	    marker = undefined;
	    return tagOpenAttributeValueUnquoted
	  }
	  function tagOpenAttributeValueQuoted(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return tagOpenAttributeValueQuotedAfter
	    }
	    if (code === null) {
	      return nok(code)
	    }
	    if (markdownLineEnding(code)) {
	      returnState = tagOpenAttributeValueQuoted;
	      return atLineEnding(code)
	    }
	    effects.consume(code);
	    return tagOpenAttributeValueQuoted
	  }
	  function tagOpenAttributeValueQuotedAfter(code) {
	    if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    return nok(code)
	  }
	  function tagOpenAttributeValueUnquoted(code) {
	    if (
	      code === null ||
	      code === 34 ||
	      code === 39 ||
	      code === 60 ||
	      code === 61 ||
	      code === 96
	    ) {
	      return nok(code)
	    }
	    if (code === 62 || markdownLineEndingOrSpace(code)) {
	      return tagOpenBetween(code)
	    }
	    effects.consume(code);
	    return tagOpenAttributeValueUnquoted
	  }
	  function atLineEnding(code) {
	    effects.exit('htmlTextData');
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(
	      effects,
	      afterPrefix,
	      'linePrefix',
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )
	  }
	  function afterPrefix(code) {
	    effects.enter('htmlTextData');
	    return returnState(code)
	  }
	  function end(code) {
	    if (code === 62) {
	      effects.consume(code);
	      effects.exit('htmlTextData');
	      effects.exit('htmlText');
	      return ok
	    }
	    return nok(code)
	  }
	}
	htmlText_1 = htmlText;
	return htmlText_1;
}

var labelEnd_1;
var hasRequiredLabelEnd;

function requireLabelEnd () {
	if (hasRequiredLabelEnd) return labelEnd_1;
	hasRequiredLabelEnd = 1;
	var markdownLineEndingOrSpace = requireMarkdownLineEndingOrSpace();
	var chunkedPush = requireChunkedPush();
	var chunkedSplice = requireChunkedSplice();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var resolveAll = requireResolveAll();
	var shallow = requireShallow();
	var factoryDestination = requireFactoryDestination();
	var factoryLabel = requireFactoryLabel();
	var factoryTitle = requireFactoryTitle();
	var factoryWhitespace = requireFactoryWhitespace();
	var labelEnd = {
	  name: 'labelEnd',
	  tokenize: tokenizeLabelEnd,
	  resolveTo: resolveToLabelEnd,
	  resolveAll: resolveAllLabelEnd
	};
	var resourceConstruct = {
	  tokenize: tokenizeResource
	};
	var fullReferenceConstruct = {
	  tokenize: tokenizeFullReference
	};
	var collapsedReferenceConstruct = {
	  tokenize: tokenizeCollapsedReference
	};
	function resolveAllLabelEnd(events) {
	  var index = -1;
	  var token;
	  while (++index < events.length) {
	    token = events[index][1];
	    if (
	      !token._used &&
	      (token.type === 'labelImage' ||
	        token.type === 'labelLink' ||
	        token.type === 'labelEnd')
	    ) {
	      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
	      token.type = 'data';
	      index++;
	    }
	  }
	  return events
	}
	function resolveToLabelEnd(events, context) {
	  var index = events.length;
	  var offset = 0;
	  var group;
	  var label;
	  var text;
	  var token;
	  var open;
	  var close;
	  var media;
	  while (index--) {
	    token = events[index][1];
	    if (open) {
	      if (
	        token.type === 'link' ||
	        (token.type === 'labelLink' && token._inactive)
	      ) {
	        break
	      }
	      if (events[index][0] === 'enter' && token.type === 'labelLink') {
	        token._inactive = true;
	      }
	    } else if (close) {
	      if (
	        events[index][0] === 'enter' &&
	        (token.type === 'labelImage' || token.type === 'labelLink') &&
	        !token._balanced
	      ) {
	        open = index;
	        if (token.type !== 'labelLink') {
	          offset = 2;
	          break
	        }
	      }
	    } else if (token.type === 'labelEnd') {
	      close = index;
	    }
	  }
	  group = {
	    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
	    start: shallow(events[open][1].start),
	    end: shallow(events[events.length - 1][1].end)
	  };
	  label = {
	    type: 'label',
	    start: shallow(events[open][1].start),
	    end: shallow(events[close][1].end)
	  };
	  text = {
	    type: 'labelText',
	    start: shallow(events[open + offset + 2][1].end),
	    end: shallow(events[close - 2][1].start)
	  };
	  media = [
	    ['enter', group, context],
	    ['enter', label, context]
	  ];
	  media = chunkedPush(media, events.slice(open + 1, open + offset + 3));
	  media = chunkedPush(media, [['enter', text, context]]);
	  media = chunkedPush(
	    media,
	    resolveAll(
	      context.parser.constructs.insideSpan.null,
	      events.slice(open + offset + 4, close - 3),
	      context
	    )
	  );
	  media = chunkedPush(media, [
	    ['exit', text, context],
	    events[close - 2],
	    events[close - 1],
	    ['exit', label, context]
	  ]);
	  media = chunkedPush(media, events.slice(close + 1));
	  media = chunkedPush(media, [['exit', group, context]]);
	  chunkedSplice(events, open, events.length, media);
	  return events
	}
	function tokenizeLabelEnd(effects, ok, nok) {
	  var self = this;
	  var index = self.events.length;
	  var labelStart;
	  var defined;
	  while (index--) {
	    if (
	      (self.events[index][1].type === 'labelImage' ||
	        self.events[index][1].type === 'labelLink') &&
	      !self.events[index][1]._balanced
	    ) {
	      labelStart = self.events[index][1];
	      break
	    }
	  }
	  return start
	  function start(code) {
	    if (!labelStart) {
	      return nok(code)
	    }
	    if (labelStart._inactive) return balanced(code)
	    defined =
	      self.parser.defined.indexOf(
	        normalizeIdentifier(
	          self.sliceSerialize({
	            start: labelStart.end,
	            end: self.now()
	          })
	        )
	      ) > -1;
	    effects.enter('labelEnd');
	    effects.enter('labelMarker');
	    effects.consume(code);
	    effects.exit('labelMarker');
	    effects.exit('labelEnd');
	    return afterLabelEnd
	  }
	  function afterLabelEnd(code) {
	    if (code === 40) {
	      return effects.attempt(
	        resourceConstruct,
	        ok,
	        defined ? ok : balanced
	      )(code)
	    }
	    if (code === 91) {
	      return effects.attempt(
	        fullReferenceConstruct,
	        ok,
	        defined
	          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
	          : balanced
	      )(code)
	    }
	    return defined ? ok(code) : balanced(code)
	  }
	  function balanced(code) {
	    labelStart._balanced = true;
	    return nok(code)
	  }
	}
	function tokenizeResource(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('resource');
	    effects.enter('resourceMarker');
	    effects.consume(code);
	    effects.exit('resourceMarker');
	    return factoryWhitespace(effects, open)
	  }
	  function open(code) {
	    if (code === 41) {
	      return end(code)
	    }
	    return factoryDestination(
	      effects,
	      destinationAfter,
	      nok,
	      'resourceDestination',
	      'resourceDestinationLiteral',
	      'resourceDestinationLiteralMarker',
	      'resourceDestinationRaw',
	      'resourceDestinationString',
	      3
	    )(code)
	  }
	  function destinationAfter(code) {
	    return markdownLineEndingOrSpace(code)
	      ? factoryWhitespace(effects, between)(code)
	      : end(code)
	  }
	  function between(code) {
	    if (code === 34 || code === 39 || code === 40) {
	      return factoryTitle(
	        effects,
	        factoryWhitespace(effects, end),
	        nok,
	        'resourceTitle',
	        'resourceTitleMarker',
	        'resourceTitleString'
	      )(code)
	    }
	    return end(code)
	  }
	  function end(code) {
	    if (code === 41) {
	      effects.enter('resourceMarker');
	      effects.consume(code);
	      effects.exit('resourceMarker');
	      effects.exit('resource');
	      return ok
	    }
	    return nok(code)
	  }
	}
	function tokenizeFullReference(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    return factoryLabel.call(
	      self,
	      effects,
	      afterLabel,
	      nok,
	      'reference',
	      'referenceMarker',
	      'referenceString'
	    )(code)
	  }
	  function afterLabel(code) {
	    return self.parser.defined.indexOf(
	      normalizeIdentifier(
	        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
	      )
	    ) < 0
	      ? nok(code)
	      : ok(code)
	  }
	}
	function tokenizeCollapsedReference(effects, ok, nok) {
	  return start
	  function start(code) {
	    effects.enter('reference');
	    effects.enter('referenceMarker');
	    effects.consume(code);
	    effects.exit('referenceMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 93) {
	      effects.enter('referenceMarker');
	      effects.consume(code);
	      effects.exit('referenceMarker');
	      effects.exit('reference');
	      return ok
	    }
	    return nok(code)
	  }
	}
	labelEnd_1 = labelEnd;
	return labelEnd_1;
}

var labelStartImage_1;
var hasRequiredLabelStartImage;

function requireLabelStartImage () {
	if (hasRequiredLabelStartImage) return labelStartImage_1;
	hasRequiredLabelStartImage = 1;
	var labelEnd = requireLabelEnd();
	var labelStartImage = {
	  name: 'labelStartImage',
	  tokenize: tokenizeLabelStartImage,
	  resolveAll: labelEnd.resolveAll
	};
	function tokenizeLabelStartImage(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    effects.enter('labelImage');
	    effects.enter('labelImageMarker');
	    effects.consume(code);
	    effects.exit('labelImageMarker');
	    return open
	  }
	  function open(code) {
	    if (code === 91) {
	      effects.enter('labelMarker');
	      effects.consume(code);
	      effects.exit('labelMarker');
	      effects.exit('labelImage');
	      return after
	    }
	    return nok(code)
	  }
	  function after(code) {
	    return code === 94 &&
	      '_hiddenFootnoteSupport' in self.parser.constructs
	      ?
	        nok(code)
	      : ok(code)
	  }
	}
	labelStartImage_1 = labelStartImage;
	return labelStartImage_1;
}

var labelStartLink_1;
var hasRequiredLabelStartLink;

function requireLabelStartLink () {
	if (hasRequiredLabelStartLink) return labelStartLink_1;
	hasRequiredLabelStartLink = 1;
	var labelEnd = requireLabelEnd();
	var labelStartLink = {
	  name: 'labelStartLink',
	  tokenize: tokenizeLabelStartLink,
	  resolveAll: labelEnd.resolveAll
	};
	function tokenizeLabelStartLink(effects, ok, nok) {
	  var self = this;
	  return start
	  function start(code) {
	    effects.enter('labelLink');
	    effects.enter('labelMarker');
	    effects.consume(code);
	    effects.exit('labelMarker');
	    effects.exit('labelLink');
	    return after
	  }
	  function after(code) {
	    return code === 94 &&
	      '_hiddenFootnoteSupport' in self.parser.constructs
	      ?
	        nok(code)
	      : ok(code)
	  }
	}
	labelStartLink_1 = labelStartLink;
	return labelStartLink_1;
}

var lineEnding_1;
var hasRequiredLineEnding;

function requireLineEnding () {
	if (hasRequiredLineEnding) return lineEnding_1;
	hasRequiredLineEnding = 1;
	var factorySpace = requireFactorySpace();
	var lineEnding = {
	  name: 'lineEnding',
	  tokenize: tokenizeLineEnding
	};
	function tokenizeLineEnding(effects, ok) {
	  return start
	  function start(code) {
	    effects.enter('lineEnding');
	    effects.consume(code);
	    effects.exit('lineEnding');
	    return factorySpace(effects, ok, 'linePrefix')
	  }
	}
	lineEnding_1 = lineEnding;
	return lineEnding_1;
}

var thematicBreak_1$1;
var hasRequiredThematicBreak$1;

function requireThematicBreak$1 () {
	if (hasRequiredThematicBreak$1) return thematicBreak_1$1;
	hasRequiredThematicBreak$1 = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var markdownSpace = requireMarkdownSpace();
	var factorySpace = requireFactorySpace();
	var thematicBreak = {
	  name: 'thematicBreak',
	  tokenize: tokenizeThematicBreak
	};
	function tokenizeThematicBreak(effects, ok, nok) {
	  var size = 0;
	  var marker;
	  return start
	  function start(code) {
	    effects.enter('thematicBreak');
	    marker = code;
	    return atBreak(code)
	  }
	  function atBreak(code) {
	    if (code === marker) {
	      effects.enter('thematicBreakSequence');
	      return sequence(code)
	    }
	    if (markdownSpace(code)) {
	      return factorySpace(effects, atBreak, 'whitespace')(code)
	    }
	    if (size < 3 || (code !== null && !markdownLineEnding(code))) {
	      return nok(code)
	    }
	    effects.exit('thematicBreak');
	    return ok(code)
	  }
	  function sequence(code) {
	    if (code === marker) {
	      effects.consume(code);
	      size++;
	      return sequence
	    }
	    effects.exit('thematicBreakSequence');
	    return atBreak(code)
	  }
	}
	thematicBreak_1$1 = thematicBreak;
	return thematicBreak_1$1;
}

var list_1$1;
var hasRequiredList$1;

function requireList$1 () {
	if (hasRequiredList$1) return list_1$1;
	hasRequiredList$1 = 1;
	var asciiDigit = requireAsciiDigit();
	var markdownSpace = requireMarkdownSpace();
	var prefixSize = requirePrefixSize();
	var sizeChunks = requireSizeChunks();
	var factorySpace = requireFactorySpace();
	var partialBlankLine = requirePartialBlankLine();
	var thematicBreak = requireThematicBreak$1();
	var list = {
	  name: 'list',
	  tokenize: tokenizeListStart,
	  continuation: {
	    tokenize: tokenizeListContinuation
	  },
	  exit: tokenizeListEnd
	};
	var listItemPrefixWhitespaceConstruct = {
	  tokenize: tokenizeListItemPrefixWhitespace,
	  partial: true
	};
	var indentConstruct = {
	  tokenize: tokenizeIndent,
	  partial: true
	};
	function tokenizeListStart(effects, ok, nok) {
	  var self = this;
	  var initialSize = prefixSize(self.events, 'linePrefix');
	  var size = 0;
	  return start
	  function start(code) {
	    var kind =
	      self.containerState.type ||
	      (code === 42 || code === 43 || code === 45
	        ? 'listUnordered'
	        : 'listOrdered');
	    if (
	      kind === 'listUnordered'
	        ? !self.containerState.marker || code === self.containerState.marker
	        : asciiDigit(code)
	    ) {
	      if (!self.containerState.type) {
	        self.containerState.type = kind;
	        effects.enter(kind, {
	          _container: true
	        });
	      }
	      if (kind === 'listUnordered') {
	        effects.enter('listItemPrefix');
	        return code === 42 || code === 45
	          ? effects.check(thematicBreak, nok, atMarker)(code)
	          : atMarker(code)
	      }
	      if (!self.interrupt || code === 49) {
	        effects.enter('listItemPrefix');
	        effects.enter('listItemValue');
	        return inside(code)
	      }
	    }
	    return nok(code)
	  }
	  function inside(code) {
	    if (asciiDigit(code) && ++size < 10) {
	      effects.consume(code);
	      return inside
	    }
	    if (
	      (!self.interrupt || size < 2) &&
	      (self.containerState.marker
	        ? code === self.containerState.marker
	        : code === 41 || code === 46)
	    ) {
	      effects.exit('listItemValue');
	      return atMarker(code)
	    }
	    return nok(code)
	  }
	  function atMarker(code) {
	    effects.enter('listItemMarker');
	    effects.consume(code);
	    effects.exit('listItemMarker');
	    self.containerState.marker = self.containerState.marker || code;
	    return effects.check(
	      partialBlankLine,
	      self.interrupt ? nok : onBlank,
	      effects.attempt(
	        listItemPrefixWhitespaceConstruct,
	        endOfPrefix,
	        otherPrefix
	      )
	    )
	  }
	  function onBlank(code) {
	    self.containerState.initialBlankLine = true;
	    initialSize++;
	    return endOfPrefix(code)
	  }
	  function otherPrefix(code) {
	    if (markdownSpace(code)) {
	      effects.enter('listItemPrefixWhitespace');
	      effects.consume(code);
	      effects.exit('listItemPrefixWhitespace');
	      return endOfPrefix
	    }
	    return nok(code)
	  }
	  function endOfPrefix(code) {
	    self.containerState.size =
	      initialSize + sizeChunks(self.sliceStream(effects.exit('listItemPrefix')));
	    return ok(code)
	  }
	}
	function tokenizeListContinuation(effects, ok, nok) {
	  var self = this;
	  self.containerState._closeFlow = undefined;
	  return effects.check(partialBlankLine, onBlank, notBlank)
	  function onBlank(code) {
	    self.containerState.furtherBlankLines =
	      self.containerState.furtherBlankLines ||
	      self.containerState.initialBlankLine;
	    return factorySpace(
	      effects,
	      ok,
	      'listItemIndent',
	      self.containerState.size + 1
	    )(code)
	  }
	  function notBlank(code) {
	    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
	      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
	      return notInCurrentItem(code)
	    }
	    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
	    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
	  }
	  function notInCurrentItem(code) {
	    self.containerState._closeFlow = true;
	    self.interrupt = undefined;
	    return factorySpace(
	      effects,
	      effects.attempt(list, ok, nok),
	      'linePrefix',
	      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	        ? undefined
	        : 4
	    )(code)
	  }
	}
	function tokenizeIndent(effects, ok, nok) {
	  var self = this;
	  return factorySpace(
	    effects,
	    afterPrefix,
	    'listItemIndent',
	    self.containerState.size + 1
	  )
	  function afterPrefix(code) {
	    return prefixSize(self.events, 'listItemIndent') ===
	      self.containerState.size
	      ? ok(code)
	      : nok(code)
	  }
	}
	function tokenizeListEnd(effects) {
	  effects.exit(this.containerState.type);
	}
	function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
	  var self = this;
	  return factorySpace(
	    effects,
	    afterPrefix,
	    'listItemPrefixWhitespace',
	    self.parser.constructs.disable.null.indexOf('codeIndented') > -1
	      ? undefined
	      : 4 + 1
	  )
	  function afterPrefix(code) {
	    return markdownSpace(code) ||
	      !prefixSize(self.events, 'listItemPrefixWhitespace')
	      ? nok(code)
	      : ok(code)
	  }
	}
	list_1$1 = list;
	return list_1$1;
}

var setextUnderline_1;
var hasRequiredSetextUnderline;

function requireSetextUnderline () {
	if (hasRequiredSetextUnderline) return setextUnderline_1;
	hasRequiredSetextUnderline = 1;
	var markdownLineEnding = requireMarkdownLineEnding();
	var shallow = requireShallow();
	var factorySpace = requireFactorySpace();
	var setextUnderline = {
	  name: 'setextUnderline',
	  tokenize: tokenizeSetextUnderline,
	  resolveTo: resolveToSetextUnderline
	};
	function resolveToSetextUnderline(events, context) {
	  var index = events.length;
	  var content;
	  var text;
	  var definition;
	  var heading;
	  while (index--) {
	    if (events[index][0] === 'enter') {
	      if (events[index][1].type === 'content') {
	        content = index;
	        break
	      }
	      if (events[index][1].type === 'paragraph') {
	        text = index;
	      }
	    }
	    else {
	      if (events[index][1].type === 'content') {
	        events.splice(index, 1);
	      }
	      if (!definition && events[index][1].type === 'definition') {
	        definition = index;
	      }
	    }
	  }
	  heading = {
	    type: 'setextHeading',
	    start: shallow(events[text][1].start),
	    end: shallow(events[events.length - 1][1].end)
	  };
	  events[text][1].type = 'setextHeadingText';
	  if (definition) {
	    events.splice(text, 0, ['enter', heading, context]);
	    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
	    events[content][1].end = shallow(events[definition][1].end);
	  } else {
	    events[content][1] = heading;
	  }
	  events.push(['exit', heading, context]);
	  return events
	}
	function tokenizeSetextUnderline(effects, ok, nok) {
	  var self = this;
	  var index = self.events.length;
	  var marker;
	  var paragraph;
	  while (index--) {
	    if (
	      self.events[index][1].type !== 'lineEnding' &&
	      self.events[index][1].type !== 'linePrefix' &&
	      self.events[index][1].type !== 'content'
	    ) {
	      paragraph = self.events[index][1].type === 'paragraph';
	      break
	    }
	  }
	  return start
	  function start(code) {
	    if (!self.lazy && (self.interrupt || paragraph)) {
	      effects.enter('setextHeadingLine');
	      effects.enter('setextHeadingLineSequence');
	      marker = code;
	      return closingSequence(code)
	    }
	    return nok(code)
	  }
	  function closingSequence(code) {
	    if (code === marker) {
	      effects.consume(code);
	      return closingSequence
	    }
	    effects.exit('setextHeadingLineSequence');
	    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
	  }
	  function closingSequenceEnd(code) {
	    if (code === null || markdownLineEnding(code)) {
	      effects.exit('setextHeadingLine');
	      return ok(code)
	    }
	    return nok(code)
	  }
	}
	setextUnderline_1 = setextUnderline;
	return setextUnderline_1;
}

var hasRequiredConstructs;

function requireConstructs () {
	if (hasRequiredConstructs) return constructs;
	hasRequiredConstructs = 1;
	Object.defineProperty(constructs, '__esModule', {value: true});
	var text$1 = requireText$1();
	var attention = requireAttention();
	var autolink = requireAutolink();
	var blockQuote = requireBlockQuote();
	var characterEscape = requireCharacterEscape();
	var characterReference = requireCharacterReference();
	var codeFenced = requireCodeFenced();
	var codeIndented = requireCodeIndented();
	var codeText = requireCodeText();
	var definition = requireDefinition$1();
	var hardBreakEscape = requireHardBreakEscape();
	var headingAtx = requireHeadingAtx();
	var htmlFlow = requireHtmlFlow();
	var htmlText = requireHtmlText();
	var labelEnd = requireLabelEnd();
	var labelStartImage = requireLabelStartImage();
	var labelStartLink = requireLabelStartLink();
	var lineEnding = requireLineEnding();
	var list = requireList$1();
	var setextUnderline = requireSetextUnderline();
	var thematicBreak = requireThematicBreak$1();
	var document = {
	  42: list,
	  43: list,
	  45: list,
	  48: list,
	  49: list,
	  50: list,
	  51: list,
	  52: list,
	  53: list,
	  54: list,
	  55: list,
	  56: list,
	  57: list,
	  62: blockQuote
	};
	var contentInitial = {
	  91: definition
	};
	var flowInitial = {
	  '-2': codeIndented,
	  '-1': codeIndented,
	  32: codeIndented
	};
	var flow = {
	  35: headingAtx,
	  42: thematicBreak,
	  45: [setextUnderline, thematicBreak],
	  60: htmlFlow,
	  61: setextUnderline,
	  95: thematicBreak,
	  96: codeFenced,
	  126: codeFenced
	};
	var string = {
	  38: characterReference,
	  92: characterEscape
	};
	var text = {
	  '-5': lineEnding,
	  '-4': lineEnding,
	  '-3': lineEnding,
	  33: labelStartImage,
	  38: characterReference,
	  42: attention,
	  60: [autolink, htmlText],
	  91: labelStartLink,
	  92: [hardBreakEscape, characterEscape],
	  93: labelEnd,
	  95: attention,
	  96: codeText
	};
	var insideSpan = {
	  null: [attention, text$1.resolver]
	};
	var disable = {
	  null: []
	};
	constructs.contentInitial = contentInitial;
	constructs.disable = disable;
	constructs.document = document;
	constructs.flow = flow;
	constructs.flowInitial = flowInitial;
	constructs.insideSpan = insideSpan;
	constructs.string = string;
	constructs.text = text;
	return constructs;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;
	var content = requireContent$1();
	var document = requireDocument();
	var flow = requireFlow();
	var text = requireText$1();
	var combineExtensions = requireCombineExtensions();
	var createTokenizer = requireCreateTokenizer();
	var miniflat = requireMiniflat();
	var constructs = requireConstructs();
	function parse(options) {
	  var settings = options || {};
	  var parser = {
	    defined: [],
	    constructs: combineExtensions(
	      [constructs].concat(miniflat(settings.extensions))
	    ),
	    content: create(content),
	    document: create(document),
	    flow: create(flow),
	    string: create(text.string),
	    text: create(text.text)
	  };
	  return parser
	  function create(initializer) {
	    return creator
	    function creator(from) {
	      return createTokenizer(parser, initializer, from)
	    }
	  }
	}
	parse_1 = parse;
	return parse_1;
}

var preprocess_1;
var hasRequiredPreprocess;

function requirePreprocess () {
	if (hasRequiredPreprocess) return preprocess_1;
	hasRequiredPreprocess = 1;
	var search = /[\0\t\n\r]/g;
	function preprocess() {
	  var start = true;
	  var column = 1;
	  var buffer = '';
	  var atCarriageReturn;
	  return preprocessor
	  function preprocessor(value, encoding, end) {
	    var chunks = [];
	    var match;
	    var next;
	    var startPosition;
	    var endPosition;
	    var code;
	    value = buffer + value.toString(encoding);
	    startPosition = 0;
	    buffer = '';
	    if (start) {
	      if (value.charCodeAt(0) === 65279) {
	        startPosition++;
	      }
	      start = undefined;
	    }
	    while (startPosition < value.length) {
	      search.lastIndex = startPosition;
	      match = search.exec(value);
	      endPosition = match ? match.index : value.length;
	      code = value.charCodeAt(endPosition);
	      if (!match) {
	        buffer = value.slice(startPosition);
	        break
	      }
	      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
	        chunks.push(-3);
	        atCarriageReturn = undefined;
	      } else {
	        if (atCarriageReturn) {
	          chunks.push(-5);
	          atCarriageReturn = undefined;
	        }
	        if (startPosition < endPosition) {
	          chunks.push(value.slice(startPosition, endPosition));
	          column += endPosition - startPosition;
	        }
	        if (code === 0) {
	          chunks.push(65533);
	          column++;
	        } else if (code === 9) {
	          next = Math.ceil(column / 4) * 4;
	          chunks.push(-2);
	          while (column++ < next) chunks.push(-1);
	        } else if (code === 10) {
	          chunks.push(-4);
	          column = 1;
	        }
	        else {
	          atCarriageReturn = true;
	          column = 1;
	        }
	      }
	      startPosition = endPosition + 1;
	    }
	    if (end) {
	      if (atCarriageReturn) chunks.push(-5);
	      if (buffer) chunks.push(buffer);
	      chunks.push(null);
	    }
	    return chunks
	  }
	}
	preprocess_1 = preprocess;
	return preprocess_1;
}

var postprocess_1;
var hasRequiredPostprocess;

function requirePostprocess () {
	if (hasRequiredPostprocess) return postprocess_1;
	hasRequiredPostprocess = 1;
	var subtokenize = requireSubtokenize();
	function postprocess(events) {
	  while (!subtokenize(events)) {
	  }
	  return events
	}
	postprocess_1 = postprocess;
	return postprocess_1;
}

var unistUtilStringifyPosition;
var hasRequiredUnistUtilStringifyPosition;

function requireUnistUtilStringifyPosition () {
	if (hasRequiredUnistUtilStringifyPosition) return unistUtilStringifyPosition;
	hasRequiredUnistUtilStringifyPosition = 1;
	var own = {}.hasOwnProperty;
	unistUtilStringifyPosition = stringify;
	function stringify(value) {
	  if (!value || typeof value !== 'object') {
	    return ''
	  }
	  if (own.call(value, 'position') || own.call(value, 'type')) {
	    return position(value.position)
	  }
	  if (own.call(value, 'start') || own.call(value, 'end')) {
	    return position(value)
	  }
	  if (own.call(value, 'line') || own.call(value, 'column')) {
	    return point(value)
	  }
	  return ''
	}
	function point(point) {
	  if (!point || typeof point !== 'object') {
	    point = {};
	  }
	  return index(point.line) + ':' + index(point.column)
	}
	function position(pos) {
	  if (!pos || typeof pos !== 'object') {
	    pos = {};
	  }
	  return point(pos.start) + '-' + point(pos.end)
	}
	function index(value) {
	  return value && typeof value === 'number' ? value : 1
	}
	return unistUtilStringifyPosition;
}

var dist;
var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	dist = fromMarkdown;
	var toString = requireMdastUtilToString();
	var assign = requireAssign();
	var own = requireHasOwnProperty();
	var normalizeIdentifier = requireNormalizeIdentifier();
	var safeFromInt = requireSafeFromInt();
	var parser = requireParse();
	var preprocessor = requirePreprocess();
	var postprocess = requirePostprocess();
	var decode = requireDecodeEntity_browser();
	var stringifyPosition = requireUnistUtilStringifyPosition();
	function fromMarkdown(value, encoding, options) {
	  if (typeof encoding !== 'string') {
	    options = encoding;
	    encoding = undefined;
	  }
	  return compiler(options)(
	    postprocess(
	      parser(options).document().write(preprocessor()(value, encoding, true))
	    )
	  )
	}
	function compiler(options) {
	  var settings = options || {};
	  var config = configure(
	    {
	      transforms: [],
	      canContainEols: [
	        'emphasis',
	        'fragment',
	        'heading',
	        'paragraph',
	        'strong'
	      ],
	      enter: {
	        autolink: opener(link),
	        autolinkProtocol: onenterdata,
	        autolinkEmail: onenterdata,
	        atxHeading: opener(heading),
	        blockQuote: opener(blockQuote),
	        characterEscape: onenterdata,
	        characterReference: onenterdata,
	        codeFenced: opener(codeFlow),
	        codeFencedFenceInfo: buffer,
	        codeFencedFenceMeta: buffer,
	        codeIndented: opener(codeFlow, buffer),
	        codeText: opener(codeText, buffer),
	        codeTextData: onenterdata,
	        data: onenterdata,
	        codeFlowValue: onenterdata,
	        definition: opener(definition),
	        definitionDestinationString: buffer,
	        definitionLabelString: buffer,
	        definitionTitleString: buffer,
	        emphasis: opener(emphasis),
	        hardBreakEscape: opener(hardBreak),
	        hardBreakTrailing: opener(hardBreak),
	        htmlFlow: opener(html, buffer),
	        htmlFlowData: onenterdata,
	        htmlText: opener(html, buffer),
	        htmlTextData: onenterdata,
	        image: opener(image),
	        label: buffer,
	        link: opener(link),
	        listItem: opener(listItem),
	        listItemValue: onenterlistitemvalue,
	        listOrdered: opener(list, onenterlistordered),
	        listUnordered: opener(list),
	        paragraph: opener(paragraph),
	        reference: onenterreference,
	        referenceString: buffer,
	        resourceDestinationString: buffer,
	        resourceTitleString: buffer,
	        setextHeading: opener(heading),
	        strong: opener(strong),
	        thematicBreak: opener(thematicBreak)
	      },
	      exit: {
	        atxHeading: closer(),
	        atxHeadingSequence: onexitatxheadingsequence,
	        autolink: closer(),
	        autolinkEmail: onexitautolinkemail,
	        autolinkProtocol: onexitautolinkprotocol,
	        blockQuote: closer(),
	        characterEscapeValue: onexitdata,
	        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
	        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
	        characterReferenceValue: onexitcharacterreferencevalue,
	        codeFenced: closer(onexitcodefenced),
	        codeFencedFence: onexitcodefencedfence,
	        codeFencedFenceInfo: onexitcodefencedfenceinfo,
	        codeFencedFenceMeta: onexitcodefencedfencemeta,
	        codeFlowValue: onexitdata,
	        codeIndented: closer(onexitcodeindented),
	        codeText: closer(onexitcodetext),
	        codeTextData: onexitdata,
	        data: onexitdata,
	        definition: closer(),
	        definitionDestinationString: onexitdefinitiondestinationstring,
	        definitionLabelString: onexitdefinitionlabelstring,
	        definitionTitleString: onexitdefinitiontitlestring,
	        emphasis: closer(),
	        hardBreakEscape: closer(onexithardbreak),
	        hardBreakTrailing: closer(onexithardbreak),
	        htmlFlow: closer(onexithtmlflow),
	        htmlFlowData: onexitdata,
	        htmlText: closer(onexithtmltext),
	        htmlTextData: onexitdata,
	        image: closer(onexitimage),
	        label: onexitlabel,
	        labelText: onexitlabeltext,
	        lineEnding: onexitlineending,
	        link: closer(onexitlink),
	        listItem: closer(),
	        listOrdered: closer(),
	        listUnordered: closer(),
	        paragraph: closer(),
	        referenceString: onexitreferencestring,
	        resourceDestinationString: onexitresourcedestinationstring,
	        resourceTitleString: onexitresourcetitlestring,
	        resource: onexitresource,
	        setextHeading: closer(onexitsetextheading),
	        setextHeadingLineSequence: onexitsetextheadinglinesequence,
	        setextHeadingText: onexitsetextheadingtext,
	        strong: closer(),
	        thematicBreak: closer()
	      }
	    },
	    settings.mdastExtensions || []
	  );
	  var data = {};
	  return compile
	  function compile(events) {
	    var tree = {type: 'root', children: []};
	    var stack = [tree];
	    var tokenStack = [];
	    var listStack = [];
	    var index = -1;
	    var handler;
	    var listStart;
	    var context = {
	      stack: stack,
	      tokenStack: tokenStack,
	      config: config,
	      enter: enter,
	      exit: exit,
	      buffer: buffer,
	      resume: resume,
	      setData: setData,
	      getData: getData
	    };
	    while (++index < events.length) {
	      if (
	        events[index][1].type === 'listOrdered' ||
	        events[index][1].type === 'listUnordered'
	      ) {
	        if (events[index][0] === 'enter') {
	          listStack.push(index);
	        } else {
	          listStart = listStack.pop(index);
	          index = prepareList(events, listStart, index);
	        }
	      }
	    }
	    index = -1;
	    while (++index < events.length) {
	      handler = config[events[index][0]];
	      if (own.call(handler, events[index][1].type)) {
	        handler[events[index][1].type].call(
	          assign({sliceSerialize: events[index][2].sliceSerialize}, context),
	          events[index][1]
	        );
	      }
	    }
	    if (tokenStack.length) {
	      throw new Error(
	        'Cannot close document, a token (`' +
	          tokenStack[tokenStack.length - 1].type +
	          '`, ' +
	          stringifyPosition({
	            start: tokenStack[tokenStack.length - 1].start,
	            end: tokenStack[tokenStack.length - 1].end
	          }) +
	          ') is still open'
	      )
	    }
	    tree.position = {
	      start: point(
	        events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}
	      ),
	      end: point(
	        events.length
	          ? events[events.length - 2][1].end
	          : {line: 1, column: 1, offset: 0}
	      )
	    };
	    index = -1;
	    while (++index < config.transforms.length) {
	      tree = config.transforms[index](tree) || tree;
	    }
	    return tree
	  }
	  function prepareList(events, start, length) {
	    var index = start - 1;
	    var containerBalance = -1;
	    var listSpread = false;
	    var listItem;
	    var tailIndex;
	    var lineIndex;
	    var tailEvent;
	    var event;
	    var firstBlankLineIndex;
	    var atMarker;
	    while (++index <= length) {
	      event = events[index];
	      if (
	        event[1].type === 'listUnordered' ||
	        event[1].type === 'listOrdered' ||
	        event[1].type === 'blockQuote'
	      ) {
	        if (event[0] === 'enter') {
	          containerBalance++;
	        } else {
	          containerBalance--;
	        }
	        atMarker = undefined;
	      } else if (event[1].type === 'lineEndingBlank') {
	        if (event[0] === 'enter') {
	          if (
	            listItem &&
	            !atMarker &&
	            !containerBalance &&
	            !firstBlankLineIndex
	          ) {
	            firstBlankLineIndex = index;
	          }
	          atMarker = undefined;
	        }
	      } else if (
	        event[1].type === 'linePrefix' ||
	        event[1].type === 'listItemValue' ||
	        event[1].type === 'listItemMarker' ||
	        event[1].type === 'listItemPrefix' ||
	        event[1].type === 'listItemPrefixWhitespace'
	      ) ; else {
	        atMarker = undefined;
	      }
	      if (
	        (!containerBalance &&
	          event[0] === 'enter' &&
	          event[1].type === 'listItemPrefix') ||
	        (containerBalance === -1 &&
	          event[0] === 'exit' &&
	          (event[1].type === 'listUnordered' ||
	            event[1].type === 'listOrdered'))
	      ) {
	        if (listItem) {
	          tailIndex = index;
	          lineIndex = undefined;
	          while (tailIndex--) {
	            tailEvent = events[tailIndex];
	            if (
	              tailEvent[1].type === 'lineEnding' ||
	              tailEvent[1].type === 'lineEndingBlank'
	            ) {
	              if (tailEvent[0] === 'exit') continue
	              if (lineIndex) {
	                events[lineIndex][1].type = 'lineEndingBlank';
	                listSpread = true;
	              }
	              tailEvent[1].type = 'lineEnding';
	              lineIndex = tailIndex;
	            } else if (
	              tailEvent[1].type === 'linePrefix' ||
	              tailEvent[1].type === 'blockQuotePrefix' ||
	              tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
	              tailEvent[1].type === 'blockQuoteMarker' ||
	              tailEvent[1].type === 'listItemIndent'
	            ) ; else {
	              break
	            }
	          }
	          if (
	            firstBlankLineIndex &&
	            (!lineIndex || firstBlankLineIndex < lineIndex)
	          ) {
	            listItem._spread = true;
	          }
	          listItem.end = point(
	            lineIndex ? events[lineIndex][1].start : event[1].end
	          );
	          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
	          index++;
	          length++;
	        }
	        if (event[1].type === 'listItemPrefix') {
	          listItem = {
	            type: 'listItem',
	            _spread: false,
	            start: point(event[1].start)
	          };
	          events.splice(index, 0, ['enter', listItem, event[2]]);
	          index++;
	          length++;
	          firstBlankLineIndex = undefined;
	          atMarker = true;
	        }
	      }
	    }
	    events[start][1]._spread = listSpread;
	    return length
	  }
	  function setData(key, value) {
	    data[key] = value;
	  }
	  function getData(key) {
	    return data[key]
	  }
	  function point(d) {
	    return {line: d.line, column: d.column, offset: d.offset}
	  }
	  function opener(create, and) {
	    return open
	    function open(token) {
	      enter.call(this, create(token), token);
	      if (and) and.call(this, token);
	    }
	  }
	  function buffer() {
	    this.stack.push({type: 'fragment', children: []});
	  }
	  function enter(node, token) {
	    this.stack[this.stack.length - 1].children.push(node);
	    this.stack.push(node);
	    this.tokenStack.push(token);
	    node.position = {start: point(token.start)};
	    return node
	  }
	  function closer(and) {
	    return close
	    function close(token) {
	      if (and) and.call(this, token);
	      exit.call(this, token);
	    }
	  }
	  function exit(token) {
	    var node = this.stack.pop();
	    var open = this.tokenStack.pop();
	    if (!open) {
	      throw new Error(
	        'Cannot close `' +
	          token.type +
	          '` (' +
	          stringifyPosition({start: token.start, end: token.end}) +
	          '): it’s not open'
	      )
	    } else if (open.type !== token.type) {
	      throw new Error(
	        'Cannot close `' +
	          token.type +
	          '` (' +
	          stringifyPosition({start: token.start, end: token.end}) +
	          '): a different token (`' +
	          open.type +
	          '`, ' +
	          stringifyPosition({start: open.start, end: open.end}) +
	          ') is open'
	      )
	    }
	    node.position.end = point(token.end);
	    return node
	  }
	  function resume() {
	    return toString(this.stack.pop())
	  }
	  function onenterlistordered() {
	    setData('expectingFirstListItemValue', true);
	  }
	  function onenterlistitemvalue(token) {
	    if (getData('expectingFirstListItemValue')) {
	      this.stack[this.stack.length - 2].start = parseInt(
	        this.sliceSerialize(token),
	        10
	      );
	      setData('expectingFirstListItemValue');
	    }
	  }
	  function onexitcodefencedfenceinfo() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].lang = data;
	  }
	  function onexitcodefencedfencemeta() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].meta = data;
	  }
	  function onexitcodefencedfence() {
	    if (getData('flowCodeInside')) return
	    this.buffer();
	    setData('flowCodeInside', true);
	  }
	  function onexitcodefenced() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data.replace(
	      /^(\r?\n|\r)|(\r?\n|\r)$/g,
	      ''
	    );
	    setData('flowCodeInside');
	  }
	  function onexitcodeindented() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitdefinitionlabelstring(token) {
	    var label = this.resume();
	    this.stack[this.stack.length - 1].label = label;
	    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	  }
	  function onexitdefinitiontitlestring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].title = data;
	  }
	  function onexitdefinitiondestinationstring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].url = data;
	  }
	  function onexitatxheadingsequence(token) {
	    if (!this.stack[this.stack.length - 1].depth) {
	      this.stack[this.stack.length - 1].depth = this.sliceSerialize(
	        token
	      ).length;
	    }
	  }
	  function onexitsetextheadingtext() {
	    setData('setextHeadingSlurpLineEnding', true);
	  }
	  function onexitsetextheadinglinesequence(token) {
	    this.stack[this.stack.length - 1].depth =
	      this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
	  }
	  function onexitsetextheading() {
	    setData('setextHeadingSlurpLineEnding');
	  }
	  function onenterdata(token) {
	    var siblings = this.stack[this.stack.length - 1].children;
	    var tail = siblings[siblings.length - 1];
	    if (!tail || tail.type !== 'text') {
	      tail = text();
	      tail.position = {start: point(token.start)};
	      this.stack[this.stack.length - 1].children.push(tail);
	    }
	    this.stack.push(tail);
	  }
	  function onexitdata(token) {
	    var tail = this.stack.pop();
	    tail.value += this.sliceSerialize(token);
	    tail.position.end = point(token.end);
	  }
	  function onexitlineending(token) {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('atHardBreak')) {
	      context.children[context.children.length - 1].position.end = point(
	        token.end
	      );
	      setData('atHardBreak');
	      return
	    }
	    if (
	      !getData('setextHeadingSlurpLineEnding') &&
	      config.canContainEols.indexOf(context.type) > -1
	    ) {
	      onenterdata.call(this, token);
	      onexitdata.call(this, token);
	    }
	  }
	  function onexithardbreak() {
	    setData('atHardBreak', true);
	  }
	  function onexithtmlflow() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexithtmltext() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitcodetext() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].value = data;
	  }
	  function onexitlink() {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('inReference')) {
	      context.type += 'Reference';
	      context.referenceType = getData('referenceType') || 'shortcut';
	      delete context.url;
	      delete context.title;
	    } else {
	      delete context.identifier;
	      delete context.label;
	      delete context.referenceType;
	    }
	    setData('referenceType');
	  }
	  function onexitimage() {
	    var context = this.stack[this.stack.length - 1];
	    if (getData('inReference')) {
	      context.type += 'Reference';
	      context.referenceType = getData('referenceType') || 'shortcut';
	      delete context.url;
	      delete context.title;
	    } else {
	      delete context.identifier;
	      delete context.label;
	      delete context.referenceType;
	    }
	    setData('referenceType');
	  }
	  function onexitlabeltext(token) {
	    this.stack[this.stack.length - 2].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	  }
	  function onexitlabel() {
	    var fragment = this.stack[this.stack.length - 1];
	    var value = this.resume();
	    this.stack[this.stack.length - 1].label = value;
	    setData('inReference', true);
	    if (this.stack[this.stack.length - 1].type === 'link') {
	      this.stack[this.stack.length - 1].children = fragment.children;
	    } else {
	      this.stack[this.stack.length - 1].alt = value;
	    }
	  }
	  function onexitresourcedestinationstring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].url = data;
	  }
	  function onexitresourcetitlestring() {
	    var data = this.resume();
	    this.stack[this.stack.length - 1].title = data;
	  }
	  function onexitresource() {
	    setData('inReference');
	  }
	  function onenterreference() {
	    setData('referenceType', 'collapsed');
	  }
	  function onexitreferencestring(token) {
	    var label = this.resume();
	    this.stack[this.stack.length - 1].label = label;
	    this.stack[this.stack.length - 1].identifier = normalizeIdentifier(
	      this.sliceSerialize(token)
	    ).toLowerCase();
	    setData('referenceType', 'full');
	  }
	  function onexitcharacterreferencemarker(token) {
	    setData('characterReferenceType', token.type);
	  }
	  function onexitcharacterreferencevalue(token) {
	    var data = this.sliceSerialize(token);
	    var type = getData('characterReferenceType');
	    var value;
	    var tail;
	    if (type) {
	      value = safeFromInt(
	        data,
	        type === 'characterReferenceMarkerNumeric' ? 10 : 16
	      );
	      setData('characterReferenceType');
	    } else {
	      value = decode(data);
	    }
	    tail = this.stack.pop();
	    tail.value += value;
	    tail.position.end = point(token.end);
	  }
	  function onexitautolinkprotocol(token) {
	    onexitdata.call(this, token);
	    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
	  }
	  function onexitautolinkemail(token) {
	    onexitdata.call(this, token);
	    this.stack[this.stack.length - 1].url =
	      'mailto:' + this.sliceSerialize(token);
	  }
	  function blockQuote() {
	    return {type: 'blockquote', children: []}
	  }
	  function codeFlow() {
	    return {type: 'code', lang: null, meta: null, value: ''}
	  }
	  function codeText() {
	    return {type: 'inlineCode', value: ''}
	  }
	  function definition() {
	    return {
	      type: 'definition',
	      identifier: '',
	      label: null,
	      title: null,
	      url: ''
	    }
	  }
	  function emphasis() {
	    return {type: 'emphasis', children: []}
	  }
	  function heading() {
	    return {type: 'heading', depth: undefined, children: []}
	  }
	  function hardBreak() {
	    return {type: 'break'}
	  }
	  function html() {
	    return {type: 'html', value: ''}
	  }
	  function image() {
	    return {type: 'image', title: null, url: '', alt: null}
	  }
	  function link() {
	    return {type: 'link', title: null, url: '', children: []}
	  }
	  function list(token) {
	    return {
	      type: 'list',
	      ordered: token.type === 'listOrdered',
	      start: null,
	      spread: token._spread,
	      children: []
	    }
	  }
	  function listItem(token) {
	    return {
	      type: 'listItem',
	      spread: token._spread,
	      checked: null,
	      children: []
	    }
	  }
	  function paragraph() {
	    return {type: 'paragraph', children: []}
	  }
	  function strong() {
	    return {type: 'strong', children: []}
	  }
	  function text() {
	    return {type: 'text', value: ''}
	  }
	  function thematicBreak() {
	    return {type: 'thematicBreak'}
	  }
	}
	function configure(config, extensions) {
	  var index = -1;
	  while (++index < extensions.length) {
	    extension(config, extensions[index]);
	  }
	  return config
	}
	function extension(config, extension) {
	  var key;
	  var left;
	  for (key in extension) {
	    left = own.call(config, key) ? config[key] : (config[key] = {});
	    if (key === 'canContainEols' || key === 'transforms') {
	      config[key] = [].concat(left, extension[key]);
	    } else {
	      Object.assign(left, extension[key]);
	    }
	  }
	}
	return dist;
}

var mdastUtilFromMarkdown;
var hasRequiredMdastUtilFromMarkdown;

function requireMdastUtilFromMarkdown () {
	if (hasRequiredMdastUtilFromMarkdown) return mdastUtilFromMarkdown;
	hasRequiredMdastUtilFromMarkdown = 1;
	mdastUtilFromMarkdown = requireDist();
	return mdastUtilFromMarkdown;
}

var remarkParse;
var hasRequiredRemarkParse;

function requireRemarkParse () {
	if (hasRequiredRemarkParse) return remarkParse;
	hasRequiredRemarkParse = 1;
	remarkParse = parse;
	var fromMarkdown = requireMdastUtilFromMarkdown();
	function parse(options) {
	  var self = this;
	  this.Parser = parse;
	  function parse(doc) {
	    return fromMarkdown(
	      doc,
	      Object.assign({}, self.data('settings'), options, {
	        extensions: self.data('micromarkExtensions') || [],
	        mdastExtensions: self.data('fromMarkdownExtensions') || []
	      })
	    )
	  }
	}
	return remarkParse;
}

var zwitch;
var hasRequiredZwitch;

function requireZwitch () {
	if (hasRequiredZwitch) return zwitch;
	hasRequiredZwitch = 1;
	zwitch = factory;
	var noop = Function.prototype;
	var own = {}.hasOwnProperty;
	function factory(key, options) {
	  var settings = options || {};
	  function one(value) {
	    var fn = one.invalid;
	    var handlers = one.handlers;
	    if (value && own.call(value, key)) {
	      fn = own.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
	    }
	    return (fn || noop).apply(this, arguments)
	  }
	  one.handlers = settings.handlers || {};
	  one.invalid = settings.invalid;
	  one.unknown = settings.unknown;
	  return one
	}
	return zwitch;
}

var handle = {};

var blockquote_1;
var hasRequiredBlockquote;

function requireBlockquote () {
	if (hasRequiredBlockquote) return blockquote_1;
	hasRequiredBlockquote = 1;
	blockquote_1 = blockquote;
	var flow = requireContainerFlow();
	var indentLines = requireIndentLines();
	function blockquote(node, _, context) {
	  var exit = context.enter('blockquote');
	  var value = indentLines(flow(node, context), map);
	  exit();
	  return value
	}
	function map(line, index, blank) {
	  return '>' + (blank ? '' : ' ') + line
	}
	return blockquote_1;
}

var patternInScope_1;
var hasRequiredPatternInScope;

function requirePatternInScope () {
	if (hasRequiredPatternInScope) return patternInScope_1;
	hasRequiredPatternInScope = 1;
	patternInScope_1 = patternInScope;
	function patternInScope(stack, pattern) {
	  return (
	    listInScope(stack, pattern.inConstruct, true) &&
	    !listInScope(stack, pattern.notInConstruct)
	  )
	}
	function listInScope(stack, list, none) {
	  var index;
	  if (!list) {
	    return none
	  }
	  if (typeof list === 'string') {
	    list = [list];
	  }
	  index = -1;
	  while (++index < list.length) {
	    if (stack.indexOf(list[index]) !== -1) {
	      return true
	    }
	  }
	  return false
	}
	return patternInScope_1;
}

var _break;
var hasRequired_break;

function require_break () {
	if (hasRequired_break) return _break;
	hasRequired_break = 1;
	_break = hardBreak;
	var patternInScope = requirePatternInScope();
	function hardBreak(node, _, context, safe) {
	  var index = -1;
	  while (++index < context.unsafe.length) {
	    if (
	      context.unsafe[index].character === '\n' &&
	      patternInScope(context.stack, context.unsafe[index])
	    ) {
	      return /[ \t]/.test(safe.before) ? '' : ' '
	    }
	  }
	  return '\\\n'
	}
	return _break;
}

var longestStreak_1;
var hasRequiredLongestStreak;

function requireLongestStreak () {
	if (hasRequiredLongestStreak) return longestStreak_1;
	hasRequiredLongestStreak = 1;
	longestStreak_1 = longestStreak;
	function longestStreak(value, character) {
	  var count = 0;
	  var maximum = 0;
	  var expected;
	  var index;
	  if (typeof character !== 'string' || character.length !== 1) {
	    throw new Error('Expected character')
	  }
	  value = String(value);
	  index = value.indexOf(character);
	  expected = index;
	  while (index !== -1) {
	    count++;
	    if (index === expected) {
	      if (count > maximum) {
	        maximum = count;
	      }
	    } else {
	      count = 1;
	    }
	    expected = index + 1;
	    index = value.indexOf(character, expected);
	  }
	  return maximum
	}
	return longestStreak_1;
}

var formatCodeAsIndented_1;
var hasRequiredFormatCodeAsIndented;

function requireFormatCodeAsIndented () {
	if (hasRequiredFormatCodeAsIndented) return formatCodeAsIndented_1;
	hasRequiredFormatCodeAsIndented = 1;
	formatCodeAsIndented_1 = formatCodeAsIndented;
	function formatCodeAsIndented(node, context) {
	  return (
	    !context.options.fences &&
	    node.value &&
	    !node.lang &&
	    /[^ \r\n]/.test(node.value) &&
	    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value)
	  )
	}
	return formatCodeAsIndented_1;
}

var checkFence_1;
var hasRequiredCheckFence;

function requireCheckFence () {
	if (hasRequiredCheckFence) return checkFence_1;
	hasRequiredCheckFence = 1;
	checkFence_1 = checkFence;
	function checkFence(context) {
	  var marker = context.options.fence || '`';
	  if (marker !== '`' && marker !== '~') {
	    throw new Error(
	      'Cannot serialize code with `' +
	        marker +
	        '` for `options.fence`, expected `` ` `` or `~`'
	    )
	  }
	  return marker
	}
	return checkFence_1;
}

var safe_1;
var hasRequiredSafe;

function requireSafe () {
	if (hasRequiredSafe) return safe_1;
	hasRequiredSafe = 1;
	safe_1 = safe;
	var patternCompile = requirePatternCompile();
	var patternInScope = requirePatternInScope();
	function safe(context, input, config) {
	  var value = (config.before || '') + (input || '') + (config.after || '');
	  var positions = [];
	  var result = [];
	  var infos = {};
	  var index = -1;
	  var before;
	  var after;
	  var position;
	  var pattern;
	  var expression;
	  var match;
	  var start;
	  var end;
	  while (++index < context.unsafe.length) {
	    pattern = context.unsafe[index];
	    if (!patternInScope(context.stack, pattern)) {
	      continue
	    }
	    expression = patternCompile(pattern);
	    while ((match = expression.exec(value))) {
	      before = 'before' in pattern || pattern.atBreak;
	      after = 'after' in pattern;
	      position = match.index + (before ? match[1].length : 0);
	      if (positions.indexOf(position) === -1) {
	        positions.push(position);
	        infos[position] = {before: before, after: after};
	      } else {
	        if (infos[position].before && !before) {
	          infos[position].before = false;
	        }
	        if (infos[position].after && !after) {
	          infos[position].after = false;
	        }
	      }
	    }
	  }
	  positions.sort(numerical);
	  start = config.before ? config.before.length : 0;
	  end = value.length - (config.after ? config.after.length : 0);
	  index = -1;
	  while (++index < positions.length) {
	    position = positions[index];
	    if (
	      position < start ||
	      position >= end
	    ) {
	      continue
	    }
	    if (
	      position + 1 < end &&
	      positions[index + 1] === position + 1 &&
	      infos[position].after &&
	      !infos[position + 1].before &&
	      !infos[position + 1].after
	    ) {
	      continue
	    }
	    if (start !== position) {
	      result.push(escapeBackslashes(value.slice(start, position), '\\'));
	    }
	    start = position;
	    if (
	      /[!-/:-@[-`{-~]/.test(value.charAt(position)) &&
	      (!config.encode || config.encode.indexOf(value.charAt(position)) === -1)
	    ) {
	      result.push('\\');
	    } else {
	      result.push(
	        '&#x' + value.charCodeAt(position).toString(16).toUpperCase() + ';'
	      );
	      start++;
	    }
	  }
	  result.push(escapeBackslashes(value.slice(start, end), config.after));
	  return result.join('')
	}
	function numerical(a, b) {
	  return a - b
	}
	function escapeBackslashes(value, after) {
	  var expression = /\\(?=[!-/:-@[-`{-~])/g;
	  var positions = [];
	  var results = [];
	  var index = -1;
	  var start = 0;
	  var whole = value + after;
	  var match;
	  while ((match = expression.exec(whole))) {
	    positions.push(match.index);
	  }
	  while (++index < positions.length) {
	    if (start !== positions[index]) {
	      results.push(value.slice(start, positions[index]));
	    }
	    results.push('\\');
	    start = positions[index];
	  }
	  results.push(value.slice(start));
	  return results.join('')
	}
	return safe_1;
}

var code_1;
var hasRequiredCode;

function requireCode () {
	if (hasRequiredCode) return code_1;
	hasRequiredCode = 1;
	code_1 = code;
	var repeat = requireRepeatString();
	var streak = requireLongestStreak();
	var formatCodeAsIndented = requireFormatCodeAsIndented();
	var checkFence = requireCheckFence();
	var indentLines = requireIndentLines();
	var safe = requireSafe();
	function code(node, _, context) {
	  var marker = checkFence(context);
	  var raw = node.value || '';
	  var suffix = marker === '`' ? 'GraveAccent' : 'Tilde';
	  var value;
	  var sequence;
	  var exit;
	  var subexit;
	  if (formatCodeAsIndented(node, context)) {
	    exit = context.enter('codeIndented');
	    value = indentLines(raw, map);
	  } else {
	    sequence = repeat(marker, Math.max(streak(raw, marker) + 1, 3));
	    exit = context.enter('codeFenced');
	    value = sequence;
	    if (node.lang) {
	      subexit = context.enter('codeFencedLang' + suffix);
	      value += safe(context, node.lang, {
	        before: '`',
	        after: ' ',
	        encode: ['`']
	      });
	      subexit();
	    }
	    if (node.lang && node.meta) {
	      subexit = context.enter('codeFencedMeta' + suffix);
	      value +=
	        ' ' +
	        safe(context, node.meta, {
	          before: ' ',
	          after: '\n',
	          encode: ['`']
	        });
	      subexit();
	    }
	    value += '\n';
	    if (raw) {
	      value += raw + '\n';
	    }
	    value += sequence;
	  }
	  exit();
	  return value
	}
	function map(line, _, blank) {
	  return (blank ? '' : '    ') + line
	}
	return code_1;
}

var association_1;
var hasRequiredAssociation;

function requireAssociation () {
	if (hasRequiredAssociation) return association_1;
	hasRequiredAssociation = 1;
	association_1 = association;
	var decode = requireDecodeEntity_browser();
	var characterEscape = /\\([!-/:-@[-`{-~])/g;
	var characterReference = /&(#(\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	function association(node) {
	  if (node.label || !node.identifier) {
	    return node.label || ''
	  }
	  return node.identifier
	    .replace(characterEscape, '$1')
	    .replace(characterReference, decodeIfPossible)
	}
	function decodeIfPossible($0, $1) {
	  return decode($1) || $0
	}
	return association_1;
}

var checkQuote_1;
var hasRequiredCheckQuote;

function requireCheckQuote () {
	if (hasRequiredCheckQuote) return checkQuote_1;
	hasRequiredCheckQuote = 1;
	checkQuote_1 = checkQuote;
	function checkQuote(context) {
	  var marker = context.options.quote || '"';
	  if (marker !== '"' && marker !== "'") {
	    throw new Error(
	      'Cannot serialize title with `' +
	        marker +
	        '` for `options.quote`, expected `"`, or `\'`'
	    )
	  }
	  return marker
	}
	return checkQuote_1;
}

var definition_1;
var hasRequiredDefinition;

function requireDefinition () {
	if (hasRequiredDefinition) return definition_1;
	hasRequiredDefinition = 1;
	definition_1 = definition;
	var association = requireAssociation();
	var checkQuote = requireCheckQuote();
	var safe = requireSafe();
	function definition(node, _, context) {
	  var marker = checkQuote(context);
	  var suffix = marker === '"' ? 'Quote' : 'Apostrophe';
	  var exit = context.enter('definition');
	  var subexit = context.enter('label');
	  var value =
	    '[' + safe(context, association(node), {before: '[', after: ']'}) + ']: ';
	  subexit();
	  if (
	    !node.url ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {before: ' ', after: ' '});
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      marker +
	      safe(context, node.title, {before: marker, after: marker}) +
	      marker;
	    subexit();
	  }
	  exit();
	  return value
	}
	return definition_1;
}

var checkEmphasis_1;
var hasRequiredCheckEmphasis;

function requireCheckEmphasis () {
	if (hasRequiredCheckEmphasis) return checkEmphasis_1;
	hasRequiredCheckEmphasis = 1;
	checkEmphasis_1 = checkEmphasis;
	function checkEmphasis(context) {
	  var marker = context.options.emphasis || '*';
	  if (marker !== '*' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize emphasis with `' +
	        marker +
	        '` for `options.emphasis`, expected `*`, or `_`'
	    )
	  }
	  return marker
	}
	return checkEmphasis_1;
}

var emphasis_1;
var hasRequiredEmphasis;

function requireEmphasis () {
	if (hasRequiredEmphasis) return emphasis_1;
	hasRequiredEmphasis = 1;
	emphasis_1 = emphasis;
	emphasis.peek = emphasisPeek;
	var checkEmphasis = requireCheckEmphasis();
	var phrasing = requireContainerPhrasing();
	function emphasis(node, _, context) {
	  var marker = checkEmphasis(context);
	  var exit = context.enter('emphasis');
	  var value = phrasing(node, context, {before: marker, after: marker});
	  exit();
	  return marker + value + marker
	}
	function emphasisPeek(node, _, context) {
	  return context.options.emphasis || '*'
	}
	return emphasis_1;
}

var formatHeadingAsSetext_1;
var hasRequiredFormatHeadingAsSetext;

function requireFormatHeadingAsSetext () {
	if (hasRequiredFormatHeadingAsSetext) return formatHeadingAsSetext_1;
	hasRequiredFormatHeadingAsSetext = 1;
	formatHeadingAsSetext_1 = formatHeadingAsSetext;
	var toString = requireMdastUtilToString();
	function formatHeadingAsSetext(node, context) {
	  return (
	    context.options.setext && (!node.depth || node.depth < 3) && toString(node)
	  )
	}
	return formatHeadingAsSetext_1;
}

var heading_1;
var hasRequiredHeading;

function requireHeading () {
	if (hasRequiredHeading) return heading_1;
	hasRequiredHeading = 1;
	heading_1 = heading;
	var repeat = requireRepeatString();
	var formatHeadingAsSetext = requireFormatHeadingAsSetext();
	var phrasing = requireContainerPhrasing();
	function heading(node, _, context) {
	  var rank = Math.max(Math.min(6, node.depth || 1), 1);
	  var exit;
	  var subexit;
	  var value;
	  var sequence;
	  if (formatHeadingAsSetext(node, context)) {
	    exit = context.enter('headingSetext');
	    subexit = context.enter('phrasing');
	    value = phrasing(node, context, {before: '\n', after: '\n'});
	    subexit();
	    exit();
	    return (
	      value +
	      '\n' +
	      repeat(
	        rank === 1 ? '=' : '-',
	        value.length -
	          (Math.max(value.lastIndexOf('\r'), value.lastIndexOf('\n')) + 1)
	      )
	    )
	  }
	  sequence = repeat('#', rank);
	  exit = context.enter('headingAtx');
	  subexit = context.enter('phrasing');
	  value = phrasing(node, context, {before: '# ', after: '\n'});
	  value = value ? sequence + ' ' + value : sequence;
	  if (context.options.closeAtx) {
	    value += ' ' + sequence;
	  }
	  subexit();
	  exit();
	  return value
	}
	return heading_1;
}

var html_1;
var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html_1;
	hasRequiredHtml = 1;
	html_1 = html;
	html.peek = htmlPeek;
	function html(node) {
	  return node.value || ''
	}
	function htmlPeek() {
	  return '<'
	}
	return html_1;
}

var image_1;
var hasRequiredImage;

function requireImage () {
	if (hasRequiredImage) return image_1;
	hasRequiredImage = 1;
	image_1 = image;
	image.peek = imagePeek;
	var checkQuote = requireCheckQuote();
	var safe = requireSafe();
	function image(node, _, context) {
	  var quote = checkQuote(context);
	  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
	  var exit = context.enter('image');
	  var subexit = context.enter('label');
	  var value = '![' + safe(context, node.alt, {before: '[', after: ']'}) + '](';
	  subexit();
	  if (
	    (!node.url && node.title) ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {
	      before: '(',
	      after: node.title ? ' ' : ')'
	    });
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      quote +
	      safe(context, node.title, {before: quote, after: quote}) +
	      quote;
	    subexit();
	  }
	  value += ')';
	  exit();
	  return value
	}
	function imagePeek() {
	  return '!'
	}
	return image_1;
}

var imageReference_1;
var hasRequiredImageReference;

function requireImageReference () {
	if (hasRequiredImageReference) return imageReference_1;
	hasRequiredImageReference = 1;
	imageReference_1 = imageReference;
	imageReference.peek = imageReferencePeek;
	var association = requireAssociation();
	var safe = requireSafe();
	function imageReference(node, _, context) {
	  var type = node.referenceType;
	  var exit = context.enter('imageReference');
	  var subexit = context.enter('label');
	  var alt = safe(context, node.alt, {before: '[', after: ']'});
	  var value = '![' + alt + ']';
	  var reference;
	  var stack;
	  subexit();
	  stack = context.stack;
	  context.stack = [];
	  subexit = context.enter('reference');
	  reference = safe(context, association(node), {before: '[', after: ']'});
	  subexit();
	  context.stack = stack;
	  exit();
	  if (type === 'full' || !alt || alt !== reference) {
	    value += '[' + reference + ']';
	  } else if (type !== 'shortcut') {
	    value += '[]';
	  }
	  return value
	}
	function imageReferencePeek() {
	  return '!'
	}
	return imageReference_1;
}

var formatLinkAsAutolink_1;
var hasRequiredFormatLinkAsAutolink;

function requireFormatLinkAsAutolink () {
	if (hasRequiredFormatLinkAsAutolink) return formatLinkAsAutolink_1;
	hasRequiredFormatLinkAsAutolink = 1;
	formatLinkAsAutolink_1 = formatLinkAsAutolink;
	var toString = requireMdastUtilToString();
	function formatLinkAsAutolink(node, context) {
	  var raw = toString(node);
	  return (
	    !context.options.resourceLink &&
	    node.url &&
	    !node.title &&
	    node.children &&
	    node.children.length === 1 &&
	    node.children[0].type === 'text' &&
	    (raw === node.url || 'mailto:' + raw === node.url) &&
	    /^[a-z][a-z+.-]+:/i.test(node.url) &&
	    !/[\0- <>\u007F]/.test(node.url)
	  )
	}
	return formatLinkAsAutolink_1;
}

var link_1;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link_1;
	hasRequiredLink = 1;
	link_1 = link;
	link.peek = linkPeek;
	var checkQuote = requireCheckQuote();
	var formatLinkAsAutolink = requireFormatLinkAsAutolink();
	var phrasing = requireContainerPhrasing();
	var safe = requireSafe();
	function link(node, _, context) {
	  var quote = checkQuote(context);
	  var suffix = quote === '"' ? 'Quote' : 'Apostrophe';
	  var exit;
	  var subexit;
	  var value;
	  var stack;
	  if (formatLinkAsAutolink(node, context)) {
	    stack = context.stack;
	    context.stack = [];
	    exit = context.enter('autolink');
	    value = '<' + phrasing(node, context, {before: '<', after: '>'}) + '>';
	    exit();
	    context.stack = stack;
	    return value
	  }
	  exit = context.enter('link');
	  subexit = context.enter('label');
	  value = '[' + phrasing(node, context, {before: '[', after: ']'}) + '](';
	  subexit();
	  if (
	    (!node.url && node.title) ||
	    /[ \t\r\n]/.test(node.url)
	  ) {
	    subexit = context.enter('destinationLiteral');
	    value += '<' + safe(context, node.url, {before: '<', after: '>'}) + '>';
	  } else {
	    subexit = context.enter('destinationRaw');
	    value += safe(context, node.url, {
	      before: '(',
	      after: node.title ? ' ' : ')'
	    });
	  }
	  subexit();
	  if (node.title) {
	    subexit = context.enter('title' + suffix);
	    value +=
	      ' ' +
	      quote +
	      safe(context, node.title, {before: quote, after: quote}) +
	      quote;
	    subexit();
	  }
	  value += ')';
	  exit();
	  return value
	}
	function linkPeek(node, _, context) {
	  return formatLinkAsAutolink(node, context) ? '<' : '['
	}
	return link_1;
}

var linkReference_1;
var hasRequiredLinkReference;

function requireLinkReference () {
	if (hasRequiredLinkReference) return linkReference_1;
	hasRequiredLinkReference = 1;
	linkReference_1 = linkReference;
	linkReference.peek = linkReferencePeek;
	var association = requireAssociation();
	var phrasing = requireContainerPhrasing();
	var safe = requireSafe();
	function linkReference(node, _, context) {
	  var type = node.referenceType;
	  var exit = context.enter('linkReference');
	  var subexit = context.enter('label');
	  var text = phrasing(node, context, {before: '[', after: ']'});
	  var value = '[' + text + ']';
	  var reference;
	  var stack;
	  subexit();
	  stack = context.stack;
	  context.stack = [];
	  subexit = context.enter('reference');
	  reference = safe(context, association(node), {before: '[', after: ']'});
	  subexit();
	  context.stack = stack;
	  exit();
	  if (type === 'full' || !text || text !== reference) {
	    value += '[' + reference + ']';
	  } else if (type !== 'shortcut') {
	    value += '[]';
	  }
	  return value
	}
	function linkReferencePeek() {
	  return '['
	}
	return linkReference_1;
}

var list_1;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list_1;
	hasRequiredList = 1;
	list_1 = list;
	var flow = requireContainerFlow();
	function list(node, _, context) {
	  var exit = context.enter('list');
	  var value = flow(node, context);
	  exit();
	  return value
	}
	return list_1;
}

var paragraph_1;
var hasRequiredParagraph;

function requireParagraph () {
	if (hasRequiredParagraph) return paragraph_1;
	hasRequiredParagraph = 1;
	paragraph_1 = paragraph;
	var phrasing = requireContainerPhrasing();
	function paragraph(node, _, context) {
	  var exit = context.enter('paragraph');
	  var subexit = context.enter('phrasing');
	  var value = phrasing(node, context, {before: '\n', after: '\n'});
	  subexit();
	  exit();
	  return value
	}
	return paragraph_1;
}

var root_1;
var hasRequiredRoot;

function requireRoot () {
	if (hasRequiredRoot) return root_1;
	hasRequiredRoot = 1;
	root_1 = root;
	var flow = requireContainerFlow();
	function root(node, _, context) {
	  return flow(node, context)
	}
	return root_1;
}

var checkStrong_1;
var hasRequiredCheckStrong;

function requireCheckStrong () {
	if (hasRequiredCheckStrong) return checkStrong_1;
	hasRequiredCheckStrong = 1;
	checkStrong_1 = checkStrong;
	function checkStrong(context) {
	  var marker = context.options.strong || '*';
	  if (marker !== '*' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize strong with `' +
	        marker +
	        '` for `options.strong`, expected `*`, or `_`'
	    )
	  }
	  return marker
	}
	return checkStrong_1;
}

var strong_1;
var hasRequiredStrong;

function requireStrong () {
	if (hasRequiredStrong) return strong_1;
	hasRequiredStrong = 1;
	strong_1 = strong;
	strong.peek = strongPeek;
	var checkStrong = requireCheckStrong();
	var phrasing = requireContainerPhrasing();
	function strong(node, _, context) {
	  var marker = checkStrong(context);
	  var exit = context.enter('strong');
	  var value = phrasing(node, context, {before: marker, after: marker});
	  exit();
	  return marker + marker + value + marker + marker
	}
	function strongPeek(node, _, context) {
	  return context.options.strong || '*'
	}
	return strong_1;
}

var text_1;
var hasRequiredText;

function requireText () {
	if (hasRequiredText) return text_1;
	hasRequiredText = 1;
	text_1 = text;
	var safe = requireSafe();
	function text(node, parent, context, safeOptions) {
	  return safe(context, node.value, safeOptions)
	}
	return text_1;
}

var checkRuleRepeat;
var hasRequiredCheckRuleRepeat;

function requireCheckRuleRepeat () {
	if (hasRequiredCheckRuleRepeat) return checkRuleRepeat;
	hasRequiredCheckRuleRepeat = 1;
	checkRuleRepeat = checkRule;
	function checkRule(context) {
	  var repetition = context.options.ruleRepetition || 3;
	  if (repetition < 3) {
	    throw new Error(
	      'Cannot serialize rules with repetition `' +
	        repetition +
	        '` for `options.ruleRepetition`, expected `3` or more'
	    )
	  }
	  return repetition
	}
	return checkRuleRepeat;
}

var checkRule_1;
var hasRequiredCheckRule;

function requireCheckRule () {
	if (hasRequiredCheckRule) return checkRule_1;
	hasRequiredCheckRule = 1;
	checkRule_1 = checkRule;
	function checkRule(context) {
	  var marker = context.options.rule || '*';
	  if (marker !== '*' && marker !== '-' && marker !== '_') {
	    throw new Error(
	      'Cannot serialize rules with `' +
	        marker +
	        '` for `options.rule`, expected `*`, `-`, or `_`'
	    )
	  }
	  return marker
	}
	return checkRule_1;
}

var thematicBreak_1;
var hasRequiredThematicBreak;

function requireThematicBreak () {
	if (hasRequiredThematicBreak) return thematicBreak_1;
	hasRequiredThematicBreak = 1;
	thematicBreak_1 = thematicBreak;
	var repeat = requireRepeatString();
	var checkRepeat = requireCheckRuleRepeat();
	var checkRule = requireCheckRule();
	function thematicBreak(node, parent, context) {
	  var value = repeat(
	    checkRule(context) + (context.options.ruleSpaces ? ' ' : ''),
	    checkRepeat(context)
	  );
	  return context.options.ruleSpaces ? value.slice(0, -1) : value
	}
	return thematicBreak_1;
}

var hasRequiredHandle;

function requireHandle () {
	if (hasRequiredHandle) return handle;
	hasRequiredHandle = 1;
	handle.blockquote = requireBlockquote();
	handle.break = require_break();
	handle.code = requireCode();
	handle.definition = requireDefinition();
	handle.emphasis = requireEmphasis();
	handle.hardBreak = require_break();
	handle.heading = requireHeading();
	handle.html = requireHtml();
	handle.image = requireImage();
	handle.imageReference = requireImageReference();
	handle.inlineCode = requireInlineCode();
	handle.link = requireLink();
	handle.linkReference = requireLinkReference();
	handle.list = requireList();
	handle.listItem = requireListItem();
	handle.paragraph = requireParagraph();
	handle.root = requireRoot();
	handle.strong = requireStrong();
	handle.text = requireText();
	handle.thematicBreak = requireThematicBreak();
	return handle;
}

var join;
var hasRequiredJoin;

function requireJoin () {
	if (hasRequiredJoin) return join;
	hasRequiredJoin = 1;
	join = [joinDefaults];
	var formatCodeAsIndented = requireFormatCodeAsIndented();
	var formatHeadingAsSetext = requireFormatHeadingAsSetext();
	function joinDefaults(left, right, parent, context) {
	  if (
	    (right.type === 'list' &&
	      right.type === left.type &&
	      Boolean(left.ordered) === Boolean(right.ordered)) ||
	    (right.type === 'code' &&
	      formatCodeAsIndented(right, context) &&
	      (left.type === 'list' ||
	        (left.type === right.type && formatCodeAsIndented(left, context))))
	  ) {
	    return false
	  }
	  if (typeof parent.spread === 'boolean') {
	    if (
	      left.type === 'paragraph' &&
	      (left.type === right.type ||
	        right.type === 'definition' ||
	        (right.type === 'heading' && formatHeadingAsSetext(right, context)))
	    ) {
	      return
	    }
	    return parent.spread ? 1 : 0
	  }
	}
	return join;
}

var unsafe;
var hasRequiredUnsafe;

function requireUnsafe () {
	if (hasRequiredUnsafe) return unsafe;
	hasRequiredUnsafe = 1;
	unsafe = [
	  {
	    character: '\t',
	    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
	  },
	  {
	    character: '\r',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedLangTilde',
	      'codeFencedMetaGraveAccent',
	      'codeFencedMetaTilde',
	      'destinationLiteral',
	      'headingAtx'
	    ]
	  },
	  {
	    character: '\n',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedLangTilde',
	      'codeFencedMetaGraveAccent',
	      'codeFencedMetaTilde',
	      'destinationLiteral',
	      'headingAtx'
	    ]
	  },
	  {
	    character: ' ',
	    inConstruct: ['codeFencedLangGraveAccent', 'codeFencedLangTilde']
	  },
	  {character: '!', after: '\\[', inConstruct: 'phrasing'},
	  {character: '"', inConstruct: 'titleQuote'},
	  {atBreak: true, character: '#'},
	  {character: '#', inConstruct: 'headingAtx', after: '(?:[\r\n]|$)'},
	  {character: '&', after: '[#A-Za-z]', inConstruct: 'phrasing'},
	  {character: "'", inConstruct: 'titleApostrophe'},
	  {character: '(', inConstruct: 'destinationRaw'},
	  {before: '\\]', character: '(', inConstruct: 'phrasing'},
	  {atBreak: true, before: '\\d+', character: ')'},
	  {character: ')', inConstruct: 'destinationRaw'},
	  {atBreak: true, character: '*'},
	  {character: '*', inConstruct: 'phrasing'},
	  {atBreak: true, character: '+'},
	  {atBreak: true, character: '-'},
	  {atBreak: true, before: '\\d+', character: '.', after: '(?:[ \t\r\n]|$)'},
	  {atBreak: true, character: '<', after: '[!/?A-Za-z]'},
	  {character: '<', after: '[!/?A-Za-z]', inConstruct: 'phrasing'},
	  {character: '<', inConstruct: 'destinationLiteral'},
	  {atBreak: true, character: '='},
	  {atBreak: true, character: '>'},
	  {character: '>', inConstruct: 'destinationLiteral'},
	  {atBreak: true, character: '['},
	  {character: '[', inConstruct: ['phrasing', 'label', 'reference']},
	  {character: '\\', after: '[\\r\\n]', inConstruct: 'phrasing'},
	  {
	    character: ']',
	    inConstruct: ['label', 'reference']
	  },
	  {atBreak: true, character: '_'},
	  {before: '[^A-Za-z]', character: '_', inConstruct: 'phrasing'},
	  {character: '_', after: '[^A-Za-z]', inConstruct: 'phrasing'},
	  {atBreak: true, character: '`'},
	  {
	    character: '`',
	    inConstruct: [
	      'codeFencedLangGraveAccent',
	      'codeFencedMetaGraveAccent',
	      'phrasing'
	    ]
	  },
	  {atBreak: true, character: '~'}
	];
	return unsafe;
}

var lib$1;
var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib$1;
	hasRequiredLib$1 = 1;
	lib$1 = toMarkdown;
	var zwitch = requireZwitch();
	var configure = requireConfigure();
	var defaultHandlers = requireHandle();
	var defaultJoin = requireJoin();
	var defaultUnsafe = requireUnsafe();
	function toMarkdown(tree, options) {
	  var settings = options || {};
	  var context = {
	    enter: enter,
	    stack: [],
	    unsafe: [],
	    join: [],
	    handlers: {},
	    options: {}
	  };
	  var result;
	  configure(context, {
	    unsafe: defaultUnsafe,
	    join: defaultJoin,
	    handlers: defaultHandlers
	  });
	  configure(context, settings);
	  if (context.options.tightDefinitions) {
	    context.join = [joinDefinition].concat(context.join);
	  }
	  context.handle = zwitch('type', {
	    invalid: invalid,
	    unknown: unknown,
	    handlers: context.handlers
	  });
	  result = context.handle(tree, null, context, {before: '\n', after: '\n'});
	  if (
	    result &&
	    result.charCodeAt(result.length - 1) !== 10 &&
	    result.charCodeAt(result.length - 1) !== 13
	  ) {
	    result += '\n';
	  }
	  return result
	  function enter(name) {
	    context.stack.push(name);
	    return exit
	    function exit() {
	      context.stack.pop();
	    }
	  }
	}
	function invalid(value) {
	  throw new Error('Cannot handle value `' + value + '`, expected node')
	}
	function unknown(node) {
	  throw new Error('Cannot handle unknown node `' + node.type + '`')
	}
	function joinDefinition(left, right) {
	  if (left.type === 'definition' && left.type === right.type) {
	    return 0
	  }
	}
	return lib$1;
}

var mdastUtilToMarkdown;
var hasRequiredMdastUtilToMarkdown;

function requireMdastUtilToMarkdown () {
	if (hasRequiredMdastUtilToMarkdown) return mdastUtilToMarkdown;
	hasRequiredMdastUtilToMarkdown = 1;
	mdastUtilToMarkdown = requireLib$1();
	return mdastUtilToMarkdown;
}

var remarkStringify;
var hasRequiredRemarkStringify;

function requireRemarkStringify () {
	if (hasRequiredRemarkStringify) return remarkStringify;
	hasRequiredRemarkStringify = 1;
	remarkStringify = stringify;
	var toMarkdown = requireMdastUtilToMarkdown();
	function stringify(options) {
	  var self = this;
	  this.Compiler = compile;
	  function compile(tree) {
	    return toMarkdown(
	      tree,
	      Object.assign({}, self.data('settings'), options, {
	        extensions: self.data('toMarkdownExtensions') || []
	      })
	    )
	  }
	}
	return remarkStringify;
}

var unistUtilVisit;
var hasRequiredUnistUtilVisit;

function requireUnistUtilVisit () {
	if (hasRequiredUnistUtilVisit) return unistUtilVisit;
	hasRequiredUnistUtilVisit = 1;
	unistUtilVisit = visit;
	var visitParents = requireUnistUtilVisitParents();
	var CONTINUE = visitParents.CONTINUE;
	var SKIP = visitParents.SKIP;
	var EXIT = visitParents.EXIT;
	visit.CONTINUE = CONTINUE;
	visit.SKIP = SKIP;
	visit.EXIT = EXIT;
	function visit(tree, test, visitor, reverse) {
	  if (typeof test === 'function' && typeof visitor !== 'function') {
	    reverse = visitor;
	    visitor = test;
	    test = null;
	  }
	  visitParents(tree, test, overload, reverse);
	  function overload(node, parents) {
	    var parent = parents[parents.length - 1];
	    var index = parent ? parent.children.indexOf(node) : null;
	    return visitor(node, index, parent)
	  }
	}
	return unistUtilVisit;
}

var htmlCommentRegex;
var hasRequiredHtmlCommentRegex;

function requireHtmlCommentRegex () {
	if (hasRequiredHtmlCommentRegex) return htmlCommentRegex;
	hasRequiredHtmlCommentRegex = 1;
	htmlCommentRegex = /<!--([\s\S]*?)-->/g;
	return htmlCommentRegex;
}

var transformer;
var hasRequiredTransformer;

function requireTransformer () {
	if (hasRequiredTransformer) return transformer;
	hasRequiredTransformer = 1;
	const visit = requireUnistUtilVisit();
	const htmlCommentRegex = requireHtmlCommentRegex();
	const removeComments = (tree, file) => {
	  const handler = (node, index, parent) => {
	    const isComment = node.value.match(htmlCommentRegex);
	    if (isComment) {
	      parent.children.splice(index, 1);
	      return [visit.SKIP, index];
	    }
	  };
	  visit(tree, 'html', handler);
	  visit(tree, 'jsx', handler);
	};
	transformer = removeComments;
	return transformer;
}

var remarkRemoveComments;
var hasRequiredRemarkRemoveComments;

function requireRemarkRemoveComments () {
	if (hasRequiredRemarkRemoveComments) return remarkRemoveComments;
	hasRequiredRemarkRemoveComments = 1;
	const transformer = requireTransformer();
	function attacher() {
	  return transformer;
	}
	remarkRemoveComments = attacher;
	return remarkRemoveComments;
}

var bail_1;
var hasRequiredBail;

function requireBail () {
	if (hasRequiredBail) return bail_1;
	hasRequiredBail = 1;
	bail_1 = bail;
	function bail(err) {
	  if (err) {
	    throw err
	  }
	}
	return bail_1;
}

var isBuffer;
var hasRequiredIsBuffer;

function requireIsBuffer () {
	if (hasRequiredIsBuffer) return isBuffer;
	hasRequiredIsBuffer = 1;
	isBuffer = function isBuffer (obj) {
	  return obj != null && obj.constructor != null &&
	    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	};
	return isBuffer;
}

var extend;
var hasRequiredExtend;

function requireExtend () {
	if (hasRequiredExtend) return extend;
	hasRequiredExtend = 1;
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
		return toStr.call(arr) === '[object Array]';
	};
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
		var key;
		for (key in obj) {  }
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	var setProperty = function setProperty(target, options) {
		if (defineProperty && options.name === '__proto__') {
			defineProperty(target, options.name, {
				enumerable: true,
				configurable: true,
				value: options.newValue,
				writable: true
			});
		} else {
			target[options.name] = options.newValue;
		}
	};
	var getProperty = function getProperty(obj, name) {
		if (name === '__proto__') {
			if (!hasOwn.call(obj, name)) {
				return void 0;
			} else if (gOPD) {
				return gOPD(obj, name).value;
			}
		}
		return obj[name];
	};
	extend = function extend() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}
		for (; i < length; ++i) {
			options = arguments[i];
			if (options != null) {
				for (name in options) {
					src = getProperty(target, name);
					copy = getProperty(options, name);
					if (target !== copy) {
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
							setProperty(target, { name: name, newValue: extend(deep, clone, copy) });
						} else if (typeof copy !== 'undefined') {
							setProperty(target, { name: name, newValue: copy });
						}
					}
				}
			}
		}
		return target;
	};
	return extend;
}

var isPlainObj;
var hasRequiredIsPlainObj;

function requireIsPlainObj () {
	if (hasRequiredIsPlainObj) return isPlainObj;
	hasRequiredIsPlainObj = 1;
	isPlainObj = value => {
		if (Object.prototype.toString.call(value) !== '[object Object]') {
			return false;
		}
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || prototype === Object.prototype;
	};
	return isPlainObj;
}

var wrap_1;
var hasRequiredWrap;

function requireWrap () {
	if (hasRequiredWrap) return wrap_1;
	hasRequiredWrap = 1;
	var slice = [].slice;
	wrap_1 = wrap;
	function wrap(fn, callback) {
	  var invoked;
	  return wrapped
	  function wrapped() {
	    var params = slice.call(arguments, 0);
	    var callback = fn.length > params.length;
	    var result;
	    if (callback) {
	      params.push(done);
	    }
	    try {
	      result = fn.apply(null, params);
	    } catch (error) {
	      if (callback && invoked) {
	        throw error
	      }
	      return done(error)
	    }
	    if (!callback) {
	      if (result && typeof result.then === 'function') {
	        result.then(then, done);
	      } else if (result instanceof Error) {
	        done(result);
	      } else {
	        then(result);
	      }
	    }
	  }
	  function done() {
	    if (!invoked) {
	      invoked = true;
	      callback.apply(null, arguments);
	    }
	  }
	  function then(value) {
	    done(null, value);
	  }
	}
	return wrap_1;
}

var trough_1;
var hasRequiredTrough;

function requireTrough () {
	if (hasRequiredTrough) return trough_1;
	hasRequiredTrough = 1;
	var wrap = requireWrap();
	trough_1 = trough;
	trough.wrap = wrap;
	var slice = [].slice;
	function trough() {
	  var fns = [];
	  var middleware = {};
	  middleware.run = run;
	  middleware.use = use;
	  return middleware
	  function run() {
	    var index = -1;
	    var input = slice.call(arguments, 0, -1);
	    var done = arguments[arguments.length - 1];
	    if (typeof done !== 'function') {
	      throw new Error('Expected function as last argument, not ' + done)
	    }
	    next.apply(null, [null].concat(input));
	    function next(err) {
	      var fn = fns[++index];
	      var params = slice.call(arguments, 0);
	      var values = params.slice(1);
	      var length = input.length;
	      var pos = -1;
	      if (err) {
	        done(err);
	        return
	      }
	      while (++pos < length) {
	        if (values[pos] === null || values[pos] === undefined) {
	          values[pos] = input[pos];
	        }
	      }
	      input = values;
	      if (fn) {
	        wrap(fn, next).apply(null, input);
	      } else {
	        done.apply(null, [null].concat(input));
	      }
	    }
	  }
	  function use(fn) {
	    if (typeof fn !== 'function') {
	      throw new Error('Expected `fn` to be a function, not ' + fn)
	    }
	    fns.push(fn);
	    return middleware
	  }
	}
	return trough_1;
}

var vfileMessage;
var hasRequiredVfileMessage;

function requireVfileMessage () {
	if (hasRequiredVfileMessage) return vfileMessage;
	hasRequiredVfileMessage = 1;
	var stringify = requireUnistUtilStringifyPosition();
	vfileMessage = VMessage;
	function VMessagePrototype() {}
	VMessagePrototype.prototype = Error.prototype;
	VMessage.prototype = new VMessagePrototype();
	var proto = VMessage.prototype;
	proto.file = '';
	proto.name = '';
	proto.reason = '';
	proto.message = '';
	proto.stack = '';
	proto.fatal = null;
	proto.column = null;
	proto.line = null;
	function VMessage(reason, position, origin) {
	  var parts;
	  var range;
	  var location;
	  if (typeof position === 'string') {
	    origin = position;
	    position = null;
	  }
	  parts = parseOrigin(origin);
	  range = stringify(position) || '1:1';
	  location = {
	    start: {line: null, column: null},
	    end: {line: null, column: null}
	  };
	  if (position && position.position) {
	    position = position.position;
	  }
	  if (position) {
	    if (position.start) {
	      location = position;
	      position = position.start;
	    } else {
	      location.start = position;
	    }
	  }
	  if (reason.stack) {
	    this.stack = reason.stack;
	    reason = reason.message;
	  }
	  this.message = reason;
	  this.name = range;
	  this.reason = reason;
	  this.line = position ? position.line : null;
	  this.column = position ? position.column : null;
	  this.location = location;
	  this.source = parts[0];
	  this.ruleId = parts[1];
	}
	function parseOrigin(origin) {
	  var result = [null, null];
	  var index;
	  if (typeof origin === 'string') {
	    index = origin.indexOf(':');
	    if (index === -1) {
	      result[1] = origin;
	    } else {
	      result[0] = origin.slice(0, index);
	      result[1] = origin.slice(index + 1);
	    }
	  }
	  return result
	}
	return vfileMessage;
}

var minpath_browser = {};

var hasRequiredMinpath_browser;

function requireMinpath_browser () {
	if (hasRequiredMinpath_browser) return minpath_browser;
	hasRequiredMinpath_browser = 1;
	minpath_browser.basename = basename;
	minpath_browser.dirname = dirname;
	minpath_browser.extname = extname;
	minpath_browser.join = join;
	minpath_browser.sep = '/';
	function basename(path, ext) {
	  var start = 0;
	  var end = -1;
	  var index;
	  var firstNonSlashEnd;
	  var seenNonSlash;
	  var extIndex;
	  if (ext !== undefined && typeof ext !== 'string') {
	    throw new TypeError('"ext" argument must be a string')
	  }
	  assertPath(path);
	  index = path.length;
	  if (ext === undefined || !ext.length || ext.length > path.length) {
	    while (index--) {
	      if (path.charCodeAt(index) === 47 ) {
	        if (seenNonSlash) {
	          start = index + 1;
	          break
	        }
	      } else if (end < 0) {
	        seenNonSlash = true;
	        end = index + 1;
	      }
	    }
	    return end < 0 ? '' : path.slice(start, end)
	  }
	  if (ext === path) {
	    return ''
	  }
	  firstNonSlashEnd = -1;
	  extIndex = ext.length - 1;
	  while (index--) {
	    if (path.charCodeAt(index) === 47 ) {
	      if (seenNonSlash) {
	        start = index + 1;
	        break
	      }
	    } else {
	      if (firstNonSlashEnd < 0) {
	        seenNonSlash = true;
	        firstNonSlashEnd = index + 1;
	      }
	      if (extIndex > -1) {
	        if (path.charCodeAt(index) === ext.charCodeAt(extIndex--)) {
	          if (extIndex < 0) {
	            end = index;
	          }
	        } else {
	          extIndex = -1;
	          end = firstNonSlashEnd;
	        }
	      }
	    }
	  }
	  if (start === end) {
	    end = firstNonSlashEnd;
	  } else if (end < 0) {
	    end = path.length;
	  }
	  return path.slice(start, end)
	}
	function dirname(path) {
	  var end;
	  var unmatchedSlash;
	  var index;
	  assertPath(path);
	  if (!path.length) {
	    return '.'
	  }
	  end = -1;
	  index = path.length;
	  while (--index) {
	    if (path.charCodeAt(index) === 47 ) {
	      if (unmatchedSlash) {
	        end = index;
	        break
	      }
	    } else if (!unmatchedSlash) {
	      unmatchedSlash = true;
	    }
	  }
	  return end < 0
	    ? path.charCodeAt(0) === 47
	      ? '/'
	      : '.'
	    : end === 1 && path.charCodeAt(0) === 47
	    ? '//'
	    : path.slice(0, end)
	}
	function extname(path) {
	  var startDot = -1;
	  var startPart = 0;
	  var end = -1;
	  var preDotState = 0;
	  var unmatchedSlash;
	  var code;
	  var index;
	  assertPath(path);
	  index = path.length;
	  while (index--) {
	    code = path.charCodeAt(index);
	    if (code === 47 ) {
	      if (unmatchedSlash) {
	        startPart = index + 1;
	        break
	      }
	      continue
	    }
	    if (end < 0) {
	      unmatchedSlash = true;
	      end = index + 1;
	    }
	    if (code === 46 ) {
	      if (startDot < 0) {
	        startDot = index;
	      } else if (preDotState !== 1) {
	        preDotState = 1;
	      }
	    } else if (startDot > -1) {
	      preDotState = -1;
	    }
	  }
	  if (
	    startDot < 0 ||
	    end < 0 ||
	    preDotState === 0 ||
	    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
	  ) {
	    return ''
	  }
	  return path.slice(startDot, end)
	}
	function join() {
	  var index = -1;
	  var joined;
	  while (++index < arguments.length) {
	    assertPath(arguments[index]);
	    if (arguments[index]) {
	      joined =
	        joined === undefined
	          ? arguments[index]
	          : joined + '/' + arguments[index];
	    }
	  }
	  return joined === undefined ? '.' : normalize(joined)
	}
	function normalize(path) {
	  var absolute;
	  var value;
	  assertPath(path);
	  absolute = path.charCodeAt(0) === 47;
	  value = normalizeString(path, !absolute);
	  if (!value.length && !absolute) {
	    value = '.';
	  }
	  if (value.length && path.charCodeAt(path.length - 1) === 47 ) {
	    value += '/';
	  }
	  return absolute ? '/' + value : value
	}
	function normalizeString(path, allowAboveRoot) {
	  var result = '';
	  var lastSegmentLength = 0;
	  var lastSlash = -1;
	  var dots = 0;
	  var index = -1;
	  var code;
	  var lastSlashIndex;
	  while (++index <= path.length) {
	    if (index < path.length) {
	      code = path.charCodeAt(index);
	    } else if (code === 47 ) {
	      break
	    } else {
	      code = 47;
	    }
	    if (code === 47 ) {
	      if (lastSlash === index - 1 || dots === 1) ; else if (lastSlash !== index - 1 && dots === 2) {
	        if (
	          result.length < 2 ||
	          lastSegmentLength !== 2 ||
	          result.charCodeAt(result.length - 1) !== 46  ||
	          result.charCodeAt(result.length - 2) !== 46
	        ) {
	          if (result.length > 2) {
	            lastSlashIndex = result.lastIndexOf('/');
	            if (lastSlashIndex !== result.length - 1) {
	              if (lastSlashIndex < 0) {
	                result = '';
	                lastSegmentLength = 0;
	              } else {
	                result = result.slice(0, lastSlashIndex);
	                lastSegmentLength = result.length - 1 - result.lastIndexOf('/');
	              }
	              lastSlash = index;
	              dots = 0;
	              continue
	            }
	          } else if (result.length) {
	            result = '';
	            lastSegmentLength = 0;
	            lastSlash = index;
	            dots = 0;
	            continue
	          }
	        }
	        if (allowAboveRoot) {
	          result = result.length ? result + '/..' : '..';
	          lastSegmentLength = 2;
	        }
	      } else {
	        if (result.length) {
	          result += '/' + path.slice(lastSlash + 1, index);
	        } else {
	          result = path.slice(lastSlash + 1, index);
	        }
	        lastSegmentLength = index - lastSlash - 1;
	      }
	      lastSlash = index;
	      dots = 0;
	    } else if (code === 46  && dots > -1) {
	      dots++;
	    } else {
	      dots = -1;
	    }
	  }
	  return result
	}
	function assertPath(path) {
	  if (typeof path !== 'string') {
	    throw new TypeError(
	      'Path must be a string. Received ' + JSON.stringify(path)
	    )
	  }
	}
	return minpath_browser;
}

var minproc_browser = {};

var hasRequiredMinproc_browser;

function requireMinproc_browser () {
	if (hasRequiredMinproc_browser) return minproc_browser;
	hasRequiredMinproc_browser = 1;
	minproc_browser.cwd = cwd;
	function cwd() {
	  return '/'
	}
	return minproc_browser;
}

var core;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	var p = requireMinpath_browser();
	var proc = requireMinproc_browser();
	var buffer = requireIsBuffer();
	core = VFile;
	var own = {}.hasOwnProperty;
	var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
	VFile.prototype.toString = toString;
	Object.defineProperty(VFile.prototype, 'path', {get: getPath, set: setPath});
	Object.defineProperty(VFile.prototype, 'dirname', {
	  get: getDirname,
	  set: setDirname
	});
	Object.defineProperty(VFile.prototype, 'basename', {
	  get: getBasename,
	  set: setBasename
	});
	Object.defineProperty(VFile.prototype, 'extname', {
	  get: getExtname,
	  set: setExtname
	});
	Object.defineProperty(VFile.prototype, 'stem', {get: getStem, set: setStem});
	function VFile(options) {
	  var prop;
	  var index;
	  if (!options) {
	    options = {};
	  } else if (typeof options === 'string' || buffer(options)) {
	    options = {contents: options};
	  } else if ('message' in options && 'messages' in options) {
	    return options
	  }
	  if (!(this instanceof VFile)) {
	    return new VFile(options)
	  }
	  this.data = {};
	  this.messages = [];
	  this.history = [];
	  this.cwd = proc.cwd();
	  index = -1;
	  while (++index < order.length) {
	    prop = order[index];
	    if (own.call(options, prop)) {
	      this[prop] = options[prop];
	    }
	  }
	  for (prop in options) {
	    if (order.indexOf(prop) < 0) {
	      this[prop] = options[prop];
	    }
	  }
	}
	function getPath() {
	  return this.history[this.history.length - 1]
	}
	function setPath(path) {
	  assertNonEmpty(path, 'path');
	  if (this.path !== path) {
	    this.history.push(path);
	  }
	}
	function getDirname() {
	  return typeof this.path === 'string' ? p.dirname(this.path) : undefined
	}
	function setDirname(dirname) {
	  assertPath(this.path, 'dirname');
	  this.path = p.join(dirname || '', this.basename);
	}
	function getBasename() {
	  return typeof this.path === 'string' ? p.basename(this.path) : undefined
	}
	function setBasename(basename) {
	  assertNonEmpty(basename, 'basename');
	  assertPart(basename, 'basename');
	  this.path = p.join(this.dirname || '', basename);
	}
	function getExtname() {
	  return typeof this.path === 'string' ? p.extname(this.path) : undefined
	}
	function setExtname(extname) {
	  assertPart(extname, 'extname');
	  assertPath(this.path, 'extname');
	  if (extname) {
	    if (extname.charCodeAt(0) !== 46 ) {
	      throw new Error('`extname` must start with `.`')
	    }
	    if (extname.indexOf('.', 1) > -1) {
	      throw new Error('`extname` cannot contain multiple dots')
	    }
	  }
	  this.path = p.join(this.dirname, this.stem + (extname || ''));
	}
	function getStem() {
	  return typeof this.path === 'string'
	    ? p.basename(this.path, this.extname)
	    : undefined
	}
	function setStem(stem) {
	  assertNonEmpty(stem, 'stem');
	  assertPart(stem, 'stem');
	  this.path = p.join(this.dirname || '', stem + (this.extname || ''));
	}
	function toString(encoding) {
	  return (this.contents || '').toString(encoding)
	}
	function assertPart(part, name) {
	  if (part && part.indexOf(p.sep) > -1) {
	    throw new Error(
	      '`' + name + '` cannot be a path: did not expect `' + p.sep + '`'
	    )
	  }
	}
	function assertNonEmpty(part, name) {
	  if (!part) {
	    throw new Error('`' + name + '` cannot be empty')
	  }
	}
	function assertPath(path, name) {
	  if (!path) {
	    throw new Error('Setting `' + name + '` requires `path` to be set too')
	  }
	}
	return core;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	var VMessage = requireVfileMessage();
	var VFile = requireCore();
	lib = VFile;
	VFile.prototype.message = message;
	VFile.prototype.info = info;
	VFile.prototype.fail = fail;
	function message(reason, position, origin) {
	  var message = new VMessage(reason, position, origin);
	  if (this.path) {
	    message.name = this.path + ':' + message.name;
	    message.file = this.path;
	  }
	  message.fatal = false;
	  this.messages.push(message);
	  return message
	}
	function fail() {
	  var message = this.message.apply(this, arguments);
	  message.fatal = true;
	  throw message
	}
	function info() {
	  var message = this.message.apply(this, arguments);
	  message.fatal = null;
	  return message
	}
	return lib;
}

var vfile;
var hasRequiredVfile;

function requireVfile () {
	if (hasRequiredVfile) return vfile;
	hasRequiredVfile = 1;
	vfile = requireLib();
	return vfile;
}

var unified_1;
var hasRequiredUnified;

function requireUnified () {
	if (hasRequiredUnified) return unified_1;
	hasRequiredUnified = 1;
	var bail = requireBail();
	var buffer = requireIsBuffer();
	var extend = requireExtend();
	var plain = requireIsPlainObj();
	var trough = requireTrough();
	var vfile = requireVfile();
	unified_1 = unified().freeze();
	var slice = [].slice;
	var own = {}.hasOwnProperty;
	var pipeline = trough()
	  .use(pipelineParse)
	  .use(pipelineRun)
	  .use(pipelineStringify);
	function pipelineParse(p, ctx) {
	  ctx.tree = p.parse(ctx.file);
	}
	function pipelineRun(p, ctx, next) {
	  p.run(ctx.tree, ctx.file, done);
	  function done(error, tree, file) {
	    if (error) {
	      next(error);
	    } else {
	      ctx.tree = tree;
	      ctx.file = file;
	      next();
	    }
	  }
	}
	function pipelineStringify(p, ctx) {
	  var result = p.stringify(ctx.tree, ctx.file);
	  if (result === undefined || result === null) ; else if (typeof result === 'string' || buffer(result)) {
	    if ('value' in ctx.file) {
	      ctx.file.value = result;
	    }
	    ctx.file.contents = result;
	  } else {
	    ctx.file.result = result;
	  }
	}
	function unified() {
	  var attachers = [];
	  var transformers = trough();
	  var namespace = {};
	  var freezeIndex = -1;
	  var frozen;
	  processor.data = data;
	  processor.freeze = freeze;
	  processor.attachers = attachers;
	  processor.use = use;
	  processor.parse = parse;
	  processor.stringify = stringify;
	  processor.run = run;
	  processor.runSync = runSync;
	  processor.process = process;
	  processor.processSync = processSync;
	  return processor
	  function processor() {
	    var destination = unified();
	    var index = -1;
	    while (++index < attachers.length) {
	      destination.use.apply(null, attachers[index]);
	    }
	    destination.data(extend(true, {}, namespace));
	    return destination
	  }
	  function freeze() {
	    var values;
	    var transformer;
	    if (frozen) {
	      return processor
	    }
	    while (++freezeIndex < attachers.length) {
	      values = attachers[freezeIndex];
	      if (values[1] === false) {
	        continue
	      }
	      if (values[1] === true) {
	        values[1] = undefined;
	      }
	      transformer = values[0].apply(processor, values.slice(1));
	      if (typeof transformer === 'function') {
	        transformers.use(transformer);
	      }
	    }
	    frozen = true;
	    freezeIndex = Infinity;
	    return processor
	  }
	  function data(key, value) {
	    if (typeof key === 'string') {
	      if (arguments.length === 2) {
	        assertUnfrozen('data', frozen);
	        namespace[key] = value;
	        return processor
	      }
	      return (own.call(namespace, key) && namespace[key]) || null
	    }
	    if (key) {
	      assertUnfrozen('data', frozen);
	      namespace = key;
	      return processor
	    }
	    return namespace
	  }
	  function use(value) {
	    var settings;
	    assertUnfrozen('use', frozen);
	    if (value === null || value === undefined) ; else if (typeof value === 'function') {
	      addPlugin.apply(null, arguments);
	    } else if (typeof value === 'object') {
	      if ('length' in value) {
	        addList(value);
	      } else {
	        addPreset(value);
	      }
	    } else {
	      throw new Error('Expected usable value, not `' + value + '`')
	    }
	    if (settings) {
	      namespace.settings = extend(namespace.settings || {}, settings);
	    }
	    return processor
	    function addPreset(result) {
	      addList(result.plugins);
	      if (result.settings) {
	        settings = extend(settings || {}, result.settings);
	      }
	    }
	    function add(value) {
	      if (typeof value === 'function') {
	        addPlugin(value);
	      } else if (typeof value === 'object') {
	        if ('length' in value) {
	          addPlugin.apply(null, value);
	        } else {
	          addPreset(value);
	        }
	      } else {
	        throw new Error('Expected usable value, not `' + value + '`')
	      }
	    }
	    function addList(plugins) {
	      var index = -1;
	      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
	        while (++index < plugins.length) {
	          add(plugins[index]);
	        }
	      } else {
	        throw new Error('Expected a list of plugins, not `' + plugins + '`')
	      }
	    }
	    function addPlugin(plugin, value) {
	      var entry = find(plugin);
	      if (entry) {
	        if (plain(entry[1]) && plain(value)) {
	          value = extend(true, entry[1], value);
	        }
	        entry[1] = value;
	      } else {
	        attachers.push(slice.call(arguments));
	      }
	    }
	  }
	  function find(plugin) {
	    var index = -1;
	    while (++index < attachers.length) {
	      if (attachers[index][0] === plugin) {
	        return attachers[index]
	      }
	    }
	  }
	  function parse(doc) {
	    var file = vfile(doc);
	    var Parser;
	    freeze();
	    Parser = processor.Parser;
	    assertParser('parse', Parser);
	    if (newable(Parser, 'parse')) {
	      return new Parser(String(file), file).parse()
	    }
	    return Parser(String(file), file)
	  }
	  function run(node, file, cb) {
	    assertNode(node);
	    freeze();
	    if (!cb && typeof file === 'function') {
	      cb = file;
	      file = null;
	    }
	    if (!cb) {
	      return new Promise(executor)
	    }
	    executor(null, cb);
	    function executor(resolve, reject) {
	      transformers.run(node, vfile(file), done);
	      function done(error, tree, file) {
	        tree = tree || node;
	        if (error) {
	          reject(error);
	        } else if (resolve) {
	          resolve(tree);
	        } else {
	          cb(null, tree, file);
	        }
	      }
	    }
	  }
	  function runSync(node, file) {
	    var result;
	    var complete;
	    run(node, file, done);
	    assertDone('runSync', 'run', complete);
	    return result
	    function done(error, tree) {
	      complete = true;
	      result = tree;
	      bail(error);
	    }
	  }
	  function stringify(node, doc) {
	    var file = vfile(doc);
	    var Compiler;
	    freeze();
	    Compiler = processor.Compiler;
	    assertCompiler('stringify', Compiler);
	    assertNode(node);
	    if (newable(Compiler, 'compile')) {
	      return new Compiler(node, file).compile()
	    }
	    return Compiler(node, file)
	  }
	  function process(doc, cb) {
	    freeze();
	    assertParser('process', processor.Parser);
	    assertCompiler('process', processor.Compiler);
	    if (!cb) {
	      return new Promise(executor)
	    }
	    executor(null, cb);
	    function executor(resolve, reject) {
	      var file = vfile(doc);
	      pipeline.run(processor, {file: file}, done);
	      function done(error) {
	        if (error) {
	          reject(error);
	        } else if (resolve) {
	          resolve(file);
	        } else {
	          cb(null, file);
	        }
	      }
	    }
	  }
	  function processSync(doc) {
	    var file;
	    var complete;
	    freeze();
	    assertParser('processSync', processor.Parser);
	    assertCompiler('processSync', processor.Compiler);
	    file = vfile(doc);
	    process(file, done);
	    assertDone('processSync', 'process', complete);
	    return file
	    function done(error) {
	      complete = true;
	      bail(error);
	    }
	  }
	}
	function newable(value, name) {
	  return (
	    typeof value === 'function' &&
	    value.prototype &&
	    (keys(value.prototype) || name in value.prototype)
	  )
	}
	function keys(value) {
	  var key;
	  for (key in value) {
	    return true
	  }
	  return false
	}
	function assertParser(name, Parser) {
	  if (typeof Parser !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Parser`')
	  }
	}
	function assertCompiler(name, Compiler) {
	  if (typeof Compiler !== 'function') {
	    throw new Error('Cannot `' + name + '` without `Compiler`')
	  }
	}
	function assertUnfrozen(name, frozen) {
	  if (frozen) {
	    throw new Error(
	      'Cannot invoke `' +
	        name +
	        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
	    )
	  }
	}
	function assertNode(node) {
	  if (!node || typeof node.type !== 'string') {
	    throw new Error('Expected node, got `' + node + '`')
	  }
	}
	function assertDone(name, asyncName, complete) {
	  if (!complete) {
	    throw new Error(
	      '`' + name + '` finished async. Use `' + asyncName + '` instead'
	    )
	  }
	}
	return unified_1;
}

var unistUtilRemove;
var hasRequiredUnistUtilRemove;

function requireUnistUtilRemove () {
	if (hasRequiredUnistUtilRemove) return unistUtilRemove;
	hasRequiredUnistUtilRemove = 1;
	var convert = requireConvert$1();
	unistUtilRemove = remove;
	function remove(tree, options, test) {
	  var is = convert(test || options);
	  var cascade = options.cascade == null ? true : options.cascade;
	  return preorder(tree, null, null)
	  function preorder(node, index, parent) {
	    var children = node.children;
	    var childIndex = -1;
	    var position = 0;
	    if (is(node, index, parent)) {
	      return null
	    }
	    if (children && children.length) {
	      while (++childIndex < children.length) {
	        if (preorder(children[childIndex], childIndex, node)) {
	          children[position++] = children[childIndex];
	        }
	      }
	      if (cascade && !position) {
	        return null
	      }
	      children.length = position;
	    }
	    return node
	  }
	}
	return unistUtilRemove;
}

var definitions;
var hasRequiredDefinitions;

function requireDefinitions () {
	if (hasRequiredDefinitions) return definitions;
	hasRequiredDefinitions = 1;
	const remove = requireUnistUtilRemove();
	const visit = requireUnistUtilVisit();
	const collectDefinitions = definitions => tree => {
		visit(tree, 'definition', node => {
			definitions[node.identifier] = {
				title: node.title,
				url: node.url,
			};
		});
	};
	const removeDefinitions = () => tree => {
		remove(tree, { cascade: true }, 'definition');
	};
	definitions = {
		collectDefinitions,
		removeDefinitions,
	};
	return definitions;
}

var mdastUtilGfmTable = {};

var hasRequiredMdastUtilGfmTable;

function requireMdastUtilGfmTable () {
	if (hasRequiredMdastUtilGfmTable) return mdastUtilGfmTable;
	hasRequiredMdastUtilGfmTable = 1;
	mdastUtilGfmTable.fromMarkdown = requireFromMarkdown$2();
	mdastUtilGfmTable.toMarkdown = requireToMarkdown$2();
	return mdastUtilGfmTable;
}

var utils;
var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	const { URL } = require$$0;
	function wrap(string, ...wrappers) {
		return [
			...wrappers,
			string,
			...wrappers.reverse(),
		].join('');
	}
	function isURL(string) {
		try {
			return Boolean(new URL(string));
		} catch (error) {
			return false;
		}
	}
	function escapeSymbols(text, textType = 'text') {
		if (!text) {
			return text;
		}
		switch (textType) {
			case 'code':
				return text
					.replace(/\\/g, '\\\\')
					.replace(/`/g, '\\`')
			case 'link':
				return text
					.replace(/\\/g, '\\\\')
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
			default:
				return text
					.replace(/_/g, '\\_')
					.replace(/\*/g, '\\*')
					.replace(/\[/g, '\\[')
					.replace(/]/g, '\\]')
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
					.replace(/~/g, '\\~')
					.replace(/`/g, '\\`')
					.replace(/>/g, '\\>')
					.replace(/#/g, '\\#')
					.replace(/\+/g, '\\+')
					.replace(/-/g, '\\-')
					.replace(/=/g, '\\=')
					.replace(/\|/g, '\\|')
					.replace(/{/g, '\\{')
					.replace(/}/g, '\\}')
					.replace(/\./g, '\\.')
					.replace(/!/g, '\\!');
		}
	}
	function processUnsupportedTags(content, strategy) {
		switch (strategy) {
			case 'escape':
				return escapeSymbols(content);
			case 'remove':
				return '';
			case 'keep':
			default:
				return content;
		}
	}
	utils = {
		wrap,
		isURL,
		escapeSymbols,
		processUnsupportedTags,
	};
	return utils;
}

var telegramify;
var hasRequiredTelegramify;

function requireTelegramify () {
	if (hasRequiredTelegramify) return telegramify;
	hasRequiredTelegramify = 1;
	const defaultHandlers = requireHandle();
	const phrasing = requireContainerPhrasing();
	const {toMarkdown: gfmTableToMarkdown} = requireMdastUtilGfmTable();
	const {wrap, isURL, escapeSymbols, processUnsupportedTags} = requireUtils();
	const createHandlers = (definitions, unsupportedTagsStrategy) => ({
		heading: (node, _parent, context) => {
			const marker = '*';
			const exit = context.enter('heading');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		strong: (node, _parent, context) => {
			const marker = '*';
			const exit = context.enter('strong');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		delete(node, _parent, context) {
			const marker = '~';
			const exit = context.enter('delete');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		emphasis: (node, _parent, context) => {
			const marker = '_';
			const exit = context.enter('emphasis');
			const value = phrasing(node, context, {before: marker, after: marker});
			exit();
			return wrap(value, marker);
		},
		list: (...args) => defaultHandlers.list(...args).replace(/^(\d+)./gm, '$1\\.'),
		listItem: (...args) => defaultHandlers.listItem(...args).replace(/^\*/, '•'),
		code(node, _parent, context) {
			const exit = context.enter('code');
			const content = node.value.replace(/^#![a-z]+\n/, '');
			exit();
			return wrap(escapeSymbols(content, 'code'), '```', '\n')
		},
		link: (node, _parent, context) => {
			const exit = context.enter('link');
			const text = phrasing(node, context, {before: '|', after: '>'}) || escapeSymbols(node.title);
			const isUrlEncoded = decodeURI(node.url) !== node.url;
			const url = isUrlEncoded ? node.url : encodeURI(node.url);
			exit();
			if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);
			return text
				? `[${text}](${escapeSymbols(url, 'link')})`
				: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
		},
		linkReference: (node, _parent, context) => {
			const exit = context.enter('linkReference');
			const definition = definitions[node.identifier];
			const text = phrasing(node, context, {before: '|', after: '>'}) || (definition ? definition.title : null);
			exit();
			if (!definition || !isURL(definition.url)) return escapeSymbols(text);
			return text
				? `[${text}](${escapeSymbols(definition.url, 'link')})`
				: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
		},
		image: (node, _parent, context) => {
			const exit = context.enter('image');
			const text = node.alt || node.title;
			const url = node.url;
			exit();
			if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);
			return text
				? `[${escapeSymbols(text)}](${escapeSymbols(url, 'link')})`
				: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
		},
		imageReference: (node, _parent, context) => {
			const exit = context.enter('imageReference');
			const definition = definitions[node.identifier];
			const text = node.alt || (definition ? definition.title : null);
			exit();
			if (!definition || !isURL(definition.url)) return escapeSymbols(text);
			return text
				? `[${escapeSymbols(text)}](${escapeSymbols(definition.url, 'link')})`
				: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
		},
		text: (node, _parent, context) => {
			const exit = context.enter('text');
			const text = node.value;
			exit();
			return escapeSymbols(text);
		},
		blockquote: (node, _parent, context) => defaultHandlers.blockquote(node, _parent, context),
		html: (node, _parent, context) =>
			processUnsupportedTags(defaultHandlers.html(node, _parent, context), unsupportedTagsStrategy),
		table: (node, _parent, context) =>
			processUnsupportedTags(gfmTableToMarkdown().handlers.table(node, _parent, context), unsupportedTagsStrategy),
		thematicBreak: (_node, _parent, _context) =>
			processUnsupportedTags('---', unsupportedTagsStrategy),
	});
	const createOptions = (definitions, unsupportedTagsStrategy) => ({
		bullet: '*',
		tightDefinitions: true,
		handlers: createHandlers(definitions, unsupportedTagsStrategy),
	});
	telegramify = createOptions;
	return telegramify;
}

var convert$1;
var hasRequiredConvert;

function requireConvert () {
	if (hasRequiredConvert) return convert$1;
	hasRequiredConvert = 1;
	const gfm = requireRemarkGfm();
	const parse = requireRemarkParse();
	const stringify = requireRemarkStringify();
	const removeComments = requireRemarkRemoveComments();
	const unified = requireUnified();
	const { collectDefinitions, removeDefinitions } = requireDefinitions();
	const createTelegramifyOptions = requireTelegramify();
	convert$1 = (markdown, unsupportedTagsStrategy) => {
		const definitions = {};
		const telegramifyOptions = createTelegramifyOptions(definitions, unsupportedTagsStrategy);
		return unified()
			.use(parse)
			.use(gfm)
			.use(removeComments)
			.use(collectDefinitions, definitions)
			.use(removeDefinitions)
			.use(stringify, telegramifyOptions)
			.processSync(markdown)
			.toString()
			.replace(/<!---->\n/gi, '');
	};
	return convert$1;
}

var telegramifyMarkdown;
var hasRequiredTelegramifyMarkdown;

function requireTelegramifyMarkdown () {
	if (hasRequiredTelegramifyMarkdown) return telegramifyMarkdown;
	hasRequiredTelegramifyMarkdown = 1;
	telegramifyMarkdown = requireConvert();
	return telegramifyMarkdown;
}

var telegramifyMarkdownExports = requireTelegramifyMarkdown();
const convert = /*@__PURE__*/getDefaultExportFromCjs(telegramifyMarkdownExports);

function applyMessageRender() {
  if (ENV.CONFIG.settings.defaultParseMode === "MarkdownV2") {
    ENV.CUSTOM_MESSAGE_RENDER = (parseMode, message) => {
      if (parseMode === "MarkdownV2") {
        return convert(message, "remove");
      }
      return message;
    };
  }
}

const app = createApp({
  onRequest: (env) => {
    ENV.merge(env ?? {});
    applyMessageRender();
  }
});

export { app as default };
//# sourceMappingURL=index.js.map
