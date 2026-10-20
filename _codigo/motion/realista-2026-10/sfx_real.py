# Efeitos do video realista (sintetizados). Uso: python3 sfx_real.py timeline.json saida.wav
import json, sys, numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 44100; T = json.load(open(sys.argv[1])); N = int(T['total'] * SR); rng = np.random.default_rng(11)
def t_(d): return np.arange(int(d * SR)) / SR
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def hp(x, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b): return sosfilt(butter(2, [a, b], 'band', fs=SR, output='sos'), x)
sfx = np.zeros(N)
def place(sig, at, g=1.0):
    i = int(at * SR); j = min(N, i + len(sig))
    if i < N: sfx[i:j] += sig[:j - i] * g
def whoosh(at, d=.6, g=1.):
    n = int(d * SR); x = rng.standard_normal(n); e = np.sin(np.linspace(0, np.pi, n)) ** 2
    place((bp(x, 300, 1800) * e * .6 + bp(x, 1800, 7000) * e * np.linspace(.2, 1, n) * .5), at - d * .55, g)
def pop(at, f=820, g=1.):
    tt = t_(.12); fr = f * (1 + .6 * np.exp(-tt * 40)); place(np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 38), at, g)
    place(hp(rng.standard_normal(int(.006 * SR)), 3000) * .25, at, g)
def bubble(at, up=True, g=1.):
    for i, m in enumerate((79, 84) if up else (84, 79)):
        tt = t_(.22); place(np.sin(2 * np.pi * midi(m) * tt) * np.exp(-tt * 18) * .7, at + i * .07, g)
def ding(at, g=1.):
    for i, m in enumerate((84, 88, 91)):
        tt = t_(.6); place((np.sin(2 * np.pi * midi(m) * tt) + .3 * np.sin(4 * np.pi * midi(m) * tt)) * np.exp(-tt * 6) * .5, at + i * .055, g)
def thump(at, g=1.):
    tt = t_(.7); fr = 40 + 90 * np.exp(-tt * 18); place(np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 5), at, g)
    for i, m in enumerate((88, 91, 95)):
        tt2 = t_(.9); place(np.sin(2 * np.pi * midi(m) * tt2) * np.exp(-tt2 * 5) * .18, at + .04 * i, g)
def riser(a, b, g=1.):
    n = int((b - a) * SR); r = np.linspace(0, 1, n) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(np.linspace(220, 880, n)) / SR) * .25
    place((bp(rng.standard_normal(n), 900, 5000) * .5 + tone) * r, a, g)
M = T['msgs']
whoosh(T['s2'][0] + .1, .8, 1.)
bubble(M['u1'], True, .8); bubble(M['b1'], False, .8); bubble(M['u2'], True, .8); ding(M['b2'] + .15, .85)
whoosh(T['s3'][0], .55, .7)
for i, x in enumerate(T['rows']): pop(x, 760 + 90 * i, .6)
riser(T['s4'][0] - 1.3, T['s4'][0], .5); whoosh(T['s4'][0], .7, .9); thump(T['s4'][0] + .12, 1.)
pop(T['end']['btn'], 700, .8)
sfx /= np.abs(sfx).max() + 1e-9
wavfile.write(sys.argv[2], SR, (np.stack([sfx, sfx], 1) * 32000 * .9).astype(np.int16)); print('ok')
