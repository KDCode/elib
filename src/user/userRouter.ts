import express from "express";

const userRouter = express.Router();

//Routes

userRouter.post("/register", (req, res) => {
  res.json({ message: "User registered" });
});
export default userRouter;
