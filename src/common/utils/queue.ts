import { Queue } from "bullmq";
import * as constants from "../../constants";

const globalForQueue = global as unknown as {
  queue: Queue;
};

export const queue = globalForQueue.queue ?? new Queue(constants.CODE_QUEUE);

if (process.env.NODE_ENV !== "PROD") {
  globalForQueue.queue = queue;
}
