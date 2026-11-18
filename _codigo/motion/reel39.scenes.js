const VO = 0.5;
const W0 = [["Você",0,0.21],["calibra",0.24,0.6],["o",0.64,0.68],["pneu",0.72,0.96],["depois",1.04,1.04],["de",1.12,1.2],["rodar?",1.24,1.44],["Tá",1.52,1.84],["fazendo",2.08,2.56],["errado.",2.6,3.04],["Pneu",3.12,3.68],["quente",3.76,4.08],["marca",4.16,4.592],["pressão",4.624,5.006],["a",5.034,5.063],["mais.",5.091,5.32],["Você",5.36,6.08],["acerta",6.14,6.56],["o",6.6,6.64],["número",6.68,6.976],["do",6.992,7.024],["manual,",7.04,7.48],["ele",7.52,7.72],["esfria",7.84,8.56],["e",8.64,8.72],["fica",8.8,8.96],["abaixo",9.12,9.44],["do",9.48,9.52],["recomendado.",9.6,10.4],["O",10.64,10.72],["jeito",10.76,11.04],["certo:",11.12,11.84],["calibrar",11.92,12.4],["com",12.44,12.48],["o",12.52,12.56],["pneu",12.64,12.96],["frio.",13,13.68],["Se",13.76,13.84],["só",13.92,14],["der",14.08,14.24],["quente,",14.28,14.8],["coloca",14.88,15.2],["duas",15.28,15.52],["ou",15.6,15.68],["três",15.76,15.92],["libras",16,16.24],["a",16.32,16.4],["mais.",16.44,17.12],["Manda",17.16,17.36],["pra",17.44,17.52],["quem",17.573,17.68],["calibra",17.76,18],["no",18.08,18.16],["posto",18.28,18.44],["da",18.48,18.52],["estrada.",18.56,19.36],["E",19.4,19.44],["você,",19.52,20.08],["calibra",20.16,20.48],["quando?",20.52,21.12],["Comenta",21.2,21.44],["aí.",21.52,21.92]];
const T = {total: 28, s1:[0,3.55], s2:[3.55,10.95], s3:[10.95,17.6], s4:[17.6,19.85], s5:[19.85,28],
  breaks: [0, 4, 7, 10, 13, 16, 22, 26, 29, 32, 37, 41, 45, 48, 52, 56, 58, 60]};
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
// pneu (desenho nosso, do reel 32)
const TYRE = (sz, at, capc = '#41d686') => `<div class="e32t" style="width:${sz}px;height:${sz}px"><div class="rot" style="animation:${A('spin32', 3.5, at, 'linear', 'none')} infinite"><svg viewBox="0 0 400 400" style="width:100%;height:100%;overflow:visible"><circle cx="200" cy="200" r="185" fill="#101c2c" stroke="#fff" stroke-width="10"/>${[...Array(24).keys()].map(k => { const a = k * 15 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return `<path d="M${(200 + 168 * c).toFixed(1)} ${(200 + 168 * s).toFixed(1)} L${(200 + 186 * c).toFixed(1)} ${(200 + 186 * s).toFixed(1)}" stroke="#97a7b7" stroke-width="8"/>`; }).join('')}<circle cx="200" cy="200" r="120" fill="rgba(58,199,255,.1)" stroke="#3ac7ff" stroke-width="8"/><circle cx="200" cy="200" r="34" fill="none" stroke="#fff" stroke-width="7"/>${[0,1,2,3,4].map(k => { const a = (k * 72 - 90) * Math.PI / 180; return `<circle cx="${(200 + 70 * Math.cos(a)).toFixed(1)}" cy="${(200 + 70 * Math.sin(a)).toFixed(1)}" r="11" fill="none" stroke="#fff" stroke-width="5"/>`; }).join('')}<rect x="300" y="140" width="22" height="36" rx="5" fill="${capc}" style="filter:drop-shadow(0 0 10px ${capc})"/></svg></div></div>`;
// mostra um elemento de a até b
const showHide = (a, b) => `animation:fade .15s linear ${a}s both${b ? `, hide .15s linear ${b}s forwards` : ''}`;
let h = '';

// CENA 1: gancho
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie todo"><span>VOCÊ FAZ ISSO TODO DIA</span></div>
  <div class="hd c" style="top:270px;left:30px;right:30px;font-size:104px;line-height:1.04;white-space:nowrap">${still('Você calibra')}<br>${still('o pneu','neon')}<br>${still('depois de rodar?')}</div>
  <div class="e39p" style="left:310px;top:640px;width:460px;height:460px;animation:${A('popb', .5, .15, BOUNCE)}">${TYRE(460, 0)}</div>
  <div class="e39fx" style="left:700px;top:620px;opacity:1;animation:heat39 1.2s ease-in-out infinite">🔥</div>
  <div class="e39road" style="top:1120px"></div>
  <div class="stamp" style="top:1290px;--r:-8deg;font-size:120px;white-space:nowrap;animation:${A('pop', .5, W(7) - .1, BOUNCE)}">TÁ ERRADO</div>
</div></div>`;

// CENA 2: pneu quente marca a mais; acerta o número, esfria e fica abaixo
const nums = [['32', W(17), W(23) + .4, ''], ['31', W(23) + .4, W(23) + .7, 'bad'], ['30', W(23) + .7, W(23) + 1.0, 'bad'], ['29', W(23) + 1.0, 0, 'bad']];
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:160px;font-size:88px;line-height:1.04">${redWords('Pneu quente', W(10), .14)}<br>${words('marca pressão', W(12), .12)}<br>${neonWords('a mais', W(14), .12)}</div>
  <div class="e39p" style="left:70px;top:620px;width:400px;height:400px;animation:${A('stIn', .5, W(10) - .3)}">${TYRE(400, 3.6)}</div>
  <div class="e39fx" style="left:330px;top:540px;animation:${an([A('fade', .3, W(11)), A('hide', .3, W(23), 'linear', 'forwards')])}"><span style="display:inline-block;animation:heat39 1.2s ease-in-out infinite">🔥</span></div>
  <div class="e39fx" style="left:330px;top:540px;animation:${A('popb', .4, W(23), BOUNCE)}">❄️</div>
  <div class="e39box" style="animation:${A('stIn', .5, W(12) - .2)}"><div class="lb">CALIBRADOR</div>
    ${nums.map(([n, a, b, c]) => `<div class="e39n ${c}" style="${showHide(a, b)}">${n}<small>psi</small></div>`).join('')}
    <div class="e39note" style="top:262px;font-size:32px;color:var(--fg);animation:${A('fade', .3, W(19))}">manual: 32 psi</div>
  </div>
  <div class="abs" style="left:0;right:0;top:1090px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:42px;animation:${an([A('popb', .45, W(17), BOUNCE), A('hide', .2, W(23), 'linear', 'forwards')])}">✅ Acertou o número?</span></div>
  <div class="abs" style="left:0;right:0;top:1090px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;font-size:42px;animation:${A('popb', .45, W(26), BOUNCE)}">⬇️ Esfriou: abaixo do recomendado</span></div>
  <div class="e39note" style="top:1250px;animation:${A('fade', .4, W(17))}">valores de exemplo</div>
</div></div>`;

// CENA 3: o jeito certo
const okc = (y, at, em, txt, cls = '') => `<div class="e39ok ${cls}" style="top:${y}px;animation:${A('stIn', .5, at - .35)}"><em>${em}</em><b>${txt}</b><div class="ck" style="animation:${A('popb', .4, at + .15, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:180px;font-size:110px">${neonWords('O jeito certo:', W(29), .14)}</div>
  ${okc(420, W(32), '❄️', 'Calibrar com pneu frio')}
  <div class="hd c" style="top:700px;font-size:70px">${words('Só dá pra calibrar quente?', W(37), .1)}</div>
  ${okc(860, W(41), '🔥', '+ 2 a 3 libras', 'wr')}
  <div class="abs" style="left:0;right:0;top:1130px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:38px;animation:${A('popb', .45, W(45), BOUNCE)}">📘 O número certo está no manual</span></div>
</div></div>`;

// CENA 4: manda pra quem calibra no posto da estrada
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:220px;font-size:92px;line-height:1.06">${words('Manda pra quem', W(48), .1)}<br>${neonWords('calibra na estrada', W(51), .12)}</div>
  <div class="e39send" style="top:620px;animation:${A('fly39', 1.4, W(48))}">📤</div>
  <div class="e39chat" style="top:960px;animation:${A('stIn', .5, W(53) - .2)}">Pneu quente engana o calibrador. Olha isso 👀</div>
</div></div>`;

// CENA 5: comenta aí + fecho
h += `<div class="scene" style="${sceneStyle(T.s5, true)}"><div class="cam" style="${camStyle(T.s5)}">
  <div class="hd c" style="top:190px;font-size:96px">${words('E você,', W(56), .12)}<br>${neonWords('calibra quando?', W(58), .14)}</div>
  <div class="abs" style="left:0;right:0;top:500px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(59) - .1, BOUNCE)}">❄️ Pneu frio</span><span class="pillx wa" style="position:relative;animation:${A('popb', .45, W(59) + .15, BOUNCE)}">🔥 Depois de rodar</span></div>
  <div class="abs" style="left:0;right:0;top:680px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(60) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
  <div class="sep" style="top:880px;animation:${A('fade', .5, 22.8)}"></div>
  <div class="abs" style="left:0;right:0;top:920px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, 23.0, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:1010px;font-size:72px;line-height:1.08">${words('Dúvida do carro?', 23.3, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', 23.8, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1200px;text-align:center;font-size:58px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, 24.4)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1290px;text-align:center;font-size:40px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, 24.8)}">App 100% grátis</div>
</div></div>`;
