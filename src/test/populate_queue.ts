import axios from "axios";
import { REQUESTS_COUNT, ReqI } from "./params";
import fs from "fs";
import path from "path";

const reqData: ReqI[] = [];

const makeRequests = async () => {
  const url = "http://localhost:8080/api/execute";
  const headers = {
    judge1AuthToken: "test",
    judge1UserId: "1",
  };
  const body = {
    code: {
      code: `let sum = 0;
        for (let i = 1; i <= 1000; i++) {
          sum += i;
        }
        console.log('Sum from 1 to 1000:', sum);

      for (let j = 0; j < 4; j++) {
        console.log('Hello');
      }`,
      lang: "js",
      input: "",
    },
    callback_url: "http://localhost:5001/catch-output",
  };

  const promises: any = [];

  for (let i = 0; i < REQUESTS_COUNT; i++) {
    const request = axios.post(url, body, { headers });
    promises.push(request);
  }

  Promise.all(promises)
    .then((d: any) => {
      console.log("pushed codes to quque");
      for (let i = 0; i < REQUESTS_COUNT; i++) {
        reqData.push({
          id: d[i].data.data.submission_id,
          timestamp: new Date().getTime(),
        });
      }
      const inputPath = path.join(__dirname, "req.json");
      fs.writeFileSync(inputPath, JSON.stringify(reqData, null, 2));
    })
    .catch((err) => console.log("error pushing codes", err));
};

makeRequests();
