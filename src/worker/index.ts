import * as dotenv from 'dotenv';
dotenv.config();
import { Job, Worker } from "bullmq";
import { CodeI } from '../common/typedefs/types';
import Redis from 'ioredis';
import constants from '../constants';

const redis = new Redis();

const worker = new Worker(constants.CODE_QUEUE_NAME, async (job: Job) => {
    const data: CodeI = job.data;
    const output = "DUMMY_OUTPUT";
    await redis.set(data.codeId, JSON.stringify(output));
}, { connection: {} });