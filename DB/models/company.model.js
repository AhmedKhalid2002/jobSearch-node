import { Schema, Types, model } from "mongoose";


const companySchema=new Schema({
    companyName:{type:String,unique:true,required:true},
    description :{type:String,required:true},
    industry:{type:String,required:true},
    address:{type:String,required:true},
    numberOfEmployees:{type:Number,min:11,max:20},
    companyEmail:{type:String,unique:true,required:true},
    companyHR:{type:Types.ObjectId,ref:"User"},
},{
    timestamps:true,
})

export const Company=model("Company",companySchema)