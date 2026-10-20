# T · Persist the authoritative shared town and define clock/restart semantics

- Identifier: LEO-144
- Linear: https://linear.app/leochai/issue/LEO-144/t-persist-the-authoritative-shared-town-and-define-clockrestart
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: LEO-186
- Blocks: LEO-136, LEO-135, LEO-171, LEO-168, LEO-167
- Blocked by: LEO-165, LEO-142, LEO-132
- Related: LEO-53, LEO-185
- Created: 2026-09-10T22:33:02.697Z
- Updated: 2026-09-26T06:55:22.656Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope and gate — 2026-09-12

Reuse this existing engine child for a bounded authoritative state/persistence slice, planning target 1–2 engineer-days after clock policy is resolved; split if needed. Single shared persistent NAS town, five Leo facets, no per-viewer worlds or predetermined replay. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Decide before implementation

Document world time scale/timezone, deterministic tick/progress unit, how due actions are ordered and how wall-clock gaps/restarts are handled. Continuous simulation is desired; exact offline catch-up policy is OPEN. Explicitly decide whether/how safe ongoing actions advance during downtime, limits on catch-up, skipped/rescheduled decision boundaries and handling of commitments. Do not invent a user-approved policy. Conversation idle is always real-world 300 seconds independent of simulation clock (LEO-135).
Document safe deterministic ongoing-action behavior during model outage; decisions requiring inference remain honestly queued/paused. No fabricated dialogue, inference-LIVE implication, accumulated missed-tick calls or catch-up quota bypass.

## Work and acceptance

* Audit reuse through LEO-165, then persist stable town/object/resident IDs, world revision/epoch, tick position and schema version in Postgres. Objects, inventory, activities/progress, resident state, relationships/selected-memory references survive restart; memory selection lives in LEO-167.
* One authoritative mutation path across server processes: transaction/optimistic version and fenced writer ownership, with state and event outbox committed atomically. Redis is coordination/cache, never sole world truth.
* Typed model intent is input only. Validate allowed existing action/target IDs, range, capacity/inventory and preconditions against current committed state; apply deterministic rules or record rejection/provenance without impossible mutation. Define initial allowed-action catalog with LEO-168; public visitors cannot call it directly.
* Idempotent ticks/jobs and recovery preserve shared state without duplicate inventory/actions/events. Restore pending activity, conversation reservations/lease versions and durable inference reservation references; LEO-135/132 own reconciliation, including unknown-sent attempts.
* Viewer arrival/departure never creates/resets/stops the town or multiplies model work. World storage/progress can operate independently of model availability. Queued inference requires admission, not one call per frame.
* Publish redacted snapshots/events through LEO-136/142 with revision and monotonic sequence; private conversation/memory never enters public truth by default or accident.

## Tests / dependencies

Depends on LEO-165 gate; coordinate LEO-132 durable reservations and LEO-142 outbox contract. Implement storage before the consuming API/renderer, not after them. Test two writers racing (one commit), restart with nonempty inventory/ongoing activity, duplicate jobs, atomic outbox replay, invalid LLM action rejection and zero viewers. LEO-171 adds multi-browser/restart evidence after LEO-135/136; LEO-172 adds injection/end-to-end checks.

## Historical contract superseded

The former farm harness here specified three residents, six decisions ≥45s apart, ≤6-minute episodes, a 60s zero-viewer shutdown, memory reset, eight attempts/episode, two/day, no visitor dialogue and only a fixed farm menu. Those are historical only; the 40s authored renderer is separately LEO-90. This amendment preserves the issue/status/history; no completed autonomous engine is claimed. Shared unrelated budgets/security remain under LEO-59/60/61 and children.

## Comments

### Leo Chai - 2026-09-26T06:34:56.001Z

- Comment ID: c1982754-34bf-421e-97d5-5b499364aa85
- Updated: 2026-09-26T06:34:55.983Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Sequencing note: [LEO-185](https://linear.app/leochai/issue/LEO-185/offline-one-resident-decision-to-validated-world-action-loop) will prove a private, deterministic in-memory one-resident validation/commit loop with versioned events. This is deliberately before durable storage: this issue still owns authoritative persistence, shared concurrency, clock/restart semantics and eventual integration. No restart or persistent-world claim follows from the offline child; status remains unchanged.

---
