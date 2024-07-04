import { Job, Queue } from 'bullmq';
import { CodeI } from '../../common/typedefs/types';

const queue = new Queue(process.env.REDIS_QUEUE_NAME!);

export class QueueService {
    constructor() {}

    async addToQueue(code: CodeI): Promise<Job> {
        const res = await queue.add(code.codeId, code);
        return res;
    }
}
