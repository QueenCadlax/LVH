import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  console.log('screenshot script starting');
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');
  console.log('screenshots dir ok');
  const browser = await chromium.launch({ headless: true });
  console.log('browser launched');
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  console.log('page created');

  const baseFile = path.resolve('dist', 'index.html');
  const base = 'file://' + baseFile;
  import { chromium } from 'playwright';
  import fs from 'fs';
  import path from 'path';

  (async () => {
    console.log('screenshot script starting');
    if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');
    console.log('screenshots dir ok');
    const browser = await chromium.launch({ headless: true });
    console.log('browser launched');
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    console.log('page created');

    const baseFile = path.resolve('dist', 'index.html');
    const base = 'file://' + baseFile;
    try {
      await page.goto(base, { waitUntil: 'networkidle' , timeout: 15000});
      await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
      console.log('Captured screenshots/homepage.png');
    } catch (e) {
      console.error('Homepage capture failed:', e.message);
    }

    try {
      await page.goto(base + '?id=b200', { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: 'screenshots/business-b200.png', fullPage: true });
      console.log('Captured screenshots/business-b200.png');
    } catch (e) {
      console.error('Business detail capture failed:', e.message);
    }

    await browser.close();
  })();
