# Bot de WhatsApp com TypeScript

Utizando API Baileys[](https://) a

## Clone agora o repositório:

Instale o git na sua máquina (é necessário ter o nodejs e typescript instalados e configurados para executar o script posteriormente):

**Termux:**

```bash
apt update -y && apt upgrade -y
```

```bash
pkg install git -y
```

Verifique a instalação:

```bash
git --version
```

Se tudo ocorreu bem, o termux/terminal existirá a versão do `git`
Clone o repositório do bot, mas antes, navegue até uma pasta segura.
**Termux:**

```bash
cd /sdcard # entrar nos seus arquivos
```

```bash
git clone https://github.com/Kamado8421/ts-baileys-mdevbot.git && ls
```

verifique a instalação: se aparecer o nome `ts-baileys-mdevbot` na listagem de diretórios correu tudo bem. Entre no diretório clonado e exiba o conteúdo:

```bash
clear && cd ts-baileys-mdevbot && ls
```

### Instalar dependências:

````bash
npm install
````

## Atenção

Antes de executar o projeto, configure o seu bot em `src/data/config.ts`

```typescript
import path from 'path';

// variáveis de configuração
export const PREFIX = "/"; // o bot só reponderá comandos com esse prefixo
export const BOT_NAME = "MDEV'BOT"; // edite o nome do seu bot
export const ICON_BOT_NAME = "©"; // emoji ou carácter especial que será exibido antes do nome do bot
export const WONER_NAME = "M'Dev Systems"; // seu nome de dono

// OBS: essa informação só pode ter 12 dígitos numéricos sem espaço: 55 + DDD + NÚMERO SEM O 9 inicial
export const PHONE_NUMBER_OWNER = "550012345678"; // sem esse campo o bot não saberá que é o dono que está mandando msg

// ativadores
export const NOTIFY_BOT_ONLINE = true; // avisa ao dono quando o bot for iniciado.
export const GENERATE_QRCODE_TERMINAL = false; // gera o qrcode de conexão no terminal se você preferir (recomendo deixar false se você estiver no dispositivo móvel)

export const TEMP_FOLDER_PATH = path.resolve(__dirname, '..', '..', 'assets', 'temp'); // pasta de arquivos temporários
export const IMAGES_FOLDER_PATH = path.resolve(__dirname, '..', '..', 'assets', 'images'); // pasta de imagens fixas
export const CONNECTION_SAVE_PATH = path.resolve(__dirname, "..", "..", "assets", "qrcode"); // pasta onde será salva as conexões

// anti condições
export const ANTI_GROUP_ON = false; // se for grupo, o bot não responde
export const ANTI_PV_ON = false; // se for privado, o bot não responde


```

Compilar & Executar

```bash
npm run build 
```

```bash
npm start
```

Executar somente o nodejs

````bash
node dist/index.js
````

## Diretórios

Certifique-se de que o diretório`assets/` possui as psatas `assets/temp`, `assets/images` e `assets/qrcode`. Caso não haja, crie-os

## Baixe no Termux o ffmpeg

```bash
pkg install ffmpeg -y
```

Obs: caso esteja no windows, verifique na web como baixar e instalar o ffmpeg
