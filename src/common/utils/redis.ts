import Redis from 'ioredis';
import { Queue } from 'bullmq';
import Docker from 'dockerode';
import constants from '../../constants';

const globalForRedis = global as unknown as {
    redis: Redis
    queue: Queue
    docker: Docker
}

export const redis =
    globalForRedis.redis ??
    new Redis();

export const queue =
    globalForRedis.queue ??
    new Queue(constants.CODE_QUEUE_NAME);

export const docker =
    globalForRedis.docker ??
    new Docker();

if (process.env.NODE_ENV !== 'PROD') {
    globalForRedis.redis = redis;
    globalForRedis.queue = queue;
    globalForRedis.docker = docker;
}