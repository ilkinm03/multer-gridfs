import { Request, Response, NextFunction } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.send({ file: req.file });
  } catch (error) {
    next(error);
  }
};
