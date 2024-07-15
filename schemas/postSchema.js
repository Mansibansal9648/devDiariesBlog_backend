import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label",
      }
    ],
    comment_options: {
      type: String,
      enum: ["allow", "show_existing", "hide_existing"],
      default: "allow",
    },
    //   createdAt:{type:String}
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", schema);
