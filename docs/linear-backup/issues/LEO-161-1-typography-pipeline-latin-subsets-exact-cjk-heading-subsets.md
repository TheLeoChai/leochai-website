# §1 · Typography pipeline: Latin subsets + exact CJK heading subsets

- Identifier: LEO-161
- Linear: https://linear.app/leochai/issue/LEO-161/1-typography-pipeline-latin-subsets-exact-cjk-heading-subsets
- Status: Done
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-49
- Sub-issues: None
- Blocks: None
- Blocked by: None
- Related: LEO-160
- Created: 2026-09-11T01:53:11.526Z
- Updated: 2026-09-11T04:56:22.399Z
- Completed: 2026-09-11T04:55:15.660Z
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: `tasks/site-v2-storyboard.md`, §1 global elements.
Decision: D6 in [LEO-160 · ADR · v2 tooling decisions](<https://linear.app/leochai/issue/LEO-160/adr-v2-tooling-decisions-ratified-2026-09-11>) (ratified 2026-09-11).
Build order: M1 · Static story (day 30); child of LEO-49.

### Scope

* Build a FontTools instancer + pyftsubset pipeline for self-hosted Latin WOFF2 subsets: Newsreader display with pinned opsz and wght 400–600; Source Sans 3 UI/body with wght 400–650.
* Emit exact per-route Noto Serif SC 500 Chinese heading subsets using text manifests collected from rendered output, including dynamically displayed text.
* Generate `@font-face` CSS from actual subset cmaps.
* Use a zero-download Chinese body/UI system stack: PingFang SC → Microsoft YaHei → Noto Sans CJK SC; use system mono.
* Retain OFL license files in `vendor/fonts/`.

### Key constraints

* Measure ≤100 KB of fonts per route; do not assume subset estimates satisfy the budget. Measure image-heavy and farm pages before locking typography.
* Chinese body/UI uses only the system stack, with zero font downloads.
* Use `font-display: swap`; no blanket preload.
* Pages remain readable with system fallback fonts.

### Acceptance criteria

* Builds emit subset fonts and matching CSS for both locales.
* Record measured font bytes per route and verify each stays ≤100 KB.
* Pages render correctly with downloaded fonts disabled.
* A missing-glyph check fails the build rather than silently omitting characters, including characters used by dynamically displayed text.

Specification: requirements are reproduced here so this issue can be implemented from Linear.

## Comments

### Leo Chai - 2026-09-11T04:30:50.112Z

- Comment ID: a4e6261f-728a-47d9-97f3-707644ea35d5
- Updated: 2026-09-11T04:30:50.092Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Iteration-1 scope approved by Leo: self-host Latin subsets for Newsreader and Source Sans 3. TODO(iteration 2): exact Noto Serif SC heading subsets; Chinese headings may use the system serif stack in this run. Font fallback and measured Latin budget still required.

### Leo Chai - 2026-09-11T04:47:31.518Z

- Comment ID: cfb72731-25fa-4fac-8d8f-d8104eca011c
- Updated: 2026-09-11T04:47:31.503Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Implemented and independently reviewed in commit 5098ac3. Critique: https://critique.work/v/73030888038adccc16b2d42787ef9cc1 . Reproducible pinned FontTools subsets: Newsreader 51,468 B + Source Sans 3 44,660 B = 96,128 B per English route; browser confirms Chinese downloads 0 font bytes. Both prefix builds, glyph/corruption tests and identical regeneration hashes pass. Both locales at 390/768/1440 remain readable with fonts blocked, JS disabled and reduced motion. CJK exact heading subsets remain the explicitly approved iteration-2 TODO. Integrated token/stylelint/Home gates pending before In Review.

### Leo Chai - 2026-09-11T04:56:22.414Z

- Comment ID: 3aedafae-e3f2-4b08-b378-79c7e27b2a44
- Updated: 2026-09-11T04:56:22.399Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Retrofit complete under the new branch/PR policy: https://github.com/TheLeoChai/leochai-website/pull/4 squash-merged as 7dc08a3. Source branch deleted. Independent parent review, font browser measurements/fallback screenshots and token/content checks passed. Local main resynced in a clean isolated checkout; in-flight components preserved on leo-114-shared-components. Moved to Done only after verified merge.

---
