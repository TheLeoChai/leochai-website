# §1 · Seven destinations, résumé, locale feeds and owner boundary

- Identifier: LEO-113
- Linear: https://linear.app/leochai/issue/LEO-113/1-seven-destinations-resume-locale-feeds-and-owner-boundary
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-48
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: None
- Created: 2026-09-10T22:30:19.378Z
- Updated: 2026-09-11T04:56:46.030Z
- Completed: 2026-09-11T04:56:46.004Z
- Due date: None
- Cycle: None
- Archived: None

## Description

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
* No empty PC page, public owner route, false language alternate, locale router or JS-only redirect.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

### Leo Chai - 2026-09-11T04:40:31.006Z

- Comment ID: 08089dc8-278b-4355-b437-5b77cec7a592
- Updated: 2026-09-11T04:40:30.988Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Implemented and independently reviewed in local commit abf422d. Both deployment-prefix builds, real RSS-plugin encoded-content fixtures, draft exclusion, missing/available translations and owner-output rejection passed. Valid empty locale feeds are intentional; approved résumé PDF/articles not supplied, and Request résumé links to Leo's supplied public email. Local review diff: /tmp/leo113-review.patch. Critique web upload is blocked by automatic approval review pending explicit payload+destination permission for https://critique.work/upload; Leo's requested thread has been notified. Implementation continues; integrated Home style/axe/no-JS/screenshots gate remains before In Review.

### Leo Chai - 2026-09-11T04:42:28.571Z

- Comment ID: 7db520bb-491d-4274-881d-85ebc02bfea9
- Updated: 2026-09-11T04:42:28.553Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Critique upload approved explicitly by Leo and completed: https://critique.work/v/c85fe3242bcaa1fe51e5c26ad4a21c43 . Review-link blocker resolved. Local commit abf422d; integrated Foundation/Home gates follow.

### Leo Chai - 2026-09-11T04:56:51.301Z

- Comment ID: e9636971-d54f-433e-9f4f-99a19d7d626b
- Updated: 2026-09-11T04:56:51.285Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Verified retrofit PR #3 is merged: https://github.com/TheLeoChai/leochai-website/pull/3 (089d777). Original parent review and both-prefix/real-feed/draft/owner-boundary checks passed; font CSS now also passes the integrated token gate. Critique: https://critique.work/v/c85fe3242bcaa1fe51e5c26ad4a21c43 . Transitioned In Review → Done after confirming merge. Résumé and actual article content remain the explicitly documented supplied-content limits.

---
