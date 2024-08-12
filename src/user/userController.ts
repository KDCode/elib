import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // 1 Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");

    return next(error);
  }

  //Database call
  const user = await userModel.findOne({ email });

  if (user) {
    const error = createHttpError(400, "User Already exist with this email");
    return next(error);
  }

  //Password --> hash Will take more cpu time so await
  const hashedPassword = await bcrypt.hash(password, 10);
  // 2 Process
  // 3 Response

  res.json({ message: "User created" });
};

export { createUser };
