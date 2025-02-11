import jwt from "jsonwebtoken";
import {AppError} from "../utils/AppError.js"

const auth = (allowedRoles)=>{
    return (req,res,next)=>{
        try{
            const {token} = req.headers;
            if (!token) {
                return next(new AppError("No token provided", 401));
            }
            const decoded = jwt.verify(token,'somoodedwan');
            req.id = decoded.id;  
            req.role = decoded.role; 
            if(allowedRoles.includes(decoded.role)){
                return next();
            }
            return next(new AppError("not Authorized",400));
        }catch(error){
            return next(new AppError(`Server error: ${error.message}`, 500));
        };
    };
};
export default auth;