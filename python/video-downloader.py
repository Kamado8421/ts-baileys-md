# import os
# import sys
# from pytubefix import YouTube
# from pytubefix.cli import on_progress

# url = sys.argv[1]

# destino = 'assets/downloads'

# yt = YouTube(url, on_progress_callback=on_progress)

# ys = yt.streams.get_highest_resolution()

# ys.download(output_path=destino)

# arquivo_baixado = ys.download(output_path=destino)

# # Retorna o nome do arquivo baixado para o Node.js
# print(os.path.basename(arquivo_baixado))

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
ys = yt.streams.get_highest_resolution()

arquivo_baixado = ys.download(output_path=destino)

print(os.path.basename(arquivo_baixado))  # Retorna o nome do arquivo baixado
