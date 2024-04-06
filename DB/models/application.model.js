import { Schema, Types, model } from "mongoose";


const applicationSchema=new Schema({
    jobId:{type:Types.ObjectId,ref:"Job"},
    userId:{type:Types.ObjectId,ref:"User"},
    userTechSkills:{type:[String]},
    userSoftSkills:{type:[String]},
    userResume:{secure_url:String,public_id:String},
},
{
    timestamps:true
})

export const Application=model("Application",applicationSchema);