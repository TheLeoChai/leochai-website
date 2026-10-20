# §11 · LIVE / RECORDED / UNKNOWN state transition table

- Identifier: LEO-143
- Linear: https://linear.app/leochai/issue/LEO-143/11-live-recorded-unknown-state-transition-table
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-61
- Sub-issues: None
- Blocks: LEO-136, LEO-170
- Blocked by: LEO-114, LEO-60
- Related: None
- Created: 2026-09-10T22:32:57.932Z
- Updated: 2026-09-12T09:26:50.092Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

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

Authenticated streams use fetch streaming with capability headers, not tokens in SSE query URLs. Events carry run ID, monotonic sequence, server timestamp, provenance, execution kind. Commit state/outbox atomically; publisher fans out to Redis Streams. FastAPI streams without occupying an RQ worker per viewer. Reconnect from last sequence; trimmed history returns a snapshot plus sequence. Drop slow clients, never unbounded buffers. Cap public streams at 50, two/session; queued inference jobs at eight, admission wait at 15 seconds. Excess clients receive static fallback immediately.

### Global elements

| Element | Spec |
| -- | -- |
| Nav | `Leo Chai — Projects · Notes · Résumé`. Name links to locale Home; current section underlined. No dropdowns. Meet Leo is linked from Home and Projects. |
| Footer | Email · GitHub · locale RSS · “Static pages; live experiments run on my server at home.” Infrastructure explanation is inline, not another page. |
| Typography | Warm paper, dark ink, vermillion accent; serif statements, sans UI, mono actual data. Chinese typography retains hierarchy and readable line lengths. |
| Motion | One \~300ms entrance per element. Explanatory sequences run on Play, with Pause/Replay/Scrub, never automatic loops. Reduced motion shows completed diagrams and numbered steps. No scroll-hijack. |
| State chips | LIVE includes run ID and last event time; RECORDED includes capture time and revision; UNKNOWN names missing evidence/failure. Server timestamps, not connection status alone. |
| Bundled content | `Bundled fixture`, `Illustration`, `Local 3D animation` are source labels, not a fourth execution chip. A synthetic illustration is not a recorded run. |
| Page weight | Home initial compressed transfer ≤500 KB excluding optional résumé. No WebGL, Live2D runtime, or video download on Home. Optional detail assets load on activation. |
| Access | Conclusions/transcripts work without JS; keyboard controls, visible focus, touch targets ≥44px. Do not announce every farm tick through a screen reader. |
| Proof manifest | Run-backed exhibits record repo, commit, capture date, input/scenario hash, provider/model, trace schema, redaction note, and Leo's contribution. Metrics link to evidence. |

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* Exercise every transition row; a 20s heartbeat gap or failure preserves last evidence while current state becomes UNKNOWN; finite non-town completed runs and actual caches/captures are RECORDED; authored town illustrations are not.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Persistent-town state contract — 2026-09-12

LEO-62 supersedes short episodes; LEO-165 gates provisioning/model capacity. Server connectivity or deterministic ongoing motion never establishes live model inference. Show authoritative world ID/revision/last event time separately from inference queued/paused/unavailable status. A model outage can coexist with safe deterministic ongoing activity under LEO-144; no invented speech, fake inference LIVE or hidden catch-up calls. Fresh world evidence may be live while model decisions are paused. The persistent town does not stop on episode completion or zero viewers.

Keep the authored 40s JSON fixture separately labeled Illustration; RECORDED requires a real captured execution and provenance. Stale/disconnected NAS retains timestamped last-known state and readable poster/static fallback; reconnect must recover LEO-136 authority. Local display Pause never pauses server truth. LEO-170 uses this table; LEO-171/172 verify outage/queue/reconnect/illustration transitions. Conversation availability/expiry is server-owned LEO-135, with text visibility OPEN under LEO-131. Typography and motion copies above retain historical context; current FE palette/visual contract is docs/design-system.md and LEO-53, not this older duplicated palette row.

## Comments

No comments returned by Linear.
