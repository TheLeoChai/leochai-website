# Verify day-90 grounded answers, privacy and complete visitor flows

- Identifier: LEO-72
- Linear: https://linear.app/leochai/issue/LEO-72/verify-day-90-grounded-answers-privacy-and-complete-visitor-flows
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-90
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-158, LEO-159
- Blocks: None
- Blocked by: LEO-67, LEO-68, LEO-69
- Related: None
- Created: 2026-09-10T20:24:49.302Z
- Updated: 2026-09-11T02:22:47.458Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: All H/G/J/T/L/O/N/P/S; optional G3/L3 rig if shipped; F1–F10
Build order: M3, step 7 (relative day 90 target).

Run the final bilingual visitor-flow audit, AI-Leo release evaluation and private-data audit across static artifacts, APIs and publishing. Confirm live failure/degradation, evidence labels, source corrections and optional-asset performance with recorded test receipts. Make an explicit ship/defer decision for PC and rig without making them blockers.

Key constraints

* No public OpenCode, arbitrary world steering, live scraping, long-term visitor memory, semantic embedding migration or standalone infra page.
* Global §10 cap remains 40/day, 6/min, one in flight with fixed feature allocations/$0 purchased inference; no inference on Home/page load.
* PC render/clip at most two days and interactive 3D deferred; Live2D ≤2 MB and rights-gated; domain/old-repo cutover requires separate approval.

Acceptance criteria (§14)

* §14 day 90 + checks 1–8: 24-question set and Leo review pass, otherwise free-form Q&A stays off; no invented facts/opinions or unsupported/private answers.
* No originals/drafts/secrets/private text/Jellyfin data in public output/history; owner-only flows remain authenticated; publishing hash/recovery verified.
* F1–F10, both locales, no JS/NAS, cached/replay states, phone/keyboard/reduced-motion/failed assets and transfer budgets pass; optional PC/rig explicitly shipped or deferred.

## Feature-section work breakdown

* [LEO-158 · M3 · Final bilingual visitor flows and release acceptance](<https://linear.app/leochai/issue/LEO-158/m3-final-bilingual-visitor-flows-and-release-acceptance>)
* [LEO-159 · §13 · Risk decisions and release exclusions](<https://linear.app/leochai/issue/LEO-159/13-risk-decisions-and-release-exclusions>)

## User-flow acceptance specs (§12)

* **F1 · 90-second lead:** H1 identity → H2 resolved specimen → H3 accomplishments → H4 farm image → H5 person → H6 contact. Zero required clicks or inference.
* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F3 · Farm sharer:** `/<lang>/work/tiny-world/#live` → captured farm immediately → join/reserve episode → resident observation → adaptation label.
* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F5 · Casual explorer:** gallery → PC clip → recipe → RSS. Engineering knowledge optional.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.
* **F9 · Publish dinner:** private Discord photos/text → draft → private preview → one Publish click → verified article link. No terminal/Markdown editing.
* **F10 · Owner evening:** Tailscale → private launchpad → existing Jellyfin sign-in. No public-site payload.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-159 — §13 · Risk decisions and release exclusions
2. LEO-158 — M3 · Final bilingual visitor flows and release acceptance

## Comments

No comments returned by Linear.
