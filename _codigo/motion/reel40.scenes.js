const VO = 0.5;
const W0 = [["Dono",0,0.28],["de",0.32,0.4],["HB20,",0.48,1.68],["olha",1.76,1.92],["isso.",2.04,2.32],["O",2.72,2.8],["motor",2.96,3.12],["1.0",3.16,3.76],["de",3.84,4],["três",4.04,4.16],["cilindros",4.24,4.8],["não",4.96,5.12],["tem",5.28,5.44],["correia",5.52,5.76],["dentada:",5.88,6.56],["o",6.64,6.68],["comando",6.72,7.12],["é",7.16,7.2],["por",7.28,7.36],["corrente.",7.44,8.24],["Só",8.48,8.587],["que",8.613,8.64],["a",8.68,8.72],["corrente",8.8,9.2],["vive",9.36,9.6],["do",9.64,9.68],["óleo.",9.76,10.16],["Óleo",10.56,10.8],["velho",10.88,11.2],["ou",11.28,11.44],["errado",11.56,11.92],["pode",12.08,12.32],["castigar",12.44,12.8],["ela.",12.92,13.12],["O",13.52,13.6],["indicado",13.76,14.16],["é",14.24,14.4],["5W-30,",14.48,15.68],["confere",15.8,16],["no",16.08,16.16],["manual.",16.36,16.64],["E",17.04,17.12],["se",17.2,17.28],["vibrar",17.32,17.68],["mais",17.76,17.92],["com",18,18.08],["o",18.12,18.16],["carro",18.24,18.4],["parado,",18.48,19.12],["pede",19.2,19.36],["pra",19.4,19.44],["olhar",19.52,19.68],["o",19.72,19.76],["coxim.",19.88,20.24],["Manda",20.72,20.88],["pra",20.96,21.04],["quem",21.08,21.2],["tem",21.28,21.36],["HB20.",21.44,22.48],["E",22.507,22.533],["o",22.56,22.6],["seu,",22.64,23.12],["usa",23.24,23.36],["qual",23.48,23.6],["óleo?",23.64,23.92],["Comenta",24.16,24.48],["aí.",24.52,24.96]];
const T = {total: 30, s1:[0,3.1], s2:[3.1,8.85], s3:[8.85,13.9], s4:[13.9,17.4], s5:[17.4,21.1], s6:[21.1,23.0], s7:[23.0,25.9], s8:[25.9,30],
  breaks: [0, 3, 5, 8, 11, 15, 20, 24, 27, 31, 34, 38, 41, 45, 49, 54, 59, 65]};
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
// desenhos nossos (genéricos): carro compacto, motor 3 cilindros com corrente, corrente de perto, galão
const HATCH = `<svg width="760" height="330" viewBox="0 0 760 330" style="overflow:visible">
 <path d="M60 230 L80 170 Q90 150 120 146 L220 140 L300 70 Q318 56 345 56 L520 56 Q548 56 566 76 L640 146 L690 156 Q720 162 722 196 L724 236 Q724 250 708 250 L70 250 Q56 250 60 230Z" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
 <path d="M318 82 L270 140 H440 V82Z M468 82 V140 H610 L556 88 Q550 82 540 82Z" fill="rgba(58,199,255,.18)" stroke="#3ac7ff" stroke-width="6" stroke-linejoin="round"/>
 <circle cx="190" cy="252" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="190" cy="252" r="22" fill="#97a7b7"/>
 <circle cx="586" cy="252" r="62" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="586" cy="252" r="22" fill="#97a7b7"/>
 <rect x="690" y="176" width="30" height="20" rx="6" fill="#f9c718"/>
</svg>`;
// caminho da corrente entre as duas engrenagens
const CPATH = 'M480 190 A80 80 0 0 1 640 190 L616 620 A56 56 0 0 1 504 620 Z';
const CHAINP = (d, w = 1) => `<path d="${d}" fill="none" stroke="#c9d3dd" stroke-width="${26 * w}" stroke-dasharray="${26 * w} ${8 * w}" style="animation:chain40 1.2s linear infinite"/>
 <path d="${d}" fill="none" stroke="#0b1626" stroke-width="${9 * w}" stroke-dasharray="${26 * w} ${8 * w}" style="animation:chain40 1.2s linear infinite"/>`;
const GEAR = (cx, cy, r, dur) => `<g style="transform-origin:${cx}px ${cy}px;transform-box:view-box;animation:rot40 ${dur}s linear infinite">
 ${Array.from({length: 12}, (_, k) => `<rect x="${cx - 9}" y="${cy - r - 16}" width="18" height="26" rx="4" fill="#e8f1f8" transform="rotate(${k * 30} ${cx} ${cy})"/>`).join('')}
 <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/><path d="M${cx} ${cy - r + 14} V${cy + r - 14} M${cx - r + 14} ${cy} H${cx + r - 14}" stroke="#97a7b7" stroke-width="8"/></g>`;
const ENGC = (dark) => `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <defs><clipPath id="c40"><rect x="60" y="40" width="700" height="780" rx="40"/></clipPath>
 <linearGradient id="o40" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${dark ? '#2a1d08' : '#b07a1a'}"/><stop offset="1" stop-color="${dark ? '#4a3510' : '#f2b53b'}"/></linearGradient></defs>
 <g clip-path="url(#c40)">
  <rect x="40" y="560" width="760" height="280" fill="url(#o40)" opacity=".55"/>
  <path d="M40 560 Q120 530 200 560 T360 560 T520 560 T680 560 T840 560 V600 H40Z" fill="${dark ? '#4a3510' : '#f2b53b'}" opacity=".8" style="animation:wave40 2s ease-in-out infinite"/>
 </g>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${[0,1,2].map(i => `<rect x="${110 + i * 110}" y="110" width="80" height="250" rx="12" fill="rgba(58,199,255,.06)" stroke="#97a7b7" stroke-width="8"/><rect x="${118 + i * 110}" y="${190 + (i % 2) * 60}" width="64" height="56" rx="8" fill="#97a7b7" opacity=".7"/>`).join('')}
 ${CHAINP(CPATH)}
 ${GEAR(560, 190, 70, 2)}${GEAR(560, 620, 46, 1)}
</svg>`;
// corrente de perto (elos), deslizando
const LINKS = `<div style="position:relative;width:900px;height:200px;overflow:hidden;border-radius:30px">
 <div style="position:absolute;left:0;top:0;animation:slide40 1.1s linear infinite">
 <svg width="1200" height="200" viewBox="0 0 1200 200">${Array.from({length: 18}, (_, i) => `<rect x="${i * 68}" y="50" width="90" height="100" rx="44" fill="none" stroke="#c9d3dd" stroke-width="16"/><circle cx="${i * 68 + 22}" cy="100" r="12" fill="#97a7b7"/>`).join('')}</svg></div></div>`;
const JUG = `<svg width="300" height="380" viewBox="0 0 300 380" style="overflow:visible">
 <path d="M60 80 H200 L250 130 V350 Q250 370 230 370 H70 Q50 370 50 350 V90 Q50 80 60 80Z" fill="rgba(65,214,134,.14)" stroke="#41d686" stroke-width="10" stroke-linejoin="round"/>
 <rect x="80" y="30" width="70" height="50" rx="10" fill="#41d686"/>
 <path d="M200 80 Q260 60 262 120" fill="none" stroke="#41d686" stroke-width="10"/>
 <rect x="74" y="170" width="152" height="120" rx="14" fill="#0b1626" stroke="#41d686" stroke-width="6"/>
 <text x="150" y="226" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="#7ff0b3">5W-30</text>
 <text x="150" y="268" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#e8f1f8">MANUAL ✓</text>
</svg>`;
let h = '';

// CENA 1: gancho, DONO DE HB20
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>SEU HB20</span></div>
  <div class="hd c" style="top:290px;font-size:110px">${still('Dono de')}</div>
  <div class="e40big" style="top:420px">HB20</div>
  <div class="hd c" style="top:700px;font-size:96px">${still('olha isso 👀')}</div>
  <div class="e40p" style="left:160px;top:900px;animation:${A('stIn', .5, .15)}">${HATCH}</div>
  <div class="stamp" style="top:1290px;--r:-6deg;font-size:92px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(3) - .1, BOUNCE)}">SEM CORREIA?</div>
</div></div>`;

// CENA 2: motor 1.0 de 3 cilindros, comando por corrente
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:150px;font-size:80px;line-height:1.06">${words('Sem correia dentada', W(11), .14)}<br>${neonWords('comando por corrente', W(16), .14)}</div>
  <div class="e40p" style="left:130px;top:470px;animation:${A('stIn', .5, W(5) - .2)}">${ENGC(false)}</div>
  <div class="abs" style="left:150px;top:380px;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:36px;animation:${A('popb', .45, W(9), BOUNCE)}">1.0 · 3 cilindros</span></div>
  <div class="abs" style="left:690px;top:380px;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:36px;animation:${A('popb', .45, W(13), BOUNCE)}">❌ Correia</span></div>
  <div class="abs" style="left:0;right:0;top:1310px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:36px;animation:${A('popb', .45, W(16) + .2, BOUNCE)}">⛓️ Corrente</span></div>
</div></div>`;

// CENA 3: a corrente vive do óleo; óleo velho ou errado castiga
const ddrops = (pts, at) => pts.map(([x, y, dy, d], k) => `<div class="e40drop" style="left:${x}px;top:${y}px;--dy:${dy}px;animation:fall40 ${d}s ease-in ${at + k * .2}s infinite"></div>`).join('');
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:180px;font-size:92px;line-height:1.06">${words('A corrente', W(22), .14)}<br>${neonWords('vive do óleo', W(24), .14)}</div>
  <div class="e40p" style="left:90px;top:700px;animation:${A('stIn', .5, W(20) - .2)}">${LINKS}</div>
  <div class="e40p" style="left:0;top:0">${ddrops([[200, 470, 230, 1.1], [520, 450, 250, 1.2], [760, 480, 220, 1.0], [360, 490, 210, 1.15], [640, 460, 240, 1.25]], W(27))}</div>
  <div class="abs" style="left:0;right:0;top:960px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:42px;margin-right:24px;animation:${A('popb', .45, W(28), BOUNCE)}">🛢️ Óleo velho</span><span class="pillx bad" style="position:relative;font-size:42px;animation:${A('popb', .45, W(30), BOUNCE)}">❌ Óleo errado</span></div>
  <div class="abs" style="left:0;right:0;top:1150px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:42px;animation:${A('popb', .45, W(32), BOUNCE)}">⚠️ Castiga a corrente</span></div>
</div></div>`;

// CENA 4: o indicado é 5W-30, confere no manual
const okc = (y, at, em, txt) => `<div class="e40ok" style="top:${y}px;animation:${A('stIn', .5, at - .35)}"><em>${em}</em><b>${txt}</b><div class="ck" style="animation:${A('popb', .4, at + .15, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:180px;font-size:104px">${neonWords('O indicado:', W(34), .16)}</div>
  <div class="e40p" style="left:390px;top:340px;animation:${A('popb', .5, W(35), BOUNCE)}">${JUG}</div>
  ${okc(780, W(37), '🛢️', 'Óleo 5W-30')}
  ${okc(1020, W(38), '📘', 'Confere no manual')}
</div></div>`;

// CENA 5: vibrou mais parado? olha o coxim
const vibs = (at) => [[150, 930, 120], [110, 990, 80], [930, 930, 120], [970, 990, 80]].map(([x, y, hh], k) => `<div class="e40vib" style="left:${x}px;top:${y}px;height:${hh}px;animation:vib40 .35s ease-in-out ${at + k * .08}s infinite"></div>`).join('');
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:180px;font-size:92px;line-height:1.06">${words('Vibrou mais', W(43), .14)}<br>${words('com o carro parado?', W(45), .1)}</div>
  <div class="e40p" style="left:160px;top:820px;animation:shake40 .18s linear ${W(43)}s infinite">${HATCH}</div>
  ${vibs(W(43))}
  <div class="hd c" style="top:520px;font-size:96px">${neonWords('Olha o coxim', W(51), .14)}</div>
  <div class="e40mount" style="animation:${A('popb', .45, W(53), BOUNCE)}">COXIM</div>
  <div class="e40lab" style="left:0;right:0;text-align:center;top:1290px;font-size:30px;animation:${A('fade', .4, W(53) + .2)}">A PEÇA QUE SEGURA O MOTOR</div>
</div></div>`;

// CENA 6: manda pra quem tem HB20
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('Manda pra quem', W(54), .1)}<br>${neonWords('tem HB20', W(57), .12)}</div>
  <div class="e40send" style="top:600px;animation:${A('fly40', 1.4, W(54))}">📤</div>
  <div class="e40chat" style="top:940px;animation:${A('stIn', .5, W(55))}">Seu HB20 tem corrente, não correia. Olha isso 👀</div>
</div></div>`;

// CENA 7: comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:260px;font-size:100px;line-height:1.06">${words('E o seu,', W(59), .1)}<br>${neonWords('usa qual óleo?', W(62), .12)}</div>
  <div class="abs" style="left:0;right:0;top:640px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(64), BOUNCE)}">🛢️ 5W-30</span><span class="pillx wa" style="position:relative;animation:${A('popb', .45, W(64) + .25, BOUNCE)}">❓ Nem sei</span></div>
  <div class="abs" style="left:0;right:0;top:880px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(65) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
</div></div>`;

// CENA 8: fecho com a logo grande
const F = T.s8[0];
h += `<div class="scene" style="${sceneStyle(T.s8, true)}"><div class="cam" style="${camStyle(T.s8)}">
  <img class="e40logo" src="${ICON}" style="animation:${A('popb', .6, F + .1, BOUNCE)}">
  <div class="abs" style="left:0;right:0;top:720px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, F + .5, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:830px;font-size:76px;line-height:1.08">${words('Dúvida do carro?', F + .7, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', F + 1.1, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:66px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, F + 1.7)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1160px;text-align:center;font-size:46px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, F + 2.1)}">App 100% grátis</div>
</div></div>`;
