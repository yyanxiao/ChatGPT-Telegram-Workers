import { createShareConfig } from '../../../vite.config.shared';

export default createShareConfig({
    root: import.meta.dirname,
    types: true,
    nodeExternals: true,
});
