import { Request, Response, NextFunction } from "express";
import prisma from "../../common/utils/db";
import createError, { ErrorI } from "../../common/utils/error";
import { CodeSchema, Code } from "../../common/typedefs/types";

export const executeCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.body;
    const userId = req.get("judge1UserId");
    CodeSchema.parse(code);

    const savedCode = await prisma.code.create({
      data: {
        user: {
          connect: {
            id: parseInt(userId!),
          },
        },
        ...code,
      },
    });

    res
      .json({
        data: { submission_id: savedCode.id },
        msg: "Pushed code in execution queue",
      })
      .status(201);
  } catch (e) {
    next(createError(e as ErrorI));
  }
};
