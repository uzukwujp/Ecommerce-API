import { Router } from "express";
import { signIn, signUp } from "../controllers/user";
const userRouter = Router();

userRouter.route("/signin").post(signIn);
userRouter.route("/signup").post(signUp);

export default userRouter;
