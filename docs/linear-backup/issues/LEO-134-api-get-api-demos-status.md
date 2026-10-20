# API · GET /api/demos/status

- Identifier: LEO-134
- Linear: https://linear.app/leochai/issue/LEO-134/api-get-apidemosstatus
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-60
- Related: None
- Created: 2026-09-10T22:32:14.500Z
- Updated: 2026-09-12T09:26:42.149Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Route contract

| Route | Contract |
| -- | -- |
| `GET /api/demos/status` | Timestamped observed town/world freshness and separate inference availability; never starts inference or creates a world |

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

Authenticated streams use fetch streaming with capability headers, not tokens in SSE query URLs. Events carry run ID, monotonic sequence, server timestamp, provenance, execution kind. Commit state/outbox atomically; publisher fans out to Redis Streams. FastAPI streams without occupying an RQ worker per viewer. Reconnect from last sequence; trimmed history returns a snapshot plus sequence. Drop slow clients, never unbounded buffers. Cap public streams at 50, two/session; queued inference jobs at eight, admission wait at 15 seconds. Excess clients receive static fallback immediately.

| Transition | Visitor behavior |
| -- | -- |
| Initial load | Finished static scene/evidence, no blank loading shell |
| Live requested | “Queued” beside baseline; 202 alone never makes evidence LIVE |
| Fresh committed event/result | LIVE only for actual evidenced execution with timestamp/provenance. Town world freshness and inference status are separate; a deterministic tick does not imply live inference. |
| No heartbeat for 20s, stale event, or run failure | UNKNOWN current status; last timestamp/completed stages retained; separate RECORDED option |
| Finite non-town run completes | Stop LIVE badge; real captured trace becomes RECORDED with completion time. Historical town episode-completion rule is superseded. |
| Cache/real capture replay selected | RECORDED with provenance; authored 40s town fixture stays Illustration, never RECORDED |
| Capture missing/corrupt | UNKNOWN evidence; authored conclusion/diagram retained; illustration never relabeled capture |
| Redis/NAS/provider down | Close affected inference admission; no unaccounted calls. Static poster/readable fallback remains. Town storage and safe deterministic ongoing actions may continue under LEO-144 policy while decisions are honestly queued/paused; no fake dialogue. |

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* Enforce the route's authentication, admission, data visibility and failure contract; GET/status never starts inference and a 202 never establishes LIVE evidence.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Persistent-town status acceptance — 2026-09-12

Depends on LEO-165 capacity gate and LEO-143 state contract; coordinate LEO-136 snapshot projection. Distinguish healthy deterministic world from queued/paused/unavailable model decisions. Busy/free resident state may be published without leaking visitor identity/text; visibility awaits LEO-131. Heartbeats/status/reconnect do not renew LEO-135 leases or cause inference. NAS asleep shows readable poster and honest stale/unknown status. The town is not an episode and does not end when zero viewers remain. Existing unrelated feature status contracts stay intact.

## Comments

No comments returned by Linear.
