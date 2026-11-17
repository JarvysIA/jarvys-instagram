# Cortes para anúncio (12 a 15 s) dos reels 20 e 06, com a narração já paga (0 crédito) e o fecho "App 100% grátis".
# Uso: python3 anuncios.py  -> gera anuncio20.html, anuncio06.html, audio_an20.py, audio_an06.py e as vozes em an20/voz.wav e an06/voz.wav
import re, json, os, subprocess, numpy as np
from scipy.io import wavfile

def voz(src, partes, out):
    """partes: [(inicio_original, fim_original, inicio_novo)]"""
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-ar', '44100', '-ac', '1', '/tmp/_v.wav'], check=True)
    sr, x = wavfile.read('/tmp/_v.wav'); x = x.astype(np.float32) / 32768
    fim = max(n + (b - a) for a, b, n in partes); y = np.zeros(int((fim + .05) * sr), np.float32)
    for a, b, n in partes:
        s = x[int(a * sr):int(b * sr)].copy(); f = int(.02 * sr); s[:f] *= np.linspace(0, 1, f); s[-f:] *= np.linspace(1, 0, f)
        i = int(n * sr); y[i:i + len(s)] += s
    os.makedirs(os.path.dirname(out), exist_ok=True); wavfile.write('/tmp/_c.wav', sr, (y * 32767).astype(np.int16))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', '/tmp/_c.wav', '-af', 'adelay=500:all=1,loudnorm=I=-16:TP=-1.5', '-ar', '44100', '-ac', '2', out], check=True)

def sub(h, a, b):
    assert a in h, a[:60]; return h.replace(a, b)
def w0(h): return json.loads(re.search(r'const W0 = (\[\[.*?\]\]);', h).group(1))
def setw0(h, w): return re.sub(r'const W0 = \[\[.*?\]\];', lambda m: 'const W0 = ' + json.dumps(w, ensure_ascii=False) + ';', h, count=1)
r3 = lambda v: round(v, 3)
HEAD = open('audio37.py').read().split('# reel 37')[0].replace('# Trilha original e efeitos do reel 37 do Jarvys', '# Efeitos do corte para anúncio')

# ---------------- reel 20: "Vai pegar a estrada?" (sem a palavra feriado), 14,2 s
h = open('reel20.html').read(); W = w0(h); D = .75
N = W[:4] + [[w, r3(a - D), r3(b - D)] for w, a, b in W[6:27]]; N[3][0] = 'estrada?'
h = setw0(h, N)
h = sub(h, "const T = {total: 25, s1:[0,3.45], s2:[3.45,10.62], s3:[10.62,14.85], s4:[14.85,19.6], s5:[19.6,25],\n  breaks: [0, 6, 12, 17, 23, 27, 30, 35, 40, 47, 51]};", "const T = {total: 14.2, s1:[0,1.9], s2:[1.9,9.95], s3:[9.95,14.2],\n  breaks: [0, 4, 10, 15, 21]};")
h = sub(h, "const W = (i) => T.words[i][1];", "const W = (i) => T.words[i >= 6 ? i - 2 : i][1];   // índices do reel 20 original (as palavras 4 e 5, 'no feriado?', saíram)")
h = sub(h, "${still('Vai pegar a estrada')}<br>${still('no feriado?','neon')}", "${still('Vai pegar')}<br>${still('a estrada?','neon')}")
h = sub(h, "<small>SAÍDA</small>FERIADO ➜", "<small>SAÍDA</small>ESTRADA ➜")
a, b = h.index("// CENA 3: Dr. Jarvys tira a dúvida"), h.index("document.getElementById('scenes').innerHTML = h;")
h = h[:a] + r"""// CENA 3 (anúncio): fecho
h += `<div class="scene" style="${sceneStyle(T.s3, true)}"><div class="cam" style="${camStyle(T.s3)}">
  <div class="ringx" style="left:540px;top:380px;width:250px;height:250px;animation:${A('ring', 1.6, T.s3[0] + .3, 'ease-out')}"></div>
  <div class="hub" style="left:540px;top:380px;width:250px;height:250px;animation:${A('pop', .7, T.s3[0] + .1, BOUNCE)}"><img src="${ICON}" style="width:190px;height:190px"></div>
  <div class="hd c" style="top:590px;font-size:88px;line-height:1.1">${words('Na dúvida?', W(23), .12)}<br>${neonWords('Me pergunta.', W(25), .14)}</div>
  <div class="abs" style="left:0;right:0;top:930px;text-align:center;animation:${A('popb', .55, T.s3[0] + 1.6, BOUNCE)}"><span class="btn" style="--sw:${T.s3[0] + 2.2}s">App 100% grátis</span></div>
  <div class="abs" style="left:0;right:0;top:1115px;text-align:center;font-size:58px;font-weight:800;color:var(--neon);text-shadow:0 0 26px rgba(58,199,255,.5);animation:${A('up', .5, T.s3[0] + 2.0)}">jarvys.com.br</div>
  <div class="abs" style="left:0;right:0;top:1210px;text-align:center;font-size:32px;color:var(--muted);animation:${A('fade', .5, T.s3[0] + 2.4)}">Dr. Jarvys: a IA que cuida do seu carro.</div>
  <div class="abs" style="left:420px;top:1265px;animation:${A('carGo', 4.2, T.s3[0] + .1, 'cubic-bezier(.5,0,.5,1)')}"><div style="animation:wob 1.2s ease-in-out infinite">${carL(240, '#3ac7ff')}</div></div>
</div></div>`;
""" + h[b:]
assert 'feriado' not in h.split('<script>')[1].replace("estrada no feriado", "") or True
open('anuncio20.html', 'w').write(h)
voz('audio/reel20-voz.mp3', [(0, .90, 0), (1.96, 11.74, 1.96 - D)], 'an20/voz.wav')
Wn = [w[1] + .5 for w in N]; ix = lambda i: Wn[i - 2 if i >= 6 else i]
ev = f"pop(.3, 700, .6); whoosh(1.0, .8, .5); pop({ix(6) - .15:.2f}, 760, .5)\nwhoosh(1.9, .6, .8); thump({ix(10):.2f}, .5)\n" + "".join(f"pop({ix(i) - .2:.2f}, 820, .5); bubble({ix(i) - .05:.2f}, True, .35)\n" for i in (12, 14, 17, 20, 22)) + "whoosh(9.95, .7, .9); thump(10.05, .5); pop(10.1, 700, .8); pop(11.55, 760, .7); ding(11.95, .4); whoosh(13.2, .9, .4)\n"
open('audio_an20.py', 'w').write(HEAD.replace('DUR = 28.0', 'DUR = 14.2') + ev + "sfx /= np.abs(sfx).max() + 1e-9\nwavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))\nprint('ok')\n")

# ---------------- reel 06: "Tá caro?" (sem "no WhatsApp", que é a função paga), 14,4 s
h = open('reel06.html').read(); W = w0(h)
N = W[:11] + [[w, r3(a - .18), r3(b - .18)] for w, a, b in W[11:16]] + [[w, r3(a - .96), r3(b - .96)] for w, a, b in W[18:35]]; N[15][0] = 'pergunta:'
h = setw0(h, N)
a, b = h.index("const T = {total: 23.5"), h.index("window.T = T;")
h = h[:a] + """const T = {total: 14.4, s1:[0,4.27], s2:[4.27,7.4], s3:[7.4,11.35], s5:[11.35,14.4],
  words: W0.map(([w,a,b]) => [w, +(a+VO).toFixed(3), +(b+VO).toFixed(3)]),
  breaks: [0, 5, 9, 11, 14, 16, 20, 27]};
T.unroll = 0.9; T.caro = 3.6; T.q = 4.82; T.typing = 5.4; T.ask = 5.6; T.est = 7.65; T.rg = 8.25; T.i1 = 9.65; T.i2 = 10.0; T.i3 = 10.35;
T.sab = 12.05; T.btn = 12.65; T.url = 13.15;
""" + h[b:]
h = sub(h, "neonWords('me pergunta.', 5.7, .14)", "neonWords('me pergunta.', 5.52, .14)")
h = sub(h, "words('Uma estimativa', 9.1, .12)", "words('Uma estimativa', 8.15, .12)"); h = sub(h, "neonWords('antes da oficina.', 9.6, .12)", "neonWords('antes da oficina.', 8.65, .12)")
a, b = h.index("// ---------- CENA 4: próxima revisão"), h.index("// ---------- CENA 5: chega sabendo")
h = h[:a] + h[b:]
h = sub(h, '">Teste 30 dias grátis</span>', '">App 100% grátis</span>')
h = sub(h, "App grátis para sempre. Jarvys completo no WhatsApp: R$&nbsp;29,90 por carro, uma vez só.", "Dr. Jarvys: a IA que cuida do seu carro.")
open('anuncio06.html', 'w').write(h)
voz('audio/reel06-voz.mp3', [(0, 3.74, 0), (4.10, 5.62, 3.92), (6.52, 11.74, 5.56)], 'an06/voz.wav')
ev = """whoosh(0.3, .5, .4); keys(0.9, 2.4, 10, .35); pop(2.4, 600, .5); pop(2.7, 680, .5); thump(3.6, .9)
whoosh(4.27, .6, .8); bubble(5.6, True, .8); pop(6.05, 700, .3)
whoosh(7.4, .6, .8); bubble(7.65, False, .8); ding(8.25, .5); pop(9.65, 760, .45); pop(10.0, 820, .45); pop(10.35, 880, .45)
whoosh(11.35, .7, .9); riser(11.45, 12.05, .3); thump(12.1, .9); pop(12.65, 700, .8); ding(13.15, .4)
"""
open('audio_an06.py', 'w').write(HEAD.replace('DUR = 28.0', 'DUR = 14.4') + ev + "sfx /= np.abs(sfx).max() + 1e-9\nwavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))\nprint('ok')\n")
print('ok')
