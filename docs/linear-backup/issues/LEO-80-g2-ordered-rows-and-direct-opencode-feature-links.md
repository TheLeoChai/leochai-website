# G2 · Ordered rows and direct OpenCode feature links

- Identifier: LEO-80
- Linear: https://linear.app/leochai/issue/LEO-80/g2-ordered-rows-and-direct-opencode-feature-links
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Projects gallery
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-51
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:27:32.555Z
- Updated: 2026-09-11T02:29:05.183Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

Fixed order: Jobs, farm, OpenCode, AI-Leo. OpenCode tags `DEBATE`, `AUTOCOMPACT`, `AGENT POOL`, `XRAY` link directly to scenes

### Visitor understands

Depth without a maze

### Actions → destinations

Tags → O2–O5; row image/title share destination

Routes (en or zh; stable fragments): Home `/en/` or `/zh/` (English root `/`); G `/<lang>/projects/`; J `/<lang>/work/job-matching/#preview`; T `/<lang>/work/tiny-world/#live`; L `/<lang>/leo/#ask`; O `/<lang>/work/opencode/` (`#debate`, `#autocompact`, `#agent-pool`, `#xray`); N `/<lang>/notes/` and `/<lang>/notes/<slug>/`; résumé `/assets/leo-chai-resume.pdf`; email uses mailto.

### Constraints and failure behavior (copied specification)

No filters, subcategories, pagination, carousel, hover-only text, or infinite scroll for five items. G3 appears only with a finished asset. First-90-day deliverable: render plus clip; interactive GLB viewer deferred. Timebox creation to two days after core work. Omit the card if unfinished; keep the task in the backlog.

### Acceptance criteria

* What appears is implemented as specified above; the stated conclusion is visible and each action reaches its named destination.
* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.

Show the finished conclusion before interaction. Static HTML, conclusions and transcripts remain usable without JS or NAS. No model call on page load. Distinguish input provenance from LIVE / RECORDED / UNKNOWN execution; use server timestamps, capture revision and honest authorship. Keyboard, visible focus, ≥44px targets; reduced motion retains stills/numbered steps; optional assets load on activation.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
