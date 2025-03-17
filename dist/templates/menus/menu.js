"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const config_1 = require("../../data/config");
const menu = (pushName) => {
    return `
╭━━⪩ *BEM VINDO(A)* ⪨━━
┃ *BOT:* ${config_1.BOT_NAME}
┃ *DONO:* ${config_1.WONER_NAME}
┃ *USUÁRIO:* ${pushName}
╰━━─「〘⚡〙」─━━

╭━━⪩ COMANDOS ATIVOS ⪨━━
┃╭━━─ ≪ •❈• ≫ ─━━╮
┃╎${config_1.PREFIX}ping
┃╎${config_1.PREFIX}sticker
┃╰━━─ ≪ •❈• ≫ ─━━╯

${config_1.FOOTER_MESSAGE}
__________________________
`;
};
exports.menu = menu;
