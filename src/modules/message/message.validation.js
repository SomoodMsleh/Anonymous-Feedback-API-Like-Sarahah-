import Joi from "joi";

export const sendMessageSchema = Joi.object({
    receiver_id:Joi.number().min(1).required(),
    content:Joi.string().min(10).required()
});

export const deleteMessageSchema = Joi.object({
    id:Joi.number().min(1).required()
});

/**export const Schema = Joi.object({
    id:Joi.number().min(1).required()
});*/