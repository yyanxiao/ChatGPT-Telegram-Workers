import type { LibraryFormats, Plugin, UserConfig } from 'vite';
import * as path from 'node:path';
import { createRequire } from 'node:module';
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
    /** 单入口(相对 root),默认 src/index。与 entries 二选一。 */
    entry?: string;
    /** 输出文件名(不含扩展名),默认 index。 */
    fileName?: string;
    /** 多入口:key 为输出文件名(不含扩展名),value 为相对 root 的入口路径 */
    entries?: Record<string, string>;
    /** 多次构建写入同一 outDir 时设为 false,避免清空先前产物 */
    emptyOutDir?: boolean;
}

/**
 * `bundleTypes` 由 api-extractor 打包 .d.ts,而它内置的 TypeScript 版本无法解析
 * 由 `@typescript/typescript6` 生成的声明(报 `Unable to follow symbol for "Record"`),
 * TypeScript 7 又不再提供经典 JS Compiler API。这里定位到 `@typescript/typescript6`
 * 实际桥接的 TypeScript 6,显式交给 api-extractor 使用。
 */
function resolveDtsCompilerFolder(): string | undefined {
    try {
        const bridgePkg = createRequire(import.meta.url).resolve('@typescript/typescript6/package.json');
        return path.dirname(createRequire(bridgePkg).resolve('@typescript/old/package.json'));
    } catch {
        return undefined;
    }
}

export function createShareConfig(options: Options): UserConfig {
    const plugins: Plugin[] = [
        cleanup({
            comments: 'none',
            extensions: ['js', 'ts'],
        }),
        checker({
            typescript: true,
        }),
    ];
    if (options.types) {
        const compilerFolder = resolveDtsCompilerFolder();
        plugins.push(
            dts({
                // invokeOptions 仅在 bundleTypes 为对象时生效
                bundleTypes: compilerFolder ? { invokeOptions: { typescriptCompilerFolder: compilerFolder } } : true,
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
        },
    });
}
