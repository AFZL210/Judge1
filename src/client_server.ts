import express, { Request, Response } from "express";
const app = express();
const PORT = 5001;

app.use(express.json());

app.post("/catch-output", (req: Request, res: Response) => {
  const { output } = req.body;
  console.log(output);
  res.send();
});

app.listen(PORT, () => {
  console.log(`client server running on http://localhost:${PORT}`);
});
