# M3 · Final bilingual visitor flows and release acceptance

- Identifier: LEO-158
- Linear: https://linear.app/leochai/issue/LEO-158/m3-final-bilingual-visitor-flows-and-release-acceptance
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-72
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-67, LEO-68, LEO-69
- Related: None
- Created: 2026-09-10T22:34:18.736Z
- Updated: 2026-09-11T02:24:50.536Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## 12. User flows

* **F1 · 90-second lead:** H1 identity → H2 resolved specimen → H3 accomplishments → H4 farm image → H5 person → H6 contact. Zero required clicks or inference.
* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F3 · Farm sharer:** `/<lang>/work/tiny-world/#live` → captured farm immediately → join/reserve episode → resident observation → adaptation label.
* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F5 · Casual explorer:** gallery → PC clip → recipe → RSS. Engineering knowledge optional.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.
* **F9 · Publish dinner:** private Discord photos/text → draft → private preview → one Publish click → verified article link. No terminal/Markdown editing.
* **F10 · Owner evening:** Tailscale → private launchpad → existing Jellyfin sign-in. No public-site payload.

## 14. Build order — day 30 / 60 / 90

| Milestone | Build in order | Ship gate / exclusions |
| -- | -- | -- |
| **Day 30 — static story** | Locale templates/manifest/aliases, state/proof components. H1–H6, G1–G2/G4, J1–J6 bundled transcript, T1–T6 captured or explicitly illustrated farm, L1–L5 authored FAQ/still. Locate OpenCode evidence; produce four diagrams and initial animations. Notes template, two supplied essays and supplied recipe. Private kimaki drafts/images/preview/restricted publisher. | Both core locales readable without JS/NAS; no unsupported metric; missing OpenCode evidence labeled. Base-path checks; one draft publishes and failed build preserves old site. Live inference, rig, PC do not block. |
| **Day 60 — farm and Jobs live** | Service entries; gateway accounting, queue isolation, outbox/SSE/reconnect/kill switches. T3 shared episodes; passive H4. J4 real sample pipeline/outbox/review/cache rerun. Complete OpenCode recorded animations for verified features; unresolved ones marked. | Rejection/timeout, shared viewers, isolated job actions, idempotency, restart, quota/provider/NAS failure checks pass. Daily cap 40. No public coding instance. |
| **Day 90 — grounded AI-Leo and personality** | Approved recordings if supplied, otherwise approved text. L3 lexical RAG/source UI after evaluation. More genuine Notes/recipes, translations/captions, reader-driven refinement. Private launchpad to existing Jellyfin. At most two days for G3 render/clip. Optional Live2D gesture only after rights/performance gate. | Grounded-answer check and private-data audit pass. PC/rig defer if they threaten gates. No public OpenCode, arbitrary world steering, live scraping, long-term visitor memory, semantic embedding migration, standalone infra page. |

### Acceptance checks deciding “done”

1. **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
2. **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
3. **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
4. **Jobs:** seven observations preserve provenance; requisition conflicts retained; filter reasons visible; only eligible jobs score; no duplicate card on repeat; Apply only changes demo; incomplete scores remain incomplete.
5. **Farm:** observation isolation, invalid-action rejection, one writer, replay from committed events, SSE resume, zero-viewer shutdown. Captured actions replay deterministically; rerunning LLM does not promise identical decisions.
6. **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
7. **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
8. **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.

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

* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **Jobs:** seven observations preserve provenance; requisition conflicts retained; filter reasons visible; only eligible jobs score; no duplicate card on repeat; Apply only changes demo; incomplete scores remain incomplete.
* **Farm:** observation isolation, invalid-action rejection, one writer, replay from committed events, SSE resume, zero-viewer shutdown. Captured actions replay deterministically; rerunning LLM does not promise identical decisions.
* **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* Record evidence for all F1–F10 and explicit PC/rig ship/defer decisions; optional assets never delay core gates.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
