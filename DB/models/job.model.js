import { Schema, Types, model } from "mongoose";



const jobSchema=new Schema({
    jobTitle :{type:String,required:true},
    jobLocation :{type:String,enum:['onsite', 'remotely', 'hybrid'],required:true},
    workingTime :{type:String,enum:["part-time","full-time"]},
    seniorityLevel:{type:String,enum:["Junior", "Mid-Level", "Senior","Team-Lead", "CTO"]}, 
    jobDescription:{type:String,required:true} ,
    technicalSkills :{type:[String]},
    softSkills :{type:[String]},
    addedBy:{type:Types.ObjectId,ref:"User"},
    company:{type:Types.ObjectId,ref:"Company"},
},{
    timestamps:true,
});


export const Job=model("Job",jobSchema);