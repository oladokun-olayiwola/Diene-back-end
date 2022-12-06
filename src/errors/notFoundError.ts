import customAPIError from "./customAPIError";
import { StatusCodes } from "http-status-codes";

class notFoundError extends customAPIError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default notFoundError;