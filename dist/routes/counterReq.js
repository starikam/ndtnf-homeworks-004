"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCounter = exports.setCounter = void 0;
const http_1 = __importDefault(require("http"));
const HOST_URL = process.env.HOST_URL || '127.0.0.1';
const setCounter = function (id) {
    const data = JSON.stringify({ bookId: id });
    const req = http_1.default.request({
        hostname: HOST_URL,
        port: 3001,
        path: `/counter/${id}/incr`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }, (res) => {
        console.log(`statusCode req-post: ${res.statusCode}`);
        res.on('data', answer => {
            console.log(`Просмотр добавлен: ${JSON.parse(answer).message}`);
        });
    });
    req.on('error', (error) => {
        console.error(error);
    });
    req.write(data);
    req.end();
};
exports.setCounter = setCounter;
const getCounter = function (id, callback) {
    const req = http_1.default.request({
        hostname: HOST_URL,
        port: 3001,
        path: `/counter/${id}`,
        method: 'GET'
    }, callback);
    req.on('error', (error) => {
        console.error(error);
        return error;
    });
    req.end();
};
exports.getCounter = getCounter;
