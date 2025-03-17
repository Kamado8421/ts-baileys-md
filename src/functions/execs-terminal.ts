import path from "path";
import { BOT_NAME, TEMP_FOLDER_PATH } from "../data/config";
import { exec } from "child_process";
import { joinTempFolder } from ".";

const webp = require("node-webpmux");

type MetadatSticker = {
    packname: string;
    author: string;
    categories?: string[];
}

async function addStickerMetaData(jid: string, mediaPath: string, metadata: MetadatSticker) {
    const tmpFileOut = joinTempFolder(`s-formated-${jid}.webp`);

    const img = new webp.Image();
    const json = {
        "sticker-pack-id": `${BOT_NAME}-${jid}`,
        "sticker-pack-name": metadata.packname,
        "sticker-pack-publisher": metadata.author,
        emojis: metadata.categories ? metadata.categories : [""],
    };

    const exifAttr = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41,
        0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);

    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);

    await img.load(mediaPath);

    img.exif = exif;
    await img.save(tmpFileOut);

    return tmpFileOut;
}


export async function transformerMediaToWebp(jid: string, filepath: string): Promise<[string, string, string]> {
    return new Promise((resolve, reject) => {
        const outputFilename = path.join(TEMP_FOLDER_PATH, `sticker-${jid}.webp`);

        const ffmpegCommand = `ffmpeg -i "${filepath}" -vf "scale=512:512:force_original_aspect_ratio=decrease" -q:v 80 -loop 0 -preset picture -an -vsync 0 "${outputFilename}"`;

        exec(ffmpegCommand, (error) => {
            if (error) {
                return reject(error);
            }

            addStickerMetaData(jid, outputFilename, {
                author: "Bot de WhatsApp\n+55 (98) 98574-2985",
                packname: `🔥 ${BOT_NAME}`,
                categories: ['🤖']
            })
                .then((stickerFileFormated) => {
                    resolve([stickerFileFormated, outputFilename, filepath]);
                })
                .catch(reject);
        });
    });
}
