import express from "express";
const userRouter = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} from "../controllers/userController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
//configuration des routes d'auhthentification.
userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);//je connaissais pas cette methode pour chainer mais tres pratique





export default userRouter;
