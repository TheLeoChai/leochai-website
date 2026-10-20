# §1 · Global navigation, typography, state/proof and motion components

- Identifier: LEO-114
- Linear: https://linear.app/leochai/issue/LEO-114/1-global-navigation-typography-stateproof-and-motion-components
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-49
- Sub-issues: None
- Blocks: LEO-143, LEO-78, LEO-77, LEO-76, LEO-75, LEO-74, LEO-73
- Blocked by: LEO-112, LEO-48
- Related: None
- Created: 2026-09-10T22:30:24.346Z
- Updated: 2026-09-12T05:15:52.411Z
- Completed: 2026-09-11T05:03:57.976Z
- Due date: None
- Cycle: None
- Archived: None

## Description

## Current authority — 2026-09-12

Read docs/little-world-direction.md. Wave 1 Home was rejected as a résumé/document/Claude artifact; CP2 is not approved. Little World prototype FIRST, without old Home CP2 dependency. NOW bundled deterministic prototype on /en/work/tiny-world/ and /zh/work/tiny-world/ (retain #live); NEXT independent initial/revised visual review and Leo feedback, then future Home integration; LATER shared episodes/gateway with existing budgets/security/accounting unchanged. Blue off-white, purple ink, pastels/turquoise and subtle Miku hints retained. Sharp edges, hard shadows, forced grid breaks, gradient/word bans and two-pass cap are not requirements.

Preserve Done and merged component history. Existing palette, static access and evidence contracts remain useful. Earlier sharp/hard-shadow/de-slop/Home-exemplar/two-pass requirements below are superseded; pauseable ambient motion is allowed except reduced motion. Correct source paths: assets/css/tokens.css and content/\_includes; site/ is generated.

## Preserved historical / future specification

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
* Verify each global table row, complete proof manifest fields and initial Home compressed transfer ≤500 KB.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Design contract binding (2026-09-11)

`docs/design-system.md` in the leochai-website repo is the authoritative visual contract for this and every FE issue: locked tokens (`site/css/tokens.css`, stylelint-enforced), Radix Colors custom teal scale anchored on #39C5BB, sharp-radius + hard-offset-shadow personality, de-slop gate before In Review, Home-as-exemplar workflow. Palette supersedes storyboard §1's warm-paper/vermillion wording. Handoff process and model mapping (astra high = FE, astra medium = chores): `docs/agent-handoff.md`.

## Comments

### Leo Chai - 2026-09-11T05:05:06.672Z

- Comment ID: 919cfda2-b6f6-40a6-a329-b8a4ab69d37b
- Updated: 2026-09-11T05:05:06.655Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Independently reviewed and squash-merged PR #5: https://github.com/TheLeoChai/leochai-website/pull/5 (2f41212). Feature branch deleted. Critique: https://critique.work/v/303e595a81b0bc28549cd1c6fc9a1ec8 . Passed production/preview builds; exact token/contrast/content gates; regression tests; axe 390/768/1440 and zh; no-JS/failed-module/reduced-motion/keyboard/one-active playback. Player modules total 2,106 gzip bytes. Review fixed Replay double-clock, safe JSON round-trip/intermediate glyph coverage and mobile action gaps. LEO-115 now handles lifecycle freshness policy, then Home uses these shared components.

---
