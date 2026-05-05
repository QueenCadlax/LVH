import { chromium } from 'playwright';

(async () => {
  try {
    console.log('import ok');
    const browser = await chromium.launch({ headless: true });
    console.log('launched');
    await browser.close();
    console.log('closed');
  } catch (e) {
    console.error('ERR', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
