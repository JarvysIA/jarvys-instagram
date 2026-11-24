const VO = 0.5;
const W0 = [["Dono",0,0.28],["de",0.32,0.4],["Mobi,",0.44,0.96],["olha",1.04,1.2],["isso.",1.28,1.6],["Ele",1.92,2.08],["teve",2.16,2.32],["dois",2.48,2.72],["motores.",2.8,3.56],["O",3.76,3.84],["Fire,",4.0,4.48],["de",4.52,4.56],["quatro",4.72,4.96],["cilindros,",5.04,5.64],["tem",5.68,5.76],["correia",5.84,6.08],["dentada:",6.16,6.96],["troca",7.04,7.2],["no",7.28,7.36],["prazo",7.44,7.68],["do",7.76,7.8],["manual.",7.84,8.32],["O",8.8,8.88],["Firefly,",8.96,9.76],["de",9.8,9.84],["três",10.0,10.16],["cilindros,",10.24,10.88],["usado",10.96,11.2],["no",11.28,11.36],["Drive",11.4,11.84],["e",11.88,11.92],["em",12.04,12.16],["toda",12.2,12.4],["a",12.44,12.48],["linha",12.56,12.72],["desde",12.88,13.12],["2025,",13.16,14.24],["tem",14.28,14.32],["corrente.",14.4,14.96],["E",15.44,15.48],["o",15.52,15.56],["Mobi",15.6,15.92],["já",15.96,16.04],["teve",16.08,16.24],["vários",16.4,16.72],["recalls.",16.84,17.28],["Confere",17.6,17.92],["pelo",17.973,18.08],["chassi,",18.16,18.72],["no",18.76,18.8],["site",18.88,19.12],["da",19.16,19.2],["Fiat,",19.28,19.76],["se",19.8,19.84],["o",19.88,19.92],["seu",20.0,20.12],["tá",20.16,20.24],["em",20.28,20.32],["dia.",20.4,20.88],["Manda",21.12,21.28],["pra",21.36,21.44],["quem",21.493,21.6],["tem",21.68,21.76],["Mobi.",21.8,22.16],["O",22.48,22.56],["seu",22.64,22.88],["é",22.96,23.04],["Fire",23.08,23.44],["ou",23.6,23.68],["Firefly?",23.76,24.64],["Comenta",24.72,24.96],["aí.",25.0,25.44]];
const T = {total: 30, s1:[0,2.3], s2:[2.3,4.2], s3:[4.2,9.15], s4:[9.15,15.8], s5:[15.8,21.5], s6:[21.5,22.85], s7:[22.85,26.4], s8:[26.4,30],
  breaks: [0, 5, 9, 14, 17, 22, 24, 27, 31, 35, 39, 46, 49, 53, 59, 64, 70]};
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
let h = '';

// CENA 1: gancho, DONO DE MOBI
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>SEU MOBI</span></div>
  <div class="hd c" style="top:290px;font-size:110px">${still('Dono de')}</div>
  <div class="e42big" style="top:420px">MOBI</div>
  <div class="hd c" style="top:720px;font-size:96px">${still('olha isso 👀')}</div>
  <div class="e42p" style="left:190px;top:920px;animation:${A('stIn', .5, .15)}">${HATCH}</div>
  <div class="stamp" style="top:1360px;--r:-6deg;font-size:92px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(3) - .1, BOUNCE)}">2 MOTORES</div>
</div></div>`;

// CENA 2: ele teve dois motores
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:200px;font-size:104px;line-height:1.06">${words('Ele teve', W(5), .14)}<br>${neonWords('2 motores', W(7), .16)}</div>
  <div class="e43mini" style="left:40px;top:560px;transform:scale(.58);transform-origin:0 0;animation:${A('fade', .4, W(7))}">${ENGB}</div>
  <div class="e43mini" style="left:560px;top:560px;transform:scale(.58);transform-origin:0 0;animation:${A('fade', .4, W(8))}">${ENGC}</div>
  <div class="e43tag y" style="left:140px;top:1100px;animation:${A('popb', .4, W(7) + .2, BOUNCE)}">FIRE</div>
  <div class="e43tag" style="left:620px;top:1100px;animation:${A('popb', .4, W(8) + .1, BOUNCE)}">FIREFLY</div>
</div></div>`;

// CENA 3: Fire, 4 cilindros, correia dentada, troca no prazo do manual
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:150px;font-size:84px;line-height:1.06">${words('Fire: 4 cilindros', W(10), .16)}<br>${neonWords('correia dentada', W(15), .16)}</div>
  <div class="e42p" style="left:130px;top:430px;animation:${A('stIn', .5, T.s3[0] + .05)}">${ENGB}</div>
  ${[0,1,2,3].map(k => num(k + 1, 166 + k * 92, 1010, W(12) + k * .14)).join('')}
  <div class="abs" style="left:0;right:0;top:1330px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:42px;animation:${A('popb', .45, W(17), BOUNCE)}">📘 Troca no prazo do manual</span></div>
</div></div>`;

// CENA 4: Firefly, 3 cilindros, Drive e toda a linha desde 2025, corrente
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:150px;font-size:84px;line-height:1.06">${words('Firefly: 3 cilindros', W(23), .16)}<br>${neonWords('corrente', W(38), .16)}</div>
  <div class="e42p" style="left:130px;top:430px;animation:${A('stIn', .5, T.s4[0] + .05)}">${ENGC}</div>
  ${[0,1,2].map(k => num(k + 1, 170 + k * 110, 1010, W(25) + k * .16)).join('')}
  <div class="abs" style="left:0;right:0;top:1300px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:38px;margin-right:20px;animation:${A('popb', .45, W(29), BOUNCE)}">🚗 Mobi Drive</span><span class="pillx ok" style="position:relative;font-size:38px;animation:${A('popb', .45, W(35), BOUNCE)}">📅 Toda a linha 2025+</span></div>
</div></div>`;

// CENA 5: recall, confere pelo chassi no site da Fiat
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:160px;font-size:92px;line-height:1.06">${words('Já teve vários', W(42), .14)}<br>${neonWords('recalls', W(45), .16)}</div>
  <div class="stamp" style="top:520px;--r:-5deg;font-size:110px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(45), BOUNCE)}">RECALL</div>
  <div class="e43rc" style="top:700px;animation:${A('stIn', .5, W(39))}"><h4>CONSULTA DE RECALL</h4>
    <div class="fl">Número do chassi</div>
    <div class="in">••••••••••••••••<i></i></div>
    <div class="bt">🔎 Consultar</div>
    <div class="res" style="animation:${A('popb', .45, W(55), BOUNCE)}">✅ Tá em dia? Confere o seu.</div>
  </div>
  <div class="abs" style="left:0;right:0;top:1300px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:40px;animation:${A('popb', .45, W(50), BOUNCE)}">🌐 No site da Fiat</span></div>
</div></div>`;

// CENA 6: manda pra quem tem Mobi
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('Manda pra quem', W(59), .1)}<br>${neonWords('tem Mobi', W(62), .12)}</div>
  <div class="e42send" style="top:600px;animation:${A('fly42', 1.4, W(59))}">📤</div>
  <div class="e42chat" style="top:940px;animation:${A('stIn', .5, W(60))}">Seu Mobi é Fire ou Firefly? Olha isso 👀</div>
</div></div>`;

// CENA 7: o seu é Fire ou Firefly? comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:240px;font-size:110px;line-height:1.06">${words('O seu é', W(64), .12)}</div>
  <div class="abs" style="left:0;right:0;top:470px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:56px;margin-right:24px;animation:${A('popb', .45, W(67), BOUNCE)}">🔗 Fire</span><span class="e43tag y" style="position:relative;opacity:0;animation:${A('fade', .3, W(68))}">OU</span><span class="pillx ok" style="position:relative;font-size:56px;margin-left:24px;animation:${A('popb', .45, W(69), BOUNCE)}">⛓️ Firefly</span></div>
  <div class="e43q" style="top:650px;animation:${A('popb', .45, W(69) + .3, BOUNCE)}">?</div>
  <div class="abs" style="left:0;right:0;top:900px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(70) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
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
