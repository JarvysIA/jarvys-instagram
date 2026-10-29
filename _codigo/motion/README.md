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

## Reels 10, 11 e 12 (25/10/2026, saem em 04, 05 e 06/11 19h30)
- Montagem nova, mais rápida: o HTML é gerado juntando a cabeça do reel09.html (estilos), um bloco de CSS próprio do reel e o script das cenas. `W(i)` devolve o início da palavra i já com o atraso VO, para casar cena e fala sem conta manual.
- `reel10.html` "Status de Saúde": batimento (ECG) sobre o carro no gancho, cartão do app com os 4 itens ganhando cor, semáforo grande acendendo verde, amarelo e vermelho com a fala, barras por item, item "Sem registro" tracejado e carimbo "?" cortado (nada de chute), fecho grátis para sempre. Narração 1 take, 21,5 s, 293 créditos (flow eNAQJdvSsI6gMjOJTUvR). Trilha `-ss 6 -t 26`. Final -14,2 LUFS.
- `reel11.html` "Indicou, ganhou R$ 5": moeda dourada balançando no gancho, passos numerados (seu carro ativado, você indica, amigo cria a conta e ativa), notificação de Pix, 5 amigos com contador até R$ 25,00 (`setT` estendido no fim). Narração 1 take, 19,1 s, 307 créditos (flow SYfLvz1VGgI8swdbFUqC). Trilha `-ss 3 -t 24`. Final -13,9 LUFS.
- `reel12.html` "Qual óleo? Dr. Jarvys": frasco de óleo com "?", manual de 380 páginas com X, chat do Dr. Jarvys, ficha técnica com scanner, resposta 5W30 (exemplo ilustrativo), foto do painel com a luz da injeção e explicação, fecho com selo DR. JARVYS. Narração 1 take, 17,8 s, 288 créditos (flow JWpgYaoUlACBt8w25br5). Trilha `-ss 8 -t 23`. Final -14,4 LUFS.
- Quadros: `node cap2.mjs reelN.html frN <s>`; mix: `AUD=audN ./mix2.sh frN saida.mp4 audN/voz.wav`.

## Reels 13, 14 e 15 (26/10/2026, saem em 07, 08 e 09/11 19h30)
- Mesma montagem dos reels 10 a 12 (cabeça de estilos do reel12.html + CSS próprio + script das cenas com `W(i)`).
- `reel13.html` "Cadê a nota da oficina?": porta-luvas abrindo com papéis voando (MANUAL, MULTA?, RECIBO, CUPOM) e carimbo vermelho SUMIU; celular fotografando a nota ilustrativa com flash e scanner; "Nota guardada"; folhas de meses passando; pedido "me manda a nota do óleo" e documento de volta com selo "na hora"; personagem do reel 03 feliz no "Nunca mais". Narração 1 take, 19,4 s, 264 créditos (flow 0HioQUjsNtqPuDoO4rQh). Trilha `-ss 1 -t 24.5`. Final -14,0 LUFS.
- `reel14.html` "Digitou o valor errado?": visor R$ 1.500 tremendo com o zero a mais destacado e o personagem confuso; ERA R$ 150 x SAIU R$ 1.500; conversa de correção com o "sim" e selo Corrigido; "apaga o último gasto" com o "sim" e Pronto, apagado; planilha com #ERRO e X. Narração 1 take, 18,1 s, 256 créditos (flow IcTjKXKpA4ztu99ST0YN). Trilha `-ss 11.5 -t 23.5`. Final -14,1 LUFS.
- `reel15.html` "Quanto vale o seu carro hoje?": carro com etiqueta R$ ?; placa Mercosul de exemplo JRV2A26 sendo digitada; ficha com modelo, ano e FIPE contando até R$ 58.900 (exemplo, `setT` estendido no fim); Status de Saúde com itens acendendo (em dia, atenção, sem registro) e 3 bolas verde, amarela e vermelha na fala; R$ 0 com carimbo PRA SEMPRE; fecho Crie sua conta grátis. Narração 1 take, 17,7 s, 263 créditos (flow E9mu6gEnRtXbMGXgXctH). Trilha `-ss 6.5 -t 23.5`.
- Atenção: `.saved` e `.fix` usam translateX(-50%) e a animação `popb` anula isso (pílula sai deslocada para a direita). Centralizar com um `div.abs` de left:0;right:0;text-align:center por fora e a pílula com position:relative;display:inline-flex;left:0.
- Atenção 2: pedir a transcrição só depois que a narração terminou (get_flow_run_status). Pedida antes, cobrou 165 créditos.
- Orbitron desenha o zero cortado (parece Ø): para valores em reais grandes, usar Inter 800.

## Reel 16 "Barulho estranho no freio?" Dr. Jarvys (27/10/2026, sai em 10/11 19h30)
- `reel16.html`: roda com disco girando e pinça vermelha tremendo, onomatopeias IIIIH e NHEEC e arcos de som no gancho; balões de pensamento "Será que é grave? / Dá pra rodar assim? / Vai sair caro?" (Chega de achismo); chat com selo DR. JARVYS (chiado ao frear costuma ser pastilha gasta ou sujeira no disco, conversa de exemplo); 2 cartões "Dá pra esperar" (amarelo) x "Oficina logo" (vermelho, destaque) e pílula "Freio chiando: oficina essa semana"; mecânico do reel 06 surpreso com o cliente que chega sabendo; fecho DR. JARVYS, Teste 30 dias grátis.
- Narração: `audio/reel16-voz.mp3` (1 take, 14,9 s, 250 créditos; flow Jr7jB2qHSXLu4QsTZqmy), VO 0,5 s. Fala mais curta que o padrão (47 palavras); vídeo de 20,5 s com o fecho.
- Efeitos: `python3 audio16.py aud16` (novo efeito `squeal` para o chiado). Trilha: `trilha-01.mp3 -ss 12 -t 20.5`. Mix: `AUD=aud16 ./mix2.sh fr16 reel16.mp4 aud16/voz.wav` (final -14,2 LUFS).

## Reel 17 "Quanto você gastou com o carro esse mês?" (28/10/2026, sai em 11/11 19h30)
- `reel17.html`: motorista do reel 03 confuso com interrogações e pílula "Quase ninguém sabe"; cartões de gasto (gasolina, oficina, lavagem) surgindo e voando com o carimbo vermelho SUMIU? (`.xc`, `flyaway`, `.stampR`); conversa com texto e áudio, pedido do "sim" e "Anotado no Onix"; folha de calendário 31, "quanto gastei esse mês?" e cartão `.sum2` com o total contando até R$ 1.240,00 (valores de exemplo, `setT` estendido) e barras por categoria; fecho "Você gasta. Eu somo."
- Atenção: o personagem com animação `shake` perde o translateX(-50%) do `.guy`; centralizar com um `div.abs` flex por fora e o `.guy` com position:relative;left:0;transform:none.
- Narração: `audio/reel17-voz.mp3` (1 take, 21,2 s, 57 palavras, 308 créditos; flow WcYCpA8yqPdqB10Dcfn6), VO 0,5 s. Transcrição pedida depois de terminar: 0 crédito.
- Efeitos: `python3 audio17.py aud17` (novo efeito `coin`). Trilha: `trilha-01.mp3 -ss 4.5 -t 25`. Quadros: `node cap2.mjs reel17.html fr17 25` (3,5 min). Mix: `AUD=aud17 ./mix2.sh fr17 reel17.mp4 aud17/voz.wav` (final -13,8 LUFS).

## Reel 18 "O ponteiro da temperatura subiu?" Dr. Jarvys (29/10/2026, sai em 12/11 19h30)
- `reel18.html`: marcador de temperatura original em SVG (função `gauge`, C e H, ponteiro `.ndl` subindo e tremendo, ícone de temperatura acendendo) com vapor (`.steam`) no gancho e pílula "Calma."; 2 passos numerados (`.step`: pare em lugar seguro, desligue o carro); radiador em SVG com tampa QUENTE, X vermelho grande (`.bigx`) e pílula "Pode espirrar água fervendo"; visor de câmera (`.vfx`) com flash na foto do painel; chat com selo DR. JARVYS e a foto do painel, resposta de exemplo (água baixa, ventoinha ou vazamento; próximo passo); termômetro enchendo e "Na dúvida, não roda"; fecho "Esquentou? Me manda a foto."
- Narração: `audio/reel18-voz.mp3` (1 take, 19,3 s, 58 palavras, 302 créditos; flow xgpmJ2U9lSnizm4JaWhd), VO 0,5 s. Transcrição depois de terminar: 0 crédito.
- Efeitos: `python3 audio18.py aud18` (novos `hiss` para o vapor e `shutter` para a câmera). Trilha: `trilha-01.mp3 -ss 8.5 -t 24`. Quadros: `node cap2.mjs reel18.html fr18 24`. Mix: `AUD=aud18 ./mix2.sh fr18 reel18.mp4 aud18/voz.wav` (final -14,5 LUFS).
