import { readFileSync } from 'node:fs';
import { createWorldModel } from '../../assets/js/world-model.js';

export default function () {
  const trace = JSON.parse(readFileSync(new URL('../../assets/world/trace.json', import.meta.url)));
  const scene = JSON.parse(readFileSync(new URL('../../assets/world/scene.json', import.meta.url)));
  const model = createWorldModel(trace, scene);
  return { trace, scene, stills: model.stills, completed: model.stateAt(model.posterTime).event };
}
