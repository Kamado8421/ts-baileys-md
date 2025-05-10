import { GroupParticipant, WASocket, proto } from "@whiskeysockets/baileys";
import { generateUserJid } from "../functions/jids-funcs";
import { PHONE_NUMBER_BOT } from "../data/config";
import fs from 'fs'

export default class GroupFuncs {
    constructor(
        private bot: WASocket,
        private groupJid: string
    ) {}

    /** Verifica se o JID é um grupo válido */
    isGroup() {
        return this.groupJid.endsWith("@g.us");
    }

    /** Obtém metadados completos do grupo */
    async getGroupMetadata() {
        if (!this.isGroup()) throw new Error("O JID fornecido não é de um grupo.");
        return await this.bot.groupMetadata(this.groupJid);
    }

    /** Obtém o nome do grupo */
    async getGroupName(): Promise<string> {
        const metadata = await this.getGroupMetadata();
        return metadata.subject;
    }

    /** Obtém a descrição do grupo */
    async getGroupDescription(): Promise<string> {
        const metadata = await this.getGroupMetadata();
        return metadata.desc || '';
    }

    /** Obtém todos os membros do grupo */
    async getGroupMembers(): Promise<GroupParticipant[]> {
        const metadata = await this.getGroupMetadata();
        return metadata.participants;
    }

    /** Obtém os administradores do grupo */
    async getGroupAdmins(): Promise<string[]> {
        const metadata = await this.getGroupMetadata();
        return metadata.participants
            .filter(member => member.admin !== null)
            .map(admin => admin.id);
    }

    /** Verifica se um determinado JID é admin do grupo */
    async isAdmin(jid: string): Promise<boolean> {
        const admins = await this.getGroupAdmins();
        return admins.includes(jid);
    }

    /** Verifica se o próprio bot é admin */
    async amIAdmin(): Promise<boolean> {
        const jid = generateUserJid(PHONE_NUMBER_BOT);
        if (!jid) return false;
        return this.isAdmin(jid);
    }

    /** Adiciona membros ao grupo (se for admin) */
    async addParticipants(jids: string[]) {
        await this.bot.groupParticipantsUpdate(this.groupJid, jids, "add");
    }

    /** Remove membros do grupo (se for admin) */
    async removeParticipants(jids: string[]) {
        await this.bot.groupParticipantsUpdate(this.groupJid, jids, "remove");
    }

    /** Promove um membro a admin (se for admin) */
    async promoteParticipants(jids: string[]) {
        await this.bot.groupParticipantsUpdate(this.groupJid, jids, "promote");
    }

    /** Rebaixa um admin a membro comum (se for admin) */
    async demoteParticipants(jids: string[]) {
        await this.bot.groupParticipantsUpdate(this.groupJid, jids, "demote");
    }

     /** Altera o nome (assunto) do grupo */
    async updateGroupName(newName: string) {
        await this.bot.groupUpdateSubject(this.groupJid, newName);
    }

    /** Altera a descrição do grupo */
    async updateGroupDescription(newDescription: string) {
        await this.bot.groupUpdateDescription(this.groupJid, newDescription);
    }

    /** Altera a foto do grupo */
    async updateGroupProfilePicture(imagePath: string) {
        const imageBuffer = fs.readFileSync(imagePath);
        await this.bot.updateProfilePicture(this.groupJid, imageBuffer);
    }
}
