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
exports.exec_registro = void 0;
const functions_db_1 = require("../../services/functions.db");
const register_message_1 = require("../../templates/messages/register.message");
const exec_registro = (MDEVBOT_1, _a) => __awaiter(void 0, [MDEVBOT_1, _a], void 0, function* (MDEVBOT, { args, participantJid, pushName }) {
    let result = yield (0, functions_db_1.createUserDB)({
        jid: participantJid,
        username: args ? args : pushName
    });
    if (result === null || result === void 0 ? void 0 : result.error)
        return MDEVBOT.sendTextMessage('Ocorreu um erro ao tentar regístrálo');
    if (result === null || result === void 0 ? void 0 : result.wasRegisted)
        return MDEVBOT.sendTextMessage('🤖⚠️ Verifiquei que você já estava salvo no banco de dados. Não precisa mais utilizar esse comando!');
    if ((result === null || result === void 0 ? void 0 : result.user) && !(result === null || result === void 0 ? void 0 : result.wasRegisted)) {
        let txt = (0, register_message_1.registerMessage)(result);
        return MDEVBOT.sendTextMessage(txt);
    }
});
exports.exec_registro = exec_registro;
