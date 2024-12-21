import { Request, Response, NextFunction } from "express";
import createError, { ErrorI } from "../common/utils/error";
import prisma from "../common/utils/db";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const judge1AuthToken = req.get("judge1AuthToken");
    const judge1UserId = req.get("judge1UserId");

    if (!judge1AuthToken || !judge1UserId) {
      res.json({
        data: null,
        msg: "Judge1 Auth token or user id cannot be empty",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(judge1UserId as string),
      },
    });

    if (!user) {
      res.json({ data: null, msg: "Invalid Judge1 user id" });
      return;
    }

    if (user.auth_token !== judge1AuthToken) {
      res.json({ data: null, msg: "Invalid Judge1 auth token" });
      return;
    }

    next();
  } catch (e) {
    console.log(e);
    res.json({ data: null, msg: "Something went wrong" }).status(400);
  }
};
