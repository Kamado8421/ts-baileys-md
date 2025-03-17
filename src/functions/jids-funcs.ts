const { PHONE_NUMBER_OWNER } = require("../data/config");

export const JID_USER_SUFIX = '@s.whatsapp.net';
export const JID_GROUP_SUFIX = '@g.us';

export const generateUserJid = (phone_number: string) => {
    return `${phone_number}${JID_USER_SUFIX}`
}

export const getOwnerJid = () => {
    return `${generateUserJid(PHONE_NUMBER_OWNER)}`;
}

