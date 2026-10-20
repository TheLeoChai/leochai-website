# Conversation reservation core: atomic ownership, idle expiry and fencing (Luna trial)

- Identifier: LEO-173
- Linear: https://linear.app/leochai/issue/LEO-173/conversation-reservation-core-atomic-ownership-idle-expiry-and-fencing
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Backend platform & budgets
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-135
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: None
- Created: 2026-09-12T09:51:56.040Z
- Updated: 2026-09-12T20:40:22.924Z
- Completed: 2026-09-12T20:40:22.906Z
- Due date: None
- Cycle: None
- Archived: None

## Description

## Purpose and authorization boundary

One bounded backend calibration trial under LEO-135: an isolated Python/SQLAlchemy PostgreSQL persistence/domain library exercised by synthetic callers only. This child is runnable locally because it makes no deployed or full-endpoint claim. Creating this issue is a documentation action only; do not start implementation, provision infrastructure or deploy as part of issue creation.

LEO-135 remains Backlog with its existing blockers LEO-144, LEO-165, LEO-131, LEO-169 and LEO-60 unchanged. This child does not resolve privacy, model capacity, town clock/restart policy, inference admission or world integration. Completing it cannot mark the parent Done.

## Contract

* At most one owner per resident across processes, enforced atomically in PostgreSQL. Use resident-scoped unforgeable capability verification and persist synthetic owner/resident IDs, capability verifier, reservation state, last accepted message timestamp and a durable monotonically increasing version/fencing counter. No raw chat text or real visitor data in storage, events, logs or tests.
* Reservation begins with the first accepted visitor message in the synthetic test adapter. This is a test-only adapter convention; product initial-claim semantics remain OPEN in LEO-135.
* A newly accepted owner visitor message records authoritative server real time. The reservation is invalid at exactly 300 real-world seconds after last_accepted_visitor_message_at, independent of simulation ticks. Only a new accepted owner message renews.
* Duplicate retries, rejected/wrong-owner messages, model results, heartbeats, watching and capability reattachment do not renew. Specify idempotency keys for claim/message/goodbye, including retry after release/reclaim; return consistent busy/expired/invalid outcomes. A duplicate claim cannot recreate or extend an old reservation.
* Goodbye releases immediately and idempotently. Expiry is reconciled using durable timestamps before any accepted write even when cleanup is delayed. Goodbye/expiry commit a durable metadata-only lifecycle handoff event atomically with the transition; duplicate cleanup must not duplicate that logical event. This is an eventual cleanup/resume-or-reassess integration seam, NOT implemented task resume, pause or world behavior.
* Preserve fencing across release, expiry, reclaim and process restart. Validate owner + resident scope + version + expiry atomically at message acceptance and with eventual result mutation through a transaction-aware seam. Do not expose a standalone boolean check followed by an unguarded write. Demonstrate fenced mutations using a synthetic database target in the same transaction; no actual world, plan, memory or dialogue integration.
* Synthetic capability reattachment neither renews nor silently releases; it cannot bypass expiry. Product lost-capability recovery/rotation and transport reconnect policy remain outside this child.
* No one-resident-per-visitor restriction, new fairness/session cap or absolute maximum duration.

## Allowed repository and file scope

Existing repository: /volume1/projects/personal-api. Preflight baseline main at 05b4005, clean and matching locally recorded origin/main.

* `src/conversations/` only for the isolated domain/persistence library (suggested `__init__.py`, `domain.py`, `storage.py`, `postgres.py`).
* migrations/<next-number>\_conversation_reservations.sql. Read-only check at issue creation found only 0001_fix_posts_updated_at.sql, so 0002 is currently next; recheck before authoring. Migration is authored, never applied to live.
* tests/conversations/ for domain, transaction, concurrency and restart tests and synthetic fixtures.
* Minimal dev-test setup only: requirements-dev.txt and, if necessary, pytest.ini and tests/conftest.py.
* docs/conversation-reservations.md for the contract, local test instructions, integration seams and calibration evidence.

No changes to HTTP routes, `main.py`, existing production `db.py` / `models.py`, worker, OpenAPI, Compose, frontend, production uploads or deployment configuration. No inference, world integration, privacy-policy implementation, conversation/memory storage or new capacity. Do not import production engine initialization or startup create_all. Inject test engine/session and clock explicitly.

## Existing patterns and instructions

Read personal-api/AGENTS.md and the applicable handoff instructions. Existing stack is flat Python src/, FastAPI, synchronous SQLAlchemy 2 declarative ORM, PostgreSQL/psycopg and Redis/RQ. Alembic is listed as a dependency but has no configured migration environment; numbered SQL is the established migration pattern. No existing test suite/config or dev-test requirements were found. Existing [db.py](<http://db.py>) and [models.py](<http://models.py>) create separate engines, and [main.py](<http://main.py>) runs create_all on startup: keep the trial independent of these paths. Never touch production uploads or secrets; no force-push to main. The user-authorized Luna trial overrides the general implementation model mapping.

## Required evidence

* Inject an authoritative fake clock for deterministic 299.999-second valid / exactly 300-second expired boundaries; production-facing contract uses server real time, never caller time. Sample validity under the transaction/lock, including lock-wait cases.
* Test accepted renewal, duplicate/rejected/model/heartbeat/reattach non-renewal, immediate idempotent goodbye, delayed expiry reconciliation, cross-resident/forged capability rejection and another resident remaining claimable.
* Real disposable PostgreSQL, never production, is required for simultaneous independent-process claim tests (one winner), restart/open recovery preserving ownership/timestamp/fence, and lifecycle event recovery/idempotency.
* Use controlled overlapping transactions to prove the owner/version/expiry guard and synthetic result mutation cannot race with goodbye/expiry/reclaim. Late or queued results cannot mutate after fencing changes; rollback must not leave a handoff event or synthetic mutation committed alone.
* Test restart/reopen before and after the idle boundary; no restarted store or replay extends the deadline or resets fencing.
* Explicitly supplied disposable test database only: do not discover/reuse production DATABASE_URL or read production credentials. Any test schema setup/migration execution is limited to that disposable database; no infrastructure/deployment permission is implied.
* If disposable real PostgreSQL is unavailable, report the exact skipped/unrun evidence and gap. Fake/in-memory/SQLite tests cannot prove PostgreSQL durability or concurrency; do not claim those guarantees proven or acceptance complete.

## Delivery and calibration

Branch: `leo-173-conversation-reservations`.

Builder: gpt-5.6-luna\[xhigh\]. Reviewer: independent gpt-6-astra\[high\], builder never self-approves. Record initial findings, review findings, required rework, each rework outcome, exact test commands/results and remaining gaps in the PR and docs/conversation-reservations.md for calibration.

When implementation is separately executed, open a PR and stop with this child In Review. Independent Astra-high review is required before merge. Do not mark Done until reviewed, merged and acceptance satisfied; do not claim the full parent endpoint delivered. No deployment is included.

## Comments

### Leo Chai - 2026-09-12T10:14:24.984Z

- Comment ID: 2ee7953e-6ab0-450c-b9bc-370e5c146bbb
- Updated: 2026-09-12T10:14:24.968Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Luna LEO-173 first pass is ready for independent Astra-high review.

Initial plan: keep LEO-135 and its blockers unchanged; add only an isolated synchronous SQLAlchemy/PostgreSQL reservation library, next numbered unapplied migration, isolated tests, and contract/evidence docs; avoid HTTP routes, OpenAPI, production startup, worker, deployment, uploads, secrets, model calls, and world integration.

Implementation: commit `ae6bc69` on branch `leo-173-conversation-reservations`; PR https://github.com/TheLeoChai/personal-api/pull/1. The store uses resident row locks, PostgreSQL `clock_timestamp()` after lock acquisition, hashed synthetic capabilities, monotonic claim/release/expiry fences, idempotency fingerprints, exact inclusive 300-second expiry, metadata-only lifecycle events, and `apply_result(..., mutation)` as a same-transaction guarded mutation seam. The synthetic adapter's claim is documented as a provisional accepted-first-message convention, not product initial-claim approval.

Evidence: pure policy test 3 passed; without `LEO173_TEST_DATABASE_URL`, 3 passed and 8 skipped; against a uniquely labeled localhost-only disposable PostgreSQL 16 container, 11 passed in 2.35s. Coverage includes independent OS-process contention, restart/reopen and 299.999/300-second boundaries, idempotency and forged/cross-resident capability rejection, expiry/reclaim late-result fencing, durable lifecycle events, guarded result/goodbye overlap, and rollback. `git diff --check` and Python compilation pass. The disposable container, network, and test venv were removed after testing.

Remaining gaps: migration is authored but unapplied; no production or HTTP integration; synthetic result target does not prove model, Redis, world, plan, memory, dialogue, privacy, reconnect/lost-capability, pause/resume, or parent route behavior; production crash/restart testing and independent Astra review remain pending. Do not merge automatically.

### Leo Chai - 2026-09-12T10:23:02.505Z

- Comment ID: 1b4905de-0f4d-4964-8cb7-41f5452a9099
- Updated: 2026-09-12T10:23:02.482Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Independent first-pass review: FIXES REQUIRED. PR https://github.com/TheLeoChai/personal-api/pull/1; unchanged head ae6bc69801d1707d14ef77a82c677ea171e52c2b. Full evidence posted as ONE normal PR comment: https://github.com/TheLeoChai/personal-api/pull/1#issuecomment-5645300468

P1, src/conversations/postgres.py:703–763: apply_result checks expiry before the callback but commits after a callback crosses the idle deadline. Independently reproduced at exactly 300 fake-clock seconds and 300.225935 seconds using PostgreSQL clock_timestamp(): APPLIED with a committed synthetic target. Resident row locks do not stop real time passing.

P2 acceptance evidence, tests/conversations/test_postgres.py:75–100,117–161,221–254,270–315: restart test only reconstructs a store with the same session factory; no independent restart/recovery after expiry. Non-renewal checks freeze time, and overlap lacks advancing expiry/controlled expiry-reclaim contention. Preserve these initial findings for rework evaluation.

Unchanged suite on my own bounded, labeled PostgreSQL container: 11 passed in 4.86s. Pure-only: 3 passed, 8 skipped in 3.64s. Five temporary independent probes: 2 failed (expiry defect), 3 passed (observed resident-lock wait sampling, retries after reclaim do not renew/resurrect, event failure rolls back release). Container ID verified before removal; own container/network removed. No implementation edits, checkout changes, merge, deployment, or production access. Child remains In Review; parent integration and production crash testing are deferred, not demanded. Calibration: readable types and sound transaction foundations, substantial repeated store boilerplate, test confidence overstated by timing/restart gaps; no comparative model claim.

### Leo Chai - 2026-09-12T19:38:20.736Z

- Comment ID: 30964c4d-c8de-4719-b48f-38c12f42e958
- Updated: 2026-09-12T19:38:20.720Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Revision round 2 is ready for the next independent review. The original first-pass commit/report/comment remain preserved.

Changed head: `c6bbbea590134658cbb41b9aff567ef8e42a45ad` on `leo-173-conversation-reservations`; PR https://github.com/TheLeoChai/personal-api/pull/1.

P1 addressed: `apply_result` now runs the database-only synthetic mutation in a nested savepoint, re-samples authoritative time after the callback returns, and rolls back callback writes before expiring/fencing when the inclusive 300-second boundary is crossed. The post-callback database-time sample is documented as the authorization/linearization point; commit visibility latency after a passed guard is stated as a physical-time limit. External side effects are forbidden in the callback.

P2 addressed: independent OS-process reopen before/after expiry with lifecycle-event recovery and reclaim fencing; clock advancement between duplicate, forged/rejected, heartbeat, reattach, and model-result operations with deadline assertions; explicit observed PostgreSQL lock-wait synchronization for result/goodbye and timestamp sampling; controlled injected-clock and real PostgreSQL-clock callback-crossing tests.

Revision evidence: `env -u LEO173_TEST_DATABASE_URL PYTHONDONTWRITEBYTECODE=1 /tmp/leo173-r2-venv/bin/python -m pytest -q -p no:cacheprovider` => 3 passed, 12 skipped. New bounded localhost-only PostgreSQL 16 container => 15 passed in 5.86s. Independent probes derived from `/tmp/LEO173-review-evidence/test_review_probes.py` => 2 passed in 4.56s; both exact injected boundary and real database clock with 1.2s database sleep returned expired and committed zero synthetic targets. `git diff --check` and Python compilation pass.

Remaining gaps: migration authored but unapplied; no HTTP/model/Redis/world/privacy/reconnect/pause-resume/parent integration; no production crash test. Child remains In Review pending exactly one independent Claude Opus 5 review via agent-hub. Do not merge automatically.

### Leo Chai - 2026-09-12T20:00:54.849Z

- Comment ID: b45a1797-12b9-4cd4-93f7-e406d5937167
- Updated: 2026-09-12T20:00:54.831Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Opus 5 revision review relay: [MERGE-READY for the internal slice](https://github.com/TheLeoChai/personal-api/pull/1#issuecomment-5648322072). The original P1 expired-callback race and P2 evidence gaps are resolved under the documented trusted database-only callback contract.

Validation reported: actual rerun 15 passed; adapted old probes 5 passed; new probes 8 passed; isolation 3 passed ×3.

Remaining hardening: the forbidden callback contract still trusts callers because `session.commit()` can bypass savepoint expiry rollback; callbacks can modify reservation timestamps; non-default isolation can expose raw serialization errors; unauthorized unknown-resident rows create retention risk before endpoint integration; schema parity/readability nits remain. The post-callback transaction check only detects an already-committed escape and cannot prevent or undo durable writes.

Opus lacked direct Linear access, so this is a documentation relay rather than an independent Linear read. Keep LEO-173 In Review and PR #1 unmerged pending the parent decision; preserve the review history and do not begin follow-up implementation yet.

### Leo Chai - 2026-09-12T20:41:18.707Z

- Comment ID: 8b74d2c2-3b5d-47a1-93a0-747d1369a983
- Updated: 2026-09-12T20:41:18.687Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Merge coordination complete under Leo's current explicit authorization: PR #1 squash-merged 2026-09-12T20:40:21Z to main as a82547be26106d5576da1159dbcb9bda5648bdae. Exact reviewed head c6bbbea590134658cbb41b9aff567ef8e42a45ad was unchanged; --match-head-commit enforced it. Before merge checked live PR/base (05b4005)/10-file diff scope, clean local checkout, branch/worktree state, git diff --check, actual post-callback savepoint implementation and expanded test cases, and independent Opus review5648322072 plus correction5648335514. No product code/review substitute, new tests, DB/container provisioning or migration/deploy in this orchestration turn.

Scoped acceptance relies on preserved independent Opus real-Postgres evidence: 15 suite tests, 5 adapted old probes, 8 own probes, isolation probes 3×3. These were earlier reviewer runs, not newly run by this coordinator. Original expired-callback and evidence failures plus rework remain in history. Approved scope is trusted first-party database-only callbacks; session.commit escapes cannot be undone by posthoc checks. Public integration hardening is explicitly carried in LEO-135 and LEO-169 (callback authority, known resident validation/retention, isolation, schema parity). Parent endpoint/autonomy/privacy/clock/model gates remain incomplete. Child may be Done; original checkout intentionally remains clean on leo-173-conversation-reservations at c6bbbea, no checkout switch or branch deletion.

---
