# Index · tooling decision ownership (decisions live in feature issues)

- Identifier: LEO-160
- Linear: https://linear.app/leochai/issue/LEO-160/index-tooling-decision-ownership-decisions-live-in-feature-issues
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: LEO-163, LEO-162, LEO-161, LEO-58, LEO-57, LEO-56, LEO-55, LEO-53, LEO-49, LEO-48
- Created: 2026-09-11T01:51:13.209Z
- Updated: 2026-09-12T09:27:25.094Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

# Tooling decisions — ownership index

Decisions ratified 2026-09-11 live in the issues that own them (per-feature milestones). This issue is only a pointer.

| Decision | Lives in |
| -- | -- |
| D1 · Build & bilingual routing (Eleventy, i18n, aliases, deploy) | LEO-48 |
| D2 · Motion & the timeline player | LEO-49 (component), LEO-55 (OpenCode application) |
| D3 · Little World visual prototype and persistent-town client | LEO-53 → LEO-163 / LEO-90 / LEO-91 / LEO-164 (prototype/review); LEO-170 (live client) |
| D4 · Acceptance harness & budget scope | LEO-58, child LEO-162 |
| D5 · Publishing backend (pyvips + nh3) | LEO-57 |
| D6 · Typography | LEO-49 → child LEO-161 |
| D7 · Visual/handoff history; latest town authority | docs/little-world-direction.md (prototype history); latest persistent-town requirements in LEO-62 and children, supplied facts in LEO-166 |

Milestones are per-feature; day-30/60/90 gates are carried by labels (or milestone descriptions). Superseded M1/M2/M3 milestones are kept empty.

## Current execution pointers — 2026-09-12

This is navigation/order only; decisions and acceptance remain in the feature-owning issues. No implementation/provisioning/deployment authorized in this documentation pass.

1. LEO-165 — feasibility/model-capacity gate, including supplied read-only source audit and effort estimate; LEO-131 — open privacy decision.
2. LEO-144 — shared authority/persistence and clock/restart policy; LEO-166 — five personas/layered context; LEO-167 — selected memories/relationships.
3. LEO-60/132/169 — accounting and bounded town admission/security; LEO-135 — text conversation and atomic five-minute idle lease; LEO-136/142/143 — snapshots/events/honest states.
4. LEO-168 — autonomous routines/validated planning; LEO-170 — live Canvas adapter.
5. LEO-171/172 — multi-client/restart, persuasion/injection/privacy/end-to-end evidence.
6. LEO-53/90/91/163/164 — preserve authored 40s Illustration and pending Leo visual verdict; LEO-76 — separate later Home integration following feedback.

LEO-59/130 remain shared NAS infrastructure owners. Historical episode limits are superseded for town; capacity/budget authority is in LEO-165/60/132, with unrelated budgets retained. LEO-50/114 keep Done implementation history; rejected Home is not an approved exemplar. Other feature scopes remain unchanged. No central ADR or duplicated product specification here.

## Comments

### Leo Chai - 2026-09-11T05:32:44.469Z

- Comment ID: 5eef2720-d7b3-425c-9adb-79c5dc4be3d1
- Updated: 2026-09-11T05:32:44.453Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Wave 1 + first Home design demonstration complete under the updated branch/squash policy. LEO-48, LEO-112, LEO-113, LEO-161, LEO-114, LEO-115 and the scoped LEO-50 first iteration are Done after merged PRs #1, #3–#8. Local main is synced at 937b966; feature branches removed. Existing user edits to contract docs remain preserved.

Home PR: https://github.com/TheLeoChai/leochai-website/pull/7
Final Foundation cleanup: https://github.com/TheLeoChai/leochai-website/pull/8
Review record: docs/wave1-review.md (merged).

Home H1–H6 is previewable in English and Chinese; Leo’s designated thread was notified immediately. Build, both prefixes, tests, exact-token/stylelint, de-slop, axe, no-JS, reduced-motion and 390/768/1440 screenshots pass. English Home 105,782 compressed bytes including 96,128 font bytes; Chinese 10,257 with no fonts. No external/backend/media request on Home.

CP2 remains pending Leo’s visual verdict. Bio/update/Notes and approved résumé are not fabricated; CJK display subsetting and real farm pixel art are iteration 2. No other Wave 2 lanes, production publishing, old-repo changes, CNAME addition or domain cutover performed.

---
