import { Request, Response, NextFunction } from "express";
import prisma from '../../common/utils/db';
import { UserSchema } from "../../common/typedefs/types";
import createError, {ErrorI} from "../../common/utils/error";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    UserSchema.parse(user);

    await prisma.user.create({
      data: user
    });

    res.json({ data: null, msg: 'Created user!' }).status(201);
  }
  catch (e) {
    next(createError(e as ErrorI));
  }
}