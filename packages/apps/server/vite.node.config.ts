import { createShareConfig } from '../../../vite.config.shared';

// Node/Docker 入口:运行时自带 node_modules,外部化第三方依赖。
export default createShareConfig({
    root: import.meta.dirname,
    entry: 'src/node.ts',
    fileName: 'node',
    nodeExternals: true,
    excludeMonoRepoPackages: true,
    emptyOutDir: false,
});
