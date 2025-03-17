import fs from 'fs';
import path from 'path';
import { CONNECTION_SAVE_PATH, PREFIX, TEMP_FOLDER_PATH } from '../data/config';
import { getOwnerJid, JID_GROUP_SUFIX } from './jids-funcs';

export const checkIsCommand = (message: string) => {
    const isCommand = message.trim().startsWith(PREFIX);
    return isCommand;
}

export const checkIsGroup = (jid: string) => {
    return jid.endsWith(JID_GROUP_SUFIX);
}

export const checkIsWoner = (jid: string) => {
    const wonerJid = getOwnerJid();
    return wonerJid === jid;
}

export const checksDependenciesDirs = () => {
    const hasTempFolder = fs.existsSync(TEMP_FOLDER_PATH);
    const hasConnectionFolder = fs.existsSync(CONNECTION_SAVE_PATH);

    if(!hasTempFolder) {
        fs.mkdirSync(TEMP_FOLDER_PATH);
        console.log('   > TEMP-FOLDER criado em '+ TEMP_FOLDER_PATH);
    }
    if(!hasConnectionFolder) {
        fs.mkdirSync(CONNECTION_SAVE_PATH);
        console.log('   > CONNECT SAVE FOLDER criado em '+ CONNECTION_SAVE_PATH);
    }

}