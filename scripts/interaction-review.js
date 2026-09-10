// Callable expression for playwright-cli; intentionally no trailing semicolon.
async (page) => {
  const results = [];
  const verify = (label, passed) => { results.push({ label, passed }); if (!passed) throw new Error(label); };
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://127.0.0.1:4321/');
  await page.keyboard.press('Tab');
  verify('Keyboard skip link', await page.locator('.skip-link').evaluate(el => el === document.activeElement));
  await page.getByRole('button', { name: '打开导航菜单' }).click();
  verify('Mobile menu opens', await page.getByRole('navigation', { name: '主导航' }).isVisible());
  await page.keyboard.press('Escape');
  verify('Escape closes menu and restores focus', await page.locator('.menu-toggle').evaluate(el => el === document.activeElement && el.getAttribute('aria-expanded') === 'false'));
  await page.getByRole('button', { name: '打开导航菜单' }).click();
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '精选项目' }).click();
  verify('Menu link navigates and closes', page.url().endsWith('#projects') && await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false');
  for (const id of ['api', 'business', 'cache', 'queue', 'data']) {
    await page.locator(`[data-node="${id}"]`).focus();
    await page.keyboard.press('Enter');
    verify(`Architecture ${id} keyboard selection`, await page.locator(`[data-node-panel="${id}"]`).isVisible() && await page.locator('[data-node][aria-pressed="true"]').count() === 1);
  }
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4321' });
  await page.getByRole('button', { name: '复制邮箱' }).click();
  await page.waitForFunction(() => document.querySelector('#copy-status')?.textContent === '已复制');
  verify('Email is copied correctly', await page.evaluate(() => navigator.clipboard.readText()) === '3489023486@qq.com');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true }));
  await page.getByRole('button', { name: '复制邮箱' }).click();
  verify('Clipboard fallback shows guidance and selects email', (await page.locator('#copy-status').textContent()).includes('选中') && (await page.evaluate(() => window.getSelection()?.toString())).includes('3489023486@qq.com'));
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: '下载公开版简历', exact: true }).click();
  const download = await downloadEvent;
  verify('Resume download completes', download.suggestedFilename() === 'resume-jiaen-yan.pdf' && await download.failure() === null);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  verify('Reduced motion disables smooth scroll', await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior) === 'auto');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:4321/projects/knowledge-studio/');
  verify('Concept project is explicitly labeled', (await page.locator('.concept-notice').textContent()).includes('概念设计'));
  const context = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const staticPage = await context.newPage();
  await staticPage.goto('http://127.0.0.1:4321/');
  verify('No-JS mobile navigation remains available', await staticPage.getByRole('navigation', { name: '主导航' }).isVisible());
  verify('No-JS architecture has readable fallback', await staticPage.locator('.noscript-details details').count() === 4);
  await staticPage.locator('.noscript-details summary').first().click();
  verify('No-JS disclosure opens', await staticPage.locator('.noscript-details details').first().getAttribute('open') !== null);
  await context.close();
  await page.goto('http://127.0.0.1:4321/');
  await page.setViewportSize({ width: 1440, height: 1000 });
  return results;
}
