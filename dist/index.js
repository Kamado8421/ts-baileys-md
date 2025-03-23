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
const connection_1 = require("./connection");
const checks_1 = require("./functions/checks");
const jids_funcs_1 = require("./functions/jids-funcs");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = yield (0, connection_1.Connect)();
        (0, checks_1.checksDependenciesDirs)();
        /*EventMessageUpsert(bot);
        EventGroupParticipantsUpdate(bot);*/
        yield bot.sendMessage((0, jids_funcs_1.generateUserJid)('559883528062'), { text: 'Luciano' });
    });
}
start();
