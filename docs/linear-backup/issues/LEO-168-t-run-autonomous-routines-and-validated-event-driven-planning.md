# T · Run autonomous routines and validated event-driven planning

- Identifier: LEO-168
- Linear: https://linear.app/leochai/issue/LEO-168/t-run-autonomous-routines-and-validated-event-driven-planning
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: LEO-185
- Blocks: LEO-172, LEO-171
- Blocked by: LEO-169, LEO-135, LEO-165, LEO-167, LEO-166, LEO-144
- Related: LEO-175
- Created: 2026-09-12T09:18:11.919Z
- Updated: 2026-09-26T06:34:22.241Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope

Implement bounded routine/planning execution for five Leo facets in one continuously running persistent NAS town. Planning target 1–2 engineer-days for a first allowed-action vertical slice; split further if audit shows more. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Work and acceptance

* Daily routines are HIGH-layer context guiding an LLM, not an executable fixed script. Residents respond to surroundings, events and visitors, change plans and form commitments/relationships through real interactions, without predetermined outcomes.
* Schedule LLM work only at decision boundaries or relevant events. Deterministic engine ticks progress accepted activity; continuous life is independent of viewer presence and does not require inference every frame. No six-decision/six-minute/zero-viewer stop or episode memory reset.
* Model proposes a typed intent, optional dialogue and revised plan against current version and allowed existing object IDs. Authoritative engine validates action schema, range, inventory/capacity, target/preconditions and ownership; model text cannot directly mutate world truth.
* Define a finite initial action catalog against available town objects/activities after reuse audit; do not treat the old farm menu as a complete five-persona design. No arbitrary code/file/network tools.
* Conversation can persuade a resident to revise a goal or allowed action; refusal/reconsideration is valid. Pause/safely interrupt activity on a valid conversation hold and resume or reassess after goodbye/idle expiry. Coordinate fencing with LEO-135; delayed decisions must revalidate world/resident/lease versions before commit.
* Under model outage, honestly queue/pause decisions and follow the documented safe deterministic ongoing-action policy in LEO-144. No invented AI speech, hidden fallback inference, retry storms or catch-up quota bypass.
* Test invalid/schema-valid-but-impossible action rejects without state mutation; allowed persuasion changes a plan, refusal remains possible, interrupted activity resumes/reassesses after release, and the same committed action is observable by two clients.

## Dependencies / open

Depends on LEO-165, LEO-166, LEO-167, LEO-144 world/clock policy, LEO-135 conversation fencing and the bounded admission slice before inference activation. Exact schedules/action catalog and safe outage continuation policy must be specified before implementation; they are design work, not additional Leo biography.

## Comments

### Leo Chai - 2026-09-13T00:23:54.365Z

- Comment ID: 69cbeb01-519a-4a34-83ef-f32e78f24d5c
- Updated: 2026-09-13T00:23:54.349Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Latest Leo direction supersedes the earlier requirement to select a stable local model for this demo: keep it rudimentary, use exactly openrouter/free, and accept variable free-router models. Existing memories only if cheap and visibility-authorized; omit retrieval otherwise. No elaborate cognition, embeddings or new memory framework. Leo supplies persona context MD later; the six uncommitted user-editable docs/leo-personas worksheets must remain untouched. Preserve shared persistent five-Leo product state, schedules as context, talk-only visitor interaction and 300-real-second idle expiry.

Created exactly one necessary implementation child, LEO-175 https://linear.app/leochai/issue/LEO-175/implement-bounded-openrouterfree-http-adapter-with-fail-closed under LEO-169, related to consuming LEO-168. Scope is a callable real stdlib HTTP adapter plus offline tests, not another schema-only planning slice. Strict free route, no retries/paid fallback, ephemeral injected credential/time/transport, finite bounds, safe errors, untrusted model/usage telemetry and anomaly flags. Live admission requires a real-accounting permit seam and fails closed without it; synthetic fake tests cannot prove real 40/day enforcement. Requested max_tokens is not a guaranteed cap (pilot requested 500, returned completion 1751/reasoning 1849).

The two synthetic cost-zero pilot calls exhausted the pilot. No further live inference before secure credential replacement and an explicitly bounded trial allocation using actual shared accounting. Do not retrieve/reuse the exposed key. Free route approval does not approve sharing personal/private/visitor data. Remote routing removes the local-GPU prerequisite, but durable world/clock/restart, production privacy/provider disclosure, shared budget/accounting, capacity/availability and action-validation integration remain open. Parent statuses/dependencies stay unchanged; this is not production-ready.

Planning/Linear scope only in this pass: no file changes, implementation, worker dispatch, merge, model/container calls or callbacks. Future sole builder Luna xhigh, then independent Claude Opus5 review. Preserve other project allocations and NAS restrictions; isolated stdlib checks only.

### Leo Chai - 2026-09-26T06:34:53.651Z

- Comment ID: 6b90e237-2737-4d2d-8fd1-fff93c0fb84b
- Updated: 2026-09-26T06:34:53.631Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Scoped child [LEO-185](https://linear.app/leochai/issue/LEO-185/offline-one-resident-decision-to-validated-world-action-loop) is the first one-resident offline action vertical slice: merged LEO-174 persona/context + LEO-175 adapter (fake transport and typed fake permit) → untrusted decision → engine precondition validation → committed in-memory state/event/version. Opus 5.5 is preferred builder, GPT-6 Sol fallback and independent reviewer. This does not complete this parent’s five-resident routines, continuous life, conversation, or launch gates. Parent status remains unchanged.

---
