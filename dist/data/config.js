"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANTI_PV_ON = exports.ANTI_GROUP_ON = exports.CONNECTION_SAVE_PATH = exports.IMAGES_FOLDER_PATH = exports.TEMP_FOLDER_PATH = exports.GENERATE_QRCODE_TERMINAL = exports.NOTIFY_BOT_ONLINE = exports.FOOTER_MESSAGE = exports.PHONE_NUMBER_OWNER = exports.WONER_NAME = exports.ICON_BOT_NAME = exports.COIN_NAME = exports.BOT_NAME = exports.PREFIX = void 0;
const path_1 = __importDefault(require("path"));
// variáveis de configuração
exports.PREFIX = "/";
exports.BOT_NAME = "MDEV'BOT";
exports.COIN_NAME = "Dev-Coins";
exports.ICON_BOT_NAME = "©";
exports.WONER_NAME = "M'Dev Systems";
exports.PHONE_NUMBER_OWNER = "559883528062";
exports.FOOTER_MESSAGE = `> ${exports.ICON_BOT_NAME} ${exports.BOT_NAME} ²⁰²⁵`;
// ativadores
exports.NOTIFY_BOT_ONLINE = true; // avisa ao dono quando o bot for inicado.
exports.GENERATE_QRCODE_TERMINAL = true; // gera o qrcode de conexão no terminal
exports.TEMP_FOLDER_PATH = path_1.default.resolve(__dirname, '..', '..', 'assets', 'temp');
exports.IMAGES_FOLDER_PATH = path_1.default.resolve(__dirname, '..', '..', 'assets', 'images');
exports.CONNECTION_SAVE_PATH = path_1.default.resolve(__dirname, "..", "..", "assets", "qrcode");
// anti condições
exports.ANTI_GROUP_ON = true; // se for grupo, o bot não responde
exports.ANTI_PV_ON = false; // se for privado, o bot não responde
