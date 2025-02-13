import express from "express";
import initApp from "./src/index.router.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
initApp(app,express);
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server is running on port 4000 ....");
})