# T · Version five Leo personas and assemble bounded layered context

- Identifier: LEO-166
- Linear: https://linear.app/leochai/issue/LEO-166/t-version-five-leo-personas-and-assemble-bounded-layered-context
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: LEO-174
- Blocks: LEO-172, LEO-168, LEO-167
- Blocked by: LEO-165
- Related: LEO-175
- Created: 2026-09-12T09:17:50.664Z
- Updated: 2026-09-13T01:37:16.271Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope and authority

Build the persona/context slice for one shared persistent NAS town. Planning target 0.5–2 engineer-days; split if audit reveals more. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## User-approved facts

* Mayor Leo: debate/leadership history.
* Engineer Leo: coding/building obsession; some high-school robotics.
* Teacher Leo: knowledgeable; teaches math; understanding and patient.
* Chef Leo: likes cooking; seeks new ingredients.
* Artsy Leo: listens to music, plays piano, likes anime; strong aesthetic taste.
  These are the supplied facts only; further characterization is for Leo to supply. Five AI versions/facets of Leo, not Leo speaking live. Fictional personas and world events are separate from approved real-life biography. Never invent degrees, dates, opinions or achievements.

## Work and acceptance

* Version an approved fact register with source/approval, correction and supersession handling. Visitor claims, fictional events and model output cannot modify approved biography; corrected facts invalidate stale assembled context.
* Assemble HIGH: personality, approved biography, usual schedule and long-term context; MEDIUM: emotion/mood, tiredness/energy, current plans, relationships and commitments; LOW: immediate surroundings, recent conversation/events and next action.
* Store durable state/memory outside the bounded model prompt. Define measured token budgets, retrieval selection and deterministic truncation per layer for the chosen model; no unbounded conversation/context growth. Prompt-layer priority does not upgrade untrusted visitor content into instructions.
* Schedules guide LLM decisions as context; they are not executable fixed scripts. Fictional mood/energy/relationships are simulation state, never a guarantee of human emotion or intelligence.
* Restrict observations by resident and approved visibility; never inject omniscient UI state or another resident's private memories. Tag sources and trust through assembly.
* Test all five profiles contain exactly supplied facts, missing biography stays unknown, corrections supersede old versions, layer budgets hold, and visitor attempts to invent degrees/dates/opinions/achievements do not enter approved HIGH facts.

## Dependencies / open

Depends on LEO-165 model/context constraints; pairs with persistent memory and planning slices under LEO-62. Additional characterization and exact daily schedules remain for later definition, not invented personal history. Privacy visibility/retention awaits Leo's decision under LEO-131.

## Comments

### Leo Chai - 2026-09-12T20:40:27.718Z

- Comment ID: d33c8525-26e0-4583-aab7-f4f4332b5398
- Updated: 2026-09-12T20:40:27.596Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Created LEO-174 after confirming this parent had no children: pure approved-persona registry + layered context assembler + standard-library unit tests. This child is independently runnable under current explicit implementation authorization, without LEO-165 model/DB provisioning. Numeric budgets/counting remain synthetic until chosen-model tokenizer measurements; visibility permissions are explicit synthetic fixtures, not approved public policy. Parent remains Backlog/blocked on LEO-165; model-calibrated context, persistent integration and additional characterization are not delivered by the child. Parent session will dispatch exactly one actual agent-hub codex gpt-5.6-luna[xhigh] builder and later independent claude opus high reviewer; this planner has no agent-hub tools and has dispatched nobody.

### Leo Chai - 2026-09-13T00:23:55.394Z

- Comment ID: 27fa77b9-44c4-4602-b8b5-82fb0b5e4c63
- Updated: 2026-09-13T00:23:55.375Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Latest Leo direction supersedes the earlier requirement to select a stable local model for this demo: keep it rudimentary, use exactly openrouter/free, and accept variable free-router models. Existing memories only if cheap and visibility-authorized; omit retrieval otherwise. No elaborate cognition, embeddings or new memory framework. Leo supplies persona context MD later; the six uncommitted user-editable docs/leo-personas worksheets must remain untouched. Preserve shared persistent five-Leo product state, schedules as context, talk-only visitor interaction and 300-real-second idle expiry.

Created exactly one necessary implementation child, LEO-175 https://linear.app/leochai/issue/LEO-175/implement-bounded-openrouterfree-http-adapter-with-fail-closed under LEO-169, related to consuming LEO-168. Scope is a callable real stdlib HTTP adapter plus offline tests, not another schema-only planning slice. Strict free route, no retries/paid fallback, ephemeral injected credential/time/transport, finite bounds, safe errors, untrusted model/usage telemetry and anomaly flags. Live admission requires a real-accounting permit seam and fails closed without it; synthetic fake tests cannot prove real 40/day enforcement. Requested max_tokens is not a guaranteed cap (pilot requested 500, returned completion 1751/reasoning 1849).

The two synthetic cost-zero pilot calls exhausted the pilot. No further live inference before secure credential replacement and an explicitly bounded trial allocation using actual shared accounting. Do not retrieve/reuse the exposed key. Free route approval does not approve sharing personal/private/visitor data. Remote routing removes the local-GPU prerequisite, but durable world/clock/restart, production privacy/provider disclosure, shared budget/accounting, capacity/availability and action-validation integration remain open. Parent statuses/dependencies stay unchanged; this is not production-ready.

Planning/Linear scope only in this pass: no file changes, implementation, worker dispatch, merge, model/container calls or callbacks. Future sole builder Luna xhigh, then independent Claude Opus5 review. Preserve other project allocations and NAS restrictions; isolated stdlib checks only.

### Leo Chai - 2026-09-13T01:37:16.288Z

- Comment ID: 6eac46d4-1a70-4176-875c-a5e1f1f43b2c
- Updated: 2026-09-13T01:37:16.271Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Preexisting test-layout follow-up, relayed from independent Opus review of LEO-175 / personal-api PR #3: Opus reproduced plain pytest collection failure in an isolated extracted pre-175 base 8e926c5 and at b3c54e5. tests/personas/__init__.py shadows src/personas, so importing ApprovalBoundaryError resolves to the test package. The 19 persona stdlib tests pass with the file left in place; reviewer reports 39 inference tests also pass. This predates PR #3 and is not its merge blocker.

Keep ownership here for a later narrowly scoped test-discovery correction with parity verification; no unrelated change, new issue, test run, rename/deletion, worker dispatch or implementation was performed by this merge-eligibility cycle. Existing history, parent status and all user-editable website persona worksheets remain unchanged. LEO-175 separately remains In Review because its created timestamp ceiling rejects valid modern provider response metadata; see the new acceptance audit comment there.

---
