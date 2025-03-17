import { Connect } from "./connection";
import EventMessageUpsert from "./events/MessageUpsert";
import EventGroupParticipantsUpdate from "./events/GroupParticipantsUpdate";
import { checksDependenciesDirs } from "./functions/checks";

async function start() {
    const bot = await Connect();
    checksDependenciesDirs();

    EventMessageUpsert(bot);
    EventGroupParticipantsUpdate(bot);

}

start();