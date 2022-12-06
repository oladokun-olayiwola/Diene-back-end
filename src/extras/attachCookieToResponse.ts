import { Response } from "express";
import { createJWT } from "../extras/jwtFunction";

interface user {
  name: string;
  _id: Object;
}

const attachCookiesToResponse = (res: Response, payload: user) => {
  const token = createJWT(payload.name);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export default attachCookiesToResponse;
