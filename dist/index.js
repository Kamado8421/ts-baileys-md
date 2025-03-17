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
const connection_1 = require("./connection");
const MessageUpsert_1 = __importDefault(require("./events/MessageUpsert"));
const GroupParticipantsUpdate_1 = __importDefault(require("./events/GroupParticipantsUpdate"));
const checks_1 = require("./functions/checks");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = yield (0, connection_1.Connect)();
        (0, checks_1.checksDependenciesDirs)();
        (0, MessageUpsert_1.default)(bot);
        (0, GroupParticipantsUpdate_1.default)(bot);
    });
}
start();
