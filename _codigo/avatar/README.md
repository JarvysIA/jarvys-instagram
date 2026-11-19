# Avatar do Fernando (desenho 3D) para os vídeos do Jarvys

Fernando, 18/11/2026, 22h49, ao mandar um vídeo feito em outro chat com o avatar dele: "Gostei muito! Acho que pode usar esse avatar em vários outros vídeos do Jarvys (só o avatar sem o fundo!)".

- O vídeo de origem é de outro projeto (a loja). Daqui só sai o personagem: **sem o fundo da loja e sem a marca na camisa**. O vídeo de origem não fica neste repositório.
- `fernando-avatar-recorte.png`: o avatar recortado (fundo transparente, 1080x1360), tirado do quadro de 0,10 s do vídeo, com a marca da camisa coberta pelo tecido do outro lado do peito. É a referência do personagem: **usar sempre este recorte, não pedir para a IA redesenhar o rosto** (o teste de redesenho deixou o rosto mais fino e o corpo mais magro).
- `fernando-avatar-base.jpg`: o recorte sobre azul liso (1080x1920).
- `fundo-garagem.png`: fundo gerado (garagem vazia em desenho 3D, tons de azul, carro sem marca; gpt-image-2.5-sunburst, 190 créditos, geração gNMKffj1IhljgQh7NgNg).
- `fernando-avatar-jarvys.png` (1080x1920) e `fernando-avatar-jarvys-720.png` (720x1280): o recorte montado sobre a garagem, com degradê escuro embaixo. **É o quadro inicial para gerar cenas** (Veo 3.1 Lite com `start_frame`, como no B02, ou sincronia labial a partir de imagem e áudio).
- Flow na ElevenLabs: 8pZk9VnmwiDRh0RO0sjR (recorte no nó 1lErRDngM43f39DUQyeY; fundo no nó LoZ56GIkvvPm6fcOysau). O nó cXNi81VpZJFxOXAewhvO foi o teste de redesenho (433 créditos), descartado.
- Como recortar outro quadro: `rembg` com o modelo `isnet-general-use` (instala com pip; baixa o modelo do GitHub).
- Regras: só em peça do Jarvys; rótulo de IA (isAiGenerated) e "feito com IA" na legenda; o primeiro vídeo com o avatar é mostrado ao Fernando antes de publicar; a voz do avatar precisa do ok dele (ver `claude/avatar-fernando.md` no projeto).

## Voz do Fernando e sincronia da boca (18/11/2026, 23h44)

Ele gravou o lote de voz 1 (IMG_2591, 2 min 30 s; texto em `claude/roteiros-gravacao.md`). Medido: ruído de fundo perto de -66 dB, fala em -26 dB, pico -9,8 dB, sem estouro, volume constante. Está boa.

- `voz/f01-...mp3` a `voz/f10-...mp3`: as 10 frases, uma por arquivo, já limpas (passa-alta 80 Hz, redução leve de ruído, -16 LUFS). A fala 11 (por que ele criou o Jarvys, 71 s) e a amostra inteira para salvar a voz **não ficam neste repositório, que é público**: a gravação original está com o Fernando.
- Cortes na gravação original (s): f01 1,24 a 6,22; f02 8,02 a 12,26; f03 18,30 a 22,90 (a primeira tentativa, em 13,96, saiu errada); f04 25,00 a 30,16; f05 31,86 a 36,24; f06 38,26 a 42,28; f07 44,00 a 48,28; f08 50,08 a 57,14; f09 58,98 a 61,96; f10 68,98 a 73,20 (a tentativa de 63,86 saiu errada); f11 78,48 a 149,06.
- **Teste 01 (`clipes/f09-instale-agora.mp4`, 3,5 s):** HeyGen Avatar 4 (`talking_style: expressive`, 9:16, 1080p) com `fernando-avatar-jarvys-720.png` + `voz/f09-instale-agora.mp3`: 2.424 créditos (áudio abaixo de 4,0 s). Funcionou no desenho: rosto igual, boca, sobrancelha e piscada acompanham a fala, fundo parado, saída em 1080x1920 a 25 fps.
- Montagem do teste: `_codigo/motion3d/fav01.html` (logo no topo, placa "Instale agora" ACIMA da cabeça, legenda no peito, fecho) e `audio_fav01.py`; resultado em `clipes/teste-avatar-voz-01.mp4`.
- **Dois defeitos do quadro inicial que aparecem no clipe e precisam ser corrigidos antes dos vídeos de verdade:** (1) as mãos sobem escuras, parecendo luva, porque os braços do recorte vêm escurecidos pelo degradê do vídeo de origem; (2) o remendo no peito, onde ficava a marca, aparece como um retângulo mais escuro. Ideia: refazer só a parte de baixo do corpo com a IA (braços e mãos iluminados) mantendo a cabeça do recorte original, e pôr a logo do Jarvys bordada no lugar do remendo.
- Nesse enquadramento a cabeça fica entre 700 e 1.000 px de altura: nada de placa entre 650 e 1.100 px, senão tampa a boca.

## F01, primeiro reel com o avatar (19/11/2026)

Formato barato, escolhido pelo Fernando: o avatar fala só o gancho e o fecho; o meio são cartões em 3D com a voz dele por cima.

- Gancho: `clipes/f04a-gancho.mp4` (HeyGen Avatar 4, `voz/f04a-quanto-custou-gancho.mp3`, 2,9 s, 1.818 créditos; geração xE2Cb1VRgnEAY4AvhcJ5). Neste clipe as mãos saíram com a cor certa.
- Fecho: `clipes/f09-instale-agora.mp4` (o do teste 01; reaproveitar em todo vídeo).
- Vídeo base (`clipes/f01-base.mp4`, fora do git): gancho 0 a 2,85 s + `fundo-garagem-desfocado.jpg` com zoom lento por 10,25 s + fecho 3,5 s, emendados no ffmpeg (`concat`), crf 12.
- Textos: `../motion3d/fav02.html` (`ALPHA=1 node cap3d.mjs "fav02.html?alpha=1" ovg 19.4`). Som: `python3 audio_fav02.py audg`; voz = som do gancho + fala 4b em 2,95 s + fala 8 em 5,75 s + som do fecho em 13,1 s (`adelay` + `amix`); `trilha-02.mp3 -ss 2 -t 19.4`.
- Final: `2026-11/dia-27/reel-avatar-f01.mp4` (19,4 s, -14,3 LUFS).
- Voz clonada dele na ElevenLabs: "Fernando" (07OrNOE5HHvotITtTPgi). A "Fernando Star" é do chat da loja.

### F01 v2 (19/11, 0h20): voz clonada, mais animada

O Fernando aprovou o vídeo e pediu outra voz: "mais animado, mais potente, menos eco", no ritmo da voz clonada. Daqui em diante é o padrão.

- Narração única: `voz/f01-narracao-voz-clonada.mp3` (voz "Fernando", 07OrNOE5HHvotITtTPgi, eleven_v4, texto começando com `[excited]`, 17,1 s, 276 créditos). A etiqueta não foi lida em voz alta.
- Trechos (s): gancho 0,02 a 2,52; "No Jarvys, cada gasto fica anotado!" 2,71 a 5,27; "O Jarvys guarda o histórico das revisões," 5,57 a 7,73; "avisa quando a próxima está chegando" 7,90 a 9,80; "e mostra" 9,95 a 10,52; "quanto o seu carro vale na Fipe," 10,66 a 12,26; "todo mês!" 12,42 a 13,09; "Instale agora mesmo!" 13,40 a 14,59; "O app é cem por cento grátis!" 14,81 a 16,93.
- Sincronia: `clipes/f01v2-gancho.mp4` (áudio 0 a 2,62 s; 1.818) e `clipes/f01v2-fecho.mp4` (áudio 13,30 a 17,05 s; 2.424). O vídeo segue a narração inteira, sem emenda no som: gancho até 2,62 s, fundo desfocado até 13,30 s, fecho até 17,05 s.
- Final: `2026-11/dia-27/reel-avatar-f01-v2.mp4` (19,9 s, -14,4 LUFS).
