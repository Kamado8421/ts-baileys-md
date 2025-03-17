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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = downloadMedia;
const promises_1 = require("fs/promises");
const baileys_1 = require("@whiskeysockets/baileys");
const _1 = require(".");
function downloadMedia(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!msg)
            return;
        try {
            const buffer = yield (0, baileys_1.downloadMediaMessage)(msg, 'buffer', {});
            const filePath = (0, _1.joinTempFolder)(`image-${(_a = msg === null || msg === void 0 ? void 0 : msg.key) === null || _a === void 0 ? void 0 : _a.id}-sticker.jpeg`);
            yield (0, promises_1.writeFile)(filePath, buffer);
            return filePath;
        }
        catch (error) {
            console.log('Erro ao salvar a mídia: ', error);
            return '';
        }
    });
}
