import fs from 'fs';
import { InputText } from "./connection/input";
import { CONNECTION_SAVE_PATH } from './data/config';

console.clear();
console.log('\nRESETAR CONEXÃO DO BOT');
(async () => {
    const response = await InputText('Tem certeza que quer resetar? [s/n]: ');
    const res = response.split('')[0].toLocaleLowerCase();
    if (res === 's' || res === 'y') {
        console.log('\n>> Conexão resetada com sucesso!!\n\nUse: "npm start" para uma nova conexão.');
        await fs.rmdir(CONNECTION_SAVE_PATH, { recursive: true }, (err) => {
            if (err) {
                console.log('Não consegui resetar a conexão. ', err)
            }
        })
    } else {
        console.log('\nA conexão não foi resetada.');
    }

    process.kill(process.pid, 'SIGINT')

})()