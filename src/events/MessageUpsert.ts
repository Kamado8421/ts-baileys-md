import { UserProps } from './../services/functions.db';
import { WASocket } from "@whiskeysockets/baileys";
import loads from "../utils/loads";
import { ANTI_GROUP_ON, ANTI_PV_ON, BOT_NAME, PREFIX } from "../data/config";
import BotFuncs from "../utils/bot-funcs";
import { menu } from "../templates/menus/menu";
import downloadMedia from "../functions/downloader";
import { transformerMediaToWebp } from "../functions/execs-terminal";
import { deleteFile } from "../functions";
import { getUserDB, getLevelUser } from "../services/functions.db";
import { pingMessage } from "../templates/messages/ping.message";

import { exec_registro } from '../commands/members/registro'

export default async function EventMessageUpsert(bot: WASocket) {
    bot.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        const key = msg?.key;
        if (msg?.key?.fromMe) return;

        const data = await loads(msg);

        const { isCommand, command, from, isGroup, isWoner, pushName, args, participantJId, message } = data;
        const participantJid = !isGroup ? from : `${participantJId}`

        if (ANTI_GROUP_ON && isGroup) return;
        if (ANTI_PV_ON && !isGroup) return;

        if (!isCommand && (message.toLocaleLowerCase() === 'prefixo' || message.toLocaleLowerCase() === 'prefix')) {
            return bot.sendMessage(participantJid, { text: '*🤖✅ ' + BOT_NAME + '*\n\nMeu prefixo: `' + PREFIX + '`\n> Use: *' + PREFIX + 'menu*' })
        }

        const userFound = await getUserDB(participantJid);
        const level = await getLevelUser(participantJid);

        const user: UserProps = {
            exists: userFound ? true : false,
            info: userFound,
            rank: level
        }

        const messageType = msg?.message ? Object.keys(msg?.message)[0] : '';

        const idMessage = String(msg?.key?.id);
        const isImage = messageType === 'imageMessage';
        const isVideo = messageType === 'videoMessage';
        const isSticker = messageType === 'stickerMessage';

        let filepath, arg, txt = '';
        if (isCommand) {

            await bot.readMessages([key]);
            const MDEVBOT = new BotFuncs(msg, from, bot);

            switch (command.toLowerCase()) {
                case 'ping':
                    txt = pingMessage({ username: user?.info?.username || pushName, level: user.rank?.name || 'Você não está no nosso banco de dados.' });
                    MDEVBOT.sendTextMessage(txt);
                    break;

                case 'menu': case 'start':
                    MDEVBOT.sendImage({
                        filename: 'menu.jpg',
                        caption: menu(pushName)
                    });
                    break


                case 'rg': case 'rigistro':
                    await exec_registro(MDEVBOT, { participantJid, pushName, args });
                    break;

                case 'f': case 's': case 'figu': case 'sticker': case 'figurinha':
                    if (!isImage) return MDEVBOT.sendTextMessage('A mensagem enviada precisa ser uma imagem.\n\n> *(OBS):* Envie o comando na legenda da imagem');

                    filepath = await downloadMedia(msg);

                    if (!filepath) return MDEVBOT.sendTextMessage('Obtive um erro ao receber a imagem. Tente novamente mais tarde.');

                    let output = '';
                    try {
                        const [stickerFileFormated, outputFilename, filepaths] = await transformerMediaToWebp(idMessage, filepath);

                        output = outputFilename
                        await MDEVBOT.sendTextMessage('⌛ Aguarde, enquanto faço sua figurinha...');
                        await MDEVBOT.sendSticker(stickerFileFormated);

                        if (filepaths) deleteFile(filepaths);
                        if (outputFilename) deleteFile(outputFilename);
                        if (stickerFileFormated) deleteFile(stickerFileFormated);

                    } catch (error) {
                        console.error("Erro ao criar a figurinha:", error);
                        MDEVBOT.sendTextMessage('Houve um erro ao processar sua figurinha. Tente novamente mais tarde.');

                        if (filepath) deleteFile(filepath);
                        if (output) deleteFile(output);
                    }

                    break;
                default:
                    await bot.sendMessage(from, { text: 'Este comando não existe.' })
                    break;
            }
        }
    })
}