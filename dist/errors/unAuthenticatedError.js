"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customAPIError_1 = __importDefault(require("./customAPIError"));
const http_status_codes_1 = require("http-status-codes");
class unAuthenticatedError extends customAPIError_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.default = unAuthenticatedError;
