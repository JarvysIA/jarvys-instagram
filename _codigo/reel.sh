#!/bin/bash
# Monta um reel MP4 1080x1920 a partir de quadros PNG, com fade de 0,35 s e trilha de audio muda.
# Uso: ./reel.sh saida.mp4 <segundos_totais> quadro1.png quadro2.png ...
out=$1; total=$2; shift 2; frames=("$@"); n=${#frames[@]}; fade=0.35
d=$(python3 -c "print(round(($total+($n-1)*$fade)/$n,3))")
inputs=""; for f in "${frames[@]}"; do inputs="$inputs -loop 1 -t $d -i $f"; done
filt=""; prev="0:v"
for ((i=1;i<n;i++)); do off=$(python3 -c "print(round($i*($d-$fade),3))"); filt="$filt[$prev][$i:v]xfade=transition=fade:duration=$fade:offset=$off[v$i];"; prev="v$i"; done
ffmpeg -y -loglevel error $inputs -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
  -filter_complex "${filt}[$prev]format=yuv420p[out]" -map "[out]" -map $n:a -shortest \
  -r 30 -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 64k -movflags +faststart "$out"
