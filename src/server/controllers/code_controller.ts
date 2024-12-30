import { Request, Response, NextFunction } from "express";
import prisma from "../../common/utils/db";
import createError, { ErrorI } from "../../common/utils/error";
import { CodeSchema, Code } from "../../common/typedefs/types";
import { queue } from "../../common/utils/queue";

export const executeCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, callback_url }: { code: Code; callback_url: string } =
      req.body;
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
        callback_url,
      },
    });

    await queue.add(`code-job-${savedCode.id}`, savedCode);

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

export const result = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { submission_id } = req.body;

    const code = await prisma.code.findUnique({
      where: {
        id: submission_id,
      },
    });

    if (!code) {
      throw new Error("Invalid submission_id: Code not found.");
    }

    res.json(code).status(200);
  } catch (e) {
    next(createError(e as ErrorI));
  }
};
