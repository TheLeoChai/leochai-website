# §11 · Atomic events, resumable SSE and bounded transport

- Identifier: LEO-142
- Linear: https://linear.app/leochai/issue/LEO-142/11-atomic-events-resumable-sse-and-bounded-transport
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: LEO-136, LEO-145, LEO-144
- Blocked by: LEO-132, LEO-60
- Related: None
- Created: 2026-09-10T22:32:54.099Z
- Updated: 2026-09-12T09:26:46.491Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Authenticated streams use fetch streaming with capability headers, not tokens in SSE query URLs. Events carry run ID, monotonic sequence, server timestamp, provenance, execution kind. Commit state/outbox atomically; publisher fans out to Redis Streams. FastAPI streams without occupying an RQ worker per viewer. Reconnect from last sequence; trimmed history returns a snapshot plus sequence. Drop slow clients, never unbounded buffers. Cap public streams at 50, two/session; queued inference jobs at eight, admission wait at 15 seconds. Excess clients receive static fallback immediately.

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

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **Farm:** observation isolation, invalid-action rejection, one writer, replay from committed events, SSE resume and persistent progress independent of viewer count; historical zero-viewer town shutdown is superseded. Captured actions replay deterministically; rerunning LLM does not promise identical decisions.
* Commit state/outbox atomically; verify sequence reconnect, trimmed-history snapshot, 50 global/two session streams, eight queued inference jobs and 15s admission bound.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Persistent-town transport acceptance — 2026-09-12

LEO-144 owns state/outbox; this transport fans out committed events only. LEO-136 reads stable world ID/revision/epoch and monotonically sequenced events, with atomic snapshot+sequence recovery after restart/trimming. Model intent cannot enter truth before validation. Public projections respect LEO-131 visibility decision; conversation text/capabilities/private memories never leak. Stream heartbeats/reconnect do not extend LEO-135's exact 300s visitor-idle lease or cause inference. No stream/viewer count shutdown of persistent state; LEO-169 bounds inference queue separately. Depends on LEO-165 before town provisioning; LEO-171 tests two-browser convergence and restart. Existing stream/queue caps and unrelated transport remain effective.

## Comments

No comments returned by Linear.
