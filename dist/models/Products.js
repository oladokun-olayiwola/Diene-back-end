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
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the product "],
        minlength: 3,
        maxlength: 40,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for the product"],
        default: 0,
    },
    // category: {
    //   type: String,
    //   required: [true, "Please provide product category"],
    //   enum: ["office", "kitchen", "bedroom", "school"],
    // },
    productType: {
        type: String,
        required: [true, "Please a product type"]
    },
    image: {
        type: String,
        default: "/uploads/example.jpeg",
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        default: "An expensive shit",
    },
    inventory: {
        type: Number,
        required: true,
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
ProductSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false,
});
ProductSchema.pre("remove", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.model)("Review").deleteMany({ product: this });
    });
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
