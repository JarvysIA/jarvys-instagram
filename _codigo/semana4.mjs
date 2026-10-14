// Semana 4 do @jarvys.ia (25/10 a 31/10/2026). Mesmo visual das semanas anteriores.
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

// ---------- extras (iguais aos da semana 3)
const MIC = () => svg(36, 36, [rect(9, 2, 6, 12, 3), path('M5 10v1a7 7 0 0 0 14 0v-1'), path('M12 18v4')]);
const audio = (label) => chip(MIC(), label);
const dica = (s) => t({ fontSize: 30, color: C.muted, lineHeight: 1.45, marginTop: 24 }, s);
const arrastaRow = () => h('div', { alignItems: 'center', gap: 16, fontSize: 30, color: C.neon, fontWeight: 600, marginTop: 40, marginBottom: 32 }, t({}, 'Arrasta para o lado'), ARROW());
const hora = (s) => h('div', { alignSelf: 'flex-start', backgroundColor: C.soft, border: `2px solid ${C.neon}`, color: C.neon, borderRadius: 999, padding: '10px 28px', fontFamily: 'Orbitron', fontSize: 30, fontWeight: 700, letterSpacing: 3, marginBottom: 28 }, s);
const fecho = (titulo, texto, size = 84) => h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
  ROBO(260),
  title(titulo, size, { justifyContent: 'center', marginTop: 48 }),
  t({ fontSize: 32, color: C.muted, marginTop: 24, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, texto),
  h('div', { marginTop: 56 }, ctaBtn(40)));

// ---------- CARROSSEL 1 (dom 25/10, 12h15): um dia normal com o Jarvys
const ND = 6;
const K1 = {
  'semana4/post1-1': () => frame(1, ND,
    eyebrow('Um dia normal'),
    title(['Um dia normal ', ['com o Jarvys.']], 96),
    lead('Do posto de manhã até a conta do fim do mês. Tudo numa conversa no WhatsApp, do seu jeito.'),
    spacer(),
    h('div', { justifyContent: 'center' }, ROBO(330)),
    arrastaRow()),
  'semana4/post1-2': () => frame(2, ND,
    hora('7h00'), title(['No posto, ', ['com pressa.']], 72),
    dica('Manda um áudio enquanto abastece.'),
    chat([['u', audio('áudio 0:04')], ['b', ['Anotar', b('R$ 200,00'), 'em Combustível no Fiat Argo? Responda sim para confirmar.']], ['u', 'sim']], { mt: 36 }),
    nota('Valores de exemplo.')),
  'semana4/post1-3': () => frame(3, ND,
    hora('12h30'), title(['Saiu da oficina? ', ['Foto da nota.']], 72),
    chat([['u', photo('foto da nota da oficina')], ['b', ['Li a nota:', b('troca de óleo e filtro,'), b('R$ 280,00.'), 'Anotar em Manutenção? Responda sim para confirmar.']]], { mt: 36 }),
    dica('A nota fica guardada comigo. Precisou? É só pedir.'),
    nota('Valores de exemplo.')),
  'semana4/post1-4': () => frame(4, ND,
    hora('18h15'), title(['Acendeu uma luz ', ['no painel.']], 72),
    chat([['u', photo('foto do painel')], ['u', 'que luz é essa?'], ['b', 'O Dr. Jarvys olha a foto e te explica o que é e o que fazer, sem complicar.']], { mt: 36 }),
    dica('Também respondo dúvidas como "qual óleo meu carro usa?".')),
  'semana4/post1-5': () => frame(5, ND,
    hora('Dia 30'), title(['Fim do mês: ', ['quanto gastei?']], 72),
    chat([['u', 'quanto gastei esse mês?'], ['b', ['Esse mês você gastou', b('R$ 1.230,00'), 'no Fiat Argo:', b('Combustível R$ 950,00'), 'e', b('Manutenção R$ 280,00.')]]], { mt: 36 }),
    dica('Sem planilha e sem caderninho. Eu somo tudo pra você.'),
    nota('Valores de exemplo.')),
  'semana4/post1-6': () => frame(6, ND,
    fecho(['Seu dia também ', ['pode ser assim.']], 'Crie sua conta e cadastre o carro pela placa. Os primeiros 30 dias vêm com tudo liberado, sem cartão.')),
};

// ---------- REEL 1 (seg 26/10, 19h30): se você sabe mandar mensagem, já sabe usar
const R1 = {
  'semana4/reel1-1': () => reel(
    h('div', { flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
      caption(['Se você sabe mandar mensagem ', ['no WhatsApp...']], 92),
      h('div', { justifyContent: 'center', marginTop: 80 }, persona(ROBO(380), 'Jarvys')))),
  'semana4/reel1-2': () => reel(h('div', { height: 120 }), caption(['Escreve ', ['do seu jeito.']], 84),
    chat([['u', 'gastei 150 de gasolina'], ['b', ['Anotar', b('R$ 150,00'), 'em Combustível no Chevrolet Onix? Responda sim para confirmar.']]], { size: 42 }), nota('Valores de exemplo.'), spacer()),
  'semana4/reel1-3': () => reel(h('div', { height: 120 }), caption(['Manda ', ['uma foto.']], 84),
    chat([['u', photo('foto do painel')], ['b', ['Li no painel:', b('48.320 km.'), 'Anotar no Chevrolet Onix?']]], { size: 42 }), nota('Exemplo.'), spacer()),
  'semana4/reel1-4': () => reel(h('div', { height: 120 }), caption(['Ou ', ['pergunta.']], 84),
    chat([['u', 'próxima revisão'], ['b', ['Sua próxima é a de', b('50.000 km.'), 'Te mostro o que trocar e mando os links das peças.']]], { size: 42 }), nota('Exemplo.'), spacer()),
  'semana4/reel1-5': () => reel(
    h('div', { flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
      caption(['...já sabe ', ['usar o Jarvys.']], 96),
      t({ fontSize: 38, color: C.muted, marginTop: 40, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, 'Sem app cheio de formulário. Sem planilha. É só conversar.'))),
  'semana4/reel1-6': () => reelCta('Texto, foto ou áudio: eu anoto, guardo e te aviso.'),
};

// ---------- POST 3 (ter 27/10, 12h15): frase de marca
const P3 = {
  'semana4/post3-1': () => frame(null, null,
    h('div', { flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
      title(['O cuidado do seu carro ', ['começa numa conversa.']], 100),
      lead('Você manda a mensagem, a foto ou o áudio. Eu anoto, guardo a nota e te aviso da revisão.', { fontSize: 38, marginTop: 40 }),
      h('div', { gap: 20, marginTop: 64, flexWrap: 'wrap' },
        ...['gastos', 'notas da oficina', 'revisão', 'dúvidas'].map((s) => t({ backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 999, padding: '16px 30px', fontSize: 30, fontWeight: 600, marginBottom: 16 }, s)))),
    h('div', { alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, marginBottom: 36 }, t({}, 'Comece grátis em'), t({ color: C.neon }, 'jarvys.com.br'))),
};

// ---------- REEL 2 (qua 28/10, 19h30): errei o valor (motorista que esquece tudo)
const r2chat = [
  ['u', 'gastei 105 de gasolina'],
  ['b', ['Anotar', b('R$ 105,00'), 'em Combustível no Hyundai HB20? Responda sim para confirmar.']],
  ['u', 'sim'],
  ['b', 'Anotado!'],
];
const r2fix = [
  ['u', 'errei, era 150'],
  ['b', ['Corrigir o último gasto para', b('R$ 150,00'), 'em Combustível? Responda sim para confirmar.']],
  ['u', 'sim'],
  ['b', 'Corrigido!'],
];
const R2 = {
  'semana4/reel2-1': () => reel(
    eyebrow('Conhece alguém assim?'),
    caption(['Digitou o valor ', ['errado?']], 92),
    spacer(),
    h('div', { flexDirection: 'column', alignItems: 'center', gap: 24 },
      speech(['Era 150, não 105! E agora?'], 44),
      persona(ESQUECIDO(440), 'o motorista que esquece tudo')),
    spacer()),
  'semana4/reel2-2': () => reel(h('div', { height: 120 }), caption(['Ops... ', ['105?']], 88), chat(r2chat, { size: 40 }), spacer()),
  'semana4/reel2-3': () => reel(h('div', { height: 120 }), caption(['É só ', ['me avisar.']], 88), chat(r2fix.slice(0, 2), { size: 40 }), spacer()),
  'semana4/reel2-4': () => reel(h('div', { height: 120 }), caption(['É só ', ['me avisar.']], 88), chat(r2fix, { size: 40 }), nota('Valores de exemplo.'), spacer()),
  'semana4/reel2-5': () => reel(
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', gap: 40 },
      caption(['Corrigir ou apagar: ', ['sempre com o seu sim.']], 84),
      h('div', { justifyContent: 'center' }, persona(ROBO(300), 'Jarvys')),
      t({ fontSize: 38, color: C.muted, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, 'Também vale "apaga o último gasto". Eu nunca mudo nada sem você confirmar.'))),
  'semana4/reel2-6': () => reelCta('Errou? Me avisa que eu corrijo.'),
};

// ---------- CARROSSEL 2 (qui 29/10, 12h15): a equipe do seu carro
const NE = 6;
const membro = (n, nome, faz, bubbles) => frame(n, NE,
  eyebrow('A equipe do seu carro'),
  h('div', { alignItems: 'center', gap: 32 },
    ROBO(170),
    h('div', { flexDirection: 'column', flexShrink: 1 }, title(nome, 64), t({ fontSize: 30, color: C.muted, marginTop: 14, lineHeight: 1.4 }, faz))),
  chat(bubbles, { mt: 44 }));
const K2 = {
  'semana4/post5-1': () => frame(1, NE,
    eyebrow('Uma conversa, quatro ajudas'),
    title(['A equipe ', ['do seu carro.']], 96),
    lead('Dentro do Jarvys tem quatro ajudantes. Você não precisa chamar nenhum pelo nome: é só mandar a mensagem que o certo responde.'),
    spacer(),
    h('div', { justifyContent: 'center', gap: 10 }, ROBO(170), ROBO(170), ROBO(170), ROBO(170)),
    arrastaRow()),
  'semana4/post5-2': () => membro(2, ['O anotador ', ['de gastos.']], 'Você fala o gasto, ele confirma e anota.',
    [['u', 'gastei 150 de gasolina'], ['b', ['Anotar', b('R$ 150,00'), 'em Combustível no Chevrolet Onix? Responda sim para confirmar.']]]),
  'semana4/post5-3': () => membro(3, ['O leitor ', ['de notas.']], 'Lê a foto ou o PDF da nota e guarda pra você.',
    [['u', photo('foto da nota da oficina')], ['b', ['Li a nota:', b('troca de óleo e filtro,'), b('R$ 280,00.'), 'Anotar em Manutenção?']]]),
  'semana4/post5-4': () => membro(4, ['O vigia ', ['da revisão.']], 'Guarda a km e te avisa quando a revisão chega perto.',
    [['u', photo('foto do painel')], ['b', ['Li no painel:', b('48.320 km.'), 'Anotar no Chevrolet Onix?']]]),
  'semana4/post5-5': () => membro(5, ['O ', ['Dr. Jarvys.']], 'Tira dúvidas pela ficha técnica do seu carro e olha foto de luz no painel.',
    [['u', 'qual óleo meu carro usa?'], ['b', 'Eu olho a ficha técnica do seu carro e te digo o óleo certo e quantos litros vão.']]),
  'semana4/post5-6': () => frame(6, NE,
    fecho(['Toda a equipe ', ['num só WhatsApp.']], 'Crie sua conta em jarvys.com.br. Os primeiros 30 dias vêm com tudo liberado, sem cartão.')),
};

// ---------- POST 6 (sex 30/10, 12h15): indicação, R$ 5 no Pix
const P6 = {
  'semana4/post6-1': () => frame(null, null,
    eyebrow('Indique e ganhe'),
    title(['Indicou, ativou: ', ['R$ 5 no Pix.']], 96),
    lead('Já tem carro ativado no Jarvys? Indica o Jarvys para os amigos. Cada amigo que ativar o carro pela sua indicação te rende R$\u00a05,00 no Pix.'),
    h('div', { gap: 24, marginTop: 56 },
      ...[['1', 'Você indica um amigo'], ['2', 'O amigo ativa o carro'], ['3', 'Você ganha R$\u00a05,00 no Pix']].map(([n, s]) =>
        h('div', { flexDirection: 'column', flexGrow: 1, flexBasis: 0, backgroundColor: C.card, border: `2px solid ${C.border}`, borderRadius: 32, padding: '32px 28px' },
          t({ fontFamily: 'Orbitron', fontSize: 44, fontWeight: 700, color: C.neon }, n),
          t({ fontSize: 30, fontWeight: 600, marginTop: 14, lineHeight: 1.35 }, s)))),
    spacer(),
    h('div', { alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, marginBottom: 36 }, t({}, 'Ainda não usa? Comece em'), t({ color: C.neon }, 'jarvys.com.br'))),
};

// ---------- REEL 3 (sáb 31/10, 19h30): fim do mês, quanto o carro custou (motorista organizada)
const r3chat = [
  ['u', 'quanto gastei esse mês?'],
  ['b', ['Esse mês você gastou', b('R$ 1.230,00'), 'no Fiat Argo:', b('Combustível R$ 950,00'), 'e', b('Manutenção R$ 280,00.')]],
];
const R3 = {
  'semana4/reel3-1': () => reel(
    eyebrow('Último dia do mês'),
    caption(['Quanto o carro ', ['te custou?']], 92),
    spacer(),
    h('div', { justifyContent: 'center' }, persona(ORGANIZADA(460), 'a motorista organizada')),
    spacer()),
  'semana4/reel3-2': () => reel(h('div', { height: 160 }), caption(['Ela só ', ['perguntou.']], 88), chat(r3chat.slice(0, 1), { size: 42 }), spacer()),
  'semana4/reel3-3': () => reel(h('div', { height: 160 }), caption(['Eu fiz ', ['a conta.']], 88), chat(r3chat, { size: 42 }), nota('Valores de exemplo.'), spacer()),
  'semana4/reel3-4': () => reel(
    h('div', { flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', gap: 40 },
      caption(['Sem planilha, ', ['sem caderninho.']], 88),
      h('div', { alignItems: 'flex-end', gap: 30 }, persona(ORGANIZADA(260), 'ela pergunta'), persona(ROBO(260), 'eu somo')),
      t({ fontSize: 38, color: C.muted, textAlign: 'center', lineHeight: 1.45, maxWidth: 860 }, 'Cada gasto que você me manda entra na conta.'))),
  'semana4/reel3-5': () => reelCta('Começa novembro sabendo quanto o carro custa.'),
};

const SLIDES = { ...K1, ...R1, ...P3, ...R2, ...K2, ...P6, ...R3 };
export { SLIDES, C };

