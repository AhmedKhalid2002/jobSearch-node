import { Schema, model } from "mongoose";


const userSchema=new Schema({
    firstName:{type:String,required:true}, 
    lastName:{type:String,required:true},
    username:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    recoveryEmail :{type:String,required:true},
    DOB :{type:Date,required:true,match: /^(\d{4})-(\d{1,2})-(\d{1,2})$/},
    mobileNumber:{type:String,unique:true},
    role :{type:String,enum:["User","Company_HR"]},
    isConfirmed:{type:Boolean,default:false},
    forgetCode:{type:String,uniqe:true},
    status:{type:String,enum:["online","offline"],default:"offline"}, 
},{
    timestamps:true,
})


export const User=model("User",userSchema);

