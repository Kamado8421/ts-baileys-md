import { exec } from 'child_process';
import path from 'path';
import BotFuncs from '../../utils/bot-funcs';
import { deleteFile, joinTempFolder } from '../../functions';

const downloadYoutubeVideo = async (MDEVBOT: BotFuncs, url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.resolve('python/video-downloader.py'); // Caminho absoluto
        const command = `python3 "${scriptPath}" "${url}"`;

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                console.error("Erro ao baixar o vídeo:", stderr);
                await MDEVBOT.sendTextMessage('Desculpe, ocorreu um erro desconhecido ao tentar baixar o vídeo');
                return reject("Erro ao baixar o vídeo");
            }

            console.log("Saída padrão do Python (stdout):", stdout);
            console.log("Saída de erro do Python (stderr):", stderr);

            const filename = stdout.trim();
            console.log("Vídeo baixado com sucesso:", filename);
            resolve(filename);
        });
    });
};

export const exec_playVideo = async (MDEVBOT: BotFuncs, url: string) => {
    const mp4 = await downloadYoutubeVideo(MDEVBOT, url);

    const pathFile = joinTempFolder(mp4);
    if (mp4?.endsWith('.mp4')) {

        await MDEVBOT.sendVideo({
            tempfolder: true,
            filename: mp4,
            caption: 'Seu Vídeo',
            reply: false,
        }, MDEVBOT.gerenateQuotedText('MDEVBOT-DOWNLOADS'))
    }
    
    deleteFile(pathFile);
}