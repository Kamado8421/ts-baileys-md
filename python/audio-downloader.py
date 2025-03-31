import sys
import os
from pytubefix import YouTube
from pytubefix.cli import on_progress

# Força o terminal a usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')

if len(sys.argv) < 2:
    print("Erro: URL do vídeo não fornecida")
    sys.exit(1)

url = sys.argv[1]
destino = './assets/temp'

yt = YouTube(url)
ys = yt.streams.filter(only_audio=True).first()

arquivo_baixado = ys.download(output_path=destino)

# Renomeia o arquivo para .mp3
base, ext = os.path.splitext(arquivo_baixado)
novo_arquivo = base + ".mp3"
os.rename(arquivo_baixado, novo_arquivo)

print(os.path.basename(novo_arquivo))  # Retorna o nome do arquivo baixado
