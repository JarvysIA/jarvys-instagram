# Vídeo realista de outubro/2026 (posto)

- Cena: Kling 3 Pro na ElevenLabs, 1 clipe multi-shot de 9 s, 9:16, 1080p com áudio (flow eWlR1EHUAKiVjwQJxUk5, geração ExWHRPhK4Di0ysIsNUaY). 9.162 créditos.
- Narração do fecho: Jhony Tygas, eleven_v4, 1 take (176 créditos) em `fecho-voz.mp3`. Entra em 10,0 s.
- Parte animada: `realista.html` (precisa das fontes e do icon-512.png da pasta motion e de `real/last.jpg`, o último quadro do clipe).
- Captura com transparência: `node cap_png.mjs realista.html fr_r 24`.
- Efeitos: `python3 sfx_real.py timeline.json sfx.wav`. Trilha: trilha-01 (já paga).
- Montagem: clipe convertido para 30 fps e esticado com o último quadro até 24 s, depois overlay dos PNG.
- Voz do personagem: a voz gerada pelo Kling soou gringa. Trocada por TTS da voz Talis (E9a8LlXPNWtyvvSoZzrb, eleven_v4, 88 créditos) em `fala-personagem-talis.mp3`, encaixada nos tempos da boca ("Jarvys" em 4,30 s; resto em 5,50 s com atempo 0,88) e com a ambiência do próprio clipe por baixo (trecho 2,0 a 3,8 s em loop). Regra: nos próximos vídeos realistas, gerar a fala sempre com voz brasileira da ElevenLabs (nunca a do Jhony, que é o narrador) e não confiar no áudio do modelo de vídeo.
- Sincronia labial: só trocar o áudio deixou a boca fora de sincronia. O plano 2 (3,625 s até o fim, `plano2.mp4`) passou pelo Sync Lipsync 2 Pro com `plano2-voz.mp3` (fala já no tempo certo), 2.733 créditos. A base final é o plano 1 do clipe original + o plano 2 sincronizado, em 30 fps, esticada até 24 s.
