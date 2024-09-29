import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectdb } from "./src/db/index.js";
import app from "./app.js";

dotenv.config()

connectdb()
.then((res)=>{
    app.listen(process.env.PORT || 2300 , (req , res)=>{
        console.log("server is running at 2300");
        
    })
})
.catch(err=>{
    console.log("error connecting mongodb");
    
})