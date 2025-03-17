import makeWASocket, {
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

import pino from 'pino';
import CFonts from 'cfonts';

import { CONNECTION_SAVE_PATH, GENERATE_QRCODE_TERMINAL, NOTIFY_BOT_ONLINE, PHONE_NUMBER_OWNER } from "../data/config";
import { InputText } from "./input";
import { generateUserJid } from "../functions/jids-funcs";

export async function Connect() {

    console.clear();
    console.log("\x1b[1;33;42m Iniciando Conexão do M'Dev-Bot \x1b[m")

    const { state, saveCreds } = await useMultiFileAuthState(CONNECTION_SAVE_PATH);

    const { version } = await fetchLatestBaileysVersion();

    const bot = makeWASocket({
        printQRInTerminal: GENERATE_QRCODE_TERMINAL || false,
        version,
        logger: pino({ level: "error" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
    });

    if (!bot.authState.creds.registered && !GENERATE_QRCODE_TERMINAL) {
        const numeroWhatsApp = await InputText("Informe o seu número de WhatsApp \x1b[1;33m(Somente Número)\x1b[m: ");

        if (!numeroWhatsApp) {
            throw new Error("Número de WhatsApp inválido!");
        }

        const code = await bot.requestPairingCode(numeroWhatsApp);

        console.log(`Código de pareamento: ${code}`);
    }

    bot.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                Connect();
            }
        }
        /*
        if (NOTIFY_BOT_ONLINE && PHONE_NUMBER_OWNER) {
            try {

                const jid = generateUserJid(PHONE_NUMBER_OWNER);
                await bot.sendMessage(jid, { text: '⚠️ Bot online!' });

            } catch (error) {
                console.log('Não consegui notificar ao dono que estou online.\nHá possivelmente uma irregularidade no número de telefone informado!!')
            }
        } else if (NOTIFY_BOT_ONLINE && !PHONE_NUMBER_OWNER) {
            console.log('   - Não consegui notificar ao dono que estou online.\n    O número de telefone não foi informado nas configurações!!\n')
        }*/
    });

    bot.ev.on("creds.update", saveCreds);

    
    CFonts.say("M'DEV - BOT", {
        font: 'block',            
        align: 'center',            
        colors: ['green', 'yellow'],
        background: 'transparent',
        letterSpacing: 1,       
        lineHeight: 1,              
        space: true,                
        maxLength: '0',             
        gradient: true            
    });

    console.log("\x1b[1;32m O Bot Está Pronto!! \x1b[m")

    return bot;
}
