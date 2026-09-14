import { createVitestConfig } from '../../../vitest.config.shared';

export default createVitestConfig({
    root: import.meta.dirname,
    hashAlias: true,
    workspaceDeps: ['ai', 'agent', 'config', 'telegram', 'plugins', 'i18n', 'web'],
});
