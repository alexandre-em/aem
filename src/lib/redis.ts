import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIST_REST_URL!,
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIST_REST_TOKEN!,
});

export const redisKeys = {
  projects: 'projects',
  blog: 'blog',
};
