"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
module.exports = (req, res, next) => {
    const now = Date.now();
    const { url, method } = req;
    const data = `${now} ${method} ${url}`;
    fs_1.default.appendFile("server.log", data + os_1.default.EOL, (err) => {
        if (err)
            throw err;
    });
    next();
};
