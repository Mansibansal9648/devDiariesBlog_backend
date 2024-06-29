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

export { createNewPost };
