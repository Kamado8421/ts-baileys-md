import { writeFile } from 'fs/promises';
import { downloadMediaMessage, proto } from "@whiskeysockets/baileys";
import { joinTempFolder } from '.';

export default async function downloadMedia(msg: proto.IWebMessageInfo) {
    if (!msg) return;

    try {
        const buffer = await downloadMediaMessage(
            msg,
            'buffer',
            {},
        )
        const filePath = joinTempFolder(`image-${msg?.key?.id}-sticker.jpeg`);
        await writeFile(filePath, buffer);
        return filePath;
    } catch (error) {
        console.log('Erro ao salvar a mídia: ', error)
        return '';
    }
}