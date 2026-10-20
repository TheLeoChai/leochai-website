# Verify day-60 concurrency, failure recovery and accounting gates

- Identifier: LEO-65
- Linear: https://linear.app/leochai/issue/LEO-65/verify-day-60-concurrency-failure-recovery-and-accounting-gates
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-150
- Blocks: LEO-151, LEO-66
- Blocked by: LEO-63, LEO-64, LEO-62
- Related: None
- Created: 2026-09-10T20:24:09.780Z
- Updated: 2026-09-11T02:22:16.790Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: H4/T2–T5/J4/O1–O6; §10–§12; F2/F3/F6/F8
Build order: M2, step 7 (relative day 60 target).

Exercise the integrated farm and Jobs flows under shared viewers, competing sessions, quota exhaustion and infrastructure failure. Reconcile ledger/reservations through interruption and restart, and verify stream recovery and live/recorded transitions across locales. Record pass/fail evidence and keep affected admission disabled until gates pass.

Key constraints

* Global daily ceiling 40, six/minute, one in flight; per-feature budgets remain separate across locales, retries and probes count, no paid fallback.
* No public coding instance or fourth inference surface; public readers always retain bundled story, transcripts and replay.
* Do not promote 202, connection, cached scores or illustration to LIVE; failed live work retains actual completed stages.

Acceptance criteria (§14)

* §14 day 60 + checks 2–5, 8: rejection/timeout, shared viewers, isolated Jobs actions, idempotency, worker interruption, Redis restart, 429/model retirement and NAS/provider outage pass.
* Farm one writer/observation isolation/zero-viewer shutdown/deterministic committed replay/SSE resume and Jobs provenance/filter/rerun/demo-only Apply pass.
* Both locales and mobile/reduced-motion views remain useful under failure without budget or cross-session bypass.

## Feature-section work breakdown

* [LEO-150 · M2 · Concurrency, accounting, isolation and recovery acceptance](<https://linear.app/leochai/issue/LEO-150/m2-concurrency-accounting-isolation-and-recovery-acceptance>)

## User-flow acceptance specs (§12)

* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F3 · Farm sharer:** `/<lang>/work/tiny-world/#live` → captured farm immediately → join/reserve episode → resident observation → adaptation label.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-150 — M2 · Concurrency, accounting, isolation and recovery acceptance

## Comments

No comments returned by Linear.
