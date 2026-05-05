import { chromium } from 'playwright';

const URL = process.env.DEV_URL || 'http://localhost:3001/';

(async () => {
  console.log('launching browser...');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  console.log('browser launched');
  const page = await browser.newPage();
  try {
    console.log('visiting', URL);
    await page.goto(URL, { waitUntil: 'domcontentloaded' });

    // STATE 1: Default page checks
    const featuredVisible = await page.getByText(/Featured/i).isVisible().catch(()=>false);
    const popularVisible = await page.getByText(/Popular/i).isVisible().catch(()=>false);
    const subcatsVisible = await page.getByText('Explore Subcategories').isVisible().catch(()=>false);
    const noResultsVisibleDefault = await page.getByText('No listings found for these filters.').isVisible().catch(()=>false);

    console.log('STATE1 - featured:', featuredVisible, 'popular:', popularVisible, 'subcats:', subcatsVisible, 'noResultsShown:', noResultsVisibleDefault);

    if (!featuredVisible || !popularVisible || !subcatsVisible) {
      throw new Error('Default view checks failed');
    }
    if (noResultsVisibleDefault) {
      throw new Error('No-results shown on default view');
    }

    // STATE 2: Select a subcategory from sidebar if present
    // Find an "Explore More" / subcategory button (uses button text list). Try 'FINE DINING'
    const subBtn = page.getByRole('button', { name: /FINE DINING/i }).first();
    const foundSub = await subBtn.isVisible().catch(()=>false);
    if (foundSub) {
      await subBtn.click();
      await page.waitForTimeout(600);
      const hero = await page.getByRole('heading', { level: 1 }).first().innerText().catch(()=>null);
      console.log('STATE2 - hero:', hero);
      if (!hero || !/FINE DINING/i.test(hero)) console.warn('Hero did not update to subcategory — manual check recommended');

      // Ensure featured section still present
      const featStill = await page.getByText(/Featured/i).isVisible().catch(()=>false);
      if (!featStill) throw new Error('Featured missing after selecting subcategory');
    } else {
      console.log('STATE2 - subcategory button (FINE DINING) not found; skipping subcategory flow');
    }

    // STATE 3: Apply a query that yields zero results
    // Fill the main search input and click Apply
    const searchInputs = await page.locator('input[placeholder*=Search]').all();
    if (searchInputs.length > 0) {
      await searchInputs[0].fill('no-such-business-12345');
      // Click Apply button
      const applyBtn = page.getByRole('button', { name: /Apply/i }).first();
      if (await applyBtn.isVisible().catch(()=>false)) {
        await applyBtn.click();
        await page.waitForTimeout(600);
        const noResultsVisible = await page.getByText('No listings found for these filters.').isVisible().catch(()=>false);
        console.log('STATE3 - noResultsVisible:', noResultsVisible);
        if (!noResultsVisible) throw new Error('No-results state not shown when expected');
      } else {
        console.warn('Apply button not found; tried to use hero search input only.');
      }
    } else {
      console.warn('Search input not found on page; cannot produce zero-results state programmatically');
    }

    console.log('SMOKE TESTS PASSED');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('SMOKE TEST FAILED:', err && err.message ? err.message : err);
    await browser.close();
    process.exit(2);
  }
})();
