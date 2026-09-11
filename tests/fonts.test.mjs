import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, cp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkGlyphs, validateFonts } from '../scripts/validate-fonts.mjs';

const { faces } = JSON.parse(await readFile(new URL('../assets/fonts/manifest.json', import.meta.url)));
test('Latin text, punctuation and combining accents are covered; CJK intentionally falls back', () => {
  for (const face of faces) {
    checkGlyphs('Leo Chai — “Résumé” · 400–600 中文。', face, 'fixture');
    assert.throws(() => checkGlyphs('Missing Ǎ', face, 'fixture'), /missing glyphs.*U\+1CD/);
  }
});
test('dynamic strings and corrupt font assets fail build validation', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'leochai-font-test-'));
  try {
    await cp(new URL('../assets/', import.meta.url), directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), '<html lang="en"><head></head><body><h1>Leo Chai</h1></body></html>');
    await writeFile(join(directory, 'fonts/dynamic-text.json'), JSON.stringify({ routes: { '/': [{ role: 'display', text: 'Missing Ǎ' }] } }));
    await assert.rejects(validateFonts(directory), /dynamic: missing glyphs/);
    await writeFile(join(directory, 'fonts/dynamic-text.json'), '{"routes":{}}');
    await writeFile(join(directory, 'fonts', faces[0].output), 'invalid font');
    await assert.rejects(validateFonts(directory), /font byte size/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
