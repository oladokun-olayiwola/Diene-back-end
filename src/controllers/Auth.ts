import { RequestHandler } from "express";
import "express-async-errors";

import { badRequestError, unAuthenticatedError } from "../errors";
import createTokenUser from "../extras/createUserToken";

import User from "../models/User";

import attachCookiesToResponse from "../extras/attachCookieToResponse";
import { StatusCodes } from "http-status-codes";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    throw new badRequestError("Please Provide all values");
  }
  if (password.length < 6) {
    throw new badRequestError(
      "Password must contain more than  six characters"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("Invalid Credentials");
  }

  const payload = createTokenUser(user);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).json({ payload });
};

const register: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;
  if (!req.body || !email || !password || !name) {
    throw new badRequestError("Please Provide all values");
  }
  if (password.length < 6) {
    throw new badRequestError(
      "Password must contain more than  six characters"
    );
  }
  if (name.length < 3) {
    throw new badRequestError("Name must contain more than three characters");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new badRequestError("Email has already been registered");
  }
  const user = await User.create({
    email,
    name,
    password,
  });

  const payload = createTokenUser(user);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.CREATED).json({ payload });
};

const logout: RequestHandler = (req, res) => {
  console.log(req);
  res.send("Hey");
};
export { login, register, logout };
