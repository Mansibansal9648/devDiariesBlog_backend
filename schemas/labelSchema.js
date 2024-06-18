import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true, match: /^[a-z_]{1,25}$/ },
});

export const Label = mongoose.model("labels", schema);
