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
exports.stripeController = exports.createProduct = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const stripe_1 = __importDefault(require("stripe"));
const http_status_codes_1 = require("http-status-codes");
const Products_1 = __importDefault(require("../models/Products"));
const errors_1 = require("../errors");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Products_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Products_1.default.find({ _id: id });
    if (!product) {
        throw new errors_1.badRequestError("Invalid request ");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, category } = req.body;
    if (!req.body || !category || !name || !price || !description) {
        throw new errors_1.badRequestError("Invalid Request");
    }
    yield Products_1.default.create(Object.assign({}, req.body));
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ name, price, category });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    if (!req.body || !category || !name || !price || !description) {
        throw new errors_1.badRequestError("Invalid Request");
    }
    const products = yield Products_1.default.findOneAndUpdate({ _id: id }, { name, price, description, category }, {
        new: true,
        runValidators: true,
    });
    if (!products) {
        throw new errors_1.badRequestError("Inalid Requests");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ products });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Products_1.default.findOneAndDelete({ _id: id });
    if (!product) {
        throw new errors_1.badRequestError("Invalid Request ");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.deleteProduct = deleteProduct;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    if (!image) {
        throw new errors_1.badRequestError("Please provide Image file");
    }
    cloudinary_1.v2.uploader.upload(image.path, { folder: "Diene" }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json({ image: result });
    });
});
exports.uploadImage = uploadImage;
const stripeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            description: "test customer",
        };
        const customer = yield stripe.customers.create(params);
        console.log(customer.id);
    });
    createCustomer();
    const { total_amount, shipping_fee } = req.body;
    const totalOrderAmount = () => {
        console.log(total_amount);
        return total_amount + shipping_fee;
    };
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: totalOrderAmount(),
        currency: "usd",
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
exports.stripeController = stripeController;
