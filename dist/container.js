"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookRepository_1 = __importDefault(require("./BookRepository"));
require("reflect-metadata");
const inversify_1 = require("inversify");
const container = new inversify_1.Container();
(0, inversify_1.decorate)((0, inversify_1.injectable)(), BookRepository_1.default);
container.bind(BookRepository_1.default).to(BookRepository_1.default).inSingletonScope();
exports.default = container;
