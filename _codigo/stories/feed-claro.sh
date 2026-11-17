#!/bin/bash
# Monta e fotografa post/carrossel de feed no TEMA CLARO.
# uso (dentro de _codigo/stories, com as fontes .woff e o icon.png na pasta):
#   ./feed-claro.sh dia-17 c17-1 c17-2 ...     -> gera c17-1.png, c17-2.png ...
# Depois: ffmpeg -i c17-1.png -q:v 2 ../../2026-11/dia-17/carrossel-claro-1.jpg
# Stories (.st) nao mudam: continuam no tema escuro, pela montagem normal.
b=$1; shift
{ cat head.html; awk '/<style>/{f=1} f{print} /<\/style>/{exit}' dia-25a26.body.html; cat "$b.body.html"; cat claro.html; } > "$b.claro.html"
node shot.mjs "$b.claro.html" "$@"
rm -f "$b.claro.html"
