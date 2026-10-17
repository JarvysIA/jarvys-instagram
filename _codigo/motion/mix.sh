#!/bin/bash
# Uso: ./mix.sh frames_dir saida.mp4 [voz.wav]
F=$1; OUT=$2; VOZ=$3
if [ -n "$VOZ" ]; then
  # voz na frente, trilha abaixa sozinha quando ele fala (sidechain), efeitos por cima
  AF="[1:a]volume=0.32[m];[3:a]asplit=2[v][vsc];[m][vsc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350[md];[2:a]volume=0.45[s];[v]highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=120,volume=1.0[vv];[md][s][vv]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]"
  IN3="-i $VOZ"
else
  AF="[1:a]volume=0.6[m];[2:a]volume=0.55[s];[m][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]"
  IN3=""
fi
ffmpeg -y -loglevel error -framerate 30 -i $F/f%04d.jpg -i aud/music.wav -i aud/sfx.wav $IN3 \
  -filter_complex "$AF" -map 0:v -map "[a]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high \
  -c:a aac -b:a 192k -ar 44100 -movflags +faststart -shortest "$OUT"
