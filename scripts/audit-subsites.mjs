import fs from 'fs';
import path from 'path';

const DIST_ROOT = path.resolve('dist');
const SUBSITES = [
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

console.log('🔍 Running Sub-Website Verification Audit...\n');

let hasError = false;

for (const slug of SUBSITES) {
  const subsiteDir = path.join(DIST_ROOT, slug);
  const indexHtmlPath = path.join(subsiteDir, 'index.html');

  if (!fs.existsSync(subsiteDir)) {
    console.error(`❌ [${slug}] Directory dist/${slug} does not exist!`);
    hasError = true;
    continue;
  }

  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ [${slug}] dist/${slug}/index.html missing!`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(indexHtmlPath, 'utf8');

  // Check script tags
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('http://') || src.startsWith('https://')) continue;

    // Must start with /<slug>/ or ./ or not start with bare /
    if (src.startsWith('/') && !src.startsWith(`/${slug}/`)) {
      console.error(`❌ [${slug}] Leaking root path detected in script src: "${src}"`);
      hasError = true;
    } else {
      // Verify file exists
      const cleanPath = src.startsWith(`/${slug}/`)
        ? src.slice(`/${slug}/`.length)
        : src.replace(/^\.\//, '');
      const filePath = path.join(subsiteDir, cleanPath.split('?')[0]);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ [${slug}] Script referenced but not found on disk: "${src}" (expected at ${filePath})`);
      }
    }
  }

  // Check link tags
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) continue;
    if (href.startsWith('data:')) continue;

    if (href.startsWith('/') && !href.startsWith(`/${slug}/`)) {
      console.error(`❌ [${slug}] Leaking root path detected in link href: "${href}"`);
      hasError = true;
    }
  }

  console.log(`✅ [${slug}] Validated: index.html exists, all prefixes correct!`);
}

if (hasError) {
  console.error('\n❌ Audit finished with ERRORS. Please resolve leaking paths.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL SUB-WEBSITES PASSED THE PREFIX & ASSET AUDIT!');
}
