"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtFunction_1 = require("../extras/jwtFunction");
const attachCookiesToResponse = (res, payload) => {
    const token = (0, jwtFunction_1.createJWT)(payload.name);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
exports.default = attachCookiesToResponse;
