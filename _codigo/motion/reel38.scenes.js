const VO = 0.5;
const W0 = [["Dono",0,0.28],["de",0.32,0.4],["Onix,",0.48,1.04],["olha",1.12,1.28],["isso.",1.36,1.88],["O",2.08,2.16],["motor",2.32,2.48],["três",2.56,2.72],["cilindros",2.8,3.36],["tem",3.44,3.52],["a",3.56,3.6],["correia",3.68,3.92],["dentada",4.08,4.48],["dentro",4.56,4.88],["do",4.96,5],["motor,",5.04,5.68],["banhada",5.76,6.16],["no",6.2,6.24],["óleo.",6.32,7.04],["Óleo",7.12,7.36],["fora",7.44,7.64],["da",7.68,7.72],["especificação",7.76,8.56],["ataca",8.72,9.2],["a",9.24,9.28],["borracha:",9.36,10.16],["a",10.2,10.24],["correia",10.32,10.72],["pode",10.773,10.88],["se",10.96,11.04],["desgastar",11.12,11.76],["antes",11.92,12.08],["da",12.16,12.24],["hora",12.32,12.56],["e",12.6,12.64],["soltar",12.72,13.04],["pedaços.",13.16,13.92],["O",14.16,14.32],["certo:",14.48,15.12],["o",15.2,15.28],["óleo",15.36,15.6],["que",15.64,15.68],["o",15.707,15.733],["manual",15.76,16.08],["pede,",16.16,16.72],["com",16.76,16.8],["a",16.84,16.88],["norma",17,17.2],["dexos.",17.28,18.24],["Manda",18.32,18.48],["pra",18.52,18.56],["quem",18.64,18.72],["tem",18.8,18.96],["Onix.",19.04,19.76],["E",19.8,19.84],["o",19.92,20],["seu,",20.08,20.48],["usa",20.56,20.72],["qual",20.84,20.96],["óleo?",21,21.52],["Comenta",21.56,21.84],["aí.",21.88,22.32]];
const T = {total: 28, s1:[0,2.5], s2:[2.5,7.6], s3:[7.6,14.6], s4:[14.6,18.75], s5:[18.75,20.45], s6:[20.45,28],
  breaks: [0, 3, 5, 9, 13, 16, 19, 23, 26, 31, 37, 39, 45, 49, 54, 57, 60]};
T.words = W0.map(([w,a,b]) => [w, +(a+VO).toFixed(3), +(b+VO).toFixed(3)]);
window.T = T;
const ICON = 'icon-512.png';
const an = (list) => list.filter(Boolean).join(', ');
const A = (name, dur, at, ease = 'cubic-bezier(.2,.8,.2,1)', fill = 'both') => `${name} ${dur}s ${ease} ${at}s ${fill}`;
const sceneStyle = (s, last, noIn) => `${noIn ? 'opacity:1;' : ''}animation:${an([noIn ? '' : A('sceneIn', .55, s[0]), last ? '' : A('sceneOut', .45, s[1] - .45, 'ease-in', 'forwards')])}`;
const camStyle = (s) => `animation:${A('ken', s[1] - s[0], s[0], 'linear')}`;
const words = (txt, at, step, cls = '') => txt.split(' ').map((w, i) => `<span class="w ${cls}" style="animation:${A('word', .55, at + i * step)}">${w}</span>`).join('');
const neonWords = (txt, at, step) => words(txt, at, step, 'neon');
const redWords = (txt, at, step) => words(txt, at, step, 'red');
const still = (txt, cls='') => txt.split(' ').map(w => `<span class="w ${cls}" style="opacity:1">${w}</span>`).join('');
const BOUNCE = 'cubic-bezier(.34,1.56,.64,1)';
const W = (i) => T.words[i][1];
// desenhos nossos (genéricos): carro compacto, motor 3 cilindros com correia, correia de perto, galão
const HATCH = `<svg width="760" height="330" viewBox="0 0 760 330" style="overflow:visible">
 <path d="M60 230 L80 170 Q90 150 120 146 L220 140 L300 70 Q318 56 345 56 L520 56 Q548 56 566 76 L640 146 L690 156 Q720 162 722 196 L724 236 Q724 250 708 250 L70 250 Q56 250 60 230Z" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
 <path d="M318 82 L270 140 H440 V82Z M468 82 V140 H610 L556 88 Q550 82 540 82Z" fill="rgba(58,199,255,.18)" stroke="#3ac7ff" stroke-width="6" stroke-linejoin="round"/>
 <circle cx="190" cy="252" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="190" cy="252" r="22" fill="#97a7b7"/>
 <circle cx="586" cy="252" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="586" cy="252" r="22" fill="#97a7b7"/>
 <rect x="690" y="176" width="30" height="20" rx="6" fill="#f9c718"/>
</svg>`;
// motor em corte: 3 cilindros + correia entre duas polias, com óleo subindo
const ENG3 = (oilAt) => `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <defs><clipPath id="c38"><rect x="60" y="40" width="700" height="780" rx="40"/></clipPath>
 <linearGradient id="o38" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b07a1a"/><stop offset="1" stop-color="#f2b53b"/></linearGradient></defs>
 <g clip-path="url(#c38)"><g style="transform-origin:410px 820px;animation:${A('oil38', 1.4, oilAt)}">
  <rect x="40" y="360" width="760" height="480" fill="url(#o38)" opacity=".55"/>
  <path d="M40 360 Q120 330 200 360 T360 360 T520 360 T680 360 T840 360 V400 H40Z" fill="#f2b53b" opacity=".8" style="animation:wave38 2s ease-in-out infinite"/>
 </g></g>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${[0,1,2].map(i => `<rect x="${110 + i * 110}" y="110" width="80" height="250" rx="12" fill="rgba(58,199,255,.06)" stroke="#97a7b7" stroke-width="8"/><rect x="${118 + i * 110}" y="${190 + (i % 2) * 60}" width="64" height="56" rx="8" fill="#97a7b7" opacity=".7"/>`).join('')}
 <g style="transform-origin:560px 190px;transform-box:view-box;animation:rot38 2s linear infinite"><circle cx="560" cy="190" r="70" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/><path d="M560 130 V250 M500 190 H620" stroke="#97a7b7" stroke-width="8"/></g>
 <g style="transform-origin:560px 620px;transform-box:view-box;animation:rot38 1s linear infinite"><circle cx="560" cy="620" r="46" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/><path d="M560 584 V656 M524 620 H596" stroke="#97a7b7" stroke-width="8"/></g>
 <path d="M480 190 A80 80 0 0 1 640 190 L616 620 A56 56 0 0 1 504 620 Z" fill="none" stroke="#f9c718" stroke-width="22" stroke-linejoin="round" stroke-dasharray="14 10" style="animation:belt38 1.4s linear infinite"/>
</svg>`;
// correia de perto (faixa com dentes)
const BELT = `<svg width="900" height="200" viewBox="0 0 900 200" style="overflow:visible">
 <rect x="0" y="40" width="900" height="90" rx="20" fill="#2a3440" stroke="#f9c718" stroke-width="8"/>
 ${Array.from({length: 18}, (_, i) => `<rect x="${12 + i * 50}" y="130" width="30" height="40" rx="6" fill="#2a3440" stroke="#f9c718" stroke-width="6"/>`).join('')}
</svg>`;
const JUG = `<svg width="300" height="380" viewBox="0 0 300 380" style="overflow:visible">
 <path d="M60 80 H200 L250 130 V350 Q250 370 230 370 H70 Q50 370 50 350 V90 Q50 80 60 80Z" fill="rgba(65,214,134,.14)" stroke="#41d686" stroke-width="10" stroke-linejoin="round"/>
 <rect x="80" y="30" width="70" height="50" rx="10" fill="#41d686"/>
 <path d="M200 80 Q260 60 262 120" fill="none" stroke="#41d686" stroke-width="10"/>
 <rect x="80" y="170" width="140" height="120" rx="14" fill="#0b1626" stroke="#41d686" stroke-width="6"/>
 <text x="150" y="222" text-anchor="middle" font-family="Orbitron" font-weight="700" font-size="30" fill="#7ff0b3">dexos</text>
 <text x="150" y="266" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#e8f1f8">MANUAL ✓</text>
</svg>`;
let h = '';

// CENA 1: gancho, DONO DE ONIX
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>SEU ONIX</span></div>
  <div class="hd c" style="top:290px;font-size:110px">${still('Dono de')}</div>
  <div class="e38big" style="top:420px">ONIX</div>
  <div class="hd c" style="top:700px;font-size:96px">${still('olha isso 👀')}</div>
  <div class="e38p" style="left:160px;top:900px;animation:${A('stIn', .5, .15)}">${HATCH}</div>
  <div class="stamp" style="top:1340px;--r:-6deg;font-size:96px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(3) - .1, BOUNCE)}">ÓLEO CERTO?</div>
</div></div>`;

// CENA 2: motor 3 cilindros, correia dentro do motor, banhada no óleo
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:150px;font-size:76px;line-height:1.04">${words('Correia dentada', W(11), .14)}<br>${neonWords('dentro do motor', W(13), .14)}<br>${words('banhada no óleo', W(16), .14)}</div>
  <div class="e38p" style="left:130px;top:555px;animation:${A('stIn', .5, W(5) - .2)}">${ENG3(W(16))}</div>
  <div class="abs" style="left:150px;top:445px;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:36px;animation:${A('popb', .45, W(7), BOUNCE)}">3 cilindros</span></div>
  <div class="abs" style="left:740px;top:445px;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:36px;animation:${A('popb', .45, W(11), BOUNCE)}">⚙️ Correia</span></div>
  <div class="e38lab" style="left:0;right:0;text-align:center;top:1300px;color:#f2b53b;animation:${A('fade', .4, W(17))}">ÓLEO DO MOTOR</div>
</div></div>`;

// CENA 3: óleo fora da especificação ataca a borracha
const rdrops = (pts, at) => pts.map(([x, y, dy, d], k) => `<div class="e38drop" style="left:${x}px;top:${y}px;--dy:${dy}px;animation:fall38 ${d}s ease-in ${at + k * .2}s infinite"></div>`).join('');
const bits = (pts, at) => pts.map(([x, dx, dy, rr], k) => `<div class="e38bit" style="left:${x}px;top:880px;--dx:${dx}px;--dy:${dy}px;--rr:${rr}deg;animation:bit38 1.6s ease-in ${at + k * .18}s infinite"></div>`).join('');
const crack = (x, at) => `<svg class="e38crack" width="60" height="110" viewBox="0 0 60 110" style="left:${x}px;top:770px;animation:${A('fade', .2, at)}"><path d="M30 0 L14 30 L40 52 L18 80 L34 110" fill="none" stroke="#f94144" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 10px #f94144)"/></svg>`;
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:180px;font-size:84px;line-height:1.06">${words('Óleo fora da', W(19), .12)}<br>${redWords('especificação', W(22), .1)}<br>${words('ataca a borracha', W(23), .14)}</div>
  <div class="e38p" style="left:90px;top:740px;animation:${A('stIn', .5, W(19) - .3)}">${BELT}</div>
  <div class="e38p" style="left:0;top:0">${rdrops([[200, 520, 230, 1.1], [520, 500, 250, 1.2], [760, 530, 220, 1.0], [360, 540, 210, 1.15], [640, 510, 240, 1.25]], W(19))}</div>
  ${crack(240, W(23))}${crack(470, W(25))}${crack(700, W(27))}
  <div class="e38p" style="left:0;top:0">${bits([[260, -60, 380, -120], [500, 40, 420, 160], [720, 80, 360, 200], [380, -20, 440, 90]], W(35))}</div>
  <div class="abs" style="left:0;right:0;top:1080px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:42px;animation:${A('popb', .45, W(30), BOUNCE)}">⚠️ Desgaste antes da hora</span></div>
  <div class="abs" style="left:0;right:0;top:1240px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:42px;animation:${A('popb', .45, W(35), BOUNCE)}">🧩 Solta pedaços</span></div>
</div></div>`;

// CENA 4: o certo
const okc = (y, at, em, txt) => `<div class="e38ok" style="top:${y}px;animation:${A('stIn', .5, at - .35)}"><em>${em}</em><b>${txt}</b><div class="ck" style="animation:${A('popb', .4, at + .15, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:180px;font-size:110px">${neonWords('O certo:', W(37), .16)}</div>
  <div class="e38p" style="left:390px;top:340px;animation:${A('popb', .5, W(39), BOUNCE)}">${JUG}</div>
  ${okc(760, W(43), '📘', 'O óleo do manual')}
  ${okc(1000, W(47), '🏷️', 'Norma dexos')}
  <div class="abs" style="left:0;right:0;top:1230px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:38px;animation:${A('popb', .45, W(48), BOUNCE)}">🗓️ E a troca no prazo certo</span></div>
</div></div>`;

// CENA 5: manda pra quem tem Onix
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('Manda pra quem', W(49), .1)}<br>${neonWords('tem Onix', W(52), .12)}</div>
  <div class="e38send" style="top:620px;animation:${A('fly38', 1.4, W(49))}">📤</div>
  <div class="e38chat" style="top:960px;animation:${A('stIn', .5, W(52) - .1)}">Seu Onix usa qual óleo? Olha isso 👀</div>
</div></div>`;

// CENA 6: comenta aí + fecho
h += `<div class="scene" style="${sceneStyle(T.s6, true)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:190px;font-size:96px">${words('E o seu,', W(54), .1)}<br>${neonWords('usa qual óleo?', W(57), .12)}</div>
  <div class="abs" style="left:0;right:0;top:500px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(59) - .1, BOUNCE)}">📘 O do manual</span><span class="pillx wa" style="position:relative;animation:${A('popb', .45, W(59) + .15, BOUNCE)}">❓ Nem sei</span></div>
  <div class="abs" style="left:0;right:0;top:680px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(60) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
  <div class="sep" style="top:880px;animation:${A('fade', .5, 23.2)}"></div>
  <div class="abs" style="left:0;right:0;top:920px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, 23.4, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:1010px;font-size:72px;line-height:1.08">${words('Dúvida do carro?', 23.7, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', 24.2, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1200px;text-align:center;font-size:58px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, 24.8)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1290px;text-align:center;font-size:40px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, 25.2)}">App 100% grátis</div>
</div></div>`;
