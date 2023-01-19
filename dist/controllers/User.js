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
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const errors_1 = require("../errors");
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.findOne({ _id: id });
    if (!user) {
        throw new errors_1.notFoundError("Invalid request");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
exports.getSingleUser = getSingleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = yield User_1.default.find({ _id: id });
    if (!user) {
        throw new errors_1.badRequestError("Invalid Request");
    }
    if (!name || !email) {
        throw new errors_1.badRequestError("Invalid Request");
    }
    const newUser = yield User_1.default.findOneAndUpdate({ _id: id }, { name, email }, {
        new: true,
        runValidators: true,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(newUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield User_1.default.find({ _id: id });
    if (!user) {
        throw new errors_1.badRequestError("Invalid request");
    }
    yield User_1.default.findOneAndDelete({ _id: id });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Deleted",
    });
    // if(!toRemove) {
    //   throw new badRequestError("User doesn't Exist")
    // }
});
exports.deleteUser = deleteUser;
