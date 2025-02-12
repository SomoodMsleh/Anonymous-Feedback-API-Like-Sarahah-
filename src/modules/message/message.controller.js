import UserModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import MessageModel from "../../../DB/models/message.model.js"

export const sendMessage = async(req,res,next)=>{
    const {content} = req.body;
    const {receiver_id} = req.params;
    if (!receiver_id || !content) {
        return next(new AppError("Receiver ID and content are required", 400));
    }
    const receiver = await UserModel.findByPk(receiver_id);
    if (!receiver || !receiver.is_active) {
        return next(new AppError("Receiver not found or inactive", 404));
    }
    const message = await MessageModel.create({receiver_id,content});
    return res.status(201).json({ message: "Message sent successfully",message});
};

export const getReceivedMessages = async(req,res,next)=>{
    const user_id = req.id;
    const messages = await MessageModel.findAll({
        where: { receiver_id: user_id },
        attributes: ["id", "content", "is_read", "is_reported", "createdAt"],
        order: [["createdAt", "DESC"]]
    });
    if(!messages){
        return next(new AppError("You don't receive any message", 404));
    }
    return res.status(200).json({message:"Messages is received successfully",messages});
};

export const deleteMessage = async(req,res,next)=>{
    const { id } = req.params;
    const receiver_id = req.id; 
    const message = await MessageModel.findByPk(id);
    if (!message) {
        return next(new AppError("Message not found or receiver mismatch", 404));
    }
    if (message.receiver_id === receiver_id || req.role === "Admin") {
        await MessageModel.destroy({ where: { id: id } });
        return res.status(200).json({ message: "Message deleted successfully" });
    }
    return next(new AppError("You are not authorized to delete this message", 403));
};

export const markMessageAsRead = async (req, res, next) => {
    const {id} = req.params;
    const receiver_id = req.id;
    const message = await MessageModel.findByPk(id);

    if (!message) {
        return next(new AppError("Message not found", 404));
    }
    if (message.receiver_id !== receiver_id) {
        return next(new AppError("You are not authorized to update this message", 403));
    }
    message.is_read = true;
    await message.save();
    return res.status(200).json({ message: "Message marked as read successfully" });
};

export const getUnreadMessages = async (req, res, next) => {
    const receiver_id = req.id;
    const messages = await MessageModel.findAll({
        where: { receiver_id:receiver_id, is_read: false }, 
        attributes: ["id","content", "createdAt"],
        order: [["createdAt", "DESC"]],
    });
    if(!messages){
        return next(new AppError("You don't have any unread message", 404));
    }
    return res.status(200).json({message:"You have unread Messages",messages});
};

export const getAllMessages = async (req, res, next) => {
    const messages = await MessageModel.findAll({
        attributes: ["id", "receiver_id", "content", "is_read", "is_reported", "createdAt"],
        order: [["createdAt", "DESC"]],
    });
    if(!messages){
        return next(new AppError("not found any messages", 404));
    }
    return res.status(200).json({ message:"Successfully", messages });
};

