# §11 · Demo data retention, logs and deployment documentation

- Identifier: LEO-131
- Linear: https://linear.app/leochai/issue/LEO-131/11-demo-data-retention-logs-and-deployment-documentation
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-59
- Sub-issues: None
- Blocks: LEO-136, LEO-135, LEO-172, LEO-170, LEO-169, LEO-167
- Blocked by: LEO-58
- Related: None
- Created: 2026-09-10T22:31:58.042Z
- Updated: 2026-09-12T20:40:30.426Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Persistent-town privacy decision and implementation slice — 2026-09-12

Reuse this privacy/retention owner; roughly 0.5–2 engineer-days for a decided-policy projection/redaction slice, not a full integration estimate. LEO-165 capacity/model gate precedes backend/inference provisioning. Jobs/AI-Leo/publishing privacy and retention below are unchanged; their ephemeral sessions do not govern persistent-town memories.

### User decisions still OPEN — resolve before real visitor chat/storage

* Are conversation texts visible to other visitors? Suggested private text with public resulting in-world actions is NOT approved. Record Leo's decision before public chat; do not infer approval from this ticket.
* Specify selected-memory retention duration/selection limits, deletion/redaction request process and identity proof, treatment of derived summaries, event projections/captures and backup deletion/expiry. Durable fictional world state may survive while selected personal information is redacted; seven-day capture expiry is not a memory policy.
* Record whether selected local model keeps prompts on NAS or an explicitly approved external provider sees them, provider routing/data retention constraints and exact pre-chat disclosure. No external prompts before route/privacy approval.

### Acceptance after decision

* Tell visitors before submission that selected information can remain in persistent world memories, who can see conversation text/resulting actions, whether a provider receives prompts, and how long data remains/how to request deletion. No false “ephemeral” promise.
* No raw private conversation logging. Logs contain IDs/timings/error codes/counters only, with bounded/redacted errors; screenshots/captures and telemetry obey the visibility decision.
* No private files, kimaki history, DMs or owner storage ingestion. Visitor claims cannot rewrite approved biography. Store selected memories with resident/source/event IDs, provenance, visibility, untrusted status and summary lineage; summaries never launder claims.
* Define approved character fact correction/versioning separately from visitor memory deletion. LEO-166 owns approved facts; LEO-167 implements memory/relationship storage and redaction propagation; LEO-136/170 enforce public/private projections.
* Test two visitors/residents cannot access forbidden sources, redaction reaches derived retrieval/projections, backup restore cannot silently revive deleted data, and no private text leaks in logs/errors/captures.

Dependencies: policy decision before LEO-167/169/135/136 public activation; LEO-165 for model/provider disclosure. This issue records work and open decisions, not user approval of a suggested default.

### Preserved shared-service documentation and unrelated privacy requirements

Public town world events are fictional and approved biography stays separately sourced; visitor conversation visibility is OPEN under LEO-131 and cannot be treated as automatically public fictional data. Leo citations contain approved excerpts only. Logs keep IDs/timings/error codes/counters, not raw questions/secrets. Rate-limit hashes expire after 24h; redacted NAS demo captures after seven days; this capture TTL does not delete the persistent town or decide selected visitor-memory retention. Promote reviewed captures into the static bundle deliberately.

Before implementation, record per-service hosting in `services/README.md`; overall NAS choice is already recorded. Update `docs/infra.md` when actual infra changes. Its recovered-source/container notes conflict with older “not in repo” / “root-only” sections; resolve through deployment inspection, not assumptions.

Use the existing decision: **kawaiinas + Caddy + DDNS**, `https://api.leochai.com`, FastAPI/Postgres/Redis/RQ. No cloud GPU, new host, or paid always-on inference. Give each integration a self-contained `services/` folder, README, and public scene link. No backend code in `site/`.

| Component | Responsibility / boundary |
| -- | -- |
| Pages | Locale HTML, conclusions, traces, animations, posters, published media. No keys/private drafts. |
| Caddy + demo FastAPI | HTTPS, limits, signed capabilities, snapshot/SSE, validation/admission; exact-origin CORS. No arbitrary URL proxy. |
| Redis | Limits, ephemeral sessions, queues, run lock, bounded event streams; not sole accounting ledger or world authority. |
| Postgres | Runs, authoritative world/events/memories, approved Leo corpus, attempt ledger, separately protected publishing tables; transactional event outbox. |
| RQ | Separate `world`, `jobs`, `leo`, `publish` queues/workers. Public workers lack Git/Discord credentials, Docker socket, owner storage, personal candidate files. |
| Inference gateway | Serial admission, free-model allowlist, privacy policy, receipts, deadlines/output caps; no NAS-access tools. |
| Job storage | Per-run SQLite, deleted after an hour; no access to real job database. |
| Owner/publisher | Tailscale-only preview/launchpad, authenticated internal bot route, isolated checkout, narrow deploy authority. Public requests cannot enqueue publishing. |

### Acceptance criteria

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Expire rate-limit hashes after 24h and redacted NAS demo captures after seven days (capture retention only, not a town-state or selected-memory lifetime); logs contain IDs/timings/error codes/counters, not raw questions/secrets.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

### Leo Chai - 2026-09-12T20:40:30.443Z

- Comment ID: 3c1af0f3-89db-408f-bc51-e6a029e1a3fa
- Updated: 2026-09-12T20:40:30.426Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Current orchestration retains the privacy gate: synthetic private local inputs only; no public real visitor chat collection or transcript projection. Decisions still needed from Leo before activation: (1) conversation-text audience and resulting-action visibility; (2) selected-memory lifetime/selection limits plus deletion identity proof and request process; (3) propagation to summaries, projections/captures and backup expiry/restore; (4) approved inference route/provider disclosure. No suggested private-text/public-action policy has been treated as approved. LEO-174 only tests explicitly supplied synthetic visibility permissions and provenance; it cannot satisfy this privacy parent.

---
