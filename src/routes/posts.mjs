import limiter from "../middlewares/ratelimit.mjs";
import express from "express";
import{
    getPosts,
    singlePost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.mjs";

//Configuration des routes de mon blog.
const postRouter = express.Router();

postRouter.route("/")
    .get(getPosts)
    .post(limiter, createPost);
postRouter.route("/:id")
    .get(singlePost)
    .patch(updatePost)
    .delete(deletePost);

export default postRouter