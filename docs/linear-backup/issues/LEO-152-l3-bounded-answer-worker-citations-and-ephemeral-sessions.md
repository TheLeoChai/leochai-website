# L3 · Bounded answer worker, citations and ephemeral sessions

- Identifier: LEO-152
- Linear: https://linear.app/leochai/issue/LEO-152/l3-bounded-answer-worker-citations-and-ephemeral-sessions
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-67
- Sub-issues: None
- Blocks: LEO-153
- Blocked by: LEO-141, LEO-140, LEO-132, LEO-151, LEO-66, LEO-61
- Related: None
- Created: 2026-09-10T22:33:45.432Z
- Updated: 2026-09-11T02:23:16.772Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### AI-Leo retrieval architecture

* Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
* Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
* Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk \~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
* Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
* `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
* RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
* Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
* Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

### Launch budget: $0 in purchased inference

OpenRouter currently documents **50 requests/day and 20/minute** for unfunded free-model use; qualifying credit purchases increase the daily allowance. More keys do not create account quota. Availability is opportunistic, not an SLA. [OpenRouter limits](<https://openrouter.ai/docs/api_reference/limits>), [published free-tier figures](<https://openrouter.ai/blog/tutorials/how-to-get-the-lowest-cost-llm-inference-on-openrouter/>).

**Site ceiling: 40 upstream attempts per UTC day, six/minute, one in flight globally.** Deployment checks actual limits, eligibility, competing account usage; reduce this ceiling when needed. No paid fallback, auto-top-up, quota-evading key rotation, or trial-credit dependence. Free describes inference billing; NAS electricity/storage/bandwidth/maintenance still cost something.

| Reservation | Attempts/day | Max input/output tokens per attempt | Buys |
| -- | -- | -- | -- |
| Farm | 16 | 2,000 / 256 | Two episodes, each six decisions plus two retries |
| Jobs | 12 | 3,000 / 500 | Four runs, each two scores plus one retry |
| AI-Leo | 8 | 2,500 / 400 | Eight uncached answers, no retry |
| Optional post polish | 2 | 4,000 / 1,000 | Two cleanups; long posts use deterministic formatting |
| Verification reserve | 2 | 3,000 / 500 | Smoke probes, not continual inference health checks |
| **Total** | **40** | **≤102,000 input / ≤16,296 output tokens/day** | Hard ceilings, not promised throughput |

* A server-side gateway holds the OpenRouter key. Pin tested `:free` model IDs/provider policy per feature in deployment config. No browser model/provider/key selection; no random free router for recorded comparisons. Verify zero-priced routes and schema/language behavior before release. Record exact model ID in captures; retired/unavailable model → fail closed. Model selection is a deployment gate, not a promise that today's model exists in 90 days.
* Redis atomically reserves each run's maximum attempts and enforces shared caps. Postgres durably records reservations/attempts so Redis restart cannot replenish quota. Reserve before enqueue; idempotency prevents double reservation. Failed calls/retries count conservatively. Release safely expired unused reservations; never refund unknown sent attempts. Disable implicit SDK retries and model-fallback loops.
* Budgets span locales/features and the provider account. No automatic transfer between allocations. Other account usage reduces availability; provider 429 overrides the local ledger.
* Per signed anonymous session and hashed-IP bucket: one fresh Job run/day, two AI-Leo answers/day, one farm-create request/day. Watching/replay consumes no model quota. Use short-lived capabilities, origin checks, payload limits and gateway limits together; CORS is not abuse prevention. Distributed abuse can still exhaust the allowance; accept replay as the degraded experience.
* Honor Retry-After; do not hold visitors through long throttles. Circuit-break repeated errors/exhaustion. Message: “Today's live allowance is used; explore the recorded example.” Do not promise an unverified provider reset time.

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

### Acceptance criteria

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Implement behind a disabled public submission gate; internal evaluation can exercise the complete answer path without enabling free-form public Q&A.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
