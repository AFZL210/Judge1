import * as dotenv from 'dotenv';
dotenv.config();
import { Job, Worker } from "bullmq";

const worker = new Worker(process.env.REDIS_QUEUE_NAME!, async (job: Job) =>  {
    
}, { connection: {} });