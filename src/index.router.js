import {connectDB} from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use((error,req,res,next)=>{
        return res.status(error.statusCode).json({message : error.message});
    });
}

export default initApp;