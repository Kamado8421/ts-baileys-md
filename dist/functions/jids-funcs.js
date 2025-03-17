"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerJid = exports.generateUserJid = exports.JID_GROUP_SUFIX = exports.JID_USER_SUFIX = void 0;
const { PHONE_NUMBER_OWNER } = require("../data/config");
exports.JID_USER_SUFIX = '@s.whatsapp.net';
exports.JID_GROUP_SUFIX = '@g.us';
const generateUserJid = (phone_number) => {
    return `${phone_number}${exports.JID_USER_SUFIX}`;
};
exports.generateUserJid = generateUserJid;
const getOwnerJid = () => {
    return `${(0, exports.generateUserJid)(PHONE_NUMBER_OWNER)}`;
};
exports.getOwnerJid = getOwnerJid;
