import Post from "../models/postModel.mjs";
import asyncHandler from 'express-async-handler'
/**
 * 
 * Le postController s'occupe de connecter l'User aux routes.
 * J'y gère tout mes endpoint et mes requetes.
 */

//
//
//Je GET tout mes posts.
 const getPosts = asyncHandler(async (req, res) => {
 const posts = await Post.find()
  res.status(200).json(posts);
});


//
//
// J'en GET un seul via un id.
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
// Je créé un nouveau post.
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
// J'Update mon post grace à l'id.
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
// Je delete mon post via cette section.
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