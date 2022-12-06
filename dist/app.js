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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const User_1 = __importDefault(require("./routes/User"));
const connect_1 = __importDefault(require("./connectDB/connect"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use('/api/v1', User_1.default);
const PORT = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)(process.env.CONNECTION_STRING);
    try {
        app.listen(PORT, () => {
            console.log(`Listening to your server on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
start();