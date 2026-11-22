const VO = 0.5;
const W0 = [["Dono", 0, 0.28], ["de", 0.32, 0.4], ["Kwid,", 0.48, 1.04], ["olha", 1.12, 1.28], ["isso.", 1.36, 1.68], ["O", 2.08, 2.12], ["motor", 2.16, 2.4], ["dele", 2.48, 2.8], ["não", 2.88, 3.04], ["tem", 3.2, 3.36], ["correia", 3.44, 3.68], ["dentada:", 3.8, 4.56], ["o", 4.6, 4.64], ["comando", 4.72, 5.04], ["é", 5.08, 5.12], ["por", 5.2, 5.28], ["corrente,", 5.4, 6.08], ["sem", 6.2, 6.32], ["troca", 6.4, 6.64], ["programada.", 6.72, 7.36], ["Se", 7.76, 7.84], ["aparecer", 7.92, 8.32], ["troca", 8.4, 8.64], ["de", 8.72, 8.76], ["correia", 8.8, 9.12], ["dentada", 9.24, 9.52], ["no", 9.6, 9.653], ["orçamento,", 9.707, 10.4], ["desconfia.", 10.52, 11.4], ["Ele", 11.68, 11.76], ["tem", 11.84, 12.08], ["três", 12.16, 12.32], ["cilindros:", 12.4, 13.2], ["são", 13.32, 13.44], ["três", 13.52, 13.76], ["velas,", 13.84, 14.4], ["não", 14.48, 14.64], ["quatro.", 14.72, 15.32], ["E", 15.52, 15.6], ["a", 15.627, 15.653], ["revisão", 15.68, 16.24], ["é", 16.32, 16.36], ["a", 16.4, 16.44], ["cada", 16.48, 16.8], ["10.000 km", 16.92, 17.84], ["ou", 18, 18.08], ["um", 18.16, 18.24], ["ano,", 18.32, 18.72], ["o", 18.76, 18.8], ["que", 18.84, 18.88], ["vier", 18.96, 19.12], ["primeiro.", 19.2, 19.8], ["Rodou", 20, 20.32], ["pouco?", 20.4, 21.04], ["Vence", 21.08, 21.36], ["igual.", 21.44, 22.16], ["Manda", 22.2, 22.4], ["pra", 22.48, 22.56], ["quem", 22.6, 22.72], ["tem", 22.8, 22.96], ["Kwid.", 23, 23.68], ["Você", 23.8, 23.92], ["já", 23.96, 24.08], ["sabia?", 24.133, 24.88], ["Comenta", 24.92, 25.2], ["aí.", 25.24, 25.68]];
const T = {total: 31, s1:[0,2.5], s2:[2.5,8.1], s3:[8.1,12.05], s4:[12.05,16.1], s5:[16.1,22.68], s6:[22.68,24.25], s7:[24.25,27.2], s8:[27.2,31],
  breaks: [0, 5, 12, 17, 20, 25, 29, 33, 38, 44, 48, 52, 54, 56, 61, 64]};
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
// desenhos nossos (genéricos): carro compacto, motor 3 cilindros com corrente, vela de ignição
const HATCH = `<svg width="760" height="330" viewBox="0 0 760 330" style="overflow:visible">
 <path d="M70 232 L86 176 Q94 156 122 150 L236 140 L312 78 Q330 64 356 64 L506 64 Q534 64 552 84 L622 146 L676 160 Q712 168 714 200 L716 238 Q716 252 700 252 L80 252 Q64 252 70 232Z" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
 <path d="M330 90 L282 140 H436 V90Z M464 90 V140 H600 L544 96 Q538 90 528 90Z" fill="rgba(58,199,255,.18)" stroke="#3ac7ff" stroke-width="6" stroke-linejoin="round"/>
 <rect x="60" y="214" width="660" height="18" rx="9" fill="rgba(58,199,255,.25)"/>
 <circle cx="196" cy="254" r="64" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="196" cy="254" r="22" fill="#97a7b7"/>
 <circle cx="578" cy="254" r="64" fill="#0b1626" stroke="#e8f1f8" stroke-width="12"/><circle cx="578" cy="254" r="22" fill="#97a7b7"/>
 <rect x="684" y="180" width="28" height="20" rx="6" fill="#f9c718"/>
</svg>`;
const CPATH = 'M480 190 A80 80 0 0 1 640 190 L616 620 A56 56 0 0 1 504 620 Z';
const CHAINP = (d) => `<path d="${d}" fill="none" stroke="#c9d3dd" stroke-width="26" stroke-dasharray="26 8" style="animation:chain42 1.2s linear infinite"/>
 <path d="${d}" fill="none" stroke="#0b1626" stroke-width="9" stroke-dasharray="26 8" style="animation:chain42 1.2s linear infinite"/>`;
const GEAR = (cx, cy, r, dur) => `<g style="transform-origin:${cx}px ${cy}px;transform-box:view-box;animation:rot42 ${dur}s linear infinite">
 ${Array.from({length: 12}, (_, k) => `<rect x="${cx - 9}" y="${cy - r - 16}" width="18" height="26" rx="4" fill="#e8f1f8" transform="rotate(${k * 30} ${cx} ${cy})"/>`).join('')}
 <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/><path d="M${cx} ${cy - r + 14} V${cy + r - 14} M${cx - r + 14} ${cy} H${cx + r - 14}" stroke="#97a7b7" stroke-width="8"/></g>`;
const ENGC = `<svg width="820" height="860" viewBox="0 0 820 860" style="overflow:visible">
 <rect x="60" y="560" width="700" height="260" rx="30" fill="rgba(242,181,59,.22)"/>
 <rect x="60" y="40" width="700" height="780" rx="40" fill="none" stroke="#3ac7ff" stroke-width="10"/>
 ${[0,1,2].map(i => `<rect x="${110 + i * 110}" y="110" width="80" height="250" rx="12" fill="rgba(58,199,255,.06)" stroke="#97a7b7" stroke-width="8"/><rect x="${118 + i * 110}" y="${190 + (i % 2) * 60}" width="64" height="56" rx="8" fill="#97a7b7" opacity=".7"/>`).join('')}
 ${CHAINP(CPATH)}
 ${GEAR(560, 190, 70, 2)}${GEAR(560, 620, 46, 1)}
</svg>`;
// vela de ignição desenhada (sem marca)
const PLUG = (spark) => `<svg width="120" height="440" viewBox="0 0 120 440" style="overflow:visible">
 <rect x="44" y="0" width="32" height="40" rx="8" fill="#c9d3dd"/>
 <path d="M30 40 H90 L84 190 H36Z" fill="#f2f6fa" stroke="#c9d3dd" stroke-width="4"/>
 ${[70, 100, 130, 160].map(y => `<rect x="34" y="${y}" width="52" height="8" rx="4" fill="#dfe7ee"/>`).join('')}
 <path d="M14 190 H106 L98 250 H22Z" fill="#97a7b7"/><path d="M60 190 L106 220 L60 250 L14 220Z" fill="#7d8c9b" opacity=".6"/>
 ${[262, 290, 318, 346].map(y => `<rect x="30" y="${y}" width="60" height="18" rx="4" fill="#b4c1cd"/>`).join('')}
 <rect x="54" y="372" width="12" height="28" fill="#97a7b7"/><path d="M44 404 H84 V420 H70" fill="none" stroke="#c9d3dd" stroke-width="8"/>
 ${spark ? `<g style="transform-origin:60px 428px;animation:spark42 .5s ease-in-out ${spark}s infinite"><path d="M60 404 L50 426 L62 424 L54 446" fill="none" stroke="#3ac7ff" stroke-width="6" stroke-linejoin="round"/><circle cx="60" cy="428" r="22" fill="rgba(58,199,255,.35)"/></g>` : ''}
</svg>`;
const row = (cls, em, txt, at) => `<div class="r ${cls}" style="animation:${A('stIn', .45, at)}"><span>${txt}</span><em style="opacity:0;animation:${A('popb', .4, at + .25, BOUNCE)}">${em}</em></div>`;
let h = '';

// CENA 1: gancho, DONO DE KWID
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>SEU KWID</span></div>
  <div class="hd c" style="top:290px;font-size:110px">${still('Dono de')}</div>
  <div class="e42big" style="top:420px">KWID</div>
  <div class="hd c" style="top:720px;font-size:96px">${still('olha isso 👀')}</div>
  <div class="e42p" style="left:160px;top:900px;animation:${A('stIn', .5, .15)}">${HATCH}</div>
  <div class="stamp" style="top:1340px;--r:-6deg;font-size:92px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(3) - .1, BOUNCE)}">3 COISAS</div>
</div></div>`;

// CENA 2: sem correia dentada, comando por corrente, sem troca programada
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:150px;font-size:80px;line-height:1.06">${words('Sem correia dentada', W(8), .16)}<br>${neonWords('comando por corrente', W(13), .14)}</div>
  <div class="e42p" style="left:130px;top:470px;animation:${A('stIn', .5, W(5) - .2)}">${ENGC}</div>
  <div class="abs" style="left:150px;top:380px;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:36px;animation:${A('popb', .45, W(10), BOUNCE)}">❌ Correia dentada</span></div>
  <div class="abs" style="left:700px;top:380px;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:36px;animation:${A('popb', .45, W(16), BOUNCE)}">⛓️ Corrente</span></div>
  <div class="abs" style="left:0;right:0;top:1320px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:40px;animation:${A('popb', .45, W(17), BOUNCE)}">📆 Sem troca programada</span></div>
</div></div>`;

// CENA 3: se aparecer troca de correia dentada no orçamento, desconfia
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:170px;font-size:88px;line-height:1.06">${words('Apareceu no', W(20), .12)}<br>${neonWords('orçamento?', W(27), .12)}</div>
  <div class="e42orc" style="left:130px;right:130px;top:470px;animation:${A('stIn', .5, T.s3[0] + .1)}"><h4>ORÇAMENTO · KWID 1.0</h4><div class="sub">exemplo</div>
    ${row('ok', '✓', '🛢️ Óleo e filtro de óleo', T.s3[0] + .35)}
    ${row('ok', '✓', 'Filtro de ar', T.s3[0] + .6)}
    <div class="r bad" style="animation:${A('stIn', .45, W(22))}"><span>Troca da correia dentada</span><em style="opacity:0;animation:${A('popb', .4, W(24), BOUNCE)}">?</em><i class="e42mark" style="animation:${A('ring42', .35, W(27), BOUNCE)}"></i></div>
  </div>
  <div class="stamp" style="top:1160px;--r:-5deg;font-size:96px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(28), BOUNCE)}">DESCONFIA</div>
</div></div>`;

// CENA 4: 3 cilindros, 3 velas, não 4
const px = [150, 370, 590, 810];
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:170px;font-size:96px;line-height:1.06">${words('3 cilindros', W(31), .14)}<br>${neonWords('= 3 velas', W(34), .14)}</div>
  ${px.slice(0, 3).map((x, k) => `<div class="e42plug" style="left:${x}px;top:520px;animation:${A('popb', .45, W(31) + k * .25, BOUNCE)}">${PLUG(W(35) + k * .15)}</div><div class="e42num" style="left:${x}px;top:990px;animation:${A('popb', .4, W(34) + k * .18 + .2, BOUNCE)}">${k + 1}</div>`).join('')}
  <div class="e42plug off" style="left:${px[3]}px;top:520px;animation:${A('fade', .4, W(36))}">${PLUG(0)}</div>
  <i class="e42x" style="left:${px[3] - 40}px;width:200px;top:730px;--r:45deg;animation:${A('x42', .3, W(37), 'ease-out')}"></i>
  <i class="e42x" style="left:${px[3] - 40}px;width:200px;top:730px;--r:-45deg;animation:${A('x42', .3, W(37) + .12, 'ease-out')}"></i>
  <div class="abs" style="left:0;right:0;top:1140px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:42px;animation:${A('popb', .45, W(35) + .1, BOUNCE)}">🔩 1 vela por cilindro</span></div>
  <div class="abs" style="left:0;right:0;top:1280px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:40px;animation:${A('popb', .45, W(37), BOUNCE)}">❌ 4 velas no orçamento</span></div>
</div></div>`;

// CENA 5: revisão a cada 10.000 km ou 1 ano; rodou pouco? vence igual
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:160px;font-size:96px">${neonWords('Revisão:', W(40), .14)}</div>
  <div class="e42card" style="left:100px;top:330px;animation:${A('stIn', .5, W(44) - .2)}"><em>🛣️</em><b>10.000 km</b></div>
  <div class="e42ou" style="top:450px;animation:${A('popb', .4, W(45), BOUNCE)}">OU</div>
  <div class="e42card" style="left:620px;top:330px;border-color:rgba(249,199,24,.6);animation:${A('stIn', .5, W(46) - .1)}"><em>📅</em><b>1 ano</b></div>
  <div class="abs" style="left:0;right:0;top:700px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:42px;animation:${A('popb', .45, W(48), BOUNCE)}">⏰ O que vier primeiro</span></div>
  <div class="e42blab" style="top:860px;color:#9fdcff;animation:${A('fade', .4, W(52))}">🛣️ Rodou pouco: 3.000 km</div>
  <div class="e42bar" style="top:925px;animation:${A('fade', .4, W(52))}"><i style="background:var(--neon);--to:.3;animation:${A('fill42', .9, W(52) + .2)}"></i></div>
  <div class="e42blab" style="top:1010px;color:#ffe28a;animation:${A('fade', .4, W(53))}">📅 12 meses</div>
  <div class="e42bar" style="top:1075px;animation:${A('fade', .4, W(53))}"><i style="background:linear-gradient(90deg,var(--warn),var(--bad));--to:1;animation:${A('fill42', 1, W(53) + .1)}"></i></div>
  <div class="stamp" style="top:1270px;--r:-5deg;font-size:88px;white-space:nowrap;animation:${A('pop', .5, W(54), BOUNCE)}">VENCE IGUAL</div>
</div></div>`;

// CENA 6: manda pra quem tem Kwid
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:100px;line-height:1.06">${words('Manda pra quem', W(56), .1)}<br>${neonWords('tem Kwid', W(59), .12)}</div>
  <div class="e42send" style="top:600px;animation:${A('fly42', 1.4, W(56))}">📤</div>
  <div class="e42chat" style="top:940px;animation:${A('stIn', .5, W(57))}">Seu Kwid tem corrente e 3 velas. Olha isso 👀</div>
</div></div>`;

// CENA 7: você já sabia? comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:260px;font-size:110px;line-height:1.06">${words('Você', W(61), .1)}<br>${neonWords('já sabia?', W(62), .14)}</div>
  <div class="abs" style="left:0;right:0;top:640px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(63), BOUNCE)}">✅ Sabia</span><span class="pillx wa" style="position:relative;animation:${A('popb', .45, W(63) + .25, BOUNCE)}">😮 Não sabia</span></div>
  <div class="abs" style="left:0;right:0;top:880px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(64) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
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
