# Implement J4 bounded live pipeline chat, outbox and review actions

- Identifier: LEO-63
- Linear: https://linear.app/leochai/issue/LEO-63/implement-j4-bounded-live-pipeline-chat-outbox-and-review-actions
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Job Matching
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-145
- Blocks: LEO-150, LEO-65
- Blocked by: LEO-52, LEO-61
- Related: None
- Created: 2026-09-10T20:24:01.357Z
- Updated: 2026-09-11T02:22:08.440Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: J4 #preview; J2/J3/J5 evidence; F2; §11 Jobs routes
Build order: M2, step 5 (relative day 60 target).

Call the pinned real job-agent adapter from RQ on a synthetic candidate and seven bundled observations in one temporary SQLite database per run. Stream committed normalization, identity, eligibility, validated scoring, website outbox acknowledgement and review events into the chat. Add session-isolated Apply/Skip/Open, repeat ingestion and an allowlisted threshold adjustment that reuses cached scores.

Key constraints

* Header states 'Live pipeline run on bundled sample jobs; website delivery adapter'; no visitor résumé, arbitrary URLs, live scraping, real DB or Discord delivery claim.
* Two eligible canonical jobs plus one deterministic rejection; ≤3 attempts/run (two scores+one shared retry), ≤4 fresh/day/12 attempts; ≤3,000 input/500 output, 90s deadline; SQLite/run expires after 1h.
* Apply only marks approved in demo/no application; Open shows bundled posting. Re-ingestion preserves IDs/no duplicate card; threshold/rerun adds no new model request.
* Cache evidence+candidate+provider/model+prompt/schema; reused inference is RECORDED with time within live deterministic work. Malformed/unavailable score remains incomplete; preserve completed stages and separate recorded replay.

Acceptance criteria (§14)

* §14 checks 3–4/day 60: seven observations retain provenance/requisition conflict/filter reasons; only eligible jobs score; no duplicate notification/card on repeat.
* Session isolation, idempotent reservation/actions, cached rerun/threshold and expiration pass; no external application/Discord effect.
* Provider, quota, malformed output and stage failures stay visible with actual partial work and truthful mixed cache/live labels.

## Feature-section work breakdown

* [LEO-145 · J4 · Full bounded live pipeline, outbox, review and cache contract](<https://linear.app/leochai/issue/LEO-145/j4-full-bounded-live-pipeline-outbox-review-and-cache-contract>)

## User-flow acceptance specs (§12)

* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-145 — J4 · Full bounded live pipeline, outbox, review and cache contract

## Comments

No comments returned by Linear.
