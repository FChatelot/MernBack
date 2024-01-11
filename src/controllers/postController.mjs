import Post from "../models/postModel.mjs";
import asyncHandler from 'express-async-handler'
//
//
//
 const getPosts = asyncHandler(async (req, res) => {
 const posts = await Post.find()
  res.status(200).json(posts);
});


//
//
// This section will help you get a single post by id
 const singlePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error("Post non trouvé.")
    }
  res.status(200).json(post);
});

//
//
// This section will help you create a new post.
const createPost = asyncHandler(async (req, res) => {
if(!req.body.title){
    res.status(400);
    throw new Error("Merci d'ajouter un titre.");
    }
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
    });
    res.status(200).json(post);
});

//
//
// This section will help you update a post by id.
 const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error("Post non trouvé.")
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    });
  res.status(200).json(updatedPost);
});

//
//
// This section will help you delete a post
 const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error ("Post non trouvé.")
    }
    await post.deleteOne();
    
  res.status(200).json({ id: req.params.id });
});

export {
    getPosts,
    singlePost,
    createPost,
    updatePost,
    deletePost
}