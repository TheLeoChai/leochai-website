# J2 · Merge, split and ambiguous identity fixtures

- Identifier: LEO-84
- Linear: https://linear.app/leochai/issue/LEO-84/j2-merge-split-and-ambiguous-identity-fixtures
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Job Matching
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-52
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:28:04.142Z
- Updated: 2026-09-11T02:28:44.339Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

Clean merge / clean split / genuinely ambiguous fixtures; first conclusion displayed

### Visitor understands

Different requisitions stay separate; uncertainty is not forced away

### Actions → destinations

Step fixtures/provenance inline

Routes (en or zh; stable fragments): Home `/en/` or `/zh/` (English root `/`); G `/<lang>/projects/`; J `/<lang>/work/job-matching/#preview`; T `/<lang>/work/tiny-world/#live`; L `/<lang>/leo/#ask`; O `/<lang>/work/opencode/` (`#debate`, `#autocompact`, `#agent-pool`, `#xray`); N `/<lang>/notes/` and `/<lang>/notes/<slug>/`; résumé `/assets/leo-chai-resume.pdf`; email uses mailto.

### Constraints and failure behavior (copied specification)

### J4 live contract

* Use a **fixed synthetic candidate and seven bundled observations** through real job-agent normalization, deduplication, hard filtering, validated scoring, outbox, and review-state code. Fixture has two eligible canonical jobs and one deterministic rejection. No visitor résumé, arbitrary URL, or live scraping. Header: **“Live pipeline run on bundled sample jobs; website delivery adapter.”**
* Create a temporary SQLite database per run, preserving the actual project contract. RQ calls a pinned package/CLI adapter, not a JavaScript reimplementation. SSE exposes committed stage events. The website delivery adapter consumes the outbox and acknowledges the displayed card. It sends nothing to Leo's Discord and does not claim to test Discord transport.
* Show counts, duplicate provenance, retained conflict, eligibility reasons, fit/missing skills/concerns, threshold decisions, one card per qualifying canonical job, Apply/Skip/Open. Apply means **“mark approved in this demo; no application submitted.”** Open displays the bundled sample posting, never a purported current vacancy.
* `Repeat ingestion` within the run demonstrates stable IDs, cached scores, and no duplicate notification. An allowlisted threshold adjustment reuses scores. No new model request. Decisions are session-isolated; expire the run after one hour.
* Maximum three upstream attempts/run: two scores plus one shared retry. Total deadline 90 seconds. Malformed output stays unscored. Below-threshold results show reasons even if no match card qualifies.
* Errors remain visible in the channel: `Provider unavailable — scoring incomplete`, `Daily live sample limit reached`, or a named stage failure. Keep actual completed stages; a separate RECORDED panel provides replay. Never splice recorded success into a live transcript.
* Cache by evidence + candidate + model/provider configuration + prompt/schema version. Cached inference says `RECORDED — reused score from <time>` inside a genuinely live deterministic run. Fresh scoring requires a complete budget reservation.

### Acceptance criteria

Milestone interpretation: this child owns the day-30 authored/static/replay scene. Apply the checks below to the bundled evidence and presentation; live execution, runtime fault injection and the AI-Leo generated-answer evaluation are implemented and verified by the separate day-60/day-90 live parents (LEO-62, LEO-63, LEO-67). Those later implementations do not block acceptance of a truthful static scene.

* What appears is implemented as specified above; the stated conclusion is visible and each action reaches its named destination.
* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* **Jobs:** seven observations preserve provenance; requisition conflicts retained; filter reasons visible; only eligible jobs score; no duplicate card on repeat; Apply only changes demo; incomplete scores remain incomplete.

Show the finished conclusion before interaction. Static HTML, conclusions and transcripts remain usable without JS or NAS. No model call on page load. Distinguish input provenance from LIVE / RECORDED / UNKNOWN execution; use server timestamps, capture revision and honest authorship. Keyboard, visible focus, ≥44px targets; reduced motion retains stills/numbered steps; optional assets load on activation.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
