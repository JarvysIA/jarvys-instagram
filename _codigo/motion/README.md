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
