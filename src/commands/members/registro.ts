import { createUserDB } from "../../services/functions.db";
import { registerMessage } from "../../templates/messages/register.message";
import BotFuncs from "../../utils/bot-funcs";

type Params = {
    args?: string;
    participantJid: string;
    pushName: string;
}
export const exec_registro = async (MDEVBOT: BotFuncs, { args, participantJid, pushName }: Params) => {
    let result = await createUserDB({
        jid: participantJid,
        username: args ? args : pushName
    });

    if (result?.error) return MDEVBOT.sendTextMessage('Ocorreu um erro ao tentar regístrálo');
    if (result?.wasRegisted) return MDEVBOT.sendTextMessage('🤖⚠️ Verifiquei que você já estava salvo no banco de dados. Não precisa mais utilizar esse comando!')

    if (result?.user && !result?.wasRegisted) {
        let txt = registerMessage(result);
        return MDEVBOT.sendTextMessage(txt);
    }
} 