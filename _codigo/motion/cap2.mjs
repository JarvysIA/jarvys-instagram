import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, html, out, secs, only] = process.argv; const fps = 30, n = Math.round(secs * fps);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/' + html); await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => document.getAnimations().forEach(a => a.pause()));
const frames = only ? only.split(',').map(Number) : [...Array(n).keys()];
for (const i of frames) {
  await p.evaluate((ms) => { document.getAnimations().forEach(a => { a.currentTime = ms; }); window.setT && window.setT(ms / 1000); }, i * 1000 / fps);
  await p.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 93 });
}
await b.close(); console.log('frames', frames.length);
