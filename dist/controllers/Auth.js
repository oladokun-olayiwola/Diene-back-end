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
exports.register = exports.login = void 0;
require("express-async-errors");
const errors_1 = require("../errors");
const createUserToken_1 = __importDefault(require("../extras/createUserToken"));
const User_1 = __importDefault(require("../models/User"));
const attachCookieToResponse_1 = __importDefault(require("../extras/attachCookieToResponse"));
const http_status_codes_1 = require("http-status-codes");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!req.body || !email || !password) {
        throw new errors_1.unAuthenticatedError("Please Provide all values");
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.badRequestError('Invalid credentials');
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.badRequestError('Invalid Credentials');
    }
    const payload = (0, createUserToken_1.default)(user);
    (0, attachCookieToResponse_1.default)(res, payload);
    res.status(http_status_codes_1.StatusCodes.OK).json({ payload });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!req.body || !email || !password || !name) {
        throw new errors_1.unAuthenticatedError("Please Provide all values");
    }
    const emailExists = yield User_1.default.findOne({ email });
    if (emailExists) {
        throw new errors_1.badRequestError("Email has already been registered");
    }
    const user = yield User_1.default.create({
        email,
        name,
        password,
    });
    const payload = (0, createUserToken_1.default)(user);
    (0, attachCookieToResponse_1.default)(res, payload);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ payload });
});
exports.register = register;
