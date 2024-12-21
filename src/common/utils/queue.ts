import { Queue } from "bullmq";

const globalForQueue = global as unknown as {
  queue: Queue;
};

export const queue = globalForQueue.queue ?? new Queue("code-queue");

if (process.env.NODE_ENV !== "PROD") {
  globalForQueue.queue = queue;
}
