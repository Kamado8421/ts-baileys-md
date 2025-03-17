import { BOT_NAME, COIN_NAME, FOOTER_MESSAGE, PREFIX } from "../../data/config";
import { PromiseReturnsCreateUserDB } from "../../services/functions.db";

export const registerMessage = (data: PromiseReturnsCreateUserDB) => {

    if(!data.user) return '🤖✅ (OBS): Obtive um erro, mas você foi registrado com sucesso!';

    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

'*🤖✅ Usuário Registrado com sucesso!*

- ❧ *👨‍💻 Usuário(a):* ${data.user.username}
- ❧ *💵 Saldo:* ${data.user.coins} _${COIN_NAME}_
- ❧ *⚡ XP:* ${data.user.xp}       
- ❧ *👑 LEVEL:* ${data.level}
- ❧ *🔒 PREMIUM:* (NÃO)

*CONTINUE A UTILIZAR O BOT E EVOLUA SEU NÍVEL*

> Agora você terá acesso à comandos que precisam de *${COIN_NAME}* para execução'
> Acesse o Menu: ${PREFIX}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${FOOTER_MESSAGE}
`;
}