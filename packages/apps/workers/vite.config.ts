import { createShareConfig } from '../../../vite.config.shared';

// Cloudflare Workers 入口:自包含单文件,core(含内联管理页)全部打包进产物,
// 支持单文件 copy-paste 部署,除 platform runtime 外零外部依赖。
export default createShareConfig({
    root: __dirname,
    entry: 'src/index.ts',
    fileName: 'index',
    nodeExternals: false,
    // workerd 通过 nodejs_compat 提供 Node 内建;保留 external 而非打桩,
    // 否则 telegramify-markdown 的 require('url') 会拿到空壳,导致链接被丢弃
    builtinExternals: true,
});
