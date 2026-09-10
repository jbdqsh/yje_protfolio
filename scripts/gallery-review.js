// Run with playwright-cli run-code --filename scripts/gallery-review.js.
async (page) => {
  const root = 'http://127.0.0.1:4321';
  const results = [];
  const errors = [];
  const verify = (label, passed) => { results.push({ label, passed }); if (!passed) throw new Error(label); };
  page.on('pageerror', error => errors.push(error.message));
  const cases = [['care-operations', 4], ['teaching-quality', 1], ['mine-ventilation', 2], ['yojex-forum', 1]];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [375, 725, 768, 1440]) {
    await page.setViewportSize({ width, height: 867 });
    for (const [slug, count] of cases) {
      await page.goto(`${root}/projects/${slug}/`);
      verify(`${slug} at ${width}: image count`, await page.locator('.gallery-slide').count() === count);
      verify(`${slug} at ${width}: controls only for multiple images`, await page.locator('[data-gallery-controls]').count() === (count > 1 ? 1 : 0));
      await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));
      const sticky = await page.locator('.site-header').boundingBox();
      verify(`${slug} at ${width}: header sticks to top`, Math.abs(sticky.y) < 1);
      await page.locator('a[href="#background"]').click();
      const heading = await page.locator('#background h2').boundingBox();
      verify(`${slug} at ${width}: anchor below header`, heading.y >= sticky.height);
      verify(`${slug} at ${width}: no document overflow`, await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
      await page.locator('project-gallery').scrollIntoViewIfNeeded();
      const track = page.locator('.gallery-track');
      if (count > 1) {
        await page.getByRole('button', { name: '下一张图片', exact: true }).click();
        await page.waitForFunction(() => document.querySelector('[data-gallery-count]').textContent.trim().startsWith('02'));
        verify(`${slug} at ${width}: next selects exactly one thumbnail`, await page.locator('.gallery-thumbnail[aria-pressed="true"]').count() === 1 && await page.locator('.gallery-thumbnail').nth(1).getAttribute('aria-pressed') === 'true');
        await track.focus();
        await page.keyboard.press('End');
        await page.waitForFunction(n => document.querySelector('[data-gallery-count]').textContent.trim().startsWith(String(n).padStart(2, '0')), count);
        verify(`${slug} at ${width}: End key reaches last image`, await page.getByRole('button', { name: '下一张图片', exact: true }).isDisabled());
        await page.keyboard.press('Home');
        await page.waitForFunction(() => document.querySelector('[data-gallery-count]').textContent.trim().startsWith('01'));
        verify(`${slug} at ${width}: Home key reaches first image`, await page.getByRole('button', { name: '上一张图片', exact: true }).isDisabled());
      }
      for (let index = 0; index < count; index++) {
        if (count > 1) {
          await page.locator('[data-gallery-index]').nth(index).click();
          await page.waitForFunction(i => document.querySelectorAll('.gallery-thumbnail')[i].getAttribute('aria-pressed') === 'true', index);
        }
        const slide = page.locator('.gallery-slide').nth(index);
        await slide.locator('img').evaluate(img => img.decode());
        verify(`${slug} at ${width}: image ${index + 1} loads`, await slide.locator('img').evaluate(img => img.naturalWidth > 0));
        if (width === 375 || width === 1440) {
          await page.locator('project-gallery').screenshot({ path: `output/playwright/gallery-${slug}-${width}-${index + 1}.png` });
        }
        const source = await slide.locator('a').getAttribute('href');
        verify(`${slug} at ${width}: original ${index + 1} accessible`, (await page.request.get(root + source)).ok());
      }
    }
  }
  // Verify native scroll independently of the JS buttons, including touch gestures.
  const touchContext = await page.context().browser().newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(root + '/projects/care-operations/');
  await touchPage.locator('.gallery-stage').first().scrollIntoViewIfNeeded();
  const stage = await touchPage.locator('.gallery-stage').first().boundingBox();
  const cdp = await touchContext.newCDPSession(touchPage);
  const y = Math.max(170, stage.y + stage.height / 2);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 310, y }] });
  for (let x = 290; x >= 60; x -= 20) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await touchPage.waitForFunction(() => !document.querySelector('[data-gallery-count]').textContent.trim().startsWith('01'));
  verify('Native mobile swipe changes the selected image', true);
  await touchContext.close();
  const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(root + '/projects/care-operations/');
  verify('No-JS gallery retains four images and original links', await staticPage.locator('.gallery-slide').count() === 4 && await staticPage.locator('.gallery-slide a').count() === 4);
  verify('No-JS gallery hides nonfunctional buttons', !await staticPage.locator('[data-gallery-controls]').isVisible());
  await staticPage.locator('.gallery-slide').last().locator('a').focus();
  verify('No-JS keyboard can reach the final original link', await staticPage.locator('.gallery-track').evaluate(el => el.scrollLeft > el.clientWidth * 2));
  await staticContext.close();
  verify('No browser exceptions', errors.length === 0);
  await page.goto(root + '/projects/teaching-quality/');
  await page.setViewportSize({ width: 725, height: 867 });
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await page.screenshot({ path: 'output/playwright/sticky-header-725.png' });
  return { checks: results.length, results, browserErrors: errors };
}
