import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rename, rm, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateFonts } from './validate-fonts.mjs';
import { validateBuild } from './validate-build.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
process.chdir(root);
const args = process.argv.slice(2);
const checkAll = args.includes('--check-all');
const prefix = args.find(arg => arg.startsWith('--pathprefix='))?.slice(13) ?? '/';
if (!['/', '/leochai-website/'].includes(prefix)) throw new Error(`Unsupported path prefix: ${prefix}`);
if (args.some(arg => arg !== '--check-all' && !arg.startsWith('--pathprefix='))) throw new Error('Unknown build argument');
await mkdir('.build', { recursive: true });
// A separate lock protects concurrent publishers/builds from replacing each
// other's validated output. Stale lock removal is deliberately manual.
const lock = join(root, '.build/lock');
await mkdir(lock).catch(() => { throw new Error('Another build owns .build/lock; wait for it to finish.'); });
try {
  for (const targetPrefix of checkAll ? ['/', '/leochai-website/'] : [prefix]) {
    const temporary = await mkdtemp(join(root, '.build/candidate-'));
    try {
      const build = spawnSync(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs', `--output=${temporary}`, `--pathprefix=${targetPrefix}`], { stdio: 'inherit' });
      if (build.error) throw build.error;
      if (build.status !== 0) throw new Error(`Eleventy exited ${build.status}`);
      await validateBuild(temporary, targetPrefix);
      await validateFonts(temporary);
      const existingCname = await readFile('site/CNAME', 'utf8').catch(error => { if (error.code !== 'ENOENT') throw error; return null; });
      if (existingCname !== null && await readFile(join(temporary, 'CNAME'), 'utf8') !== existingCname) throw new Error('CNAME changed during build');
      if (checkAll) continue;
      const backup = join(root, '.build/previous-site');
      await rm(backup, { recursive: true, force: true });
      let previous = false;
      try { await rename('site', backup); previous = true; }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      try { await rename(temporary, 'site'); }
      catch (error) { if (previous) await rename(backup, 'site'); throw error; }
      await rm(backup, { recursive: true, force: true });
      console.log(`Promoted validated artifact to site/ (${targetPrefix})`);
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
  }
} finally {
  await rm(lock, { recursive: true, force: true });
}
