# Enforce durable free-model reservations, quotas and kill switches

- Identifier: LEO-60
- Linear: https://linear.app/leochai/issue/LEO-60/enforce-durable-free-model-reservations-quotas-and-kill-switches
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-133, LEO-132
- Blocks: LEO-143, LEO-142, LEO-141, LEO-140, LEO-139, LEO-138, LEO-137, LEO-136, LEO-135, LEO-134, LEO-61
- Blocked by: LEO-59
- Related: None
- Created: 2026-09-10T20:23:48.130Z
- Updated: 2026-09-12T09:26:02.477Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Persistent-town capacity amendment — 2026-09-12

LEO-165 gates actual NAS capacity/model choice before any town backend/inference provisioning. Continuous LLM-directed life exceeds the OLD 40-attempt/day plan; the old farm allocation/episode/token plan below is HISTORICAL for the superseded town. No replacement town allocation or increased spend is authorized. Jobs 12/day (3/run), AI-Leo 8/day (1/answer), polish 2/day and verification 2/day, their token/session caps, $0 purchased-inference policy and existing account-wide ceilings remain effective until explicitly changed. No allocation transfer, paid fallback or new capacity. A suitable local route needs the audit; any external route needs explicit Leo approval of budget/latency/privacy. LEO-169 owns bounded town admission and outage handling after that gate.

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: §10 matrix and budget; §11 inference gateway; T3/J4/L3/P3
Build order: M2, step 2 (relative day 60 target).

Implement a server-only inference gateway with atomic pre-enqueue Redis reservations backed by a durable Postgres attempt ledger and idempotent receipts. Enforce global/feature/session limits, deadlines, explicit retries, conservative unknown-attempt accounting and fail-closed deployment model selection. Verify actual provider allowance, route price, privacy policy and competing account usage before enabling any free route.

Key constraints

* $0 purchased inference; ≤40 upstream attempts/UTC day, ≤6/minute, one globally in flight; no paid fallback/top-up/key rotation, automatic allocation transfer or implicit SDK retries.
* Historical superseded farm allocation: 16/day at 2,000/256, not authority for persistent town. Active unrelated allocation/tokens per attempt: Jobs 12 at 3,000/500; Leo 8 at 2,500/400; polish 2 at 4,000/1,000; counted verification probes 2 at 3,000/500; total ≤102,000 input/16,296 output.
* Historical superseded farm reservation: 8/episode max 2/day. Active unrelated run reservations: Jobs 3/run max 4 fresh/day; Leo 1/answer max 8/day/no retry; polish 1/post max 2/day.
* Signed-session and hashed-IP caps: 1 fresh Jobs/day, 2 Leo/day, historical farm-create cap no longer applies to persistent town (no public world creation); watching/replay free. Reduce caps for provider/account limits, honor 429/Retry-After, circuit-break exhaustion/errors, retired model fails closed.

Acceptance criteria (§14)

* §14 check 3/day 60: concurrent creation, retries, worker interruption, Redis restart, 429, model retirement and malformed JSON cannot replenish/bypass quota or make paid calls.
* Full reservation precedes enqueue; no refund of unknown sent attempts; provider exhaustion/kill switch leaves clear recorded fallback and no unverified reset promise.
* Deployment pins verified free IDs/provider policy; browser cannot choose provider/model/key.

## Feature-section work breakdown

* [LEO-132 · §10 · Durable budget ledger, reservations and admission limits](<https://linear.app/leochai/issue/LEO-132/10-durable-budget-ledger-reservations-and-admission-limits>)
* [LEO-133 · §10 · Feature operating matrix and honest degradation](<https://linear.app/leochai/issue/LEO-133/10-feature-operating-matrix-and-honest-degradation>)

## User-flow acceptance specs (§12)

* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F3 · Persistent-town visitor:** `/<lang>/work/tiny-world/#live` → readable poster → same authoritative persistent town → talk to an available Leo facet → observe permitted resulting actions. No episode creation/reset; conversation visibility awaits LEO-131.
* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F8 · NAS/quota failure:** honest timestamped/static world or separately labeled Illustration, recorded pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-132 — §10 · Durable budget ledger, reservations and admission limits
2. LEO-133 — §10 · Feature operating matrix and honest degradation

Town-specific acceptance: LEO-165 decision precedes provisioning; LEO-169 uses finite queue/rates/deadlines and conservative durable admission without borrowing unrelated budgets. Restart preserves reservations; unknown-sent calls stay counted. Model downtime never produces catch-up call storms, quota bypass or fake LIVE speech. World persistence need not stop with inference. Privacy visibility remains OPEN under LEO-131.

## Comments

No comments returned by Linear.
