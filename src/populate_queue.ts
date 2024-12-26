import axios from "axios";

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

  const promises = [];

  for (let i = 0; i < 100; i++) {
    const request = axios.post(url, body, { headers });
    promises.push(request);
  }

  try {
    await Promise.all(promises);
    console.log("done");
  } catch (error) {
    console.error(error);
  }
};

makeRequests();
