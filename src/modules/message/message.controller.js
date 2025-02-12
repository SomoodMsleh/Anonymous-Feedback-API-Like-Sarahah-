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

