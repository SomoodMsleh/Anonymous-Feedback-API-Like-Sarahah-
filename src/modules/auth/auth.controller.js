import UserModel from "../../../DB/models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { sendEmail } from "../../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async(req,res)=>{
    const {userName,email,password,profile_url} = req.body;
    const hashPassword = bcryptjs.hashSync(password,parseInt(process.env.HASH_SALT));
    await UserModel.create({userName,email,password:hashPassword,profile_url});
    const html = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333; text-align: center;">Welcome to Anonymous Feedback App!</h2>
    <p style="color: #555;">Hi <strong>${userName}</strong>,</p>
    <p style="color: #555;">Thank you for signing up. Your account has been successfully created.</p>
    <p style="color: #555;">If you have any questions, feel free to reply to this email.</p>
    <p style="color: #555;">Best Regards,<br>Anonymous Feedback App Team</p>
</div>`;
    await sendEmail(email,"welcome in Anonymous Feedback App",html);
    return res.status(201).json({message:"successfully"});
};

export const loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({
        where :{email:email}
    });
    if(user == null){
        return next(new AppError("invalid email",400));
    }
    const check = await bcryptjs.compareSync(password,user.password);
    if(check == false){
        return next(new AppError("invalid password",400));
    }
    const token = jwt.sign({ id: user.id, name: user.userName, role: user.role },process.env.JWT_SECRET);
    return res.status(200).json({message:"successfully" ,token});
};