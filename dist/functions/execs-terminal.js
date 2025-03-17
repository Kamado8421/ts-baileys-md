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
exports.transformerMediaToWebp = transformerMediaToWebp;
const path_1 = __importDefault(require("path"));
const config_1 = require("../data/config");
const child_process_1 = require("child_process");
const _1 = require(".");
const webp = require("node-webpmux");
function addStickerMetaData(jid, mediaPath, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmpFileOut = (0, _1.joinTempFolder)(`s-formated-${jid}.webp`);
        const img = new webp.Image();
        const json = {
            "sticker-pack-id": `${config_1.BOT_NAME}-${jid}`,
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
        yield img.load(mediaPath);
        img.exif = exif;
        yield img.save(tmpFileOut);
        return tmpFileOut;
    });
}
function transformerMediaToWebp(jid, filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const outputFilename = path_1.default.join(config_1.TEMP_FOLDER_PATH, `sticker-${jid}.webp`);
            const ffmpegCommand = `ffmpeg -i "${filepath}" -vf "scale=512:512:force_original_aspect_ratio=decrease" -q:v 80 -loop 0 -preset picture -an -vsync 0 "${outputFilename}"`;
            (0, child_process_1.exec)(ffmpegCommand, (error) => {
                if (error) {
                    return reject(error);
                }
                addStickerMetaData(jid, outputFilename, {
                    author: "Bot de WhatsApp\n+55 (98) 98574-2985",
                    packname: `🔥 ${config_1.BOT_NAME}`,
                    categories: ['🤖']
                })
                    .then((stickerFileFormated) => {
                    resolve([stickerFileFormated, outputFilename, filepath]);
                })
                    .catch(reject);
            });
        });
    });
}
