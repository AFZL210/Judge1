import * as dotenv from "dotenv";
dotenv.config();
import { Job, Worker } from "bullmq";
import * as constants from "../constants";
import { CodeJob } from "../common/typedefs/types";
import DockerService from "../common/docker_service";

const dockerService = new DockerService();

const jobHandler = async (job: Job) => {
  const data: CodeJob = job.data;
  
  dockerService.setCode(data);
  dockerService.executeCode();

  console.log(data);
};

const codeRunner = new Worker(constants.CODE_QUEUE, jobHandler, { connection: {} });
