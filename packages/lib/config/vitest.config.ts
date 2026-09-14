import { createVitestConfig } from '../../../vitest.config.shared';

export default createVitestConfig({
    root: __dirname,
    workspaceDeps: ['i18n'],
});
