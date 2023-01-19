"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductReviews = exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
const http_status_codes_1 = require("http-status-codes");
const Review_1 = __importDefault(require("../models/Review"));
const Products_1 = __importDefault(require("../models/Products"));
const errors_1 = require("../errors");
// const CustomError = require("../../errors");
// const checkPermissions = require("../../utils/checkPermissions");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product: productId } = req.body;
    const isValidProduct = yield Products_1.default.findOne({ _id: productId });
    if (!isValidProduct) {
        throw new errors_1.notFoundError(`No product with id : ${productId}`);
    }
    const alreadySubmitted = yield Review_1.default.findOne({
        product: productId,
        user: req.user._id,
    });
    if (alreadySubmitted) {
        throw new errors_1.badRequestError("Already submitted review for this product");
    }
    req.body.user = req.user._id;
    const review = yield Review_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ review });
});
exports.createReview = createReview;
const getAllReviews = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield Review_1.default.find({}).populate({
        path: "product",
        select: "name company price",
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ reviews, count: reviews.length });
});
exports.getAllReviews = getAllReviews;
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: reviewId } = req.params;
    const review = yield Review_1.default.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.notFoundError(`No review with id ${reviewId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ review });
});
exports.getSingleReview = getSingleReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const review = yield Review_1.default.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.notFoundError(`No review with id ${reviewId}`);
    }
    //   checkPermissions(req.user, review.user);
    review.rating = rating;
    review.reviewTitle = title;
    review.review = comment;
    yield review.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ review });
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: reviewId } = req.params;
    const review = yield Review_1.default.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.notFoundError(`No review with id ${reviewId}`);
    }
    //   checkPermissions(req.user, review.user);
    yield review.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Review removed" });
});
exports.deleteReview = deleteReview;
const getSingleProductReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const reviews = yield Review_1.default.find({ product: productId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ reviews, count: reviews.length });
});
exports.getSingleProductReviews = getSingleProductReviews;
