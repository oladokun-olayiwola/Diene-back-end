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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: [true, "Please provide rating for product"],
    },
    review: {
        type: String,
        required: [true, "Please provide a rveiew"],
    },
    reviewTitle: {
        type: String,
        required: [true, "Please a title for your review"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
ReviewSchema.statics.calculateAverageRating = function (productId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.aggregate([
            { $match: { product: productId } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    numOfReviews: { $sum: 1 },
                },
            },
        ]);
        try {
            yield (0, mongoose_1.model)("Product").findOneAndUpdate({ _id: productId }, {
                averageRating: Math.ceil(((_a = result[0]) === null || _a === void 0 ? void 0 : _a.averageRating) || 0),
                numOfReviews: ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.numOfReviews) || 0,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
// ReviewSchema.post("save", async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });
// ReviewSchema.post("remove", async function () {
//   await this.constructor.calculateAverageRating(this.product);
// });
exports.default = (0, mongoose_1.model)("Review", ReviewSchema);
