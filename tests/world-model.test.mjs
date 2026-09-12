import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createWorldModel } from '../assets/js/world-model.js';

const trace = JSON.parse(await readFile(new URL('../assets/world/trace.json', import.meta.url), 'utf8'));
// Independently supplied anchor fixture: art may move anchors without changing
// event truth. Integration uses the baked scene.json rather than these points.
const scene = { anchors: {
  'bed-01': { x: 240, y: 176 }, well: { x: 192, y: 176 },
  workbench: { x: 176, y: 144 }, kitchen: { x: 320, y: 160 },
  'herb-pickup': { x: 256, y: 176 }, table: { x: 304, y: 224 },
  'table-maker': { x: 280, y: 224 }, 'table-gardener': { x: 304, y: 248 }
} };

test('completed poster shows the connected garden, repair and meal outcomes', () => {
  const model = createWorldModel(trace, scene);
  const final = model.stateAt(model.posterTime);
  assert.equal(final.event.id, 'afternoon-complete');
  assert.deepEqual(final.entities['bed-01'], { watered: true, herbs: false });
  assert.deepEqual(final.entities.stool, { repaired: true, placed: true });
  assert.deepEqual(final.entities.table, { served: true, gathered: true });
  assert.equal(final.actors.cook.moving, false);
  assert.deepEqual(final.actors.cook.position, scene.anchors.table);
  assert.equal(model.provenance.kind, 'illustration');
  assert.equal(model.provenance.capture, null);
  assert.equal(model.stills.at(-1).event, final.event.id);
});

test('empty-can rejection preserves state; refill permits the illustrated watering', () => {
  const model = createWorldModel(trace, scene);
  const rejected = model.stateAt(2000);
  assert.equal(rejected.event.outcome, 'rejected');
  assert.deepEqual(rejected.entities, model.stateAt(1999).entities);
  assert.equal(model.stateAt(8999).entities.can.water, 0);
  assert.equal(model.stateAt(9000).entities.can.water, 1);
  assert.equal(model.stateAt(14999).entities['bed-01'].watered, false);
  assert.equal(model.stateAt(15000).entities['bed-01'].watered, true);
  assert.equal(model.stateAt(15000).entities.can.water, 0);
});

test('direct seeking equals full stepped playback, including backward seeks', () => {
  const direct = createWorldModel(trace, scene);
  const playing = createWorldModel(trace, scene);
  // Visit every 16ms frame, not just the event boundaries.
  for (let t = 0; t <= playing.duration; t += 16) {
    assert.deepEqual(playing.stateAt(t), direct.stateAt(t));
  }
  for (const t of [...direct.eventTimes].reverse()) assert.deepEqual(playing.stateAt(t), direct.stateAt(t));
  assert.deepEqual(playing.stateAt(6000).actors.gardener.position, { x: 216, y: 176 });
  assert.equal(playing.stateAt(6000).actors.gardener.moving, true);
  assert.equal(playing.stateAt(8000).actors.gardener.moving, false);
  assert.equal(playing.stateAt(6000.5).time, 6000.5);
});

test('inputs, public metadata and previous returned frames cannot mutate future frames', () => {
  const input = structuredClone(trace);
  const anchors = structuredClone(scene);
  const model = createWorldModel(input, anchors);
  const expected = model.stateAt(9000);
  input.events[2].changes[0].to = 99;
  anchors.anchors.well.x = 999;
  const frame = model.stateAt(9000);
  frame.entities.can.water = 99;
  frame.actors.gardener.position.x = 999;
  frame.event.caption.en = '<script>unexpected</script>';
  model.events[2].caption.en = 'changed';
  model.stills[0].body.en = 'changed';
  assert.deepEqual(model.stateAt(9000), expected);
  assert.equal(trace.entities.can.initial.water, 0);
});

test('finite times clamp; non-finite input is rejected rather than hiding caller errors', () => {
  const model = createWorldModel(trace, scene);
  assert.deepEqual(model.stateAt(-1), model.stateAt(0));
  assert.deepEqual(model.stateAt(90000), model.stateAt(40000));
  for (const time of [NaN, Infinity, -Infinity, '1000', undefined]) assert.throws(() => model.stateAt(time), /finite milliseconds/);
});

test('invalid trace provenance, references, ordering and changes are rejected', () => {
  const invalid = [
    t => { t.provenance.kind = 'recorded'; },
    t => { t.provenance.capture = { id: 'made-up' }; },
    t => { t.posterTime = 0; },
    t => { t.events[1].at = 0; },
    t => { t.events[1].at = 1.5; },
    t => { t.events[1].at = -1; },
    t => { t.events[1].seq = 0; },
    t => { t.events[1].id = t.events[0].id; },
    t => { t.events[1].target = 'missing'; },
    t => { t.events[1].actor = 'missing'; },
    t => { t.events[1].observation.actor = 'cook'; },
    t => { t.events[1].observation.id = t.events[0].observation.id; },
    t => { t.events[1].caption.zh = ''; },
    t => { t.events[1].changes = [{ target: 'can', field: 'water', from: 0, to: 1 }]; },
    t => { t.events[2].changes[0].target = 'missing'; },
    t => { t.events[2].changes[0].field = '__proto__'; },
    t => { t.events[2].changes[0].from = 1; },
    t => { t.events[2].changes[0].to = 'one'; },
    t => { t.presentation.routes.cook[1].anchor = 'missing'; },
    t => { t.presentation.routes.cook[1].at = 0; },
    t => { t.stills[0].event = 'missing'; },
    t => { t.actors.cook.fictionalAdult = false; }
  ];
  for (const mutate of invalid) {
    const input = structuredClone(trace);
    mutate(input);
    assert.throws(() => createWorldModel(input, scene), /Invalid world fixture/, mutate.toString());
  }
});

test('display text is retained as plain data, never interpreted as HTML', () => {
  const input = structuredClone(trace);
  input.events[0].caption.en = '<img src=x onerror=alert(1)>';
  assert.equal(createWorldModel(input, scene).stateAt(0).event.caption.en, input.events[0].caption.en);
});

test('presentation anchors must be finite; relocating art does not alter event truth', () => {
  const moved = structuredClone(scene);
  moved.anchors.well.x += 10;
  const original = createWorldModel(trace, scene).stateAt(9000);
  const relocated = createWorldModel(trace, moved).stateAt(9000);
  assert.equal(relocated.actors.gardener.position.x, original.actors.gardener.position.x + 10);
  assert.deepEqual(relocated.entities, original.entities);
  assert.deepEqual(relocated.event, original.event);
  moved.anchors.well.x = Infinity;
  assert.throws(() => createWorldModel(trace, moved), /route time or anchor/);
});
