const VO = 0.5;
const W0 = [["Gasolina",0,0.48],["aditivada",0.52,1.2],["dá",1.36,1.48],["mais",1.52,1.68],["potência?",1.8,2.52],["Mito.",2.8,3.44],["A",3.68,3.76],["aditivada",3.84,4.48],["tem",4.56,4.64],["a",4.68,4.72],["mesma",4.88,5.12],["octanagem",5.24,5.68],["da",5.76,5.84],["comum.",5.96,6.56],["A",6.6,6.64],["diferença",6.72,7.28],["são",7.36,7.44],["os",7.52,7.6],["aditivos",7.68,8.16],["que",8.24,8.32],["limpam.",8.4,9.12],["Eles",9.16,9.36],["ajudam",9.44,9.76],["a",9.8,9.84],["evitar",9.92,10.24],["sujeira",10.36,10.72],["no",10.8,10.88],["bico",10.92,11.12],["injetor",11.16,11.68],["e",11.72,11.76],["nas",11.84,11.92],["válvulas.",12,12.8],["Ou",12.853,12.96],["seja:",13.08,13.6],["ela",13.72,13.84],["não",14,14.24],["deixa",14.28,14.48],["o",14.52,14.56],["carro",14.64,14.8],["mais",14.84,15.04],["forte.",15.2,15.76],["Ajuda",15.88,16.16],["a",16.2,16.24],["manter",16.32,16.48],["o",16.56,16.6],["motor",16.64,16.96],["limpo",17.04,17.36],["com",17.4,17.44],["o",17.52,17.6],["tempo.",17.76,18.32],["Na",18.4,18.48],["dúvida,",18.56,19.12],["confira",19.24,19.44],["o",19.48,19.52],["manual.",19.72,20.32],["E",20.36,20.4],["você,",20.48,21.12],["usa",21.2,21.36],["aditivada?",21.44,22.32],["Comenta",22.36,22.64],["aí.",22.68,23.12]];
const T = {total: 29, s1:[0,4.25], s2:[4.25,7.05], s3:[7.05,13.55], s4:[13.55,20.8], s5:[20.8,29],
  breaks: [0, 5, 6, 11, 14, 19, 21, 26, 29, 32, 34, 39, 41, 46, 50, 52, 55, 59]};
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
// desenhos nossos (genéricos): bomba de combustível, bico injetor, válvula, marcador de potência
const PUMP = (w, c, lab) => `<svg width="${w}" height="${w * 460 / 300}" viewBox="0 0 300 460" style="overflow:visible">
 <rect x="40" y="40" width="180" height="390" rx="24" fill="rgba(58,199,255,.08)" stroke="${c}" stroke-width="10"/>
 <rect x="52" y="78" width="156" height="86" rx="12" fill="#0b1626" stroke="${c}" stroke-width="6"/>
 <text x="130" y="132" text-anchor="middle" font-family="Orbitron" font-weight="700" font-size="${lab.length > 6 ? 19 : 26}" fill="${c}">${lab}</text>
 <rect x="80" y="200" width="100" height="16" rx="8" fill="${c}" opacity=".5"/><rect x="80" y="232" width="100" height="16" rx="8" fill="${c}" opacity=".3"/>
 <rect x="18" y="426" width="224" height="26" rx="10" fill="${c}"/>
 <path d="M220 190 Q300 196 286 300 L276 352" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
 <path d="M252 352 H300 L310 392 H278 L270 372 H252Z" fill="${c}"/>
</svg>`;
const INJ = `<svg width="200" height="370" viewBox="0 0 200 370" style="overflow:visible">
 <rect x="80" y="0" width="40" height="34" rx="6" fill="#97a7b7"/>
 <rect x="58" y="30" width="84" height="190" rx="20" fill="rgba(58,199,255,.1)" stroke="#3ac7ff" stroke-width="9"/>
 <path d="M58 80 H142 M58 170 H142" stroke="#3ac7ff" stroke-width="6" opacity=".6"/>
 <path d="M76 220 H124 L110 290 H90Z" fill="#e8f1f8"/>
</svg>`;
const SPRAY = `<svg width="200" height="370" viewBox="0 0 200 370" style="overflow:visible"><path d="M100 296 L46 368 M100 296 L154 368 M100 296 L100 372 M100 296 L72 372 M100 296 L128 372" stroke="#9be3ff" stroke-width="6" stroke-linecap="round" stroke-dasharray="4 12"/></svg>`;
const VALVE = `<svg width="200" height="370" viewBox="0 0 200 370" style="overflow:visible">
 <rect x="90" y="0" width="20" height="270" rx="8" fill="#c9d3dd"/>
 <rect x="82" y="30" width="36" height="22" rx="6" fill="#97a7b7"/>
 <path d="M18 320 Q100 250 182 320 L172 340 H28Z" fill="rgba(58,199,255,.12)" stroke="#3ac7ff" stroke-width="9" stroke-linejoin="round"/>
</svg>`;
const GAUGE36 = `<svg width="520" height="300" viewBox="0 0 520 300">
 <path d="M60 270 A200 200 0 0 1 460 270" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="30" stroke-linecap="round"/>
 <path d="M60 270 A200 200 0 0 1 160 97" fill="none" stroke="#3ac7ff" stroke-width="30" stroke-linecap="round" opacity=".8"/>
 <path d="M360 97 A200 200 0 0 1 460 270" fill="none" stroke="#f94144" stroke-width="30" stroke-linecap="round" opacity=".5"/>
 <circle cx="260" cy="270" r="22" fill="#e8f1f8"/>
</svg>`;
const dirt = (pts, at) => pts.map(([x, y, r], k) => `<div class="e36dirt" style="left:${x}px;top:${y}px;width:${r}px;height:${r}px;animation:${A('clean36', .5, at + k * .07)}"></div>`).join('');
const spk = (pts, at) => pts.map(([x, y], k) => `<div class="e36spk" style="left:${x}px;top:${y}px;animation:${A('tw36', .6, at + k * .12)}">✨</div>`).join('');
let h = '';

// CENA 1: gancho, bomba ADITIVADA, "+ potência?" e carimbo MITO
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie"><span>MITO OU VERDADE?</span></div>
  <div class="hd c" style="top:270px;left:30px;right:30px;font-size:100px;line-height:1.04;white-space:nowrap">${still('Gasolina')}<br>${still('aditivada','neon')}<br>${still('dá mais potência?')}</div>
  <div class="e36p" style="left:390px;top:700px;animation:${A('popb', .5, .15, BOUNCE)}">${PUMP(280, '#41d686', 'ADITIVADA')}</div>
  <div class="e36q" style="left:40px;top:760px;white-space:nowrap;animation:${A('popb', .45, W(3), BOUNCE)}"><span class="pillx ok" style="position:relative;opacity:1;font-size:42px">💪 + força?</span></div>
  <div class="e36q" style="left:620px;top:930px;white-space:nowrap;animation:${A('popb', .45, W(4), BOUNCE)}"><span class="pillx ok" style="position:relative;opacity:1;font-size:42px">⚡ + potência?</span></div>
  <div class="stamp" style="top:1250px;--r:-8deg;font-size:150px;white-space:nowrap;animation:${A('pop', .5, W(5) - .1, BOUNCE)}">MITO</div>
</div></div>`;

// CENA 2: mesma octanagem da comum
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:200px;font-size:92px;line-height:1.06">${words('A aditivada tem a', W(6), .1)}<br>${neonWords('mesma octanagem', W(10), .14)}<br>${words('da comum.', W(12), .14)}</div>
  <div class="e36p" style="left:110px;top:620px;animation:${A('stIn', .5, W(6))}">${PUMP(260, '#e8f1f8', 'COMUM')}</div>
  <div class="e36p" style="left:700px;top:620px;animation:${A('stIn', .5, W(7))}">${PUMP(260, '#41d686', 'ADITIVADA')}</div>
  <div class="e36eq" style="left:478px;top:760px;animation:${A('popb', .45, W(11), BOUNCE)}">=</div>
  <div class="e36lab" style="left:60px;width:960px;top:1060px;animation:${A('fade', .4, W(11) - .2)}">OCTANAGEM</div>
  <div class="e36bar" style="left:90px;width:380px;top:1120px;animation:${A('fade', .3, W(11) - .2)}"><i style="animation:${A('bar36', .9, W(11))}"></i></div>
  <div class="e36bar" style="left:610px;width:380px;top:1120px;animation:${A('fade', .3, W(11) - .2)}"><i style="animation:${A('bar36', .9, W(11))}"></i></div>
</div></div>`;

// CENA 3: a diferença são os aditivos que limpam (bico injetor e válvulas)
const card = (x, at, art, dpts, spts, lab, ckAt, extra = '') => `<div class="e36cd" style="left:${x}px;animation:${A('stIn', .5, at)}">
  <div class="e36art">${art}${extra}</div>
  ${dirt(dpts, ckAt - .5)}${spk(spts, ckAt - .3)}
  <b>${lab}</b><div class="ck" style="animation:${A('popb', .4, ckAt, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:200px;font-size:92px;line-height:1.06">${words('A diferença:', W(14), .14)}<br>${neonWords('aditivos que limpam', W(18), .14)}</div>
  ${card(70, W(21) - .3, INJ, [[192,300,26],[232,318,20],[206,342,22],[244,290,16],[178,330,14]], [[150,280],[260,330]], 'Bico injetor', W(28), `<div class="e36sp" style="position:absolute;left:0;top:0;animation:${A('fade', .4, W(28) - .1)}">${SPRAY}</div>`)}
  ${card(570, W(21) - .1, VALVE, [[150,322,24],[200,306,28],[250,322,22],[176,342,16],[228,346,18],[262,340,14]], [[130,300],[270,300]], 'Válvulas', W(30))}
  <div class="abs" style="left:0;right:0;top:1240px;text-align:center"><span class="pillx ok" style="position:relative;animation:${A('popb', .45, W(25), BOUNCE)}">🧽 Menos sujeira</span></div>
</div></div>`;

// CENA 4: não deixa mais forte; ajuda a manter limpo; confira o manual
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:190px;font-size:88px;line-height:1.06">${words('Ela não deixa o carro', W(34), .1)}<br>${redWords('mais forte.', W(39), .14)}</div>
  <div class="abs" style="left:280px;top:430px;width:520px;height:300px;animation:${A('popb', .5, W(34) - .2, BOUNCE)}">${GAUGE36}
    <div class="e36nd" style="animation:${an([A('up36', 1.0, W(36)), 'wig36 .5s ease-in-out ' + (W(36) + 1.0) + 's infinite'])}"></div>
    <div class="e36x" style="left:410px;top:-20px;animation:${A('popb', .4, W(40), BOUNCE)}">✕</div></div>
  <div class="e36lab" style="left:0;right:0;top:750px;animation:${A('fade', .4, W(35))}">POTÊNCIA</div>
  <div class="abs" style="left:0;right:0;top:860px;text-align:center"><span class="pillx ok" style="position:relative;font-size:42px;animation:${A('popb', .45, W(43), BOUNCE)}">✨ Ajuda a manter o motor limpo</span></div>
  <div class="abs" style="left:0;right:0;top:1010px;text-align:center"><span class="pillx wa" style="position:relative;font-size:42px;animation:${A('popb', .45, W(50), BOUNCE)}">📘 Na dúvida, confira o manual</span></div>
</div></div>`;

// CENA 5: comenta aí + fecho Dr. Jarvys
h += `<div class="scene" style="${sceneStyle(T.s5, true)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:190px;font-size:92px">${words('E você,', W(55), .12)}<br>${words('usa', W(57), .12)} ${neonWords('aditivada?', W(58), .12)}</div>
  <div class="abs" style="left:0;right:0;top:520px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(59) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
  <div class="sep" style="top:740px;animation:${A('fade', .5, 24.3)}"></div>
  <div class="abs" style="left:0;right:0;top:790px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, 24.5, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:895px;font-size:76px;line-height:1.08">${words('Dúvida do carro?', 24.8, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', 25.3, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1120px;text-align:center;font-size:58px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, 25.9)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1210px;text-align:center;font-size:34px;color:var(--muted);animation:${A('fade', .5, 26.3)}">Teste 30 dias grátis, sem cartão.</div>
</div></div>`;
