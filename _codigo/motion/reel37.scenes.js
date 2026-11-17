const VO = 0.5;
const W0 = [["Você",0,0.24],["confere",0.36,0.64],["o",0.68,0.72],["óleo",0.76,0.88],["no",0.96,1.04],["posto?",1.2,1.52],["Tá",1.92,2.04],["fazendo",2.08,2.4],["errado.",2.52,2.96],["Com",3.28,3.36],["o",3.4,3.44],["motor",3.6,3.76],["quente,",3.84,4.4],["parte",4.52,4.72],["do",4.76,4.8],["óleo",4.88,5.04],["ainda",5.12,5.36],["não",5.44,5.6],["desceu",5.72,6],["pro",6.08,6.16],["cárter.",6.24,6.8],["A",6.96,7.04],["vareta",7.08,7.44],["mostra",7.48,7.84],["menos",7.96,8.16],["do",8.2,8.24],["que",8.32,8.4],["tem,",8.48,8.88],["e",8.92,8.96],["você",9,9.2],["completa",9.28,9.76],["sem",9.84,10],["precisar.",10.12,10.72],["Óleo",10.88,11.12],["demais",11.24,11.6],["também",11.68,12.08],["faz",12.12,12.32],["mal.",12.44,12.72],["O",12.88,12.96],["certo:",13.04,13.76],["carro",13.84,14],["no",14.08,14.16],["plano,",14.24,14.8],["motor",14.96,15.12],["frio,",15.28,15.76],["vareta",15.8,16.16],["limpa.",16.24,16.8],["Manda",16.96,17.28],["pra",17.32,17.36],["quem",17.44,17.52],["completa",17.6,18],["no",18.08,18.16],["posto.",18.32,18.88],["E",18.92,18.96],["você,",19,19.52],["confere",19.68,20],["onde?",20.08,20.72],["Comenta",20.8,21.04],["aí.",21.08,21.52]];
const T = {total: 28, s1:[0,3.6], s2:[3.6,7.3], s3:[7.3,13.2], s4:[13.2,17.3], s5:[17.3,19.25], s6:[19.25,28],
  breaks: [0, 6, 9, 13, 21, 24, 28, 33, 38, 40, 43, 47, 53, 57]};
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
// desenhos nossos (genéricos): bomba, vareta, motor com cárter
const PUMP = (w, c, lab) => `<svg width="${w}" height="${w * 460 / 300}" viewBox="0 0 300 460" style="overflow:visible">
 <rect x="40" y="40" width="180" height="390" rx="24" fill="rgba(58,199,255,.08)" stroke="${c}" stroke-width="10"/>
 <rect x="52" y="78" width="156" height="86" rx="12" fill="#0b1626" stroke="${c}" stroke-width="6"/>
 <text x="130" y="132" text-anchor="middle" font-family="Orbitron" font-weight="700" font-size="26" fill="${c}">${lab}</text>
 <rect x="80" y="200" width="100" height="16" rx="8" fill="${c}" opacity=".5"/><rect x="80" y="232" width="100" height="16" rx="8" fill="${c}" opacity=".3"/>
 <rect x="18" y="426" width="224" height="26" rx="10" fill="${c}"/>
 <path d="M220 190 Q300 196 286 300 L276 352" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
 <path d="M252 352 H300 L310 392 H278 L270 372 H252Z" fill="${c}"/>
</svg>`;
const ENGINE = `<svg width="600" height="700" viewBox="0 0 600 700" style="overflow:visible">
 <rect x="110" y="0" width="380" height="140" rx="26" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10"/>
 <path d="M170 40 H430" stroke="#3ac7ff" stroke-width="8" opacity=".5" stroke-linecap="round"/>
 <path d="M80 150 H520 V470 H80Z" fill="rgba(58,199,255,.06)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
 <rect x="170" y="190" width="100" height="230" rx="14" fill="none" stroke="#97a7b7" stroke-width="8"/>
 <rect x="330" y="190" width="100" height="230" rx="14" fill="none" stroke="#97a7b7" stroke-width="8"/>
 <rect x="180" y="300" width="80" height="60" rx="8" fill="#97a7b7" opacity=".6"/><rect x="340" y="250" width="80" height="60" rx="8" fill="#97a7b7" opacity=".6"/>
 <path d="M80 480 H520 L480 680 H120Z" fill="rgba(58,199,255,.06)" stroke="#3ac7ff" stroke-width="10" stroke-linejoin="round"/>
</svg>`;
const STICK = (x, y, h, low, over, lowAt, overAt) => `
 <div class="e37ring" style="left:${x - 65}px;top:${y - 128}px"></div>
 <div class="e37stick" style="left:${x}px;top:${y}px;height:${h}px">
  <div class="e37oil" style="--h:${low}px;animation:${A('lv37', .9, lowAt)}"></div>
  ${over ? `<div class="e37over" style="--h:${over}px;animation:${an([A('fade', .2, overAt), A('lv37', .9, overAt)])}"></div>` : ''}
 </div>
 <div class="e37mk" style="left:${x - 30}px;width:116px;top:${y + h - 320}px"></div>
 <div class="e37mk" style="left:${x - 30}px;width:116px;top:${y + h - 140}px"></div>`;
const drops = (pts, at) => pts.map(([x, y, dy, d], k) => `<div class="e37drop" style="left:${x}px;top:${y}px;--dy:${dy}px;animation:fall37 ${d}s ease-in ${at + k * .22}s infinite"></div>`).join('');
let h = '';

// CENA 1: gancho, bomba do posto, vareta e carimbo TÁ ERRADO
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie todo"><span>VOCÊ FAZ ISSO TODO DIA</span></div>
  <div class="hd c" style="top:270px;left:30px;right:30px;font-size:104px;line-height:1.04;white-space:nowrap">${still('Você confere')}<br>${still('o óleo','neon')}<br>${still('no posto?')}</div>
  <div class="e37p" style="left:110px;top:700px;animation:${A('popb', .5, .15, BOUNCE)}">${PUMP(260, '#e8f1f8', 'POSTO')}</div>
  <div class="e37p" style="left:560px;top:690px;width:420px;height:560px;transform:rotate(14deg);animation:${A('fade', .4, .3)}">${STICK(180, 110, 420, 120, 0, .6, 0)}</div>
  <div class="stamp" style="top:1250px;--r:-8deg;font-size:120px;white-space:nowrap;animation:${A('pop', .5, W(6) - .1, BOUNCE)}">TÁ ERRADO</div>
</div></div>`;

// CENA 2: motor quente, o óleo ainda não desceu pro cárter
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:190px;font-size:84px;line-height:1.06">${redWords('Motor quente:', W(11), .14)}<br>${words('o óleo ainda', W(15), .12)}<br>${neonWords('não desceu', W(17), .14)}</div>
  <div class="e37p" style="left:150px;top:560px;animation:${A('stIn', .5, W(9) - .2)}">${ENGINE}
    <div style="position:absolute;left:120px;right:120px;bottom:20px;height:70px;border-radius:0 0 30px 30px;background:linear-gradient(0deg,#b07a1a,#f2b53b);opacity:.85;animation:${A('fade', .4, W(13))}"></div>
    ${drops([[100, 170, 320, 1.3], [470, 190, 300, 1.4], [250, 160, 330, 1.5], [360, 170, 320, 1.3], [140, 230, 270, 1.2], [440, 240, 260, 1.25]], W(16))}
  </div>
  <div class="thermo" style="left:880px;top:600px;height:380px;animation:${A('fade', .4, W(11) - .2)}"><i style="animation:${A('fillT', 1.2, W(11))}"></i></div>
  <div class="e37heat" style="left:870px;top:520px;animation:heat37 1.4s ease-out ${W(12)}s infinite">🔥</div>
  <div class="e37lab" style="left:0;right:0;text-align:center;top:1300px;animation:${A('fade', .4, W(20) - .2)}">CÁRTER</div>
</div></div>`;

// CENA 3: a vareta mostra menos, completa sem precisar, óleo demais faz mal
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:190px;font-size:88px;line-height:1.06">${words('A vareta mostra', W(21), .12)}<br>${neonWords('menos do que tem', W(24), .12)}</div>
  <div style="position:absolute;left:0;top:0;animation:${A('stIn', .5, W(21) - .3)}">${STICK(300, 560, 820, 150, 440, W(22), W(33))}
    <div class="e37tag" style="left:110px;top:1036px;color:var(--fg)">MAX</div>
    <div class="e37tag" style="left:120px;top:1216px;color:var(--fg)">MIN</div></div>
  <div style="position:absolute;left:250px;width:220px;top:1108px;border-top:6px dashed var(--neon);opacity:0;animation:${A('fade', .4, W(26))}"></div>
  <div class="e37tag" style="left:490px;top:1088px;color:var(--neon);opacity:0;animation:${A('fade', .4, W(26))}">← o nível real</div>
  <div class="abs" style="left:430px;top:1190px;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:40px;animation:${A('popb', .45, W(24), BOUNCE)}">📏 Leu pouco</span></div>
  <div class="abs" style="left:430px;top:560px;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:40px;animation:${A('popb', .45, W(30), BOUNCE)}">🛢️ Completa sem precisar</span></div>
  <div class="abs" style="left:430px;top:760px;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:40px;animation:${A('popb', .45, W(33) + .1, BOUNCE)}">❌ Acima do MAX: faz mal</span></div>
</div></div>`;

// CENA 4: o jeito certo
const okc = (y, at, em, txt) => `<div class="e37ok" style="top:${y}px;animation:${A('stIn', .5, at - .35)}"><em>${em}</em><b>${txt}</b><div class="ck" style="animation:${A('popb', .4, at + .15, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:190px;font-size:110px">${neonWords('O certo:', W(38), .16)}</div>
  <div class="abs" style="left:0;right:0;top:360px;text-align:center"><span class="pillx wa" style="position:relative;font-size:38px;animation:${A('popb', .45, W(40), BOUNCE)}">📘 Confira também o manual do seu carro</span></div>
  ${okc(560, W(40), '📐', 'Carro no plano')}
  ${okc(820, W(43), '❄️', 'Motor frio')}
  ${okc(1080, W(45), '🧻', 'Vareta limpa')}
</div></div>`;

// CENA 5: manda pra quem completa no posto
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:220px;font-size:96px;line-height:1.06">${words('Manda pra quem', W(47), .12)}<br>${neonWords('completa no posto', W(50), .12)}</div>
  <div class="e37send" style="top:640px;animation:${A('fly37', 1.4, W(47))}">📤</div>
  <div class="e37chat" style="top:980px;animation:${A('stIn', .5, W(50))}">Olha isso antes de completar o óleo de novo 👀</div>
</div></div>`;

// CENA 6: comenta aí + fecho
h += `<div class="scene" style="${sceneStyle(T.s6, true)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:190px;font-size:96px">${words('E você,', W(53), .12)}<br>${neonWords('confere onde?', W(55), .14)}</div>
  <div class="abs" style="left:0;right:0;top:500px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(56) - .1, BOUNCE)}">🏠 Em casa</span><span class="pillx wa" style="position:relative;animation:${A('popb', .45, W(56) + .15, BOUNCE)}">⛽ No posto</span></div>
  <div class="abs" style="left:0;right:0;top:680px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(57) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
  <div class="sep" style="top:880px;animation:${A('fade', .5, 22.6)}"></div>
  <div class="abs" style="left:0;right:0;top:920px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, 22.8, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:1010px;font-size:72px;line-height:1.08">${words('Dúvida do carro?', 23.1, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', 23.6, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1200px;text-align:center;font-size:58px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, 24.2)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1290px;text-align:center;font-size:40px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, 24.6)}">App 100% grátis</div>
</div></div>`;
