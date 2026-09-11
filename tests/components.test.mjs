import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import stylelint from 'stylelint';
import { proofState, evidenceRows } from '../lib/evidence.js';
import { stateAt, validateTimeline, createRegistry } from '../assets/js/timeline-model.js';
const model = { id: 'test', title: 'Sample', duration: 2000, steps: [
  { at: 0, title: 'Start', body: 'Observations', items: [{ id: 'a', label: 'A', detail: 'Pending', status: 'pending' }] },
  { at: 1000, title: 'Keep conflict', body: 'Uncertainty retained', items: [{ id: 'b', label: 'B', detail: 'Conflict', status: 'uncertain' }] },
  { at: 2000, title: 'Result', body: 'Finished', items: [{ id: 'a', label: 'A', detail: 'Complete', status: 'complete' }] }
] };
test('timeline seeks are complete and path-independent at boundaries and backwards', () => {
  validateTimeline(model);
  const before = JSON.stringify(model);
  assert.equal(stateAt(model, -1).stepIndex, 0);
  assert.equal(stateAt(model, 999).stepIndex, 0);
  assert.equal(stateAt(model, 1000).stepIndex, 1);
  assert.equal(stateAt(model, 5000).progress, 1);
  stateAt(model, 2000);
  assert.deepEqual(stateAt(model, 1000).frame.items.map(item => item.id), ['b']);
  assert.deepEqual(stateAt(model, 0).frame.items, model.steps[0].items);
  assert.equal(JSON.stringify(model), before);
  assert.throws(() => validateTimeline({ ...model, steps: model.steps.toReversed() }), /time order|initial/);
  assert.throws(() => validateTimeline({ ...model, steps: model.steps.slice(0, 2) }), /final/);
});
test('central registry pauses another player and stale release does not forget current player', () => {
  const registry = createRegistry(); const calls = [];
  const a = { pause: () => calls.push('a') }, b = { pause: () => calls.push('b') }, c = { pause() {} };
  registry.activate(a); registry.activate(b); registry.release(a); registry.activate(c);
  assert.deepEqual(calls, ['a', 'b']);
});
test('execution metadata gate rejects synthetic recordings and replay LIVE labels', () => {
  assert.equal(proofState({ state: 'LIVE', committed: true, origin: 'capture', runId: 'r1', lastEventAt: '2026-09-11T00:00:00Z' }).state, 'UNKNOWN');
  assert.equal(proofState({ state: 'RECORDED', origin: 'illustration', capturedAt: '2026-09-11T00:00:00Z', revision: 'a' }).state, 'UNKNOWN');
  assert.equal(proofState({ state: 'LIVE', origin: 'live', committed: true, lifecycle: 'active', runId: 'r1', lastEventAt: '2026-09-11T00:00:00Z', lastHeartbeatAt: '2026-09-11T00:00:00Z' }, 'en', { now: Date.parse('2026-09-11T00:00:01Z') }).state, 'LIVE');
  assert.equal(proofState({ state: 'RECORDED', origin: 'capture', capturedAt: '2026-09-11T00:00:00Z', revision: 'a' }).state, 'RECORDED');
  assert.equal(evidenceRows({}).rows.filter(row => row.value === 'Not supplied').length, 9);
});
test('stylelint rejects color escapes and invented tokens, permits approved usage', async () => {
  for (const code of ['a{color:red}', 'a{color:#fff}', 'a{color:rgb(1 2 3)}', 'a{--custom:4px}', 'a{color:var(--custom)}', 'a{box-shadow:0 2px 8px var(--ink)}']) {
    const result = await stylelint.lint({ code, codeFilename: 'assets/css/test.css', configFile: 'stylelint.config.mjs' });
    assert(result.errored, code);
  }
  assert.equal((await stylelint.lint({ code: 'a{color:var(--ink);box-shadow:var(--elevation)}', codeFilename: 'assets/css/test.css', configFile: 'stylelint.config.mjs' })).errored, false);
});
test('player and deterministic model stay within the measured 3 KB gzip budget', async () => {
  const bytes = (await Promise.all(['timeline.js', 'timeline-model.js'].map(async name => gzipSync(await readFile(new URL(`../assets/js/${name}`, import.meta.url))).length))).reduce((a, b) => a + b);
  assert(bytes <= 3072, `Player compressed bytes ${bytes} > 3072`);
});

test('Replay during playback keeps one clock; seek, reduced motion, and destroy preserve static content', async () => {
  const { parseHTML } = await import('linkedom');
  const { enhanceTimeline } = await import('../assets/js/timeline.js');
  const { window } = parseHTML(`<section><script data-timeline-model type="application/json">${JSON.stringify(model)}</script><div data-controls hidden><button data-play></button><button data-pause></button><button data-replay></button><input data-scrub></div><p data-status></p><strong data-frame-title></strong><p data-frame-body></p><ul data-frame-items></ul></section>`);
  const previousDocument = globalThis.document, previousEvent = globalThis.CustomEvent;
  globalThis.document = window.document; globalThis.CustomEvent = window.CustomEvent;
  try {
    let now = 0, next = 0; const pending = new Map(); const changes = new Set();
    const motion = { matches: false, addEventListener: (_, listener) => changes.add(listener), removeEventListener: (_, listener) => changes.delete(listener) };
    const root = window.document.querySelector('section');
    const player = enhanceTimeline(root, { clock: () => now, request: callback => { pending.set(++next, callback); return next; }, cancel: id => pending.delete(id), motion });
    assert.equal(root.querySelector('[data-frame-title]').textContent, 'Result');
    assert.equal(pending.size, 0, 'initial frame must not autoplay');
    player.play(); assert.equal(pending.size, 1);
    root.querySelector('[data-replay]').click(); assert.equal(pending.size, 1, 'Replay must cancel the prior clock');
    const [[id, callback]] = pending; pending.delete(id); now = 1000; callback(now);
    assert.equal(root.querySelector('[data-frame-title]').textContent, 'Keep conflict');
    assert.equal(root.querySelector('[data-status]').textContent, 'Keep conflict');
    player.seek(0); assert.equal(pending.size, 0);
    assert.equal(root.querySelector('[data-frame-items]').children[0].dataset.item, 'a');
    assert.match(root.querySelector('[data-scrub]').getAttribute('aria-valuetext'), /1 \/ 3: Start/);
    player.play(); motion.matches = true; for (const listener of changes) listener();
    assert.equal(pending.size, 0); assert.equal(root.querySelector('[data-controls]').hidden, true);
    assert.equal(root.querySelector('[data-frame-title]').textContent, 'Result');
    motion.matches = false; for (const listener of changes) listener();
    player.destroy(); root.querySelector('[data-play]').click();
    assert.equal(pending.size, 0); assert.equal(changes.size, 0);
  } finally { globalThis.document = previousDocument; globalThis.CustomEvent = previousEvent; }
});

test('timeline HTML exposes all intermediate content and script JSON round-trips hostile labels', async () => {
  const { default: nunjucks } = await import('nunjucks');
  const { parseHTML } = await import('linkedom');
  const { jsonScript } = await import('../lib/serialization.js');
  const { checkGlyphs } = await import('../scripts/validate-fonts.mjs');
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('content/_includes'), { autoescape: true });
  env.addFilter('timelineModel', validateTimeline); env.addFilter('jsonScript', jsonScript);
  const input = structuredClone(model);
  input.steps[1].items[0].detail = 'Intermediate ǅ </script><img src=x> & "quote"';
  const rendered = env.renderString('{% from "components/timeline.njk" import timeline %}{{ timeline(input) }}', { input });
  const { document } = parseHTML(`<html><body>${rendered}</body></html>`);
  assert.equal(document.querySelectorAll('script').length, 1);
  assert.equal(document.querySelectorAll('img').length, 0);
  assert.deepEqual(JSON.parse(document.querySelector('script').textContent), input);
  document.querySelector('script').remove();
  assert(document.body.textContent.includes(input.steps[1].items[0].detail), 'Intermediate details belong in numbered static steps');
  const { faces } = JSON.parse(await readFile('assets/fonts/manifest.json', 'utf8'));
  assert.throws(() => checkGlyphs(document.body.textContent, faces[1], 'Intermediate frame'), /missing glyphs.*ǅ/);
});

test('locked palette rejects changed, missing, and duplicate values and verifies text teal contrast', async () => {
  const css = await readFile('assets/css/tokens.css', 'utf8');
  for (const code of [css.replace('#39C5BB', '#40C5BB'), css.replace('  --accent: #39C5BB;\n', ''), css.replace('--accent: #39C5BB;', '--accent: #39C5BB; --accent: #39C5BB;')]) {
    const result = await stylelint.lint({ code, codeFilename: 'assets/css/tokens.css', configFile: 'stylelint.config.mjs' });
    assert(result.errored, 'Changed palette must fail the actual build rule');
  }
  const { contrastRatio } = await import('../scripts/validate-design.mjs');
  const { expected } = await import('../scripts/stylelint-tokens.mjs');
  assert(contrastRatio(expected.get('--accent-ink'), expected.get('--canvas')) >= 4.5);
});
