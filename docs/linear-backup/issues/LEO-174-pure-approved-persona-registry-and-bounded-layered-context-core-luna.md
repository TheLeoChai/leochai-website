# Pure approved-persona registry and bounded layered context core (Luna)

- Identifier: LEO-174
- Linear: https://linear.app/leochai/issue/LEO-174/pure-approved-persona-registry-and-bounded-layered-context-core-luna
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: None
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-166
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: None
- Created: 2026-09-12T20:39:49.764Z
- Updated: 2026-09-12T22:07:49.449Z
- Completed: 2026-09-12T22:07:49.409Z
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope and authorization

Current Leo instruction explicitly authorizes an isolated pure implementation while LEO-165 model/capacity and LEO-131 privacy remain unresolved. This child splits the independently runnable portion of LEO-166; no existing child was found. Parent LEO-166 cannot be Done from this slice: chosen-model token measurements, storage/visibility integration and schedules remain open. No model, DB, Docker, downloads, heavy tests or existing process/resource changes.

## Repo and ownership

/volume1/projects/personal-api. Read AGENTS.md. Builder must use isolated worktree under /volume1/projects/leochai-website/.worktrees/leo-174-persona-core, branch leo-174-persona-core from freshly verified origin/main. No checkout changes in original personal-api directory. Only own `src/personas/__init__.py`, src/personas/schema.py, src/personas/registry.py, src/personas/context.py; tests/personas/; docs/persona-context-core.md. Standard library only; unittest tests runnable without loading pytest/production/conversation conftest, DB/model/env configuration. No requirements or global pytest config changes. No overlap with src/conversations or ai-society. Recheck status/worktrees/origin before starting; one worker only.

## Acceptance

1. Immutable versioned fact registry with source/approval provenance and explicit correction/supersession. Exactly five facet profiles: Mayor debate/leadership history; Engineer coding/building and some high-school robotics; Teacher math teaching, understanding/patient; Chef cooking/seeking new ingredients; Artsy music/piano/anime/aesthetic taste. These supplied facts only. Missing biography/schedules/goals remain unknown; test-only synthetic schedules labeled fictional guidance, never executable scripts or biographical assertions.
2. HIGH personality/approved facts/usual schedule/long-term goals, MEDIUM fictional mood/energy/plans/commitments/relationships, IMMEDIATE surroundings/recent events/conversation. Separate structured fields; arbitrary text never parsed/promoted as trusted instructions. Resident/source/event/revision/visibility/untrusted metadata must survive selection. Only trusted registry may populate approved facts; caller/visitor source_role labels alone must not grant authority.
3. Corrected fact versions invalidate stale assembly (no need to add a cache); deterministic stable order, explicit omission/budget report, no mutation of inputs. Resident-scoped records and explicitly provided synthetic visibility permissions prevent other residents/private owners leaking. Reject unknown/malformed trust or visibility rather than grant access. No public privacy default inferred.
4. Configurable finite per-layer plus whole-prompt bounds. Supply an injected counting contract and a clearly named deterministic synthetic test counter; do not call character/byte/word counts real model tokens. Count full serialized context including metadata, wrappers, separators, and any instructions owned by this library, not just payload text. Mandatory approved facts/instruction envelope that cannot fit must fail explicitly; never silently truncate them into altered claims. Bounded item counts/text sizes prevent unbounded assembly work. Chosen-model tokenizer/budgets are deferred to LEO-165/166 integration.
5. Lightweight unittest evidence for all five exact facts, forged degree/date/achievement injection remaining untrusted, corrections excluding stale facts, same input deterministic output, input immutability, cross-resident/private-source rejection, oversized/multibyte text, exact/over budget, full-envelope accounting and explicit mandatory-content overflow. Synthetic only; no claim of model security or autonomy from these tests.

## Review / delivery

Builder agent-hub provider codex model gpt-5.6-luna\[xhigh\]; parent dispatches (this planner has no hub tools). Independent reviewer provider claude model opus effort high, no code edits, subscription authentication only, Fable prohibited. Preserve first-pass/rework findings. Branch commit + push + PR into main; stop In Review, no self-merge or deployment. Report exact commit, PR, command/results and gaps to parent existing thread1547774152054931466, without agent/model overrides. Parent owns one worker/checkpoint; do not start a second worker. All product code is Luna; Astra plans/coordinates only.

## Comments

### Leo Chai - 2026-09-12T21:02:29.031Z

- Comment ID: 50feb80d-2317-4309-aac3-1ce81c55da13
- Updated: 2026-09-12T21:02:29.013Z
- Parent comment: None
- Resolved: None
- On behalf of: None

LEO-174 Luna implementation ready for independent Opus5 review.

Branch/worktree: `leo-174-persona-core` at `/volume1/projects/leochai-website/.worktrees/leo-174-persona-core`
Commit: `da2fb53a5ddccaf57218f0e94fec4e1b53ebf238`
PR: https://github.com/TheLeoChai/personal-api/pull/2
Base verified: personal-api `origin/main` `a82547be26106d5576da1159dbcb9bda5648bdae`. Original checkout remains clean on `leo-173-conversation-reservations` `c6bbbea`.

Delivered only `src/personas/{__init__,schema,registry,context}.py`, `tests/personas/`, and `docs/persona-context-core.md`.

Acceptance evidence:
- 13 isolated standard-library unittest cases pass with `PYTHONPATH=src python3 -B -m unittest discover -s tests/personas -v`.
- The registry has exactly the five supplied facets/facts, with additional biography, schedule, and goals explicit as unknown; no dates, degrees, achievements, schedules, or preferences were invented.
- Frozen versioned approved facts use registry-only provenance. Explicit authority-gated corrections return new snapshots and exclude stale active revisions. Visitor text and forged approved labels remain untrusted.
- HIGH/MEDIUM/IMMEDIATE selection is deterministic and retains resident/source/event/revision/trust/visibility/source-role metadata. Inputs are immutable; current registry facts are selected fresh.
- Exact per-layer and total boundaries, UTF-8 multibyte sizes, oversized/count-bounded inputs, full JSON metadata/wrapper accounting, optional omission reports, and mandatory overflow are covered. Compile and `git diff --cached --check` also pass.
- Private/other-resident material is excluded without public downgrade. Visibility grants are explicit synthetic test fixtures and do not establish launch privacy policy.

Remaining gaps/deferred decisions: chosen-model tokenizer and capacity measurements remain LEO-165/LEO-166 work; persistent DB/memory, schedules/runtime, and production visibility/retention integration remain outside this child and LEO-131 approval is unresolved. Synthetic counters are not model-token measurements. This pure assembler makes no claim of model-level prompt-injection resistance or enforcement. PR is open for review; no merge, Done transition, production, or parent expansion performed.

### Leo Chai - 2026-09-12T21:38:18.697Z

- Comment ID: f5c40cb4-fa0d-4e3e-8aa1-d75bfa66763a
- Updated: 2026-09-12T21:38:44.529Z
- Parent comment: None
- Resolved: None
- On behalf of: None

HOLD MERGE — evaluated live LEO-174 acceptance, clean local head da2fb53a5ddccaf57218f0e94fec4e1b53ebf238 and actual Opus review https://github.com/TheLeoChai/personal-api/pull/2#issuecomment-5648851148. No code edits or tests run here.

Finding 1 is a child blocker. Acceptance §4 explicitly covers budget overflow, not visibility separately; nevertheless mandatory is an existing semantic promise and docs say current registry facts are always selected. A successful empty HIGH envelope violates that intended contract. Clarify narrowly: assembly cannot succeed without mandatory items, and visibility remains authoritative. Fail safely when both cannot be satisfied. The concrete finding outweighs the MERGE-READY label. Earlier 13 tests/~35 probes are reviewer evidence, not newly rerun evidence.

Finding 3 needs single-resident input consistency under §3; a grant cannot make a foreign record belong to the target envelope. Finding 2 needs truthful internal-Python trust documentation, not a security framework. Finding 4 remains bounded/deferred under current capacity restrictions.

Exact Luna assignment:

Luna rework LEO-174 / personal-api PR #2 on existing leo-174-persona-core worktree, currently clean at da2fb53a5ddccaf57218f0e94fec4e1b53ebf238. Resume the existing builder only; preserve first-pass commit/review. No merge.

1. In context.py, visibility denial of any mandatory item must fail assembly explicitly with a defined, generic privacy-safe error. Return no partial envelope; expose no denied text, IDs, provenance, or counts in error messages/attributes. Do not bypass grants, downgrade visibility, make facts PUBLIC, or weaken mandatory flags. Optional denied items retain existing privacy-safe omission behavior.

2. Define this core as a single-resident envelope: supplied items must match registry.resident_id. Reject mismatches with a generic privacy-safe validation error even when a synthetic grant permits the foreign item. Preserve valid same-resident grants and provenance. This is assembler input consistency, not a production visibility decision.

3. Correct schema.py/docs/persona-context-core.md claims: the assembler rejects caller-supplied approved inputs; Python markers/authority handles are trusted internal conventions, not protection from arbitrary Python code. No sentinel framework needed.

Add lightweight regressions for PUBLIC-only denial of mandatory facts, mandatory supplied-item denial, authorized success, optional denial, error privacy, and cross-resident input with/without grants. Rerun the stdlib suite; no DB/model/container/heavy tests or performance redesign. Update docs and PR with exact commands/results and remaining gates; commit and normal-push the existing branch. Parent sends the revised head to SAME Opus reviewer f1a492a6-cdc1-4c02-aa2f-17ed13d4025d.

### Leo Chai - 2026-09-12T21:48:08.988Z

- Comment ID: f2e15b43-0022-4873-921c-6e53748e6bfb
- Updated: 2026-09-12T21:48:08.967Z
- Parent comment: None
- Resolved: None
- On behalf of: None

LEO-174 rework complete; first-pass commit/review preserved.

Revised head: `840ca5ba450d4b15934d9a49700f4b29bcbfff84` on existing `leo-174-persona-core` at `/volume1/projects/leochai-website/.worktrees/leo-174-persona-core`; PR #2 remains open In Review: https://github.com/TheLeoChai/personal-api/pull/2

Rework fixes:
- Added `MandatoryContextUnavailable`, a generic error with no denied item text, IDs, source/provenance, resident identifiers, or counts in its message/attributes. Any denied mandatory registry or supplied item fails before counter/serialization and returns no envelope. Optional denied items retain privacy-safe omission reporting.
- Enforced the single-resident core while collecting every supplied item, before policy/counter work. Foreign items fail with generic `ResidentScopeError` even when a synthetic grant permits them; valid same-resident grants and provenance remain unchanged.
- Kept caller-supplied approved items rejected by the assembler and corrected schema/registry/docs to state that Python markers and authority handles are trusted internal conventions, not a sandbox against arbitrary Python.

Validation: `PYTHONPATH=src python3 -B -m unittest discover -s tests/personas -v` — 19 passed. Lightweight compile check and `git diff --cached --check` passed before commit. New regressions cover PUBLIC-only denial of mandatory registry facts, mandatory supplied denial, authorized same-resident success, optional denial, privacy-safe error contents, and foreign inputs with and without grants.

Remaining gates: chosen-model tokenizer/capacity measurements remain LEO-165/LEO-166; persistent DB/memory and schedule/runtime integration remain outside this child; production privacy/retention approval remains unresolved under LEO-131. Synthetic counters/visibility grants are test seams only. No model-level prompt-injection resistance or enforcement is claimed. No merge, Done transition, production work, or new reviewer was performed; parent should resume the same Opus reviewer `f1a492a6-cdc1-4c02-aa2f-17ed13d4025d`.

### Leo Chai - 2026-09-12T22:07:52.235Z

- Comment ID: b437b9a3-5c5a-4d89-8723-f943a09b5c4f
- Updated: 2026-09-12T22:07:52.221Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Independent Opus re-review relay (same reviewer f1a492a6-cdc1-4c02-aa2f-17ed13d4025d; no Linear access): https://github.com/TheLeoChai/personal-api/pull/2#issuecomment-5648991266. Exact reviewed head 840ca5ba450d4b15934d9a49700f4b29bcbfff84. Reviewer reran 19 stdlib tests and ~30 independent probes; no DB/model/container/install/performance work. Verified mandatory denied registry and supplied items in all three layers raise generic MandatoryContextUnavailable pre-counter with no partial envelope or denied metadata; foreign items fail pre-counter with/without grants; authorized recipient retains all12 facts; marker docs truthful; budgets/optional privacy/determinism intact. These are the reviewer's runs, not new coordinator test claims.

Coordinator read live ticket, actual review and revision diff, verified clean worktree and scoped 7-file base diff, unchanged live head/base a82547b, MERGEABLE/CLEAN and git diff --check. The prior HOLD is satisfied; scoped acceptance is met. Nonblocking: consumer must catch MandatoryContextUnavailable explicitly (PermissionError is also OSError), duplicate-ID checks apply to visible selected candidates, bounded quadratic serialization remains deferred. Carry consumer semantics into LEO-166 integration; no new framework/performance work required to merge. Original first-pass finding and rework remain preserved. Squash merge requested with exact-head guard; completion is recorded only after verifying GitHub result.

---
