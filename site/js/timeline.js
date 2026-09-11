import { stateAt, validateTimeline, createRegistry } from './timeline-model.js';
const registry = createRegistry();
export function enhanceTimeline(root, { clock = () => performance.now(), request = requestAnimationFrame, cancel = cancelAnimationFrame, motion = matchMedia('(prefers-reduced-motion: reduce)'), players = registry } = {}) {
  let model;
  try { model = validateTimeline(JSON.parse(root.querySelector('[data-timeline-model]').textContent)); }
  catch { return null; } // The authored final frame and steps remain readable.
  const find = selector => root.querySelector(selector);
  const controls = find('[data-controls]');
  const play = find('[data-play]');
  const pause = find('[data-pause]');
  const replay = find('[data-replay]');
  const scrub = find('[data-scrub]');
  const status = find('[data-status]');
  const title = find('[data-frame-title]');
  const body = find('[data-frame-body]');
  const items = find('[data-frame-items]');
  let time = model.duration, running = false, handle, previous, lastStep = -1;
  const render = (announce = false) => {
    const state = stateAt(model, time);
    scrub.value = String(state.time);
    scrub.setAttribute('aria-valuetext', `${state.stepIndex + 1} / ${model.steps.length}: ${state.frame.title}`);
    if (state.stepIndex !== lastStep) {
      title.textContent = state.frame.title;
      body.textContent = state.frame.body;
      items.replaceChildren(...state.frame.items.map(item => {
        const li = document.createElement('li');
        li.dataset.status = item.status;
        li.dataset.item = item.id;
        const label = document.createElement('strong'); label.textContent = item.label;
        const detail = document.createElement('span'); detail.textContent = item.detail;
        li.append(label, detail); return li;
      }));
      if (announce) status.textContent = state.frame.title;
      lastStep = state.stepIndex;
    }
    root.dispatchEvent(new CustomEvent('timeline:state', { detail: state }));
    play.disabled = running;
    pause.disabled = !running;
  };
  const player = {
    pause() { running = false; cancel(handle); players.release(player); render(); },
    seek(value) { player.pause(); time = stateAt(model, value).time; render(true); },
    play(restart = false) {
      if (motion.matches) return;
      cancel(handle);
      players.activate(player);
      if (restart || time >= model.duration) time = 0;
      running = true; previous = clock(); render(true); handle = request(tick);
    },
    destroy() {
      player.pause(); motion.removeEventListener('change', reduced);
      for (const [node, event, listener] of listeners) node.removeEventListener(event, listener);
      controls.hidden = true; time = model.duration; render();
    }
  };
  function tick(now) {
    if (!running) return;
    time = Math.min(model.duration, time + Math.max(0, now - previous)); previous = now;
    render(true);
    if (time < model.duration) handle = request(tick); else player.pause();
  }
  function reduced() {
    if (motion.matches) player.seek(model.duration);
    controls.hidden = motion.matches;
  }
  const listeners = [
    [play, 'click', () => player.play()], [pause, 'click', () => player.pause()],
    [replay, 'click', () => player.play(true)], [scrub, 'input', () => player.seek(Number(scrub.value))]
  ];
  for (const [node, event, listener] of listeners) node.addEventListener(event, listener);
  motion.addEventListener('change', reduced);
  render(); reduced();
  return player;
}
if (typeof document !== 'undefined') for (const root of document.querySelectorAll('[data-timeline]')) enhanceTimeline(root);
