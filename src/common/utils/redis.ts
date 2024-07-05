import Redis from 'ioredis';
import { Queue } from 'bullmq';
import constants from '../../constants';

const globalForRedis = global as unknown as {
    redis: Redis
    queue: Queue
}

export const redis =
    globalForRedis.redis ??
    new Redis();

export const queue =
    globalForRedis.queue ??
    new Queue(constants.CODE_QUEUE_NAME);

if (process.env.NODE_ENV !== 'PROD') {
    globalForRedis.redis = redis;
    globalForRedis.queue = queue;
}