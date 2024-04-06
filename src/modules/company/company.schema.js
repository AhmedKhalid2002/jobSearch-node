import Joi from "joi";

export const AddCompanySchema=Joi.object({
    companyName:Joi.string().required(),
    description:Joi.string().required(),
    industry:Joi.string().required(),
    address:Joi.string().required(),
    numberOfEmployees:Joi.number().min(11).max(20),
    companyEmail:Joi.string().email().required(),
}).required();


export const updatedCompanySchema=Joi.object({
    description:Joi.string(),
    industry:Joi.string(),
    address:Joi.string(),
    numberOfEmployees:Joi.number().min(11).max(20),
}).required().unknown();