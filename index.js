import express from 'express';
import authRouter from './routes/authRoute.js'
import dbConnection from './db/db.js';
import dotenv from 'dotenv'
const app=express();
dotenv.config()
app.use('/api',authRouter)

dbConnection();
app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`)
})