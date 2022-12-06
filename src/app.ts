import express from "express";
import { json } from "body-parser";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

import UserRoutes from './routes/User'
import connectDB from "./connectDB/connect";

const app = express();

app.use(json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1', UserRoutes)

const PORT = process.env.PORT || 3000;

const start: () => Promise<void> = async() => {
  await connectDB(process.env.CONNECTION_STRING!)
  try {
    app.listen(PORT, () => {
      console.log(`Listening to your server on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1)    
  }
}

start()