import * as dotenv from "dotenv";
dotenv.config();
import { Job, Worker } from "bullmq";
import * as constants from "../constants";
import { CodeJob } from "../common/typedefs/types";
import DockerService from "../common/docker_service";
import cluster from "cluster";
import os from "os";

const WORKER_COUNT = Math.min(os.availableParallelism(), constants.MAX_WORKERS);
const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PORT = parseInt(process.env.REDIS_PORT!);

if (cluster.isPrimary) {
  for (let i = 0; i < WORKER_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`worker ${process.pid} started`);
  const dockerService = new DockerService();

  const jobHandler = async (job: Job) => {
    const data: CodeJob = job.data;

    dockerService.setCode(data);
    await dockerService.executeCode();
  };

  const codeRunner = new Worker(constants.CODE_QUEUE, jobHandler, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  });
}
