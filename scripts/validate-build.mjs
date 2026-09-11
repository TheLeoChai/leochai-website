import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseHTML, DOMParser } from 'linkedom';
import routes from '../content/_data/routes.js';
import metadata from '../content/_data/metadata.js';
import { feeds, feedArticles } from '../lib/feeds.js';

const absolute = path => new URL(path, metadata.base).href;
const outputFile = (directory, path) => join(directory, path, path.endsWith('/') ? 'index.html' : '');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}

export async function validateBuild(directory, prefix = '/') {
  for (const route of routes.pages) {
    const { document } = parseHTML(await readFile(outputFile(directory, route.path), 'utf8'));
    assert.equal(document.documentElement.lang, route.lang, `${route.path}: language`);
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), absolute(route.canonical), `${route.path}: canonical`);
    assert.equal(document.querySelector('link[type="application/atom+xml"]')?.getAttribute('href'), `${prefix}${route.locale}/rss.xml`, `${route.path}: locale feed discovery`);
    assert.equal(document.querySelector('meta[name="description"]')?.content, route.description);
    if (route.locale === 'zh') assert.equal(document.querySelector('meta[name="translation-source-revision"]')?.content, route.sourceRevision);
    const alternates = [...document.querySelectorAll('link[hreflang]')].map(link => [link.hreflang, link.getAttribute('href')]);
    assert.deepEqual(alternates, route.alternates.map(item => [item.lang, absolute(item.path)]));
    assert(document.querySelector('main h1'), `${route.path}: static heading`);
    for (const anchor of route.anchors) assert(document.getElementById(anchor), `${route.path}: missing #${anchor}`);
    for (const link of document.querySelectorAll('nav a')) {
      const href = link.getAttribute('href');
      if (href.startsWith(prefix + 'en/') || href.startsWith(prefix + 'zh/')) assert(href.startsWith(`${prefix}${route.locale}/`), `${route.path}: locale navigation`);
    }
  }
  for (const alias of routes.aliases) {
    const { document } = parseHTML(await readFile(outputFile(directory, alias.path), 'utf8'));
    assert.equal(document.querySelector('[name="robots"]')?.content, 'noindex');
    assert.equal(document.querySelector('[rel="canonical"]')?.getAttribute('href'), absolute(alias.target));
    assert.equal(document.querySelector('#destination')?.getAttribute('href'), prefix + alias.target.slice(1));
    assert.equal(document.querySelector('[http-equiv="refresh"]')?.content.replace(/;\s*/g, ';'), `0;url=${prefix}${alias.target.slice(1)}`);
  }
  const sitemap = await readFile(join(directory, 'sitemap.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations, routes.canonical.map(route => absolute(route.canonical)));
  assert.equal(new Set(locations).size, locations.length);
  assert(!locations.includes(absolute('/en/')));
  await stat(join(directory, '.nojekyll'));
  for (const feed of feeds) {
    const xml = new DOMParser().parseFromString(await readFile(join(directory, feed.locale, 'rss.xml'), 'utf8'), 'text/xml');
    const root = xml.documentElement;
    assert.equal(root.localName, 'feed');
    assert.equal(root.getAttribute('xmlns'), 'http://www.w3.org/2005/Atom');
    assert.equal(root.getAttribute('xml:lang'), feed.language);
    assert.equal(root.querySelector('link[rel="self"]')?.getAttribute('href'), absolute(`/${feed.locale}/rss.xml`));
    assert.equal(root.querySelector('id')?.textContent, absolute(`/${feed.locale}/notes/`));
    assert(!Number.isNaN(Date.parse(root.querySelector('updated')?.textContent)), 'Feed updated date required even when empty');
    const expected = feedArticles(routes, feed.locale, metadata.base).reverse();
    const entries = [...root.querySelectorAll('entry')];
    assert.equal(entries.length, expected.length, `${feed.locale}: published article feed count`);
    entries.forEach((entry, index) => {
      assert.equal(entry.querySelector('id')?.textContent, expected[index].url);
      assert.equal(entry.querySelector('link')?.getAttribute('href'), expected[index].url);
      assert.equal(entry.querySelector('title')?.textContent, expected[index].data.title);
      assert.equal(entry.querySelector('content')?.textContent, expected[index].content);
    });
  }
  const publicFiles = await files(directory);
  for (const file of publicFiles) assert(!relative(directory, file).split('/').some(part => part.toLowerCase() === 'owner'), `${file}: owner tools must stay outside public output`);
  // Check rendered HTML, never template-source copies. This catches broken
  // prefix paths and missing local files without a network or a running NAS.
  for (const file of publicFiles.filter(file => file.endsWith('.html'))) {
    const { document } = parseHTML(await readFile(file, 'utf8'));
    for (const node of document.querySelectorAll('[href], [src]')) {
      const value = node.getAttribute('href') ?? node.getAttribute('src');
      const url = new URL(value, metadata.base);
      assert(!decodeURIComponent(url.pathname).split('/').some(part => part.toLowerCase() === 'owner'), `${file}: public link to private owner tools`);
      if (!value.startsWith('/') || value.startsWith('//')) continue;
      assert(value.startsWith(prefix), `${file}: prefix missing on ${value}`);
      const local = new URL(value, metadata.base);
      const path = '/' + local.pathname.slice(prefix.length);
      const destination = outputFile(directory, path);
      await stat(destination).catch(() => assert.fail(`${file}: missing target ${value}`));
      if (local.hash && destination.endsWith('.html')) {
        const target = parseHTML(await readFile(destination, 'utf8')).document;
        assert(target.getElementById(decodeURIComponent(local.hash.slice(1))), `${file}: missing fragment ${value}`);
      }
    }
  }
  const root = parseHTML(await readFile(join(directory, 'index.html'), 'utf8')).document;
  const english = parseHTML(await readFile(join(directory, 'en/index.html'), 'utf8')).document;
  assert.equal(root.body.innerHTML, english.body.innerHTML, 'Root and /en/ must render identical Home content');
  console.log(`Validated ${routes.pages.length} pages, ${routes.aliases.length} aliases at ${prefix}`);
}
