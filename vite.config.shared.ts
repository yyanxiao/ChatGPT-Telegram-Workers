import type { LibraryFormats, Plugin, UserConfig } from 'vite';
import * as path from 'node:path';
import { builtinModules } from 'node:module';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import { nodeExternals } from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export interface Options {
    root: string;
    types?: boolean;
    formats?: LibraryFormats[];
    nodeExternals?: boolean;
    excludeMonoRepoPackages?: boolean;
    /**
     * 保留 Node 内建为外部依赖而不打桩(Workers 单文件产物需要:
     * workerd 的 nodejs_compat 在运行时提供,而非 Vite 的浏览器空壳)。
     */
    builtinExternals?: boolean;
    /** 单入口(相对 root),默认 src/index。与 entries 二选一。 */
    entry?: string;
    /** 输出文件名(不含扩展名),默认 index。 */
    fileName?: string;
    /** 多入口:key 为输出文件名(不含扩展名),value 为相对 root 的入口路径 */
    entries?: Record<string, string>;
    /** 多次构建写入同一 outDir 时设为 false,避免清空先前产物 */
    emptyOutDir?: boolean;
}

/** 匹配 Node 内建模块的裸名与 `node:` 前缀形式 */
const NODE_BUILTIN_PATTERN = new RegExp(
    `^(node:)?(${builtinModules.filter(m => !m.startsWith('_')).join('|')})(/.*)?$`,
);

export function createShareConfig(options: Options): UserConfig {
    const plugins: Plugin[] = [
        nodeResolve({
            browser: false,
            preferBuiltins: true,
        }),
        cleanup({
            comments: 'none',
            extensions: ['js', 'ts'],
        }),
        checker({
            typescript: true,
        }),
    ];
    if (options.types) {
        plugins.push(
            dts({
                rollupTypes: true,
            }),
        );
    }
    if (options.nodeExternals) {
        const exclude = new Array<RegExp>();
        if (options.excludeMonoRepoPackages) {
            exclude.push(/^@chatgpt-telegram-workers\/.+/);
        }
        plugins.push(
            nodeExternals({
                exclude,
            }),
        );
    }
    const entry = options.entries
        ? Object.fromEntries(
              Object.entries(options.entries).map(([name, rel]) => [name, path.resolve(options.root, rel)]),
          )
        : path.resolve(options.root, options.entry || 'src/index');
    // 单入口保持 fileName 字符串(vite 会按 format 追加 .js/.cjs);
    // 多入口用函数,文件名即入口名。
    const fileName = options.fileName
        ? options.fileName
        : options.entries
          ? (format: string, entryName: string) => `${entryName}.js`
          : 'index';
    return defineConfig({
        plugins,
        build: {
            target: 'esnext',
            lib: {
                entry,
                fileName,
                formats: options.formats || ['es'],
            },
            emptyOutDir: options.emptyOutDir ?? true,
            sourcemap: true,
            minify: false,
            outDir: path.resolve(options.root, 'dist'),
            ...(options.builtinExternals
                ? { rollupOptions: { external: (id: string) => NODE_BUILTIN_PATTERN.test(id) } }
                : {}),
        },
    });
}
