# M1 · Acceptance harness: Playwright projects, link/HTML validators, budget check, candidate→promote

- Identifier: LEO-162
- Linear: https://linear.app/leochai/issue/LEO-162/m1-acceptance-harness-playwright-projects-linkhtml-validators-budget
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-58
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: LEO-160
- Created: 2026-09-11T01:53:22.353Z
- Updated: 2026-09-11T02:20:13.136Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: `tasks/site-v2-storyboard.md`, §14 day-30 acceptance + §1 global elements.
Decision: D4 in [LEO-160 · ADR · v2 tooling decisions](<https://linear.app/leochai/issue/LEO-160/adr-v2-tooling-decisions-ratified-2026-09-11>) (ratified 2026-09-11).
Build order: M1 · Static story (day 30); child of LEO-58.

### Scope

* Configure Playwright Test projects: Chromium no-JS; Chromium JS + `@axe-core/playwright`; mobile + reduced-motion; Firefox/WebKit smoke.
* Run lychee offline link/fragment checking with `--include-fragments`, `--index-files`, and `--root-dir`, staging preview output under the real `/leochai-website/` prefix.
* Run html-validate on generated HTML. Run local Lighthouse CI as a diagnostic, not a release gate.
* Build a Python site-contract validator for expected canonical routes, translation groups, a legacy-URL fixture, canonical/hreflang reciprocity, sitemap-vs-routes, robots placement, and RSS via a pinned W3C feed validator plus policy assertions.
* Enforce the 500 KB cold-visit budget using encoded response bodies for all actually loaded resources, including every font, image and trace, at desktop + mobile, initial load AND post-scroll, for both production `/` and preview `/leochai-website/` targets.
* Provide one orchestration script: build once per target → validate that exact candidate artifact → promote the same bytes with a hash manifest. Include exit traps and keep reports outside the artifact.

### Key constraints

* Run locally/on NAS; no GitHub Actions.
* Never rebuild between validation and promotion; build, validate and promote each prefix target separately.
* Failed validation never touches the published checkout.
* Preserve `CNAME` and `.nojekyll`; use `scripts/publish.sh` with normal commit + push, no force-push.
* Reading remains independent of NAS: “server-rendered” means build-generated static HTML.

### Acceptance criteria

* Deliberate breakages are each caught: a broken link, a missing required zh route, a page exceeding the budget, and bad hreflang.
* A clean build validates and promotes; the hash manifest proves the promoted bytes match the validated candidate.
* Validation failure leaves the published checkout unchanged.
* A 404 probe passes with a real not-found response, with no SPA fallback masking a missing route.
* Both prefix targets pass the configured browser, link/fragment, HTML, site-contract and resource-budget checks.

Specification: requirements are reproduced here so this issue can be implemented from Linear.

## Contract bindings (2026-09-11)

* The route inventory, translation groups, alias and RSS policy assertions IMPLEMENT the contracts in LEO-112, LEO-113, LEO-128, LEO-129 — read those before extending fixtures; this issue owns the harness, they own the contracts.
* Fixtures must include: expected canonical route list (both locales), translation groups, legacy-URL fixture covering BOTH `/work/<slug>/` and `/notes/.../` aliases INCLUDING fragment deep-links (no-JS), and the 404 probe.
* Budget rule per ADR D4: Home initial load ≤500 KB excl. résumé is the only hard M1 gate; all other routes measured + recorded; non-Home numeric gates set at M1 review.

## Comments

No comments returned by Linear.
