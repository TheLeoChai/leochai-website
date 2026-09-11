import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
async function files(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => entry.isDirectory() ? files(join(directory, entry.name)) : join(directory, entry.name)))).flat();
}
const banned = /\b(?:seamless|robust|leverage|elevate|unlock|empower)\b|\bin today\b/i;
const issues = [];
for (const file of await files('content')) {
  if (!/\.(?:njk|json|md)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  if (banned.test(text)) issues.push(`${file}: promotional filler`);
  if (/\p{Extended_Pictographic}/u.test(text)) issues.push(`${file}: emoji require editorial review; use an approved icon`);
}
if (issues.length) throw new Error(issues.join('\n'));
console.log('Content gate: no promotional filler or emoji icons.');
