import { RequestHandler } from "express";
import "express-async-errors";

import {badRequestError, unAuthenticatedError} from "../errors"
import createTokenUser from "../extras/createUserToken";

import User from "../models/User";

import attachCookiesToResponse from "../extras/attachCookieToResponse";
import { StatusCodes } from "http-status-codes";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    throw new unAuthenticatedError("Please Provide all values");
  }
  const user = await User.findOne({ email });
  if(!user){
    throw new badRequestError('Invalid credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect) {
    throw new badRequestError('Invalid Credentials')
  }
  
  const payload = createTokenUser(user)
  attachCookiesToResponse(res, payload)
  res.status(StatusCodes.OK).json({ payload });
};

const register: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;
  if (!req.body || !email || !password || !name) {
    throw new unAuthenticatedError("Please Provide all values");
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
  res.status(StatusCodes.CREATED).json({ payload});
};

export { login, register };
