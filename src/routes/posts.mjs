import limiter from "../middlewares/ratelimit.mjs";
import express from "express";
import{
    getPosts,
    singlePost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
//Configuration des routes de mon blog.
const postRouter = express.Router();

postRouter.route("/")
    .get(protect,getPosts)
    .post( protect, limiter, createPost);
postRouter.route("/:id")
    .get(protect, singlePost)
    .patch(protect, updatePost)
    .delete(protect, deletePost);

export default postRouter