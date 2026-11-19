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
