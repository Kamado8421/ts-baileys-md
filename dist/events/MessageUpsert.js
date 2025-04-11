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
exports.default = EventMessageUpsert;
const loads_1 = __importDefault(require("../utils/loads"));
const config_1 = require("../data/config");
const bot_funcs_1 = __importDefault(require("../utils/bot-funcs"));
const menu_1 = require("../templates/menus/menu");
const functions_db_1 = require("../services/functions.db");
const ping_message_1 = require("../templates/messages/ping.message");
const registro_1 = require("../commands/members/registro");
const sticker_1 = require("../commands/members/sticker");
const play_video_1 = require("../commands/members/play-video");
const yt_search_1 = require("../commands/members/yt-search");
const play_audio_1 = require("../commands/members/play-audio");
function EventMessageUpsert(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        bot.ev.on('messages.upsert', (_a) => __awaiter(this, [_a], void 0, function* ({ messages }) {
            var _b, _c, _d, _e;
            const msg = messages[0];
            const key = msg === null || msg === void 0 ? void 0 : msg.key;
            if ((_b = msg === null || msg === void 0 ? void 0 : msg.key) === null || _b === void 0 ? void 0 : _b.fromMe)
                return;
            const data = yield (0, loads_1.default)(msg);
            const { isCommand, command, from, isGroup, isWoner, pushName, args, participantJId, message } = data;
            const participantJid = !isGroup ? from : `${participantJId}`;
            if (config_1.WONER_MESSAGE_ONLY_ON && !isWoner)
                return;
            if (config_1.ANTI_GROUP_ON && isGroup)
                return;
            if (config_1.ANTI_PV_ON && !isGroup)
                return;
            if (!isCommand && (message.toLocaleLowerCase() === 'prefixo' || message.toLocaleLowerCase() === 'prefix')) {
                return bot.sendMessage(participantJid, { text: '*🤖✅ ' + config_1.BOT_NAME + '*\n\nMeu prefixo: `' + config_1.PREFIX + '`\n> Use: *' + config_1.PREFIX + 'menu*' });
            }
            const userFound = yield (0, functions_db_1.getUserDB)(participantJid);
            const level = yield (0, functions_db_1.getLevelUser)(participantJid);
            const user = {
                exists: userFound ? true : false,
                info: userFound,
                rank: level
            };
            const messageType = (msg === null || msg === void 0 ? void 0 : msg.message) ? Object.keys(msg === null || msg === void 0 ? void 0 : msg.message)[0] : '';
            const idMessage = String((_c = msg === null || msg === void 0 ? void 0 : msg.key) === null || _c === void 0 ? void 0 : _c.id);
            const isImage = messageType === 'imageMessage';
            const isVideo = messageType === 'videoMessage';
            const isSticker = messageType === 'stickerMessage';
            let filepath, arg, txt = '';
            if (isCommand && command) {
                yield bot.readMessages([key]);
                const MDEVBOT = new bot_funcs_1.default(msg, from, bot, user);
                switch (command.toLowerCase()) {
                    case 'ping':
                        txt = (0, ping_message_1.pingMessage)({ username: (((_d = user === null || user === void 0 ? void 0 : user.info) === null || _d === void 0 ? void 0 : _d.username) || pushName), level: (((_e = user.rank) === null || _e === void 0 ? void 0 : _e.name) || 'Você não está no nosso banco de dados.') });
                        MDEVBOT.sendTextMessage(txt);
                        break;
                    case 'menu':
                    case 'start':
                        MDEVBOT.sendImage({
                            filename: 'menu.jpg',
                            caption: (0, menu_1.menu)(pushName)
                        });
                        break;
                    case 'play-video':
                    case 'play-v':
                        if (!args)
                            return MDEVBOT.sendTextMessage('Envie um link do Youtube ou um título de vídeo após o comando');
                        yield (0, play_video_1.exec_playVideo)(MDEVBOT, args, pushName);
                        break;
                    case 'play-audio':
                    case 'play-a':
                        if (!args)
                            return MDEVBOT.sendTextMessage('Envie um link do Youtube ou um título de vídeo após o comando');
                        yield (0, play_audio_1.exec_playAudio)(MDEVBOT, args, pushName);
                        break;
                    case 'rg':
                    case 'rigistro':
                        yield (0, registro_1.exec_registro)(MDEVBOT, { participantJid, pushName, args });
                        break;
                    case 'yt-search':
                    case 'yt-s':
                    case 'buscar-yt':
                        (0, yt_search_1.exec_ytSearch)(MDEVBOT, args);
                        break;
                    case 'f':
                    case 's':
                    case 'figu':
                    case 'sticker':
                    case 'figurinha':
                        if (!isImage)
                            return MDEVBOT.sendTextMessage('A mensagem enviada precisa ser uma imagem.\n\n> *(OBS):* Envie o comando na legenda da imagem');
                        yield (0, sticker_1.exec_sticker)({ MDEVBOT, msg, idMessage });
                        break;
                    default:
                        yield bot.sendMessage(from, { text: 'Este comando não existe.' });
                        break;
                }
            }
        }));
    });
}
