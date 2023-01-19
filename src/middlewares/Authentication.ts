import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { user } from "../interfaces/Types";
import { unAuthenticatedError } from "../errors";

const Authentication: RequestHandler = (req, _, next) => {
//   const header = req.headers.authorization;
//   const token = header?.split(" ")[1];
const token = req.signedCookies.token;
//   res.send(token)
  try {
    if (!token) {
      throw new unAuthenticatedError("Unaauthorixed access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as user;
    const { name, _id } = decoded;
    const id = JSON.stringify(_id);
    req.user = { name, _id: id };
    next();
  } catch (error) {
    throw new unAuthenticatedError("Failed Authentication");
  }
};

export default Authentication;
