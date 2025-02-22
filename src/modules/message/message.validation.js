import Joi from "joi";

export const sendMessageSchema = Joi.object({
    receiver_id:Joi.number().min(1).required(),
    content:Joi.string().min(10).required()
});

export const deleteMessageSchema = Joi.object({
    id:Joi.number().min(1).required()
});

export const markMessageAsReadSchema = Joi.object({
    id:Joi.number().min(1).required()
});

export const reportOffensiveMessageSchema = Joi.object({
    id:Joi.number().min(1).required()
});

export const getReportDetailsSchema = Joi.object({
    id:Joi.number().min(1).required()
});