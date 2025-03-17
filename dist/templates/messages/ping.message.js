"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingMessage = void 0;
const config_1 = require("../../data/config");
const pingMessage = (user) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ Pong  🤖🏓

- ❧ *Usuário:* ${user.username}
- ❧ *Level:* ${user.level}
- ❧ ${config_1.BOT_NAME} On ⚡

> Acesse o Menu: ${config_1.PREFIX}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${config_1.FOOTER_MESSAGE}
`;
};
exports.pingMessage = pingMessage;
