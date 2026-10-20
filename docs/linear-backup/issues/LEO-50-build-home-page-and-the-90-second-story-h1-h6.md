# Build Home page and the 90-second story (H1–H6)

- Identifier: LEO-50
- Linear: https://linear.app/leochai/issue/LEO-50/build-home-page-and-the-90-second-story-h1-h6
- Status: Done
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Home
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-76, LEO-73, LEO-74, LEO-75, LEO-77, LEO-78
- Blocks: LEO-129, LEO-128, LEO-58
- Blocked by: LEO-48, LEO-49
- Related: None
- Created: 2026-09-10T20:21:38.289Z
- Updated: 2026-09-12T05:15:47.306Z
- Completed: 2026-09-11T05:26:07.015Z
- Due date: None
- Cycle: None
- Archived: None

## Description

## Current authority — 2026-09-12

Read docs/little-world-direction.md. Wave 1 Home was rejected as a résumé/document/Claude artifact; CP2 is not approved. Little World prototype FIRST, without old Home CP2 dependency. NOW bundled deterministic prototype on /en/work/tiny-world/ and /zh/work/tiny-world/ (retain #live); NEXT independent initial/revised visual review and Leo feedback, then future Home integration; LATER shared episodes/gateway with existing budgets/security/accounting unchanged. Blue off-white, purple ink, pastels/turquoise and subtle Miku hints retained. Sharp edges, hard shadows, forced grid breaks, gradient/word bans and two-pass cap are not requirements.

Preserve Done and merged PR history. This is historical implementation, not visual approval. Future Home redesign is tracked by unfinished LEO-76 after Little World feedback; earlier Home-first / postcard requirements below are superseded.

## Preserved historical / future specification

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: H1–H6; F1/F6/F7/F8
Build order: M1, step 3 (relative day 30 target).

Ship both Home locales with the positioning line, immediate résumé/email, resolved identity specimen, three direct case-study cards, farm postcard, authored introduction and latest Notes. Include the uncertain-pair swap and a real dated personal update. Use a static farm still for M1; M2 adds passive attachment to an existing episode.

Key constraints

* No model calls or run creation on Home; initial compressed transfer ≤500 KB excluding optional résumé; no video, WebGL or Live2D download.
* Remove the unsupported 3,799-jobs claim; use evidence-backed '7 synthetic observations → 3 canonical jobs; rerun adds 0' only with explicit synthetic label.
* Only supplied/approved personal statements and credited imagery; farm capture/illustration and execution labels remain truthful.

Acceptance criteria (§14)

* §14 checks 1–2, 8: reader identifies Leo, three projects, email and résumé without clicking; all H1–H6 content readable without JS/NAS in both locales.
* Verify mobile/keyboard, Home transfer ceiling and direct case-study links without requiring the gallery.

## Feature-section work breakdown

* [LEO-73 · H1 · Identity, positioning and immediate contact](<https://linear.app/leochai/issue/LEO-73/h1-identity-positioning-and-immediate-contact>)
* [LEO-74 · H2 · Resolved identity specimen and uncertain-pair swap](<https://linear.app/leochai/issue/LEO-74/h2-resolved-identity-specimen-and-uncertain-pair-swap>)
* [LEO-75 · H3 · Three proof-backed project cards](<https://linear.app/leochai/issue/LEO-75/h3-three-proof-backed-project-cards>)
* [LEO-76 · H4 · Passive farm postcard](<https://linear.app/leochai/issue/LEO-76/h4-passive-farm-postcard>)
* [LEO-77 · H5 · Authored personal introduction and dated update](<https://linear.app/leochai/issue/LEO-77/h5-authored-personal-introduction-and-dated-update>)
* [LEO-78 · H6 · Latest Notes and contact](<https://linear.app/leochai/issue/LEO-78/h6-latest-notes-and-contact>)

## User-flow acceptance specs (§12)

* **F1 · 90-second lead:** H1 identity → H2 resolved specimen → H3 accomplishments → H4 farm image → H5 person → H6 contact. Zero required clicks or inference.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-73 — H1 · Identity, positioning and immediate contact
2. LEO-74 — H2 · Resolved identity specimen and uncertain-pair swap
3. LEO-75 — H3 · Three proof-backed project cards
4. LEO-76 — H4 · Passive farm postcard
5. LEO-77 — H5 · Authored personal introduction and dated update
6. LEO-78 — H6 · Latest Notes and contact

## Comments

### Leo Chai - 2026-09-11T04:30:54.983Z

- Comment ID: 7aa68d2e-f5f6-4654-b4ba-9eadb735e931
- Updated: 2026-09-11T04:30:54.969Z
- Parent comment: None
- Resolved: None
- On behalf of: None

CP1 approved; Home is the first design demonstration for CP2. This run includes H1–H6 in both locales, synthetic 7→3 fixture labeling, and an explicitly illustrated placeholder farm. Approved bio, dated update, Notes titles and résumé are not present in this repo; keep TODO(LEO) placeholders and never fabricate personal content. No other Wave-2 feature fan-out before Leo sees this exemplar.

### Leo Chai - 2026-09-11T05:24:51.930Z

- Comment ID: bb632921-c144-411d-a797-9844bef13cca
- Updated: 2026-09-11T05:24:51.914Z
- Parent comment: None
- Resolved: None
- On behalf of: None

First Home iteration is previewable: https://8dc50facc277c1ea7665-8080-tunnel.kimaki.dev/ (Chinese /zh/). Leo’s designated thread was notified immediately after the passing build/tunnel.

Review diff: https://critique.work/v/33e187459baa578d8d66e6b8e66c019c
Branch commit: fe519eecc8dc1bb2745f5821406cfa94a21e617c. Separate builder and orchestrator review completed.

Gates passed: production and preview-prefix builds, all Node tests, exact tokens/stylelint, de-slop content gate; independent axe and screenshots in en/zh at 390/768/1440 with zero violations/errors/overflow; keyboard Enter/Space swap retains focus; all links/buttons meet 44px; all six scenes and both identity examples readable with no JS, failed enhancement, or blocked fonts; reduced-motion static baseline. English transfer estimate 105,782 bytes (fonts 96,128); Chinese 10,257 (fonts 0), zero external/backend/media requests.

Two screenshot critique passes only: pass 1 added the missing decorative saturated accent and exact text spacing; final pass confirmed hierarchy, asymmetric cards and farm bleed. Parent copy review removed unsupported opinion-like wording. Canonical shared card title target corrected to 44px.

User-authorized iteration limits: visible TODO biography/update/Notes, résumé request instead of fabricated PDF, farm Illustration (not a capture), case-study routes remain structural. F1/F6/F7 static flow verified; NAS independent Home verified. CP2 remains Leo’s design checkpoint; no Wave 2 fan-out or production publication.

### Leo Chai - 2026-09-11T05:26:45.355Z

- Comment ID: a966ba6c-388b-422d-8051-2fe1b43571f7
- Updated: 2026-09-11T05:26:45.328Z
- Parent comment: None
- Resolved: None
- On behalf of: None

First iteration squash-merged as PR #7: https://github.com/TheLeoChai/leochai-website/pull/7 (f5f12c5fa31e55862b1357101cc84a7cd79714a6). Remote/local feature branch deleted after merge. Done refers to the explicitly scoped Home first iteration; CP2 visual sign-off, authored content and later live farm work remain pending. No production publish.

---
