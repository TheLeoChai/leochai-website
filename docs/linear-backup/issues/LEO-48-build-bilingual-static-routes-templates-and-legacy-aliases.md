# Build bilingual static routes, templates and legacy aliases

- Identifier: LEO-48
- Linear: https://linear.app/leochai/issue/LEO-48/build-bilingual-static-routes-templates-and-legacy-aliases
- Status: Done
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-113, LEO-112
- Blocks: LEO-50, LEO-127, LEO-126, LEO-125, LEO-124, LEO-123, LEO-122, LEO-121, LEO-120, LEO-115, LEO-114, LEO-57, LEO-49
- Blocked by: None
- Related: LEO-160
- Created: 2026-09-10T20:21:31.268Z
- Updated: 2026-09-11T05:31:03.211Z
- Completed: 2026-09-11T05:31:03.195Z
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: §1 page map; all H/G/J/T/L/O/N routes; résumé and locale RSS
Build order: M1, step 1 (relative day 30 target).

Set up build-time Eleventy with content/en and content/zh outside generated site/, shared templates/assets, and a route manifest for seven core destinations. Emit real trailing-slash HTML, root English Home and /en/ alias, Simplified Chinese mirrors, stable cross-locale fragments and legacy alias documents. Build into temporary output, validate, then promote.

Key constraints

* No runtime locale router, language toggle, browser redirect, locale cookie or page-load translation.
* Root is English canonical/x-default; /en/ canonical points to /; correct lang/hreflang only for existing translations, revision-linked sources and explicit English-only article list.
* Support production / and preview /leochai-website/; preserve .nojekyll and CNAME [leochai.com](<http://leochai.com>); [publish.sh](<http://publish.sh>) only, no Actions/force-push.

Acceptance criteria (§14)

* §14 day 30 + checks 1–2: both core locales and legacy/deep links work without JS or NAS; assets, résumé, feeds, canonicals and fragments pass both deployment bases.
* Missing Chinese articles produce neither fake routes nor false alternate links.

## Feature-section work breakdown

* [LEO-112 · §1 · /en–/zh Eleventy build, canonical routes and legacy aliases](<https://linear.app/leochai/issue/LEO-112/1-en-zh-eleventy-build-canonical-routes-and-legacy-aliases>)
* [LEO-113 · §1 · Seven destinations, résumé, locale feeds and owner boundary](<https://linear.app/leochai/issue/LEO-113/1-seven-destinations-resume-locale-feeds-and-owner-boundary>)

## User-flow acceptance specs (§12)

* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (D1 — build & bilingual routing):**

* Eleventy 3.1.x, ESM config. Bundled `I18nPlugin` (defaultLanguage `en`, `errorMode: "allow-fallback"`) + `HtmlBasePlugin` + `@11ty/eleventy-plugin-rss` v2 (virtual-template Atom feeds per locale, language `en` / `zh-Hans`).
* Sources `content/en/` + `content/zh/` outside generated output. Pagination-over-array emits BOTH `/` (canonical English Home) and `/en/` (full alias, canonical → `/`). zh routes under `/zh/`; routing prefix and BCP-47 metadata kept separate (`lang="zh-Hans"`).
* Legacy alias families `/work/<slug>/` AND `/notes/.../` are real static HTML documents: meta refresh + visible link + canonical to destination + noindex. Work without JS. Fragments: a server-side alias cannot recover arbitrary old fragment semantics, so important legacy anchor IDs are preserved as real IDs in target pages' HTML; alias fixtures include fragment deep-links tested with JavaScript disabled.
* Central `content/_data/routes.js` manifest drives nav, hreflang, sitemap. Sitemap and hreflang list canonical routes only, never aliases. Translation completeness validated explicitly (allow-fallback does not enforce it); missing zh articles get no route and no false alternate link.
* Build per target with `--pathprefix` (`/` production, `/leochai-website/` preview). Each target is built, validated, and promoted separately — never rebuild between validate and promote.
* Absolute URLs (canonical/hreflang/RSS/sitemap) derive from `metadata.base = https://leochai.com/`, not pathPrefix. HtmlBasePlugin only rewrites HTML attributes: CSS `url()`, JSON fetch URLs, hand-written absolute URLs handled manually.
* Explicit ASCII slugs; explicit heading IDs shared across locales.
* Deploy: keep `scripts/publish.sh` (git-worktree, normal commit+push, no force-push). `gh-pages` npm package REJECTED (conflicts with no-force-push policy). `CNAME` + `.nojekyll` emitted into build output.

**Build steps (in order):**

1. LEO-112 — scaffold Eleventy ESM project, locale routing, dual `/`+`/en/` emit, aliases, canonical/hreflang.
2. LEO-113 — seven destinations, résumé, locale RSS feeds, owner boundary.
3. LEO-162 (under Release & acceptance) — harness validates this build on both prefix targets before promotion.

## Comments

### Leo Chai - 2026-09-11T04:30:45.697Z

- Comment ID: f10ec131-ecd7-4859-842c-c9d32569f665
- Updated: 2026-09-11T04:30:45.651Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Wave 1 started under Leo's CP1 approval. This run is Foundation plus the first Home design demonstration only. Per explicit run instruction, preserve .nojekyll and any existing CNAME, but do not introduce CNAME or perform domain cutover/publish. Seven other core route structures may remain clearly labeled placeholders until their page waves.

### Leo Chai - 2026-09-11T05:30:26.239Z

- Comment ID: 6f861f23-fd79-44af-98c0-668d51676af7
- Updated: 2026-09-11T05:30:26.212Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Foundation rollup ready for final review after Home PR #7. LEO-112 and LEO-113 are merged; cleanup commit c28275984beaaa53112b876056e2086dc891bc30 is rebased onto the finished Home.

Critique: https://critique.work/v/12e488227d4d25e0894a79016c97800e

Empty feeds now use one authored timestamp; unchanged full builds are byte-identical at both production and preview prefixes. Populated feeds retain newest actual article date. All four Node test-file suites, both-prefix validation, production build and token/content gates pass; orchestrator independently reran both-prefix checks and reviewed every changed file. Only two generated RSS timestamps change; final Home browser evidence remains unchanged (axe 0, no-JS/reduced motion, en/zh screenshots 390/768/1440).

README/static-build docs are current, and docs/wave1-review.md records merged issue PRs, critique links, final Home budgets and first-iteration limits. CNAME is not introduced, existing CNAME bytes and .nojekyll semantics remain tested. Legacy no-JS meta-refresh fragment loss is explicitly documented; target IDs/deep links and JS hash preservation remain intact. No production publication or domain cutover.

### Leo Chai - 2026-09-11T05:31:42.964Z

- Comment ID: 81680a8b-635e-4558-8aae-611b6212bee5
- Updated: 2026-09-11T05:31:42.947Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Squash-merged as PR #8: https://github.com/TheLeoChai/leochai-website/pull/8 (937b96667ef331c22010cc6183a456fbe89f8864). Merged feature branch deleted; local main synced. Review diff: https://critique.work/v/12e488227d4d25e0894a79016c97800e . Foundation and the explicitly scoped Home first iteration are complete; CP2 design sign-off remains pending Leo. The preview continues serving; no production publish or domain cutover.

---
