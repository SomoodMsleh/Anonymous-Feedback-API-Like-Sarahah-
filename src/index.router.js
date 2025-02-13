import {connectDB} from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import MessageRouter from "./modules/message/message.router.js"
import cors from 'cors'
const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use(cors());
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/Message',MessageRouter);
    app.get('*',(req,res)=>{
        return res.status(404).json({ message: "page not found"});
    });
    app.use((error,req,res,next)=>{
        return res.status(error.statusCode).json({message : error.message});
    });
}

export default initApp;