# Persist one resident world and versioned events with restart recovery

- Identifier: LEO-186
- Linear: https://linear.app/leochai/issue/LEO-186/persist-one-resident-world-and-versioned-events-with-restart-recovery
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: None
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-144
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: None
- Created: 2026-09-26T06:55:22.656Z
- Updated: 2026-10-15T20:38:08.669Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Outcome and boundary

Extend the merged, pure, private one-resident world loop from LEO-185 in `TheLeoChai/personal-api` at `main` `00e2987`. Persist one synthetic resident world and its versioned accepted events in PostgreSQL, then prove restore after process restart and safe competing writers. This is a bounded storage slice under LEO-144, not the full shared-town/clock/public API contract. Leo has authorized this implementation slice. Do not make a world clock, tick scheduling, downtime progression, or offline catch-up policy; those remain open in LEO-144. Do not infer privacy/public visibility policy from test defaults. No public endpoint, real model/LLM call, production migration, or deployment.

## Branch, ownership, file scope

Start from fresh `origin/main` at or after `00e2987` in an isolated worktree. One branch/PR: `leo-186-world-persistence`. Opus 5.5 implements; GPT-6 Sol independently reviews. Do not merge until all acceptance checks and real PostgreSQL evidence pass. Keep the PR In Review while PostgreSQL tests are skipped or unavailable.

Edit only:

* `src/world/offline_loop.py` for a minimal, safe `state_from_mapping` inverse of canonical state serialization;
* `src/world/postgres.py` for a separate repository with injected SQLAlchemy `Engine`;
* `src/world/__init__.py` exports if needed;
* `migrations/0003_world_state.sql`, authored but unapplied;
* `tests/world/test_postgres.py` and existing `tests/world/test_offline_loop.py`.

Use the repository's `unittest` style; do not add `tests/conftest.py`. Do not import production `db.py`, run production migrate, edit API/worker/config/requirements unless a concrete blocker is first surfaced in this issue, or substitute SQLite and claim PostgreSQL parity. Preserve existing action authority and offered-proposal provenance: the model proposes; only the validated world loop commits. No callback may commit an inner session.

## Storage contract

Represent one stable world ID and one authoritative head row with explicit schema version, world version, canonical state and a fingerprint/hash. Store ordered versioned accepted events and a durable idempotency outcome for every submitted request, including rejection as needed to make duplicate submission return the same outcome. Numbered migration `0003` is checked in but never applied to production by this task.

The repository owns the transaction. Lock the head row for mutation and check expected version/fingerprint and idempotency key. A stale/conflicting writer fails safely. A rejected or invalid action leaves state, version, and accepted event log unchanged. An accepted action commits its new head, one event, and outcome in one transaction, with rollback on any failure. Reopening through an independent process restores canonical state and event sequence. Replay accepted events from the defined initial state and verify the restored state/version/fingerprint; fail closed on tampered or inconsistent head/event data. Do not silently repair corruption.

## Tests and evidence

Add meaningful `unittest` cases for safe decoder round trip and malformed mappings; first accepted refill/water flow, unchanged rejection, duplicate accepted and rejected submit outcomes, expected-version conflict, transaction rollback, replay/tamper detection, and independent process reopen with nonempty can/plant state. Competing writers must use two real PostgreSQL connections/processes and show exactly one accepted commit and one resulting event. Keep action ordering and proposal provenance from LEO-185.

Use only a disposable, uniquely named synthetic PostgreSQL database on localhost, passed via an explicit environment variable. Validate host is loopback and database name is a unique test name before any test connection/migration/cleanup; never fall back to production configuration. A test may skip cleanly when no validated DB is provided. At orchestration time available memory was down 843 MiB with 6050 MiB swap used: do not launch PostgreSQL until headroom is measured safe. Builder may author and run pure tests now and report PG integration tests skipped. Mocks/unit tests do not prove concurrency or restart recovery. Do not mark Done or merge while real PG integration tests are skipped/failing.

Run scoped world `unittest`, relevant existing tests, and `git diff --check`. Record exact test commands and results, real PG database safety validation, independent-process and race evidence, reviewer findings/resolution, and PR link on this issue. Keep PR In Review until those gates pass. Merge only after all acceptance/evidence and independent GPT-6 Sol review; no deploy under this ticket.

## Dependencies and limits

This child builds on LEO-185 Done. LEO-144 still owns full authoritative shared town, clock/restart policy, and integration with LEO-132/142/165. This child does not satisfy those broader gates or authorize capacity, paid inference, production data, public transport, or visitor access.

## Comments

### Leo Chai - 2026-09-26T07:08:50.651Z

- Comment ID: dc9ad637-1bb3-4233-b041-05b3ad35a154
- Updated: 2026-09-26T07:08:50.629Z
- Parent comment: None
- Resolved: None
- On behalf of: None

GPT-6 Sol independent first-pass review of draft PR https://github.com/TheLeoChai/personal-api/pull/5 at local 790fa50ea7383a3229b9366fef2b32b181392dab (base 00e2987). Remote SHA could not be verified: gh is absent and github.com DNS failed. Verdict: FIXES REQUIRED; keep DRAFT/In Review, no merge.

Findings (static, unexecuted repros):
1. P1 test safety — tests/world/test_postgres.py:306-315 validates driver and loopback host but never checks the database name is unique/disposable; setUpClass at :338-343 then drops public world tables and an ORM schema. A localhost URL ending in /postgres (or a local application DB) passes this guard and can lose data. Enforce a unique test DB name before any connection or cleanup; do not run this suite meanwhile.
2. P1 storage contract — migrations/0003_world_state.sql:8-25 and src/world/postgres.py:100-128,391-393 persist version-zero initial_state plus head_version/head_sha256, but no canonical current head state (or head schema version). LEO-186 requires the authoritative head row to store canonical state and an explicit schema version. Persist and verify current head state against replay and digest.
3. P1 integrity on idempotent retry — src/world/postgres.py:359-371 returns _recorded_result before _verified; :465-485 decodes one event without checking replay/head/operation consistency. After an accepted submit, changing world_states.head_sha256 to a different valid 64-char digest still lets the same key return accepted; load and a fresh-key submit would raise ReplayError. Apply fail-closed verification to duplicate submissions and validate recorded outcome fields.
4. P2 acceptance test gap — tests/world/test_postgres.py:390-401,487-513 cover accepted move/refill/restart, but no accepted water transition. The required persisted refill/water flow and restored watered bed/nonempty can are not demonstrated.

Static positives: injected SQLAlchemy Engine; no production db.py import; row lock around new submits; transaction groups accepted event, head metadata, operation; rejections record only an operation; replay checks sequence/state digests; decoder has strict roundtrip/malformed coverage; migration 0003 remains pending. PostgreSQL process race, restart, tamper, rollback and ORM parity tests are authored but unrun. git diff --check passed. No container, DB, production action, or runtime tests were used.

### Leo Chai - 2026-09-26T07:17:52.210Z

- Comment ID: ee5e31a4-b0ee-484c-82ba-bbb87f373ed7
- Updated: 2026-09-26T07:17:52.196Z
- Parent comment: None
- Resolved: None
- On behalf of: None

GPT-6 Sol focused rereview of draft PR https://github.com/TheLeoChai/personal-api/pull/5, local head 3bb4a8c71e89bf8cff33163fceff11ba99825fd0 over 790fa50 (remote SHA unverified: github.com DNS failed, gh absent). Verdict: FIXES REQUIRED; keep draft/In Review and do not merge.

P2 remaining migration constraint hole — migrations/0003_world_state.sql:22-30, mirrored by src/world/postgres.py WorldRecord checks. For initial_state='{}'::jsonb and head_state='{}'::jsonb, jsonb_typeof(...)=object is TRUE, but both schema and version key comparisons are NULL. PostgreSQL accepts CHECK expressions that evaluate to NULL, so these rows pass the checks despite lacking the required explicit schema/version keys. This is a database invariant gap; state_from_mapping later fails closed. Make both checks require TRUE, or require explicit key existence, in SQL and ORM, with a regression assertion for missing keys. PostgreSQL docs: https://www.postgresql.org/docs/16/ddl-constraints.html

The four first-pass findings were addressed in source: test URL guard and current_database check precede destructive setup; canonical head_state/state_schema are stored; submit verifies before retry and recorded_result checks the verified log; accepted water/restart coverage was added. No other code defect identified statically. AST parse and git diff --check passed. Offline suite and direct pure helper probes could not run on host because SQLAlchemy and psycopg are absent; no packages were installed. Real PostgreSQL race/restart/rollback/parity tests remain unrun for host memory/swap reasons and are still a separate mandatory gate. No container, DB, production env, or worktree edits.

### Leo Chai - 2026-09-26T07:21:51.751Z

- Comment ID: b79e24ad-0f2d-42f0-b771-726e12f69934
- Updated: 2026-09-26T07:21:51.734Z
- Parent comment: None
- Resolved: None
- On behalf of: None

GPT-6 Sol focused static rereview of draft PR https://github.com/TheLeoChai/personal-api/pull/5 at local head 2f96cb2e7cd65c95a89cf56b7cdea5650709bc6d (after 3bb4a8c). Verdict: CODE-READY-BUT-PG-BLOCKED; keep draft/In Review, not merge-ready.

The prior P2 NULL CHECK hole is resolved. In migrations/0003_world_state.sql:24-29 and src/world/postgres.py:119-129, each entire three-part expression (object type, schema, version) is enclosed in parentheses before IS TRUE. Missing keys produce NULL inside the expression and therefore fail the constraint; JSON null/array/scalar, wrong schema, and wrong version also fail by the same logic. SQL and ORM expressions match statically. The static test checks whole-expression wrapping and the PG fixture covers missing/null/wrong type/schema/version for both snapshots, but that fixture has not run.

No remaining static defect identified. An isolated stdlib execution of the migration CHECK parser/wrapper assertions and AST parsing passed; git diff --check passed; worktree clean. Host Python lacks SQLAlchemy and psycopg, so I did not rerun the world suite. Opus reports 35 world tests OK with one PG class skipped, plus offline 22, inference 41, personas 19; those are reported, not independently observed here. Real PostgreSQL migration/parity/race/restart/rollback evidence remains mandatory. No DB, container, model, package install, production access, code edit, merge, or status change. Remote PR head still unverified because github.com DNS fails.

### Leo Chai - 2026-09-26T18:38:02.399Z

- Comment ID: b609fa9c-861f-44dc-bd04-ad1b17492c36
- Updated: 2026-09-26T18:38:02.348Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Evidence for draft [PR #5](https://github.com/TheLeoChai/personal-api/pull/5#issuecomment-5848811627), head `2f96cb2e7cd65c95a89cf56b7cdea5650709bc6d`: independent disposable PostgreSQL 16.10 run passed 47 tests, 0 skipped, including all 12 PG integration tests. The URL guard refused 10 unsafe addresses before connection; real migration and ORM parity passed. The reviewer’s first test run failed due to dependency-path setup; after correction, the full run passed. Dedicated containers were removed by ID and labels. No production DB, migration, or deploy was touched. Final independent PR code review remains for the omitted `_origin` fingerprint under the trusted in-process boundary. Keep the PR draft and issue In Review; no automatic merge.

---
