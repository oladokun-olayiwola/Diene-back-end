import customAPIError from "./customAPIError";
import { StatusCodes } from "http-status-codes";

class unAuthenticatedError extends customAPIError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default unAuthenticatedError;
