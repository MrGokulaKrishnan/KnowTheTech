import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fixAllSubsiteAssets } from './fix-subsite-assets.mjs';

const ROOT_DIR = process.cwd();
const STAGING_ROOT = path.join(ROOT_DIR, '.staging');
const DIST_ROOT = path.join(ROOT_DIR, 'dist');

// Ensure no conflicting binary override
delete process.env.ESBUILD_BINARY_PATH;

function ensureCleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyCleanSource(src, dest) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (filePath) => {
      const rel = path.relative(src, filePath);
      const ext = path.extname(filePath).toLowerCase();
      if (['.exe', '.apk', '.msi', '.bin', '.pkg', '.ipa', '.zip', '.mobileconfig'].includes(ext)) return false;
      const lowerRel = rel.toLowerCase();
      if (lowerRel.includes('downloads') || lowerRel.includes('download')) return false;
      return !rel.includes('node_modules') && !rel.includes('dist') && !rel.includes('.git');
    }
  });
}

function copyBuiltOutput(searchDirs, targetDist) {
  ensureCleanDir(targetDist);
  for (const dir of searchDirs) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))) {
      fs.cpSync(dir, targetDist, { recursive: true });
      return;
    }
  }
  throw new Error(`Could not find compiled output in any of: ${searchDirs.join(', ')}`);
}

// ─── 01 KnowToMigrate ────────────────────────────────────────────────────────
function buildKnowToMigrate() {
  console.log('\n========================================');
  console.log('📦 [1/9] Building KnowToMigrate (/knowtomigrate)...');
  console.log('========================================');

  const srcDir = 'C:\\KnowToMigrate\\apps\\website';
  const stagingDir = path.join(STAGING_ROOT, 'knowtomigrate');
  const targetDist = path.join(DIST_ROOT, 'knowtomigrate');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  // Link monorepo root node_modules
  if (fs.existsSync('C:\\KnowToMigrate\\node_modules')) {
    fs.symlinkSync('C:\\KnowToMigrate\\node_modules', path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Router basename patch
  const mainFile = path.join(stagingDir, 'src', 'main.tsx');
  let mainContent = fs.readFileSync(mainFile, 'utf8');
  mainContent = mainContent.replace('<BrowserRouter>', '<BrowserRouter basename="/knowtomigrate">');
  fs.writeFileSync(mainFile, mainContent, 'utf8');

  // Vite base path patch
  const viteFile = path.join(stagingDir, 'vite.config.ts');
  let viteContent = fs.readFileSync(viteFile, 'utf8');
  viteContent = viteContent.replace("base: '/',", "base: '/knowtomigrate/',");
  fs.writeFileSync(viteFile, viteContent, 'utf8');

  execSync(`npx vite build --base=/knowtomigrate/ --outDir=dist/knowtomigrate .staging/knowtomigrate`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowtomigrate'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowToMigrate build completed successfully!');
}

// ─── 02 KnowTheMice ──────────────────────────────────────────────────────────
function buildKnowTheMice() {
  console.log('\n========================================');
  console.log('📦 [2/9] Building KnowTheMice (/knowthemice)...');
  console.log('========================================');

  const srcDir = 'C:\\KnowTheMice\\website';
  const stagingDir = path.join(STAGING_ROOT, 'knowthemice');
  const targetDist = path.join(DIST_ROOT, 'knowthemice');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  if (fs.existsSync(path.join(srcDir, 'node_modules'))) {
    fs.symlinkSync(path.join(srcDir, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  execSync(`npx vite build --base=/knowthemice/ --outDir=dist/knowthemice .staging/knowthemice`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowthemice'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowTheMice build completed successfully!');
}

// ─── 03 SmartMigrate ─────────────────────────────────────────────────────────
function buildSmartMigrate() {
  console.log('\n========================================');
  console.log('📦 [3/9] Building SmartMigrate (/smartmigrate)...');
  console.log('========================================');

  const srcDir = 'C:\\Smart Migrate\\apps\\website';
  const stagingDir = path.join(STAGING_ROOT, 'smartmigrate');
  const targetDist = path.join(DIST_ROOT, 'smartmigrate');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  // Patch app.js downloads path to be relative
  const appJsFile = path.join(stagingDir, 'app.js');
  if (fs.existsSync(appJsFile)) {
    let appJs = fs.readFileSync(appJsFile, 'utf8');
    appJs = appJs.replace('const DOWNLOAD_BASE_URL = "/downloads";', 'const DOWNLOAD_BASE_URL = "downloads";');
    fs.writeFileSync(appJsFile, appJs, 'utf8');
  }

  ensureCleanDir(targetDist);
  fs.cpSync(stagingDir, targetDist, { recursive: true });
  console.log('✅ SmartMigrate build completed successfully!');
}

// ─── 04 KnowTheMD ────────────────────────────────────────────────────────────
function buildKnowTheMD() {
  console.log('\n========================================');
  console.log('📦 [4/9] Building KnowTheMD (/knowthemd)...');
  console.log('========================================');

  const monorepoRoot = 'C:\\KnowTheMD';
  const stagingDir = path.join(STAGING_ROOT, 'knowthemd');
  const targetDist = path.join(DIST_ROOT, 'knowthemd');

  ensureCleanDir(stagingDir);

  // Copy website app and required internal packages
  copyCleanSource(path.join(monorepoRoot, 'apps', 'website'), path.join(stagingDir, 'apps', 'website'));
  copyCleanSource(path.join(monorepoRoot, 'packages'), path.join(stagingDir, 'packages'));

  // Link node_modules from monorepo root
  if (fs.existsSync(path.join(monorepoRoot, 'node_modules'))) {
    fs.symlinkSync(path.join(monorepoRoot, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Patch App.tsx route resolver to handle /knowthemd prefix
  const appFile = path.join(stagingDir, 'apps', 'website', 'src', 'App.tsx');
  let appContent = fs.readFileSync(appFile, 'utf8');
  appContent = appContent.replace(
    /const path = window\.location\.pathname\.replace\(\/\^\\\/\|\\\/\\$\/g,\s*''\)\.toLowerCase\(\);/,
    "let path = window.location.pathname.replace(/^\\/|\\/$/g, '').toLowerCase();\n    if (path.startsWith('knowthemd')) path = path.slice('knowthemd'.length).replace(/^\\/|\\/$/g, '');"
  );
  fs.writeFileSync(appFile, appContent, 'utf8');

  execSync(`npx vite build --base=/knowthemd/ --outDir=dist/knowthemd .staging/knowthemd/apps/website`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'apps', 'website', 'dist', 'knowthemd'),
    path.join(stagingDir, 'apps', 'website', 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowTheMD build completed successfully!');
}

// ─── 05 KnowTheFile ──────────────────────────────────────────────────────────
function buildKnowTheFile() {
  console.log('\n========================================');
  console.log('📦 [5/9] Building KnowTheFile (/knowthefile)...');
  console.log('========================================');

  const srcDir = 'C:\\KnowTheFile';
  const stagingDir = path.join(STAGING_ROOT, 'knowthefile');
  const targetDist = path.join(DIST_ROOT, 'knowthefile');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  if (fs.existsSync(path.join(srcDir, 'node_modules'))) {
    fs.symlinkSync(path.join(srcDir, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Router basename patch
  const mainFile = path.join(stagingDir, 'src', 'main.tsx');
  let mainContent = fs.readFileSync(mainFile, 'utf8');
  mainContent = mainContent.replace('<BrowserRouter>', '<BrowserRouter basename="/knowthefile">');
  fs.writeFileSync(mainFile, mainContent, 'utf8');

  execSync(`npx vite build --base=/knowthefile/ --outDir=dist/knowthefile .staging/knowthefile`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowthefile'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowTheFile build completed successfully!');
}

// ─── 06 KnowYourResume ───────────────────────────────────────────────────────
function buildKnowYourResume() {
  console.log('\n========================================');
  console.log('📦 [6/9] Building KnowYourResume (/knowyourresume)...');
  console.log('========================================');

  const srcDir = 'C:\\KnowYourResume\\public';
  const stagingDir = path.join(STAGING_ROOT, 'knowyourresume');
  const targetDist = path.join(DIST_ROOT, 'knowyourresume');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  // Patch index.html root asset paths to relative paths
  const indexFile = path.join(stagingDir, 'index.html');
  let indexContent = fs.readFileSync(indexFile, 'utf8');
  indexContent = indexContent
    .replace('href="/styles.css', 'href="./styles.css')
    .replace('src="/app.js', 'src="./app.js')
    .replace('href="/assets/kr-logo.jpeg"', 'href="./assets/kr-logo.jpeg"');
  fs.writeFileSync(indexFile, indexContent, 'utf8');

  ensureCleanDir(targetDist);
  fs.cpSync(stagingDir, targetDist, { recursive: true });
  console.log('✅ KnowYourResume build completed successfully!');
}

// ─── 07 KnowYourJob ──────────────────────────────────────────────────────────
function buildKnowYourJob() {
  console.log('\n========================================');
  console.log('📦 [7/9] Building KnowYourJob (/knowyourjob)...');
  console.log('========================================');

  const srcDir = 'C:\\KnowYourJob';
  const stagingDir = path.join(STAGING_ROOT, 'knowyourjob');
  const targetDist = path.join(DIST_ROOT, 'knowyourjob');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  if (fs.existsSync(path.join(srcDir, 'node_modules'))) {
    fs.symlinkSync(path.join(srcDir, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Router basename patch
  const mainFile = path.join(stagingDir, 'src', 'main.tsx');
  let mainContent = fs.readFileSync(mainFile, 'utf8');
  mainContent = mainContent.replace('<BrowserRouter>', '<BrowserRouter basename="/knowyourjob">');
  fs.writeFileSync(mainFile, mainContent, 'utf8');

  execSync(`npx vite build --base=/knowyourjob/ --outDir=dist/knowyourjob .staging/knowyourjob`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowyourjob'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowYourJob build completed successfully!');
}

// ─── 08 KnowTheBinary ────────────────────────────────────────────────────────
function buildKnowTheBinary() {
  console.log('\n========================================');
  console.log('📦 [8/9] Building KnowTheBinary (/knowthebinary)...');
  console.log('========================================');

  const srcDir = 'C:\\Knowhere Binary';
  const stagingDir = path.join(STAGING_ROOT, 'knowthebinary');
  const targetDist = path.join(DIST_ROOT, 'knowthebinary');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  if (fs.existsSync(path.join(srcDir, 'node_modules'))) {
    fs.symlinkSync(path.join(srcDir, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Prevent parent Tailwind v3 PostCSS clash
  fs.writeFileSync(path.join(stagingDir, 'postcss.config.js'), 'export default {};\n', 'utf8');

  // Router basename patch in App.tsx (createBrowserRouter)
  const appFile = path.join(stagingDir, 'src', 'App.tsx');
  let appContent = fs.readFileSync(appFile, 'utf8');
  appContent = appContent.replace(
    /createBrowserRouter\(\s*\[([\s\S]*?)\]\s*\);/,
    "createBrowserRouter([$1], { basename: '/knowthebinary' });"
  );
  fs.writeFileSync(appFile, appContent, 'utf8');

  execSync(`npx vite build --base=/knowthebinary/ --outDir=dist/knowthebinary .staging/knowthebinary`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowthebinary'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ KnowTheBinary build completed successfully!');
}

// ─── 09 Knowhere-Tech ────────────────────────────────────────────────────────
function buildKnowhereTech() {
  console.log('\n========================================');
  console.log('📦 [9/9] Building Knowhere-Tech (/knowheretech)...');
  console.log('========================================');

  const srcDir = 'C:\\Knowhere Tech';
  const stagingDir = path.join(STAGING_ROOT, 'knowheretech');
  const targetDist = path.join(DIST_ROOT, 'knowheretech');

  ensureCleanDir(stagingDir);
  copyCleanSource(srcDir, stagingDir);

  if (fs.existsSync(path.join(srcDir, 'node_modules'))) {
    fs.symlinkSync(path.join(srcDir, 'node_modules'), path.join(stagingDir, 'node_modules'), 'junction');
  }

  // Prevent parent Tailwind v3 PostCSS clash
  fs.writeFileSync(path.join(stagingDir, 'postcss.config.js'), 'export default {};\n', 'utf8');

  // Router basename patch in App.tsx
  const appFile = path.join(stagingDir, 'src', 'App.tsx');
  let appContent = fs.readFileSync(appFile, 'utf8');
  appContent = appContent.replace('<BrowserRouter>', '<BrowserRouter basename="/knowheretech">');
  fs.writeFileSync(appFile, appContent, 'utf8');

  execSync(`npx vite build --base=/knowheretech/ --outDir=dist/knowheretech .staging/knowheretech`, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
  });

  copyBuiltOutput([
    path.join(stagingDir, 'dist', 'knowheretech'),
    path.join(stagingDir, 'dist'),
    targetDist
  ], targetDist);

  console.log('✅ Knowhere-Tech build completed successfully!');
}

// ─── Master Pipeline Runner ──────────────────────────────────────────────────
async function run() {
  const target = process.argv[2] || 'all';
  console.log(`🚀 Starting KnowTheTech Ecosystem Sub-Website Builder [Target: ${target}]...`);

  // Ensure root portal dist exists
  if (!fs.existsSync(path.join(DIST_ROOT, 'index.html'))) {
    console.log('Compiling main KnowTheTech portal first...');
    execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit', shell: true });
  }

  const tasks = {
    knowtomigrate: buildKnowToMigrate,
    knowthemice: buildKnowTheMice,
    smartmigrate: buildSmartMigrate,
    knowthemd: buildKnowTheMD,
    knowthefile: buildKnowTheFile,
    knowyourresume: buildKnowYourResume,
    knowyourjob: buildKnowYourJob,
    knowthebinary: buildKnowTheBinary,
    knowheretech: buildKnowhereTech,
  };

  if (target === 'all') {
    for (const [slug, fn] of Object.entries(tasks)) {
      try {
        fn();
      } catch (err) {
        console.error(`❌ Failed to build ${slug}:`, err.message);
        process.exit(1);
      }
    }
  } else if (tasks[target]) {
    tasks[target]();
  } else {
    console.error(`Unknown target: ${target}. Options: all, ${Object.keys(tasks).join(', ')}`);
    process.exit(1);
  }

  // Normalize asset paths across all sub-websites
  fixAllSubsiteAssets();

  console.log('\n========================================');
  console.log('🎉 ALL REQUESTED SUB-WEBSITES BUILT SUCCESSFULLY!');
  console.log('========================================');
}

run();
