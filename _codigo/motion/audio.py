# Trilha original e efeitos do reel 01 do Jarvys (sintetizados, sem direitos de terceiros).
# Uso: python3 audio.py timeline.json saida_dir
import json, sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
T = json.load(open(sys.argv[1])); OUT = sys.argv[2]
DUR = T['total']
N = int(DUR * SR)
rng = np.random.default_rng(7)

def t_(d): return np.arange(int(d * SR)) / SR
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf): return
    j = min(len(buf), i + len(sig)); buf[i:j] += sig[:j - i] * gain
def saw(f, d, det=0.0):
    t = t_(d); ph = (t * f * (1 + det)) % 1.0; return 2 * ph - 1
def env_adsr(d, a, r):
    n = int(d * SR); e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e
def reverb(x, secs=2.2, wet=0.25):
    n = int(secs * SR); ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 7, n)); ir = lp(ir, 6000)
    ir /= np.sqrt((ir ** 2).sum()); y = fftconvolve(x, ir)[:len(x)]
    return x * (1 - wet) + y * wet * 1.6

BPM = 100; BEAT = 60 / BPM; BAR = BEAT * 4
# acordes (C maior, otimista): Cmaj9, G6, Am7, Fmaj7
CH = [[48, 55, 59, 62, 64], [43, 50, 55, 59, 64], [45, 52, 55, 60, 64], [41, 48, 53, 57, 64]]
nbars = int(np.ceil(DUR / BAR)) + 1
LIFT = T['s6'][0]           # entrada do fecho
DRUMS_IN = T['s1'][1] - 0.2  # bateria entra quando o Jarvys aparece
END = DUR - 1.6             # acorde final

pad = np.zeros(N); arp = np.zeros(N); bass = np.zeros(N); kick = np.zeros(N); hat = np.zeros(N); clap = np.zeros(N)
for b in range(nbars):
    t0 = b * BAR
    if t0 >= END: break
    ch = CH[b % 4]
    d = min(BAR + 0.25, END - t0 + 0.2)
    # pad: saws desafinadas, filtro fechado
    s = sum(saw(midi(m + 12), d, dt) for m in ch[1:] for dt in (-0.004, 0.0, 0.005)) / 15
    place(pad, lp(s, 1500 if t0 < LIFT else 2400) * env_adsr(d, 0.35, 0.3), t0)
    # arpejo em semicolcheias
    notes = [ch[1] + 24, ch[2] + 24, ch[3] + 24, ch[4] + 24, ch[3] + 24, ch[2] + 24, ch[4] + 24, ch[3] + 12 + 12]
    for k in range(16):
        tk = t0 + k * BEAT / 4
        if tk >= END: break
        f = midi(notes[k % 8]); dd = 0.32; tt = t_(dd)
        tone = (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(4 * np.pi * f * tt) + 0.12 * saw(f, dd)) * np.exp(-tt * 11)
        acc = 1.0 if k % 4 == 0 else 0.7
        place(arp, tone * acc, tk)
    # baixo
    if t0 >= DRUMS_IN - 0.01:
        for k in (0, 1.5, 2, 3.5):
            tk = t0 + k * BEAT
            if tk >= END: break
            dd = 0.55; tt = t_(dd); f = midi(ch[0] - 12 if ch[0] > 44 else ch[0])
            place(bass, (np.sin(2 * np.pi * f * tt) + 0.2 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt * 4.5) * (1 if k in (0, 2) else .7), tk)
    # bateria
    for k in range(4):
        tk = t0 + k * BEAT
        if tk < DRUMS_IN or tk >= END: continue
        tt = t_(0.45); fr = 45 + 85 * np.exp(-tt * 28)
        place(kick, np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 7.5), tk)
        hh = hp(rng.standard_normal(int(0.05 * SR)), 7000) * np.exp(-t_(0.05) * 70)
        place(hat, hh * 0.5, tk + BEAT / 2)
        if tk >= LIFT:
            place(hat, hh * 0.25, tk + BEAT / 4); place(hat, hh * 0.25, tk + 3 * BEAT / 4)
            if k in (1, 3):
                cl = bp(rng.standard_normal(int(0.18 * SR)), 900, 2600) * np.exp(-t_(0.18) * 22)
                place(clap, cl, tk)

# acorde final com cauda
fin = [36, 48, 55, 59, 64, 67, 71]
d = DUR - END
s = sum(saw(midi(m + 12), d, dt) for m in fin[1:] for dt in (-0.004, 0.005)) / 12
place(pad, lp(s, 2200) * np.exp(-t_(d) * 1.4) * 1.3, END)
for i, m in enumerate([60, 64, 67, 71, 76]):
    tt = t_(1.5); f = midi(m + 12)
    place(arp, np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3) * .8, END + i * 0.06)
tt = t_(1.2); place(kick, np.sin(2 * np.pi * np.cumsum(45 + 70 * np.exp(-tt * 20)) / SR) * np.exp(-tt * 3), END)

# sidechain (respiro do kick)
sc = np.ones(N)
for b in range(nbars):
    for k in range(4):
        tk = b * BAR + k * BEAT
        if DRUMS_IN <= tk < END:
            i = int(tk * SR); n = int(0.28 * SR); j = min(N, i + n)
            sc[i:j] = np.minimum(sc[i:j], 1 - 0.45 * np.exp(-np.linspace(0, 4, n))[:j - i])

# filtro do arpejo abrindo na introducao
cut = np.clip(np.linspace(0, DUR, N) / max(DRUMS_IN, 1), 0.25, 1.0)
arp_lo = lp(arp, 1800); arp_hi = lp(arp, 7000)
arp_f = arp_lo * (1 - cut) + arp_hi * cut

music = reverb(pad * 0.55 * sc + arp_f * 0.42 * sc, 2.4, 0.3) + bass * 0.55 * sc + kick * 0.75 + hat * 0.15 + reverb(clap * 0.3, 1.2, 0.35)
fade_in = np.minimum(1, np.arange(N) / (0.08 * SR)); music *= fade_in
music = np.tanh(music * 1.2) / 1.2
music /= np.abs(music).max() + 1e-9

# ---------------- efeitos
sfx = np.zeros(N)
def whoosh(at, d=0.6, g=1.0):
    n = int(d * SR); x = rng.standard_normal(n); e = np.sin(np.linspace(0, np.pi, n)) ** 2
    lo = bp(x, 300, 1800) * e; hi = bp(x, 1800, 7000) * e * np.linspace(0.2, 1, n)
    place(sfx, (lo * .6 + hi * .5) * g, at - d * 0.55)
def pop(at, f=820, g=1.0):
    tt = t_(0.12); fr = f * (1 + 0.6 * np.exp(-tt * 40)); s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 38)
    click = hp(rng.standard_normal(int(0.006 * SR)), 3000) * 0.25
    place(sfx, s * g, at); place(sfx, click * g, at)
def bubble(at, up=True, g=1.0):
    for i, m in enumerate((79, 84) if up else (84, 79)):
        tt = t_(0.22); place(sfx, np.sin(2 * np.pi * midi(m) * tt) * np.exp(-tt * 18) * g * .7, at + i * 0.07)
def thump(at, g=1.0):
    tt = t_(0.7); fr = 40 + 90 * np.exp(-tt * 18)
    place(sfx, np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 5) * g, at)
    for i, m in enumerate((88, 91, 95)):
        tt2 = t_(0.9); place(sfx, np.sin(2 * np.pi * midi(m) * tt2) * np.exp(-tt2 * 5) * .18 * g, at + 0.04 * i)
def riser(a, b, g=1.0):
    n = int((b - a) * SR); x = rng.standard_normal(n); r = np.linspace(0, 1, n) ** 2
    y = np.zeros(n); seg = n // 8
    for k in range(8):
        lo = 400 + k * 600; y[k * seg:(k + 1) * seg] = bp(x, lo, lo * 2.5)[k * seg:(k + 1) * seg]
    tone = np.sin(2 * np.pi * np.cumsum(np.linspace(220, 880, n)) / SR) * .25
    place(sfx, (y * .6 + tone) * r * g, a)
def ding(at, g=1.0):
    for i, m in enumerate((84, 88, 91)):
        tt = t_(0.6); place(sfx, (np.sin(2 * np.pi * midi(m) * tt) + .3 * np.sin(4 * np.pi * midi(m) * tt)) * np.exp(-tt * 6) * g * .5, at + i * 0.055)

for i, x in enumerate(T['probs']): pop(x, [700, 780, 860, 940][i], .75)
whoosh(T['s1'][1] - 0.15, 0.7, 1.0)
thump(T['s2'][0] + 0.12, 0.9)
pop(T['wa'], 990, .6)
whoosh(T['s2'][1], .55, .7)
for i, x in enumerate(T['ins']): pop(x, [760, 900, 1040][i], .7)
whoosh(T['s3'][1], .55, .7)
for i, x in enumerate(T['outs']): pop(x, 820 + 80 * i, .6)
whoosh(T['s4'][1], .55, .7)
M = T['msgs']
bubble(M['u1'], True, .8); bubble(M['b1'], False, .8); bubble(M['u2'], True, .8); ding(M['b2'] + .15, .8)
riser(T['s6'][0] - 1.5, T['s6'][0], .55)
whoosh(T['s6'][0], .7, .9)
thump(T['s6'][0] + 0.12, 1.0)
pop(T['end']['btn'], 700, .8)
sfx /= np.abs(sfx).max() + 1e-9

for name, x in (('music', music), ('sfx', sfx)):
    wavfile.write(f'{OUT}/{name}.wav', SR, (np.stack([x, x], 1) * 32000 * 0.9).astype(np.int16))
print('ok', DUR)
