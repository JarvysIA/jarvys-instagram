# Cortes para anúncio (tráfego pago, verba de R$ 750 até 31/12/2026)

Feitos em 17/11/2026 com a narração já paga (0 crédito). Fecho "App 100% grátis, jarvys.com.br". Não são posts do feed: são criativos para a conta de anúncios da Meta (Fernando cria em 19/11; a primeira ativação precisa do ok dele).

- `anuncio-estrada-14s.mp4` (14,2 s): corte do reel 20 "Vai pegar a estrada?", sem a palavra "feriado". Gancho no primeiro segundo, checklist das 5 coisas, "Na dúvida? Me pergunta." e fecho.
- `anuncio-ta-caro-14s.mp4` (14,4 s): corte do reel 06 "Tá caro?", sem "no WhatsApp" (o WhatsApp é a função paga). Orçamento, "Antes de aprovar, me pergunta", estimativa de exemplo e fecho.

Código: `_codigo/motion/anuncios.py` gera `anuncio20.html`, `anuncio06.html`, as vozes cortadas e os efeitos; captura com `cap2.mjs` e mix com `mix2.sh` como nos reels.

## Anúncio com o Fernando (18/11/2026)

- `anuncio-fernando-14s.mp4` (14 s): gravação do próprio Fernando na loja. Fala: "Olá, eu sou Fernando, proprietário da Star Serviços Automotivos e, pensando em te ajudar a cuidar do seu carro melhor, desenvolvi o Jarvys. Clica no link aqui abaixo e instale agora mesmo no seu celular." Gancho escrito "Dono de oficina criou um app pra cuidar do seu carro", legenda palavra por palavra e textos dentro da área segura de anúncio (nada importante abaixo de 1.250 px), fecho "App 100% grátis, jarvys.com.br".
- A fala "link aqui abaixo" só faz sentido em anúncio (botão) ou story com link. A versão para o feed, sem essa frase e com "link na bio", é `2026-12/dia-03/reel-fernando-01.mp4`.
- Ele cita a Star e está com a camisa da Star porque gravou assim: vale só para as gravações dele. Continua proibido usar a pasta de fotos, o canal ou a marca da Star em peça criada por nós.
- Código: `_codigo/motion3d/fernando-01.html` (`?v=reel` para a versão do feed), quadros recortados com `ffmpeg -ss 1.15 -t 11.35 -i fonte -vf "crop=iw*0.75:ih*0.75:iw*0.125:ih*0.22,scale=1080:1920:flags=lanczos,fps=30" fer01/cf%04d.jpg`, fonte em `_codigo/motion3d/fer01/fonte-2026-11-18.mp4`. Transcrição feita no próprio ambiente (sherpa-onnx com whisper small, 0 crédito; precisa de 1 s de silêncio antes e depois do áudio).
