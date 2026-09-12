import { chromium } from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.WORLD_URL||'http://127.0.0.1:8082';
const out=process.env.WORLD_OUT||'/tmp/leochai-world-review/interactions';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={base,capturedAt:new Date().toISOString(),results:[]};
try {
 for(const locale of ['en','zh']) {
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.addInitScript(()=>{
   let now=0,id=0;const frames=new Map();
   Object.defineProperty(performance,'now',{value:()=>now});
   window.requestAnimationFrame=fn=>{frames.set(++id,fn);return id};
   window.cancelAnimationFrame=id=>frames.delete(id);
   window.__frameControl={advance(t){now=t;const current=[...frames.values()];frames.clear();for(const fn of current)fn(t)},pending(){return frames.size},time(){return now}};
  });
  const page=await context.newPage();
  await page.goto(`${base}/${locale}/work/tiny-world/`,{waitUntil:'networkidle'});
  await page.waitForSelector('[data-world][data-ready]');
  const inspect=()=>page.evaluate(()=>({pixels:document.querySelector('canvas').toDataURL(),caption:document.querySelector('[data-event-caption]').textContent,observation:document.querySelector('[data-event-observation]').textContent,time:document.querySelector('[data-seek]').value,pending:__frameControl.pending()}));
  const posterDifference=await page.evaluate(()=>{
   const actual=document.querySelector('canvas');const image=document.querySelector('.world__poster');
   const expected=document.createElement('canvas');expected.width=actual.width;expected.height=actual.height;expected.getContext('2d').drawImage(image,0,0);
   const a=actual.getContext('2d').getImageData(0,0,actual.width,actual.height).data,b=expected.getContext('2d').getImageData(0,0,actual.width,actual.height).data;
   let pixels=0;for(let i=0;i<a.length;i+=4)if(a[i]!==b[i]||a[i+1]!==b[i+1]||a[i+2]!==b[i+2]||a[i+3]!==b[i+3])pixels++;
   return pixels;
  });
  const initialPending=await page.evaluate(()=>__frameControl.pending());
  const comparisons=[];
  for(const target of [2000,9000,15000,19000,28000,40000]) {
   await page.locator('[data-seek]').evaluate((node,t)=>{node.value=String(t);node.dispatchEvent(new Event('input',{bubbles:true}))},target);
   const direct=await inspect();
   await page.locator('[data-replay]').click();
   const start=await page.evaluate(()=>__frameControl.time());
   await page.evaluate(({start,target})=>{for(let t=16;t<target;t+=16)__frameControl.advance(start+t);__frameControl.advance(start+target)},{start,target});
   const played=await inspect();
   let stillDifference=null;
   if([2000,19000,40000].includes(target))stillDifference=await page.evaluate(t=>{
    const actual=document.querySelector('canvas'),image=document.querySelectorAll('.world-story__steps img')[[2000,19000,40000].indexOf(t)];
    const expected=document.createElement('canvas');expected.width=actual.width;expected.height=actual.height;expected.getContext('2d').drawImage(image,0,0);
    const a=actual.getContext('2d').getImageData(0,0,actual.width,actual.height).data,b=expected.getContext('2d').getImageData(0,0,actual.width,actual.height).data;
    let pixels=0;for(let i=0;i<a.length;i+=4)if(a[i]!==b[i]||a[i+1]!==b[i+1]||a[i+2]!==b[i+2]||a[i+3]!==b[i+3])pixels++;
    return pixels;
   },target);
   comparisons.push({target,samePixels:direct.pixels===played.pixels,sameCaption:direct.caption===played.caption,sameObservation:direct.observation===played.observation,time:played.time,stillDifference});
   await page.locator('.world__view').screenshot({path:`${out}/${locale}-${target}.png`});
  }
  for(let n=0;n<5;n++)await page.locator('[data-replay]').click();
  const replayPending=await page.evaluate(()=>__frameControl.pending());
  await page.locator('[data-play]').click();
  const pausedPending=await page.evaluate(()=>__frameControl.pending());
  report.results.push({locale,posterDifference,initialPending,comparisons,replayPending,pausedPending});
  await context.close();
 }
} finally {await browser.close()}
await writeFile(`${out}/interactions.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.results.some(r=>r.posterDifference||r.initialPending||r.replayPending!==1||r.pausedPending||r.comparisons.some(c=>!c.samePixels||!c.sameCaption||!c.sameObservation||c.stillDifference)))process.exitCode=1;
