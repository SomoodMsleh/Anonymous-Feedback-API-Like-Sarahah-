import Joi from "joi";

export const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    profile_url: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_]+$')).min(3).max(30).required()
});

export const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});