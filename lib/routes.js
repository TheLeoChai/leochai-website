import { readFileSync } from 'node:fs';

export const core = [
  { key: 'home', slug: '', anchors: [] },
  { key: 'projects', slug: 'projects/', anchors: [] },
  { key: 'job-matching', slug: 'work/job-matching/', anchors: ['preview'] },
  { key: 'tiny-world', slug: 'work/tiny-world/', anchors: ['live'] },
  { key: 'opencode', slug: 'work/opencode/', anchors: ['debate', 'autocompact', 'agent-pool', 'xray'] },
  { key: 'leo', slug: 'leo/', anchors: ['ask'] },
  { key: 'notes', slug: 'notes/', anchors: [] }
];

export function createRoutes(sources) {
  const canonical = [];
  for (const locale of ['en', 'zh']) {
    const pages = sources[locale];
    if (!Array.isArray(pages)) throw new Error(`Missing ${locale} page sources`);
    for (const definition of core) {
      if (pages.filter(page => page.key === definition.key).length !== 1) throw new Error(`Expected one ${locale}/${definition.key}`);
    }
    for (const page of pages) {
      const definition = core.find(item => item.key === page.key);
      if (!definition && (page.kind !== 'article' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug))) throw new Error(`Invalid article slug: ${page.key}`);
      if (!page.title || !page.description || !page.revision) throw new Error(`Missing metadata: ${locale}/${page.key}`);
      if (locale === 'zh') {
        const source = sources.en.find(item => item.key === page.key);
        if (!source || page.sourceRevision !== source.revision) throw new Error(`Translation source revision mismatch: ${page.key}`);
        if (!definition && (page.slug !== source.slug || JSON.stringify(page.anchors ?? []) !== JSON.stringify(source.anchors ?? []))) throw new Error(`Translation slug/anchors mismatch: ${page.key}`);
      }
      const slug = definition?.slug ?? `notes/${page.slug}/`;
      const path = `/${locale}/${slug}`;
      canonical.push({ ...page, locale, lang: locale === 'zh' ? 'zh-Hans' : 'en', kind: definition ? 'core' : 'article', anchors: definition?.anchors ?? page.anchors ?? [], path, canonical: locale === 'en' && page.key === 'home' ? '/' : path });
    }
  }
  const paths = canonical.map(page => page.path);
  if (new Set(paths).size !== paths.length) throw new Error('Duplicate route');
  for (const page of canonical) {
    page.alternates = canonical.filter(other => other.key === page.key).map(other => ({ lang: other.lang, path: other.canonical }));
    if (page.key === 'home') page.alternates.push({ lang: 'x-default', path: '/' });
  }
  const englishHome = canonical.find(page => page.locale === 'en' && page.key === 'home');
  const pages = [{ ...englishHome, path: '/' }, ...canonical];
  const aliases = canonical.filter(page => page.locale === 'en' && (page.path.startsWith('/en/work/') || page.path.startsWith('/en/notes/'))).map(page => ({ path: page.path.slice(3), target: page.path, title: page.title, anchors: page.anchors }));
  const untranslated = canonical.filter(page => page.locale === 'en' && page.kind === 'article' && !canonical.some(other => other.locale === 'zh' && other.key === page.key));
  return { canonical, pages, en: pages.filter(page => page.locale === 'en'), zh: pages.filter(page => page.locale === 'zh'), aliases, untranslated };
}

const sources = Object.fromEntries(['en', 'zh'].map(locale => [locale, JSON.parse(readFileSync(new URL(`../content/${locale}/pages.json`, import.meta.url), 'utf8'))]));
export default createRoutes(sources);
