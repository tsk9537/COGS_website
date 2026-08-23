const fs = require('fs');

// ---- CSS: cssnano with a custom preset of the plugins that are installed ----
(async () => {
  const postcss = require('postcss');
  const cssnano = require('cssnano');
  const plugins = [
    require('postcss-merge-longhand')(),
    require('postcss-merge-rules')(),
    require('postcss-minify-font-values')(),
    require('postcss-normalize-unicode')(),
    require('postcss-ordered-values')(),
    require('postcss-calc')(),
    require('postcss-unique-selectors')(),
  ];
  const src = fs.readFileSync('styles/style.css', 'utf8');
  const result = await postcss([cssnano({ preset: { plugins } })])
    .process(src, { from: undefined, to: 'styles/style.min.css' });
  fs.writeFileSync('styles/style.min.css', result.css);
  console.log(`CSS ${src.length} -> ${result.css.length} bytes (comments removed: ${!/^\s*\/\*/.test(result.css)})`);
})().catch((e) => { console.error('CSS FAIL:', e.message); process.exit(1); });

// ---- JS: terser minify (separate .min.js files; originals untouched) ----
(async () => {
  const Terser = require('terser');
  for (const f of ['scripts/main.js', 'scripts/analytics.js']) {
    const code = fs.readFileSync(f, 'utf8');
    const res = await Terser.minify(code, { module: false });
    if (res.error) throw res.error;
    fs.writeFileSync(`${f}.min.js`, res.code);
    console.log(`${f}: ${code.length} -> ${res.code.length} bytes`);
  }
})().catch((e) => { console.error('JS FAIL:', e.message); process.exit(1); });
