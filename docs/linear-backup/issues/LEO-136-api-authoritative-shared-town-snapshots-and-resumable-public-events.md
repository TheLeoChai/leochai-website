# API · Authoritative shared-town snapshots and resumable public events

- Identifier: LEO-136
- Linear: https://linear.app/leochai/issue/LEO-136/api-authoritative-shared-town-snapshots-and-resumable-public-events
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: LEO-171, LEO-170
- Blocked by: LEO-165, LEO-143, LEO-144, LEO-131, LEO-142, LEO-60
- Related: None
- Created: 2026-09-10T22:32:24.901Z
- Updated: 2026-09-12T09:21:15.280Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope and gate

Reuse this child for read-only shared-town snapshot/event access, replacing episode-bound GET /api/demos/world/runs/{id} semantics. Exact route naming is documented during implementation; town identity is stable across viewers/restarts. Planning target 0.5–2 engineer-days. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Work and acceptance

* All clients read the same committed town: stable world ID, schema/revision/epoch, server timestamp, monotonic event sequence and authoritative visible objects/residents/activity. No GET/status/stream/reconnect starts inference, creates a run or claims a resident.
* Commit state and outbox atomically in Postgres (LEO-144/142); Redis Streams fan out. Fetch streaming with capability headers where needed, never tokens in query URLs. Public world projection is separate from capability-authorized conversation responses.
* Enforce LEO-131 approved visibility policy; conversation visibility is OPEN, suggested private text/public resulting actions is not approved. Never expose raw private conversation, private memories, credentials or an omniscient context dump. Selected public actions require committed provenance.
* Resume from last sequence; deduplicate and recover from a consistent snapshot plus sequence after trimming/gaps/server epoch change. Drop slow clients, bound buffers; no RQ worker per viewer. Keep existing ≤50 public streams and ≤2/session limits unless explicitly revised.
* Separate world freshness from model availability; queue/paused decisions do not falsify deterministic world actions. NAS/Redis interruption retains timestamped last-known state and static poster/readable fallback; no fabricated dialogue.
* RECORDED requires a real captured run/event history with timestamp/revision/provenance. The old authored 40-second trace is Illustration. Persistent town does not “complete an episode” to stop LIVE; state truth follows LEO-143.

## Dependencies / tests

Requires LEO-165 gate, LEO-144 authority, LEO-142 committed transport, LEO-143 state semantics and LEO-131 privacy projection. Test two clients see the same action/revision; duplicates and trimmed history converge; restart restores consistent snapshots; forbidden fields never serialize; reading/reconnecting incurs zero inference and no lease renewal. LEO-170 consumes the contract, LEO-171/172 verify end-to-end.

## Historical supersession

The old duplicated farm harness and episode-oriented paths were not implementation evidence. Three actors, six-decision episodes, memory reset, zero-viewer stop and public no-dialogue rules no longer apply. Existing NAS FastAPI/Postgres/Redis/RQ boundaries and unrelated Jobs/AI-Leo APIs remain effective.

## Comments

No comments returned by Linear.
