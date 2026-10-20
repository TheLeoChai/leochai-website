# API · Resident text conversation, atomic ownership and five-minute idle lease

- Identifier: LEO-135
- Linear: https://linear.app/leochai/issue/LEO-135/api-resident-text-conversation-atomic-ownership-and-five-minute-idle
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: LEO-173
- Blocks: LEO-168, LEO-171, LEO-170
- Blocked by: LEO-169, LEO-165, LEO-144, LEO-131, LEO-60
- Related: None
- Created: 2026-09-10T22:32:20.759Z
- Updated: 2026-09-12T20:39:54.772Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Current route ownership — persistent town

Replace the old public POST /api/demos/world/runs create/join-episode contract with resident conversation claim/message/goodbye operations on the existing shared town. Exact route names/request schemas are an implementation contract to document here; no world creation/reset endpoint. This reuses the existing API child rather than adding a duplicate. Planning target 1–2 engineer-days for server lease/API slice; split transport/UI separately (LEO-170). Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Agreed behavior

* Visitors TALK only, text baseline; no microphone/audio requirement. No object manipulation, rain/reset, steering API or arbitrary code/file/network access. Persuasion can affect allowed resident plans; refusal/reconsideration is valid.
* Each resident supports one visitor conversation at a time across every server process. Other visitors cannot talk to that resident while held and may approach another. Use server-atomic ownership with an unforgeable resident-scoped capability and lease/fencing version, not an in-memory per-worker flag.
* Accepted visitor speech/message sets last_accepted_visitor_message_at using server real time. At exactly 300 real-world seconds with no accepted visitor message, the hold is invalid and ends. Model responses, heartbeats, watching, transport reconnect, rejected payloads and duplicate message retries do not extend it. Never tie idle to simulation ticks.
* Explicit goodbye releases immediately and idempotently. Safely interrupt/pause current activity on claim; after release/expiry resume or reassess with engine validation. No promise the resident must obey persuasion.
* Validate ownership/version/expiry atomically when accepting a message and again before applying any queued/model result. Fence late replies from changing world, plan, memories or published dialogue after lease/version change. Define idempotency keys for claims/messages/releases and consistent busy/expired/invalid responses.
* Persist/recover reservation, owner, last accepted message time and fencing version; API/worker/Redis restart cannot duplicate ownership or extend idle. Expired reservations are reconciled from durable server timestamps before any accepted write, even if a sweeper/job is delayed.
* Disconnect is NOT silently immediate release. Decide authenticated reconnect behavior explicitly before implementation: capability reattachment/rotation, lost-capability handling and server-restart fence recovery, always bounded by the five-minute visitor-idle deadline. Reconnect itself cannot renew.
* Decide initial claim semantics (atomic claim with first accepted message, or explicit pre-message hold policy) so an empty claim cannot invent unlimited idle. This is OPEN implementation design, not a change to the agreed five-minute rule.
* One-resident-per-visitor, max-active-session fairness cap and absolute maximum duration are PROPOSALS awaiting Leo, not acceptance requirements. Conversation visibility is OPEN in LEO-131; private text/public resulting actions is only suggested.

## Security / integration acceptance

Exact-origin checks plus capabilities, bounded payloads/rates/finite queues; no raw private conversation logging or privileged worker credentials. LEO-169 handles inference admission after model/privacy gates. Public snapshots expose only approved state; capability-authenticated private responses must not leak to other visitors. Postgres authority/Redis coordination/RQ on existing NAS; static Pages frontend remains unchanged in architecture.

## Tests / dependencies

Depends on LEO-165, LEO-144 state/fencing, LEO-131 privacy and LEO-169 admission before public inference. Coordinate LEO-168 pause/resume.
Tests: simultaneous cross-process claims yield one winner; another resident can be approached; only accepted message renews; 299.999s vs 300s boundary; goodbye immediate; expiry resumes/reassesses activity; stale reply after expiry/reclaim cannot mutate; reconnect/restart/delayed jobs preserve exact idle and reservations; cross-resident capabilities/replayed messages fail. LEO-171 owns full scenario evidence.

## Historical supersession

Former fixed-scenario shared-episode reservation, no dialogue, three actors, six decisions/six minutes, zero-viewer stop and episode memory reset are obsolete town acceptance, preserved only in issue history. No implementation/status change is implied.

## Comments

### Leo Chai - 2026-09-12T20:39:54.790Z

- Comment ID: 1125d2ae-6321-4de8-8494-727691ec348c
- Updated: 2026-09-12T20:39:54.772Z
- Parent comment: None
- Resolved: None
- On behalf of: None

LEO-173 merge boundary evaluated against current head c6bbbea and independent Opus review5648322072 plus correction5648335514. Its trusted internal database-only callback scope may merge; this does not deliver this endpoint. Before any integration exposure, this owner must close: callbacks must not commit/rollback/close or modify reservation ownership/timestamp rows; post-commit assertions are detection only and cannot undo a durable write. Prefer bounded typed engine mutations owned by transaction coordinator rather than exposing Session to model/visitor-derived callbacks; enforce unchanged lease row and revalidate world/resident/lease versions within the same transaction. Pin/document READ COMMITTED or implement intentional serialization retry semantics. Validate finite known resident IDs before store calls; reject forged unknown residents without creating rows; set operation/event retention under LEO-131 and check migration/ORM parity. Retain explicit tests for each boundary. LEO-169 owns admission/retention abuse controls; LEO-144/168 consume safe mutation seam. Initial claim/reattach semantics remain OPEN for public behavior; only accepted-first-message synthetic convention is authorized. Existing parent blockers remain unchanged; no endpoint/deployment or privacy approval is inferred.

---
