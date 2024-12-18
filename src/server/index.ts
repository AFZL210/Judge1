import * as dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
const app = express();

app.use(express.json());

const PORT = process.env.HTTP_SERVER_PORT;

app.use('/api', routes);

app.use((err: { status: number, message: string }, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    res.status(errorStatus).json(errorMessage);
});

app.listen(PORT, () => {
    console.log(`HTTP Server running on`, `http://localhost:${PORT}`);
});
