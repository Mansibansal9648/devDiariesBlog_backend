import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
   key: { type: String, required: true },
  }
);

export const Category = mongoose.model("categories", schema);
