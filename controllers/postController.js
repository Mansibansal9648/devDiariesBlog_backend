import {
    apiResponseSuccess,
    apiResponseErr,
  } from "../middlewares/apiResponse.js";
const createPost=async(req,res)=>{
    let data=req.body;
    // data.userId=req.user.id;
    // data.createdAt=new Date();
    return res
    .status(200)
    .send(
      apiResponseSuccess([], true, 200, "create post successfully"))
}

export {createPost}