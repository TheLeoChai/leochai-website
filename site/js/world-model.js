// A small reader for an authored illustration, not a simulation or capture loader.
// Time is milliseconds. Routes describe presentation; event changes describe
// the fixture's visible objects. All returned state is detached from the model.
const copy = value => structuredClone(value);
const fail = message => { throw new Error(`Invalid world fixture: ${message}`); };
const id = value => typeof value === 'string' && /^[a-z][a-z0-9-]*$/.test(value);
const integer = value => Number.isSafeInteger(value) && value >= 0;
const text = value => value && typeof value.en === 'string' && value.en.length && typeof value.zh === 'string' && value.zh.length;
const scalar = value => typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value));

export function createWorldModel(input, sceneInput) {
  const trace = copy(input);
  const scene = copy(sceneInput);
  if (!trace || trace.version !== 1 || !id(trace.id) || !integer(trace.duration) || !trace.duration || trace.posterTime !== trace.duration) fail('version, ID, duration or completed poster time');
  if (trace.provenance?.kind !== 'illustration' || trace.provenance?.source !== 'bundled-fixture' || !id(trace.provenance.revision) || trace.provenance.capture !== null) fail('illustrations require explicit bundled provenance and no capture');
  if (!scene?.anchors || !trace.actors || !trace.entities || !Array.isArray(trace.events) || !trace.events.length) fail('missing scene, actors, entities or events');
  const actors = Object.keys(trace.actors);
  const entities = Object.keys(trace.entities);
  if (!actors.length || !entities.length || new Set([...actors, ...entities]).size !== actors.length + entities.length) fail('unique actor and entity IDs required');
  const values = {};
  for (const key of [...actors, ...entities]) {
    if (!id(key)) fail('unsafe object ID');
    const item = trace.actors[key] ?? trace.entities[key];
    if (!text(item.label) || !item.initial || !Object.keys(item.initial).length) fail(`label or initial state for ${key}`);
    for (const [field, value] of Object.entries(item.initial)) {
      if (!id(field) || !scalar(value)) fail(`scalar state field for ${key}`);
    }
    values[key] = copy(item.initial);
  }
  for (const actor of actors) {
    if (trace.actors[actor].fictionalAdult !== true) fail('actors must be fictional adults');
    const route = trace.presentation?.routes?.[actor];
    if (trace.presentation?.kind !== 'authored-routes' || !Array.isArray(route) || !route.length || route[0].at !== 0 || route.at(-1).at !== trace.duration) fail(`complete authored route for ${actor}`);
    let previous = -1;
    for (const point of route) {
      const anchor = scene.anchors[point.anchor];
      if (!integer(point.at) || point.at <= previous || point.at > trace.duration || !id(point.anchor) || !anchor || !Number.isFinite(anchor.x) || !Number.isFinite(anchor.y)) fail(`route time or anchor for ${actor}`);
      previous = point.at;
    }
  }
  const eventIds = new Set();
  const observationIds = new Set();
  const snapshots = [];
  const latest = {};
  let previousTime = -1;
  for (const [index, event] of trace.events.entries()) {
    if (!id(event.id) || eventIds.has(event.id) || event.seq !== index || !integer(event.at) || event.at <= previousTime || event.at > trace.duration) fail('event IDs, sequence or timestamps');
    if (!actors.includes(event.actor) || !entities.includes(event.target) || !['observe', 'water', 'refill', 'repair', 'harvest', 'prepare', 'place', 'serve', 'gather'].includes(event.action)) fail('event actor, target or action');
    if (!['accepted', 'rejected', 'illustrated'].includes(event.outcome) || !text(event.caption) || !text(event.observation?.text) || !id(event.observation?.id) || observationIds.has(event.observation.id) || event.observation.actor !== event.actor) fail('event caption or observation');
    if (!Array.isArray(event.changes) || (event.outcome === 'rejected' && event.changes.length)) fail('rejected actions cannot change world objects');
    for (const change of event.changes) {
      if (!Object.hasOwn(values, change.target) || !Object.hasOwn(values[change.target], change.field) || !scalar(change.to) || typeof change.to !== typeof values[change.target][change.field] || values[change.target][change.field] !== change.from) fail('state change target, field, type or prior value');
      values[change.target][change.field] = change.to;
    }
    latest[event.actor] = event.id;
    snapshots.push({ values: copy(values), latest: copy(latest) });
    eventIds.add(event.id);
    observationIds.add(event.observation.id);
    previousTime = event.at;
  }
  if (trace.events[0].at !== 0 || trace.events.at(-1).at !== trace.duration) fail('initial and completed events required');
  if (!Array.isArray(trace.stills) || !trace.stills.length || trace.stills.some(still => !eventIds.has(still.event) || !text(still.title) || !text(still.body))) fail('numbered still event references and bilingual text');

  function stateAt(time) {
    if (!Number.isFinite(time)) throw new TypeError('World time must be finite milliseconds');
    const t = Math.max(0, Math.min(trace.duration, time));
    let eventIndex = 0;
    while (eventIndex + 1 < trace.events.length && trace.events[eventIndex + 1].at <= t) eventIndex++;
    const snapshot = snapshots[eventIndex];
    const actorStates = {};
    for (const actor of actors) {
      const route = trace.presentation.routes[actor];
      let index = 0;
      while (index + 1 < route.length && route[index + 1].at <= t) index++;
      const start = route[index];
      const end = route[index + 1] ?? start;
      const a = scene.anchors[start.anchor];
      const b = scene.anchors[end.anchor];
      const fraction = end.at === start.at ? 0 : (t - start.at) / (end.at - start.at);
      actorStates[actor] = {
        ...copy(snapshot.values[actor]),
        position: { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction },
        moving: end.at > start.at && (a.x !== b.x || a.y !== b.y),
        anchor: start.anchor,
        latestEventId: snapshot.latest[actor] ?? null
      };
    }
    return {
      time: t, progress: t / trace.duration, eventIndex,
      event: copy(trace.events[eventIndex]),
      actors: actorStates,
      entities: Object.fromEntries(entities.map(entity => [entity, copy(snapshot.values[entity])]))
    };
  }
  return Object.freeze({
    duration: trace.duration,
    posterTime: trace.posterTime,
    eventTimes: Object.freeze(trace.events.map(event => event.at)),
    get events() { return copy(trace.events); },
    get stills() { return copy(trace.stills); },
    get provenance() { return copy(trace.provenance); },
    stateAt
  });
}
