import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import Review from "../models/Review";
import Product from "../models/Products";

import { notFoundError, badRequestError } from "../errors";

// const CustomError = require("../../errors");
// const checkPermissions = require("../../utils/checkPermissions");

const createReview: RequestHandler = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new notFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user!._id,
  });

  if (alreadySubmitted) {
    throw new badRequestError(
      "Already submitted review for this product"
    );
  }

  req.body.user = req.user!._id;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews: RequestHandler = async (_, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};


const getSingleReview: RequestHandler = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new notFoundError(`No review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};


const updateReview: RequestHandler = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new notFoundError(`No review with id ${reviewId}`);
  }

//   checkPermissions(req.user, review.user);

  review.rating = rating;
  review.reviewTitle = title;
  review.review = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};


const deleteReview: RequestHandler = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new notFoundError(`No review with id ${reviewId}`);
  }

//   checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};

const getSingleProductReviews: RequestHandler = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// module.exports = {
//   createReview,
//   getAllReviews,
//   getSingleReview,
//   updateReview,
//   deleteReview,
//   getSingleProductReviews,
// };


export { createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getSingleProductReviews }