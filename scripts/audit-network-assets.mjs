import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import http from 'http';

const ROUTES = [
  '/',
  '/knowtomigrate/',
  '/knowthemice/',
  '/smartmigrate/',
  '/knowthemd/',
  '/knowthefile/',
  '/knowyourresume/',
  '/knowyourjob/',
  '/knowthebinary/',
  '/knowheretech/'
];

// Helper to wait for server
function waitForServer(port) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      http.get(`http://localhost:${port}/`, (res) => {
        clearInterval(interval);
        resolve();
      }).on('error', (err) => {
        if (attempts > 30) {
          clearInterval(interval);
          reject(new Error('Server failed to start'));
        }
      });
    }, 500);
  });
}

async function run() {
  console.log('🚀 Starting local preview server for asset audit...');
  const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'ignore'
  });

  try {
    await waitForServer(4173);
    console.log('✅ Preview server running on http://localhost:4173');

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const missingAssetsByRoute = {};

    for (const route of ROUTES) {
      console.log(`\n🔍 Auditing route: http://localhost:4173${route}`);
      const page = await context.newPage();
      const failedRequests = [];
      const consoleErrors = [];

      page.on('response', (response) => {
        const status = response.status();
        const url = response.url();
        // Ignore external third-party tracking/analytics if any
        if (status >= 400 && url.includes('localhost:4173')) {
          failedRequests.push({ url, status, type: response.request().resourceType() });
        }
      });

      page.on('requestfailed', (request) => {
        const url = request.url();
        if (url.includes('localhost:4173')) {
          failedRequests.push({ url, failure: request.failure()?.errorText, type: request.resourceType() });
        }
      });

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      try {
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle', timeout: 15000 });
        // Small pause for any lazy loaded components or image renders
        await page.waitForTimeout(2000);
      } catch (err) {
        console.log(`  ⚠️ Navigation timeout/warning: ${err.message}`);
      }

      if (failedRequests.length > 0) {
        console.log(`  ❌ ${failedRequests.length} FAILED REQUESTS on ${route}:`);
        for (const req of failedRequests) {
          console.log(`    - [${req.type}] ${req.status || req.failure}: ${req.url}`);
        }
        missingAssetsByRoute[route] = failedRequests;
      } else {
        console.log(`  ✅ All assets loaded successfully (0 errors) on ${route}`);
      }

      await page.close();
    }

    await browser.close();
    console.log('\n========================================');
    console.log('SUMMARY OF MISSING ASSETS:');
    console.log('========================================');
    let totalMissing = 0;
    for (const [route, fails] of Object.entries(missingAssetsByRoute)) {
      totalMissing += fails.length;
      console.log(`Route ${route}: ${fails.length} missing assets`);
    }
    if (totalMissing === 0) {
      console.log('🎉 ZERO MISSING ASSETS! Everything loads with 200 OK.');
    } else {
      console.log(`⚠️ Total missing asset requests: ${totalMissing}`);
    }

  } finally {
    previewProcess.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
