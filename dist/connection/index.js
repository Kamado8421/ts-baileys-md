"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = Connect;
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const pino_1 = __importDefault(require("pino"));
const cfonts_1 = __importDefault(require("cfonts"));
const config_1 = require("../data/config");
const input_1 = require("./input");
function Connect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.log("\x1b[1;33;42m Iniciando Conexão do M'Dev-Bot \x1b[m");
        const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)(config_1.CONNECTION_SAVE_PATH);
        const { version } = yield (0, baileys_1.fetchLatestBaileysVersion)();
        const bot = (0, baileys_1.default)({
            printQRInTerminal: config_1.GENERATE_QRCODE_TERMINAL || false,
            version,
            logger: (0, pino_1.default)({ level: "error" }),
            auth: state,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            markOnlineOnConnect: true,
        });
        if (!bot.authState.creds.registered && !config_1.GENERATE_QRCODE_TERMINAL) {
            const numeroWhatsApp = yield (0, input_1.InputText)("Informe o seu número de WhatsApp \x1b[1;33m(Somente Número)\x1b[m: ");
            if (!numeroWhatsApp) {
                throw new Error("Número de WhatsApp inválido!");
            }
            const code = yield bot.requestPairingCode(numeroWhatsApp);
            console.log(`Código de pareamento: ${code}`);
        }
        bot.ev.on("connection.update", (update) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { connection, lastDisconnect } = update;
            if (connection === "close") {
                const shouldReconnect = ((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut;
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
        }));
        bot.ev.on("creds.update", saveCreds);
        cfonts_1.default.say("M'DEV - BOT", {
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
        console.log("\x1b[1;32m O Bot Está Pronto!! \x1b[m");
        return bot;
    });
}
