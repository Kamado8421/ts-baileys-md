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
const fs_1 = __importDefault(require("fs"));
const functions_1 = require("../functions");
const path_1 = __importDefault(require("path"));
const config_1 = require("../data/config");
class BotFuncs {
    constructor(msg, from, bot) {
        this.msg = msg;
        this.from = from;
        this.bot = bot;
    }
    sendTextMessage(text_1) {
        return __awaiter(this, arguments, void 0, function* (text, reply = true) {
            yield this.bot.sendMessage(this.from, { text: text }, reply ? { quoted: this.msg } : {});
        });
    }
    sendImage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filename, caption = '', tempfolder = false, viewOnce = false, reply = true }) {
            const filepath = tempfolder ? (0, functions_1.joinTempFolder)(filename) : path_1.default.resolve(config_1.IMAGES_FOLDER_PATH, filename);
            yield this.bot.sendMessage(this.from, { image: fs_1.default.readFileSync(`${filepath}`), caption: caption, viewOnce: viewOnce }, reply ? { quoted: this.msg } : {});
        });
    }
    sendSticker(outputfile_1) {
        return __awaiter(this, arguments, void 0, function* (outputfile, reply = true) {
            yield this.bot.sendMessage(this.from, { sticker: fs_1.default.readFileSync(`${outputfile}`) }, reply ? { quoted: this.msg } : {});
        });
    }
}
exports.default = BotFuncs;
