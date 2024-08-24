import mongoose from "mongoose";
import { Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    labels: [String ],
    comment_options: {
      type: String,
      enum: ["allow", "show_existing", "hide_existing"],
      default: "allow",
    },
    // createdAt: { type: String, required: true },
    // updatedAt: { type: String, required: true },
  },
    { timestamps:true}
);

schema.plugin(paginate);
export const Post = mongoose.model("posts", schema);
