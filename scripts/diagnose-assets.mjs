import fs from 'fs';
import path from 'path';

const SUBSITES = [
  { slug: 'knowtomigrate', src: 'C:\\KnowToMigrate\\apps\\website\\public' },
  { slug: 'knowthemice', src: 'C:\\KnowTheMice\\website\\public' },
  { slug: 'smartmigrate', src: 'C:\\Smart Migrate\\apps\\website' },
  { slug: 'knowthemd', src: 'C:\\KnowTheMD\\apps\\website\\public' },
  { slug: 'knowthefile', src: 'C:\\KnowTheFile\\public' },
  { slug: 'knowyourresume', src: 'C:\\KnowYourResume\\public' },
  { slug: 'knowyourjob', src: 'C:\\KnowYourJob\\public' },
  { slug: 'knowthebinary', src: 'C:\\Knowhere Binary\\public' },
  { slug: 'knowheretech', src: 'C:\\Knowhere Tech\\public' },
];

const DIST_ROOT = path.join(process.cwd(), 'dist');

console.log('=== DIAGNOSING SUB-WEBSITE ASSETS ===\n');

for (const sub of SUBSITES) {
  const distDir = path.join(DIST_ROOT, sub.slug);
  console.log(`\n--- [${sub.slug}] ---`);

  if (!fs.existsSync(distDir)) {
    console.log(`❌ dist/${sub.slug} does not exist!`);
    continue;
  }

  // 1. Check index.html for referenced assets
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');

    // Look for src="..." or href="..."
    const regex = /(?:src|href|content)=["']([^"']+)["']/g;
    let match;
    const referenced = new Set();
    while ((match = regex.exec(html)) !== null) {
      const val = match[1];
      if (!val.startsWith('http') && !val.startsWith('#') && !val.startsWith('data:') && !val.startsWith('mailto:') && val !== '/' && !val.startsWith('javascript:')) {
        referenced.add(val);
      }
    }

    console.log(`Referenced assets in index.html:`);
    for (const ref of referenced) {
      // Determine expected local file path
      let localPath;
      if (ref.startsWith(`/${sub.slug}/`)) {
        localPath = path.join(distDir, ref.replace(`/${sub.slug}/`, ''));
      } else if (ref.startsWith('/')) {
        localPath = path.join(DIST_ROOT, ref.substring(1));
      } else {
        localPath = path.join(distDir, ref.split('?')[0]);
      }

      const exists = fs.existsSync(localPath.split('?')[0]);
      const status = exists ? '✅' : '❌ MISSING';
      console.log(`  ${status}: ${ref} -> ${path.relative(DIST_ROOT, localPath)}`);
    }
  }

  // 2. Check what was in original public vs what is in dist
  if (fs.existsSync(sub.src)) {
    const origFiles = [];
    function scan(dir, base = '') {
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist') continue;
        const rel = path.join(base, item.name);
        if (item.isDirectory()) {
          scan(path.join(dir, item.name), rel);
        } else {
          origFiles.push(rel);
        }
      }
    }
    scan(sub.src);

    const missingFromDist = [];
    for (const file of origFiles) {
      const ext = path.extname(file).toLowerCase();
      // Skip installer binaries
      if (['.exe', '.apk', '.msi', '.bin', '.pkg', '.ipa', '.zip'].includes(ext)) continue;
      if (file.toLowerCase().includes('download')) continue;

      const targetPath = path.join(distDir, file);
      if (!fs.existsSync(targetPath)) {
        missingFromDist.push(file);
      }
    }

    if (missingFromDist.length > 0) {
      console.log(`  ⚠️ Source files missing in dist/${sub.slug}:`);
      for (const m of missingFromDist.slice(0, 15)) {
        console.log(`    - ${m}`);
      }
      if (missingFromDist.length > 15) {
        console.log(`    ... and ${missingFromDist.length - 15} more`);
      }
    } else {
      console.log(`  All source public files present in dist/${sub.slug}`);
    }
  }
}
