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
explicit ASCII `slug`, metadata and body. Only published records belong here.
A Chinese record must have the same key and source revision; until supplied,
there is no Chinese route or alternate. Chinese Notes lists the English article
under an explicit awaiting-translation heading. Article presentation and locale
feeds are separate work. Do not use the i18n plugin's fallback as content.

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
