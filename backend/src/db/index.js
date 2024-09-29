import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectdb = async ()=>{
    try {
        const instance = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("mongoose is connected");
        
    } catch (error) {
        console.log("mongoose did not connected");
        
    }
}