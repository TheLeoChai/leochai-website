# Verify day-30 static release and prepare apex-domain runbook

- Identifier: LEO-58
- Linear: https://linear.app/leochai/issue/LEO-58/verify-day-30-static-release-and-prepare-apex-domain-runbook
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-129, LEO-128, LEO-162
- Blocks: LEO-131, LEO-130, LEO-59
- Blocked by: LEO-51, LEO-56, LEO-57, LEO-50, LEO-53, LEO-54, LEO-52, LEO-55
- Related: LEO-160
- Created: 2026-09-10T20:23:38.362Z
- Updated: 2026-09-11T02:19:56.094Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: All M1 H/G/J/T/L/O/N/P scenes; §1 routes; F1–F9 static paths
Build order: M1, step 11 (relative day 30 target).

Run the full static artifact through bilingual story, resilience, accessibility and publishing checks. Inspect the domain/documentation discrepancy and prepare the apex-based release runbook with restored required CNAME if absent. Record actual evidence and content gaps so the static release does not depend on live demos, PC or a rig.

Key constraints

* Preserve [leochai.com](<http://leochai.com>) and .nojekyll; validate both production and repository preview bases; [publish.sh](<http://publish.sh>) only, no Actions or force-push.
* Do not change the old [TheLeoChai.github.io](<http://TheLeoChai.github.io>) repository without separate Leo approval after artifact review.
* No unsupported metrics/captures or false LIVE; no backend runtime in site/ and no NAS dependency for reading.

Acceptance criteria (§14)

* §14 day 30 + checks 1–2, 7–8: both roots/core deep links and available-locale articles pass with JS disabled and NAS disconnected; Home ≤500 KB.
* Reader sees identity/three projects/contact without clicking; each case has result/limit/authorship; motion works as stills.
* Successful draft publication and failed-build preservation are demonstrated; domain cutover remains a separate approval step.

## Feature-section work breakdown

* [LEO-128 · M1 · Day-30 static story and publishing acceptance gate](<https://linear.app/leochai/issue/LEO-128/m1-day-30-static-story-and-publishing-acceptance-gate>)
* [LEO-129 · §1 · Apex-domain release artifact and discrepancy runbook](<https://linear.app/leochai/issue/LEO-129/1-apex-domain-release-artifact-and-discrepancy-runbook>)

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

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (D4 — acceptance harness):**

* Playwright Test, projects: Chromium no-JS; Chromium JS + `@axe-core/playwright`; mobile + reduced-motion; Firefox/WebKit smoke.
* lychee primary link/fragment checker: offline, `--include-fragments`, `--index-files`, `--root-dir`, staged under the real `/leochai-website/` prefix. html-validate on generated HTML. Local Lighthouse CI = diagnostic, not release gate.
* Custom Python site-contract validator: expected canonical routes + translation groups + legacy-URL fixture (`/work/` AND `/notes/` aliases, fragment deep-links, no-JS); canonical/hreflang reciprocity; sitemap-vs-routes; robots placement; RSS via pinned W3C feed validator + policy assertions.
* Budget scope: HARD M1 gate = Home (`/`, `/en/`, `/zh/`) initial compressed transfer ≤500 KB excluding optional résumé (storyboard §1). Every other core route: cold-visit encoded bytes MEASURED + RECORDED (initial + post-scroll, desktop + mobile, both prefixes, all loaded resources). Non-Home numeric gates set at M1 review from measurements.
* Workflow: one build per target → validate that exact artifact → promote same bytes (hash manifest). Exit traps; reports outside artifact; failed validation never touches the published checkout.

**Build steps (in order):**

1. LEO-162 — build the harness itself (fixtures per contract bindings in that issue).
2. LEO-129 — apex-domain release artifact + discrepancy runbook.
3. LEO-128 — run the day-30 acceptance gate end-to-end against the promoted candidate.

## Comments

No comments returned by Linear.
