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
const counterReq_1 = require("./counterReq");
const container_1 = __importDefault(require("../container"));
const BookRepository_1 = __importDefault(require("../BookRepository"));
router.get('/view', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const books = yield repo.getBooks();
        res.render('books/index', { title: "Список книг", books: books });
    }
    catch (e) {
        res.status(404).redirect('../views/error/404');
    }
    ;
}));
router.get('/view/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.getBooks(id);
        if (!book) {
            (0, counterReq_1.getCounter)(id, (resp) => {
                if (resp.statusCode !== 500) {
                    resp.on('data', (d) => {
                        const count = JSON.parse(d).count;
                        console.log(`Запрос прошел успешно, cnt - ${count}`);
                        res.render('books/view', {
                            title: 'Выбранная книга', book: book, count: count
                        });
                    });
                    (0, counterReq_1.setCounter)(id);
                }
                ;
            });
        }
        ;
    }
    catch (e) {
        res.status(404).redirect('../views/error/404');
    }
    ;
}));
router.get('/create', (_req, res) => {
    res.render('books/create', { title: 'Добавить книгу', book: {} });
});
router.post('/create', file_1.default.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authors, description, favorite, fileCover, fileName } = req.body;
    const fileBook = req.file ? req.file : null;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.createBook({ title, authors, description, favorite, fileCover, fileName, fileBook });
        yield book.save();
        res.redirect("/books/view");
    }
    catch (e) {
        res.status(404);
        res.redirect('../views/error/404');
    }
    ;
}));
router.get('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.getBooks(id);
        res.render('books/update', {
            title: 'Редактировать книгу',
            book: book,
        });
    }
    catch (_a) {
        res.status(404).redirect('../views/error/404');
    }
    ;
}));
router.post('/update/:id', file_1.default.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { title, authors, description, favorite, fileCover, fileName } = req.body;
        const fileBook = req.file ? req.file : null;
        const repo = container_1.default.get(BookRepository_1.default);
        const book = yield repo.getBook(id);
        yield book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook });
        res.status(200).redirect('/books/view/' + id);
    }
    catch (_b) {
        res.status(404).redirect("../views/error/404");
    }
}));
router.post('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const repo = container_1.default.get(BookRepository_1.default);
        yield repo.deleteOne({ _id: id });
        res.status(200).redirect("/books/view");
    }
    catch (_c) {
        res.status(404).redirect("../views/error/404");
    }
    ;
}));
exports.default = router;
