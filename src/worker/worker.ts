import * as dotenv from "dotenv";
dotenv.config();
import { Job, Worker } from "bullmq";
import * as constants from "../constants";
import { CodeJob } from "../common/typedefs/types";

const jobHandler = async (job: Job) => {
  const data: CodeJob = job.data;
  console.log(data);
};

const worker = new Worker(constants.CODE_QUEUE, jobHandler, { connection: {} });
