import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  userId:{type: String,required:true},
  title: { type: String, required: true },
  content:{type: String, required: true },
  labelS:{},
  comment_options:{},
//   createdAt:{type:String}

}, { timestamps: true });

export const Post = mongoose.model("posts", schema);