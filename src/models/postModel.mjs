import mongoose from "mongoose";
//Schéma de mes posts pour faciliter leurs création dans la mongoDB
const postSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  const Post = mongoose.model('Post', postSchema);

  export default Post;