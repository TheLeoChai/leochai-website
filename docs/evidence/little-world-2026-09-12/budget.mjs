import {chromium} from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const base='https://b186b7df4d624d00e0a8-8082-tunnel.kimaki.dev';
const root='/tmp/leochai-world-preview';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={base,measuredAt:new Date().toISOString(),method:'Fresh Chromium contexts; CDP Network.loadingFinished encodedDataLength during real tunnel page load. HTTP encoded transfer observations, not gzip estimates. OS/TLS overhead excluded.',pages:[]};
try {
 for(const locale of ['en','zh']) {
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),cdp=await context.newCDPSession(page),requests=new Map(),network=[];
  await cdp.send('Network.enable');
  cdp.on('Network.responseReceived',e=>requests.set(e.requestId,{url:e.response.url,status:e.response.status,mimeType:e.response.mimeType,encoding:e.response.headers['content-encoding']||e.response.headers['Content-Encoding']||null,cache:e.response.fromDiskCache}));
  cdp.on('Network.loadingFinished',e=>network.push({...requests.get(e.requestId),encodedDataLength:e.encodedDataLength}));
  const response=await page.goto(`${base}/${locale}/work/tiny-world/`,{waitUntil:'networkidle'});
  await page.waitForSelector('[data-world][data-ready]');
  const beforePlay=network.reduce((n,r)=>n+r.encodedDataLength,0);
  await page.locator('[data-play]').click();await page.waitForTimeout(500);await page.locator('[data-play]').click();
  report.pages.push({locale,status:response.status(),beforePlayBytes:beforePlay,afterPlayBytes:network.reduce((n,r)=>n+r.encodedDataLength,0),network});
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:320,height:844}}),page=await context.newPage();
 await page.goto('http://127.0.0.1:8082/en/work/tiny-world/',{waitUntil:'networkidle'});
 report.width320=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth}));await context.close();
} finally {await browser.close()}
report.artifacts={};for(const file of ['js/world.js','js/world-model.js','css/world.css','world/poster.png','world/scene.json','world/sprites.png','world/trace.json']){const bytes=await fs.readFile(`${root}/site/${file}`);report.artifacts[file]={fileBytes:bytes.length,gzipEstimate: gzipSync(bytes).length};}
report.replayCodeGzipEstimate=report.artifacts['js/world.js'].gzipEstimate+report.artifacts['js/world-model.js'].gzipEstimate;
await fs.writeFile('/tmp/leochai-world-review/budget.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
