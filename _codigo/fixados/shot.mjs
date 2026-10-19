import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, html, out] = process.argv; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 3104, height: 1350 } });
await p.goto('file://' + process.cwd() + '/' + html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
const pano = await p.$('#pano'); const bb = await pano.boundingBox();
for (let i = 0; i < 3; i++) await p.screenshot({ path: `${out}/fixado${i + 1}-1.png`, clip: { x: bb.x + i * 1012, y: bb.y, width: 1080, height: 1350 } });
await p.screenshot({ path: `${out}/panorama.png`, clip: bb });
for (const id of ['s1b', 's1c', 's2b', 's2c', 's3b', 's3c']) { const el = await p.$('#' + id); await el.screenshot({ path: `${out}/fixado${id[1]}-${id[2] === 'b' ? 2 : 3}.png` }); }
await b.close(); console.log('ok');
