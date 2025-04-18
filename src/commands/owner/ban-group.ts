import { onlyWonerMessage } from "../../templates/messages/only-woner.message";
import BotFuncs from "../../utils/bot-funcs";

export async function exec_banGroup(MDEVBOT: BotFuncs) {
    if (!MDEVBOT.isWornerMessage) return MDEVBOT.sendTextMessage(onlyWonerMessage('woner'));

}