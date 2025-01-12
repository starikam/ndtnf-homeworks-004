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
const logger_1 = __importDefault(require("../src/middleware/logger"));
const bookRoute_1 = __importDefault(require("../src/routes/bookRoute"));
const error_404_1 = __importDefault(require("../src/middleware/error-404"));
const viewRoute_js_1 = __importDefault(require("../src/routes/viewRoute.js"));
const index_1 = __importDefault(require("../src/routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/books', bookRoute_1.default);
app.use('/books', viewRoute_js_1.default);
app.use('/', index_1.default);
app.use(logger_1.default);
app.use(error_404_1.default);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '/views'));
io.on('connection', (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);
    const { roomName } = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on('message-to-room', (msg) => {
        msg.type = `roomName: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});
function start(PORT, UrlDB) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(UrlDB);
            app.listen(PORT);
            console.log(`Сервер запущен: порту 8081, подключен к БД через порт ${UrlDB}`);
        }
        catch (e) {
            console.log('Ошибка подключения БД ', e);
        }
    });
}
const UrlDB = process.env.UrlDB || 'mongodb://root:example@mongo:27017/';
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);
