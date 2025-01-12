"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    favorite: {
        type: String,
        default: ''
    },
    fileCover: {
        type: String,
        default: ''
    },
    fileName: {
        type: String,
        default: ''
    },
    fileBook: {
        type: String,
        default: ''
    }
});
exports.BookModel = (0, mongoose_1.model)('Book', bookSchema);
