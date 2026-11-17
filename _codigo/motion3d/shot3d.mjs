import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('console', m => console.log('console:', m.text().slice(0,200)));
p.on('pageerror', e => console.log('err:', String(e).slice(0,300)));
await p.goto('file://' + process.cwd() + '/test.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1500);
const t0=Date.now(); await p.screenshot({ path: 'test3d.png' }); console.log('ok', Date.now()-t0, 'ms');
await b.close();
