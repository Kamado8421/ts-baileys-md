"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../connection/input");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log('ATENÇÃO:\n     > Você está no log para resetar a conexão do bot.\n\n');
    const option = (yield (0, input_1.InputText)('Deseja realmente resetar a conexão atual? (s/n): ')).toLocaleLowerCase();
    if (!option) {
        console.log('\nNão entendi sua resposta. A conexão do Bot não será encerrada.');
    }
    else if (option === 'n' || option === 'não' || option === 'nao' || option === 'not') {
        console.log('\nOK! A conexão do Bot não será encerrada.');
    }
    else if (option === 's' || option === 'y' || option === 'sim' || option === 'ss' || option === 'yes') {
        console.log('Conexão encerrada com sucesso. Execute `npm start` para estabelecer uma nova conexão.');
    }
    else {
        console.log('Ocorreu um erro ao receber sua resposta, execute `npm run reset-bot` novamente e responts com "s" ou "n".');
    }
}))();
