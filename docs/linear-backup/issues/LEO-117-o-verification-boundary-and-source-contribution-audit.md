# O · Verification boundary and source/contribution audit

- Identifier: LEO-117
- Linear: https://linear.app/leochai/issue/LEO-117/o-verification-boundary-and-sourcecontribution-audit
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: OpenCode
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-55
- Sub-issues: None
- Blocks: LEO-149, LEO-148, LEO-147, LEO-146
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:30:41.019Z
- Updated: 2026-09-11T02:25:52.975Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

**Verification boundary:** inspected checkout `73e07e431` declares a 0.75 compaction threshold in configuration; `packages/core/src/session/compaction.ts` includes high/low prompt passes. A schema default does not prove the active runtime honors it. Pin the running entrypoint, inspect upstream diff, capture a session before claiming a “75% trigger” or retention behavior. Debate, agent-pool, xray were not located in inspected paths. This does not prove absence; locate source/companion repos and contribution history before claiming implementation. Until then, show their proposed animation with `UNKNOWN — implementation evidence pending`, or omit from Home proof. Producing truthful evidence for all four is assigned work, not permission to fabricate it.

## 15. Evidence used for this revision

Local read-only inspection on 2026-09-10:

| Source | Establishes / does not establish |
| -- | -- |
| Original storyboard | Five core destinations, instant conclusions, one-live baseline, uncertainty, scene format; revised explicitly above |
| `AGENTS.md`, README, publish script, services docs, infra inventory | Static Pages deployment, NAS FastAPI/Postgres/Redis/RQ, existing Jellyfin, conflicting historical/domain notes; not a new runtime audit |
| job-agent `20bdedb`, README | Implemented discovery/dedupe/filter/scoring/outbox/review, synthetic 7→3 fixture/idempotent rerun; live scoring/Discord verification documented pending credentials |
| ai-society `ef5bcfa`, README and memory modules | Deterministic state ownership, provenance/validity, retrieval seams; real embedding adapter stub, Discord shell only FakeModel echo |
| leos-opencode `73e07e431`, compaction config/implementation | Threshold config and high/low prompts; active runtime behavior/upstream attribution/other feature locations still need verification |

These are working-checkout observations, not proof of deployed integrations. External constraints are linked where used. Real captures and deployment-time provider checks replace assumptions before LIVE labels or performance claims ship.

### Acceptance criteria

* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* Locate and pin evidence for every claimed feature; unresolved features show UNKNOWN — implementation evidence pending, and cannot supply Home proof.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
