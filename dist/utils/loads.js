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
const checks_1 = require("../functions/checks");
const config_1 = require("../data/config");
function loads(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const from = String((_a = msg === null || msg === void 0 ? void 0 : msg.key) === null || _a === void 0 ? void 0 : _a.remoteJid);
        const pushName = (msg === null || msg === void 0 ? void 0 : msg.pushName) || 'Desconhecido(a)';
        const message = ((_c = (_b = msg === null || msg === void 0 ? void 0 : msg.message) === null || _b === void 0 ? void 0 : _b.extendedTextMessage) === null || _c === void 0 ? void 0 : _c.text) || ((_d = msg === null || msg === void 0 ? void 0 : msg.message) === null || _d === void 0 ? void 0 : _d.conversation) || ((_f = (_e = msg === null || msg === void 0 ? void 0 : msg.message) === null || _e === void 0 ? void 0 : _e.imageMessage) === null || _f === void 0 ? void 0 : _f.caption) || ((_h = (_g = msg === null || msg === void 0 ? void 0 : msg.message) === null || _g === void 0 ? void 0 : _g.videoMessage) === null || _h === void 0 ? void 0 : _h.caption) || '';
        // variáveis de verificação
        const isWoner = (0, checks_1.checkIsWoner)(from);
        const isGroup = (0, checks_1.checkIsGroup)(from);
        const participantJId = isGroup ? (_j = msg === null || msg === void 0 ? void 0 : msg.key) === null || _j === void 0 ? void 0 : _j.participant : undefined;
        const isCommand = (0, checks_1.checkIsCommand)(message.split(' ')[0].trim());
        const command = isCommand ? message.split(' ')[0].replace(config_1.PREFIX, '').trim() : '';
        const args = isCommand ? message.replace(`${config_1.PREFIX}${command}`, '').trim() : message;
        return {
            from,
            message,
            isWoner,
            isCommand,
            command,
            isGroup,
            args,
            pushName,
            participantJId,
        };
    });
}
exports.default = loads;
