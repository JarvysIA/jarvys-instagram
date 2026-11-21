const VO = 0.5;
const W0 = [["Pediram", 0, 0.48], ["R$ 1.800", 0.56, 1.68], ["na", 1.76, 1.8], ["revisão.", 1.84, 2.48], ["Tá", 2.64, 2.8], ["caro?", 2.92, 3.48], ["Óleo", 3.76, 4], ["e", 4.04, 4.08], ["filtros", 4.16, 4.48], ["do", 4.56, 4.6], ["manual:", 4.64, 5.12], ["isso", 5.44, 5.84], ["é", 5.92, 6.08], ["revisão.", 6.16, 6.84], ["Agora,", 7.04, 7.52], ["limpeza", 7.68, 8.08], ["de", 8.16, 8.24], ["bico", 8.32, 8.56], ["com", 8.64, 8.72], ["o", 8.747, 8.773], ["carro", 8.8, 9.04], ["bom?", 9.12, 9.56], ["Descarbonização?", 9.76, 10.8], ["Limpeza", 11.04, 11.44], ["do", 11.52, 11.6], ["tanque?", 11.68, 12.28], ["Isso", 12.48, 12.72], ["costuma", 12.8, 13.12], ["ser", 13.2, 13.28], ["empurrado.", 13.36, 14.16], ["A", 14.4, 14.48], ["regra:", 14.56, 14.96], ["faz", 15.36, 15.6], ["o", 15.64, 15.68], ["que", 15.72, 15.76], ["o", 15.787, 15.813], ["manual", 15.84, 16.16], ["pede,", 16.24, 16.76], ["e", 16.88, 17], ["pede", 17.12, 17.36], ["pra", 17.44, 17.52], ["ver", 17.6, 17.68], ["a", 17.72, 17.76], ["peça", 17.84, 18.08], ["velha.", 18.16, 18.48], ["Antes", 18.88, 19.12], ["de", 19.2, 19.28], ["ir,", 19.36, 19.68], ["pergunta", 19.76, 20], ["pro", 20.08, 20.24], ["Jarvys", 20.36, 20.64], ["quanto", 20.72, 20.96], ["costuma", 21.08, 21.28], ["custar.", 21.36, 21.84], ["Manda", 22.16, 22.4], ["pra", 22.48, 22.56], ["quem", 22.6, 22.72], ["vai", 22.747, 22.8], ["fazer", 22.88, 23.04], ["revisão.", 23.12, 23.6], ["Já", 24.08, 24.16], ["te", 24.2, 24.24], ["empurraram", 24.32, 24.72], ["alguma", 24.76, 24.96], ["coisa?", 25.04, 25.52], ["Comenta", 25.68, 26], ["aí.", 26.04, 26.48]];
const T = {total: 31, s1:[0,4.1], s2:[4.1,7.45], s3:[7.45,14.75], s4:[14.75,19.2], s5:[19.2,22.45], s6:[22.45,24.35], s7:[24.35,27.6], s8:[27.6,31],
  breaks: [0, 4, 6, 11, 14, 18, 22, 23, 26, 30, 32, 38, 45, 48, 51, 54, 60, 65]};
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
// Personagem original do reel 06: o mecânico espertinho
const mec = (mood) => `<svg viewBox="0 0 260 330">
  <path d="M28 330 C28 252 68 222 130 222 C192 222 232 252 232 330Z" fill="#55657a"/>
  <path d="M80 236 L96 330 M180 236 L164 330" stroke="#3d4a5b" stroke-width="16"/>
  <rect x="98" y="262" width="64" height="44" rx="8" fill="#3d4a5b"/><circle cx="130" cy="284" r="9" fill="#f9c718"/>
  <path d="M100 222 L130 250 L160 222Z" fill="#e8eef5"/>
  <rect x="112" y="186" width="36" height="42" rx="12" fill="#b77a53"/>
  <ellipse cx="130" cy="124" rx="74" ry="80" fill="#c68863"/>
  <ellipse cx="56" cy="130" rx="12" ry="18" fill="#b77a53"/><ellipse cx="204" cy="130" rx="12" ry="18" fill="#b77a53"/>
  <rect x="196" y="96" width="44" height="9" rx="4" transform="rotate(-28 218 100)" fill="#f9c718"/><path d="M236 86 l10 -5 -3 10z" fill="#2a1c14" transform="rotate(-2 240 86)"/>
  <path d="M56 104 C54 52 92 34 132 34 C176 34 208 54 206 100 L56 104Z" fill="#f2b31b"/>
  <path d="M40 104 C70 92 120 90 150 100 C120 108 70 112 40 104Z" fill="#d4960f"/>
  <rect x="112" y="52" width="40" height="22" rx="6" fill="#55657a"/><path d="M122 63 h20" stroke="#f2b31b" stroke-width="5" stroke-linecap="round"/>
  <path d="M86 186 Q130 214 174 186 Q160 200 130 202 Q100 200 86 186Z" fill="#8a5a3c" opacity=".35"/>
  ${mood === 'smug'
    ? `<path d="M88 124 Q102 118 118 124" stroke="#1b1b1b" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M144 124 Q158 118 174 124" stroke="#1b1b1b" stroke-width="7" fill="none" stroke-linecap="round"/>
       <path d="M86 108 L118 112" stroke="#3a2416" stroke-width="7" stroke-linecap="round"/><path d="M144 110 L176 102" stroke="#3a2416" stroke-width="7" stroke-linecap="round"/>
       <path d="M108 166 Q136 174 160 156" stroke="#6e2a1f" stroke-width="7" fill="none" stroke-linecap="round"/>`
    : `<circle cx="104" cy="128" r="13" fill="#fff"/><circle cx="158" cy="128" r="13" fill="#fff"/><circle cx="104" cy="130" r="6" fill="#1b1b1b"/><circle cx="158" cy="130" r="6" fill="#1b1b1b"/>
       <path d="M86 102 Q102 92 118 100" stroke="#3a2416" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M144 100 Q160 92 176 102" stroke="#3a2416" stroke-width="7" fill="none" stroke-linecap="round"/>
       <ellipse cx="131" cy="168" rx="14" ry="17" fill="#6e2a1f"/>`}
</svg>`;
const drop = `<svg width="40" height="56" viewBox="0 0 20 28"><path d="M10 0 Q20 14 16 21 A7 7 0 0 1 4 21 Q0 14 10 0Z" fill="#9fd8ff"/></svg>`;
const row = (cls, em, txt, at, strikeAt) => `<div class="r ${cls}" style="animation:${A('stIn', .45, at)}"><span>${txt}</span><em style="opacity:0;animation:${A('popb', .4, at + .25, BOUNCE)}">${em}</em>${strikeAt ? `<i class="e41strike" style="animation:${A('x41', .35, strikeAt, 'ease-out')}"></i>` : ''}</div>`;
let h = '';

// CENA 1: gancho, pediram R$ 1.800 na revisão. Tá caro?
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie caro"><span>TÁ CARO?</span></div>
  <div class="hd c" style="top:290px;font-size:104px">${still('Pediram')}</div>
  <div class="e41big" style="top:410px">R$&nbsp;1.800</div>
  <div class="hd c" style="top:650px;font-size:96px">${still('na revisão')}</div>
  <div class="mec" style="left:10px;top:820px;width:430px;height:550px;transform-origin:50% 100%;animation:swing 2.6s ease-in-out infinite">${mec('smug')}</div>
  <div class="e41orc" style="left:450px;right:70px;top:880px;animation:${A('stIn', .5, .2)}"><h4>ORÇAMENTO</h4><div class="sub">Revisão dos 40.000 km</div>
    <div class="r" style="opacity:1;font-size:30px"><span>Peças e serviços</span><b>...</b></div>
    <div class="tot"><span>TOTAL</span><span>R$&nbsp;1.800</span></div>
    <div class="sub" style="margin:10px 0 0;font-size:22px">valores de exemplo</div></div>
  <div class="stamp" style="top:1265px;left:740px;--r:-8deg;font-size:80px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(4) - .1, BOUNCE)}">TÁ CARO?</div>
</div></div>`;

// CENA 2: óleo e filtros do manual, isso é revisão
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:170px;font-size:88px;line-height:1.06">${words('Óleo e filtros do manual:', W(6), .12)}<br>${neonWords('isso é revisão ✅', W(11), .14)}</div>
  <div class="e41orc" style="left:130px;right:130px;top:520px;animation:${A('stIn', .5, T.s2[0] + .1)}"><h4>ORÇAMENTO · 40.000 KM</h4><div class="sub">o que o manual pede (exemplo)</div>
    ${row('ok', '✓', '🛢️ Óleo do motor', W(6))}
    ${row('ok', '✓', 'Filtro de óleo', W(8))}
    ${row('ok', '✓', 'Filtro de ar', W(8) + .3)}
    ${row('ok', '✓', 'Filtro de combustível', W(8) + .6)}
  </div>
  <div class="abs" style="left:0;right:0;top:1250px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;font-size:42px;animation:${A('popb', .45, W(10), BOUNCE)}">📘 Está no manual</span></div>
</div></div>`;

// CENA 3: o que costuma ser empurrado
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:170px;font-size:92px;line-height:1.06">${words('E isso aqui?', W(14), .14)}</div>
  <div class="e41orc" style="left:130px;right:130px;top:350px;box-shadow:0 50px 120px -30px rgba(249,65,68,.5);animation:${A('stIn', .5, T.s3[0] + .1)}"><h4>MAIS NO ORÇAMENTO</h4><div class="sub">valores de exemplo</div>
    ${row('bad', '?', 'Limpeza de bico (carro bom)', W(15), W(26) + .1)}
    ${row('bad', '?', 'Descarbonização', W(22), W(26) + .35)}
    ${row('bad', '?', 'Limpeza do tanque', W(23), W(26) + .6)}
  </div>
  <div class="mec" style="left:620px;top:860px;width:340px;height:435px;animation:${A('stIn', .5, W(26) - .3)}">${mec('surpreso')}</div>
  <div class="stamp" style="top:1010px;left:400px;--r:-7deg;font-size:76px;white-space:nowrap;animation:${A('pop', .5, W(29) - .1, BOUNCE)}">EMPURRADO?</div>
  <div class="e41note" style="top:1150px;left:60px;right:auto;text-align:left;font-size:34px;color:#ff9c9c;animation:${A('fade', .4, W(30) - .6)}">Costuma ser. Sem sintoma,<br>sem motivo pra fazer.</div>
</div></div>`;

// CENA 4: a regra
const okc = (y, at, em, txt) => `<div class="e41ok" style="top:${y}px;animation:${A('stIn', .5, at - .35)}"><em>${em}</em><b>${txt}</b><div class="ck" style="animation:${A('popb', .4, at + .15, BOUNCE)}">✓</div></div>`;
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:200px;font-size:110px">${neonWords('A regra:', W(30), .16)}</div>
  ${okc(520, W(32), '📘', 'O que o manual pede')}
  ${okc(800, W(39), '🔧', 'Ver a peça velha')}
  <div class="abs" style="left:0;right:0;top:1080px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;font-size:44px;animation:${A('popb', .45, W(41), BOUNCE)}">🔩 Peça velha na mão = troca feita</span></div>
  <div class="e41note" style="top:1250px;animation:${A('fade', .4, W(44))}">combina isso antes do serviço</div>
</div></div>`;

// CENA 5: antes de ir, pergunta pro Jarvys
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <img class="e41logo" src="${ICON}" style="left:410px;top:150px;animation:${A('popb', .5, W(45) - .1, BOUNCE)}">
  <div class="hd c" style="top:440px;font-size:80px;line-height:1.06">${words('Antes de ir,', W(45), .12)}<br>${neonWords('pergunta pro Jarvys', W(48), .14)}</div>
  <div class="e41b u" style="top:680px;font-size:40px;white-space:nowrap;animation:${A('popb', .4, W(48), BOUNCE)}">Quanto custa a revisão dos 40 mil?</div>
  <div class="e41b j" style="top:830px;animation:${A('stIn', .45, W(50))}">Estimativa: R$&nbsp;780 💡
    <div class="e41bar"><span>Óleo e filtro</span><i style="width:300px;animation:${A('x41', .5, W(50) + .5)}"></i></div>
    <div class="e41bar"><span>Filtros de ar</span><i style="width:170px;animation:${A('x41', .5, W(50) + .75)}"></i></div>
    <div class="e41bar"><span>Mão de obra</span><i style="width:230px;animation:${A('x41', .5, W(50) + 1)}"></i></div></div>
  <div class="e41note" style="top:1300px;animation:${A('fade', .4, W(50) + .3)}">valores de exemplo · conversa no WhatsApp: função paga</div>
</div></div>`;

// CENA 6: manda pra quem vai fazer revisão
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:96px;line-height:1.06">${words('Manda pra quem', W(54), .1)}<br>${neonWords('vai fazer revisão', W(57), .1)}</div>
  <div class="e41send" style="top:600px;animation:${A('fly41', 1.4, W(54))}">📤</div>
  <div class="e41chat" style="top:940px;animation:${A('stIn', .5, W(55))}">Antes da revisão, olha isso 👀</div>
</div></div>`;

// CENA 7: comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:260px;font-size:96px;line-height:1.06">${words('Já te empurraram', W(60), .12)}<br>${neonWords('alguma coisa?', W(63), .14)}</div>
  <div class="abs" style="left:0;right:0;top:640px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(64), BOUNCE)}">😤 Já</span><span class="pillx ok" style="position:relative;animation:${A('popb', .45, W(64) + .25, BOUNCE)}">🙌 Nunca</span></div>
  <div class="abs" style="left:0;right:0;top:880px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(65) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
</div></div>`;

// CENA 8: fecho com a logo grande
const F = T.s8[0];
h += `<div class="scene" style="${sceneStyle(T.s8, true)}"><div class="cam" style="${camStyle(T.s8)}">
  <img class="e41logoF" src="${ICON}" style="animation:${A('popb', .6, F + .1, BOUNCE)}">
  <div class="abs" style="left:0;right:0;top:720px;text-align:center"><span class="drtag big2" style="opacity:0;animation:${A('popb', .45, F + .5, BOUNCE)}">DR. JARVYS</span></div>
  <div class="hd c" style="top:830px;font-size:76px;line-height:1.08">${words('Dúvida do carro?', F + .7, .12)}<br>${neonWords('Pergunta pro Dr. Jarvys.', F + 1.1, .12)}</div>
  <div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:66px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, F + 1.7)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1160px;text-align:center;font-size:46px;font-weight:700;color:#7ff0b3;animation:${A('fade', .5, F + 2.1)}">App 100% grátis</div>
</div></div>`;
