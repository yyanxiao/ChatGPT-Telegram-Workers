import { createShareConfig } from '../../../vite.config.shared';

// Cloudflare Workers 入口:自包含单文件,core(含内联管理页)全部打包进产物,
// 支持单文件 copy-paste 部署,除 platform runtime 外零外部依赖。
export default createShareConfig({
    root: import.meta.dirname,
    entry: 'src/index.ts',
    fileName: 'index',
    nodeExternals: false,
});
