import worker from 'chatgpt-telegram-workers';
import { RedisCache } from 'cloudflare-worker-adapter/redisCache';

// cloudflare to vercel adapter
export default async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    const redis = RedisCache.createFromUri(process.env.REDIS_URL);
    const env = {
        ...Object.assign({}, process.env),
        DATABASE: redis,
    };
    const domain = env.VERCEL_DOMAIN;
    const cfReq = new Request(domain + req.url, {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(req.body),
    });
    const resp = await worker.fetch(cfReq, env);
    await redis.close();
    res.status(resp.status);
    for (const [key, value] of resp.headers) {
        res.setHeader(key, value);
    }
    res.send(await resp.text());
};
