import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema=new Schema({
    username:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,match:/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/},
    password: { type: String, required: true },
    confirm_password: { type: String, required: true }
})

export default mongoose.model("user",schema)