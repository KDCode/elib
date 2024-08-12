import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
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

  // 2 Process
  //Password --> hash Will take more cpu time so await
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  //Token generation JWT
  const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  // 3 Response

  res.json({ accessToken: token });
};

export { createUser };
