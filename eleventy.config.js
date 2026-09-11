import { HtmlBasePlugin, I18nPlugin } from '@11ty/eleventy';
import { existsSync } from 'node:fs';
import metadata from './content/_data/metadata.js';

export default function (config) {
  config.setNunjucksEnvironmentOptions({ trimBlocks: true, lstripBlocks: true });
  config.addPlugin(I18nPlugin, { defaultLanguage: 'en', errorMode: 'allow-fallback' });
  config.addPlugin(HtmlBasePlugin);
  config.addFilter('canonicalUrl', path => new URL(path, metadata.base).href);
  config.addFilter('localeRoutes', (routes, locale) => routes.canonical.filter(route => route.locale === locale && route.kind === 'core'));
  config.addPassthroughCopy({ assets: '.' });
  // The visual contract names site/_includes; authored components remain here.
  config.addPassthroughCopy({ 'content/_includes': '_includes' });
  if (existsSync('site/CNAME')) config.addPassthroughCopy({ 'site/CNAME': 'CNAME' });
  return {
    dir: { input: 'content', includes: '_includes', data: '_data', output: '.build/unvalidated' },
    templateFormats: ['njk', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}
