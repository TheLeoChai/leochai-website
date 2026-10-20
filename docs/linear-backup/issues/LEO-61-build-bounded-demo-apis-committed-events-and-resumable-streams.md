# Build bounded demo APIs, committed events and resumable streams

- Identifier: LEO-61
- Linear: https://linear.app/leochai/issue/LEO-61/build-bounded-demo-apis-committed-events-and-resumable-streams
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-135, LEO-143, LEO-142, LEO-134, LEO-136, LEO-137, LEO-138, LEO-139, LEO-140, LEO-141
- Blocks: LEO-154, LEO-153, LEO-152, LEO-145, LEO-67, LEO-63, LEO-62
- Blocked by: LEO-60
- Related: None
- Created: 2026-09-10T20:23:52.371Z
- Updated: 2026-09-12T09:26:06.853Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Persistent-town API amendment — 2026-09-12

The shared world is persistent, not an episode. LEO-165 gates town provisioning; LEO-144 owns authority/restart, LEO-135 owns text talk/atomic five-minute lease, LEO-136 owns shared snapshots/events, LEO-169 admission, LEO-131 unresolved privacy, and LEO-170 the client. Jobs/AI-Leo routes and budgets remain unchanged. No code/deployment in this documentation pass.

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: §11 API/state transitions; H4/T3/J4/L3; F3/F8
Build order: M2, step 3 (relative day 60 target).

Implement shared API admission/status conventions and transactional state/event outbox feeding bounded Redis Streams. Serve redacted world snapshots and capability-authorized Jobs snapshots/SSE, with sequence-based reconnect and snapshot recovery after trimming. Reuse state components to reflect committed execution, queueing, staleness, completion and replay accurately.

Key constraints

* Routes: GET /api/demos/status; persistent-town reads/events (LEO-136) and resident claim/message/goodbye (LEO-135; exact paths specified there before implementation). Historical POST /api/demos/world/runs no longer creates/joins episodes. Jobs POST /api/demos/jobs/runs, GET /{id} and /{id}/events, /{id}/actions; Leo POST /answers and GET /answers/{id} under /api/demos/leo remain unchanged.
* Fetch streaming with capability headers, never tokens in query URLs; run ID, monotonic sequence, server timestamp, provenance and execution kind; one outbox transaction with state.
* ≤50 public streams, ≤2/session, ≤8 queued inference jobs, ≤15s admission wait; drop slow clients, no unbounded buffers or RQ worker per viewer.
* 202/connection is not LIVE; >20s heartbeat gap/staleness/failure gives UNKNOWN and retained last state; finite non-town run completion/real captured replay/cache is RECORDED; authored town fixture is Illustration. Continuous-town world freshness and model availability are distinct; no episode completion gate. Logs exclude raw questions/secrets; hashes expire 24h, redacted captures 7d; persistent selected-memory retention requires LEO-131 decision, not capture TTL.

Acceptance criteria (§14)

* §14 day 60 + checks 2–3, 5: reconnect resumes committed sequence; trimmed history recovers snapshot, shared viewers do not multiply inference, cross-session Jobs reads/actions fail.
* NAS/Redis/provider failure closes admission and returns immediate static fallback; no false LIVE, token leakage or unbounded client resources.

## Feature-section work breakdown

* [LEO-134 · API · GET /api/demos/status](<https://linear.app/leochai/issue/LEO-134/api-get-apidemosstatus>)
* [LEO-135 · API · Resident conversation and five-minute lease](<https://linear.app/leochai/issue/LEO-135/api-post-apidemosworldruns>)
* [LEO-136 · API · Authoritative town snapshots and events](<https://linear.app/leochai/issue/LEO-136/api-get-apidemosworldrunsid-and-events>)
* [LEO-137 · API · POST /api/demos/jobs/runs](<https://linear.app/leochai/issue/LEO-137/api-post-apidemosjobsruns>)
* [LEO-138 · API · GET /api/demos/jobs/runs/{id} and /events](<https://linear.app/leochai/issue/LEO-138/api-get-apidemosjobsrunsid-and-events>)
* [LEO-139 · API · POST /api/demos/jobs/runs/{id}/actions](<https://linear.app/leochai/issue/LEO-139/api-post-apidemosjobsrunsidactions>)
* [LEO-140 · API · POST /api/demos/leo/answers](<https://linear.app/leochai/issue/LEO-140/api-post-apidemosleoanswers>)
* [LEO-141 · API · GET /api/demos/leo/answers/{id}](<https://linear.app/leochai/issue/LEO-141/api-get-apidemosleoanswersid>)
* [LEO-142 · §11 · Atomic events, resumable SSE and bounded transport](<https://linear.app/leochai/issue/LEO-142/11-atomic-events-resumable-sse-and-bounded-transport>)
* [LEO-143 · §11 · LIVE / RECORDED / UNKNOWN state transition table](<https://linear.app/leochai/issue/LEO-143/11-live-recorded-unknown-state-transition-table>)

## User-flow acceptance specs (§12)

* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F3 · Persistent-town visitor:** `/<lang>/work/tiny-world/#live` → readable poster → same authoritative persistent town → talk to an available Leo facet → observe permitted resulting actions. No episode creation/reset; conversation visibility awaits LEO-131.
* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F8 · NAS/quota failure:** honest timestamped/static world or separately labeled Illustration, recorded pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

 1. LEO-143 — §11 · LIVE / RECORDED / UNKNOWN state transition table
 2. LEO-142 — §11 · Atomic events, resumable SSE and bounded transport
 3. LEO-134 — API · GET /api/demos/status
 4. LEO-135 — API · Resident conversation and five-minute lease
 5. LEO-136 — API · Authoritative town snapshots and events
 6. LEO-137 — API · POST /api/demos/jobs/runs
 7. LEO-138 — API · GET /api/demos/jobs/runs/{id} and /events
 8. LEO-139 — API · POST /api/demos/jobs/runs/{id}/actions
 9. LEO-140 — API · POST /api/demos/leo/answers
10. LEO-141 — API · GET /api/demos/leo/answers/{id}

Town acceptance: two clients converge on the same committed action; simultaneous resident claims have one winner; only accepted visitor messages renew the real-world 300s lease; goodbye immediate and expiry resumes/reassesses activity. Late replies are fenced after version changes; disconnect is not immediate release. Model outage queues/pauses decisions honestly, permits only documented safe deterministic continuation and retains static fallback without inference LIVE or fake dialogue.

## Comments

No comments returned by Linear.
