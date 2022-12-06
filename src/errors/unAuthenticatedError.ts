import customAPIError from "./customAPIError";
import { StatusCodes } from "http-status-codes";

class unAuthenticatedError extends customAPIError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default unAuthenticatedError;
