import { Job } from 'bullmq';
import { CodeI } from '../../common/typedefs/types';
import { queue } from '../../common/utils/redis';

export class QueueService {
    constructor() {}

    async addToQueue(code: CodeI): Promise<Job> {
        const res = await queue.add(code.codeId, code);
        return res;
    }
}
