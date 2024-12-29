import { Queue } from "bullmq";
import * as constants from "../../constants";

const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PORT = parseInt(process.env.REDIS_PORT!);

const globalForQueue = global as unknown as {
  queue: Queue;
};

export const queue =
  globalForQueue.queue ??
  new Queue(constants.CODE_QUEUE, {
    connection: { host: REDIS_HOST, port: REDIS_PORT },
  });

if (process.env.NODE_ENV !== "PROD") {
  globalForQueue.queue = queue;
}
