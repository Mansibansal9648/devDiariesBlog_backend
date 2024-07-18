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
    return res
      .status(201)
      .send(apiResponseSuccess([], true, 201, "Post created successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getPost = async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(req.body.userId)
    const result = await getAllPost(userId);
    return res
      .status(200)
      .send(
        apiResponseSuccess(result, true, 200, "Posts retrieved successfully")
      );
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const deletePost = async (req, res) => {
  try {
    let { postId } = req.query;
    let result = await removePost(postId);
    return res
      .status(200)
      .send(apiResponseSuccess({}, true, 200, "Post deleted successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const editPost = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);
    let result = await updatePost(data);
    return res
      .status(200)
      .send(apiResponseSuccess({}, true, 200, "Post updated successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

export { createPost, getPost, deletePost, editPost };
