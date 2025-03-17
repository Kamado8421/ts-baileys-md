"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMessage = void 0;
const config_1 = require("../../data/config");
const registerMessage = (data) => {
    if (!data.user)
        return '🤖✅ (OBS): Obtive um erro, mas você foi registrado com sucesso!';
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

'*🤖✅ Usuário Registrado com sucesso!*

- ❧ *👨‍💻 Usuário(a):* ${data.user.username}
- ❧ *💵 Saldo:* ${data.user.coins} _${config_1.COIN_NAME}_
- ❧ *⚡ XP:* ${data.user.xp}       
- ❧ *👑 LEVEL:* ${data.level}
- ❧ *🔒 PREMIUM:* (NÃO)

*CONTINUE A UTILIZAR O BOT E EVOLUA SEU NÍVEL*

> Agora você terá acesso à comandos que precisam de *${config_1.COIN_NAME}* para execução'
> Acesse o Menu: ${config_1.PREFIX}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${config_1.FOOTER_MESSAGE}
`;
};
exports.registerMessage = registerMessage;
