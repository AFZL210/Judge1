import { Request, Response } from "express";
import { Code, CodeI } from "../../common/typedefs/types";
import { QueueService } from "../services/queue-service";

export const singleCodeController = async (req: Request, res: Response) => {
    try {
        const { code }: { code: CodeI } = req.body;
        Code.parse(code);

        const queueService = new QueueService();
        queueService.addToQueue(code);

        res.status(200).json({
            message: `Added code with id: ${code.codeId} to the ${process.env.REDIS_QUEUE_NAME} queue.`
        });
    }
    catch (e) {
        res.status(400).json(e);
    }
}