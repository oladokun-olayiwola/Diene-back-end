import express from "express";
import cors from "cors";
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

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (_, res) => {
  res.send("Hey");
});

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/products", Authentication, ProductRouter);
app.use("/api/v1/reviews", Authentication, ReviewRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start: () => Promise<void> = async () => {
  await connectDB(process.env.CONNECTION_STRING as string);
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
