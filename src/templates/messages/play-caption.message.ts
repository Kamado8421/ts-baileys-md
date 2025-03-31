import { BOT_NAME, FOOTER_MESSAGE, PREFIX } from "../../data/config";

export const playCaptionMessage = (info: {
    username: string, title: string, url: string, views: number, author: string, ago: string, timestamp: string
}) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *INFORMAÇÕES DE BUSCA*

- ❧ *Usuário:* ${info.username}
- ❧ *Título:* ${info.title} 
- ❧ *Views:* ${info.views} 
- ❧ *Autor:* ${info.author} 
- ❧ *Ago:* ${info.ago} 
- ❧ *Duração:* ${info.timestamp} 

- ❧ *Url:* ${info.url} 

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${FOOTER_MESSAGE}
`;
}