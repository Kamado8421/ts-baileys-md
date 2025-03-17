import { proto } from "@whiskeysockets/baileys";
import { checkIsCommand, checkIsGroup, checkIsWoner } from "../functions/checks";
import { PREFIX } from "../data/config";

async function loads(msg: proto.IWebMessageInfo){

    const from = String(msg?.key?.remoteJid);
    const pushName = msg?.pushName || 'Desconhecido(a)';
    const message = msg?.message?.extendedTextMessage?.text || msg?.message?.conversation || msg?.message?.imageMessage?.caption || msg?.message?.videoMessage?.caption || '';

    // variáveis de verificação
    const isWoner = checkIsWoner(from);
    const isGroup = checkIsGroup(from);
    const participantJId = isGroup ? msg?.key?.participant : undefined;
    
    const isCommand = checkIsCommand(message.split(' ')[0].trim());
    const command = isCommand ? message.split(' ')[0].replace(PREFIX, '').trim() : '';
    const args = isCommand ? message.replace(`${PREFIX}${command}`, '').trim() : message;

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
    }

    
}

export default loads;