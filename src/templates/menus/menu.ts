import { BOT_NAME, FOOTER_MESSAGE, ICON_BOT_NAME, PREFIX, WONER_NAME } from "../../data/config"

export const menu = (pushName: string) => {
return `
╭━━⪩ *BEM VINDO(A)* ⪨━━
┃ *BOT:* ${BOT_NAME}
┃ *DONO:* ${WONER_NAME}
┃ *USUÁRIO:* ${pushName}
╰━━─「〘⚡〙」─━━

╭━━⪩ COMANDOS ATIVOS ⪨━━
┃╭━━─ ≪ •❈• ≫ ─━━╮
┃╎${PREFIX}ping
┃╎${PREFIX}play-video + link ou titulo
┃╎${PREFIX}yt-s + titulo
┃╎${PREFIX}rg + seu nome
┃╎${PREFIX}sticker
┃╰━━─ ≪ •❈• ≫ ─━━╯

${FOOTER_MESSAGE}
__________________________
`
}