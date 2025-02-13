import jwt from "jsonwebtoken";
import {AppError} from "../utils/AppError.js"
import dotenv from "dotenv";
dotenv.config();
const auth = (allowedRoles)=>{
    return (req,res,next)=>{
        try{
            const {token} = req.headers;
            if (!token) {
                return next(new AppError("No token provided", 401));
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.id = decoded.id;  
            req.role = decoded.role; 
            if(allowedRoles.includes(decoded.role)){
                return next();
            }
            return next(new AppError("not Authorized",403));
        }catch(error){
            return next(new AppError(`Server error: ${error.message}`, 500));
        };
    };
};
export default auth;