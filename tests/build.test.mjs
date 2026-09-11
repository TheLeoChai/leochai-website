import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRoutes } from '../lib/routes.js';

const sources = Object.fromEntries(await Promise.all(['en', 'zh'].map(async locale => [locale, JSON.parse(await readFile(new URL(`../content/${locale}/pages.json`, import.meta.url), 'utf8'))])));
test('untranslated article has English route and legacy alias, no false Chinese alternate', () => {
  const fixture = structuredClone(sources);
  fixture.en.push({ key: 'article-test', kind: 'article', slug: 'article-test', title: 'Test article', description: 'Test fixture', revision: 'test-1', body: 'Test only' });
  const routes = createRoutes(fixture);
  assert(routes.pages.some(page => page.path === '/en/notes/article-test/'));
  assert(!routes.pages.some(page => page.path === '/zh/notes/article-test/'));
  assert.equal(routes.untranslated[0].key, 'article-test');
  assert.deepEqual(routes.untranslated[0].alternates.map(item => item.lang), ['en']);
  assert(routes.aliases.some(alias => alias.path === '/notes/article-test/'));
  fixture.zh.push({ ...fixture.en.at(-1), sourceRevision: 'test-1', title: '测试文章' });
  const translated = createRoutes(fixture);
  assert(translated.pages.some(page => page.path === '/zh/notes/article-test/'));
  assert.equal(translated.untranslated.length, 0);
});

test('missing core translation and mismatched source revision fail explicitly', () => {
  const fixture = structuredClone(sources);
  fixture.zh.pop();
  assert.throws(() => createRoutes(fixture), /Expected one zh\/notes/);
  fixture.zh = structuredClone(sources.zh);
  fixture.zh[0].sourceRevision = 'stale';
  assert.throws(() => createRoutes(fixture), /revision mismatch/);
});

test('validation failure preserves output; successful promotion preserves existing CNAME', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'leochai-build-test-'));
  try {
    const root = new URL('../', import.meta.url);
    for (const name of ['content', 'assets', 'lib', 'scripts', 'eleventy.config.js', 'package.json']) await cp(new URL(name, root), join(directory, name), { recursive: true });
    await symlink(new URL('node_modules', root).pathname, join(directory, 'node_modules'), 'dir');
    await mkdir(join(directory, 'site'));
    await writeFile(join(directory, 'site/index.html'), 'old site survives');
    await writeFile(join(directory, 'site/CNAME'), 'leochai.com\n');
    const template = join(directory, 'content/_includes/core.njk');
    const original = await readFile(template, 'utf8');
    await writeFile(template, original.replace('<h1>', '<p>').replace('</h1>', '</p>'));
    const failed = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: directory, encoding: 'utf8' });
    assert.notEqual(failed.status, 0);
    assert.match(failed.stderr, /static heading/);
    assert.equal(await readFile(join(directory, 'site/index.html'), 'utf8'), 'old site survives');
    await writeFile(template, original);
    const passed = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: directory, encoding: 'utf8' });
    assert.equal(passed.status, 0, passed.stderr);
    assert.equal(await readFile(join(directory, 'site/CNAME'), 'utf8'), 'leochai.com\n');
    assert.match(await readFile(join(directory, 'site/index.html'), 'utf8'), /<h1>/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
