import Joi from "joi";

const dobValidation=/^(\d{4})-(\d{1,2})-(\d{1,2})$/;


// ? signup schema
export const signupSchema=Joi.object({
    firstName:Joi.string().min(3).max(8).required(),
    lastName:Joi.string().min(3).max(8).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,10}$")).required(),
    recoveryEmail:Joi.string().email().required(),
    dob:Joi.custom((value,helper)=>{
        if(!dobValidation.test(value)){
            return helper.message("Invalid date of Birth format must be : YYYY-MM-DD")
        }
        return value
    }).required(),
    mobileNumber:Joi.string().pattern(new RegExp("^(01)[0-9]{9}$")).required(),
    role:Joi.string().valid("User","Company_HR").required()
}).required();


// ? login schema
export const loginSchema=Joi.object({
    emailOrMobileNumber:Joi.alternatives().try(
        Joi.string().email().required(),
        Joi.string().pattern(new RegExp("^(01)[0-9]{9}$")).required(),
    ),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,10}$")).required(),
}).required();

// ? update account schema
export const updateAccountSchema=Joi.object({
    firstName:Joi.string().min(3).max(8),
    lastName:Joi.string().min(3).max(8),
    email: Joi.string().email(),
    mobileNumber:Joi.string().pattern(new RegExp("^(01)[0-9]{9}$")),
    recoveryEmail:Joi.string().email(),
    dob:Joi.custom((value,helper)=>{
        if(!dobValidation.test(value)){
            return helper.message("Invalid date of Birth format must be : YYYY-MM-DD")
        }
        return value
    }) ,
}).required()


export const updatePasswordSchema=Joi.object({
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,10}$")).required(),
    newPassword:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,10}$")).required(),
}).required();

export const recoveryEmailSchema=Joi.object({
    recoveryEmail:Joi.string().email().required(),
}).required()

export const forgetCodeSchema=Joi.object({
    email:Joi.string().email().required(),
}).required()

export const resetPasswordSchema=Joi.object({
    email:Joi.string().email().required(),
    code:Joi.string().length(5).required(),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,10}$")).required(),
}).required()
