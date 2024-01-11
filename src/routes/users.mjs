import express from "express";
const userRouter = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} from "../controllers/userController.mjs";

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/profile")
    .get(getUserProfile)
    .put(updateUserProfile);//je connaissais pas cette methode pour chainer mais tres pratique





export default userRouter;
