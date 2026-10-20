# API · POST /api/demos/leo/answers

- Identifier: LEO-140
- Linear: https://linear.app/leochai/issue/LEO-140/api-post-apidemosleoanswers
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: LEO-152
- Blocked by: LEO-60
- Related: None
- Created: 2026-09-10T22:32:45.803Z
- Updated: 2026-09-11T02:20:54.097Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Route contract

| Route | Contract |
| -- | -- |
| `POST /api/demos/leo/answers` | Bounded retrieval/answer job, short-lived capability |

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

### AI-Leo retrieval architecture

* Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
* Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
* Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk \~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
* Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
* `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
* RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
* Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
* Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* Enforce the route's authentication, admission, data visibility and failure contract; GET/status never starts inference and a 202 never establishes LIVE evidence.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
