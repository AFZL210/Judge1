import * as dotenv from 'dotenv';
dotenv.config();
import { Job, Worker } from "bullmq";
import axios from 'axios';
import { CodeI } from '../common/typedefs/types';

const worker = new Worker(process.env.REDIS_QUEUE_NAME!, async (job: Job) =>  {
    const data: CodeI = job.data
    const output = "DUMMY_OUTPUT";

    await axios.post(data.callbackUrl, {
        output
    });
}, { connection: {} });