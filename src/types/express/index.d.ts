import { user, files } from "../../interfaces/Types";

export {};

declare global {
  namespace Express {
    export interface Request {
      files?: File;
      user?: user;
    }
  }
}