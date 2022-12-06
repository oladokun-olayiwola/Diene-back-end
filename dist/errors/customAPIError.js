"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class customAPIError extends mongoose_1.Error {
    constructor(message) {
        super(message);
    }
}
exports.default = customAPIError;
