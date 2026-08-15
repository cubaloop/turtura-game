const { chromium } = require('C:/Users/Yo/.gemini/antigravity/tools/browser-helper/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:8085');
  await page.waitForTimeout(1500);

  // Click Chapter 1
  await page.click('#chapter-earth');
  await page.waitForTimeout(1000);

  // Click Combat tab and trigger battle
  await page.click('#tab-combat');
  await page.waitForTimeout(800);
  await page.click('#btn-start-battle');
  await page.waitForTimeout(500);

  const bodyText = await page.textContent('body');
  console.log('Contains undefined?', bodyText.includes('undefined'));
  console.log('Contains NaN?', bodyText.includes('NaN'));

  await page.screenshot({ path: 'C:/Users/Yo/.gemini/antigravity/brain/f39b4e6e-3179-49f5-a345-fb5f36912d4e/turtura_hearthstone_overhaul_screenshot.png' });
  console.log('Console Errors Count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Console Errors:', consoleErrors);

  await browser.close();
})();
