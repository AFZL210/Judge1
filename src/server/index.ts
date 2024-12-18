import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

app.use(express.json());

const PORT = process.env.HTTP_SERVER_PORT;

app.listen(PORT, () => {
    console.log(`HTTP Server running on`, `http://localhost:${PORT}`);
});
