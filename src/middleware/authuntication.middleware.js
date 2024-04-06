import jwt from 'jsonwebtoken'
import { tokenModel } from '../../DB/models/token.model.js';
import { User } from '../../DB/models/user.model.js';


export const isAuthunticated=async(req,res,next)=>{
    let {token}=req.headers;

    if(!token)
        return next(new Error("token missing"))

    if(!token.startsWith(process.env.BERAR_TOKEN))
        return next(new Error("Invalid Token"))

    token=token.split(process.env.BERAR_TOKEN)[1];

    const tokenDB=await tokenModel.findOne({token,isValid:true});

    if(!tokenDB)
        return next(new Error("token expired!"))

    const payload=jwt.verify(token,"secretKey");

    const isUser=await User.findById(payload.id);
    
    if(!isUser)
        return next(new Error("User not found"));
    
    req.payload=payload;

    req.user=isUser;

    return next();
}