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

  res.json(codes);
});

app.listen(PORT, () => {
  console.log(`client server running on http://localhost:${PORT}`);
});
