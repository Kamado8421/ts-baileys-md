import { proto } from "@whiskeysockets/baileys";
import downloadMedia from "../../functions/downloader";
import BotFuncs from "../../utils/bot-funcs";
import { transformerMediaToWebp } from "../../functions/execs-terminal";
import { deleteFile } from "../../functions";

type Params = {
    MDEVBOT: BotFuncs,
    msg: proto.IWebMessageInfo,
    idMessage: string;
}

export const exec_sticker = async ({ MDEVBOT, msg, idMessage }: Params) => {

    const filepath = await downloadMedia(msg);

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
}