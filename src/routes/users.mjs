import express from "express";
const userRouter = express.Router();
import { authUser } from "../controllers/userController.mjs";

userRouter.post("/auth", authUser)




export default userRouter;
