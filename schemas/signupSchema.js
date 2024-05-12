import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema({
  username: { type: String, required: true, match: /^[a-zA-Z0-9_-]{3,20}$/ },
  name: { type: String, required: true, match: /^[a-zA-Z\s]{3,25}$/ },
  email: {
    type: String,
    required: true,
    match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
    // match:
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  // confirm_password: { type: String, required: true }
});

export const User = mongoose.model("users", schema);
