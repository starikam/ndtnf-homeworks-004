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
const express_1 = require("express");
const router = (0, express_1.Router)();
const file_1 = __importDefault(require("../middleware/file"));
const Book_1 = require("../models/Book");
const container_1 = __importDefault(require("../container"));
const BookRepository_1 = __importDefault(require("../BookRepository"));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const books = yield repo.getBooks();
        res.status(200).json(books).redirect("/books/view");
    }
    catch (e) {
        res.status(404).redirect("../views/error/404");
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.getBooks(id);
        res.status(200).json(book);
    }
    catch (e) {
        res.json('404 | Cтраница не найдена');
    }
}));
router.get('/:id/download', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        let book = yield repo.getBooks(id);
        if (!req.file) {
            res.json(null);
            return;
        }
        const { path } = req.file;
        book = Object.assign(Object.assign({}, book), { fileBook: path });
        yield book.save();
    }
    catch (e) {
        res.json('404 | Книга не найдена');
    }
}));
router.post('/:id/upload', file_1.default.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        let book = yield repo.getBooks(id);
        if (!req.file) {
            res.json(null);
            return;
        }
        ;
        const { path } = req.file;
        book = Object.assign(Object.assign({}, book), { fileBook: path });
        yield book.save();
    }
    catch (e) {
        res.status(404);
        res.json('404 | Ошибка загрузки');
    }
    ;
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const newBook = new Book_1.BookModel({ title, description, authors, favorite, fileCover, fileName, fileBook });
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.createBook(newBook);
        yield book.save();
        res.status(201).json(book);
    }
    catch (e) {
        res.status(404);
        res.json('404 | Ошибка загрузки');
    }
    ;
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.getBook(id);
        yield book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook });
        res.redirect(`/api/books/${id}`);
    }
    catch (e) {
        res.status(404);
        res.json('404 | Cтраница не найдена');
    }
    ;
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        yield repo.deleteOne({ _id: id });
        res.status(200).send("deleted");
    }
    catch (e) {
        res.status(404);
        res.json('404 | Cтраница не найдена');
    }
    ;
}));
exports.default = router;
