# Trilha original e efeitos do reel 42 do Jarvys (sintetizados, sem direitos de terceiros).
# Uso: python3 audio.py timeline.json saida_dir
import json, sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

SR = 44100
OUT = sys.argv[1]
DUR = 31.0
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
# reel 45, Tá caro? pastilha de freio de R$ 900: média R$ 150 a R$ 400 (Webmotors), disco só abaixo da espessura mínima, par no mesmo eixo, Dr. Jarvys no app (VO 0,5 s)
W0 = [0, 0.48, 1.68, 1.84, 2.12, 2.28, 2.6, 2.72, 3.44, 3.6, 4.4, 4.56, 5.16, 5.28, 5.52, 5.68, 6.32, 6.48, 6.84, 6.92, 7.12, 7.36, 7.68, 7.96, 8.24, 9.2, 9.36, 10.88, 11.36, 11.64, 12.32, 12.64, 12.84, 13.52, 13.68, 13.84, 14.24, 14.6, 14.72, 15.2, 15.68, 15.813, 16.04, 16.48, 17.12, 17.24, 17.44, 17.92, 18.16, 18.4, 18.64, 19.04, 19.24, 19.56, 20.24, 20.4, 21.04, 21.36, 21.48, 21.84, 22.2, 22.32, 22.96, 23.28, 23.4, 23.547, 23.68, 24, 24.16, 24.8, 24.96, 25.12, 25.52, 25.8, 25.92, 26.64, 27]
W = [w + .5 for w in W0]
pop(.2, 600, .45); pop(.35, 700, .3); squeal(W[5], .6, 3200, .5); thump(W[8] - .1, .9)
whoosh(4.8, .6, .8); pop(W[12], 640, .4); pop(W[17], 600, .35); pop(W[19], 680, .35); coin(W[24], .6); coin(W[26], .6); ding(W[26] + .3, .3)
whoosh(11.25, .6, .8); pop(W[27], 600, .35); hiss(W[30], .5, .5); thump(W[31] + .1, .8); pop(W[36] - .1, 700, .35); pop(W[38], 760, .35)
whoosh(17.5, .6, .8); pop(W[44], 600, .35); pop(W[49], 700, .4); pop(W[50], 760, .4); ding(W[50] + .2, .3)
whoosh(20.6, .6, .8); pop(W[54] - .1, 640, .45); bubble(W[57], True, .7); bubble(W[59], False, .7); pop(W[61], 760, .4)
whoosh(23.35, .6, .8); whoosh(W[62] + .4, .5, .5); pop(W[63], 700, .35)
whoosh(25.2, .6, .8); pop(W[73], 700, .4); pop(W[73] + .25, 760, .4); bubble(W[75] - .1, True, .7)
whoosh(28.45, .7, .6); pop(28.7, 640, .55); pop(29.1, 700, .45); ding(30.2, .35)
sfx /= np.abs(sfx).max() + 1e-9
wavfile.write(f'{OUT}/sfx.wav', SR, (np.stack([sfx, sfx], 1) * 32000 * 0.9).astype(np.int16))
print('ok')
