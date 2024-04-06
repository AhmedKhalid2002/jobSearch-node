import { User } from "../../../DB/models/user.model.js";
import { tokenModel } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from 'jsonwebtoken'
import randomstring from 'randomstring'
// ? signup
export const signup=asyncHandler(async(req,res,next)=>{
    //^ check user
    const isUser=await User.findOne({email:req.body.email});
    if(isUser)
        return next(new Error("user already found"));
    
    const mobileUser=await User.findOne({mobileNumber:req.body.mobileNumber});
    if(mobileUser)
        return next (new Error("this phone number is used"));

    // ^hash password
    const hashPassword=bcryptjs.hashSync(req.body.password,parseInt(process.env.SALT_ROUND));

    //^ create user
    const createUser=await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.firstName + " " + req.body.lastName,
        email:req.body.email,
        password:hashPassword,
        recoveryEmail:req.body.recoveryEmail,
        DOB:req.body.dob,
        mobileNumber:req.body.mobileNumber,
        role:req.body.role,
    })
    //^ create Token
    const token=jwt.sign({email:createUser.email},process.env.SECRET_KEY)
    //^ send Email
    const sendMessage=await sendEmail({
        to:createUser.email,
        subject:"Account Activation",
        html:`<a href="https://job-search-node.vercel.app/user/activate_acount/${token}">Activite your Account</a>`
    })

    if(!sendMessage)
        return next(new Error("Email is invalid"));

    if(!createUser)
        return next(new Error("user is not created "))
    return res.json({
        success:true,
        message:"User Created successfully",
        user:{...createUser.toObject(),
            password:undefined,
            isConfirmed:undefined,
            status:undefined,
        }
    })
})

// ? activation account
export const activateAcount=asyncHandler(async(req,res,next)=>{
    const {token}=req.params;
    const payload=jwt.verify(token,process.env.SECRET_KEY);
    const isUser=await User.findOneAndUpdate({email:payload.email},{isConfirmed:true})

    if(isUser.role == "Company_HR")
        return res.send("Congratulations on your new job 🎉🎉")

    return res.send("account acctivation successfully! try login now");
})

// ? login
export const login=asyncHandler(async(req,res,next)=>{

    const isUser=await User.findOne({$or:[{email:req.body.emailOrMobileNumber},{mobileNumber:req.body.emailOrMobileNumber}]});
    if(!isUser)
        return next(new Error("email or mobile incorrect"));

    if(!isUser.isConfirmed)
        return next(new Error("you should activate account"));

    const match=bcryptjs.compareSync(req.body.password,isUser.password);

    if(!match)
        return next(new Error("password incorrect"));

    isUser.status="online";
    await isUser.save();
    const token=jwt.sign({email:isUser.email,userName:isUser.username,id:isUser._id},process.env.SECRET_KEY);

    await tokenModel.create({
        token,
        user:isUser._id,
        agent:req.headers["user-agent"],
    })

    return res.json({
        success:true,
        message:"login successfully",
        token
    })
})

// ? update account
export const updateAccount=asyncHandler(async(req,res,next)=>{
    const {firstName,lastName,email,mobileNumber,recoveryEmail,dob,}=req.body;
    const userData=req.payload;
    const emailConfilect=await User.findOne({_id:{$ne:userData.id},email});
    if(email&&emailConfilect)
        return next(new Error("The email already exit "));

    const mobileConfilect=await User.findOne({_id:{$ne:userData.id},mobileNumber});

    if(mobileNumber&&mobileConfilect)
        return next(new Error("The mobile already exit "));

    //^ update data
    const isUser=await User.findById(userData.id);

    if(firstName) isUser.firstName=firstName;
    if(lastName) isUser.lastName=lastName;
    if(email) isUser.email=email;
    if(mobileNumber) isUser.mobileNumber=mobileNumber;
    if(recoveryEmail) isUser.recoveryEmail=recoveryEmail;
    if(dob) isUser.DOB=dob;

    await isUser.save();

    return res.json({
        success:true,
        message:"Account profile updated successfully"
    })
})

export const deleteAccount=asyncHandler(async(req,res,next)=>{
    const userId=req.payload.id;
    const isUser=await User.findByIdAndDelete(userId);

    if(!isUser)
        return next(new Error("Account not found"));

    return res.json({
        success:false,
        message:"Account deleted successfully"
    })
})

export const ownerAccount=asyncHandler(async(req,res,next)=>{
    const userId=req.payload.id;
    const user=await User.findById(userId);
    if(!user)
        return next("User not found");

    return res.json({
        success:true,
        user,
    })
})

export const spicificUser=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user)
        return next("User not found");

    return res.json({
        success:true,
        user,
    })
})

export const updatePassword=asyncHandler(async(req,res,next)=>{
    const {password,newPassword}=req.body;
    const userData=req.payload;
    const isUser=await User.findById(userData.id);

    const match=bcryptjs.compareSync(password,isUser.password);
    if(!match)
        return next(new Error("password incorrect"));

    const hashNewPassword=bcryptjs.hashSync(newPassword,parseInt(process.env.SALT_ROUND));

    const updatePass=await User.findByIdAndUpdate({_id:userData.id},{password:hashNewPassword});

    if(!updatePass)
        return next(new Error("password not updated"))
    
    return res.json({
        success:true,
        message:"Password updated successfully"
    })
}) 

export const sendCode=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user)
        return next(new Error("User not found"));

    if(!user.isConfirmed)
        return next(new Error("You must activate account first"));

    const code=randomstring.generate({
        length:5,
        charset:"numberic"
    })
    user.forgetCode=code;
    await user.save();

    const sendMessage=sendEmail({
        to:user.email,
        subject:"Reset code",
        html:`<div>${code}</div>`
    })
    if(!sendMessage)
        return next(new Error("Email invalid"))

        return res.json({
            success:true,
            message:"You can reset password"
        })
})

export const resetPassword=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)
        return next(new Error("User not found"));

    if(user.forgetCode !=req.body.code)
        return next(new Error("invalid code"));

    user.password=bcryptjs.hashSync(req.body.password,8)
    await user.save();
    return res.json({
        success:true,
        message:"try login now!"
    })
})
export const getUserByRecoveryEmail=asyncHandler(async(req,res,next)=>{

    const user=await User.find({recoveryEmail:req.body.recoveryEmail})

    if(!user)
        return next(new Error("users not found"));

    return res.json({
        success:true,
        user,
    })
})