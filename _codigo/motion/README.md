# Reel animado (teste de 14/10/2026)

Estilo motion graphics (referência: vídeo da Whaticket mandado pelo Luiz). Cena em HTML/CSS, quadros capturados com Playwright e montados com ffmpeg.

- Fontes (.woff do @fontsource) e `icon-512.png` ficam na mesma pasta do HTML.
- Captura: `node cap.mjs teste.html fr 14` (30 fps, congela as animações CSS quadro a quadro).
- Vídeo: `ffmpeg -framerate 30 -i fr/f%04d.jpg` + trilha muda, H.264, 1080x1920.

Retorno do Luiz (14/10): ficou muito bom, mas rápido demais. Na próxima versão, mais lento: cada cena com pelo menos 4 a 5 s e legenda parada tempo suficiente para ler. Som (voz do Luiz ou ElevenLabs) ainda em aberto.

## Reel 01 "tudo numa conversa" (16/10/2026)
- `reel01.html`: cenas animadas; a linha do tempo fica no objeto `T` (cenas, legendas, mensagens). Para casar com a narração, ajuste só o `T`.
- `node dumpT.mjs reel01.html timeline.json` e `python3 audio.py timeline.json aud`: trilha original e efeitos sincronizados (sintetizados, sem direitos de terceiros).
- `node cap2.mjs reel01.html fr 31`: quadros (chama `window.setT` para as legendas palavra por palavra).
- `./mix.sh fr saida.mp4 [voz.wav]`: com voz, a trilha abaixa sozinha quando ele fala (sidechain) e o áudio sai em -14 LUFS.
- Narração planejada (ElevenLabs, voz Jhony Tygas, id FhdOWgf0bSw3HKWefhlq, modelo eleven_v4). Travou em 16/10: plano grátis bloqueado e sem créditos.
- 16/10: versão final com voz (take 1, `audio/reel01-voz.mp3`, entra com 0,15 s de atraso) e trilha da ElevenLabs (`audio/trilha-01.mp3`, cortada em 33 s com fade). Tempo de cada palavra em `audio/reel01-palavras.json` (legendas e cenas casadas com a fala). Mix: voz em -16 LUFS, trilha uns 11 dB abaixo enquanto ele fala (sidechain), final em -14,8 LUFS.

## Reel 02 "Sem filtro" Fiat Uno (20/10/2026, sai em 25/10 19h30)
- `reel02.html`: print real do Uno (`prova-uno.jpg`, copiar de `_codigo/stories/`) recortado em cenas (função `crop`), contador de km 127.000 → 129.421, legenda palavra por palavra. `icon-512.png` = cópia de `_codigo/stories/icon.png`.
- Narração: `audio/reel02-voz.mp3` (Jhony Tygas, eleven_v4, 1 take, 297 créditos), entra com 0,4 s de atraso (VO no HTML). Tempo das palavras já está no `W0` do HTML.
- Efeitos: `python3 audio2.py aud2`. Trilha: `trilha-01.mp3` cortada em 24,5 s com fade. Voz: `adelay=400,loudnorm -16`.
- Quadros: `node cap2.mjs reel02.html fr 24.5`. Mix: `AUD=aud2 ./mix2.sh fr saida.mp4 aud2/voz.wav` (final -14,2 LUFS).

## Reel 03 "Você esquece, eu lembro" (21/10/2026, sai em 27/10 19h30)
- `reel03.html`: personagem original em SVG (o motorista que esquece tudo, função `guy(happy)`), interrogações e folhas de calendário no gancho, nota de serviço ilustrativa com scanner, contador de km 47.900 → 48.320, barra até a revisão, pedido da nota com documento de volta, troca de expressão do personagem no "eu lembro". `icon-512.png` = cópia de `_codigo/stories/icon.png`.
- Narração: `audio/reel03-voz.mp3` (Jhony Tygas, eleven_v4, 1 take, 18,3 s, 274 créditos; flow tObS1pmiWZvdM245l3cz), entra com 0,5 s de atraso. Tempo das palavras no `W0`.
- Efeitos: `python3 audio3.py aud3`. Trilha: `trilha-01.mp3` a partir de 5 s (`-ss 5 -t 23`, fade in 0,6 s e out 2,5 s) para não soar igual ao reel 02. Voz: `adelay=500,loudnorm -16`.
- Quadros: `node cap2.mjs reel03.html fr 23` (2 min). Mix: `AUD=aud3 ./mix2.sh fr saida.mp4 aud3/voz.wav` (final -13,9 LUFS).
- Trilha nova em 21/10 custaria 1.650 créditos (eleven_music v1 e v2), acima do que resta da reserva de trilhas (900): não gerada.

## Reel 04 "Acendeu uma luz no painel?" (22/10/2026, sai em 28/10 19h30)
- `reel04.html`: painel original em SVG (função `dash`, conta-giros e velocímetro, luz do óleo piscando), visor de câmera com flash, chat do Dr. Jarvys com a foto do painel, 3 cartões de luzes (ícones `oil`, `eng`, `temp`, `batt` desenhados em SVG), perguntas e selo DR. JARVYS.
- Narração: `audio/reel04-voz.mp3` (1 take, 18,5 s, 289 créditos; flow NHa8r9WknL46lAd67yT2), VO 0,5 s. Efeitos: `python3 audio4.py aud4` (bipe de alerta e clique de câmera). Trilha: `trilha-01.mp3 -ss 10 -t 23.5`.
- Quadros: `node cap2.mjs reel04.html fr 23.5`. Mix: `AUD=aud4 ./mix2.sh fr saida.mp4 aud4/voz.wav` (final -14,5 LUFS).

## Reel 05 "grátis para sempre" (22/10/2026, sai em 29/10 19h30)
- `reel05.html`: etiqueta R$ 0 balançando, carimbo DÁ SIM, placa sendo digitada (`setT` controla o texto), cartão do carro, 4 cartões do app marcados grátis, WhatsApp com a km, carimbo R$ 0 e botão Crie sua conta grátis.
- Narração: `audio/reel05-voz.mp3` (1 take, 18,6 s, 285 créditos; flow n6fQraMV9s1l3Y71klxM), VO 0,5 s. Efeitos: `python3 audio5.py aud5`. Trilha: `trilha-01.mp3 -ss 2 -t 23.5`.
- Mix: `AUD=aud5 ./mix2.sh fr5 saida.mp4 aud5/voz.wav` (final -14,4 LUFS).
- Nota: para o CSS completo, copie todo o bloco <style> do reel03.html (inclui .bub, .saved, swing, slideUp2); só a parte de cima não basta.

## Reel 06 "Tá caro?" mecânico espertinho (23/10/2026, sai em 30/10 19h30)
- `reel06.html`: personagem original em SVG (função `mec('smug'|'surpreso')`: boné amarelo de lado, macacão cinza, lápis na orelha, sem bigode), orçamento ilustrativo desenrolando (`unroll`), carimbo SERÁ?, chat "quanto custa a revisão?", cartão de estimativa (valores de exemplo) com barras dos itens que mais pesam, checklist da próxima revisão com selo "peças", mecânico surpreso suando no fecho.
- Narração: `audio/reel06-voz.mp3` (1 take, 18,8 s, 304 créditos; flow tkEa9BBDo56qsZuVpjP7), VO 0,5 s. Efeitos: `python3 audio6.py aud6`. Trilha: `trilha-01.mp3 -ss 7 -t 23.5`.
- Quadros: `node cap2.mjs reel06.html fr6 23.5`. Mix: `AUD=aud6 ./mix2.sh fr6 saida.mp4 aud6/voz.wav` (final -14,2 LUFS).

## Reel 07 "Vai vender o carro?" (23/10/2026, sai em 01/11 19h30)
- `reel07.html`: carro grande em SVG com placa VENDE-SE, pergunta do comprador, linha do tempo (`.tlx`, troca, nota, km), Certificado Jarvys (`.certx`), selos verdes, nota pelo WhatsApp e fecho com o ícone.
- Narração: `audio/reel07-voz.mp3` (1 take, 21,5 s, 345 créditos; flow nPJIokPOP8rnTudolpBx), VO 0,5 s. Vídeo de 26 s. Efeitos: `python3 audio7.py aud7`. Trilha: `trilha-01.mp3 -ss 9 -t 26`.
- Mix: `AUD=aud7 ./mix2.sh fr7 saida.mp4 aud7/voz.wav` (final -14,0 LUFS).
- Chromium: `cap2.mjs` e `shot.mjs` usam `$CHROME`, ou o caminho antigo se existir, ou `/opt/pw-browsers/chromium` (o caminho 1194 sumiu em 23/10).

## Reel 08 "Eu também tenho app" (24/10/2026, sai em 02/11 19h30)
- `reel08.html`: gancho "O Jarvys tem app?" com celular e carimbo TEM, SIM; celular com o site (barra jarvys.com.br, botão Instalar o app Jarvys sendo tocado, keyframe `press` e círculo `tap`), tela inicial com o ícone do Jarvys surgindo; 3 cartões (`.bigtile`: garagem pela placa, Status de Saúde, Dr. Jarvys); R$ 0 com carimbo GRÁTIS PRA SEMPRE; fecho com Crie sua conta grátis.
- Narração: `audio/reel08-voz.mp3` (1 take, 17,9 s, 280 créditos; flow tng76TaqyXYwUeXbdSyX), VO 0,5 s. Efeitos: `python3 audio8.py aud8`. Trilha: `trilha-01.mp3 -ss 4 -t 23`.
- Quadros: `node cap2.mjs reel08.html fr8 23`. Mix: `AUD=aud8 ./mix2.sh fr8 saida.mp4 aud8/voz.wav` (final -14,1 LUFS).

## Reel 09 "Motorista de app" (24/10/2026, sai em 03/11 19h30)
- `reel09.html`: estrada com faixa andando (`.road2`), carro com luz de app, relógio 06:00 → 22:00 e contadores de corridas e km (atualizados no `setT` estendido no fim do arquivo); "Eu." com o ícone; gasto no WhatsApp; visor de câmera com flash no odômetro; resumo do mês com barras (`.sum`, valores de exemplo); notificação de revisão chegando; fecho "Você dirige. Eu cuido das contas."
- Atenção: `popb` usa transform e anula o translate do `.hub`; com animação, posicionar o hub com left:0 e top:0.
- Narração: `audio/reel09-voz.mp3` (1 take, 18,9 s, 290 créditos; flow J1yxTOqopIn66O87L2MJ), VO 0,5 s. Efeitos: `python3 audio9.py aud9`. Trilha: `trilha-01.mp3 -ss 11 -t 23.5`.
- Quadros: `node cap2.mjs reel09.html fr9 23.5`. Mix: `AUD=aud9 ./mix2.sh fr9 saida.mp4 aud9/voz.wav` (final -14,1 LUFS).
