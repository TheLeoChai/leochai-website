# M1 · Day-30 static story and publishing acceptance gate

- Identifier: LEO-128
- Linear: https://linear.app/leochai/issue/LEO-128/m1-day-30-static-story-and-publishing-acceptance-gate
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Release & acceptance
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-58
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-55, LEO-52, LEO-57, LEO-56, LEO-50, LEO-54, LEO-51, LEO-53
- Related: None
- Created: 2026-09-10T22:31:40.287Z
- Updated: 2026-09-11T02:21:23.006Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

| Milestone | Build in order | Ship gate / exclusions |
| -- | -- | -- |
| **Day 30 — static story** | Locale templates/manifest/aliases, state/proof components. H1–H6, G1–G2/G4, J1–J6 bundled transcript, T1–T6 captured or explicitly illustrated farm, L1–L5 authored FAQ/still. Locate OpenCode evidence; produce four diagrams and initial animations. Notes template, two supplied essays and supplied recipe. Private kimaki drafts/images/preview/restricted publisher. | Both core locales readable without JS/NAS; no unsupported metric; missing OpenCode evidence labeled. Base-path checks; one draft publishes and failed build preserves old site. Live inference, rig, PC do not block. |

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
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* Both core locales and preview base pass; a draft publishes and failed build preserves the old site; live inference, PC and rig do not block.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
