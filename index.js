// core module for application
import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors';

// config options
import dbConnection from "./db/db.js";

// routes
import authRouter from "./routes/authRoute.js";
import labelRouter from "./routes/labelRoute.js"
import postRouter from "./routes/postRoute.js"
import categoryRouter from './routes/categoryRoute.js'

// load environment
dotenv.config();

// initialize express app
const app = express();

// config middlewares with
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

// routes
app.use("/api", authRouter);
app.use("/label", labelRouter)
app.use("/post", postRouter)
app.use("/category", categoryRouter);

try {
  // Db connection
  await dbConnection()

  // initialize server
  app.listen(process.env.PORT, () => {
    console.info(`Yippee!! Server is running 😊😊 at port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`😢 Error: Gracefully Shut down ${error.message}`);
  process.exit(1);
}
