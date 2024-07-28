import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";
import {
  createNewPost,
  getAllPost,
  removePost,
  updatePost,
} from "../repository/postRepository.js";

const createPost = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.user.id;
    //  console.log(req.body);
    const result = await createNewPost(data);
    return apiResponseSuccess([], true, 201, "Post created successfully",res);
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const getPost = async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(req.body.userId)
    let result = await getAllPost(userId);
    let temp = {};
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        // console.log(result[j])
        if (
          new Date(result[j].updatedAt).getTime() <
          new Date(result[j + 1].updatedAt).getTime()
        ) {
          temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
        }
      }
    }

    return apiResponseSuccess(result, true, 200, "Posts retrieved successfully", res);
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const deletePost = async (req, res) => {
  try {
    let { postId } = req.query;
    let result = await removePost(postId);
    return apiResponseSuccess({}, true, 200, "Post deleted successfully", res);
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const editPost = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);
    let result = await updatePost(data);
    return apiResponseSuccess({}, true, 200, "Post updated successfully", res);
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

export { createPost, getPost, deletePost, editPost };
