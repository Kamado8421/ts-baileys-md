"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksDependenciesDirs = exports.checkIsWoner = exports.checkIsGroup = exports.checkIsCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../data/config");
const jids_funcs_1 = require("./jids-funcs");
const checkIsCommand = (message) => {
    const isCommand = message.trim().startsWith(config_1.PREFIX);
    return isCommand;
};
exports.checkIsCommand = checkIsCommand;
const checkIsGroup = (jid) => {
    return jid.endsWith(jids_funcs_1.JID_GROUP_SUFIX);
};
exports.checkIsGroup = checkIsGroup;
const checkIsWoner = (jid) => {
    const wonerJid = (0, jids_funcs_1.getOwnerJid)();
    return wonerJid === jid;
};
exports.checkIsWoner = checkIsWoner;
const checksDependenciesDirs = () => {
    const hasTempFolder = fs_1.default.existsSync(config_1.TEMP_FOLDER_PATH);
    const hasConnectionFolder = fs_1.default.existsSync(config_1.CONNECTION_SAVE_PATH);
    if (!hasTempFolder) {
        fs_1.default.mkdirSync(config_1.TEMP_FOLDER_PATH);
        console.log('   > TEMP-FOLDER criado em ' + config_1.TEMP_FOLDER_PATH);
    }
    if (!hasConnectionFolder) {
        fs_1.default.mkdirSync(config_1.CONNECTION_SAVE_PATH);
        console.log('   > CONNECT SAVE FOLDER criado em ' + config_1.CONNECTION_SAVE_PATH);
    }
};
exports.checksDependenciesDirs = checksDependenciesDirs;
