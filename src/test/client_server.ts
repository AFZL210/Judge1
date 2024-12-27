import express, { Request, Response } from "express";
import { ReqI } from "./params";
import fs from "fs";
import path from "path";
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

app.get("/metrics", (req: Request, res: Response) => {
  const reqRawData = fs.readFileSync(path.join(__dirname, "req.json"), "utf8");
  const reqData = JSON.parse(reqRawData);

  const map: any = new Map(reqData.map((item: any) => [item.id, item.timestamp]));

  resData.forEach((data: any) => {
    map.set(data.id, map.get(data.id) - data.timestamp);
  });

  console.log(map);
});

app.listen(PORT, () => {
  console.log(`client server running on http://localhost:${PORT}`);
});
