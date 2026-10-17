import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage(); await p.goto('file://' + process.cwd() + '/' + process.argv[2]);
fs.writeFileSync(process.argv[3], JSON.stringify(await p.evaluate(() => window.T))); await b.close();
