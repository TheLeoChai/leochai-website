# T · Bound persistent-town inference admission and public security

- Identifier: LEO-169
- Linear: https://linear.app/leochai/issue/LEO-169/t-bound-persistent-town-inference-admission-and-public-security
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: LEO-175
- Blocks: LEO-168, LEO-135, LEO-172, LEO-171
- Blocked by: LEO-132, LEO-165, LEO-131
- Related: LEO-185
- Created: 2026-09-12T09:18:17.814Z
- Updated: 2026-09-26T06:34:22.533Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope and gate

Implement the town-specific admission/security adapter on existing FastAPI/Redis/RQ and the shared ledger/gateway; planning target 1–2 engineer-days for bounded admission and its adversarial checks. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Work and acceptance

* Record numeric input/output payload/token limits, request/session/IP rates, finite model/job queue, deadlines, retry/backoff and in-flight limits from LEO-165; fail closed when missing. Existing shared ceilings (eight queued jobs, 15s admission wait, 50 streams/two per session) remain upper bounds unless explicitly revised. These transport limits do not authorize session fairness policy or spend.
* Reserve admitted decision/message attempts durably before enqueue, with idempotency, conservative unknown-sent accounting and reconciliation after restart under LEO-132. No implicit SDK retries, fallback provider changes, call storms, accumulated missed-tick inference or catch-up quota bypass.
* Decisions and visitor conversations share explicit bounded town admission; no appropriation of Jobs/AI-Leo allocations. Browser cannot choose model/provider/key or create a world run. GET/watch/status/reconnect/heartbeats do not trigger inference.
* Validate exact origin plus server capabilities, resident/lease ownership/version, payload shape/length and current authorization before enqueue and commit. Treat prompt text and remembered summaries as untrusted data. Residents have only engine-validated allowed actions, never code/file/network access.
* Public workers have no privileged Git/Discord/publisher credentials, Docker socket, owner/private storage or kimaki history. Keep separate world/jobs/leo/publish queues and credential boundaries.
* Resolve conversation visibility and provider disclosure/retention under LEO-131 before public chat. Raw private conversations must not appear in logs; redact errors and traces. One-resident-per-visitor, max-active-session fairness cap and absolute session duration are PROPOSALS, not approved restrictions.
* Test oversized/forged/cross-resident/replayed requests, queue saturation, injection into dialogue/memory, model outage/429, delayed jobs and worker restart: no unauthorized mutation or paid calls, no lease renewal from rejection/heartbeat/model response, no quota replenishment.

## Dependencies / output

Requires LEO-165 route/capacity decision, LEO-132 durable accounting and LEO-131 privacy. Integrates LEO-135 lease API; activation gated on scenario/security tests. Honest queued/paused state and static fallback remain usable without inference.

## Comments

### Leo Chai - 2026-09-12T20:40:49.970Z

- Comment ID: 558967cf-8d45-4cab-bf3e-3095af9b3e50
- Updated: 2026-09-12T20:40:49.865Z
- Parent comment: None
- Resolved: None
- On behalf of: None

LEO-165 audit recorded severe current memory pressure; parent prohibits new containers/models/heavy tests, no process/resource cleanup. No town inference budget or model route is approved. LEO-173 internal callback library is not the public admission boundary. Before exposure, validate finite known resident IDs before any store operation (forged unknown IDs currently create durable rows); enforce operation/event retention after LEO-131 decision and preserve no-renewal behavior for rejected traffic. Keep queues/requests bounded independently of any proposed one-per-visitor fairness policy, which remains unapproved. See LEO-135 integration comment1125d2ae-6321-4de8-8494-727691ec348c for Session trust, isolation and schema parity work.

### Leo Chai - 2026-09-13T00:23:54.182Z

- Comment ID: 42a81a0e-211e-409f-8efe-fa410af65885
- Updated: 2026-09-13T00:23:54.160Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Latest Leo direction supersedes the earlier requirement to select a stable local model for this demo: keep it rudimentary, use exactly openrouter/free, and accept variable free-router models. Existing memories only if cheap and visibility-authorized; omit retrieval otherwise. No elaborate cognition, embeddings or new memory framework. Leo supplies persona context MD later; the six uncommitted user-editable docs/leo-personas worksheets must remain untouched. Preserve shared persistent five-Leo product state, schedules as context, talk-only visitor interaction and 300-real-second idle expiry.

Created exactly one necessary implementation child, LEO-175 https://linear.app/leochai/issue/LEO-175/implement-bounded-openrouterfree-http-adapter-with-fail-closed under LEO-169, related to consuming LEO-168. Scope is a callable real stdlib HTTP adapter plus offline tests, not another schema-only planning slice. Strict free route, no retries/paid fallback, ephemeral injected credential/time/transport, finite bounds, safe errors, untrusted model/usage telemetry and anomaly flags. Live admission requires a real-accounting permit seam and fails closed without it; synthetic fake tests cannot prove real 40/day enforcement. Requested max_tokens is not a guaranteed cap (pilot requested 500, returned completion 1751/reasoning 1849).

The two synthetic cost-zero pilot calls exhausted the pilot. No further live inference before secure credential replacement and an explicitly bounded trial allocation using actual shared accounting. Do not retrieve/reuse the exposed key. Free route approval does not approve sharing personal/private/visitor data. Remote routing removes the local-GPU prerequisite, but durable world/clock/restart, production privacy/provider disclosure, shared budget/accounting, capacity/availability and action-validation integration remain open. Parent statuses/dependencies stay unchanged; this is not production-ready.

Planning/Linear scope only in this pass: no file changes, implementation, worker dispatch, merge, model/container calls or callbacks. Future sole builder Luna xhigh, then independent Claude Opus5 review. Preserve other project allocations and NAS restrictions; isolated stdlib checks only.

### Leo Chai - 2026-09-26T06:34:58.432Z

- Comment ID: a2477fc9-9bf9-4233-9354-c95c00b8a4a6
- Updated: 2026-09-26T06:34:58.405Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Sequencing note: merged LEO-175 supplies a fail-closed adapter seam; [LEO-185](https://linear.app/leochai/issue/LEO-185/offline-one-resident-decision-to-validated-world-action-loop) uses only fake transport and fake typed permit to wire an offline proposed action through validation. It performs no live OpenRouter call or paid spend. This issue and LEO-132 still own durable admission/allocation before activation; LEO-131 still owns privacy, visibility and provider disclosure. The child does not satisfy those gates; status remains unchanged.

---
