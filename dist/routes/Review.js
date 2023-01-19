"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
const router = express_1.default.Router();
const Review_1 = require("../controllers/Review");
router.route("/").post(Authentication_1.default, Review_1.createReview).get(Review_1.getAllReviews);
router
    .route("/:id")
    .get(Review_1.getSingleReview)
    .patch(Authentication_1.default, Review_1.updateReview)
    .delete(Authentication_1.default, Review_1.deleteReview);
exports.default = router;
