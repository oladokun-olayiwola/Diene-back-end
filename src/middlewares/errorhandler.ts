import { Response}  from 'express'
import { ErrorMiddleware } from "../interfaces/Types";
import {StatusCodes} from "http-status-codes";


interface item {
    message: string
}

const errorHandlerMiddleware = (err: ErrorMiddleware, _: any, res: Response, _2: any) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.code && err.code === 11000) {
    err.statusCode = 400;
    err.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item with id : ${err.value} found`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware
