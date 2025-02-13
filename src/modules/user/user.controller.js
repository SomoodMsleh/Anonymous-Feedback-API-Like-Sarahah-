import UserModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../../utils/cloudinary.js"
import { Op } from "sequelize"; 
import dotenv from "dotenv";
dotenv.config();

export const deactivateUser = async(req,res,next)=>{
    const {id} = req.params;
    const user_ID = req.id;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return next(new AppError("user not found",404));
    }
    // Check if user is already inactive
    if (!user.is_active) {
        return next(new AppError("User is already deactivated",400));
    }
    if (user.id === user_ID || req.role === "Admin") {
        user.is_active = false;
        await user.save();
        return res.status(200).json({message:"User deactivated successfully"});
    }
    return next(new AppError("You are not authorized to deactivate this account", 403));

};

export const reactivateUser = async(req,res,next)=>{
    const {id} = req.params;
    const user_ID = req.id;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return next(new AppError("user not found",404));
    }
    // Check if user is already inactive
    if (user.is_active) {
        return next(new AppError("User is already activated",400));
    }
    if (user.id === user_ID || req.role === "Admin") {
        user.is_active = true;
        await user.save();
        return res.status(200).json({message:"User reactivated successfully"});
    }
    return next(new AppError("You are not authorized to reactivate this account", 403));
    
};

export const searchUser = async(req,res,next)=>{
    const {userName} = req.body;
    if (!userName) {
        return next(new AppError("Username is required", 400));
    }
    const users = await UserModel.findAll({
        where: {
            userName: {
                [Op.like]: `%${userName}%`
            },
            is_active: true // Only active users
        },
        attributes: ["id", "userName","profile_url"]
    });
    if (users.length === 0) {
        return next(new AppError("No active users found",404));
    }
    return res.status(200).json({message :"successfully, result",users});
};

export const changePassword = async(req,res,next)=>{
    const {id} = req.params;
    const {oldPassword,newPassword} = req.body;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return next(new AppError("user not found",404));
    }
    const check = await bcryptjs.compareSync(oldPassword,user.password);
    if(check == false){
        return next(new AppError("Incorrect old password",400));
    }
    const hashPassword = bcryptjs.hashSync(newPassword,parseInt(process.env.HASH_SALT));
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({message:"Password updated successfully"});
    
};

export const uploadProfilePicture = async(req,res,next)=>{
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return next(new AppError("user not found",404));
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path)
    .catch((error) => {
        console.log(error);
    });
    user.profile_picture = secure_url;
    await user.save();
    return res.status(200).json({message:"successfully"});
};

export const getUsers = async(req,res)=>{
    const users = await UserModel.findAll({attributes:['userName','email','profile_url','role','is_active']});
    return res.status(200).json({message:"successfully", users});
};

export const deleteUser = async(req,res,next)=>{
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if(user == null){
        return next(new AppError("user not found",404));
    }
    await UserModel.destroy({where:{id:id}});
    return res.status(200).json({message:"successfully"});
};

export const getInactiveUser = async(req,res)=>{
    const users = await UserModel.findAll({where:{is_active: true},attributes:['userName','email','profile_url','role']});
    return res.status(200).json({message:"successfully", users});
};

export const getDeactivateUser = async(req,res)=>{
    const users = await UserModel.findAll({where:{is_active: false},attributes:['userName','email','profile_url','role']});
    return res.status(200).json({message:"successfully", users});
};

export const updateUserRole = async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    if (user.role === "Admin") {
        return next(new AppError("User is already an Admin", 400));
    }
    user.role = "Admin";
    await user.save();
    return res.status(200).json({ message: "User role updated to Admin successfully" });
};