# L3 · Anime still and optional Live2D rights/performance decision

- Identifier: LEO-157
- Linear: https://linear.app/leochai/issue/LEO-157/l3-anime-still-and-optional-live2d-rightsperformance-decision
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-71
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-68, LEO-67
- Related: None
- Created: 2026-09-10T22:34:13.136Z
- Updated: 2026-09-11T02:24:57.399Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Anime character decision

Keep anime identity. Ship an original/commissioned **still first**, credited with rights. Day 90 permits a Live2D rig only in L3 if optional download ≤2 MB and asset/runtime rights are checked. States: idle-still, brief question-sent motion, one answer-ready gesture. No constant loop, fake lip-sync, camera tracking, microphone, voice cloning, or floating mascot. It reflects application events, not emotions of a digital person. Rig/load/WebGL failure leaves still and text Q&A intact. Zero model calls for animation.

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
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* Record explicit ship/defer outcome; ≤2 MB rig with verified asset/runtime rights and failure-safe still/text; no model calls.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
