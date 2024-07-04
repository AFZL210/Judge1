import { Request, Response } from "express";
import { Code, CodeI } from "../../common/typedefs/types";

export const singleCodeController = async (req: Request, res: Response) => {
    try {
        const { code }: { code: CodeI } = req.body;
        Code.parse(code);
        res.json(code);
    }
    catch(e) {
        res.status(400).json(e);
    }
}