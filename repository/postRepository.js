import { Post } from "../schemas/postSchema.js";
const createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
       const now = new Date();
      // const istOffset = 5.5 * 60 * 60 * 1000; 
      // data["createdAt"] = new Date(now.getTime() + istOffset);
      // data["updatedAt"] = new Date(now.getTime() + istOffset);
      // Get the current time in UTC and convert it to IST
const utcOffsetInMilliseconds = now.getTimezoneOffset() * 60 * 1000; 
const istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000; 

// Calculate the current time in IST
const istTime = new Date(now.getTime() + utcOffsetInMilliseconds + istOffsetInMilliseconds);

data["createdAt"] = istTime;
data["updatedAt"] = istTime;
      const post = new Post(data);
      const newPost = await post.save();
      resolve(newPost);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data)
      // const post = new Post();
      const allPosts = await Post.find({userId:data})
      // console.log(allPosts)
      resolve(allPosts);
    } catch (error) {
      reject(error);
    }
  });
};

const removePost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post doesn't exist");
      } else {
        // console.log(post)
        // const deletedPost= await Post.findByIdAndDelete(postId)
        const deletedPost = await Post.deleteOne({ _id: postId });
        // console.log(deletedPost)
        resolve(deletedPost);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
 
      const post = await Post.findById(data.postId);
      if (!post) {
        throw new Error("Post doesn't exist");
      } else {
        //  console.log(post)
        const now = new Date();
        // const istOffset = 5.5 * 60 * 60 * 1000; 
        // data["updatedAt"] = new Date(now.getTime() + istOffset);
        const utcOffsetInMilliseconds = now.getTimezoneOffset() * 60 * 1000; 
  const istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000; 
  
  // Calculate the current time in IST
  const istTime = new Date(now.getTime() + utcOffsetInMilliseconds + istOffsetInMilliseconds);
  
  // data["createdAt"] = istTime;
  data["updatedAt"] = istTime;
        const updatedPost = await Post.updateOne(
          { _id: data.postId },
          {
            title: data.title,
            content: data.content,
            labels: data.labels,
            comment_options: data.comment_options,
            updatedAt:data.updatedAt
          }
        );
        //  console.log(updatedPost)
        resolve(updatedPost);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getPostsByTitle=(data)=>{
  return new Promise(async(resolve,reject)=>{
    try{
// Remove spaces from the search term
const allowedSpacesTitle = data.title.replace(/\s+/g, '');
// const escapedTerm = escapeRegExp(cleanSearchTerm);

// Create a regex pattern that allows for any characters between each character of the search term
const regexPattern = allowedSpacesTitle.split('').join('.*');
const regex = new RegExp(regexPattern, 'i');


      // const regex = new RegExp(`${data.title}`, 'i');

      const existedPosts= await Post.find({
        userId:data.userId,
        title: { $regex: regex },
        });
      // if (existedPosts.length ===0) {
      //   throw new Error("Posts doesn't exists");
      // } else {
        resolve(existedPosts);
       
      }catch(error){
      reject(error);
    }
  })
}
export { createNewPost, getAllPost, removePost, updatePost,getPostsByTitle };
