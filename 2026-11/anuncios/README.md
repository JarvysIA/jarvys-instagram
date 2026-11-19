# Cortes para anúncio (tráfego pago, verba de R$ 750 até 31/12/2026)

Feitos em 17/11/2026 com a narração já paga (0 crédito). Fecho "App 100% grátis, jarvys.com.br". Não são posts do feed: são criativos para a conta de anúncios da Meta (Fernando cria em 19/11; a primeira ativação precisa do ok dele).

- `anuncio-estrada-14s.mp4` (14,2 s): corte do reel 20 "Vai pegar a estrada?", sem a palavra "feriado". Gancho no primeiro segundo, checklist das 5 coisas, "Na dúvida? Me pergunta." e fecho.
- `anuncio-ta-caro-14s.mp4` (14,4 s): corte do reel 06 "Tá caro?", sem "no WhatsApp" (o WhatsApp é a função paga). Orçamento, "Antes de aprovar, me pergunta", estimativa de exemplo e fecho.

Código: `_codigo/motion/anuncios.py` gera `anuncio20.html`, `anuncio06.html`, as vozes cortadas e os efeitos; captura com `cap2.mjs` e mix com `mix2.sh` como nos reels.

## Anúncio com o Fernando (18/11/2026)

- `anuncio-fernando-14s-v2.mp4` (14 s; a v1 sem "-v2" tem a cor lavada, não usar): gravação do próprio Fernando na loja. Fala: "Olá, eu sou Fernando, proprietário da Star Serviços Automotivos e, pensando em te ajudar a cuidar do seu carro melhor, desenvolvi o Jarvys. Clica no link aqui abaixo e instale agora mesmo no seu celular." Gancho escrito "Dono de oficina criou um app pra cuidar do seu carro", legenda palavra por palavra e textos dentro da área segura de anúncio (nada importante abaixo de 1.250 px), fecho "App 100% grátis, jarvys.com.br".
- A fala "link aqui abaixo" só faz sentido em anúncio (botão) ou story com link. A versão para o feed, sem essa frase e com "link na bio", é `2026-12/dia-03/reel-fernando-01-v2.mp4`.
- Ele cita a Star e está com a camisa da Star porque gravou assim: vale só para as gravações dele. Continua proibido usar a pasta de fotos, o canal ou a marca da Star em peça criada por nós.
- Código: `_codigo/motion3d/fernando-01.html` (`?v=reel` para a versão do feed). Fonte em `_codigo/motion3d/fer01/fonte-2026-11-18.mp4` (cópia 1080p já com a cor convertida). Transcrição feita no próprio ambiente (sherpa-onnx com whisper small, 0 crédito; precisa de 1 s de silêncio antes e depois do áudio).
- **v2 (18/11, vale a v2):** a primeira versão saiu esbranquiçada e mole. Causa: o iPhone grava em HDR (HEVC 10 bits, HLG, bt2020, Dolby Vision) e a conversão direta para vídeo comum deixa a imagem lavada. Correção, que vale para toda gravação de celular:
  1. Conferir com `ffprobe` se `color_transfer` é `arib-std-b67` ou `smpte2084`. Se for, converter a cor: `zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p`.
  2. Gerar o vídeo base direto da fonte 4K em uma passada só (cor, recorte, `scale` lanczos, `unsharp=3:3:0.35`, crf 10): `fer01/base.mp4`.
  3. Capturar só os textos com fundo transparente: `ALPHA=1 node cap3d.mjs "fernando-01.html?alpha=1" ova 14` (PNG).
  4. Juntar no ffmpeg (vídeo + PNG por cima, fecho com o último quadro congelado, desfocado e escurecido) em uma única compressão, crf 17, marcado como bt709. Assim o vídeo gravado não passa por captura de tela.
- Saída sempre em 1080x1920: é o máximo que o Instagram exibe, então o 4K entra como nitidez e folga para o recorte, não como resolução final.

## Anúncio com o Dr. Jarvys em pessoa (18/11/2026)

- `2026-11/dia-29/reel-b02.mp4` (18,4 s): o mesmo arquivo do reel B02 serve de anúncio. Gancho "Quanto seu carro te custou esse ano?", 3 vantagens (gastos, histórico das revisões, valor pela Fipe), fecho "App 100% grátis, jarvys.com.br". Personagem feito com IA: marcar o rótulo de IA no anúncio. Código e passo a passo em `_codigo/motion3d/README.md` (seção B02).
