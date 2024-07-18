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
      // console.log(data)
      // const post = new Post();
      const allPosts = await Post.find({userId:data}).populate("labels").populate("userId");
      console.log(allPosts)
      resolve(allPosts);
    } catch (error) {
      reject(error);
    }
  });

}

const removePost=(postId)=>{
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findById(postId);

      if(!post){
        throw new Error("Post doesn't exist")
      }else{
        // console.log(post)
        // const deletedPost= await Post.findByIdAndDelete(postId)
         const deletedPost= await Post.deleteOne({_id:postId});
        // console.log(deletedPost)
        resolve(deletedPost);
      }

   
    } catch (error) {
      reject(error);
    }
  });
}

const updatePost=(data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findById(data.postId);
      if(!post){
        throw new Error("Post doesn't exist")
      }else{
        // console.log(post)
         const updatedPost= await Post.updateOne({_id:data.postId},{
          title:data.title,
          content:data.content,
          labels:data.labels,
          comment_options:data.comment_options

         });
        // console.log(updatedPost)
        resolve(updatedPost);
      }

    }catch(error){
      reject(error);
    }
})
}

export { createNewPost, getAllPost,removePost,updatePost };
