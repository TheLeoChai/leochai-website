# API · POST /api/demos/jobs/runs/{id}/actions

- Identifier: LEO-139
- Linear: https://linear.app/leochai/issue/LEO-139/api-post-apidemosjobsrunsidactions
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: LEO-145
- Blocked by: LEO-60
- Related: None
- Created: 2026-09-10T22:32:41.139Z
- Updated: 2026-09-11T02:20:57.384Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Route contract

| Route | Contract |
| -- | -- |
| `POST /api/demos/jobs/runs/{id}/actions` | Apply/Skip/re-ingest/allowlisted threshold; same session, no external effect |

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
| Fresh committed event/result | LIVE for execution, timestamp/model; input still says bundled where appropriate |
| No heartbeat for 20s, stale event, or run failure | UNKNOWN current status; last timestamp/completed stages retained; separate RECORDED option |
| Episode completes | Stop LIVE badge; captured trace becomes RECORDED with completion time |
| Cache/replay selected | RECORDED even if animated or delivered by online API |
| Capture missing/corrupt | UNKNOWN evidence; authored conclusion/diagram retained; illustration never relabeled capture |
| Redis/NAS/provider down | Admission closes; no unaccounted calls; static site remains usable |

### J4 live contract

* Use a **fixed synthetic candidate and seven bundled observations** through real job-agent normalization, deduplication, hard filtering, validated scoring, outbox, and review-state code. Fixture has two eligible canonical jobs and one deterministic rejection. No visitor résumé, arbitrary URL, or live scraping. Header: **“Live pipeline run on bundled sample jobs; website delivery adapter.”**
* Create a temporary SQLite database per run, preserving the actual project contract. RQ calls a pinned package/CLI adapter, not a JavaScript reimplementation. SSE exposes committed stage events. The website delivery adapter consumes the outbox and acknowledges the displayed card. It sends nothing to Leo's Discord and does not claim to test Discord transport.
* Show counts, duplicate provenance, retained conflict, eligibility reasons, fit/missing skills/concerns, threshold decisions, one card per qualifying canonical job, Apply/Skip/Open. Apply means **“mark approved in this demo; no application submitted.”** Open displays the bundled sample posting, never a purported current vacancy.
* `Repeat ingestion` within the run demonstrates stable IDs, cached scores, and no duplicate notification. An allowlisted threshold adjustment reuses scores. No new model request. Decisions are session-isolated; expire the run after one hour.
* Maximum three upstream attempts/run: two scores plus one shared retry. Total deadline 90 seconds. Malformed output stays unscored. Below-threshold results show reasons even if no match card qualifies.
* Errors remain visible in the channel: `Provider unavailable — scoring incomplete`, `Daily live sample limit reached`, or a named stage failure. Keep actual completed stages; a separate RECORDED panel provides replay. Never splice recorded success into a live transcript.
* Cache by evidence + candidate + model/provider configuration + prompt/schema version. Cached inference says `RECORDED — reused score from <time>` inside a genuinely live deterministic run. Fresh scoring requires a complete budget reservation.

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* Enforce the route's authentication, admission, data visibility and failure contract; GET/status never starts inference and a 202 never establishes LIVE evidence.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
