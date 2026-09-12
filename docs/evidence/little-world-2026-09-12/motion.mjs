import { chromium } from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const root=`/tmp/leochai-world-review/${process.argv[2] || 'motion'}`;
await fs.mkdir(root,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:Number(process.argv[3] || 1440),height:1000},reducedMotion:'no-preference'});
const page=await context.newPage();
const evidence=[];
try {
 await page.goto('http://127.0.0.1:8082/en/work/tiny-world/',{waitUntil:'networkidle'});
 await page.locator('[data-play]').click();
 const started=Date.now();
 for(const target of [0,3000,8000,14000,20000,27000,34000,40100]){
  const remaining=target-(Date.now()-started);if(remaining>0) await page.waitForTimeout(remaining);
  await page.locator('.world__view').screenshot({path:`${root}/actual-${target}.png`});
  evidence.push({target,elapsed:Date.now()-started,time:await page.locator('[data-time]').textContent(),caption:await page.locator('[data-event-caption]').textContent()});
 }
 await fs.writeFile(`${root}/actual-timing.json`,JSON.stringify(evidence,null,2));
 console.log(JSON.stringify(evidence,null,2));
}finally{await browser.close();}
