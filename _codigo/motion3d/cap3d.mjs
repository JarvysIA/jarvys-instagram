// Captura quadro a quadro de um reel 3D. Uso: node cap3d.mjs cena.html pasta segundos [inicio fim]
// ALPHA=1 node cap3d.mjs ...: PNG com fundo transparente (para pôr os textos por cima de um vídeo gravado, no ffmpeg)
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, html, out, secs, a, z] = process.argv; const fps = 30, n = Math.round(secs * fps);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.log('ERRO', e.message)); p.on('console', m => m.type() == 'error' && console.log('console', m.text()));
await p.goto('file://' + process.cwd() + '/' + html); await p.evaluate(() => document.fonts.ready); await p.waitForFunction(() => window.READY);
const list = a && a.includes(',') ? a.split(',').map(Number) : [...Array(n).keys()].filter(i => (a === undefined || i >= +a) && (z === undefined || i < +z));
for (const i of list) { await p.evaluate(t => window.setT(t), i / fps); if (process.env.ALPHA) await p.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.png`, type: 'png', omitBackground: true }); else await p.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 93 }); }
await b.close(); console.log('quadros', list.length);
