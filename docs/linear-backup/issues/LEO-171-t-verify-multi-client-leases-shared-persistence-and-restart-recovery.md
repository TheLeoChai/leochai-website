# T · Verify multi-client leases, shared persistence and restart recovery

- Identifier: LEO-171
- Linear: https://linear.app/leochai/issue/LEO-171/t-verify-multi-client-leases-shared-persistence-and-restart-recovery
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: None
- Blocks: LEO-172
- Blocked by: LEO-170, LEO-135, LEO-168, LEO-144, LEO-136, LEO-169
- Related: None
- Created: 2026-09-12T09:18:39.543Z
- Updated: 2026-09-12T09:18:39.882Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope

Scenario-based integration tests for the persistent town, using controlled clocks/model responses and multiple API/worker processes plus two browsers. Planning target 1–2 engineer-days; record reproducible evidence, not an implementation checklist. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Required scenarios / acceptance

1. Two browsers attach to the same town; one accepted resident action updates both to the same committed revision, object/inventory/activity and relationship effects, without duplicate inference.
2. Simultaneous conversation claims from different visitors/server processes yield exactly one winner for that resident. Another resident remains available; cross-capability writes fail.
3. Last accepted visitor message controls idle: just before 300 real-world seconds the hold remains, at 300 it expires. Assistant responses, stream/status heartbeats, invalid/rejected messages and duplicate retries do not renew. Explicit goodbye releases immediately.
4. Expiry/goodbye safely resumes or reassesses paused activity. Disconnection alone does not silently release; reconnect follows the explicitly decided semantics and cannot extend beyond idle without an accepted message.
5. Late model replies, delayed queued work and replayed capabilities after release/reclaim/version change cannot mutate world, plan, dialogue or memories. Include expiry while inference is in flight.
6. Restart API/world worker/Redis with claimed conversations and in-flight inference. Restore objects, inventory, activity, character/context references, relationships, memories, clock and reservations. Reconcile real-time expired leases; fence old workers and preserve unknown-sent budget reservations without replenishment.
7. Outbox retry, event duplication/history trimming and server epoch change recover clients from the authoritative snapshot. No public reset or viewer-count shutdown.
8. Zero viewers and model unavailability follow the documented LEO-144 clock/outage policy; recovery does not issue catch-up call storms or exceed approved admission.

## Dependencies / gate

Requires LEO-144, LEO-135, LEO-136, LEO-168, LEO-169, LEO-170. Freeze the world-clock/restart and reconnect semantics before tests encode them. Use deterministic fakes explicitly labeled as test fixtures; live provider smoke checks only after approved capacity/budget, and count attempts. Passing tests is not Leo's art/Home sign-off; no implementation or deployment in this documentation session.

## Comments

No comments returned by Linear.
