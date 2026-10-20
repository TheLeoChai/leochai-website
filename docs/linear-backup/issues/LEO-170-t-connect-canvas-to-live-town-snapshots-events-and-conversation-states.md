# T · Connect Canvas to live town snapshots, events and conversation states

- Identifier: LEO-170
- Linear: https://linear.app/leochai/issue/LEO-170/t-connect-canvas-to-live-town-snapshots-events-and-conversation-states
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-53
- Sub-issues: None
- Blocks: LEO-172, LEO-171
- Blocked by: LEO-136, LEO-91, LEO-143, LEO-135, LEO-131
- Related: None
- Created: 2026-09-12T09:18:24.093Z
- Updated: 2026-09-12T09:18:24.414Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope

Add the live adapter to existing licensed art/Canvas bilingual Tiny World pages at /en/work/tiny-world/ and /zh/work/tiny-world/ (retain #live). Planning target 1–2 engineer-days for one end-to-end client adapter; no Home integration (LEO-76 owns that later). Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Work and acceptance

* Existing LEO-90/91 renderer is a prototype driven by an authored 40-second JSON trace, not an autonomous world engine. Reuse licensed assets/Canvas UI; authoritative snapshots plus committed event stream replace fixture-clock truth for live mode. Client interpolation is presentation only, never authoritative actions.
* All visitors attach to the same persistent town identity/revision. Apply monotonic sequences, deduplicate events, resume from last sequence and replace with snapshot after history trimming/server epoch change. No per-viewer world creation; reconnect never resets the town.
* Show five Leo facets with text chat baseline, available/busy resident state and accessible claim/message/goodbye flow. One visitor conversation per resident; busy visitors may approach another resident. No microphone/audio requirement, object manipulation, rain/reset/steering API or arbitrary execution.
* Display authoritative lease expiry/busy state; only accepted visitor speech/message extends the exact five-real-minute idle hold. Heartbeats/model responses do not. Reconnect follows LEO-135's explicitly decided semantics; do not release immediately on socket loss.
* Follow LEO-131's decided conversation visibility; do not assume public text. Explain persistent selected memories and provider/retention policy before sending.
* Separate server/world freshness from inference status: fresh deterministic actions can continue per policy while decisions are queued/paused; never fake dialogue or imply inference LIVE because the socket is up. NAS/model outage leaves readable poster/static fallback and an honest last-known timestamp.
* Keep fixed trace separately labeled Illustration, never RECORDED unless genuinely captured from a real run with provenance. Playback controls affect only the illustration or local presentation, never town truth.
* Keep static Pages frontend; first-paint poster, no-JS/readable fallback, reduced motion, pauseable local motion, keyboard/44px targets, both locales/base paths and measured loading budgets. Avoid every-tick screen-reader announcements. Existing visual art review/Leo verdict remains pending in LEO-164.

## Dependencies / tests

Depends on LEO-91 reusable prototype, LEO-136 snapshots/events, LEO-135 talk/lease, LEO-143 state semantics and LEO-131 privacy. Verify two browsers see one action; duplicate/gapped/late events and reconnect converge; busy/expiry/goodbye states match server; fixture cannot be mistaken for LIVE; model/NAS outage preserves static fallback. Live activation also requires the town scenario/security release checks.

## Comments

No comments returned by Linear.
