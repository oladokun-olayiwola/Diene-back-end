"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const Authentication = (req, _, next) => {
    //   const header = req.headers.authorization;
    //   const token = header?.split(" ")[1];
    const token = req.signedCookies.token;
    //   res.send(token)
    try {
        if (!token) {
            throw new errors_1.unAuthenticatedError("Unaauthorixed access");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { name, _id } = decoded;
        const id = JSON.stringify(_id);
        req.user = { name, _id: id };
        next();
    }
    catch (error) {
        throw new errors_1.unAuthenticatedError("Failed Authentication");
    }
};
exports.default = Authentication;
