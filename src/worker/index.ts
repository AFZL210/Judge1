import * as dotenv from 'dotenv';
dotenv.config();
import { Job, Worker } from "bullmq";
import { CodeI } from '../common/typedefs/types';
import Redis from 'ioredis';
import constants from '../constants';
import DockerService from './services/docker_service';

const redis = new Redis();

const worker = new Worker(constants.CODE_QUEUE_NAME, async (job: Job) => {
    const data: CodeI = job.data;

    const docker = new DockerService(data);
    const container = await docker.createContainer();

    await container.start();
    const containerExitStatus = await container.wait();
    const logs = await docker.getLogs();

    if (containerExitStatus.StatusCode == 0) {
        await redis.set(data.codeId, JSON.stringify(logs.toString()));
    }
    else {
        await redis.set(data.codeId, logs.toString());
    }

}, { connection: {} });
