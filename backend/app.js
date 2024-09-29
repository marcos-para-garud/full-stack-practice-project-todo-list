import mongoose from "mongoose";
import { config, configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import { Router } from "express";
import dotenv from "dotenv";
import { json } from "express";
import router from "./src/routes/todo.routes.js";

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static("public"))


app.use('/api' , router)

app.get('/', (req , res)=>{
    console.log("welcome to todo");
    res.send("welcome to todo list")
})

export default app;

