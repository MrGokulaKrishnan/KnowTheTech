import fs from 'fs';
import path from 'path';

const DIST_ROOT = path.join(process.cwd(), 'dist');

export function fixAllSubsiteAssets() {
  console.log('🔧 Starting Sub-Website Asset Path Normalization...\n');

  // Helper to safely replace content in file
  function patchFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const { from, to } of replacements) {
      if (typeof from === 'string') {
        if (content.includes(from)) {
          content = content.replaceAll(from, to);
          changed = true;
          console.log(`  ✅ [${path.basename(filePath)}] Replaced '${from.substring(0, 40)}...' -> '${to.substring(0, 40)}...'`);
        }
      } else {
        if (from.test(content)) {
          content = content.replace(from, to);
          changed = true;
          console.log(`  ✅ [${path.basename(filePath)}] Regex match replaced with '${to.substring(0, 40)}...'`);
        }
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }

  // 1. KnowToMigrate
  console.log('--- Fixing KnowToMigrate ---');
  const ktmAssets = path.join(DIST_ROOT, 'knowtomigrate', 'assets');
  if (fs.existsSync(ktmAssets)) {
    for (const f of fs.readdirSync(ktmAssets)) {
      if (f.endsWith('.js')) {
        patchFile(path.join(ktmAssets, f), [
          { from: '"/logo.jpg"', to: '"/knowtomigrate/logo.jpg"' },
          { from: "'/download/'", to: "'https://knowtomigrate.web.app/download/'" },
          { from: '"/download/"', to: '"https://knowtomigrate.web.app/download/"' }
        ]);
      }
    }
  }
  patchFile(path.join(DIST_ROOT, 'knowtomigrate', 'index.html'), [
    { from: 'content="/logo512.png"', to: 'content="/knowtomigrate/logo512.png"' },
    { from: 'content="/logo.jpg"', to: 'content="/knowtomigrate/logo.jpg"' }
  ]);

  // 2. KnowTheMice
  console.log('\n--- Fixing KnowTheMice ---');
  const ktmMiceAssets = path.join(DIST_ROOT, 'knowthemice', 'assets');
  if (fs.existsSync(ktmMiceAssets)) {
    for (const f of fs.readdirSync(ktmMiceAssets)) {
      if (f.endsWith('.js')) {
        patchFile(path.join(ktmMiceAssets, f), [
          { from: '"/logo.png"', to: '"/knowthemice/logo.png"' },
          { from: '"/logo_monogram.png"', to: '"/knowthemice/logo_monogram.png"' },
          { from: '"/favicon-16x16.png"', to: '"/knowthemice/favicon-16x16.png"' },
          { from: '"/downloads.json"', to: '"/knowthemice/downloads.json"' }
        ]);
      }
    }
  }
  patchFile(path.join(DIST_ROOT, 'knowthemice', 'downloads.json'), [
    { from: '"/downloads/windows/', to: '"https://knowthemice.web.app/downloads/windows/' },
    { from: '"/downloads/android/', to: '"https://knowthemice.web.app/downloads/android/' }
  ]);

  // 3. SmartMigrate
  console.log('\n--- Fixing SmartMigrate ---');
  // Copy media directory if present in public
  const smPublicMedia = path.join(DIST_ROOT, 'smartmigrate', 'public', 'media');
  const smTargetMedia = path.join(DIST_ROOT, 'smartmigrate', 'media');
  if (fs.existsSync(smPublicMedia) && !fs.existsSync(smTargetMedia)) {
    fs.cpSync(smPublicMedia, smTargetMedia, { recursive: true });
    console.log('  ✅ Copied media/ folder to dist/smartmigrate/media/');
  }
  patchFile(path.join(DIST_ROOT, 'smartmigrate', 'index.html'), [
    { from: 'href="/downloads/windows/SmartMigrate-Setup-x64.exe"', to: 'href="https://smartmigrate.web.app/downloads/windows/SmartMigrate-Setup-x64.exe"' },
    { from: 'href="/downloads/windows/SmartMigrate-x64.msi"', to: 'href="https://smartmigrate.web.app/downloads/windows/SmartMigrate-x64.msi"' },
    { from: 'href="/downloads/android/SmartMigrate.apk"', to: 'href="https://smartmigrate.web.app/downloads/android/SmartMigrate.apk"' }
  ]);
  patchFile(path.join(DIST_ROOT, 'smartmigrate', 'app.js'), [
    { from: 'const DOWNLOAD_BASE_URL = "downloads";', to: 'const DOWNLOAD_BASE_URL = "https://smartmigrate.web.app/downloads";' },
    { from: 'const DOWNLOAD_BASE_URL = "/downloads";', to: 'const DOWNLOAD_BASE_URL = "https://smartmigrate.web.app/downloads";' }
  ]);

  // 4. KnowTheMD
  console.log('\n--- Fixing KnowTheMD ---');
  patchFile(path.join(DIST_ROOT, 'knowthemd', 'index.html'), [
    { from: 'content="https://knowthemd.com/og-banner.png"', to: 'content="/knowthemd/logo-512.png"' }
  ]);

  // 5. KnowTheFile
  console.log('\n--- Fixing KnowTheFile ---');
  patchFile(path.join(DIST_ROOT, 'knowthefile', 'index.html'), [
    { from: 'href="/tools"', to: 'href="/knowthefile/tools"' },
    { from: 'href="/tools/pdf-editor"', to: 'href="/knowthefile/tools/pdf-editor"' },
    { from: 'href="/pricing"', to: 'href="/knowthefile/pricing"' },
    { from: 'href="/tools/merge-pdf"', to: 'href="/knowthefile/tools/merge-pdf"' },
    { from: 'href="/tools/split-pdf"', to: 'href="/knowthefile/tools/split-pdf"' },
    { from: 'href="/tools/compress-pdf"', to: 'href="/knowthefile/tools/compress-pdf"' },
    { from: 'href="/tools/rotate-pdf"', to: 'href="/knowthefile/tools/rotate-pdf"' },
    { from: 'href="/tools/sign-pdf"', to: 'href="/knowthefile/tools/sign-pdf"' },
    { from: 'href="/tools/unlock-pdf"', to: 'href="/knowthefile/tools/unlock-pdf"' }
  ]);

  // 6. KnowYourResume
  console.log('\n--- Fixing KnowYourResume ---');
  patchFile(path.join(DIST_ROOT, 'knowyourresume', 'index.html'), [
    { from: 'src="/assets/kr-logo.jpeg"', to: 'src="/knowyourresume/assets/kr-logo.jpeg"' },
    { from: 'href="/dashboard"', to: 'href="#dashboard"' }
  ]);

  // 7. KnowYourJob
  console.log('\n--- Fixing KnowYourJob ---');
  const kyjAssets = path.join(DIST_ROOT, 'knowyourjob', 'assets');
  if (fs.existsSync(kyjAssets)) {
    for (const f of fs.readdirSync(kyjAssets)) {
      if (f.endsWith('.js')) {
        patchFile(path.join(kyjAssets, f), [
          { from: '"/kyj-logo.jpg"', to: '"/knowyourjob/kyj-logo.jpg"' }
        ]);
      }
    }
  }

  // 8. KnowTheBinary
  console.log('\n--- Fixing KnowTheBinary ---');
  const ktbAssets = path.join(DIST_ROOT, 'knowthebinary', 'assets');
  if (fs.existsSync(ktbAssets)) {
    for (const f of fs.readdirSync(ktbAssets)) {
      if (f.endsWith('.js')) {
        patchFile(path.join(ktbAssets, f), [
          { from: '"/logo.png"', to: '"/knowthebinary/logo.png"' },
          { from: '"/app-icon.png"', to: '"/knowthebinary/app-icon.png"' }
        ]);
      }
    }
  }

  // 9. Knowhere Tech
  console.log('\n--- Fixing Knowhere Tech ---');
  const kwtAssets = path.join(DIST_ROOT, 'knowheretech', 'assets');
  if (fs.existsSync(kwtAssets)) {
    for (const f of fs.readdirSync(kwtAssets)) {
      if (f.endsWith('.js')) {
        patchFile(path.join(kwtAssets, f), [
          { from: '"/logo.png"', to: '"/knowheretech/logo.png"' }
        ]);
      }
    }
  }
  patchFile(path.join(DIST_ROOT, 'knowheretech', 'sw.js'), [
    { from: "'/logo.png'", to: "'/knowheretech/logo.png'" },
    { from: "'/favicon.png'", to: "'/knowheretech/favicon.png'" },
    { from: "'/icon-192.png'", to: "'/knowheretech/icon-192.png'" },
    { from: "'/icon-512.png'", to: "'/knowheretech/icon-512.png'" },
    { from: "'/manifest.webmanifest'", to: "'/knowheretech/manifest.webmanifest'" },
    { from: '"/logo.png"', to: '"/knowheretech/logo.png"' },
    { from: '"/favicon.png"', to: '"/knowheretech/favicon.png"' },
    { from: '"/icon-192.png"', to: '"/knowheretech/icon-192.png"' },
    { from: '"/icon-512.png"', to: '"/knowheretech/icon-512.png"' },
    { from: '"/manifest.webmanifest"', to: '"/knowheretech/manifest.webmanifest"' }
  ]);

  console.log('\n🎉 ALL SUBSITE ASSETS NORMALIZED SUCCESSFULLY!');
}

// Execute directly if run via node
if (process.argv[1]?.endsWith('fix-subsite-assets.mjs')) {
  fixAllSubsiteAssets();
}
