"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const Authentication = (req, _, next) => {
    const authKey = req.headers.authorization;
    try {
        if (!authKey || !authKey.startsWith("Bearer")) {
            throw new errors_1.unAuthenticatedError("Access Unauthorized");
        }
        const token = authKey.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { _id, name } = decoded;
        req.user = { id: _id, name };
        next();
    }
    catch (error) {
        throw new errors_1.unAuthenticatedError('Ola');
    }
    next();
};
exports.default = Authentication;
