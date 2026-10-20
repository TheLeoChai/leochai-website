# N · Supplied launch essays, failure reflection and real recipe

- Identifier: LEO-119
- Linear: https://linear.app/leochai/issue/LEO-119/n-supplied-launch-essays-failure-reflection-and-real-recipe
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Notes & recipes
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-56
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:30:52.174Z
- Updated: 2026-09-11T02:25:41.614Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Launch content: “A duplicate is an identity problem,” “Provenance beats accuracy,” a rejected-design/failure post, and a real recipe from Leo. Publish supplied material; do not invent his opinions or a recipe to fill slots.

### Concrete `/en`–`/zh` static-build strategy

* Keep sources outside generated `site/`: `content/en/`, `content/zh/`, route manifest, shared templates, asset manifests. Use **Eleventy as a build-time generator**, run locally or by the NAS publisher. No runtime locale router.
* Emit actual `index.html` files for every route, including `site/en/work/tiny-world/index.html` and its Chinese counterpart. Root `site/index.html` renders the same English Home source. English internal navigation uses `/en/...`; Chinese uses `/zh/...`. **No UI language toggle, browser-language redirect, or locale cookie.**
* `/` is canonical for English Home; `/en/` is a complete alias with canonical `/`. Other English pages are canonical under `/en/`. Set `lang`, translated metadata, and `hreflang="en"` / `hreflang="zh-Hans"` for existing pairs; root is `x-default`. Use Simplified Chinese. Slugs and fragments match across locales.
* Mirror every core page at launch. Translations record their source revision. Publish translated articles when ready; do not silently insert English into a Chinese article. Chinese Notes has an explicitly labeled “English articles awaiting translation” list. Missing Chinese articles get no generated route or false alternate-language link.
* Generate legacy `/work/<slug>/` and `/notes/.../` alias documents with visible links, canonical metadata, and a small redirect preserving fragments. These still work without JavaScript. No Pages rewrite or SPA 404 dependence.
* Build links/assets using a deployment base; verify production `/` and preview `/leochai-website/`. Share images, traces, and animation assets across locales; translate captions/transcripts. Backend events use localized event codes; original utterances retain a language label. No model translation on page load.
* Build to temporary output, validate, then promote to `site/`. Preserve `.nojekyll` and required `CNAME` value `leochai.com`. Publish through `./scripts/publish.sh`; **no GitHub Actions or force-push**.
* **Host decision:** preserve apex `leochai.com` per `AGENTS.md`. `www.leochai.com/` is an English-root entry point through the standard redirect to `leochai.com/`; it does not require `/en/`. This interprets Leo's request as English content at root, not retaining `www` in the address bar. Pages pairs apex and `www` according to its canonical host. [GitHub custom-domain documentation](<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>).
* Release discrepancy: README proposes a `www` cutover, AGENTS mandates apex, and the inspected working tree lacks `site/CNAME`. Prepare the release using the apex rule and restore that file before publishing. **Do not touch the old** `TheLeoChai.github.io` **repo without Leo's approval.** Verify the full artifact first; domain cutover is a separate deployment step.

### Acceptance criteria

* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Only supplied/approved material ships; no invented opinions or recipe; feeds include only published locale articles.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
