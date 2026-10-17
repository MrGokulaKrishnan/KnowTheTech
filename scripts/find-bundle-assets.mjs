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

console.log('=== COMPREHENSIVE SCAN FOR MISSING/ROOT-RELATIVE ASSETS ===\n');

const EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp', 'gif', 'json', 'webmanifest', 'txt', 'mjs'];

for (const slug of SLUGS) {
  const dir = path.join(DIST_ROOT, slug);
  if (!fs.existsSync(dir)) continue;

  console.log(`\n--- [${slug}] ---`);

  function scan(currentDir) {
    for (const item of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const full = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        scan(full);
      } else if (item.name.endsWith('.js') || item.name.endsWith('.html') || item.name.endsWith('.css')) {
        const content = fs.readFileSync(full, 'utf8');
        const rel = path.relative(dir, full);

        // Find strings starting with / followed by filename with one of our extensions
        // but NOT starting with /${slug}/
        const extPattern = EXTENSIONS.join('|');
        const regex = new RegExp(`["'\`]\\/((?!${slug}\\/)[a-zA-Z0-9_\\-\\.\\/]+\\.(${extPattern}))["'\`]`, 'g');

        let match;
        const found = new Set();
        while ((match = regex.exec(content)) !== null) {
          const matchedPath = match[1];
          // Filter out typical http/cdn or harmless schema paths
          if (!matchedPath.includes('w3.org') && !matchedPath.includes('schema.org') && !matchedPath.startsWith('http')) {
            found.add('/' + matchedPath);
          }
        }

        if (found.size > 0) {
          console.log(`  File: ${rel}`);
          for (const f of found) {
            console.log(`    ❌ Leaked root asset: ${f}`);
          }
        }
      }
    }
  }

  scan(dir);
}
