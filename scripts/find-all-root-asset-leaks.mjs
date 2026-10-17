import fs from 'fs';
import path from 'path';

const DIST_ROOT = path.join(process.cwd(), 'dist');
const SLUGS = [
  'knowtomigrate',
  'knowthemice',
  'smartmigrate',
  'knowthemd',
  'knowthefile',
  'knowyourresume',
  'knowyourjob',
  'knowthebinary',
  'knowheretech'
];

console.log('=== SCANNING ALL SUB-WEBSITES FOR ROOT ASSET LEAKS ===\n');

for (const slug of SLUGS) {
  const dir = path.join(DIST_ROOT, slug);
  if (!fs.existsSync(dir)) continue;

  console.log(`\n--- [${slug}] ---`);

  function scanDir(currentDir) {
    for (const item of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (item.name.endsWith('.html') || item.name.endsWith('.js') || item.name.endsWith('.css')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const relFile = path.relative(dir, fullPath);

        // Check for leaks: strings like "/assets/...", "/downloads/...", "/logo...", "/favicon...", etc.
        // where it's NOT "/<slug>/..."
        // Regex to find paths starting with /
        const leakRegex = /(?:src|href|url\()=["']?\/((?!knowtomigrate|knowthemice|smartmigrate|knowthemd|knowthefile|knowyourresume|knowyourjob|knowthebinary|knowheretech|https?:|\/\/)[a-zA-Z0-9_\-\.]+[\/a-zA-Z0-9_\-\.]*)/g;

        let match;
        const leaks = new Set();
        while ((match = leakRegex.exec(content)) !== null) {
          const leak = match[1];
          // Filter out typical false positives
          if (!leak.includes('xml') && !leak.includes('www.w3.org') && !leak.includes('schema.org')) {
            leaks.add('/' + leak);
          }
        }

        if (leaks.size > 0) {
          console.log(`  File: ${relFile}`);
          for (const l of leaks) {
            console.log(`    ⚠️ Potential root leak: ${l}`);
          }
        }
      }
    }
  }

  scanDir(dir);
}
