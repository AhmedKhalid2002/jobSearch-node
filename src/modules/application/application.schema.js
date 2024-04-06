import Joi from "joi"


export const addAppSchema=Joi.object({
    userTechSkills:Joi.array().items(Joi.string().required()).required(),
    userSoftSkills:Joi.array().items(Joi.string().required()).required(),
}).required()