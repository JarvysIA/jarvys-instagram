# Trilha original e efeitos do reel 22 do Jarvys (sintetizados, sem direitos de terceiros).
# Uso: python3 audio.py timeline.json saida_dir
import json, sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
OUT = sys.argv[1]
DUR = 23
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
def keys(a, b, n, g=1.0):
    for k in range(n):
        m = int(0.02 * SR); x = hp(rng.standard_normal(m), 2500) * np.exp(-np.linspace(0, 9, m)); place(sfx, x * g, a + k * (b - a) / n)

def squeal(at, d=0.7, f=3200, g=1.0):
    tt = t_(d); fr = f * (1 + 0.04 * np.sin(2 * np.pi * 23 * tt))
    s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.sin(np.linspace(0, np.pi, len(tt))) ** .5
    place(sfx, lp(s, 6000) * g * .35, at)
def coin(at, g=1.0):
    for i, m in enumerate((88, 95)):
        tt = t_(0.35); place(sfx, np.sign(np.sin(2 * np.pi * midi(m) * tt)) * np.exp(-tt * 12) * g * .18, at + i * 0.08)
def hiss(at, d=1.2, g=1.0):
    n = int(d * SR); x = hp(rng.standard_normal(n), 3500); e = np.minimum(1, np.linspace(0, 4, n)) * np.linspace(1, 0, n) ** .7
    place(sfx, x * e * g * .35, at)
def shutter(at, g=1.0):
    for k in (0, .06):
        m = int(0.03 * SR); x = bp(rng.standard_normal(m), 1500, 6000) * np.exp(-np.linspace(0, 8, m)); place(sfx, x * g, at + k)
def tec(at, g=1.0):
    # clique seco do motor de arranque sem força
    tt = t_(0.09); s = np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 60)
    x = bp(rng.standard_normal(len(tt)), 900, 4000) * np.exp(-tt * 90) * .6
    place(sfx, (s + x) * g, at)
# W(i) = palavra i com atraso VO de 0,5 s
W0 = [0, 0.12, 0.6, 0.84, 0.96, 1.32, 1.44, 1.64, 2.56, 2.68, 2.8, 3.28, 3.48, 3.68, 4.4, 5.28, 5.56, 5.72, 6.32, 6.48, 7.28, 7.44, 7.787, 7.84, 7.893, 7.96, 8.36, 8.44, 8.64, 8.96, 9.32, 9.52, 10.44, 10.56, 10.76, 10.933, 11.04, 11.56, 11.68, 12.4, 12.56, 12.8, 13.08, 13.2, 13.72, 14.12, 14.2, 14.32, 14.96, 15.16, 15.307, 15.36, 15.68, 15.84, 16.2, 16.28, 16.4, 17.12, 17.8, 18.32, 18.72]
W = [w + .5 for w in W0]
# cena 1: orçamento desenrolando, itens e total, Será?
whoosh(.6, .8, .6)
for i in range(9): pop(.5 + i * .26, 640 + i * 30, .28)
thump(W[11], .5); thump(W[14] - .1, .7); pop(W[14] - .05, 520, .5)
# cena 2: chat
whoosh(5.75, .6, .8); bubble(W[18] - .1, True, .6); bubble(W[19] - .25, False, .4)
# cena 3: revisão e estimativa
whoosh(7.85, .6, .8); pop(8.0, 700, .5)
for k, at in enumerate((W[29] - .1, W[30], W[31], W[31] + .35)): pop(at, 820 + k * 40, .45)
riser(W[36] - .9, W[36] - .1, .3); ding(W[36] - .1, .5)
# cena 4: orçamento conferido
whoosh(12.75, .6, .8)
for i in range(9): pop(W[41] + i * .2, 900 if i < 4 else 600, .35)
# cena 5: foto da nota
whoosh(15.35, .6, .8); shutter(W[53], .8); pop(W[55] - .1, 880, .5)
# cena 6: fecho
whoosh(17.5, .7, .9); thump(18.0, .5); pop(18.05, 700, .6); ding(20.0, .4); whoosh(22.2, .9, .4)

sfx /= np.abs(sfx).max() + 1e-9
wavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))
print('ok')
