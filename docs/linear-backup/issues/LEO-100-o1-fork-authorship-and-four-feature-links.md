# O1 · Fork authorship and four feature links

- Identifier: LEO-100
- Linear: https://linear.app/leochai/issue/LEO-100/o1-fork-authorship-and-four-feature-links
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: OpenCode
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-55
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:29:08.573Z
- Updated: 2026-09-11T02:27:15.990Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

Problem; “My OpenCode fork and companion tooling”; upstream link, pinned Leo changes, four feature tags

### Visitor understands

Work on an existing project with specific authorship

### Actions → destinations

Tags → O2–O5; all scenes readable without tabs

Routes (en or zh; stable fragments): Home `/en/` or `/zh/` (English root `/`); G `/<lang>/projects/`; J `/<lang>/work/job-matching/#preview`; T `/<lang>/work/tiny-world/#live`; L `/<lang>/leo/#ask`; O `/<lang>/work/opencode/` (`#debate`, `#autocompact`, `#agent-pool`, `#xray`); N `/<lang>/notes/` and `/<lang>/notes/<slug>/`; résumé `/assets/leo-chai-resume.pdf`; email uses mailto.

### Constraints and failure behavior (copied specification)

### Animation and evidence contract

Use HTML/SVG timelines driven by bundled redacted event JSON. Each feature has a 10–20s sequence and transcript. Explicit Play; one sequence at a time. Show roles, tool calls, emitted summaries, decisions/results, not hidden model reasoning.

Map actual events into the animation and retain the source trace. Staged diagrams say `Illustration`; reconstructed captures say so and cite the source. No invented latency/token savings. Counts state measured versus estimated. “Omitted from next prompt” does not mean deleted from disk.

**Verification boundary:** inspected checkout `73e07e431` declares a 0.75 compaction threshold in configuration; `packages/core/src/session/compaction.ts` includes high/low prompt passes. A schema default does not prove the active runtime honors it. Pin the running entrypoint, inspect upstream diff, capture a session before claiming a “75% trigger” or retention behavior. Debate, agent-pool, xray were not located in inspected paths. This does not prove absence; locate source/companion repos and contribution history before claiming implementation. Until then, show their proposed animation with `UNKNOWN — implementation evidence pending`, or omit from Home proof. Producing truthful evidence for all four is assigned work, not permission to fabricate it.

### Live OpenCode decision

**No public serving instance in v2.** Fixed free models do not constrain shell execution, files, network access, tool loops, or prompt injection. Tiny free quotas cannot reliably support multi-agent debate and long-context compaction. Public experience: animated evidence; public inference budget **zero**.

Keep a real owner-operated instance for captures, over Tailscale only. A later invited experiment requires a disposable isolated worker, fixed tiny sample repo, immutable model config, no personal repos/secrets, Docker socket or NAS mounts; deny-default egress except a credential-holding model gateway; explicit tool allowlist. Cap one concurrent session, five minutes, eight model attempts, 8,000 generated tokens total; destroy workspace afterward. Assign a separate explicit budget before enabling it. Default Docker isolation on a secret-bearing NAS is not sufficient justification for public arbitrary coding. Without these controls, record locally. No disabled “Try live” bait button.

### Acceptance criteria

* What appears is implemented as specified above; the stated conclusion is visible and each action reaches its named destination.
* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.

Show the finished conclusion before interaction. Static HTML, conclusions and transcripts remain usable without JS or NAS. No model call on page load. Distinguish input provenance from LIVE / RECORDED / UNKNOWN execution; use server timestamps, capture revision and honest authorship. Keyboard, visible focus, ≥44px targets; reduced motion retains stills/numbered steps; optional assets load on activation.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
