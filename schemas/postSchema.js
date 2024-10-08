import mongoose from "mongoose";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { category, comment_options } from "../utils/stringConstant.js";

const schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    
    labels: [String],
    comment_options: {
      type: String,
      enum: [
        comment_options.ALLOW,
        comment_options.SHOW_EXISTING,
        comment_options.HIDE_EXISTING,
      ],
      default: comment_options.ALLOW,
    },
    // createdAt: { type: String, required: true },
    // updatedAt: { type: String, required: true },
  },
  { timestamps: true }
);

schema.plugin(paginate);
export const Post = mongoose.model("posts", schema);
