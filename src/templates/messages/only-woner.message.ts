import { FOOTER_MESSAGE, PREFIX, WONER_NAME } from "../../data/config";

export const onlyWonerMessage = (permission: 'woner' | 'admin' | 'premium') => {

    let msg = '';

    switch(permission){
        case 'admin':
            msg = 'Usuário comum, somente Admins podem utilizar esse comando.';
            break;
        case 'premium':
            msg = 'Esse comando é somente para usuários premiums.'
            break;
        case 'woner':
            msg = `Somente ${WONER_NAME}, meu dono, pode utilizar esse comando.`
            break;
    }

    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ 🤖⚠️ ERRO DE PERMISSÃO

- ❧ *TIPO DE PERMISSÃO:* _${permission}_
- ❧ ${msg}

> Acesse o Menu: ${PREFIX}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛
${FOOTER_MESSAGE}
`;
}