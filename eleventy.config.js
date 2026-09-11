import { HtmlBasePlugin, I18nPlugin } from '@11ty/eleventy';
import { existsSync } from 'node:fs';
import metadata from './content/_data/metadata.js';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import routes from './content/_data/routes.js';
import { feeds, feedArticles, canonicalizeFeed } from './lib/feeds.js';

export default function (config) {
  config.setNunjucksEnvironmentOptions({ trimBlocks: true, lstripBlocks: true });
  config.addPlugin(I18nPlugin, { defaultLanguage: 'en', errorMode: 'allow-fallback' });
  config.addPlugin(HtmlBasePlugin);
  for (const feed of feeds) {
    const name = `published_${feed.locale}`;
    config.addCollection(name, () => feedArticles(routes, feed.locale, metadata.base));
    config.addPlugin(feedPlugin, {
      type: 'atom',
      outputPath: `/${feed.locale}/rss.xml`,
      inputPath: `locale-feed-${feed.locale}.njk`,
      collection: { name, limit: 0 },
      metadata: { ...feed, base: metadata.base, author: { name: 'Leo Chai' } }
    });
  }
  config.addTransform('canonical-feed-discovery', function (content) {
    const feed = feeds.find(feed => this.page.outputPath?.endsWith(`/${feed.locale}/rss.xml`));
    return feed ? canonicalizeFeed(content, feed.locale, metadata.base) : content;
  });
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
