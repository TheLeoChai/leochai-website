# §11 · NAS architecture, service inventory and worker isolation

- Identifier: LEO-130
- Linear: https://linear.app/leochai/issue/LEO-130/11-nas-architecture-service-inventory-and-worker-isolation
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-59
- Sub-issues: None
- Blocks: LEO-132
- Blocked by: LEO-58
- Related: None
- Created: 2026-09-10T22:31:51.906Z
- Updated: 2026-09-12T09:26:17.727Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Town integration gate — 2026-09-12

LEO-165 owns actual NAS CPU/RAM/GPU and AI Society reuse/model-capacity audit before town backend/inference provisioning. Its supplied source evidence is not a deployment test. Keep existing NAS FastAPI/Postgres/Redis/RQ/Caddy/DDNS and static GitHub Pages; no migration/new capacity. LEO-144 owns durable shared world; in-memory AI Society world/memory is not already persistent. LEO-169 owns bounded public admission. Unrelated platform scopes below remain effective.

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

Public town world events are fictional and approved biography stays separately sourced; visitor conversation visibility is OPEN under LEO-131 and cannot be treated as automatically public fictional data. Leo citations contain approved excerpts only. Logs keep IDs/timings/error codes/counters, not raw questions/secrets. Rate-limit hashes expire after 24h; redacted NAS demo captures after seven days; this capture TTL does not delete the persistent town or decide selected visitor-memory retention. Promote reviewed captures into the static bundle deliberately.

Before implementation, record per-service hosting in `services/README.md`; overall NAS choice is already recorded. Update `docs/infra.md` when actual infra changes. Its recovered-source/container notes conflict with older “not in repo” / “root-only” sections; resolve through deployment inspection, not assumptions.

### Acceptance criteria

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Record per-service hosting before implementation; self-contained service folders and READMEs include local operation, host and public scene URL; no backend runtime in site/.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

Town acceptance: inspect reuse rather than add another architecture; public workers cannot access private files/kimaki history or privileged credentials. Process/Redis restart cannot lose durable town state or replenish inference reservations; LEO-144/135/132 own those contracts. No backend provisioning before LEO-165 closes; record inspected hosting/infra only in a later authorized implementation session.

## Comments

No comments returned by Linear.
