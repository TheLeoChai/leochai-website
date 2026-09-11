# Static build

Use Node 22+ and `npm ci`. `npm run build` validates a production-base build
before replacing `site/`. `npm run build:preview` does the same for
`/leochai-website/`. `npm run check` validates both bases without replacing the
current output. `./scripts/dev.sh` builds and serves on port 8080 (optional first
argument changes the port). Re-run after source edits.

Eleventy 3.1.6 uses ESM, I18nPlugin and HtmlBasePlugin. Sources live in
`content/en/pages.json` and `content/zh/pages.json`; each locale's `pages.njk`
paginates the route manifest. Root and `/en/` share the English Home record.
The manifest in `content/_data/routes.js` drives routes, navigation, metadata,
sitemap and legacy aliases. The `lang` metadata is independent of locale paths.
All absolute discovery URLs use `metadata.base`, including preview builds.

Shared templates are authored in `content/_includes/`; the build also copies
them to `site/_includes/` for the visual contract's component inventory.
`assets/` is copied to the output root: `assets/css/` becomes `site/css/`,
`assets/fonts/` becomes `site/fonts/`. Asset paths in HTML are root-relative;
HtmlBasePlugin applies the deployment prefix. For paths inside JS, CSS, JSON,
apply the prefix explicitly. Meta refresh is handled by HtmlBasePlugin. Shared locale assets have one URL.

Core records require title, description, revision and body. Chinese records
also name the English `sourceRevision`; stale or missing revisions fail the
build. Core slugs and stable anchors are defined once in the manifest. These
initial pages are structural placeholders; page scenes and shared styling are
subsequent issues. No missing résumé or live demo is represented as available.

Articles can be added as records with a unique key, `kind: "article"`, an
explicit ASCII `slug`, metadata and body. Publication is opt-in; drafts are excluded.
A Chinese record must have the same key and source revision; until supplied,
there is no Chinese route or alternate. Chinese Notes lists the English article
under an explicit awaiting-translation heading. Article presentation remains separate work. Do not use the i18n plugin's fallback as content.

Builds use a lock and a unique `.build/candidate-*` directory. Validation runs
on that exact artifact before promotion; failed generation or validation leaves
`site/` untouched. A failed rename restores the previous directory. Normal
completion removes candidates and the lock. After a process crash, inspect
`.build/` before manually removing its lock or recovering `previous-site`.

`.nojekyll` is emitted. An existing `site/CNAME` is copied byte-for-byte and
checked; no CNAME is introduced during this scaffold (domain work is deferred
by Leo). Publishing is still exclusively `./scripts/publish.sh`; it publishes
the already-built artifact. No domain cutover or GitHub Actions is involved.

Legacy redirects preserve query/fragment with JavaScript. Without JavaScript,
the visible destination and explicit important-anchor links remain present, but
Chromium meta refresh drops an incoming fragment. Target pages retain those
anchor IDs; no-JS automatic fragment preservation is not claimed.

LEO-113 adds Atom feeds using RSS plugin v2 virtual templates at `/en/rss.xml`
and `/zh/rss.xml`. Each locale has only its published articles, newest first,
with an escaped plain-text description as an HTML summary. Empty feeds are
valid and use the build time for `updated`; no placeholder posts are published.
Feed self links, IDs and entry URLs always use the canonical production origin,
including preview artifacts. HTML subscription links use the deployment prefix.
The plugin's feed-level discovery URLs are normalized with an XML parser;
article URLs are absolute before entering the plugin. Feed metadata uses `en`
and `zh-Hans` independently of the route prefixes.

Article publication is explicit: add `published: true` and a UTC `publishedAt`
like `2026-09-10T12:00:00Z` to an approved article record. Other article records
are excluded before generating routes, aliases, alternates, sitemap or feeds.
Only published translations may leave the English-awaiting-translation list;
a published Chinese translation requires a published English source. Tests use
fixtures in temporary directories; the public manifest currently has no posts.

The résumé is unavailable until Leo supplies the approved public PDF.
`content/_data/resume.js` carries `TODO(LEO)`, localized unavailable copy and a
request link to the approved `contact@leochai.com` address. Do not fabricate a
PDF or copy private documents. Once approved, place the file at
`assets/assets/leo-chai-resume.pdf` (the outer assets folder is copied to the
output root), set the data URL to `/assets/leo-chai-resume.pdf`, and enable the
shared component's download state. The current Home placeholder has a request
link and no broken download link.

Owner tools belong on the private NAS origin, reachable through Tailscale only.
Keep all owner sources and data outside `content/`, `assets/` and generated
`site/`; copying them to Pages with a hidden link is not access control. No
owner link, owner route, private hostname or launchpad is added to this build.
Validation rejects any `owner` directory in the output and any rendered HTML
link targeting an owner path before promotion. PC remains a future inline
Projects exhibit; no separate PC route is generated.
