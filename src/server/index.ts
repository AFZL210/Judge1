import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { singleCodeController } from './controllers/code';
import { AuthController } from './controllers/auth';

const app = express();
app.use(express.json());
const PORT = process.env.SERVER_PORT;

app.post('/submit', AuthController, singleCodeController);

app.listen(5000, () => {
    console.log(`Server running on PORT ${PORT}`);
});