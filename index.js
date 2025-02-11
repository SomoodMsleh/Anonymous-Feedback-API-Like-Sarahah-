import express from "express";
import initApp from "./src/index.router.js";


const app = express();
initApp(app,express);

app.listen(4000,()=>{
    console.log("server is running on port 4000 ....");
})