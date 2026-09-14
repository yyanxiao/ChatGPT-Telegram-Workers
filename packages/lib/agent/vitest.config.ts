import { createVitestConfig } from '../../../vitest.config.shared';

export default createVitestConfig({
    root: __dirname,
    workspaceDeps: ['ai', 'config', 'i18n'],
});
