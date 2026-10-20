# §1 · /en–/zh Eleventy build, canonical routes and legacy aliases

- Identifier: LEO-112
- Linear: https://linear.app/leochai/issue/LEO-112/1-en-zh-eleventy-build-canonical-routes-and-legacy-aliases
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-48
- Sub-issues: None
- Blocks: LEO-124, LEO-78, LEO-77, LEO-76, LEO-75, LEO-74, LEO-73, LEO-114
- Blocked by: None
- Related: None
- Created: 2026-09-10T22:30:14.682Z
- Updated: 2026-09-11T04:48:19.110Z
- Completed: 2026-09-11T04:48:19.098Z
- Due date: None
- Cycle: None
- Archived: None

## Description

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

### Page map changes

The original five core destinations were Home, three work pages, and Notes, plus article instances. The revision has **seven core destinations**: add Projects and Meet Leo. PC assembly lives within Projects, not on an eighth page. Articles use one shared template. Owner tools are outside the public site.

`<lang>` means `en` or `zh`. Use trailing slashes; keep fragment identifiers stable across languages.

| Destination | New URL | Change / purpose |
| -- | -- | -- |
| Home | `/en/`, `/zh/`; `/` serves English Home | Immediate pitch, specimen, three primary cards, personal introduction |
| Projects | `/<lang>/projects/` | New finite gallery: Jobs, Tiny World, OpenCode, AI-Leo, then PC when ready |
| Job Matching | `/<lang>/work/job-matching/` | Case study plus bounded website chat preview at `#preview` |
| Tiny World | `/<lang>/work/tiny-world/` | Farm adaptation plus shared episode at `#live` |
| OpenCode | `/<lang>/work/opencode/` | Four animated feature stories with direct fragment links |
| Meet Leo | `/<lang>/leo/` | Biography, opinions, memory-backed Q&A at `#ask`; avatar belongs here |
| Notes | `/<lang>/notes/`, `/<lang>/notes/<slug>/` | AI/technology, build reflections, and recipes together |
| PC assembly | `/<lang>/projects/#pc-assembly` | Inline exhibit, no empty “coming soon” destination |
| Résumé / feeds | `/assets/leo-chai-resume.pdf`, `/<lang>/rss.xml` | One factual résumé source; feeds contain published locale articles |
| Owner launchpad | Private NAS `/owner/`, over Tailscale only | Separate origin outside `site/`; existing Jellyfin and owner tools |

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* Emit and validate every specified core route in both locales, root canonical/alias metadata, revision-linked translations and both deployment bases.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

### Leo Chai - 2026-09-11T04:34:29.717Z

- Comment ID: f16c250c-24ba-4974-b97a-2045c36dd49a
- Updated: 2026-09-11T04:34:29.702Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Implemented and independently reviewed in local commit 9b11db7. Critique: https://critique.work/v/5053addf29b128634488c542c8288d2e . Production and /leochai-website/ builds pass; failure preserves previous output; existing CNAME survives; missing translation fixtures pass. Browser checks: axe zero violations at 390/768/1440 for en/zh, no horizontal overflow, root/en/zh readable without JS; reduced-motion has no running animation. No CSS yet (token/stylelint gate will run on integrated Foundation before In Review). Known static-alias limitation: Chromium meta refresh drops incoming hash without JS; destination anchor IDs and explicit deep links exist. JS redirect preserves hash/query. No publish/domain changes. Holding workflow In Progress until integrated styling gates are available.

---
