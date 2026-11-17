// Kit de reels em 3D de blocos do Jarvys (three.js 0.160, build global).
// Tudo é função do tempo: a cena define window.setT(t) e a captura chama setT quadro a quadro (30 fps).
const K = (() => {
  const W = 1080, H = 1920, T = THREE;
  const r = new T.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  r.setSize(W, H); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap; document.body.prepend(r.domElement);
  const sky = document.createElement('div'); sky.id = 'sky'; document.body.prepend(sky);
  const s = new T.Scene();
  const cam = new T.PerspectiveCamera(30, W / H, .1, 600);
  s.add(new T.HemisphereLight(0xffffff, 0x9db7cc, 1.5));
  const sun = new T.DirectionalLight(0xffffff, 2.2); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, far: 80 }); s.add(sun); s.add(sun.target);
  // a luz (e a sombra) acompanha a zona em uso
  const zone = (x, z) => { sun.position.set(x - 6, 14, z + 10); sun.target.position.set(x, 0, z); sun.target.updateMatrixWorld(); };
  zone(0, 0);

  // ---------- matemática
  const cl = x => Math.max(0, Math.min(1, x));
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const io = x => x * x * (3 - 2 * x);
  const out = x => 1 - (1 - x) ** 3;
  const back = x => { const c = 1.70158; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; };
  const mix = (a, b, k) => a + (b - a) * k;
  const col = (a, b, k) => new T.Color(a).lerp(new T.Color(b), cl(k));

  // ---------- blocos
  const M = (c, o = {}) => new T.MeshStandardMaterial(Object.assign({ color: c, flatShading: true, roughness: .85 }, o));
  const grp = (x = 0, y = 0, z = 0, p = s) => { const g = new T.Group(); g.position.set(x, y, z); p.add(g); return g; };
  const mesh = (geo, c, x, y, z, p) => { const m = new T.Mesh(geo, c && c.isMaterial ? c : M(c)); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; (p || s).add(m); return m; };
  const box = (w, h, d, c, x, y, z, p) => mesh(new T.BoxGeometry(w, h, d), c, x, y, z, p);
  const cyl = (rt, rb, h, c, x, y, z, p, n = 10) => mesh(new T.CylinderGeometry(rt, rb, h, n), c, x, y, z, p);
  const ground = (x, z, size = 70, c = 0xe9eef3) => { const g = new T.Mesh(new T.PlaneGeometry(size, size), new T.MeshStandardMaterial({ color: c, roughness: 1 })); g.rotation.x = -Math.PI / 2; g.position.set(x, 0, z); g.receiveShadow = true; s.add(g); return g; };

  // ---------- carro (frente em +x). Devolve o grupo e o capô (abre com hood(k): 0 fechado, 1 aberto)
  function carro(p = s, cor = 0xf4f7fa, detalhe = 0x0a84d6) {
    const car = grp(0, 0, 0, p);
    box(6.2, 1.3, 2.9, cor, 0, 1.25, 0, car); box(3.3, 1.15, 2.6, cor, -.5, 2.45, 0, car); box(3.1, .8, 2.65, 0x1d3550, -.5, 2.45, 0, car);
    box(3.4, .14, 2.7, detalhe, -.5, 3.08, 0, car); box(6.25, .18, 2.95, detalhe, 0, .72, 0, car); box(.2, .45, 2.2, 0x2a3340, 3.12, 1.1, 0, car);
    [[2, 1.5], [2, -1.5], [-2, 1.5], [-2, -1.5]].forEach(([x, z]) => { const w = cyl(.72, .72, .5, 0x20262e, x, .72, z, car, 14); w.rotation.x = Math.PI / 2; const h = cyl(.36, .36, .52, 0xcfd8e2, x, .72, z, car, 8); h.rotation.x = Math.PI / 2; });
    box(.25, .3, .6, 0xfff3b0, 3.14, 1.45, .95, car); box(.25, .3, .6, 0xfff3b0, 3.14, 1.45, -.95, car);
    box(.25, .3, .6, 0xe03437, -3.14, 1.45, .95, car); box(.25, .3, .6, 0xe03437, -3.14, 1.45, -.95, car);
    box(1.5, .4, 2.2, 0x3b4654, 2.2, 1.85, 0, car);                       // motor
    const rg = grp(0, 0, 0, car); const res = box(.6, .5, .55, 0xf7fbff, 2.3, 2.3, .85, rg); box(.3, .14, .3, 0x0a84d6, 2.3, 2.62, .85, rg); // reservatório
    const hp = grp(1.15, 2.13, 0, car); box(2.0, .12, 2.75, cor, 1.0, 0, 0, hp);   // capô com dobradiça atrás
    car.hood = k => { hp.rotation.z = 1.05 * k; rg.visible = k > .5; }; car.hood(0); car.res = res;
    return car;
  }

  // ---------- pessoa de blocos (olha para +z). Braços com pivô no ombro: p.bd, p.be (rotation.x negativo levanta para a frente)
  function pessoa(p = s, o = {}) {
    const c = Object.assign({ camisa: 0xff8a3d, calca: 0x2f3e52, pele: 0xf2c9a0, bone: null, cabelo: 0x3a2a1c }, o);
    const g = grp(0, 0, 0, p);
    box(.5, 1.5, .5, c.calca, -.32, .75, 0, g); box(.5, 1.5, .5, c.calca, .32, .75, 0, g);
    box(1.3, 1.6, .7, c.camisa, 0, 2.3, 0, g);
    g.be = grp(-.88, 3.0, 0, g); box(.4, 1.3, .4, c.camisa, 0, -.6, 0, g.be); box(.36, .34, .36, c.pele, 0, -1.38, 0, g.be);
    g.bd = grp(.88, 3.0, 0, g); box(.4, 1.3, .4, c.camisa, 0, -.6, 0, g.bd); box(.36, .34, .36, c.pele, 0, -1.38, 0, g.bd);
    g.cab = grp(0, 3.55, 0, g); box(.85, .85, .85, c.pele, 0, 0, 0, g.cab);
    box(.14, .14, .06, 0x0b1b2e, -.2, .08, .44, g.cab); box(.14, .14, .06, 0x0b1b2e, .2, .08, .44, g.cab); box(.34, .07, .06, 0x8a3a2a, 0, -.2, .44, g.cab);
    if (c.bone !== null) { box(.95, .3, .95, c.bone, 0, .5, 0, g.cab); box(.95, .1, .5, c.bone, 0, .37, .6, g.cab); }
    else box(.93, .26, .93, c.cabelo, 0, .5, 0, g.cab);
    return g;
  }

  // ---------- galão com alça e tampa
  function galao(p, cor, tampa = 0x0b1b2e) {
    const g = grp(0, 0, 0, p);
    box(1.4, 1.9, 1.0, cor, 0, .95, 0, g); box(.9, .8, .08, 0xffffff, 0, .9, .52, g);
    cyl(.22, .22, .35, tampa, .4, 2.05, 0, g, 8); box(.5, .16, .3, cor, -.35, 2.0, 0, g);
    return g;
  }

  // ---------- circuito de arrefecimento em corte (plano XY, visto de frente). Devolve as peças para animar.
  function circuito(p = s) {
    const g = grp(0, 0, 0, p), Z = .15;
    const fluido = M(0xff4fa3, { emissive: 0xff4fa3, emissiveIntensity: .35, roughness: .5 });
    const part = M(0xffd0e6, { emissive: 0xffffff, emissiveIntensity: .25 });
    const parede = M(0xdfe7ef), metal = M(0x8f9aa6), ferr = [M(0x9a4a1c), M(0xc46a2a), M(0x7a3a14)];
    const tubo = (x1, y1, x2, y2, e = .5) => { const w = Math.abs(x2 - x1) + e, h = Math.abs(y2 - y1) + e, cx = (x1 + x2) / 2, cy = (y1 + y2) / 2; box(w + .26, h + .26, .3, parede, cx, cy, Z - .12, g).castShadow = false; return box(w, h, .3, fluido, cx, cy, Z, g); };
    // bloco do motor (a chapa de trás esquenta)
    const bloco = box(4.6, 6.2, 1.6, metal, 3.1, 3.8, -.95, g);
    box(4.9, .5, 1.7, 0x6f7a86, 3.1, .45, -.95, g);
    // cilindros e pistões
    const pist = [2.35, 3.85].map(x => { box(1.25, 2.9, .2, 0x263443, x, 3.8, Z - .1, g); const ps = box(1.1, .75, .3, 0xd5dde6, x, 3.2, Z, g); return ps; });
    // galerias (camisa d'água) e mangueiras
    tubo(.55, 1.6, 5.0, 1.6); tubo(5.0, 1.6, 5.0, 6.0); tubo(.9, 6.0, 5.0, 6.0);
    tubo(-2.1, 6.0, .9, 6.0, .44); tubo(-2.1, 1.0, -.3, 1.0, .44); tubo(-.3, 1.0, -.3, 1.6, .44);
    // radiador
    const rad = grp(-3.7, 0, 0, g);
    box(3.5, .22, .5, parede, 0, 6.5, Z - .1, rad); box(3.5, .22, .5, parede, 0, .5, Z - .1, rad); box(.22, 6.2, .5, parede, -1.75, 3.5, Z - .1, rad); box(.22, 6.2, .5, parede, 1.75, 3.5, Z - .1, rad);
    box(3.3, .75, .3, fluido, 0, 6.0, Z, rad); box(3.3, .75, .3, fluido, 0, 1.0, Z, rad);
    for (let i = 0; i < 11; i++) box(3.25, .07, .22, 0x9fb2c4, 0, 1.75 + i * .35, Z - .1, rad).castShadow = false;
    const TX = [-1.2, -.6, 0, .6, 1.2]; TX.forEach(x => box(.26, 4.3, .3, fluido, x, 3.5, Z, rad));
    cyl(.3, .3, .3, 0x0b1b2e, -.9, 6.75, Z, rad, 8);
    // bomba d'água
    const bomba = grp(-.3, 1.6, Z + .2, g); const corpo = cyl(.95, .95, .4, 0x55626f, 0, 0, -.1, bomba, 14); corpo.rotation.x = Math.PI / 2;
    const rotor = grp(0, 0, .2, bomba); for (let i = 0; i < 6; i++) { const b = grp(0, 0, 0, rotor); b.rotation.z = i * Math.PI / 3; box(.16, .7, .16, 0xe8eef4, 0, .4, 0, b); } const eixo = cyl(.2, .2, .3, 0xffd21f, 0, 0, .05, rotor, 8); eixo.rotation.x = Math.PI / 2;
    // partículas no caminho fechado
    const P = [[-.3, 1.6], [5.0, 1.6], [5.0, 6.0], [-3.7, 6.0], [-3.7, 1.0], [-.3, 1.0]], L = [], tot = P.reduce((a, q, i) => { const n = P[(i + 1) % P.length], d = Math.hypot(n[0] - q[0], n[1] - q[1]); L.push(d); return a + d; }, 0);
    const at = u => { let d = ((u % 1) + 1) % 1 * tot; for (let i = 0; i < P.length; i++) { if (d <= L[i]) { const a = P[i], b = P[(i + 1) % P.length], k = d / L[i]; return [mix(a[0], b[0], k), mix(a[1], b[1], k)]; } d -= L[i]; } return P[0]; };
    const N = 44, ps = [...Array(N)].map(() => { const m = box(.2, .2, .2, part, 0, 0, Z + .2, g); m.castShadow = false; return m; });
    const dec = []; TX.forEach((x, j) => { if (x) for (let i = 0; i < 3; i++) { const m = box(.14, .14, .14, part, x - 3.7, 0, Z + .2, g); m.castShadow = false; dec.push([m, i / 3 + j * .13]); } });
    // ferrugem: nas galerias, na bomba e tampando os tubos do radiador
    const rnd = (i) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };
    const fer = (x, y, w, h, i, grupo) => { const m = box(w, h, .34, ferr[i % 3], x, y, Z + .12, g); m.rotation.z = (rnd(i) - .5) * .9; m.userData = { grupo, i }; m.scale.setScalar(.001); return m; };
    const rust = [];
    [[1.9, 1.86, .7, .3], [3.4, 1.36, .8, .28], [4.5, 1.84, .5, .3], [5.24, 2.8, .3, .8], [4.78, 4.3, .3, .7], [5.22, 5.3, .3, .6], [3.9, 6.24, .8, .3], [2.3, 5.78, .7, .3], [1.3, 6.22, .5, .28], [-.9, 6.2, .6, .26], [-1.3, .82, .6, .26]].forEach((q, i) => rust.push(fer(q[0], q[1], q[2], q[3], i, 'gal')));
    [[-.95, 2.1, .5, .4], [.3, 2.2, .45, .4], [.25, .95, .5, .4], [-.3, 1.6, .5, .5]].forEach((q, i) => rust.push(fer(q[0], q[1], q[2], q[3], 20 + i, 'bomba')));
    [[-4.9, 2.9], [-4.3, 4.4], [-3.7, 2.3], [-3.1, 3.9], [-2.5, 3.0], [-4.9, 4.8], [-3.1, 2.2], [-4.3, 2.6], [-2.5, 4.7], [-3.7, 4.2]].forEach((q, i) => rust.push(fer(q[0], q[1], .42, .6 + rnd(i + 40) * .5, 40 + i, 'rad')));
    // vapor e bolhas
    const vap = [...Array(9)].map((_, i) => { const m = box(.7, .7, .7, M(0xffffff, { transparent: true, opacity: .9 }), 0, 0, .4, g); m.castShadow = false; m.visible = false; return m; });
    return {
      g, fluido, part, bloco, pist, rotor, rust, vap, rad,
      // fase = distância percorrida pelo líquido (0..1 = uma volta); giro = ângulo do rotor
      fluxo(fase, giro, pistao) { ps.forEach((m, i) => { const q = at(i / N + fase); m.position.x = q[0]; m.position.y = q[1]; }); dec.forEach(([m, o]) => { const u = (((o + fase * 2.2) % 1) + 1) % 1; m.position.y = 5.65 - u * 4.3; }); rotor.rotation.z = -giro; pist.forEach((p2, i) => p2.position.y = 3.9 + Math.sin(pistao + i * Math.PI) * .75); },
      // cor do líquido: 0 aditivo (rosa), 1 só água (azul), 2 água com ferrugem (marrom)
      cor(k) { const c = k <= 1 ? col(0xff4fa3, 0x58b8ff, k) : col(0x58b8ff, 0xa5662e, k - 1); fluido.color.copy(c); fluido.emissive.copy(c); part.color.copy(col(0xffd0e6, k <= 1 ? 0xe6f6ff : 0xd9b38c, Math.min(1, k))); },
      ferrugem(kGal, kBomba, kRad) { rust.forEach((m, j) => { const u = m.userData, k = u.grupo == 'gal' ? kGal : u.grupo == 'bomba' ? kBomba : kRad, n = rust.filter(x => x.userData.grupo == u.grupo).length, idx = rust.filter(x => x.userData.grupo == u.grupo).indexOf(m); const v = back(seg(k, idx / n * .7, idx / n * .7 + .3)); m.scale.setScalar(Math.max(.001, v)); m.visible = v > .01; }); },
      calor(k) { bloco.material.color.copy(col(0x8f9aa6, 0xe03437, k)); bloco.material.emissive = col(0x000000, 0xb3261e, k * .6); },
      vapor(t, k) { vap.forEach((m, i) => { const u = (t * .55 + i / vap.length) % 1; m.visible = k > .02; m.position.set(1.4 + (i % 4) * 1.1 + Math.sin(i * 2.1 + t * 2) * .2, 7.1 + u * 3.6, .4); m.scale.setScalar(Math.max(.001, k * (0.5 + u * 1.2))); m.material.opacity = k * (1 - u) * .95; }); }
    };
  }

  // ---------- câmera por pontos-chave: {t, p:[x,y,z], l:[x,y,z], e:'lin' (senão suaviza)}. Dois pontos no mesmo t = corte seco.
  let keys = [];
  const camKeys = k => { keys = k; };
  function camAt(t, shake = 0) {
    let i = 0; while (i < keys.length - 1 && keys[i + 1].t <= t) i++;
    const a = keys[i], b = keys[Math.min(i + 1, keys.length - 1)];
    let k = b === a ? 0 : seg(t, a.t, b.t); if (b.e !== 'lin') k = io(k);
    const p = a.p.map((v, j) => mix(v, b.p[j], k)), l = a.l.map((v, j) => mix(v, b.l[j], k));
    if (shake) { p[0] += Math.sin(t * 61) * shake; p[1] += Math.cos(t * 53) * shake; }
    cam.position.set(...p); cam.lookAt(...l);
  }
  // ponto 3D -> pixel da tela
  const proj = (x, y, z) => { const v = new T.Vector3(x, y, z).project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; };
  const wp = o => { const v = new T.Vector3(); o.getWorldPosition(v); return [v.x, v.y, v.z]; };
  const pin = (el, x, y, z, dx = 0, dy = 0) => { const q = proj(x, y, z); el.style.left = (q[0] + dx - el.offsetWidth / 2) + 'px'; el.style.top = (q[1] + dy - el.offsetHeight) + 'px'; };

  // ---------- elementos por cima (.ov com data-a entrada, data-b saída, data-fx pop|up|stamp|fade)
  let ovs = null;
  function ui(t) {
    if (!ovs) ovs = [...document.querySelectorAll('.ov')];
    ovs.forEach(e => {
      const a = +e.dataset.a, b = e.dataset.b ? +e.dataset.b : 1e9; if (t < a || t >= b) { e.style.opacity = 0; return; }
      const fx = e.dataset.fx || 'pop', k = out(seg(t, a, a + .35)); let tr = '';
      if (fx == 'pop') tr = `scale(${mix(.6, 1, back(seg(t, a, a + .4)))})`;
      if (fx == 'up') tr = `translateY(${mix(70, 0, k)}px)`;
      if (fx == 'stamp') tr = `rotate(${e.dataset.rot || -6}deg) scale(${mix(2.4, 1, out(seg(t, a, a + .22)))})`;
      e.style.opacity = Math.min(seg(t, a, a + .14), 1 - seg(t, b - .16, b)); e.style.transform = tr;
    });
  }
  // ---------- legenda palavra por palavra. words: textos; starts: início de cada palavra (s, já com o atraso da voz)
  let cw = [], cs = [], cg = [], cel = null, cur = -1, cend = 1e9;
  function setCaps(words, starts, fim, max = 3) {
    cw = words; cs = starts; cend = fim; cg = []; let g = [];
    words.forEach((w, i) => { g.push(i); if (/[.,:?!]$/.test(w) || g.length >= max) { cg.push(g); g = []; } }); if (g.length) cg.push(g);
    // grupo de 1 palavra curta junta com o vizinho
    cel = document.createElement('div'); cel.className = 'cap'; document.getElementById('ui').appendChild(cel);
  }
  function caps(t) {
    if (!cel) return; let gi = -1; cg.forEach((g, i) => { if (t >= cs[g[0]] - .06) gi = i; });
    if (gi < 0 || t > cend) { cel.style.opacity = 0; cur = -2; return; } cel.style.opacity = 1;
    if (gi !== cur) { cur = gi; cel.innerHTML = cg[gi].map(i => `<span data-i="${i}">${cw[i]} </span>`).join(''); }
    let last = -1; cg[gi].forEach(i => { if (t >= cs[i] - .03) last = i; });
    [...cel.children].forEach(sp => { const i = +sp.dataset.i; sp.className = i <= last ? (i == last ? 'on now' : 'on') : ''; });
  }
  const fundo = css => { if (sky.dataset.c !== css) { sky.dataset.c = css; sky.style.background = css; } };
  const render = () => r.render(s, cam);
  return { T, W, H, s, cam, zone, cl, seg, io, out, back, mix, col, M, grp, box, cyl, ground, carro, pessoa, galao, circuito, camKeys, camAt, proj, pin, wp, ui, setCaps, caps, fundo, render };
})();
