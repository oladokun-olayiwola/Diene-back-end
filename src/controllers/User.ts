import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/User";

import { badRequestError, notFoundError } from "../errors";

const getAllUsers: RequestHandler = async (_, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new notFoundError("Invalid request");
  }

  res.status(StatusCodes.OK).json(user);
};

const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await User.find({ _id: id });
  if (!user) {
    throw new badRequestError("Invalid Request");
  }
  if (!name || !email) {
    throw new badRequestError("Invalid Request");
  }
  const newUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json(newUser);
};

const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ _id: id });
  if (!user) {
    throw new badRequestError("Invalid request");
  }
  await User.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({
    msg: "Deleted",
  });
  // if(!toRemove) {
  //   throw new badRequestError("User doesn't Exist")
  // }
};

export { getAllUsers, getSingleUser, updateUser, deleteUser };
