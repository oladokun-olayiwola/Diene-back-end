import { Response } from "express";
import { createJWT } from "../extras/jwtFunction";
import { user } from "../interfaces/Types";

const attachCookiesToResponse = (res: Response, payload: user) => {
  const token = createJWT(payload);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export default attachCookiesToResponse;
