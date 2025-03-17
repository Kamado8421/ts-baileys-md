import { WASocket } from "@whiskeysockets/baileys";

export default async function EventGroupParticipantsUpdate(bot: WASocket) {
    bot.ev.on('group-participants.update', async (info) => {

        const jids = info.participants;
        const jidGroup = info.id

        switch (info?.action.toLocaleLowerCase()) {
            case 'add':
                if(info.participants.length > 1) return await bot.sendMessage(jidGroup, {text: 'Sejam Bem-vindos, novos membros!!', mentions: info?.participants});
                try {
                    
                    const ppUrl = await bot.profilePictureUrl(jids[0], 'image') || 'https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg';

                    await bot.sendMessage(jidGroup, {
                        image: {url: ppUrl},
                        caption: 'Olá, Seja Bem-vindo!'
                    })

                } catch (error) {
                    bot.sendMessage(jidGroup, {text: 'Seja Bem-Vindo(a)!', mentions: info?.participants });
                }
                break;
            default:
                break;
        }
        
    })
}