// Semana 3 do @jarvys.ia (18/10 a 24/10/2026). Mesmo visual das semanas 1 e 2.
// Posts: 1080x1350. Reels: quadros 1080x1920 (viram MP4 com reel.sh).
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

// ---------- extras da semana 3
const status = (name, word, km, color) => h('div', { flexDirection: 'column', flexGrow: 1, flexBasis: 0, backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 28, padding: '32px 36px' },
  h('div', { justifyContent: 'space-between', alignItems: 'center', fontSize: 28, color: C.muted },
    t({}, name), h('div', { width: 26, height: 26, borderRadius: 13, backgroundColor: color, boxShadow: `0 0 20px ${color}` })),
  t({ fontSize: 48, fontWeight: 800, marginTop: 14, color }, word),
  t({ fontSize: 26, color: C.muted, marginTop: 6 }, km));
const MIC = () => svg(36, 36, [rect(9, 2, 6, 12, 3), path('M5 10v1a7 7 0 0 0 14 0v-1'), path('M12 18v4')]);
const audio = (label) => chip(MIC(), label);
const dica = (s) => t({ fontSize: 30, color: C.muted, lineHeight: 1.45, marginTop: 24 }, s);
const arrastaRow = () => h('div', { alignItems: 'center', gap: 16, fontSize: 30, color: C.neon, fontWeight: 600, marginTop: 40, marginBottom: 32 }, t({}, 'Arrasta para o lado'), ARROW());

// print real (borrado nas placas), 1320x2868 no original
const PROVA = 'https://raw.githubusercontent.com/JarvysIA/jarvys-instagram/main/2026-10/lote3/prova-c4.jpg';
function shot(w, y0, y1, extra = {}) {
  const s = w / 1320; const hh = Math.round((y1 - y0) * s);
  return h('div', { width: w, height: hh, borderRadius: 36, overflow: 'hidden', position: 'relative', border: `4px solid ${C.border}`, boxShadow: '0 30px 80px -20px rgba(58,199,255,0.45)', ...extra },
    h('img', { src: PROVA, width: w, height: Math.round(2868 * s), position: 'absolute', top: -Math.round(y0 * s), left: 0 }));
}
const selo = (s) => h('div', { alignSelf: 'flex-start', alignItems: 'center', gap: 12, backgroundColor: 'rgba(65,214,134,0.15)', border: `2px solid ${C.ok}`, color: C.ok, borderRadius: 999, padding: '10px 22px', fontSize: 24, fontWeight: 700 },
  h('div', { width: 14, height: 14, borderRadius: 7, backgroundColor: C.ok }), t({}, s));

// ---------- CARROSSEL 1 (dom 18/10, 12h15): prova real, sem filtro
const NP = 4;
const K1 = {
  'semana3/post1-1': () => frame(1, NP,
    h('div', { gap: 48, flexGrow: 1 },
      h('div', { flexDirection: 'column', width: 520 },
        selo('Uso real'),
        h('div', { height: 36 }),
        eyebrow('Sem filtro'),
        title(['Uma conversa ', ['de verdade'], ' com o Jarvys.'], 76),
        lead('Print real de quem usa o Jarvys com um Citroen C4. Não mudamos nada na conversa. Só borramos as placas da rua.', { fontSize: 31 }),
        spacer(),
        arrastaRow()),
      shot(410, 0, 2868))),
  'semana3/post1-2': () => frame(2, NP,
    eyebrow('1. A foto'),
    title(['Ele mandou só ', ['a foto do painel.']], 68),
    h('div', { justifyContent: 'center', marginTop: 40 }, shot(640, 380, 1990))),
  'semana3/post1-3': () => frame(3, NP,
    eyebrow('2. A resposta'),
    title(['Eu li ', ['113.464 km'], ' e perguntei qual carro.'], 68),
    h('div', { justifyContent: 'center', marginTop: 40 }, shot(860, 1640, 2620)),
    dica('Ele tem dois carros na garagem. Respondeu "1", e eu atualizei a km do C4. Quando a revisão chegar perto, eu aviso.')),
  'semana3/post1-4': () => frame(4, NP,
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
      ROBO(260),
      title(['Agora é ', ['a sua vez.']], 88, { justifyContent: 'center', marginTop: 48 }),
      t({ fontSize: 32, color: C.muted, marginTop: 24, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, 'Crie sua conta, cadastre o carro pela placa e me manda a foto do painel. Os primeiros 30 dias vêm com tudo liberado, sem cartão.'),
      h('div', { marginTop: 56 }, ctaBtn(40)))),
};

// ---------- REEL 1 (seg 19/10, 19h30): a nota perdida (motorista que esquece tudo)
const r1chat = [
  ['u', photo('foto da nota da oficina')],
  ['b', ['Li a nota:', b('troca de óleo e filtro,'), b('R$ 280,00.'), 'Anotar em Manutenção no Hyundai HB20? Responda sim para confirmar.']],
  ['u', 'sim'],
  ['b', 'Anotado! E a nota fica guardada comigo.'],
];
const R1 = {
  'semana3/reel1-1': () => reel(
    eyebrow('Conhece alguém assim?'),
    caption(['Cadê a nota ', ['da oficina?']], 88),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Tava no porta-luvas... eu acho. Ou foi pro lixo?'], 42),
      persona(ESQUECIDO(440), 'o motorista que esquece tudo')),
    spacer()),
  'semana3/reel1-2': () => reel(h('div', { height: 160 }), caption(['Tira foto ', ['da nota.']], 84), chat(r1chat.slice(0, 1), { size: 42 }), spacer()),
  'semana3/reel1-3': () => reel(h('div', { height: 160 }), caption(['Tira foto ', ['da nota.']], 84), chat(r1chat.slice(0, 2), { size: 42 }), spacer()),
  'semana3/reel1-4': () => reel(h('div', { height: 160 }), caption(['Tira foto ', ['da nota.']], 84), chat(r1chat, { size: 42 }), nota('Valores de exemplo.'), spacer()),
  'semana3/reel1-5': () => reel(
    eyebrow('Meses depois...'),
    caption(['Precisou da nota? ', ['Eu devolvo.']], 84),
    chat([['u', 'me manda a nota do óleo'], ['b', 'Aqui está a nota da sua última troca de óleo:'], ['b', pdf('nota-troca-de-oleo')]], { size: 42 }),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ROBO(220), 'Jarvys')),
    spacer()),
  'semana3/reel1-6': () => reelCta('Manda a foto da nota: eu anoto o gasto e guardo a nota pra você.'),
};

// ---------- POST 3 (ter 20/10, 12h15): grátis ou completo
const plano = (nome, preco, sub, itens, destaque) => h('div', {
  flexDirection: 'column', flexGrow: 1, flexBasis: 0, borderRadius: 36, padding: '40px 36px',
  backgroundColor: destaque ? C.soft : C.card, border: `2px solid ${destaque ? C.neon : C.border}`,
  boxShadow: destaque ? '0 0 60px -10px rgba(58,199,255,0.5)' : 'none',
},
  t({ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 700, letterSpacing: 4, color: destaque ? C.neon : C.muted }, nome.toUpperCase()),
  t({ fontSize: 64, fontWeight: 800, marginTop: 16, color: destaque ? C.neon : C.fg }, preco),
  t({ fontSize: 24, color: C.muted, marginTop: 4 }, sub),
  h('div', { flexDirection: 'column', gap: 14, marginTop: 28 },
    itens.map((s) => h('div', { gap: 14, fontSize: 27, lineHeight: 1.35 },
      h('div', { width: 14, height: 14, borderRadius: 7, marginTop: 11, flexShrink: 0, backgroundColor: destaque ? C.neon : C.ok }), t({ flexShrink: 1 }, s)))));
const P3 = {
  'semana3/post3-1': () => frame(null, null,
    eyebrow('Sem letra miúda'),
    title(['Grátis ou ', ['Completo?']], 92),
    h('div', { gap: 24, marginTop: 48 },
      plano('Grátis', 'R$ 0', 'para sempre', ['App inteiro: garagem, Status de Saúde e FIPE', 'Nota pela foto no app', 'Dr. Jarvys no app', 'No WhatsApp: km e aviso de revisão'], false),
      plano('Completo', 'R$ 29,90', 'por carro, uma vez só', ['Tudo do grátis', 'Gastos pelo WhatsApp', 'Foto da nota e do painel', 'Preço da revisão', 'Dr. Jarvys por texto, áudio e foto'], true)),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', marginBottom: 32 },
      t({ fontSize: 32, fontWeight: 700 }, 'Teste 30 dias com tudo liberado.'),
      t({ fontSize: 28, color: C.muted, marginTop: 8 }, 'Sem mensalidade, sem cartão. Pagamento por Pix.'))),
};

// ---------- REEL 2 (qua 21/10, 19h30): manda um áudio (motorista organizada)
const r2chat = [
  ['u', audio('áudio 0:04')],
  ['b', ['Anotar', b('R$ 200,00'), 'em Combustível no Fiat Argo? Responda sim para confirmar.']],
  ['u', 'sim'],
  ['b', 'Anotado! E qual a km do painel agora?'],
];
const ouviu = () => t({ fontSize: 36, color: C.muted, marginTop: 28, textAlign: 'center', justifyContent: 'center' }, 'No áudio: "abasteci 200 de gasolina"');
const R2 = {
  'semana3/reel2-1': () => reel(
    eyebrow('Motorista de aplicativo'),
    caption(['Parou pra abastecer e ', ['tá com pressa?']], 84),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ORGANIZADA(460), 'a motorista organizada')),
    spacer()),
  'semana3/reel2-2': () => reel(h('div', { height: 160 }), caption(['Manda ', ['um áudio.']], 88), chat(r2chat.slice(0, 1), { size: 40 }), ouviu(), spacer()),
  'semana3/reel2-3': () => reel(h('div', { height: 160 }), caption(['Manda ', ['um áudio.']], 88), chat(r2chat.slice(0, 2), { size: 40 }), ouviu(), spacer()),
  'semana3/reel2-4': () => reel(h('div', { height: 160 }), caption(['Manda ', ['um áudio.']], 88), chat(r2chat, { size: 40 }), ouviu(), spacer()),
  'semana3/reel2-5': () => reel(
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', gap: 40 },
      caption(['Rapidinho, ', ['do seu jeito.']], 88),
      h('div', { alignItems: 'flex-end', gap: 30 }, persona(ORGANIZADA(260), 'ela fala'), persona(ROBO(260), 'eu anoto')),
      t({ fontSize: 38, color: C.muted, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, 'Por áudio, por texto ou por foto. Eu entendo e anoto.'))),
  'semana3/reel2-6': () => reelCta('Áudio, texto ou foto: eu entendo e anoto pra você.'),
};

// ---------- CARROSSEL 2 (qui 22/10, 12h15): as cores do Status de Saúde
const NS = 5;
const cor = (name, word, km, color, texto) => h('div', { flexDirection: 'column', marginTop: 36 },
  h('div', { gap: 0 }, status(name, word, km, color)),
  t({ fontSize: 31, color: C.fg, lineHeight: 1.45, marginTop: 18 }, texto));
const K2 = {
  'semana3/post5-1': () => frame(1, NS,
    eyebrow('No app'),
    title(['Seu carro ', ['tá com saúde?']], 92),
    lead('No app do Jarvys, cada item do carro ganha uma cor: óleo, filtros, pastilhas e arrefecimento. Arrasta e entende o que cada cor quer dizer.'),
    spacer(),
    h('div', { gap: 22, marginBottom: 8 }, ...[C.ok, C.warn, C.bad, C.none].map((c) => h('div', { width: 70, height: 70, borderRadius: 35, backgroundColor: c, boxShadow: `0 0 30px ${c}` }))),
    arrastaRow()),
  'semana3/post5-2': () => frame(2, NS, eyebrow('Verde e amarelo'), title(['Tá em dia ', ['ou tá chegando?']], 72),
    cor('Óleo do motor', 'Em dia', 'próxima troca longe', C.ok, 'Verde: tudo certo. Pode rodar tranquilo.'),
    cor('Filtros', 'Alerta', 'troca chegando', C.warn, 'Amarelo: a hora da troca tá chegando. Já vai se programando.')),
  'semana3/post5-3': () => frame(3, NS, eyebrow('Vermelho e cinza'), title(['Atrasou ', ['ou não sei?']], 72),
    cor('Pastilhas de freio', 'Atrasado', 'passou do ponto', C.bad, 'Vermelho: passou da hora. Resolve logo, antes de virar prejuízo.'),
    cor('Arrefecimento', 'Sem registro', 'nenhuma nota ainda', C.none, 'Cinza: eu ainda não sei quando foi a última troca. Me manda a nota que eu atualizo.')),
  'semana3/post5-4': () => frame(4, NS, eyebrow('Como eu sei?'), title(['Pela km e ', ['pelas notas.']], 84),
    lead('Cada km que você me manda e cada nota da oficina entram no histórico do carro. Com isso eu calculo a cor de cada item.'),
    chat([['u', photo('foto da nota da oficina')], ['b', ['Li a nota:', b('troca de pastilhas de freio.'), 'Anotar em Manutenção? Responda sim para confirmar.']]], { mt: 40 }),
    nota('Exemplo.')),
  'semana3/post5-5': () => frame(5, NS,
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
      ROBO(260),
      title(['Veja a saúde ', ['do seu carro.']], 84, { justifyContent: 'center', marginTop: 48 }),
      t({ fontSize: 32, color: C.muted, marginTop: 24, textAlign: 'center', lineHeight: 1.45, maxWidth: 840 }, 'O Status de Saúde fica no app e é grátis para sempre. Cadastre o carro pela placa.'),
      h('div', { marginTop: 56 }, ctaBtn(40)))),
};

// ---------- POST 6 (sex 23/10, 12h15): quanto vale seu carro (FIPE)
const P6 = {
  'semana3/post6-1': () => frame(null, null,
    eyebrow('Tabela FIPE'),
    title(['Quanto vale ', ['seu carro hoje?']], 92),
    lead('Cadastre o carro pela placa: eu puxo o modelo, o ano e a FIPE. E todo mês eu te conto quanto ele vale.'),
    h('div', { flexDirection: 'column', backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 36, padding: '40px 44px', marginTop: 56 },
      h('div', { justifyContent: 'space-between', alignItems: 'center' },
        h('div', { flexDirection: 'column' }, t({ fontSize: 26, color: C.muted }, 'Minha garagem'), t({ fontSize: 40, fontWeight: 800, marginTop: 6 }, 'Renault Kwid 2020')),
        t({ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 700, letterSpacing: 4, color: C.neon }, 'FIPE')),
      h('div', { height: 2, backgroundColor: C.border, marginTop: 28, marginBottom: 28 }),
      h('div', { justifyContent: 'space-between', alignItems: 'flex-end' },
        h('div', { flexDirection: 'column' }, t({ fontSize: 26, color: C.muted }, 'Valor FIPE deste mês'), t({ fontSize: 72, fontWeight: 800, color: C.neon, marginTop: 6 }, 'R$ 48.900')),
        t({ fontSize: 26, color: C.muted, marginBottom: 14 }, 'atualiza todo mês'))),
    nota('Valores de exemplo.'),
    spacer(),
    h('div', { alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, marginBottom: 36 }, t({}, 'Grátis em'), t({ color: C.neon }, 'jarvys.com.br'))),
};

// ---------- REEL 3 (sáb 24/10, 19h30): o mecânico espertinho quer trocar tudo
const r3chat = [
  ['u', 'próxima revisão'],
  ['b', ['Sua próxima é a de', b('40.000 km.'), 'Vai trocar: óleo, filtro de óleo, filtro de ar e filtro de combustível. Te mando os links das peças.']],
];
const R3 = {
  'semana3/reel3-1': () => reel(
    eyebrow('O mecânico espertinho voltou'),
    caption(['Na revisão, ele quer ', ['trocar tudo...']], 84),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Vamos trocar correia, velas, amortecedor, embreagem...'], 42),
      persona(MECANICO(420), 'o mecânico espertinho')),
    spacer()),
  'semana3/reel3-2': () => reel(h('div', { height: 160 }), caption(['Pergunta o que ', ['é da revisão.']], 84), chat(r3chat.slice(0, 1), { size: 42 }), spacer()),
  'semana3/reel3-3': () => reel(h('div', { height: 160 }), caption(['Pergunta o que ', ['é da revisão.']], 84), chat(r3chat, { size: 42 }), nota('Exemplo. A lista muda conforme o carro e a km.'), spacer()),
  'semana3/reel3-4': () => reel(
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', gap: 40 },
      caption(['Agora você conversa ', ['sabendo o que trocar.']], 80),
      h('div', { alignItems: 'flex-end', gap: 30 }, persona(ROBO(300), 'Jarvys'), persona(MECANICO(240), 'o mecânico')),
      speech(['É... o resto dá pra ver na próxima.'], 40))),
  'semana3/reel3-5': () => reelCta('Saiba o que trocar antes de chegar na oficina.'),
};

const SLIDES = { ...K1, ...R1, ...P3, ...R2, ...K2, ...P6, ...R3 };
export { SLIDES, C };
