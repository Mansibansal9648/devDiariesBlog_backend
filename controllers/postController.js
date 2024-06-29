import {
    apiResponseSuccess,
    apiResponseErr,
  } from "../middlewares/apiResponse.js";
  import { createNewPost } from "../repository/postRepository.js";
const createPost=async(req,res)=>{
  try{
    let data=req.body;
     data.userId=req.user.id;
     const result = await createNewPost(data);
    return res
    .status(200)
    .send(
      apiResponseSuccess([], true, 201, "Post created successfully"))
    }catch(error){
      return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
    }
}

export {createPost}