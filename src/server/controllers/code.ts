import { Request, Response } from "express";
import { Code, CodeI } from "../../common/typedefs/types";
import { QueueService } from "../services/queue-service";
import { redis } from "../../common/utils/redis";

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

export const resultController = async (req: Request, res: Response) => {
    try {
        const codeId = req.params.codeId;
        const output = await redis.get(codeId);

        if (!output) {
            return res.status(400).json({
                message: "invalid codeId"
            });
        }
        await redis.del([codeId]);
        res.status(200).json({
            output: JSON.parse(output)
        });
    }
    catch (e) {
        res.status(400).json(e);
    }
}