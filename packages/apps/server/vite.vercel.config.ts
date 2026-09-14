import { createShareConfig } from '../../../vite.config.shared';

// Vercel(Node.js runtime)入口:运行时自带 node_modules,外部化第三方依赖。
export default createShareConfig({
    root: import.meta.dirname,
    entry: 'src/vercel.ts',
    fileName: 'vercel',
    nodeExternals: true,
    excludeMonoRepoPackages: true,
    emptyOutDir: false,
});
