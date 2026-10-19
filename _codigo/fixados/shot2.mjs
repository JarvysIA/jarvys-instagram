import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const [,, html, out, ids] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/' + html); await p.waitForTimeout(200);
for (const id of ids.split(',')) await (await p.$('#' + id)).screenshot({ path: `${out}/destaque-${id}.png` });
await b.close(); console.log('ok');
