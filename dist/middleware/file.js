"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'api/books');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()} ${file.originalname}`);
    }
});
module.exports = (0, multer_1.default)({ storage });
