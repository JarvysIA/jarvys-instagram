# Vídeo realista de outubro/2026 (posto)

- Cena: Kling 3 Pro na ElevenLabs, 1 clipe multi-shot de 9 s, 9:16, 1080p com áudio (flow eWlR1EHUAKiVjwQJxUk5, geração ExWHRPhK4Di0ysIsNUaY). 9.162 créditos.
- Narração do fecho: Jhony Tygas, eleven_v4, 1 take (176 créditos) em `fecho-voz.mp3`. Entra em 10,0 s.
- Parte animada: `realista.html` (precisa das fontes e do icon-512.png da pasta motion e de `real/last.jpg`, o último quadro do clipe).
- Captura com transparência: `node cap_png.mjs realista.html fr_r 24`.
- Efeitos: `python3 sfx_real.py timeline.json sfx.wav`. Trilha: trilha-01 (já paga).
- Montagem: clipe convertido para 30 fps e esticado com o último quadro até 24 s, depois overlay dos PNG.
