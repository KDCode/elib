import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();

// Routes
// Http Methods GET POST PUT PATCH DELETE
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "something went error");
  throw error;

  res.json({ message: "Welcome to elib apis" });
});

//Global error handler always it should be in last after routes
app.use(globalErrorHandler);

export default app;
