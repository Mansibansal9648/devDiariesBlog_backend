import { Post } from "../schemas/postSchema.js";
const createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = new Post(data);
      const newPost = await post.save();
      resolve(newPost);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPost=(data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data)
      // const post = new Post();
      const allPosts = await Post.find({userId:data});
      console.log(allPosts)
      resolve(allPosts);
    } catch (error) {
      reject(error);
    }
  });

}

export { createNewPost, getAllPost };
