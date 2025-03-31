import { checkYoutubeUrl } from "../../functions/checks";
import { searchYouTube } from "../../functions/searches";
import { playCaptionMessage } from "../../templates/messages/play-caption.message";
import BotFuncs from "../../utils/bot-funcs";

export async function exec_ytSearch(MDEVBOT: BotFuncs, args: string){
    if(args){
        const search = await searchYouTube(args);

        if(search){
            const info  = {
                ...search,
                username: '',
                author: search.author.name
            }
            const msg = playCaptionMessage(info)
            MDEVBOT.sendTextMessage(msg);
        }

    }
}