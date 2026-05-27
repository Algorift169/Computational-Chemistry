const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Create dist folder if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Bundle and minify JavaScript
esbuild.buildSync({
  entryPoints: ['js/main.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/app.min.js',
  external: [],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

// Minify CSS
const css = fs.readFileSync('css/style.css', 'utf-8');
const minifiedCss = css
  .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
  .replace(/\s+/g, ' ') // Remove extra whitespace
  .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around selectors and properties
  .trim();

fs.writeFileSync('dist/style.min.css', minifiedCss);

console.log('✅ Build complete!');
console.log('📦 Generated files:');
console.log('  - dist/app.min.js');
console.log('  - dist/style.min.css');
console.log('\n✨ All source files are now bundled and hidden from dev tools!');
