const VO = 0.5;
const W0 = [["Dono", 0.08, 0.32], ["de", 0.36, 0.4], ["Gol,", 0.56, 1.04], ["olha", 1.12, 1.36], ["isso.", 1.48, 2.08], ["Ele", 2.16, 2.24], ["saiu", 2.32, 2.48], ["de", 2.56, 2.64], ["linha", 2.72, 2.8], ["em", 2.84, 2.88], ["2022,", 2.96, 3.92], ["depois", 4.0, 4.24], ["de", 4.36, 4.48], ["42", 4.52, 5.36], ["anos.", 5.52, 6.24], ["No", 6.32, 6.4], ["1.0", 6.44, 6.96], ["de", 7.04, 7.2], ["três", 7.24, 7.36], ["cilindros,", 7.44, 8.0], ["a", 8.04, 8.08], ["correia", 8.16, 8.4], ["dentada", 8.52, 8.8], ["pode", 8.88, 9.04], ["ir", 9.12, 9.2], ["até", 9.28, 9.44], ["120.000 km,", 9.6, 11.2], ["ou", 11.32, 11.44], ["quatro", 11.48, 11.76], ["anos", 11.84, 12.0], ["e", 12.04, 12.08], ["meio.", 12.16, 12.88], ["Em", 12.92, 12.96], ["uso", 13.04, 13.2], ["severo,", 13.28, 13.813], ["com", 13.867, 13.92], ["trânsito", 14.0, 14.32], ["pesado", 14.4, 14.88], ["ou", 14.96, 15.04], ["poeira,", 15.12, 15.6], ["é", 15.64, 15.68], ["metade", 15.8, 16.16], ["disso.", 16.24, 16.96], ["E", 17.0, 17.04], ["a", 17.067, 17.093], ["revisão", 17.12, 17.6], ["é", 17.68, 17.707], ["a", 17.733, 17.76], ["cada", 17.84, 18.16], ["10.000 km", 18.28, 19.2], ["ou", 19.36, 19.44], ["um", 19.48, 19.52], ["ano.", 19.68, 20.24], ["Manda", 20.28, 20.48], ["pra", 20.52, 20.56], ["quem", 20.64, 20.72], ["tem", 20.8, 20.88], ["Gol.", 20.96, 21.52], ["O", 21.56, 21.6], ["seu", 21.68, 21.84], ["já", 21.88, 21.96], ["trocou", 22.0, 22.24], ["a", 22.28, 22.32], ["correia?", 22.36, 22.96], ["Comenta", 23.0, 23.28], ["aí.", 23.32, 23.76]];
const T = {total: 29, s1:[0,2.5], s2:[2.5,6.7], s3:[6.7,13.3], s4:[13.3,17.4], s5:[17.4,20.7], s6:[20.7,21.95], s7:[21.95,25.3], s8:[25.3,29],
  breaks: [0, 5, 10, 15, 20, 26, 32, 35, 40, 43, 49, 53, 58, 64]};
T.words = W0.map(([w,a,b]) => [w, +(a+VO).toFixed(3), +(b+VO).toFixed(3)]);
window.T = T;
const ICON = 'icon-512.png';
const an = (list) => list.filter(Boolean).join(', ');
const A = (name, dur, at, ease = 'cubic-bezier(.2,.8,.2,1)', fill = 'both') => `${name} ${dur}s ${ease} ${at}s ${fill}`;
const sceneStyle = (s, last, noIn) => `${noIn ? 'opacity:1;' : ''}animation:${an([noIn ? '' : A('sceneIn', .55, s[0]), last ? '' : A('sceneOut', .45, s[1] - .45, 'ease-in', 'forwards')])}`;
const camStyle = (s) => `animation:${A('ken', s[1] - s[0], s[0], 'linear')}`;
const words = (txt, at, step, cls = '') => txt.split(' ').map((w, i) => `<span class="w ${cls}" style="animation:${A('word', .55, at + i * step)}">${w}</span>`).join('');
const neonWords = (txt, at, step) => words(txt, at, step, 'neon');
const still = (txt, cls='') => txt.split(' ').map(w => `<span class="w ${cls}" style="opacity:1">${w}</span>`).join('');
const BOUNCE = 'cubic-bezier(.34,1.56,.64,1)';
const W = (i) => T.words[i][1];
// desenhos nossos (genéricos, sem marca)
const HATCH = `<svg width="700" height="330" viewBox="0 0 700 330" style="overflow:visible">
 <path d="M60 236 L74 170 Q84 146 116 140 L210 128 L282 70 Q300 56 330 56 L470 56 Q502 56 520 80 L580 150 L620 162 Q650 170 652 204 L654 240 Q654 254 638 254 L72 254 Q56 254 60 236Z" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
 <path d="M300 82 L250 132 H400 V82Z M428 82 V132 H556 L506 88 Q500 82 490 82Z" fill="rgba(58,199,255,.18)" stroke="#3ac7ff" stroke-width="6" stroke-linejoin="round"/>
 <rect x="52" y="216" width="600" height="18" rx="9" fill="rgba(58,199,255,.25)"/>
 <circle cx="180" cy="256" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="180" cy="256" r="22" fill="#97a7b7"/>
 <circle cx="530" cy="256" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="530" cy="256" r="22" fill="#97a7b7"/>
 <rect x="620" y="182" width="28" height="20" rx="6" fill="#f9c718"/>
</svg>`;
const CPATH = 'M480 190 A80 80 0 0 1 640 190 L616 620 A56 56 0 0 1 504 620 Z';
const GEAR = (cx, cy, r, dur, teeth = true) => `<g style="transform-origin:${cx}px ${cy}px;transform-box:view-box;animation:rot42 ${dur}s linear infinite">
 ${teeth ? Array.from({length: 12}, (_, k) => `<rect x="${cx - 9}" y="${cy - r - 16}" width="18" height="26" rx="4" fill="#e8f1f8" transform="rotate(${k * 30} ${cx} ${cy})"/>`).join('') : ''}
 <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/><path d="M${cx} ${cy - r + 14} V${cy + r - 14} M${cx - r + 14} ${cy} H${cx + r - 14}" stroke="#97a7b7" stroke-width="8"/></g>`;
const CHAINP = (d) => `<path d="${d}" fill="none" stroke="#c9d3dd" stroke-width="26" stroke-dasharray="26 8" style="animation:chain42 1.2s linear infinite"/>
 <path d="${d}" fill="none" stroke="#0b1626" stroke-width="9" stroke-dasharray="26 8" style="animation:chain42 1.2s linear infinite"/>`;
// correia de borracha: faixa preta lisa por fora e dentinhos por dentro
const BELTP = (d) => `<path d="${d}" fill="none" stroke="#2b3138" stroke-width="30"/>
 <path d="${d}" fill="none" stroke="#f9c718" stroke-width="4" stroke-dasharray="14 34" style="animation:belt43 1s linear infinite"/>`;
const CYL = (n, x0, gap) => Array.from({length: n}, (_, i) => `<rect x="${x0 + i * gap}" y="110" width="${gap - 30}" height="250" rx="12" fill="rgba(58,199,255,.06)" stroke="#97a7b7" stroke-width="8"/><rect x="${x0 + 8 + i * gap}" y="${190 + (i % 2) * 60}" width="${gap - 46}" height="56" rx="8" fill="#97a7b7" opacity=".7"/>`).join('');
const ENGB = `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <rect x="60" y="560" width="700" height="260" rx="30" fill="rgba(242,181,59,.22)"/>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${CYL(4, 96, 92)}
 ${BELTP(CPATH)}
 ${GEAR(560, 190, 70, 2, false)}${GEAR(560, 620, 46, 1, false)}
</svg>`;
const ENGC = `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <rect x="60" y="560" width="700" height="260" rx="30" fill="rgba(242,181,59,.22)"/>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${CYL(3, 110, 110)}
 ${CHAINP(CPATH)}
 ${GEAR(560, 190, 70, 2)}${GEAR(560, 620, 46, 1)}
</svg>`;
const num = (n, x, y, at) => `<div class="e42num" style="left:${x}px;top:${y}px;animation:${A('popb', .4, at, BOUNCE)}">${n}</div>`;
const ENG3 = `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <rect x="60" y="560" width="700" height="260" rx="30" fill="rgba(242,181,59,.22)"/>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${CYL(3, 110, 110)}
 ${BELTP(CPATH)}
 ${GEAR(560, 190, 70, 2, false)}${GEAR(560, 620, 46, 1, false)}
</svg>`;
const pill = (cls, txt, at, fs = 40, mr = 0) => `<span class="pillx ${cls}" style="position:relative;font-size:${fs}px;${mr ? `margin-right:${mr}px;` : ''}animation:${A('popb', .45, at, BOUNCE)}">${txt}</span>`;
const bar = (top, to, color, at, dur) => `<div class="e42bar" style="top:${top}px;animation:${A('fade', .3, at - .2)}"><i style="background:${color};--to:${to};animation:${A('fill42', dur, at)}"></i></div>`;
const lab = (top, txt, at, color = 'var(--fg)', extra = '') => `<div class="e42blab" style="top:${top}px;color:${color};${extra}animation:${A('fade', .4, at)}">${txt}</div>`;
let h = '';

// CENA 1: gancho, DONO DE GOL
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>SEU GOL</span></div>
  <div class="hd c" style="top:290px;font-size:110px">${still('Dono de')}</div>
  <div class="e42big" style="top:420px">GOL</div>
  <div class="hd c" style="top:720px;font-size:96px">${still('olha isso 👀')}</div>
  <div class="e42p" style="left:190px;top:920px;animation:${A('stIn', .5, .15)}">${HATCH}</div>
  <div class="stamp" style="top:1360px;--r:-6deg;font-size:88px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(3) - .1, BOUNCE)}">A CORREIA</div>
</div></div>`;

// CENA 2: saiu de linha em 2022, depois de 42 anos
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:180px;font-size:100px;line-height:1.06">${words('Saiu de linha', W(6), .14)}<br>${neonWords('em 2022', W(9), .16)}</div>
  <div class="e42big" style="top:520px;opacity:0;animation:${A('popb', .5, W(13), BOUNCE)}">42</div>
  <div class="hd c" style="top:800px;font-size:90px">${words('anos de Gol', W(13) + .2, .14)}</div>
  ${bar(1010, 1, 'linear-gradient(90deg,#3ac7ff,#7ff0b3)', W(11), 1.6)}
  ${lab(1085, '1980', W(11))}
  ${lab(1085, '2022', W(13) + .3, 'var(--warn)', 'left:auto;right:150px;')}
  <div class="stamp" style="top:1270px;--r:-5deg;font-size:76px;white-space:nowrap;animation:${A('pop', .5, W(14), BOUNCE)}">SAIU DE LINHA</div>
</div></div>`;

// CENA 3: 1.0 de 3 cilindros, correia dentada até 120.000 km ou 4 anos e meio
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:150px;font-size:84px;line-height:1.06">${words('1.0, 3 cilindros', W(16), .16)}<br>${neonWords('correia dentada', W(21), .16)}</div>
  <div class="e42p" style="left:130px;top:430px;animation:${A('stIn', .5, T.s3[0] + .05)}">${ENG3}</div>
  ${[0,1,2].map(k => num(k + 1, 170 + k * 110, 1010, W(18) + k * .16)).join('')}
  <div class="abs" style="left:0;right:0;top:1320px;text-align:center;white-space:nowrap">${pill('ok', '📏 Até 120.000 km', W(26), 38, 20)}${pill('wa', '📅 ou 4 anos e meio', W(28), 38)}</div>
</div></div>`;

// CENA 4: uso severo, metade
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:170px;font-size:100px;line-height:1.06">${words('Uso severo?', W(32), .16)}<br><span class="w red" style="animation:${A('word', .55, W(41))}">É</span> <span class="w red" style="animation:${A('word', .55, W(41) + .14)}">metade</span></div>
  <div class="abs" style="left:0;right:0;top:470px;text-align:center;white-space:nowrap">${pill('wa', '🚦 Trânsito pesado', W(36), 40, 20)}${pill('wa', '💨 Poeira', W(39), 40)}</div>
  ${lab(660, 'Uso normal: até 120.000 km', W(32) + .2)}
  ${bar(730, 1, '#3ac7ff', W(33), 1)}
  ${lab(880, 'Uso severo: metade', W(40), 'var(--bad)')}
  ${bar(950, .5, '#f94144', W(41), .8)}
  <div class="e43q" style="top:1100px;color:var(--bad);text-shadow:0 0 40px rgba(249,65,68,.5);animation:${A('popb', .45, W(41) + .4, BOUNCE)}">÷ 2</div>
</div></div>`;

// CENA 5: revisão a cada 10.000 km ou 1 ano
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:200px;font-size:100px;line-height:1.06">${words('Revisão', W(45), .14)}<br>${neonWords('a cada', W(47), .12)}</div>
  <div class="e42card" style="left:110px;top:540px;animation:${A('popb', .45, W(49) - .1, BOUNCE)}"><em>🛣️</em><b>10.000 km</b></div>
  <div class="e42ou" style="top:655px;animation:${A('fade', .3, W(50))}">OU</div>
  <div class="e42card" style="left:610px;top:540px;animation:${A('popb', .45, W(51), BOUNCE)}"><em>📅</em><b>1 ano</b></div>
  <div class="abs" style="left:0;right:0;top:960px;text-align:center;white-space:nowrap">${pill('ok', '✅ O que vier primeiro', W(50) + .2, 44)}</div>
</div></div>`;

// CENA 6: manda pra quem tem Gol
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('Manda pra quem', W(53), .1)}<br>${neonWords('tem Gol', W(56), .12)}</div>
  <div class="e42send" style="top:600px;animation:${A('fly42', 1.4, W(53))}">📤</div>
  <div class="e42chat" style="top:940px;animation:${A('stIn', .5, W(54))}">Seu Gol já trocou a correia? Olha isso 👀</div>
</div></div>`;

// CENA 7: o seu já trocou a correia? comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('O seu já trocou', W(58), .12)}<br>${neonWords('a correia?', W(62), .14)}</div>
  <div class="abs" style="left:0;right:0;top:560px;text-align:center;white-space:nowrap">${pill('ok', '✅ Já troquei', W(63), 52, 24)}${pill('wa', '🤔 Nem sei', W(63) + .3, 52)}</div>
  <div class="abs" style="left:0;right:0;top:820px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(64) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
</div></div>`;

// CENA 8: fecho com a logo grande
const F = T.s8[0];
h += `<div class="scene" style="${sceneStyle(T.s8, true)}"><div class="cam" style="${camStyle(T.s8)}">
  <img class="e42logo" src="${ICON}" style="animation:${A('popb', .6, F + .1, BOUNCE)}">
  <div class="abs" style="left:0;right:0;top:720px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, F + .5, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:830px;font-size:76px;line-height:1.08">${words('Dúvida do carro?', F + .7, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', F + 1.1, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:66px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, F + 1.7)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1160px;text-align:center;font-size:46px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, F + 2.1)}">App 100% grátis</div>
</div></div>`;
