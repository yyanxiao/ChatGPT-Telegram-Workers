import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { parse } from 'jsonc-parser';

async function main() {
    const {
        WRANGLER_PATH = 'wrangler.jsonc',
        VERCEL_ENV = 'production',
        VERCEL_BIN = './node_modules/.bin/vercel',
    } = process.env;

    const envs = execSync(`${VERCEL_BIN} env ls ${VERCEL_ENV}`, { encoding: 'utf-8' })
        .trim()
        .split('\n')
        .map(l => l.trim())
        .slice(1)
        .map(l => l.split(/\s+/)[0])
        .map(l => l.replace(/[^\x20-\x7E]/g, '').replace(/\[\d+m/g, ''));
    const usedKeys = new Set<string>();
    usedKeys.add('UPSTASH_REDIS_REST_URL');
    usedKeys.add('UPSTASH_REDIS_REST_TOKEN');
    const { vars = {} } = parse(await fs.readFile(WRANGLER_PATH, 'utf-8'), undefined, {
        allowTrailingComma: true,
    });
    for (const [key, value] of Object.entries(vars)) {
        try {
            usedKeys.add(key);
            execSync(`${VERCEL_BIN} env add ${key} ${VERCEL_ENV} --force`, {
                input: `${value}`,
                encoding: 'utf-8',
            });
        } catch (e) {
            console.error(e);
        }
    }
    for (const key of envs) {
        if (!usedKeys.has(key)) {
            console.log(
                `Keep ${key}: not declared in ${WRANGLER_PATH}. Vercel variables are managed in the dashboard; remove it manually if unneeded.`,
            );
        }
    }
}

main().catch(console.error);
