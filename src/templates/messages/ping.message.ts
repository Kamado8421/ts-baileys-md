import { BOT_NAME, FOOTER_MESSAGE, PREFIX } from "../../data/config";

export const pingMessage = (user: { username: string, level: string }) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ Pong  🤖🏓

- ❧ *Usuário:* ${user.username}
- ❧ *Level:* ${user.level}
- ❧ ${BOT_NAME} On ⚡

> Acesse o Menu: ${PREFIX}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${FOOTER_MESSAGE}
`;
}