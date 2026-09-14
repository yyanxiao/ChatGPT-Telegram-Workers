import { createVitestConfig } from '../../../vitest.config.shared';

export default createVitestConfig({
    root: import.meta.dirname,
    workspaceDeps: ['ai', 'config', 'i18n'],
});
