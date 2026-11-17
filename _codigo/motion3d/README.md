# Reels em 3D de blocos (low-poly)

Teste de 16/11/2026, a partir da referência @guiadamecanica (ver `claude/referencia-guia-da-mecanica-3d.md` no Projeto).

- three.js 0.160 no mesmo Chromium do motion (WebGL por software): `npm i three@0.160.0` nesta pasta (node_modules não vai para o repositório) e copiar `inter-latin-800-normal.woff`.
- `node shot3d.mjs` tira um quadro de `test.html` (renomear o arquivo ou ajustar o caminho). Cada quadro leva menos de 0,1 s.
- `teste01.html`: cena de teste (carro, mecânico, galão, título por cima em HTML). Funções `box()` e `cyl()` montam tudo com blocos; `flatShading` dá o visual.
- Falta: linha do tempo (objeto T como no motion), câmera animada, peças em corte (motor, radiador, tanque), captura quadro a quadro.
