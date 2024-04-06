import Joi from "joi"

export const addJobSchema=Joi.object({
    jobTitle:Joi.string().required(),
    jobLocation:Joi.string().required(),
    workingTime:Joi.string().required(),
    seniorityLevel:Joi.string().required(),
    jobDescription:Joi.string().required(),
    technicalSkills:Joi.array().items(Joi.string().required()).required(),
    softSkills:Joi.array().items(Joi.string().required()).required(),
}).required()

export const updateSchema=Joi.object({
    jobTitle:Joi.string(),
    jobTitle:Joi.string(),
    jobLocation:Joi.string(),
    workingTime:Joi.string(),
    seniorityLevel:Joi.string(),
    jobDescription:Joi.string(),
    technicalSkills:Joi.array().items(Joi.string()),
    softSkills:Joi.array().items(Joi.string()),
}).required().unknown();


