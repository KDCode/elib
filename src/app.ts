import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

import { createUser } from "./user/userController";
const app = express();

// Routes
// Http Methods GET POST PUT PATCH DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", createUser);

//Global error handler always it should be in last after routes
app.use(globalErrorHandler);

export default app;
