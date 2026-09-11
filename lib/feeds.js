import { DOMParser } from 'linkedom';

export const feeds = [
  { locale: 'en', language: 'en', title: 'Leo Chai — Notes', subtitle: 'Build reflections, technology, and recipes.' },
  { locale: 'zh', language: 'zh-Hans', title: 'Leo Chai — 笔记', subtitle: '构建心得、技术与食谱。' }
];

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function feedArticles(routes, locale, base) {
  return routes.canonical.filter(route => route.kind === 'article' && route.locale === locale && route.published === true)
    .map(route => ({
      url: new URL(route.canonical, base).href,
      date: new Date(route.publishedAt),
      data: { title: route.title, page: { url: route.path } },
      // Summary feeds remain stable as the shared article layout evolves.
      content: `<p>${escapeHtml(route.description)}</p>`
    })).sort((a, b) => a.date - b.date || a.url.localeCompare(b.url));
}

// RSS v2's virtual template adds the preview prefix to its feed-level URLs.
// Discovery remains canonical in both artifacts, as required by D1. Entry
// URLs are already absolute; descriptions are escaped text without links.
export function canonicalizeFeed(xml, locale, base) {
  const document = new DOMParser().parseFromString(xml, 'text/xml');
  const feed = document.documentElement;
  for (const child of feed.children) {
    if (child.localName === 'id') child.textContent = new URL(`/${locale}/notes/`, base).href;
    if (child.localName === 'link') child.setAttribute('href', new URL(child.getAttribute('rel') === 'self' ? `/${locale}/rss.xml` : `/${locale}/notes/`, base).href);
  }
  return document.toString();
}
