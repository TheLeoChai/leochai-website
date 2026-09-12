import { chromium } from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';

const phase = process.argv[2] || 'initial';
const root = `/tmp/leochai-world-review/${phase}`;
await fs.mkdir(root, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const observations = [];
try {
  for (const locale of ['en', 'zh']) {
    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:8082/${locale}/work/tiny-world/`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${root}/${locale}-${width}-viewport.png` });
      await page.screenshot({ path: `${root}/${locale}-${width}-full.png`, fullPage: true });
      observations.push({ locale, width, ...(await page.evaluate(() => {
        const world = document.querySelector('.world__view').getBoundingClientRect();
        return { world: { x: world.x, y: world.y, width: world.width, height: world.height }, ready: document.querySelector('[data-world]').hasAttribute('data-ready'), overflow: document.documentElement.scrollWidth > innerWidth };
      })) });
      await context.close();
    }
  }
} finally { await browser.close(); }
await fs.writeFile(`${root}/geometry.json`, JSON.stringify(observations, null, 2));
console.log(JSON.stringify(observations, null, 2));
