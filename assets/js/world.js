import { createWorldModel } from './world-model.js';

const words = {
  en: { play: 'Play the afternoon', pause: 'Pause', resume: 'Continue', replay: 'Play again', paused: 'Paused.', playing: 'Playing the illustrated afternoon.', complete: 'The afternoon is complete.', unavailable: 'Replay is unavailable. The completed still and three story moments remain below.' },
  zh: { play: '播放这个午后', pause: '暂停', resume: '继续', replay: '再看一次', paused: '已暂停。', playing: '正在播放庭院里的午后。', complete: '这个午后播放完了。', unavailable: '回放暂不可用，仍可查看完成后的静态场景和下方三个片段。' }
};
const clock = value => `0:${String(Math.floor(value / 1000)).padStart(2, '0')}`;

async function enhance(root) {
  const locale = root.dataset.locale === 'zh' ? 'zh' : 'en';
  const copy = words[locale];
  const $ = selector => root.querySelector(selector);
  const poster = $('.world__poster');
  const assetError = $('[data-asset-error]');
  const showPosterError = () => { assetError.hidden = false; };
  poster.addEventListener('error', showPosterError);
  if (poster.complete && !poster.naturalWidth) showPosterError();
  const announce = text => { $('[data-announcement]').textContent = text; };
  try {
    const sceneUrl = new URL(root.dataset.scene, location.href);
    const getJSON = async url => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('World data unavailable');
      return response.json();
    };
    const [scene, trace] = await Promise.all([getJSON(sceneUrl), getJSON(root.dataset.trace)]);
    const model = createWorldModel(trace, scene);
    const images = {};
    await Promise.all(['base', 'front', 'sprites'].map(async key => {
      const name = scene.images[key];
      if (!/^[a-z0-9-]+\.png$/.test(name)) throw new Error('Invalid scene image');
      const img = new Image();
      img.src = new URL(name, sceneUrl).href;
      await img.decode();
      images[key] = img;
    }));
    const canvas = $('.world__canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    canvas.width = scene.width;
    canvas.height = scene.height;
    ctx.imageSmoothingEnabled = false;
    const seek = $('[data-seek]');
    const label = $('[data-play-label]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let time = model.posterTime;
    let playing = false;
    let startedAt = 0;
    let frame = 0;
    let lastEvent = null;
    let lastSecond = null;
    let lastSeekTick = null;

    const sprite = (key, position) => {
      const rect = scene.sprites[key];
      if (!rect || !position) return;
      ctx.drawImage(images.sprites, rect.x, rect.y, rect.w, rect.h,
        Math.round(position.x - rect.anchorX), Math.round(position.y - rect.anchorY), rect.w, rect.h);
    };
    function render(at) {
      time = Math.max(0, Math.min(model.duration, at));
      const state = model.stateAt(time);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images.base, 0, 0);
      const props = scene.stateProps;
      if (!state.entities['bed-01'].herbs) sprite('bed-harvested', props.bed);
      else if (state.entities['bed-01'].watered) sprite('bed-watered', props.bed);
      if (state.event.action === 'water' && state.event.outcome === 'accepted' && time - state.event.at < 1200) sprite('water', props.water);
      if (!state.entities.stool.repaired) sprite('stool', props.stoolWorkshop);
      if (state.entities.stool.placed) sprite('stool', props.stool);
      if (state.entities.table.served) sprite('meal', props.meal);
      if (state.entities.kitchen.meal) sprite('steam', props.steam);
      Object.entries(state.actors).sort((a, b) => a[1].position.y - b[1].position.y).forEach(([id, actor]) => {
        const walking = actor.moving && !reducedMotion.matches && Math.floor(time / 240) % 2;
        sprite(scene.actors[id][walking ? 'walk' : 'idle'], actor.position);
        const carriedSprite = scene.heldSprites[actor.carrying];
        if (carriedSprite) {
          sprite(carriedSprite, { x: actor.position.x + 11, y: actor.position.y + 3 });
        }
      });
      ctx.drawImage(images.front, 0, 0);
      const seekTick = Math.floor(time / 100);
      if (seekTick !== lastSeekTick) { seek.value = String(Math.round(time)); lastSeekTick = seekTick; }
      const second = Math.floor(time / 1000);
      if (second !== lastSecond) {
        seek.setAttribute('aria-valuetext', `${clock(time)} / ${clock(model.duration)}`);
        $('[data-time]').textContent = `${clock(time)} / ${clock(model.duration)}`;
        lastSecond = second;
      }
      // Event text changes only at semantic boundaries, never once per frame.
      if (lastEvent !== state.event.id) {
        $('[data-event-caption]').textContent = state.event.caption[locale];
        $('[data-event-observation]').textContent = state.event.observation.text[locale];
        lastEvent = state.event.id;
      }
    }
    function pause(message = copy.paused) {
      playing = false;
      cancelAnimationFrame(frame);
      label.textContent = time >= model.duration ? copy.replay : time === 0 ? copy.play : copy.resume;
      if (message) announce(message);
    }
    function tick(now) {
      if (!playing) return;
      render(now - startedAt);
      if (time >= model.duration) { pause(copy.complete); return; }
      frame = requestAnimationFrame(tick);
    }
    function play(fromStart = false) {
      if (fromStart || time >= model.duration) render(0);
      playing = true;
      startedAt = performance.now() - time;
      label.textContent = copy.pause;
      announce(copy.playing);
      frame = requestAnimationFrame(tick);
    }
    $('[data-play]').addEventListener('click', () => playing ? pause() : play());
    $('[data-replay]').addEventListener('click', () => { pause(''); play(true); });
    $('[data-step]').addEventListener('click', () => {
      pause('');
      render(model.eventTimes.find(at => at > time) ?? 0);
      pause($('.world__observation-title').textContent);
    });
    seek.addEventListener('input', () => { pause(''); render(Number(seek.value)); pause(''); });
    seek.addEventListener('change', () => announce($('.world__observation-title').textContent));
    document.addEventListener('visibilitychange', () => { if (document.hidden && playing) pause(); });
    function applyMotionPreference() {
      $('[data-play]').hidden = reducedMotion.matches;
      $('[data-replay]').hidden = reducedMotion.matches;
      if (reducedMotion.matches) { pause(''); render(model.posterTime); pause(''); }
    }
    reducedMotion.addEventListener('change', applyMotionPreference);
    seek.max = String(model.duration);
    render(model.posterTime);
    applyMotionPreference();
    // Keep the completed poster until every enhancement dependency is ready.
    root.dataset.ready = '';
    $('[data-controls]').hidden = false;
  } catch {
    announce(copy.unavailable);
    root.dataset.failed = '';
  }
}

document.querySelectorAll('[data-world]').forEach(enhance);
