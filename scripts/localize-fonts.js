// Copies the app's fonts from node_modules into www/fonts and points the pages at them,
// so the app looks the same offline. If anything fails, the app simply falls back to system fonts.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'www', 'fonts');
const want = [['unbounded', [400, 800, 900], ['normal']], ['literata', [400, 600], ['normal', 'italic']]];
try {
  fs.mkdirSync(out, { recursive: true });
  let css = '';
  for (const [name, weights, styles] of want) {
    const dir = path.join(root, 'node_modules', '@fontsource', name, 'files');
    for (const w of weights) for (const s of styles) {
      if (s === 'italic' && w !== 400) continue;
      const f = `${name}-latin-${w}-${s}.woff2`;
      if (!fs.existsSync(path.join(dir, f))) { console.warn('missing', f); continue; }
      fs.copyFileSync(path.join(dir, f), path.join(out, f));
      css += `@font-face{font-family:'${name[0].toUpperCase() + name.slice(1)}';font-style:${s};font-weight:${w};font-display:swap;src:url(${f}) format('woff2')}\n`;
    }
  }
  if (!css) throw new Error('no font files found');
  fs.writeFileSync(path.join(out, 'fonts.css'), css);
  const p = path.join(root, 'www', 'index.html');
  const re = /<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">/g;
  let h = fs.readFileSync(p, 'utf8');
  const n = (h.match(re) || []).length;
  fs.writeFileSync(p, h.replace(re, '<link rel="stylesheet" href="fonts/fonts.css">'));
  console.log(`Fonts ready, patched ${n} link(s).`);
} catch (e) { console.warn('Font step skipped:', e.message); }
