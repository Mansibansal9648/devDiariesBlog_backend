import { Post } from "../schemas/postSchema.js";
import moment from "moment";

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

const getAllPost = (userId, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data)
      // const post = new Post();
      // const existedPosts = await  Post.find({ userId:userId  }).skip(offset).limit(limit)
      // const totalPosts = await Post.countDocuments()
      // const totalPages = page && limit ? Math.ceil(totalPosts / limit) : 1
      // resolve( {
      //     totalEmployees: totalPosts,
      //     totalPages: totalPages,
      //     currentPage: page || 1,
      //     existedPosts,
      // })

      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 }, // Sorting by updatedAt in descending order
      };

      // Using Mongoose Paginate V2
      const result = await Post.paginate({ userId: userId }, options);
      // console.log(result.totalDocs)

      resolve({
        totalPosts: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPosts: result.docs,
      });
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
        // const now = new Date();
        // const istOffset = 5.5 * 60 * 60 * 1000;
        // data["updatedAt"] = new Date(now.getTime() + istOffset);
        // const utcOffsetInMilliseconds = now.getTimezoneOffset() * 60 * 1000;
        // const istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000;

        // // Calculate the current time in IST
        // const istTime = new Date(
        //   now.getTime() + utcOffsetInMilliseconds + istOffsetInMilliseconds
        // );

        // data["createdAt"] = istTime;
        // data["updatedAt"] = istTime;
        const updatedPost = await Post.updateOne(
          { _id: data.postId },
          {
            title: data.title,
            content: data.content,
            labels: data.labels,
            comment_options: data.comment_options,
            // updatedAt: data.updatedAt,
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

const getPostsByTitle = (data,page,limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Remove spaces from the search term
      const allowedSpacesTitle = data.title.replace(/\s+/g, "");
      // const escapedTerm = escapeRegExp(cleanSearchTerm);

      // Create a regex pattern that allows for any characters between each character of the search term
      const regexPattern = allowedSpacesTitle.split("").join(".*");
      const regex = new RegExp(regexPattern, "i");

      // const regex = new RegExp(`${data.title}`, 'i');

      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 }, // Sorting by updatedAt in descending order
      };

      // Using Mongoose Paginate V2
      const result = await Post.paginate({
        userId: data.userId,
        title: { $regex: regex },
      }, options);
      // console.log(result.totalDocs)

      resolve({
        totalPostsByTitle: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPostsByTitle: result.docs,
      });
      // const existedPosts = await Post.find({
      //   userId: data.userId,
      //   title: { $regex: regex },
      // });
      // // if (existedPosts.length ===0) {
      // //   throw new Error("Posts doesn't exists");
      // // } else {
      // resolve(existedPosts);
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUsedLabelsByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(userId)
      const userLabels = await Post.aggregate([
        { $match: { userId: userId } },
        { $unwind: "$labels" },
        { $group: { _id: null, userLabels: { $addToSet: "$labels" } } },
        { $project: { _id: 0, userLabels: 1 } },
      ]);

      // console.log(userLabels);
      resolve(userLabels.length ? userLabels[0].userLabels : []);
    } catch (error) {
      // console.error('Error fetching unique labels:', error);
      reject(error);
    }
  });
};

const searchPostByLabel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data)
      const postsByLabel = await Post.aggregate([
        { $match: { userId: data.userId, labels: data.label } },
      ]);
      // console.log(postsByLabel)
      resolve(postsByLabel);
    } catch (error) {
      // console.error("Error searching posts by label:", error);
      reject(error);
    }
  });
};

export {
  createNewPost,
  getAllPost,
  removePost,
  updatePost,
  getPostsByTitle,
  getAllUsedLabelsByUser,
  searchPostByLabel,
};
