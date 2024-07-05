import * as dotenv from 'dotenv';
dotenv.config();
import { Job, Worker } from "bullmq";
import { CodeI, Output } from '../common/typedefs/types';
import { redis } from '../common/utils/redis';
import constants from '../constants';
import DockerService from './services/docker_service';

const worker = new Worker(constants.CODE_QUEUE_NAME, async (job: Job) => {
    const data: CodeI = job.data;

    const docker = new DockerService(data);

    docker.executeCode().then(async (output: Output) => {
        await redis.set(data.codeId, JSON.stringify(output));
    });
}, { connection: {} });
