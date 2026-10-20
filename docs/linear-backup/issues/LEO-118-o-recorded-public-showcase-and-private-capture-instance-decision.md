# O · Recorded public showcase and private capture-instance decision

- Identifier: LEO-118
- Linear: https://linear.app/leochai/issue/LEO-118/o-recorded-public-showcase-and-private-capture-instance-decision
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
- Created: 2026-09-10T22:30:45.189Z
- Updated: 2026-09-11T02:25:47.610Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Live OpenCode decision

**No public serving instance in v2.** Fixed free models do not constrain shell execution, files, network access, tool loops, or prompt injection. Tiny free quotas cannot reliably support multi-agent debate and long-context compaction. Public experience: animated evidence; public inference budget **zero**.

Keep a real owner-operated instance for captures, over Tailscale only. A later invited experiment requires a disposable isolated worker, fixed tiny sample repo, immutable model config, no personal repos/secrets, Docker socket or NAS mounts; deny-default egress except a credential-holding model gateway; explicit tool allowlist. Cap one concurrent session, five minutes, eight model attempts, 8,000 generated tokens total; destroy workspace afterward. Assign a separate explicit budget before enabling it. Default Docker isolation on a secret-bearing NAS is not sufficient justification for public arbitrary coding. Without these controls, record locally. No disabled “Try live” bait button.

### Animation and evidence contract

Use HTML/SVG timelines driven by bundled redacted event JSON. Each feature has a 10–20s sequence and transcript. Explicit Play; one sequence at a time. Show roles, tool calls, emitted summaries, decisions/results, not hidden model reasoning.

Map actual events into the animation and retain the source trace. Staged diagrams say `Illustration`; reconstructed captures say so and cite the source. No invented latency/token savings. Counts state measured versus estimated. “Omitted from next prompt” does not mean deleted from disk.

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* No public OpenCode runtime or disabled Try live bait button; private capture access stays over Tailscale, public inference allocation is zero.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
