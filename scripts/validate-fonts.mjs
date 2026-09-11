import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseHTML } from 'linkedom';

const hash = data => createHash('sha256').update(data).digest('hex');
// Only these scripts use deliberate system fallback in iteration 1. Latin and
// all other text must be represented by the actual font cmap, never guessed.
const systemCharacter = character => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(character)
  || (character.codePointAt(0) >= 0x3000 && character.codePointAt(0) <= 0x303f)
  || (character.codePointAt(0) >= 0xff00 && character.codePointAt(0) <= 0xffef);
export function checkGlyphs(text, face, label) {
  const cmap = new Set(face.codepoints);
  const missing = [...new Set([...text.normalize('NFC')].filter(character => !/\s/u.test(character) && !systemCharacter(character) && !cmap.has(character.codePointAt(0))))];
  assert.equal(missing.length, 0, `${label}: missing glyphs in ${face.family}: ${missing.map(c => `U+${c.codePointAt(0).toString(16).toUpperCase()} (${c})`).join(', ')}`);
}
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() && entry.name !== '_includes' ? htmlFiles(join(directory, entry.name)) : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []))).flat();
}
export async function validateFonts(directory) {
  const { faces, cssSha256 } = JSON.parse(await readFile(join(directory, 'fonts/manifest.json'), 'utf8'));
  const dynamic = JSON.parse(await readFile(join(directory, 'fonts/dynamic-text.json'), 'utf8'));
  const css = await readFile(join(directory, 'css/fonts.css'), 'utf8');
  assert.equal(hash(css), cssSha256, 'Font CSS must match generated cmap manifest');
  for (const face of faces) {
    const bytes = await readFile(join(directory, 'fonts', face.output));
    assert.equal(bytes.length, face.bytes, `${face.family}: font byte size`);
    assert.equal(hash(bytes), face.sha256, `${face.family}: regenerate manifest after font changes`);
    assert(css.includes(`../fonts/${face.output}`), 'Font URL must work at both path prefixes');
  }
  const [display, body] = faces;
  assert.equal(display.family, 'Newsreader');
  assert.equal(body.family, 'Source Sans 3');
  const total = faces.reduce((sum, face) => sum + face.bytes, 0);
  assert(total <= 100_000, `Font budget exceeded: ${total} > 100000 bytes`);
  const report = [];
  const paths = new Set();
  for (const file of await htmlFiles(directory)) {
    const path = '/' + relative(directory, file).replace(/index\.html$/, '');
    paths.add(path);
    const { document } = parseHTML(await readFile(file, 'utf8'));
    assert(!document.querySelector('link[rel="preload"][as="font"]'), `${path}: no blanket font preload`);
    for (const node of document.querySelectorAll('script, style')) node.remove();
    checkGlyphs(document.body.textContent, body, path);
    for (const heading of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      if (!heading.closest('[lang]')?.getAttribute('lang')?.startsWith('zh')) checkGlyphs(heading.textContent, display, `${path} heading`);
    }
    for (const node of document.querySelectorAll('[aria-label],[title],[placeholder],[alt]')) {
      for (const name of ['aria-label', 'title', 'placeholder', 'alt']) checkGlyphs(node.getAttribute(name) ?? '', body, path);
    }
    for (const item of dynamic.routes[path] ?? []) {
      assert(['display', 'body'].includes(item.role) && typeof item.text === 'string', `${path}: invalid dynamic text entry`);
      checkGlyphs(item.text, item.role === 'display' ? display : body, `${path} dynamic`);
    }
    const styled = Boolean(document.querySelector('link[href$="/css/fonts.css"]'));
    const systemOnly = document.documentElement.lang.startsWith('zh');
    // Conservative bound: charge both Latin faces to every English styled
    // route regardless of cache or current text. Chinese has system-only CSS.
    report.push({ route: path, fontBytesUpperBound: styled && !systemOnly ? total : 0, budgetBytes: 100_000 });
  }
  for (const path of Object.keys(dynamic.routes)) assert(paths.has(path), `Unknown dynamic text route: ${path}`);
  await writeFile(join(directory, 'fonts/route-bytes.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Fonts: ${total} bytes maximum per English route; Chinese system stack: 0 bytes; ${report.length} routes checked`);
}
