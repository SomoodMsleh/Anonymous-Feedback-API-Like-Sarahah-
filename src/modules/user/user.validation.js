import Joi from "joi";

export const deactivateUserSchema = Joi.object({
    id:Joi.number().min(1).required()
});

export const reactivateUserSchema = Joi.object({
    id:Joi.number().min(1).required()
});

export const searchUserSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required()
});

export const changePasswordSchema = Joi.object({
    id:Joi.number().min(1).required(),
    oldPassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    newPassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
});

export const uploadProfilePictureSchema = Joi.object({
    id:Joi.number().min(1).required(),
    
});

export const deleteUserSchema = Joi.object({
    id:Joi.number().min(1).required()
});