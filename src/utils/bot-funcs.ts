import { proto, WASocket } from "@whiskeysockets/baileys";
import fs from "fs";
import { joinTempFolder } from "../functions";
import path from "path";
import { IMAGES_FOLDER_PATH } from "../data/config";
import { UserProps } from "../services/functions.db";

type optiosMediaType = {
    filename: string;
    caption?: string;
    tempfolder?: boolean;
    viewOnce?: boolean;
    reply?: boolean;
    isUrlImage?: boolean;
    quotedText?: string;
}

export default class BotFuncs {
    constructor(
        private msg: proto.IWebMessageInfo,
        private from: string,
        private bot: WASocket,
        private user: UserProps
    ) { }

    getFrom() {
        return this.from;
    }
    getUser(){
        return this.user;
    }

    async sendTextMessage(text: string, reply: boolean = true) {
        await this.bot.sendMessage(this.from, { text: text }, reply ? { quoted: this.msg } : {});
    }


    async sendImage({ filename, caption = '', isUrlImage = false, tempfolder = false, viewOnce = false, reply = true }: optiosMediaType) {
        const filepath = tempfolder ? joinTempFolder(filename) : path.resolve(IMAGES_FOLDER_PATH, filename);
        await this.bot.sendMessage(this.from, {
            image: isUrlImage ? { url: filename } : fs.readFileSync(`${filepath}`),
            caption: caption,
            viewOnce: viewOnce
        }, reply ? { quoted: this.msg } : {});
    }

    async sendVideo({ filename, caption = '', tempfolder = false, viewOnce = false, reply = true, quotedText = '' }: optiosMediaType) {
        const filepath = tempfolder ? joinTempFolder(filename) : path.resolve(IMAGES_FOLDER_PATH, filename);
        await this.bot.sendMessage(this.from, {
            video: fs.readFileSync(`${filepath}`),
            caption: caption,
            viewOnce: viewOnce,
            contextInfo: quotedText ? {
                quotedMessage: {
                    conversation: quotedText
                }
            } : {}
        }, reply ? { quoted: this.msg } : {});
    }


    async sendSticker(outputfile: string, reply: boolean = true) {
        await this.bot.sendMessage(this.from, { sticker: fs.readFileSync(`${outputfile}`) }, reply ? { quoted: this.msg } : {});
    }
}