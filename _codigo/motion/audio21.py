# Trilha original e efeitos do reel 21 do Jarvys (sintetizados, sem direitos de terceiros).
# Uso: python3 audio.py timeline.json saida_dir
import json, sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
OUT = sys.argv[1]
DUR = 24.5
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
W0 = [0,0.16,0.453,0.64,0.84,0.96,1.68,1.92,2.48,2.72,2.96,3.76,4.56,4.72,5.08,5.4,6,6.16,6.26,6.3,6.64,7.6,7.84,8.36,8.72,8.84,9.36,10.16,10.36,10.48,10.64,10.92,11.04,11.36,11.68,12.24,12.36,12.44,12.613,12.92,13.12,13.52,13.68,13.92,14.72,14.88,15.24,15.96,16.72,16.827,16.88,17.24,17.36,18.16,18.48,18.64,19.2,19.36,20.16,20.64,20.96,21.28]
W = [w + .5 for w in W0]
# cena 1: tec tec tec, pisca bateria, calma
for i in (8, 9, 10): tec(W[i] - .02, .9); tec(W[i] + .07, .6)
pop(W[6], 600, .4); pop(W[11] - .1, 760, .5)
# cena 2: chat
whoosh(5.2, .6, .8); bubble(5.7, True, .6); pop(W[19], 700, .5); bubble(W[21] - .05, False, .6)
# cena 3: bateria descarregando, sinais
whoosh(10.6, .6, .8)
for k in range(4): pop(11.0 + k * .35, 900 - k * 120, .35)
pop(W[30] - .25, 820, .5); pop(W[38] - .25, 820, .5)
# cena 4: opções
whoosh(15.1, .6, .8); thump(W[47] - .15, .4); thump(W[50] - .15, .4)
# cena 5: fecho
whoosh(18.6, .7, .9); thump(18.7, .5); pop(19.1, 700, .7); ding(W[58] - .1, .4); whoosh(23.2, .9, .4)

sfx /= np.abs(sfx).max() + 1e-9
wavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))
print('ok')
