const VO = 0.5;
const W0 = [["Pediram", 0, 0.4], ["R$ 900", 0.48, 1.6], ["pra", 1.68, 1.76], ["trocar", 1.84, 2.08], ["a", 2.12, 2.16], ["pastilha", 2.28, 2.56], ["de", 2.6, 2.64], ["freio.", 2.72, 3.12], ["Tá", 3.44, 3.52], ["caro?", 3.6, 4], ["Na", 4.4, 4.48], ["média,", 4.56, 5.12], ["a", 5.16, 5.2], ["troca", 5.28, 5.44], ["da", 5.52, 5.6], ["pastilha,", 5.68, 6.24], ["com", 6.32, 6.4], ["peça", 6.48, 6.8], ["e", 6.84, 6.88], ["mão", 6.92, 7.04], ["de", 7.12, 7.2], ["obra,", 7.36, 7.6], ["sai", 7.68, 7.84], ["entre", 7.96, 8.08], ["R$ 150", 8.24, 9.04], ["e", 9.2, 9.28], ["R$ 400", 9.36, 10.68], ["Colocaram", 10.88, 11.28], ["disco", 11.36, 11.6], ["junto?", 11.64, 12.16], ["Pede", 12.32, 12.56], ["pra", 12.64, 12.72], ["medir:", 12.84, 13.44], ["ele", 13.52, 13.6], ["só", 13.68, 13.76], ["troca", 13.84, 14.08], ["abaixo", 14.24, 14.56], ["da", 14.6, 14.64], ["espessura", 14.72, 15.12], ["mínima,", 15.2, 15.64], ["que", 15.68, 15.76], ["vem", 15.813, 15.92], ["gravada", 16.04, 16.4], ["nele.", 16.48, 16.8], ["E", 17.12, 17.2], ["a", 17.24, 17.28], ["pastilha", 17.44, 17.84], ["troca", 17.92, 18.08], ["nos", 18.16, 18.32], ["dois", 18.4, 18.56], ["lados", 18.64, 18.96], ["do", 19.04, 19.12], ["mesmo", 19.24, 19.52], ["eixo.", 19.56, 19.92], ["Na", 20.24, 20.32], ["dúvida,", 20.4, 20.96], ["pergunta", 21.04, 21.28], ["pro", 21.36, 21.44], ["Dr.", 21.48, 21.76], ["Jarvys", 21.84, 22.16], ["no", 22.2, 22.24], ["app.", 22.32, 22.64], ["Manda", 22.96, 23.2], ["pra", 23.28, 23.36], ["quem", 23.4, 23.52], ["vai", 23.547, 23.6], ["mexer", 23.68, 23.92], ["no", 24, 24.08], ["freio.", 24.16, 24.6], ["Já", 24.8, 24.88], ["te", 24.96, 25.04], ["cobraram", 25.12, 25.44], ["caro", 25.52, 25.76], ["no", 25.8, 25.84], ["freio?", 25.92, 26.56], ["Comenta", 26.64, 26.96], ["aí.", 27, 27.44]];
const T = {total: 31, s1:[0,4.75], s2:[4.75,11.2], s3:[11.2,17.45], s4:[17.45,20.55], s5:[20.55,23.3], s6:[23.3,25.15], s7:[25.15,28.4], s8:[28.4,31],
  breaks: [0, 2, 8, 10, 15, 22, 27, 30, 33, 37, 40, 44, 48, 51, 54, 56, 62, 65, 69, 72, 75]};
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
const row = (cls, em, txt, at, strikeAt) => `<div class="r ${cls}" style="animation:${A('stIn', .45, at)}"><span>${txt}</span><em style="opacity:0;animation:${A('popb', .4, at + .25, BOUNCE)}">${em}</em>${strikeAt ? `<i class="e41strike" style="animation:${A('x41', .35, strikeAt, 'ease-out')}"></i>` : ''}</div>`;
// pastilha de freio de lado: plaqueta de metal + material de atrito (altura do atrito animável)
const PADS = (h0, h1, at, dur) => `<div style="position:relative;width:420px;height:200px">
  <div style="position:absolute;left:0;right:0;bottom:0;height:46px;border-radius:10px;background:linear-gradient(#c9d3dd,#8b9aab);box-shadow:0 0 0 4px #5d6b7b inset"></div>
  <div style="position:absolute;left:24px;right:24px;bottom:46px;border-radius:12px 12px 4px 4px;background:repeating-linear-gradient(90deg,#4a3428 0 34px,#3b291f 34px 38px);box-shadow:0 0 0 4px #2a1c14 inset;--h0:${h0}px;--h1:${h1}px;height:${h0}px;animation:wear45 ${dur}s ease-in-out ${at}s both"></div>
</div>`;
// disco de freio visto de frente com pinça vermelha
const DISC45 = `<svg width="500" height="500" viewBox="0 0 500 500" style="overflow:visible">
  <g class="e45spin">
   <circle cx="250" cy="250" r="220" fill="rgba(151,167,183,.16)" stroke="#e8f1f8" stroke-width="12"/>
   <circle cx="250" cy="250" r="200" fill="none" stroke="#97a7b7" stroke-width="3" stroke-dasharray="6 14"/>
   <circle cx="250" cy="250" r="92" fill="#0b1626" stroke="#e8f1f8" stroke-width="10"/>
   ${[0,1,2,3,4].map(k=>{const a=k*2*Math.PI/5;return `<circle cx="${250+52*Math.cos(a)}" cy="${250+52*Math.sin(a)}" r="13" fill="#97a7b7"/>`}).join('')}
   ${[0,1,2,3,4,5,6,7].map(k=>{const a=k*Math.PI/4+.3;return `<circle cx="${250+150*Math.cos(a)}" cy="${250+150*Math.sin(a)}" r="11" fill="#0b1626" stroke="#97a7b7" stroke-width="4"/>`}).join('')}
  </g>
  <path d="M390 70 C478 130 505 210 494 290 L420 280 C430 214 410 160 344 116Z" fill="#d32f32" stroke="#ff9c9c" stroke-width="6" stroke-linejoin="round"/>
  <rect x="420" y="150" width="40" height="70" rx="10" fill="#8a1c1f"/>
</svg>`;
// paquímetro (desenho genérico)
const CALIP = `<svg width="520" height="230" viewBox="0 0 520 230" style="overflow:visible">
  <rect x="0" y="40" width="520" height="56" rx="10" fill="#e8f1f8" stroke="#97a7b7" stroke-width="4"/>
  ${Array.from({length: 25}, (_, k) => `<rect x="${20 + k * 20}" y="40" width="4" height="${k % 5 ? 18 : 30}" fill="#5d6b7b"/>`).join('')}
  <path d="M0 40 V0 H46 V40Z M0 96 V200 L46 160 V96Z" fill="#c9d3dd" stroke="#97a7b7" stroke-width="4"/>
  <path d="M120 40 V0 H166 V40Z M120 96 V200 L166 160 V96Z" fill="#c9d3dd" stroke="#97a7b7" stroke-width="4"/>
  <rect x="190" y="104" width="150" height="56" rx="10" fill="#0b1626" stroke="#3ac7ff" stroke-width="4"/>
  <text x="265" y="143" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="#3ac7ff">medindo</text>
</svg>`;
// carro visto de cima, eixo da frente aceso
const TOP = `<svg width="560" height="760" viewBox="0 0 560 760" style="overflow:visible">
  <rect x="120" y="40" width="320" height="680" rx="120" fill="rgba(58,199,255,.10)" stroke="#3ac7ff" stroke-width="10"/>
  <rect x="160" y="170" width="240" height="140" rx="30" fill="rgba(58,199,255,.18)" stroke="#3ac7ff" stroke-width="6"/>
  <rect x="170" y="470" width="220" height="110" rx="26" fill="rgba(58,199,255,.12)" stroke="#3ac7ff" stroke-width="6"/>
  <g class="e45wh"><rect x="60" y="120" width="70" height="150" rx="22" fill="#41d686"/><rect x="430" y="120" width="70" height="150" rx="22" fill="#41d686"/></g>
  <rect x="60" y="500" width="70" height="150" rx="22" fill="#2b3138" stroke="#5d6b7b" stroke-width="4"/><rect x="430" y="500" width="70" height="150" rx="22" fill="#2b3138" stroke="#5d6b7b" stroke-width="4"/>
  <path d="M130 195 H430" stroke="#f9c718" stroke-width="10" stroke-dasharray="22 14"/>
</svg>`;
let h = '';

// CENA 1: gancho, pediram R$ 900 na pastilha de freio. Tá caro?
h += `<div class="scene" style="${sceneStyle(T.s1, false, true)}"><div class="cam" style="${camStyle(T.s1)}">
  <div class="serie caro"><span>TÁ CARO?</span></div>
  <div class="hd c" style="top:290px;font-size:104px">${still('Pediram')}</div>
  <div class="e41big" style="top:410px">R$&nbsp;900</div>
  <div class="hd c" style="top:650px;font-size:90px;white-space:nowrap">${still('na pastilha de freio')}</div>
  <div class="mec" style="left:10px;top:800px;width:430px;height:550px;transform-origin:50% 100%;animation:swing 2.6s ease-in-out infinite">${mec('smug')}</div>
  <div class="e41orc" style="left:450px;right:70px;top:850px;animation:${A('stIn', .5, .2)}"><h4>ORÇAMENTO</h4><div class="sub">Freio dianteiro</div>
    <div class="r" style="opacity:1;font-size:30px"><span>Pastilhas</span><b>...</b></div>
    <div class="r" style="opacity:1;font-size:30px"><span>Discos</span><b>...</b></div>
    <div class="tot"><span>TOTAL</span><span>R$&nbsp;900</span></div>
    <div class="sub" style="margin:10px 0 0;font-size:22px">valores de exemplo</div></div>
  <div class="stamp" style="top:1290px;left:740px;--r:-8deg;font-size:80px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(8) - .1, BOUNCE)}">TÁ CARO?</div>
</div></div>`;

// CENA 2: na média, R$ 150 a R$ 400 com peça e mão de obra
h += `<div class="scene" style="${sceneStyle(T.s2)}"><div class="cam" style="${camStyle(T.s2)}">
  <div class="hd c" style="top:170px;font-size:96px;line-height:1.06">${words('Na média,', W(10), .14)}<br>${neonWords('troca da pastilha', W(12), .12)}</div>
  <div class="e45pad" style="left:330px;top:460px;animation:${A('stIn', .5, W(12))}">${PADS(150, 150, 0, 1)}</div>
  <div class="abs" style="left:0;right:0;top:700px;text-align:center;white-space:nowrap"><span class="pillx wa" style="position:relative;margin-right:24px;font-size:42px;animation:${A('popb', .45, W(17), BOUNCE)}">🔩 Peça</span><span class="pillx wa" style="position:relative;font-size:42px;animation:${A('popb', .45, W(19), BOUNCE)}">🔧 Mão de obra</span></div>
  <div class="e45rng" style="top:900px;opacity:0;animation:${A('popb', .5, W(24) - .05, BOUNCE)}">R$&nbsp;150 a R$&nbsp;400</div>
  <div class="e45lab" style="top:1080px;animation:${A('fade', .4, W(26) + .2)}">média da Webmotors, peça + serviço</div>
  <div class="e45lab" style="top:1150px;font-size:34px;animation:${A('fade', .4, W(26) + .5)}">o preço muda com o carro e a cidade</div>
</div></div>`;

// CENA 3: colocaram disco junto? pede pra medir
h += `<div class="scene" style="${sceneStyle(T.s3)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="hd c" style="top:170px;font-size:96px;line-height:1.06">${words('Colocaram', W(27), .12)}<br>${neonWords('disco junto?', W(28), .14)}</div>
  <div class="e45disc" style="left:50px;top:420px;animation:${A('stIn', .5, W(27))}">${DISC45}</div>
  <div class="e45cal" style="left:540px;top:600px;animation:${A('cal45', .6, W(30), 'cubic-bezier(.2,.8,.2,1)')}">${CALIP}</div>
  <div class="stamp" style="top:1010px;left:540px;--r:-5deg;font-size:62px;white-space:nowrap;border-color:var(--warn);color:var(--warn);text-shadow:0 0 40px rgba(249,199,24,.5);box-shadow:0 0 60px rgba(249,199,24,.35);animation:${A('pop', .5, W(31) + .1, BOUNCE)}">PEDE PRA MEDIR</div>
  <div class="e45eng" style="left:0;right:0;text-align:center;top:1125px;animation:${A('fade', .4, W(40))}">📏 ESPESSURA MÍNIMA: GRAVADA NO DISCO</div>
  <div class="abs" style="left:0;right:0;top:1200px;text-align:center;white-space:nowrap"><span class="pillx ok" style="position:relative;margin-right:20px;font-size:38px;animation:${A('popb', .45, W(36) - .1, BOUNCE)}">✅ Acima: não troca</span><span class="pillx bad" style="position:relative;font-size:38px;animation:${A('popb', .45, W(38), BOUNCE)}">❌ Abaixo: troca</span></div>
</div></div>`;

// CENA 4: a pastilha troca nos dois lados do mesmo eixo
h += `<div class="scene" style="${sceneStyle(T.s4)}"><div class="cam" style="${camStyle(T.s4)}">
  <div class="hd c" style="top:170px;font-size:92px;line-height:1.06">${words('Pastilha troca', W(46), .12)}<br>${neonWords('nos dois lados', W(48), .14)}</div>
  <div class="e45car" style="left:260px;top:440px;animation:${A('stIn', .5, W(44))}">${TOP}</div>
  <div class="e45ck" style="left:270px;top:520px;animation:${A('popb', .4, W(49), BOUNCE)}">✓</div>
  <div class="e45ck" style="left:726px;top:520px;animation:${A('popb', .4, W(50), BOUNCE)}">✓</div>
  <div class="e43tag y" style="left:0;right:0;text-align:center;top:1240px;animation:${A('popb', .45, W(50) - .2, BOUNCE)}">MESMO EIXO</div>
</div></div>`;

// CENA 5: na dúvida, pergunta pro Dr. Jarvys no app
h += `<div class="scene" style="${sceneStyle(T.s5)}"><div class="cam" style="${camStyle(T.s5)}">
  <img class="e41logo" src="${ICON}" style="left:410px;top:150px;animation:${A('popb', .5, W(54) - .1, BOUNCE)}">
  <div class="hd c" style="top:440px;font-size:80px;line-height:1.06">${words('Na dúvida,', W(54), .12)}<br>${neonWords('pergunta pro Dr. Jarvys', W(56), .12)}</div>
  <div class="e41b u" style="top:680px;font-size:40px;white-space:nowrap;animation:${A('popb', .4, W(57), BOUNCE)}">Pediram R$&nbsp;900 na pastilha. Tá caro?</div>
  <div class="e41b j" style="top:830px;font-size:40px;animation:${A('stIn', .45, W(59))}">Na média, a troca sai de R$&nbsp;150 a R$&nbsp;400. Se tem disco no orçamento, pede pra medir antes. 📏</div>
  <div class="abs" style="left:0;right:0;top:1150px;text-align:center"><span class="pillx ok" style="position:relative;font-size:40px;animation:${A('popb', .45, W(61), BOUNCE)}">📱 Dr. Jarvys no app: grátis</span></div>
  <div class="e41note" style="top:1300px;animation:${A('fade', .4, W(60))}">conversa e valores de exemplo</div>
</div></div>`;

// CENA 6: manda pra quem vai mexer no freio
h += `<div class="scene" style="${sceneStyle(T.s6)}"><div class="cam" style="${camStyle(T.s6)}">
  <div class="hd c" style="top:220px;font-size:96px;line-height:1.06">${words('Manda pra quem', W(62), .1)}<br>${neonWords('vai mexer no freio', W(65), .1)}</div>
  <div class="e41send" style="top:600px;animation:${A('fly41', 1.4, W(62))}">📤</div>
  <div class="e41chat" style="top:940px;animation:${A('stIn', .5, W(63))}">Antes de trocar o freio, olha isso 👀</div>
</div></div>`;

// CENA 7: já te cobraram caro no freio? comenta aí
h += `<div class="scene" style="${sceneStyle(T.s7)}"><div class="cam" style="${camStyle(T.s7)}">
  <div class="hd c" style="top:260px;font-size:96px;line-height:1.06">${words('Já te cobraram', W(69), .12)}<br>${neonWords('caro no freio?', W(72), .14)}</div>
  <div class="abs" style="left:0;right:0;top:640px;text-align:center;white-space:nowrap"><span class="pillx bad" style="position:relative;margin-right:30px;animation:${A('popb', .45, W(73), BOUNCE)}">😤 Já</span><span class="pillx ok" style="position:relative;animation:${A('popb', .45, W(73) + .25, BOUNCE)}">🙌 Nunca</span></div>
  <div class="abs" style="left:0;right:0;top:880px;text-align:center"><span class="cm" style="position:relative;animation:${A('popb', .5, W(75) - .1, BOUNCE)}">💬 Comenta aí 👇</span></div>
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
