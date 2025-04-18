import { exec } from 'child_process';
import path from 'path';
import BotFuncs from '../../utils/bot-funcs';
import { deleteFile, joinTempFolder } from '../../functions';
import { playCaptionMessage } from '../../templates/messages/play-caption.message';
import { checkYoutubeUrl } from '../../functions/checks';
import { searchYouTube, VideoDataType } from '../../functions/searches';

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

export const exec_playVideo = async (MDEVBOT: BotFuncs, url: string, pushName: string) => {

    let video: VideoDataType = { ago: '', url: '', author: { name: '' }, views: 2, timestamp: '', title: '' };

    if (url.startsWith('https://')) {
        const isValidUrl = checkYoutubeUrl(url);
        if (!isValidUrl) {
            return MDEVBOT.sendTextMessage('Verifique a URL informada, ela não passou na minha verificação de links do YouTube.');
        }
    } else {
        const search = await searchYouTube(url);

        if (!search) {
            return MDEVBOT.sendTextMessage(`Infelizmente não consegui encontrar um vídeo para "${url}"`)
        }

        url = search.url;
        video = search;
    }

    await MDEVBOT.sendTextMessage('🤖⌛ Processando sua requisição, aguarde...');
    const mp4 = await downloadYoutubeVideo(MDEVBOT, url);

    const pathFile = joinTempFolder(mp4);
    if (mp4?.endsWith('.mp4')) {

        const info = {
            username: MDEVBOT.getUser().info?.username || pushName,
            title: video.title,
            url: url,
            views: video.views,
            author: video.author.name,
            ago: video.ago,
            timestamp: video.timestamp
        }

        await MDEVBOT.sendVideo({
            tempfolder: true,
            filename: mp4,
            caption: playCaptionMessage(info),
            reply: false,
        },)
    }

    deleteFile(pathFile);
}