# Trilha original e efeitos do reel 22 do Jarvys (sintetizados, sem direitos de terceiros).
# Uso: python3 audio.py timeline.json saida_dir
import json, sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
OUT = sys.argv[1]
DUR = 25.5
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
W0 = [0, 0.88, 1.8, 2.76, 2.96, 3.12, 4.053, 4.16, 4.6, 4.72, 5.08, 5.92, 6.027, 6.08, 6.48, 6.64, 6.92, 7.2, 7.36, 8.24, 8.48, 8.64, 9.44, 9.6, 9.72, 9.84, 10.44, 10.72, 11.28, 11.44, 12.24, 12.36, 12.44, 12.76, 13.08, 13.72, 13.92, 14.16, 14.32, 15.04, 15.28, 15.44, 15.68, 15.84, 16.48, 17.36, 17.44, 17.8, 17.92, 18.72, 19.28, 19.6, 20.52, 20.88, 21.28, 21.6]
W = [w + .5 for w in W0]
# cena 1: post-its colando
for i in (0, 1, 2, 3): pop(W[i] - .15, 700 + i * 60, .45); thump(W[i] - .1, .25)
# cena 2: revisão cai, Jarvys pega
whoosh(5.95, .6, .8); pop(6.25, 620, .4); whoosh(W[18] + .1, .8, .7); thump(W[19] - .15, .5); pop(W[19] - .1, 760, .6); pop(W[21] - .1, 880, .45)
# cena 3: chat
whoosh(10.25, .6, .8); bubble(W[25], True, .6); bubble(W[28] - .1, False, .6)
# cena 4: km subindo e aviso
whoosh(13.1, .6, .8); riser(13.5, 15.7, .35); ding(W[38] - .2, .5); pop(W[39] - .1, 760, .4)
# cena 5: grátis
whoosh(16.85, .6, .8); pop(W[44] - .2, 820, .5); pop(W[46] - .2, 880, .5); thump(W[49] - .15, .5); thump(W[51] - .2, .6)
# cena 6: fecho
whoosh(20.95, .7, .9); thump(21.05, .5); pop(21.4, 700, .7); ding(W[52] - .1, .4); whoosh(24.2, .9, .4)

sfx /= np.abs(sfx).max() + 1e-9
wavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))
print('ok')
