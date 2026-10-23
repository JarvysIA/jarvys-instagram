import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs0 from 'fs';
const [,, html, ...ids] = process.argv;
const b = await chromium.launch({ executablePath: process.env.CHROME || (fs0.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : '/opt/pw-browsers/chromium') });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/' + html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
for (const id of ids) { const el = await p.$('#' + id); await el.screenshot({ path: `${id}.png` }); }
await b.close(); console.log('ok');
