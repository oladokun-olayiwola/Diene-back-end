"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = require("../controllers/User");
router.get('/', User_1.getAllUsers);
router.route('/:id').get(User_1.getSingleUser).patch(User_1.updateUser).delete(User_1.deleteUser);
exports.default = router;
