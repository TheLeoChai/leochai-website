import { chromium } from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import AxeBuilder from '/tmp/leochai-review/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.WORLD_URL || 'http://127.0.0.1:8082';
const out = process.env.WORLD_OUT || '/tmp/leochai-world-review/initial';
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const report = { base, capturedAt: new Date().toISOString(), normal: [], fallback: [] };
try {
  for (const locale of ['en', 'zh']) for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [], network = [], requests = new Map();
    page.on('pageerror', error => errors.push(error.message));
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    cdp.on('Network.responseReceived', event => requests.set(event.requestId, { url: event.response.url, status: event.response.status, mimeType: event.response.mimeType, fromDiskCache: event.response.fromDiskCache }));
    cdp.on('Network.loadingFinished', event => network.push({ ...requests.get(event.requestId), encodedDataLength: event.encodedDataLength }));
    await page.goto(`${base}/${locale}/work/tiny-world/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const axe = await new AxeBuilder({ page }).analyze();
    const details = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth, viewport: innerWidth,
      headings: [...document.querySelectorAll('h1,h2')].map(n => n.textContent),
      images: [...document.images].map(n => ({ src: n.getAttribute('src'), complete: n.complete, width: n.naturalWidth })),
      canvases: [...document.querySelectorAll('canvas')].map(n => ({ width: n.width, height: n.height, display: getComputedStyle(n).display })),
      resourceTiming: performance.getEntriesByType('resource').map(r => ({ name:r.name, transferSize:r.transferSize, encodedBodySize:r.encodedBodySize, decodedBodySize:r.decodedBodySize }))
    }));
    await page.screenshot({ path: `${out}/world-${locale}-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/viewport-${locale}-${width}.png` });
    report.normal.push({ locale, width, details, errors, network, encodedTransferredBytes: network.reduce((n,r)=>n+r.encodedDataLength,0), violations: axe.violations.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.map(n => ({ target:n.target, failureSummary:n.failureSummary })) })) });
    await context.close();
  }
  for (const locale of ['en', 'zh']) for (const mode of ['no-js', 'reduced-motion', 'blocked-enhancement']) {
    const context = await browser.newContext({ viewport: { width:390, height:1000 }, javaScriptEnabled:mode !== 'no-js', reducedMotion:mode === 'reduced-motion' ? 'reduce':'no-preference' });
    const page = await context.newPage();
    if (mode === 'blocked-enhancement') await page.route(/(?:world-model|world)\.js|map-(?:base|front)\.png|sprites\.png/, route => route.abort());
    await page.goto(`${base}/${locale}/work/tiny-world/`, { waitUntil:'networkidle' });
    const details = await page.evaluate(() => ({
      text:document.querySelector('main').innerText,
      overflow:document.documentElement.scrollWidth > innerWidth,
      runningAnimations:document.getAnimations().filter(a=>a.playState==='running').length,
      images:[...document.images].map(n=>({src:n.getAttribute('src'),complete:n.complete,width:n.naturalWidth}))
    }));
    await page.screenshot({ path:`${out}/${mode}-${locale}-390.png`,fullPage:true });
    report.fallback.push({locale,mode,...details});
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(`${out}/audit.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({base,out,normal:report.normal.map(r=>({locale:r.locale,width:r.width,violations:r.violations,errors:r.errors,bytes:r.encodedTransferredBytes,overflow:r.details.scrollWidth>r.width})),fallback:report.fallback.map(r=>({locale:r.locale,mode:r.mode,overflow:r.overflow,runningAnimations:r.runningAnimations}))},null,2));
if(report.normal.some(r=>r.errors.length||r.violations.length||r.details.scrollWidth>r.width)||report.fallback.some(r=>r.overflow||(r.mode==='reduced-motion'&&r.runningAnimations)))process.exitCode=1;
