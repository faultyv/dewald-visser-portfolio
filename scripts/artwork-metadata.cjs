// Run after adding or replacing portfolio images: node scripts/artwork-metadata.cjs
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
async function main() {
  const files = fs.readdirSync('public/images', { recursive: true }).filter(f => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  const entries = await Promise.all(files.map(async f => {
    const meta = await sharp(path.join('public/images', f)).metadata();
    return ['/images/' + f, { width: meta.width, height: meta.height }];
  }));
  fs.writeFileSync('lib/artwork-dimensions.json', JSON.stringify(Object.fromEntries(entries), null, 2) + '\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
