// Semana 2 do @jarvys.ia (11/10 a 17/10/2026). Mesmo visual da semana 1.
// Posts: 1080x1350. Reels: quadros 1080x1920 (viram MP4 com ffmpeg).
const C = {
  bg: '#0c192a', card: '#172537', fg: '#f0f6fc', muted: '#97a7b7', neon: '#3ac7ff', onNeon: '#061223',
  soft: 'rgba(58,199,255,0.15)', border: 'rgba(40,61,78,0.9)', ok: '#41d686', warn: '#f9c718', bad: '#f94144', none: '#7b8799',
};
const ICON = 'https://www.jarvys.com.br/icon-512.png';

function h(type, style, ...children) {
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  const props = { style: { display: 'flex', ...style } };
  if (type === 'img') { props.src = style.src; delete props.style.src; props.width = style.width; props.height = style.height; }
  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;
  return { type, props };
}
const t = (style, text) => h('div', style, text);
const rich = (parts, style) => {
  const gap = Math.round((style.fontSize || 40) * 0.26);
  const out = [];
  parts.forEach((p) => {
    const neon = Array.isArray(p); const str = neon ? p[0] : p;
    str.replace(/R\$ /g, 'R$ ').split(/[ \t\n]+/).filter(Boolean).forEach((w) => out.push(
      t(neon ? { color: C.neon, textShadow: '0 0 24px rgba(58,199,255,0.55)', marginRight: gap } : { marginRight: gap }, w)));
  });
  return h('div', { flexWrap: 'wrap', ...style }, out);
};
const header = (right) => h('div', { alignItems: 'center', justifyContent: 'space-between' },
  h('div', { alignItems: 'center', gap: 16 },
    h('img', { src: ICON, width: 64, height: 64, borderRadius: 16 }),
    t({ fontFamily: 'Orbitron', fontSize: 26, fontWeight: 700, letterSpacing: 6 }, 'JARVYS')),
  right ? t({ fontSize: 24, color: C.muted, fontWeight: 500 }, right) : null);
const footer = () => h('div', { justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: C.muted },
  t({}, 'A IA que cuida do seu carro'), t({ color: C.neon, fontWeight: 600 }, 'jarvys.com.br'));
const BG = { backgroundColor: C.bg, color: C.fg, fontFamily: 'Inter', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(58,199,255,0.22), rgba(12,25,42,0) 55%)', position: 'relative' };

function frame(page, total, ...body) {
  return h('div', { width: 1080, height: 1350, flexDirection: 'column', padding: '64px 72px', ...BG },
    header(total ? `${page}/${total}` : null),
    h('div', { flexDirection: 'column', flexGrow: 1, marginTop: 56 }, ...body),
    footer());
}
function reel(...body) {
  return h('div', { width: 1080, height: 1920, flexDirection: 'column', padding: '150px 72px 330px', ...BG },
    header(null),
    h('div', { flexDirection: 'column', flexGrow: 1, marginTop: 48 }, ...body));
}

const eyebrow = (s) => t({ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 700, letterSpacing: 6, color: C.neon, marginBottom: 28 }, s.toUpperCase());
const title = (parts, size = 76, extra = {}) => rich(parts, { fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, ...extra });
const lead = (s, extra = {}) => t({ fontSize: 34, color: C.muted, lineHeight: 1.45, marginTop: 28, ...extra }, s);
const spacer = () => h('div', { flexGrow: 1 });

const b = (s) => ({ b: s });
function flow(parts, size = 30) {
  const out = [];
  [].concat(parts).forEach((p) => {
    const bold = typeof p === 'object' && p !== null && 'b' in p; const str = bold ? p.b : p;
    if (typeof str !== 'string') { out.push(str); return; }
    str.replace(/R\$ /g, 'R$ ').split(/[ \t\n]+/).filter(Boolean).forEach((w) => out.push(t({ fontWeight: bold ? 800 : 400, marginRight: Math.round(size * 0.3) }, w)));
  });
  return out;
}
const svg = (w, hgt, children, vb = '0 0 24 24', extra = {}) => ({ type: 'svg', props: { width: w, height: hgt, viewBox: vb, fill: 'none', stroke: C.neon, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', ...extra, children } });
const path = (d, p = {}) => ({ type: 'path', props: { d, ...p } });
const circle = (cx, cy, r, p = {}) => ({ type: 'circle', props: { cx, cy, r, ...p } });
const rect = (x, y, width, height, rx, p = {}) => ({ type: 'rect', props: { x, y, width, height, rx, ...p } });
const CAM = () => svg(36, 36, [path('M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'), circle(12, 13, 3)]);
const DOC = () => svg(36, 36, [path('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'), path('M14 2v6h6'), path('M8 13h8'), path('M8 17h5')]);
const ARROW = () => svg(36, 36, [path('M5 12h14'), path('m12 5 7 7-7 7')]);
const chip = (icon, label) => h('div', { alignItems: 'center', gap: 16, color: C.neon, fontWeight: 600 },
  h('div', { width: 64, height: 64, borderRadius: 16, backgroundColor: 'rgba(58,199,255,0.25)', alignItems: 'center', justifyContent: 'center' }, icon),
  t({}, label));
const photo = (label) => chip(CAM(), label);
const pdf = (label) => chip(DOC(), label);

function chat(bubbles, opts = {}) {
  const size = opts.size || 30;
  return h('div', { flexDirection: 'column', backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 40, padding: 36, marginTop: opts.mt ?? 48 },
    h('div', { alignItems: 'center', gap: 20, paddingBottom: 24, borderBottom: `2px solid ${C.border}` },
      h('div', { width: 72, height: 72, borderRadius: 36, backgroundColor: C.soft, alignItems: 'center', justifyContent: 'center', position: 'relative' },
        h('img', { src: ICON, width: 56, height: 56, borderRadius: 28 }),
        h('div', { position: 'absolute', right: -2, bottom: -2, width: 22, height: 22, borderRadius: 11, backgroundColor: C.ok, border: `4px solid ${C.card}` })),
      h('div', { flexDirection: 'column' },
        t({ fontSize: 30, fontWeight: 700 }, 'Jarvys'),
        t({ fontSize: 22, color: C.muted }, 'WhatsApp · online'))),
    h('div', { flexDirection: 'column', gap: 20, marginTop: 28 },
      bubbles.map(([side, content]) => {
        const user = side === 'u';
        return h('div', { justifyContent: user ? 'flex-end' : 'flex-start' },
          h('div', {
            maxWidth: 760, padding: '20px 26px', fontSize: size, lineHeight: 1.45, borderRadius: 32,
            backgroundColor: user ? C.soft : 'rgba(12,25,42,0.7)', border: user ? 'none' : `2px solid ${C.border}`,
            borderBottomRightRadius: user ? 6 : 32, borderBottomLeftRadius: user ? 32 : 6, flexWrap: 'wrap',
          }, ...flow(content, size)));
      })));
}

const ROBO = (s = 220) => svg(s, s, [
  path('M50 8 V20', { strokeWidth: 4 }), circle(50, 7, 4, { fill: C.neon }),
  rect(14, 20, 72, 56, 22, { fill: '#10243a', strokeWidth: 4 }),
  rect(24, 32, 52, 30, 14, { fill: '#061223', stroke: 'none' }),
  circle(38, 47, 6, { fill: C.neon, stroke: 'none' }), circle(62, 47, 6, { fill: C.neon, stroke: 'none' }),
  path('M42 56 Q50 61 58 56', { strokeWidth: 3 }),
  rect(6, 40, 8, 18, 4, { fill: C.neon, stroke: 'none' }), rect(86, 40, 8, 18, 4, { fill: C.neon, stroke: 'none' }),
  rect(30, 80, 40, 14, 7, { fill: '#10243a', strokeWidth: 3 }),
], '0 0 100 100');
const MECANICO = (s = 260) => svg(s, s, [
  circle(50, 54, 30, { fill: '#e0a878', stroke: 'none' }),
  path('M20 44 Q50 14 80 44 Z', { fill: '#f97316', stroke: 'none' }), rect(18, 42, 64, 7, 3, { fill: '#c2410c', stroke: 'none' }), path('M78 46 H94', { stroke: '#c2410c', strokeWidth: 6 }),
  circle(40, 56, 3.5, { fill: '#1f2937', stroke: 'none' }), circle(61, 56, 3.5, { fill: '#1f2937', stroke: 'none' }),
  path('M34 50 L45 48', { stroke: '#1f2937', strokeWidth: 3 }), path('M56 46 L67 50', { stroke: '#1f2937', strokeWidth: 3 }),
  path('M38 68 Q44 64 50 67 Q56 64 62 68 Q56 72 50 70 Q44 72 38 68 Z', { fill: '#3f2a1d', stroke: 'none' }),
  path('M44 76 Q52 80 60 75', { stroke: '#7c2d12', strokeWidth: 2.5 }),
  path('M86 70 L96 92', { stroke: '#94a3b8', strokeWidth: 6 }), circle(85, 68, 6, { stroke: '#94a3b8', strokeWidth: 4 }),
], '0 0 100 100');
const ESQUECIDO = (s = 260) => svg(s, s, [
  circle(50, 56, 30, { fill: '#c98b5e', stroke: 'none' }),
  path('M22 46 L28 26 L36 38 L42 20 L50 36 L58 20 L64 38 L72 26 L78 46 Q50 34 22 46 Z', { fill: '#3b2416', stroke: 'none' }),
  circle(40, 58, 5, { fill: '#fff', stroke: 'none' }), circle(41, 59, 2.5, { fill: '#111827', stroke: 'none' }),
  circle(60, 58, 5, { fill: '#fff', stroke: 'none' }), circle(59, 57, 2.5, { fill: '#111827', stroke: 'none' }),
  path('M42 74 Q50 70 58 75', { stroke: '#5b2b14', strokeWidth: 3 }),
  path('M84 14 Q92 6 96 14 Q98 20 90 24 V30', { stroke: C.warn, strokeWidth: 4 }), circle(90, 37, 2.5, { fill: C.warn, stroke: 'none' }),
  path('M4 22 Q10 14 15 21 Q17 26 11 29 V34', { stroke: C.warn, strokeWidth: 3.5 }), circle(11, 40, 2.2, { fill: C.warn, stroke: 'none' }),
], '0 0 100 100');
const ORGANIZADA = (s = 260) => svg(s, s, [
  circle(50, 18, 10, { fill: '#2b1a12', stroke: 'none' }),
  circle(50, 54, 30, { fill: '#a8714c', stroke: 'none' }),
  path('M20 52 Q24 22 50 24 Q76 22 80 52 Q70 36 50 36 Q30 36 20 52 Z', { fill: '#2b1a12', stroke: 'none' }),
  path('M36 56 Q40 52 44 56', { stroke: '#1f2937', strokeWidth: 3 }), path('M56 56 Q60 52 64 56', { stroke: '#1f2937', strokeWidth: 3 }),
  path('M40 68 Q50 77 60 68', { stroke: '#7f1d1d', strokeWidth: 3 }),
  rect(74, 64, 22, 30, 4, { fill: '#e2e8f0', stroke: 'none' }), path('M79 79 L84 84 L92 72', { stroke: C.ok, strokeWidth: 3.5 }),
], '0 0 100 100');

const speech = (txt, size = 40) => h('div', {
  backgroundColor: '#f0f6fc', color: '#0c192a', borderRadius: 36, padding: '28px 36px', fontSize: size, fontWeight: 700, lineHeight: 1.3, flexWrap: 'wrap', maxWidth: 820,
}, ...flow(txt, size));
const persona = (fig, name) => h('div', { flexDirection: 'column', alignItems: 'center' }, fig,
  t({ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 700, letterSpacing: 4, color: C.muted, marginTop: 8 }, name.toUpperCase()));
const caption = (parts, size = 72) => title(parts, size, { justifyContent: 'center', textAlign: 'center' });
const ctaBtn = (size = 44) => h('div', { backgroundColor: C.neon, color: C.onNeon, fontSize: size, fontWeight: 700, padding: '30px 64px', borderRadius: 40, boxShadow: '0 0 0 2px rgba(58,199,255,0.35), 0 20px 70px -10px rgba(58,199,255,0.6)' }, 'jarvys.com.br');
const reelCta = (tag) => reel(
  h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
    ROBO(300),
    caption(['Teste ', ['30 dias grátis.']], 88),
    t({ fontSize: 36, color: C.muted, marginTop: 28, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, tag),
    h('div', { marginTop: 56 }, ctaBtn(48)),
    t({ fontSize: 30, color: C.muted, marginTop: 32 }, 'Sem cartão. Depois, R$ 29,90 por carro, uma vez só.')));
const nota = (s) => t({ fontSize: 22, color: C.muted, marginTop: 20 }, s);

const r1chat = [
  ['u', 'quanto custa a revisão?'],
  ['b', ['A revisão de', b('40.000 km'), 'do seu Chevrolet Onix fica, em média, entre', b('R$ 650 e R$ 900.')]],
  ['b', ['O que mais pesa: óleo, filtros e fluido de freio. Quer ver item por item? Manda:', b('próxima revisão')]],
];
const R1 = {
  'semana2/reel1-1': () => reel(
    eyebrow('Já aconteceu com você?'),
    caption(['A oficina te passou um ', ['orçamento...']], 84),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Essa revisão aí fica', b('R$ 1.800,'), 'patrão. Tá barato!'], 44),
      persona(MECANICO(420), 'o mecânico espertinho')),
    spacer()),
  'semana2/reel1-2': () => reel(
    eyebrow('Já aconteceu com você?'),
    caption(['...e você não faz ideia ', ['se tá caro?']], 84),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Essa revisão aí fica', b('R$ 1.800,'), 'patrão. Tá barato!'], 44),
      persona(MECANICO(420), 'o mecânico espertinho')),
    spacer()),
  'semana2/reel1-3': () => reel(h('div', { height: 160 }), caption(['Pergunta pro ', ['Jarvys.']], 84), chat(r1chat.slice(0, 1), { size: 42 }), spacer()),
  'semana2/reel1-4': () => reel(h('div', { height: 160 }), caption(['Pergunta pro ', ['Jarvys.']], 84), chat(r1chat.slice(0, 2), { size: 42 }), spacer()),
  'semana2/reel1-5': () => reel(h('div', { height: 160 }), caption(['Pergunta pro ', ['Jarvys.']], 84), chat(r1chat, { size: 42 }), nota('Valores ilustrativos. O Jarvys calcula para o seu carro.'), spacer()),
  'semana2/reel1-6': () => reel(
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', gap: 40 },
      caption(['Agora você chega na oficina ', ['sabendo o preço justo.']], 80),
      h('div', { alignItems: 'flex-end', gap: 30 }, persona(ROBO(300), 'Jarvys'), persona(MECANICO(240), 'o mecânico')),
      speech(['Hã... deixa eu refazer as contas aqui.'], 40))),
  'semana2/reel1-7': () => reelCta('Pergunte o preço da revisão antes de ir na oficina.'),
};

const N = 7;
const K1 = {
  'semana2/post2-1': () => frame(1, N,
    eyebrow('No WhatsApp'),
    title(['5 mensagens que você pode me mandar ', ['hoje']], 92),
    lead('Sem app cheio de formulário. Você escreve do seu jeito, como fala com um amigo, e eu cuido do resto.'),
    spacer(),
    h('div', { alignItems: 'center', gap: 32 }, ROBO(220),
      h('div', { flexDirection: 'column', fontSize: 32, lineHeight: 1.45 }, t({ fontWeight: 700 }, 'Oi! Eu sou o Jarvys,'), t({ color: C.muted }, 'a IA que cuida do seu carro.'))),
    h('div', { alignItems: 'center', gap: 16, fontSize: 30, color: C.neon, fontWeight: 600, marginTop: 48, marginBottom: 32 }, t({}, 'Arrasta para o lado'), ARROW())),
  'semana2/post2-2': () => frame(2, N, eyebrow('1. Gastos'), title(['Gastou? ', ['Me fala.']]),
    chat([['u', 'gastei 150 de gasolina'], ['b', ['Anotar', b('R$ 150,00'), 'em Combustível no Chevrolet Onix? Responda sim para confirmar.']], ['u', 'sim'], ['b', 'Anotado! E qual a km do painel agora?']])),
  'semana2/post2-3': () => frame(3, N, eyebrow('2. Quilometragem'), title(['Tira foto ', ['do painel.']]),
    chat([['u', photo('foto do painel')], ['b', ['Li no painel:', b('48.320 km.'), 'Anotar no Chevrolet Onix?']], ['u', 'sim'], ['b', 'Guardado! Quando a revisão chegar perto, eu te aviso.']])),
  'semana2/post2-4': () => frame(4, N, eyebrow('3. Notas'), title(['Perdeu a nota? ', ['Eu guardei.']]),
    chat([['u', 'me manda a nota do óleo'], ['b', 'Aqui está a nota da sua última troca de óleo:'], ['b', pdf('nota-troca-de-oleo.pdf')]])),
  'semana2/post2-5': () => frame(5, N, eyebrow('4. Revisão'), title(['O que trocar ', ['na revisão?']]),
    chat([['u', 'próxima revisão'], ['b', ['Sua próxima é a de', b('50.000 km.'), 'Vai trocar: óleo, filtro de óleo, filtro de ar e filtro de combustível. Te mando os links das peças.']]])),
  'semana2/post2-6': () => frame(6, N, eyebrow('5. Quanto gastei'), title(['Quanto o carro ', ['me custou?']]),
    chat([['u', 'quanto gastei esse mês?'], ['b', ['Em outubro você gastou', b('R$ 430,00'), 'com o Chevrolet Onix.']]]),
    nota('Valores de exemplo.')),
  'semana2/post2-7': () => frame(7, N,
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
      ROBO(260),
      title(['Testa ', ['30 dias grátis.']], 84, { justifyContent: 'center', marginTop: 48 }),
      t({ fontSize: 32, color: C.muted, marginTop: 24, textAlign: 'center', lineHeight: 1.45, maxWidth: 820 }, 'Crie sua conta e o Jarvys no WhatsApp vem com tudo liberado. Sem cartão.'),
      h('div', { marginTop: 56 }, ctaBtn(40)),
      t({ fontSize: 26, color: C.muted, marginTop: 32 }, 'Depois, R$ 29,90 por carro, uma vez só.'))),
};

const P3 = {
  'semana2/post3-1': () => frame(null, null,
    eyebrow('Faz a conta'),
    title(['Esquecer o óleo ', ['sai caro.']], 96),
    h('div', { flexDirection: 'column', gap: 28, marginTop: 64 },
      h('div', { alignItems: 'center', gap: 32, backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 36, padding: '40px 44px' },
        h('div', { width: 30, height: 30, borderRadius: 15, backgroundColor: C.bad, boxShadow: `0 0 24px ${C.bad}` }),
        h('div', { flexDirection: 'column', flexGrow: 1 }, t({ fontSize: 30, color: C.muted }, 'Esqueceu a troca de óleo'), t({ fontSize: 34, fontWeight: 700, marginTop: 4 }, 'motor batido')),
        t({ fontSize: 64, fontWeight: 800, color: C.bad }, 'R$ 5.000')),
      h('div', { alignItems: 'center', gap: 32, backgroundColor: C.soft, border: `2px solid ${C.neon}`, borderRadius: 36, padding: '40px 44px', boxShadow: '0 0 60px -10px rgba(58,199,255,0.5)' },
        h('div', { width: 30, height: 30, borderRadius: 15, backgroundColor: C.ok, boxShadow: `0 0 24px ${C.ok}` }),
        h('div', { flexDirection: 'column', flexGrow: 1 }, t({ fontSize: 30, color: C.muted }, 'Jarvys te avisa antes'), t({ fontSize: 34, fontWeight: 700, marginTop: 4 }, 'uma vez só, por carro')),
        t({ fontSize: 64, fontWeight: 800, color: C.neon }, 'R$ 29,90'))),
    lead('Sem mensalidade e sem cartão. E os primeiros 30 dias são grátis, com tudo liberado.'),
    spacer(),
    h('div', { alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, marginBottom: 36 }, t({}, 'Crie sua conta em'), t({ color: C.neon }, 'jarvys.com.br'))),
};

const r2chat = [
  ['u', photo('foto do painel')],
  ['b', ['Li no painel:', b('48.320 km.'), 'Anotar no Chevrolet Onix?']],
  ['u', 'sim'],
  ['b', 'Anotado! Pode esquecer, que eu lembro. Quando a revisão chegar perto, eu te aviso.'],
];
const R2 = {
  'semana2/reel2-1': () => reel(
    eyebrow('Conhece alguém assim?'),
    caption(['Esqueceu a revisão ', ['de novo?']], 88),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Revisão? Acho que fiz... ano passado? Ou retrasado?'], 42),
      persona(ESQUECIDO(440), 'o motorista que esquece tudo')),
    spacer()),
  'semana2/reel2-2': () => reel(h('div', { height: 160 }), caption(['Tira uma foto ', ['do painel.']], 84), chat(r2chat.slice(0, 1), { size: 42 }), spacer()),
  'semana2/reel2-3': () => reel(h('div', { height: 160 }), caption(['Tira uma foto ', ['do painel.']], 84), chat(r2chat.slice(0, 2), { size: 42 }), spacer()),
  'semana2/reel2-4': () => reel(h('div', { height: 160 }), caption(['Tira uma foto ', ['do painel.']], 84), chat(r2chat, { size: 42 }), spacer()),
  'semana2/reel2-5': () => reel(
    eyebrow('Semanas depois...'),
    caption(['O Jarvys ', ['avisa sozinho.']], 84),
    chat([['b', ['Oi! Seu Chevrolet Onix está chegando nos', b('50.000 km.'), 'Hora da revisão. Quer ver o que trocar? Manda:', b('próxima revisão')]]], { size: 42 }),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ROBO(240), 'Jarvys')),
    spacer()),
  'semana2/reel2-6': () => reelCta('Mande a km do painel e eu te aviso da revisão. Isso é grátis para sempre.'),
};

const M = 4;
const K2 = {
  'semana2/post5-1': () => frame(1, M,
    eyebrow('Dr. Jarvys'),
    title(['Acendeu uma luz ', ['no painel.'], ' E agora?'], 92),
    lead('Calma. Tira uma foto e me pergunta. Eu olho e te explico o que é, sem complicar.'),
    spacer(),
    h('div', { alignItems: 'center', gap: 32, marginBottom: 40 }, ROBO(200),
      h('div', { flexDirection: 'column', fontSize: 30, lineHeight: 1.45 }, t({ fontWeight: 700 }, 'Dr. Jarvys'), t({ color: C.muted }, 'o especialista do seu carro, no bolso.')))),
  'semana2/post5-2': () => frame(2, M, eyebrow('Luz no painel'), title(['Manda a foto ', ['e pergunta.']]),
    chat([['u', photo('foto do painel')], ['u', 'que luz é essa?'],
      ['b', ['Essa é a luz da', b('pressão do óleo.'), 'Pare o carro num lugar seguro e confira o nível do óleo. Se ela continuar acesa, não rode: chame um mecânico.']]])),
  'semana2/post5-3': () => frame(3, M, eyebrow('Dúvidas'), title(['Qualquer dúvida ', ['do seu carro.']]),
    chat([['u', 'qual óleo meu carro usa?'], ['b', ['Pela ficha técnica do seu', b('Chevrolet Onix,'), 'eu te digo o óleo certo e quantos litros vão no motor.']]]),
    lead('Pode perguntar por texto, por áudio ou mandando foto.', { fontSize: 30 })),
  'semana2/post5-4': () => frame(4, M,
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
      ROBO(260),
      title(['Fala com o ', ['Dr. Jarvys.']], 84, { justifyContent: 'center', marginTop: 48 }),
      t({ fontSize: 32, color: C.muted, marginTop: 24, textAlign: 'center', lineHeight: 1.45, maxWidth: 840 }, 'No app ele é grátis para sempre. No WhatsApp, os primeiros 30 dias vêm liberados.'),
      h('div', { marginTop: 56 }, ctaBtn(40)))),
};

const P6 = {
  'semana2/post6-1': () => frame(null, null,
    eyebrow('Vai vender o carro?'),
    title(['Carro com histórico ', ['vale mais.']], 96),
    lead('Cada nota que você me manda vira uma linha na timeline do carro. Na hora de vender, você mostra tudo no Certificado Jarvys.'),
    h('div', { flexDirection: 'column', gap: 18, marginTop: 56 },
      ...[['mar', 'Troca de óleo e filtro', '42.100 km'], ['jun', 'Pastilhas de freio', '45.800 km'], ['set', 'Revisão de 50.000 km', '50.050 km']].map(([m, s, km]) =>
        h('div', { alignItems: 'center', gap: 28, backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 28, padding: '26px 32px' },
          h('div', { width: 18, height: 18, borderRadius: 9, backgroundColor: C.ok, boxShadow: `0 0 14px ${C.ok}` }),
          t({ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 700, color: C.neon, width: 80, letterSpacing: 2 }, m.toUpperCase()),
          t({ fontSize: 32, fontWeight: 700, flexGrow: 1 }, s), t({ fontSize: 26, color: C.muted }, km)))),
    spacer(),
    h('div', { alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, marginBottom: 36 }, t({}, 'Comece seu histórico grátis em'), t({ color: C.neon }, 'jarvys.com.br'))),
};

const r3chat = [
  ['u', 'gastei 150 de gasolina'],
  ['b', ['Anotar', b('R$ 150,00'), 'em Combustível no Chevrolet Onix? Responda sim para confirmar.']],
  ['u', 'sim'],
  ['b', 'Anotado!'],
];
const R3 = {
  'semana2/reel3-1': () => reel(
    eyebrow('Motorista de aplicativo'),
    caption(['Roda o dia todo e ', ['não sabe quanto o carro come?']], 80),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ORGANIZADA(460), 'a motorista organizada')),
    spacer()),
  'semana2/reel3-2': () => reel(h('div', { height: 160 }), caption(['Abasteceu? ', ['Manda uma mensagem.']], 80), chat(r3chat.slice(0, 1), { size: 42 }), spacer()),
  'semana2/reel3-3': () => reel(h('div', { height: 160 }), caption(['Abasteceu? ', ['Manda uma mensagem.']], 80), chat(r3chat.slice(0, 2), { size: 42 }), spacer()),
  'semana2/reel3-4': () => reel(h('div', { height: 160 }), caption(['Abasteceu? ', ['Manda uma mensagem.']], 80), chat(r3chat, { size: 42 }), spacer()),
  'semana2/reel3-5': () => reel(
    eyebrow('No fim do mês'),
    caption(['Eu faço ', ['a conta.']], 84),
    chat([['u', 'quanto gastei esse mês?'], ['b', ['Em outubro você gastou', b('R$ 1.240,00'), 'com o Chevrolet Onix.']]], { size: 42 }),
    nota('Valores de exemplo.'),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ORGANIZADA(260), 'sem planilha'))),
  'semana2/reel3-6': () => reelCta('Gasto anotado em segundos, pelo WhatsApp, sem planilha.'),
};

const SLIDES = { ...R1, ...K1, ...P3, ...R2, ...K2, ...P6, ...R3 };
export { SLIDES, C };
