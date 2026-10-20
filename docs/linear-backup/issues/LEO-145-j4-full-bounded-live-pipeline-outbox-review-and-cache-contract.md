# J4 · Full bounded live pipeline, outbox, review and cache contract

- Identifier: LEO-145
- Linear: https://linear.app/leochai/issue/LEO-145/j4-full-bounded-live-pipeline-outbox-review-and-cache-contract
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Job Matching
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-63
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-137, LEO-139, LEO-138, LEO-142, LEO-132, LEO-52, LEO-61
- Related: None
- Created: 2026-09-10T22:33:07.235Z
- Updated: 2026-09-11T02:23:20.194Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### J4 live contract

* Use a **fixed synthetic candidate and seven bundled observations** through real job-agent normalization, deduplication, hard filtering, validated scoring, outbox, and review-state code. Fixture has two eligible canonical jobs and one deterministic rejection. No visitor résumé, arbitrary URL, or live scraping. Header: **“Live pipeline run on bundled sample jobs; website delivery adapter.”**
* Create a temporary SQLite database per run, preserving the actual project contract. RQ calls a pinned package/CLI adapter, not a JavaScript reimplementation. SSE exposes committed stage events. The website delivery adapter consumes the outbox and acknowledges the displayed card. It sends nothing to Leo's Discord and does not claim to test Discord transport.
* Show counts, duplicate provenance, retained conflict, eligibility reasons, fit/missing skills/concerns, threshold decisions, one card per qualifying canonical job, Apply/Skip/Open. Apply means **“mark approved in this demo; no application submitted.”** Open displays the bundled sample posting, never a purported current vacancy.
* `Repeat ingestion` within the run demonstrates stable IDs, cached scores, and no duplicate notification. An allowlisted threshold adjustment reuses scores. No new model request. Decisions are session-isolated; expire the run after one hour.
* Maximum three upstream attempts/run: two scores plus one shared retry. Total deadline 90 seconds. Malformed output stays unscored. Below-threshold results show reasons even if no match card qualifies.
* Errors remain visible in the channel: `Provider unavailable — scoring incomplete`, `Daily live sample limit reached`, or a named stage failure. Keep actual completed stages; a separate RECORDED panel provides replay. Never splice recorded success into a live transcript.
* Cache by evidence + candidate + model/provider configuration + prompt/schema version. Cached inference says `RECORDED — reused score from <time>` inside a genuinely live deterministic run. Fresh scoring requires a complete budget reservation.

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

### Acceptance criteria

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **Jobs:** seven observations preserve provenance; requisition conflicts retained; filter reasons visible; only eligible jobs score; no duplicate card on repeat; Apply only changes demo; incomplete scores remain incomplete.
* Seven observations, two eligible canonical jobs and one deterministic rejection traverse the pinned real adapter; expired/session-mismatched actions cannot mutate another run.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
