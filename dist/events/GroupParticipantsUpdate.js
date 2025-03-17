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
exports.default = EventGroupParticipantsUpdate;
function EventGroupParticipantsUpdate(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        bot.ev.on('group-participants.update', (info) => __awaiter(this, void 0, void 0, function* () {
            const jids = info.participants;
            const jidGroup = info.id;
            switch (info === null || info === void 0 ? void 0 : info.action.toLocaleLowerCase()) {
                case 'add':
                    if (info.participants.length > 1)
                        return yield bot.sendMessage(jidGroup, { text: 'Sejam Bem-vindos, novos membros!!', mentions: info === null || info === void 0 ? void 0 : info.participants });
                    try {
                        const ppUrl = (yield bot.profilePictureUrl(jids[0], 'image')) || 'https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg';
                        yield bot.sendMessage(jidGroup, {
                            image: { url: ppUrl },
                            caption: 'Olá, Seja Bem-vindo!'
                        });
                    }
                    catch (error) {
                        bot.sendMessage(jidGroup, { text: 'Seja Bem-Vindo(a)!', mentions: info === null || info === void 0 ? void 0 : info.participants });
                    }
                    break;
                default:
                    break;
            }
        }));
    });
}
