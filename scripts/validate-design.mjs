import stylelint from 'stylelint';
import { expected } from './stylelint-tokens.mjs';
import config from '../stylelint.config.mjs';
export function contrastRatio(a, b) {
  const luminance = hex => {
    const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + .05) / (dark + .05);
}
export async function validateDesign() {
  const result = await stylelint.lint({ files: 'assets/css/**/*.css', config, formatter: 'string' });
  if (result.errored) throw new Error(`Design token gate failed:\n${result.report}`);
  const ratio = contrastRatio(expected.get('--accent-ink'), expected.get('--canvas'));
  if (ratio < 4.5) throw new Error(`Text teal contrast ${ratio.toFixed(2)} must be at least 4.5`);
  console.log(`Text teal/canvas contrast: ${ratio.toFixed(2)}:1`);
  console.log('Stylelint: pinned colors and token boundaries passed.');
}
