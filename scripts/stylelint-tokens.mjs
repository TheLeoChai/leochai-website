import stylelint from 'stylelint';
import valueParser from 'postcss-value-parser';
import colorNames from 'color-name';
import { basename } from 'node:path';
export const ruleName = 'leochai/locked-tokens';
const names = new Set(['canvas', 'canvas-raised', 'ink', 'ink-soft', 'border', 'accent', 'accent-ink', 'pastel-teal', 'pastel-violet', 'pastel-sky', 'elevation', 'dur-1', 'dur-2', 'ease-out-soft', 'miku'].map(name => `--${name}`));
const pinned = ['#F7F9FC', '#FFFFFF', '#1A1421', '#5C5470', '#E4E8F1', '#39C5BB', '#0E756D', '#DDF5F2', '#ECE6F8', '#E4EFFA', '3px 3px 0 0 var(--ink)', '160ms', '300ms', 'cubic-bezier(.22, 1, .36, 1)', 'var(--accent)'];
export const expected = new Map([...names].map((name, index) => [name, pinned[index]]));
const colors = new Set([...Object.keys(colorNames), 'transparent']);
const colorFunctions = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark|device-cmyk)$/i;
const messages = stylelint.utils.ruleMessages(ruleName, { rejected: reason => reason });
export default stylelint.createPlugin(ruleName, enabled => (root, result) => {
  if (!enabled) return;
  const tokens = basename(root.source.input.file ?? '') === 'tokens.css';
  const report = (node, reason) => stylelint.utils.report({ ruleName, result, node, message: messages.rejected(reason) });
  const seen = new Set();
  root.walkDecls(decl => {
    if (tokens && decl.prop.startsWith('--')) {
      if (seen.has(decl.prop) || expected.get(decl.prop)?.toLowerCase() !== decl.value.toLowerCase()) report(decl, `Pinned token changed or duplicated: ${decl.prop}`);
      seen.add(decl.prop);
    }
    if (decl.prop.startsWith('--') && (!tokens || !names.has(decl.prop))) report(decl, 'Only approved tokens may be defined, exclusively in tokens.css.');
    valueParser(decl.value).walk(node => {
      if (node.type === 'function' && node.value === 'var') {
        const name = node.nodes.find(child => child.type === 'word')?.value;
        if (!names.has(name)) report(decl, `Unknown design token: ${name}`);
      }
      if (!tokens && ((node.type === 'word' && (/^#[a-f0-9]{3,8}$/i.test(node.value) || colors.has(node.value.toLowerCase()))) || (node.type === 'function' && colorFunctions.test(node.value)))) report(decl, 'Reference a pinned color token; literal colors and generated color functions belong only in tokens.css.');
    });
    if (/gradient\(/i.test(decl.value)) report(decl, 'Gradients are not part of this design system.');
    if (decl.prop === 'box-shadow' && !['none', 'var(--elevation)'].includes(decl.value)) report(decl, 'Use the hard-offset elevation token.');
  });
  if (tokens) for (const name of names) if (!seen.has(name)) report(root, `Missing pinned token: ${name}`);
});
