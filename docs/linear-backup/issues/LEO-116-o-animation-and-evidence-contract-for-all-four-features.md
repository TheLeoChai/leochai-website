# O · Animation and evidence contract for all four features

- Identifier: LEO-116
- Linear: https://linear.app/leochai/issue/LEO-116/o-animation-and-evidence-contract-for-all-four-features
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: OpenCode
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-55
- Sub-issues: None
- Blocks: LEO-149, LEO-148, LEO-147, LEO-146
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:30:33.957Z
- Updated: 2026-09-11T02:25:56.490Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Animation and evidence contract

Use HTML/SVG timelines driven by bundled redacted event JSON. Each feature has a 10–20s sequence and transcript. Explicit Play; one sequence at a time. Show roles, tool calls, emitted summaries, decisions/results, not hidden model reasoning.

Map actual events into the animation and retain the source trace. Staged diagrams say `Illustration`; reconstructed captures say so and cite the source. No invented latency/token savings. Counts state measured versus estimated. “Omitted from next prompt” does not mean deleted from disk.

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

* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* Four 10–20 second sequences, one active at a time, with source JSON/transcripts and finished stills; no fabricated counts or performance claims.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
