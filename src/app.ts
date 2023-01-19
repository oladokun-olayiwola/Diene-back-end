import express from "express";
// import multer from "multer";
// import path from "path";
import { json } from "body-parser";
import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";

dotenv.config();

import UserRouter from "./routes/User";
import AuthRouter from "./routes/Auth";
import ProductRouter from "./routes/Product";
import ReviewRouter from "./routes/Review";
import connectDB from "./connectDB/connect";

import Authentication from "./middlewares/Authentication";
import errorHandler from "./middlewares/errorhandler";
import notFound from "./middlewares/not-found";

const app = express();

// export const storage = multer.diskStorage({
//   destination: (_, _2, cb) => {
//     cb(null, "Images")
//   },
//   filename(_, file, cb) {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname))
//   },
// })

app.use(json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/products", Authentication, ProductRouter);
app.use("/api/v1/reviews", Authentication, ReviewRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start: () => Promise<void> = async () => {
  await connectDB(process.env.CONNECTION_STRING!);
  try {
    app.listen(PORT, () => {
      console.log(`Listening to your server on port ${PORT} 😎🥰 `);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
