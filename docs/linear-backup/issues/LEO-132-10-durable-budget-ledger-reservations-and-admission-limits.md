# §10 · Durable budget ledger, reservations and admission limits

- Identifier: LEO-132
- Linear: https://linear.app/leochai/issue/LEO-132/10-durable-budget-ledger-reservations-and-admission-limits
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-60
- Sub-issues: None
- Blocks: LEO-169, LEO-152, LEO-145, LEO-144, LEO-142
- Blocked by: LEO-130, LEO-59
- Related: None
- Created: 2026-09-10T22:32:02.558Z
- Updated: 2026-09-12T09:26:35.003Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Persistent-town capacity amendment — 2026-09-12

LEO-165 gates actual NAS capacity/model choice before any town backend/inference provisioning. Continuous LLM-directed life exceeds the OLD 40-attempt/day plan; the old farm allocation/episode/token plan below is HISTORICAL for the superseded town. No replacement town allocation or increased spend is authorized. Jobs 12/day (3/run), AI-Leo 8/day (1/answer), polish 2/day and verification 2/day, their token/session caps, $0 purchased-inference policy and existing account-wide ceilings remain effective until explicitly changed. No allocation transfer, paid fallback or new capacity. A suitable local route needs the audit; any external route needs explicit Leo approval of budget/latency/privacy. LEO-169 owns bounded town admission and outage handling after that gate.

### Launch budget: $0 in purchased inference

OpenRouter currently documents **50 requests/day and 20/minute** for unfunded free-model use; qualifying credit purchases increase the daily allowance. More keys do not create account quota. Availability is opportunistic, not an SLA. [OpenRouter limits](<https://openrouter.ai/docs/api_reference/limits>), [published free-tier figures](<https://openrouter.ai/blog/tutorials/how-to-get-the-lowest-cost-llm-inference-on-openrouter/>).

**Site ceiling: 40 upstream attempts per UTC day, six/minute, one in flight globally.** Deployment checks actual limits, eligibility, competing account usage; reduce this ceiling when needed. No paid fallback, auto-top-up, quota-evading key rotation, or trial-credit dependence. Free describes inference billing; NAS electricity/storage/bandwidth/maintenance still cost something.

| Reservation | Attempts/day | Max input/output tokens per attempt | Buys |
| -- | -- | -- | -- |
| Historical farm only — superseded | 16 (not allocated to persistent town) | 2,000 / 256 (historical) | Former two six-decision episodes plus retries; do not implement this town plan |
| Jobs | 12 | 3,000 / 500 | Four runs, each two scores plus one retry |
| AI-Leo | 8 | 2,500 / 400 | Eight uncached answers, no retry |
| Optional post polish | 2 | 4,000 / 1,000 | Two cleanups; long posts use deterministic formatting |
| Verification reserve | 2 | 3,000 / 500 | Smoke probes, not continual inference health checks |
| **Old allocation-plan total** | **40** | **≤102,000 input / ≤16,296 output tokens/day** | Historical composition; existing account ceiling remains effective, no implied town allocation/increase |

* A server-side gateway holds the OpenRouter key. Pin tested `:free` model IDs/provider policy per feature in deployment config. No browser model/provider/key selection; no random free router for recorded comparisons. Verify zero-priced routes and schema/language behavior before release. Record exact model ID in captures; retired/unavailable model → fail closed. Model selection is a deployment gate, not a promise that today's model exists in 90 days.
* Redis atomically reserves each run's maximum attempts and enforces shared caps. Postgres durably records reservations/attempts so Redis restart cannot replenish quota. Reserve before enqueue; idempotency prevents double reservation. Failed calls/retries count conservatively. Release safely expired unused reservations; never refund unknown sent attempts. Disable implicit SDK retries and model-fallback loops.
* Budgets span locales/features and the provider account. No automatic transfer between allocations. Other account usage reduces availability; provider 429 overrides the local ledger.
* Per signed anonymous session and hashed-IP bucket: one fresh Job run/day, two AI-Leo answers/day, historical one farm-create request/day is superseded for the town (no public create operation). Watching/replay consumes no model quota. Use short-lived capabilities, origin checks, payload limits and gateway limits together; CORS is not abuse prevention. Distributed abuse can still exhaust the allowance; accept replay as the degraded experience.
* Honor Retry-After; do not hold visitors through long throttles. Circuit-break repeated errors/exhaustion. Message: “Today's live allowance is used; explore the recorded example.” Do not promise an unverified provider reset time.

### Acceptance criteria

* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* Verify every allocation/token cap, account-wide UTC rollover, unknown sent-attempt handling, idempotent reservations and restart recovery; no implicit SDK retries or paid fallback.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

Town-specific acceptance: LEO-165 decision precedes provisioning; LEO-169 uses finite queue/rates/deadlines and conservative durable admission without borrowing unrelated budgets. Restart preserves reservations; unknown-sent calls stay counted. Model downtime never produces catch-up call storms, quota bypass or fake LIVE speech. World persistence need not stop with inference. Privacy visibility remains OPEN under LEO-131.

## Comments

No comments returned by Linear.
