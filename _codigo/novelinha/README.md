# Novelinha 3D "O Mecânico Espertinho" (formato C do teste de formatos)

Fernando, 17/11/2026: "a dor de ser enganado é ótima" e "ok, pode fazer". História em 3 partes (roteiro em `claude/teste-de-formatos.md`). Personagens originais: o Mecânico Espertinho (boné amarelo de lado, macacão cinza), a Dona Ana (blusa lilás, óculos redondos), o Dr. Jarvys só como voz (Jhony Tygas) saindo do celular.

## Parte 1 (17/11/2026, 35 s, sai em 23/11 19h30)

- `p1/quadro0.png`: quadro inicial (gpt-image-2.5-sunburst, 9:16, 190 créditos). É a referência dos personagens e do cenário: usar nas próximas partes.
- `p1/cena1.mp4` a `cena4.mp4`: 4 clipes de 8 s no Veo 3.1 Lite (720p, 9:16, com áudio; 2.424 créditos cada; em 1080p seriam 3.878). Cada cena começa do ÚLTIMO QUADRO da anterior (`fim1.png`, `fim2.png`, `fim3.png`), anexado no flow por link do repositório: é isso que mantém os personagens iguais sem gerar imagem nova.
- Falas (conferidas por transcrição, todas saíram certas): "Dona Ana, vai ter que trocar tudo isso aqui." / "Tudo isso?!"; "Rebimboca da parafuseta... tudo original, viu?"; "Deixa eu perguntar pro Dr. Jarvys."; "É... dá pra fazer só o óleo também."
- No prompt: descrever a ação, escrever a fala entre aspas com "says in Brazilian Portuguese, with a natural Brazilian accent", dizer quem NÃO fala, e fechar com "No subtitles, no captions, no on-screen text, no music." Para o nome, escrever "Doutor Járvis" no prompt.
- `p1/dr-jarvys.mp3`: resposta do Dr. Jarvys (eleven_v4, 63 créditos), entra em 18,9 s com filtro de voz de celular; o áudio da cena 3 abaixa nesse trecho.
- `p1/novela.html`: mostra os quadros das cenas (`fr/cf0001.jpg` a `cf0960.jpg`, 30 fps, 1080x1920) e põe por cima a faixa da série, o gancho, a legenda palavra por palavra, os avisos de IA e o fecho. Usa o kit de `_codigo/motion3d/`.
- Montagem: `for n in 1 2 3 4; do ffmpeg -i cena$n.mp4 -t 8 -vf "fps=30,scale=1080:1920:flags=lanczos" -q:v 2 -start_number $(( (n-1)*240 + 1 )) fr/cf%04d.jpg; done`; em `_codigo/motion3d/`: `node cap3d.mjs ../novelinha/p1/novela.html frn 35`; áudio: diálogo das 4 cenas + voz do Dr. Jarvys em `aud/voz.wav`, `trilha-01.mp3` baixa em `aud/music.wav`, `python3 audio_novela.py aud`; `AUD=../novelinha/p1/aud ../motion/mix2.sh frn saida.mp4 ../novelinha/p1/aud/voz.wav`; recomprimir com `-crf 23` (o arquivo sai grande). Final -14,5 LUFS.
- Transcrição de áudio de clipe (não gerado como fala na ElevenLabs): 5,5 créditos por segundo (44 por cena de 8 s). Extrair o mp3, subir no repositório e anexar por link.
- Total da parte 1: 10.125 créditos (imagem 190, 4 cenas 9.696, voz 63, transcrições 176).
- No Buffer: `isAiGenerated: true` e "Cenas ilustrativas, feitas com IA." na legenda.

## Correção de 17/11 (retorno do Fernando: "antes do mecânico falar, ele fala tipo embolado")

Na cena 4 o Veo pôs uns 3 s de resmungo sem palavras antes da fala. A transcrição mostrou só "Hum. É.", mas o volume do trecho era de fala. Corrigido sem gastar crédito: `cena4-limpa.wav` troca os primeiros 3,45 s do som da cena pelo ruído de fundo da própria cena (trecho de 5,75 a 7,15 s, repetido) e a legenda "É..." saiu. Versão publicada: `2026-11/dia-23/reel-novela-p1-v2.mp4`.

Para as próximas partes:
- Depois de gerar cada cena, medir o volume de 0,2 em 0,2 s e comparar com os tempos das palavras da transcrição. Som em volume de fala (acima de uns -30 dB) fora das palavras transcritas é resmungo: trocar pelo ruído de fundo.
- No prompt, dizer que o personagem fica em silêncio total antes e depois da fala ("completely silent, mouth closed, until he says the line"), e pôr a fala logo no começo da cena.
- Se uma fala inteira sair embolada, trocar por voz da ElevenLabs com sincronia labial (cerca de 425 a 506 créditos por segundo) em vez de gerar a cena de novo (2.424).
