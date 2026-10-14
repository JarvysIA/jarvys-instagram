// Renderiza as pecas de um arquivo semanaN.mjs em PNG.
// Uso: node render.mjs semana2.mjs <pasta-saida> <caminho do icon-512.png>
// Precisa: npm i @vercel/og@0.6.8 @fontsource/inter@5.1.0 @fontsource/orbitron@5.1.0
import fs from 'fs'; import path from 'path'; import { ImageResponse } from '@vercel/og';
const [,, file, outDir, iconPath] = process.argv;
const icon = 'data:image/png;base64,' + fs.readFileSync(iconPath).toString('base64');
const tmp = path.resolve('_tmp_' + path.basename(file));
const RAW = 'https://raw.githubusercontent.com/JarvysIA/jarvys-instagram/main/';
const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let src = fs.readFileSync(file, 'utf8').replace('https://www.jarvys.com.br/icon-512.png', icon);
// links raw deste repositorio viram arquivo local (para renderizar antes do push)
src = src.replace(/'https:\/\/raw\.githubusercontent\.com\/JarvysIA\/jarvys-instagram\/main\/([^']+)'/g, (m, rel) => {
  const ext = rel.split('.').pop().toLowerCase(); const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  return `'data:${mime};base64,${fs.readFileSync(path.join(repo, rel)).toString('base64')}'`;
});
fs.writeFileSync(tmp, src);
const { SLIDES } = await import(tmp);
const f = (w) => fs.readFileSync(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff`);
const fonts = [400, 500, 600, 700, 800].map((w) => ({ name: 'Inter', data: f(w), weight: w, style: 'normal' }))
  .concat([{ name: 'Orbitron', data: fs.readFileSync('node_modules/@fontsource/orbitron/files/orbitron-latin-700-normal.woff'), weight: 700, style: 'normal' }]);
fs.mkdirSync(outDir, { recursive: true });
for (const [id, fn] of Object.entries(SLIDES)) {
  const r = new ImageResponse(fn(), { width: 1080, height: id.includes('reel') ? 1920 : 1350, fonts });
  fs.writeFileSync(path.join(outDir, id.split('/').pop() + '.png'), Buffer.from(await r.arrayBuffer()));
}
fs.unlinkSync(tmp);
console.log('ok', Object.keys(SLIDES).length);
