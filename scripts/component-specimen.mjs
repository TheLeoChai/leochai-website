import { jsonScript } from '../lib/serialization.js';
// A development specimen is emitted outside site/ and never enters routes.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import nunjucks from 'nunjucks';
import routes from '../lib/routes.js';
import metadata from '../content/_data/metadata.js';
import resume from '../content/_data/resume.js';
import { proofState, evidenceRows } from '../lib/evidence.js';
import { validateTimeline } from '../assets/js/timeline-model.js';
const output = resolve(process.argv[2] ?? '.build/components-review');
if (output === resolve('site') || output.startsWith(resolve('site') + '/')) throw new Error('The component specimen must stay outside shipped site/');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('content/_includes'), { autoescape: true });
env.addFilter('proofState', proofState); env.addFilter('evidenceRows', evidenceRows); env.addFilter('timelineModel', validateTimeline);
env.addFilter('jsonScript', jsonScript);
env.addFilter('canonicalUrl', path => new URL(path, metadata.base).href);
const model = JSON.parse(await readFile('tests/fixtures/timeline.json', 'utf8'));
const template = `{% extends "base.njk" %}{% from "components/ui.njk" import button, source, state, card, callout, evidence, figure %}{% from "components/timeline.njk" import timeline %}
{% block main %}
<h1>Shared components</h1><p>Development specimen. These examples test the interface; they are not execution evidence.</p>
<section class="actions" aria-label="Actions">{{ button('See the work', '/en/projects/') }} {{ button('Request résumé', resume.requestUrl, 'outline') }} {{ button('Email Leo', 'mailto:contact@leochai.com', 'accent') }}</section>
<section aria-label="Source and execution">{{ source('Bundled fixture') }} {{ source('Illustration') }} {{ state({reason:'No runtime capture supplied.'}, route.locale) }}</section>
<section aria-label="Card">{% call card('Same title, different requisitions.', '/en/work/job-matching/', 'This synthetic pair keeps the conflict visible. It does not measure production accuracy.', true) %}{{ source('Bundled fixture') }}{% endcall %}</section>
<section aria-label="Callout">{% call callout('A visible limit') %}<p>A shared title is not proof that two postings describe the same opening.</p>{% endcall %}</section>
<section aria-label="Timeline">{{ timeline(model, route.locale) }}</section>
<section aria-label="Second timeline">{{ timeline(second, route.locale) }}</section>
<section aria-label="Evidence fields">{{ evidence({contribution:'Component development fixture only.'}, route.locale) }}</section>
{% endblock %}`;
await mkdir(output, { recursive: true });
for (const locale of ['en', 'zh']) {
  const route = { ...routes.canonical.find(route => route.locale === locale && route.key === 'projects'), pageScripts: ['/js/timeline.js'] };
  await writeFile(`${output}/${locale}.html`, env.renderString(template, { route, metadata, resume, model, second: { ...model, id: 'second-fixture', title: 'A second independent sequence' } }));
}
console.log(`Development specimen: ${output}`);
