/* eslint-disable @typescript-eslint/no-require-imports -- This Node maintenance script uses CommonJS. */
// Run after adding or replacing portfolio images: node scripts/artwork-metadata.cjs
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
async function main() {
  const files = fs.readdirSync('public/images', { recursive: true }).filter(f => /\.(png|jpe?g|webp|gif|svg)$/i.test(f)).sort();
  const entries = await Promise.all(files.map(async f => {
    const file = path.join('public/images', f);
    const meta = await sharp(file).metadata();
    const size = { width: meta.width, height: meta.height };
    // Only transparent, predominantly white artwork needs a contrasting canvas.
    // Opaque compositions and source files remain unchanged.
    if (meta.hasAlpha) {
      const { data, info } = await sharp(file).resize({ width: 48, height: 48, fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let alphaTotal = 0, weight = 0, luminanceTotal = 0, visible = 0, bright = 0;
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3] / 255;
        const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        alphaTotal += alpha;
        if (alpha < 0.15) continue;
        weight += alpha;
        luminanceTotal += luminance * alpha;
        visible++;
        if (luminance > 210) bright++;
      }
      if (visible && alphaTotal / (info.width * info.height) < 0.985 && luminanceTotal / weight > 210 && bright / visible > 0.8) size.background = 'dark';
    }
    return ['/images/' + f, size];
  }));
  fs.writeFileSync('lib/artwork-dimensions.json', JSON.stringify(Object.fromEntries(entries), null, 2) + '\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
