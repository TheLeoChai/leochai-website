import { chromium } from '/tmp/leochai-review/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const results = [];
const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
const base = 'http://127.0.0.1:8082';
async function run(locale, name, fn, options = {}) {
  const context = await browser.newContext({viewport:{width:390,height:844},...options});
  const page = await context.newPage();
  try { results.push({locale,name,...await fn(page,context)}); }
  catch (error) { results.push({locale,name,pass:false,error:String(error)}); }
  finally { await context.close(); }
}
const open = async (page,locale) => { await page.goto(`${base}/${locale}/work/tiny-world/`,{waitUntil:'networkidle'}); };
try {
  for (const locale of ['en','zh']) {
    await run(locale,'keyboard-and-targets',async page => {
      await open(page,locale);
      await page.waitForSelector('[data-world][data-ready]');
      const button = page.locator('[data-play]');
      await button.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(180);
      const playing = await page.locator('[data-play-label]').textContent();
      await page.keyboard.press('Enter');
      const paused = await page.locator('[data-play-label]').textContent();
      const buttonFocused = await button.evaluate(el=>el===document.activeElement);
      const range = page.locator('[data-seek]');
      await range.focus(); const before = await range.inputValue(); await page.keyboard.press('ArrowRight');
      const after = await range.inputValue();
      const rangeFocused = await range.evaluate(el=>el===document.activeElement);
      const targets = await page.locator('.site-nav a, [data-controls] button, [data-seek]').evaluateAll(els=>els.filter(el=>el.getBoundingClientRect().width).map(el=>{const r=el.getBoundingClientRect(); return {name:el.textContent.trim()||el.getAttribute('aria-label')||'range',width:r.width,height:r.height,pass:r.width>=44&&r.height>=44};}));
      return {pass:buttonFocused&&rangeFocused&&Number(after)>Number(before)&&targets.every(t=>t.pass)&&playing===(locale==='en'?'Pause':'暂停')&&paused!==playing,playing,paused,buttonFocused,rangeFocused,before,after,targets};
    });
    await run(locale,'reduced-motion-discrete-controls',async page => {
      await open(page,locale); await page.waitForSelector('[data-world][data-ready]');
      const hidden = await page.locator('[data-play]').isHidden()&&await page.locator('[data-replay]').isHidden();
      await page.locator('[data-step]').click();
      const zero = await page.locator('[data-seek]').inputValue();
      await page.locator('[data-step]').click();
      const next = await page.locator('[data-seek]').inputValue();
      await page.waitForTimeout(200); const stable = await page.locator('[data-seek]').inputValue();
      await page.locator('[data-seek]').focus(); await page.keyboard.press('ArrowRight');
      const seek = await page.locator('[data-seek]').inputValue();
      return {pass:hidden&&zero==='0'&&next==='2000'&&stable===next&&seek==='2100',hidden,zero,next,stable,seek};
    },{reducedMotion:'reduce'});
    for (const asset of ['trace.json','map-base.png','poster.png']) {
      await run(locale,`blocked-${asset}`,async page => {
        await page.route(`**/world/${asset}`,route=>route.abort());
        await open(page,locale);
        const observed = await page.evaluate(()=>{
          const root=document.querySelector('[data-world]');const poster=document.querySelector('.world__poster');
          const canvas=document.querySelector('canvas');const style=getComputedStyle(poster);
          return {ready:root.hasAttribute('data-ready'),failed:root.hasAttribute('data-failed'),posterLoaded:poster.naturalWidth>0,posterVisible:style.display!=='none'&&style.visibility!=='hidden'&&style.opacity!=='0',storyCount:document.querySelectorAll('.world-story__steps li').length,bodyText:document.body.innerText.length,canvasPixels:canvas?.getContext('2d').getImageData(200,150,1,1).data[3]||0,controlsHidden:document.querySelector('[data-controls]').hidden};
        });
        return {pass:observed.storyCount===3&&(asset==='poster.png'?observed.ready&&observed.canvasPixels>0&&observed.bodyText>300:observed.failed&&observed.posterLoaded&&observed.posterVisible&&observed.controlsHidden&&observed.bodyText>300),...observed};
      });
    }
    await run(locale,'blocked-fonts',async page => {
      let blocked=0; await page.route(/\.(woff2?|ttf|otf)(\?|$)/,route=>{blocked++;return route.abort();});
      await open(page,locale);
      return await page.evaluate(blocked=>({pass:blocked>0&&document.documentElement.scrollWidth<=innerWidth&&document.querySelector('h1').getBoundingClientRect().height>0,blocked,overflow:document.documentElement.scrollWidth>innerWidth,fontFamily:getComputedStyle(document.querySelector('h1')).fontFamily,heading:document.querySelector('h1').innerText}),blocked);
    });
    await run(locale,'home-world-isolation',async page => {
      const requests=[];page.on('request',req=>requests.push(req.url()));
      await page.goto(`${base}/${locale}/`,{waitUntil:'networkidle'});
      const worldRequests=requests.filter(url=>/\/world\/|\/world(?:-model)?\.js/.test(url));
      return {pass:worldRequests.length===0,worldRequests,totalRequests:requests.length};
    });
    await run(locale,'visibility-pause-handler',async page => {
      await open(page,locale);await page.waitForSelector('[data-world][data-ready]');
      await page.locator('[data-play]').click();await page.waitForTimeout(150);
      await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
      const at=await page.locator('[data-seek]').inputValue();await page.waitForTimeout(200);const after=await page.locator('[data-seek]').inputValue();
      const label=await page.locator('[data-play-label]').textContent();
      return {pass:at===after&&label!==(locale==='en'?'Pause':'暂停'),at,after,label,limitation:'Synthetic document.hidden + visibilitychange checks handler; actual OS tab-background lifecycle was not exercised.'};
    });
  }
} finally { await browser.close(); }
await fs.writeFile('/tmp/leochai-world-review/supplemental.json',JSON.stringify({base,checkedAt:new Date().toISOString(),limitations:['Font checks verify blocked requests, visible heading geometry and absence of horizontal overflow; visual glyph quality is not assessed.','Visibility uses a synthetic hidden property/event, not OS background-tab lifecycle.'],results},null,2));
console.log(JSON.stringify(results,null,2));
