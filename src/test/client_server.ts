import express, { Request, Response } from "express";
import { ReqI } from "./params";
import fs from "fs";
import path from "path";
import prisma from "../common/utils/db";
const app = express();
const PORT = 5001;

app.use(express.json());

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
  const codes = await prisma.code.findMany();

  let timeSum = 0;
  let len = codes.length;

  for(let i=0; i<len; i++) {
    timeSum += codes[i].execution_time;
  }

  res.json({
    number_of_code_executed: len,
    average_execution_time: (timeSum/len),
    longest_execution_time: Math.max(...(codes.map(code => code.execution_time)))
  });
});

app.listen(PORT, () => {
  console.log(`client server running on http://localhost:${PORT}`);
});
