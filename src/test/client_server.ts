import express, { Request, Response } from "express";
import { ReqI } from "./params";
import fs from "fs";
import path from "path";
import * as constants from '../constants';
import prisma from "../common/utils/db";
const app = express();
const PORT = 5001;

app.use(express.json());

let startTime = 0;

const resData: ReqI[] = [];

app.post("/catch-output", (req: Request, res: Response) => {
  const { output } = req.body;
  resData.push({
    id: output.submission_id,
    timestamp: new Date().getTime(),
  });
  res.send();
});

app.get("/metrics", async (req: Request, res: Response) => {
  let timeE = 0;

  if (startTime === 0) {
    startTime = Date.now();
  }

  if (startTime) {
    timeE = Date.now() - startTime;
  }


  const codes = await prisma.code.findMany({
    where: {
      execution_time: {
        gt: 0
      }
    }
  });
  const codeCount = await prisma.code.count();

  let timeSum = 0;
  let len = codes.length;

  for(let i=0; i<len; i++) {
    timeSum += codes[i].execution_time;
  }

  res.json({
    total_codes: codeCount,
    executed_count: len,
    time_elapsed: timeE,
    worker_count: constants.MAX_WORKERS,
    average_execution_time: (timeSum/len),
    longest_execution_time: Math.max(...(codes.map(code => code.execution_time)))
  });
});

app.listen(PORT, () => {
  console.log(`client server running on http://localhost:${PORT}`);
});
