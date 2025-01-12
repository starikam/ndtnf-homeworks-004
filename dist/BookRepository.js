"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../src/models/Book");
const inversify_1 = require("inversify");
let BooksRepository = class BooksRepository {
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = new Book_1.BookModel(book);
                yield newBook.save();
                return newBook;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Book_1.BookModel.findById(id).select('-__v');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Book_1.BookModel.find().select('-__v');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findBook = yield Book_1.BookModel.findById(id);
                yield findBook.updateOne(book);
                return findBook;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Book_1.BookModel.deleteOne({ _id: id });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
BooksRepository = __decorate([
    (0, inversify_1.injectable)()
], BooksRepository);
exports.default = BooksRepository;
