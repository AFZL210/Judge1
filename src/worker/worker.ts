import * as dotenv from "dotenv";
dotenv.config();
import { Job, Worker } from "bullmq";
import * as constants from "../constants";
import { CodeJob } from "../common/typedefs/types";
import DockerService from "../common/docker_service";
import cluster from "cluster";
import os from "os";

const workerCount = Math.min(os.availableParallelism(), constants.MAX_WORKERS);

if (cluster.isPrimary) {
  for (let i = 0; i < workerCount; i++) {
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
    dockerService.executeCode();
  };

  const codeRunner = new Worker(constants.CODE_QUEUE, jobHandler, {
    connection: {},
  });
}
