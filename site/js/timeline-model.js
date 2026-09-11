export function validateTimeline(model) {
  if (!model || !/^[a-z][a-z0-9-]*$/.test(model.id) || !model.title || !Number.isFinite(model.duration) || model.duration <= 0 || !Array.isArray(model.steps) || !model.steps.length) throw new Error('Invalid timeline model');
  let previous = -1;
  for (const step of model.steps) {
    if (!Number.isFinite(step.at) || step.at <= previous || step.at > model.duration || !step.title || typeof step.body !== 'string' || !Array.isArray(step.items)) throw new Error('Every timeline step needs a complete frame in time order');
    const ids = new Set();
    for (const item of step.items) {
      if (!item.id || ids.has(item.id) || !item.label || typeof item.detail !== 'string' || !['pending', 'complete', 'uncertain', 'failed'].includes(item.status)) throw new Error('Invalid timeline frame item');
      ids.add(item.id);
    }
    previous = step.at;
  }
  if (model.steps[0].at !== 0 || model.steps.at(-1).at !== model.duration) throw new Error('Timeline requires initial and final frames');
  return model;
}
// A frame is a complete snapshot. Seeking never replays callbacks or merges
// partial state, so forward and backward seeks produce the same result.
export function stateAt(model, time) {
  const t = Math.max(0, Math.min(model.duration, Number.isFinite(time) ? time : 0));
  let stepIndex = 0;
  for (let index = 1; index < model.steps.length; index++) {
    if (model.steps[index].at > t) break;
    stepIndex = index;
  }
  return { time: t, progress: t / model.duration, stepIndex, frame: model.steps[stepIndex] };
}
export function createRegistry() {
  let active;
  return {
    activate(player) { if (active && active !== player) active.pause(); active = player; },
    release(player) { if (active === player) active = undefined; }
  };
}
