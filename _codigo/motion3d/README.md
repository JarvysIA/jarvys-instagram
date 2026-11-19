# Reels em 3D de blocos (formato A do teste de formatos)

Referência: @guiadamecanica (ver `claude/referencia-guia-da-mecanica-3d.md` no Projeto). Série "O que acontece se...": a peça por dentro, em blocos, com o gancho "Se você [faz X], [consequência]". Custo: só a narração (uns 350 a 400 créditos).

## Arquivos

- `kit3d.js` e `kit3d.css`: o kit. Tudo é função do tempo (nada de animação CSS nem relógio): a cena define `window.setT(t)` e a captura chama quadro a quadro.
- `cap3d.mjs`: captura a 30 fps no Chromium com WebGL por software. `node cap3d.mjs cena.html fr 29` (tudo), `node cap3d.mjs cena.html fr 29 0 290` (do quadro 0 ao 289; rodar 3 faixas em paralelo leva 1 minuto) ou `node cap3d.mjs cena.html frt 29 0,60,120` (quadros soltos para conferir).
- `a01.html` + `audio_a01.py`: primeiro reel, "O que acontece se você completar o radiador só com água?" (17/11/2026). Copiar e trocar a cena para fazer o próximo.
- `teste01.html` e `shot3d.mjs`: primeiro teste (16/11), só histórico.

## Preparar a pasta (uma vez por sessão)

```
cd _codigo/motion3d && npm i three@0.160.0
cp /caminho/do/@fontsource/inter/files/inter-latin-800-normal.woff .   # mesma fonte do motion
cp ../stories/icon.png icon-512.png
```
`node_modules`, quadros (`fr*/`), áudio temporário (`aud*/`) e MP4 não vão para o repositório (`.gitignore`).

## O que o kit tem

- `K.box`, `K.cyl`, `K.grp`, `K.M(cor, opções)`: blocos com `flatShading`. `K.ground(x, z)`: chão de uma zona.
- `K.carro()`: carro de blocos (frente em +x), `car.hood(k)` abre o capô (1) ou fecha (0; some o reservatório).
- `K.pessoa(pai, {camisa, calca, bone})`: boneco que olha para +z; braços com pivô no ombro (`p.bd`, `p.be`; `rotation.x` negativo levanta para a frente), cabeça `p.cab`.
- `K.galao(pai, cor)`: galão com tampa e rótulo.
- `K.circuito()`: sistema de arrefecimento em corte (radiador, mangueiras, bomba d'água com rotor, bloco com pistões, galerias). Métodos: `fluxo(fase, giro, pistao)`, `cor(k)` (0 aditivo rosa, 1 só água azul, 2 água com ferrugem), `ferrugem(galerias, bomba, radiador)` de 0 a 1, `calor(k)`, `vapor(t, k)`.
- Câmera: `K.camKeys([{t, p:[x,y,z], l:[x,y,z], e:'lin'}])` e `K.camAt(t, tremor)`. Dois pontos no mesmo `t` = corte seco. Cada cena fica numa "zona" longe da outra (x = 200, x = -200, z = 200) e `K.zone(x, z)` leva a luz e a sombra junto.
- Textos por cima em HTML: qualquer `.ov` com `data-a` (entra), `data-b` (sai) e `data-fx` (`pop`, `up`, `stamp`, `fade`); `K.ui(t)` cuida. Classes: `.tt` (título com contorno), `.chip` (`.ok`, `.bad`, `.rust`, `.y`, `.s`), `.stamp`, `.btn`, `.url`, `.sub`, `.row` (linha centralizada).
- Rótulo preso num ponto 3D: `K.pin(el, x, y, z, dx, dy)`; `K.wp(objeto)` dá a posição no mundo.
- Legenda palavra por palavra: `K.setCaps(palavras, inícios, fim)` e `K.caps(t)`. Os inícios vêm da transcrição da narração (0 crédito) somados ao atraso da voz (`VO`).
- `K.fundo(css)`: céu (claro na rua, azul escuro no "raio-x" da peça).

## Passo a passo de um reel novo

1. Tema provado (ver `claude/teste-de-formatos.md`), fato conferido na web com fonte anotada no diário. Nada de banguela.
2. Roteiro de 60 a 70 palavras: gancho "Se você [faz X], [consequência]", o que a peça faz, o que dá errado, o certo, "Manda pra quem...", pergunta + "Comenta aí".
3. Narração (Jhony Tygas, eleven_v4, estimate_only antes, 1 take), baixar para `../motion/audio/reel3d-aNN-voz.mp3`, transcrever (0 crédito) e colar os inícios das palavras no `W0` da cena.
4. Cena: copiar `a01.html`, trocar textos, objetos e pontos da câmera. Regra de enquadramento (1080x1920): título de 215 a 600 px, assunto de 650 a 1350 px, legenda em 1395 px, nada importante abaixo de 1500 px. O primeiro quadro já tem título e cena (vira capa).
5. Conferir com quadros soltos (`frt/`), depois capturar tudo.
6. Áudio: `python3 audio_aNN.py aud` (efeitos sincronizados com os mesmos tempos), trilha já paga em `aud/music.wav` (`ffmpeg -ss 4.2 -t 29 -i ../motion/audio/trilha-01.mp3 -af "afade=t=in:d=0.5,afade=t=out:st=26.5:d=2.5" -ar 44100 -ac 2 aud/music.wav`), voz em `aud/voz.wav` (`-af "adelay=400:all=1,loudnorm=I=-16:TP=-1.5"`).
7. Mix: `AUD=aud ../motion/mix2.sh fr saida.mp4 aud/voz.wav` (sai em torno de -14 LUFS). Conferir quadros do MP4.
8. Fecho sempre: "Dúvida do carro? Pergunta pro Dr. Jarvys.", botão "App 100% grátis", jarvys.com.br.

## A01 "O que acontece se você completar o radiador só com água?" (17/11/2026, sai em 18/11 19h30)

- Fontes conferidas em 17/11: Localiza Seminovos, "Água desmineralizada ou aditivo para radiador?" (o aditivo eleva o ponto de ebulição, previne corrosão e lubrifica a bomba d'água; só água, mesmo desmineralizada, não protege; mistura de 40% a 50% de aditivo, conforme o fabricante); AutoPapo, "Aditivo para radiador: por que você deve usar?" e "Coloquei aditivo de radiador e vazamentos apareceram" (falta de aditivo: superaquecimento, corrosão, cavitação da bomba; diluição normalmente 50/50, seguir o manual); 99, "Líquido de arrefecimento do motor" (água em contato com o metal gera ferrugem e corrosão); Tupi FM (resíduos entopem as galerias do radiador).
- Narração: `../motion/audio/reel3d-a01-voz.mp3` (1 take, 25,0 s, 71 palavras, 384 créditos; flow Q6CINOaFQzHMewjyUTSx, nó tXMjbWgzLY10bGKwRrKJ, geração JwXi1abbIlLKFJBV4RRU), VO 0,4 s. Transcrição 0 crédito.
- Cenas: rua (motorista completando com água da torneira, título), "raio-x" do circuito com ferrugem, líquido certo rosa com 3 funções do aditivo, só água (azul, ferrugem, radiador entupindo, motor vermelho e vapor, carimbo FERVEU!), bancada (aditivo + água desmineralizada no medidor, manual), torneira (manda pra quem completa na torneira; e o seu, tá com o quê?), fecho com o Dr. Jarvys de blocos.
- Trilha: `trilha-01.mp3 -ss 4.2 -t 29`. Vídeo de 29 s, final -14,3 LUFS. Mídia `2026-11/dia-18/reel3d.mp4`, capa em 1 s.

## B01 "Comprou seminovo? Troque isso primeiro" (piloto do formato B, híbrido; 17/11/2026, sai em 21/11 19h30)

Formato B = apresentador com rosto feito por IA (o Dr. Jarvys em pessoa, personagem original). Este piloto é HÍBRIDO porque o reel inteiro com fala sincronizada não cabe em 5.000 créditos (ver `claude/teste-de-formatos.md`): o apresentador fala só o gancho (4 s) e o resto é a mesma voz por cima das peças em 3D.

- Personagem: `b01/dr-jarvys.png` (gpt-image-2.5-sunburst, 9:16, 190 créditos; flow JM5RaHHourYMBEHndY2d, nó DfTSf9yMMKVTYspz43uA, geração ja5H4ufpkqpYpZ7KoCvT). Usar SEMPRE esta mesma imagem como rosto do Dr. Jarvys.
- Narração inteira: `../motion/audio/reel-b01-voz.mp3` (Jhony Tygas, eleven_v4, 1 take, 19,9 s, 61 palavras, 329 créditos; nó T9QJH4KgEieant8VkMAu, geração RNFwQ2AUw0bfBEse75l7). Transcrição 0.
- Gancho falado: `../motion/audio/reel-b01-gancho.mp3` (os primeiros 3,72 s da narração + 0,2 s de silêncio; manter ABAIXO de 4,0 s, porque o HeyGen cobra por segundo cheio). Subir no repositório, anexar no flow por link (`creative_attach_reference_file`) e ligar imagem + áudio num nó `heygen-avatar4` (`talking_style: expressive`, `aspect_ratio: 9:16`): 2.424 créditos por 4 s (606 por segundo). Clipe em `b01/clip.mp4` (25 fps; geração zjeODjhvyz8nZzrbenh2).
- Quadros do clipe para a cena: `ffmpeg -i b01/clip.mp4 -vf "fps=30,scale=1080:1920" -q:v 2 b01/cf%04d.jpg` (120 quadros; não vão para o repositório). A cena `b01.html` mostra o quadro certo em cada instante (`setT` é assíncrona e espera a imagem carregar).
- Cena: gancho com o apresentador e título embaixo do rosto; 4 peças num pedestal girando (óleo e filtro de óleo, filtro de ar e de combustível, fluido de freio, correia dentada); "manda pra quem acabou de comprar carro"; fecho com a foto do personagem em círculo e o aviso "personagem ilustrativo, feito com IA".
- `node cap3d.mjs b01.html frb 23.3`, `python3 audio_b01.py audb`, trilha `trilha-02.mp3 -ss 1 -t 23.3`, voz com `adelay=150`. Vídeo de 23,3 s, final -14,4 LUFS. Mídia `2026-11/dia-21/reel-b01.mp4`, capa em 0,5 s.
- No Buffer: `isAiGenerated: true` e "cena ilustrativa, feita com IA" na legenda.
- Fontes do conteúdo: as mesmas do carrossel "Comprou seminovo? O que trocar primeiro" de 01/12 (diário de 17/11).

## Vídeo gravado (celular) com textos por cima

Exemplo: `fernando-01.html`. Gravação de iPhone vem em HDR (HLG, 10 bits); sem converter a cor o vídeo sai esbranquiçado. Regra:

1. `ffprobe` na fonte. Se `color_transfer` for `arib-std-b67` ou `smpte2084`, usar o filtro de cor (tone mapping hable, npl 100) descrito em `2026-11/anuncios/README.md`.
2. Vídeo base direto da fonte, uma passada, crf 10 (`fer01/base.mp4`, fora do git).
3. Textos em PNG transparente: `ALPHA=1 node cap3d.mjs "cena.html?alpha=1" pasta segundos`. A cena precisa tratar `?alpha=1` (esconder o vídeo e deixar o fundo transparente).
4. Juntar no ffmpeg com `overlay`, uma compressão só (crf 17). Nunca passar o vídeo gravado pela captura de tela do Chromium: perde nitidez e cor.

## Logo do Jarvys grande (regra do Fernando, 18/11/2026)

"A logo está muito miúda na tela, nos próximos vamos dar mais valor a ela."

- Fecho de toda cena nova: `<div class="ov end g" ...><img src="icon-512.png"></div>` (320 px; a classe `g` está no `kit3d.css`). O padrão antigo de 190 px fica só nas cenas já publicadas. Ao copiar `a01.html` ou `uso-real-01.html`, pôr o `g` e descer o texto, o botão e o endereço uns 130 px.
- No meio do vídeo, quando o Jarvys é citado: logo com 260 px ou mais (`.ic img` em `fernando-01.html`).
- `fernando-01.html` já está com a logo grande. Os arquivos v2 publicados em 18/11 (anúncio e reel do Fernando) foram feitos antes, com 150 e 190 px.

## B02 "Quanto seu carro te custou esse ano?" (18/11/2026, sai em 22/11 às 11h45, dia e hora pedidos pelo Fernando; serve também de anúncio)

Pedido do Fernando a partir de um vídeo de referência (apresentador de IA com títulos e placas "meio 3D"): o Dr. Jarvys em pessoa falando 3 vantagens do app. Aqui o apresentador fica na tela o tempo todo.

- Fala (conferida por transcrição): "Você sabe quanto seu carro te custou esse ano? No Jarvys, cada gasto fica anotado. O histórico das revisões fica guardado e valoriza na venda. E todo mês você vê quanto ele vale na Fipe."
- Vídeo: 2 cenas de 8 s no Veo 3.1 Lite (720p, 9:16, com áudio, 2.424 créditos cada), no flow do formato B (JM5RaHHourYMBEHndY2d). Cena 1 (nó QIt8vqlzPCbXSAi147Oa) começa de `b01/dr-jarvys.png`; cena 2 (nó blAO3oEmHCLGesYWBTvQ) começa do último quadro da cena 1 (`b02/fim1.png`, anexado por link do repositório). A voz saiu igual nas duas. Total 4.848 créditos; transcrição feita aqui, 0 crédito.
- Prompt: "Photorealistic vertical commercial video, continuing from the first frame", a ação e os gestos (contar nos dedos, joinha), a fala entre aspas com "says in Brazilian Portuguese, with a natural Brazilian accent, a deep warm confident voice ... starting immediately", "Locked-off static camera", "Only he speaks", "No subtitles, no captions, no on-screen text, no logos, no graphics, no music". "Járvis" no prompt. Até 20 palavras por cena de 8 s.
- Cuidado com a transcrição local: o whisper small repetiu "No Jarvis" duas vezes no áudio inteiro. Transcrevendo cada trecho de fala separado (achado pelo volume), a repetição sumiu: era erro do transcritor, não da cena. Conferir sempre por trechos antes de mexer.
- Cena 1 usada até 7,0 s (depois da fala tem um som solto, cortado); cena 2 inteira. Vídeo base: `b02/base.mp4` (as duas cenas emendadas, 30 fps, 1080x1920 lanczos, crf 12; fora do git).
- Textos: `b02.html` (título do gancho em 3D cromado, logo de 270 px no topo desde "No Jarvys", 3 placas em 3D com faíscas, legenda palavra por palavra, fecho com logo de 320 px). Só os textos: `ALPHA=1 node cap3d.mjs "b02.html?alpha=1" ovb 18.4`. Som: `python3 audio_b02.py audb2`, voz das cenas em `audb2/voz.wav`, `trilha-01.mp3 -ss 3 -t 18.4`. Junta tudo num ffmpeg só (overlay + mistura do `mix2.sh`), crf 18. Final 18,4 s, -14,5 LUFS.
- Mídia: `2026-11/dia-29/reel-b02.mp4` (a pasta ficou dia-29 porque a primeira data era 29/11; o arquivo não muda de lugar porque o rascunho do Buffer aponta para ele). No Buffer: `isAiGenerated: true` e "Personagem ilustrativo, feito com IA." na legenda.
- Fonte da frase "valoriza na venda": InstaCarro ("Histórico de revisões valoriza carro usado e acelera a venda"), iCarros e AutoPapo, consultados em 18/11/2026.

### B02 v2 (18/11, 22h40): fecho falado pelo personagem

Retorno do Fernando: "Ficou muito bom. O personagem poderia fechar falando: instale agora mesmo, é 100% grátis." Vale a v2: `2026-11/dia-29/reel-b02-v2.mp4` (21,5 s, -14,4 LUFS). A v1 (`reel-b02.mp4`) fica no repositório, sem uso.

- Cena 3 (nó ViDgSC0qnrqPw1phDmTm, geração oz6NRYH47VTjnTB3PJvN): Veo 3.1 Lite com `duration_secs: 4` custa 1.212 (metade da de 8 s). Começa do último quadro da cena 2 (`b02/fim2.png`). Fala conferida: "Instale agora mesmo. O app é 100% grátis." (no prompt: "cem por cento"; o "grátis" fica ligado à palavra "app", pela regra da chamada). Usada até 3,5 s.
- Na cena: placa 4 "INSTALE AGORA / o app é 100% grátis" com a logo, de 15,05 a 18,5 s; fecho escrito de 18,5 a 21,5 s. Captura dos textos: `ALPHA=1 node cap3d.mjs "b02.html?alpha=1" ovb 21.5`.
- A cada cena gerada a partir do último quadro da anterior o rosto muda um pouco. Três cenas em sequência ainda passa; para vídeos mais longos, partir sempre de `b01/dr-jarvys.png` e emendar com corte seco.
- Total do B02: 6.060 créditos (2.424 + 2.424 + 1.212).
