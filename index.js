import express from "express";
import authRouter from "./routes/authRoute.js";
import dbConnection from "./db/db.js";
import dotenv from "dotenv";
import cors from 'cors';

const app = express();

dotenv.config();
dbConnection();

app.use(cors({
  origin: "*",
}))
app.use(express.json());
app.use("/api", authRouter);

// app.post('/',()=>{
//     console.log("hello world")
// })

app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
});
