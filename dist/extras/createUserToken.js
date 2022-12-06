"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTokenUser = (user) => {
    return { name: user.name, _id: user._id };
};
exports.default = createTokenUser;
