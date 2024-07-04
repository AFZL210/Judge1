import { Request, Response, NextFunction } from "express"

export const AuthController = (req: Request, res: Response, next: NextFunction) => {
    const secret = req.headers['judge1-secret'];

    if(!secret || secret !== process.env.SERVER_SECRET) {
        res.status(401).json({message: 'Not authorized'});
        return ;
    }

    next();
}