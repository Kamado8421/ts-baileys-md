import { proto, WASocket } from "@whiskeysockets/baileys";
import fs from "fs";
import { joinTempFolder } from "../functions";
import path from "path";
import { IMAGES_FOLDER_PATH } from "../data/config";

type optiosImageType = {
    filename: string;
    caption?: string;
    tempfolder?: boolean;
    viewOnce?: boolean;
    reply?: boolean;
}

export default class BotFuncs {
    constructor(
        private msg: proto.IWebMessageInfo,
        private from: string,
        private bot: WASocket
    ) { }

    async sendTextMessage(text: string, reply: boolean = true) {
        await this.bot.sendMessage(this.from, { text: text }, reply ? { quoted: this.msg } : {});
    }

    async sendImage({ filename, caption = '', tempfolder = false, viewOnce = false, reply= true}: optiosImageType) {
        const filepath = tempfolder ? joinTempFolder(filename) : path.resolve(IMAGES_FOLDER_PATH, filename);
        await this.bot.sendMessage(this.from, { image: fs.readFileSync(`${filepath}`), caption: caption, viewOnce: viewOnce }, reply ? {quoted: this.msg} : {});
    }

    async sendSticker(outputfile: string, reply: boolean = true) {
        await this.bot.sendMessage(this.from, { sticker: fs.readFileSync(`${outputfile}`) }, reply ? {quoted: this.msg} : {});
    }
}