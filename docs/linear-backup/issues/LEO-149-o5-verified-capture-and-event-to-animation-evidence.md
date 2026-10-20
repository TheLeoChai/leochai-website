# O5 · Verified capture and event-to-animation evidence

- Identifier: LEO-149
- Linear: https://linear.app/leochai/issue/LEO-149/o5-verified-capture-and-event-to-animation-evidence
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-60
- Milestone: OpenCode
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-64
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-117, LEO-116, LEO-55, LEO-59
- Related: None
- Created: 2026-09-10T22:33:27.521Z
- Updated: 2026-09-11T02:22:51.075Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Feature and expected conclusion

`#xray` **/** `XRAY`**.** Question and relevant file locations first. Files enter actual index representation; query → retrieval → file/line evidence; second sequence shows changed-file invalidation

Code indexing makes navigation inspectable

### Controls

Replay; snippet and indexed revision inline

**Verification boundary:** inspected checkout `73e07e431` declares a 0.75 compaction threshold in configuration; `packages/core/src/session/compaction.ts` includes high/low prompt passes. A schema default does not prove the active runtime honors it. Pin the running entrypoint, inspect upstream diff, capture a session before claiming a “75% trigger” or retention behavior. Debate, agent-pool, xray were not located in inspected paths. This does not prove absence; locate source/companion repos and contribution history before claiming implementation. Until then, show their proposed animation with `UNKNOWN — implementation evidence pending`, or omit from Home proof. Producing truthful evidence for all four is assigned work, not permission to fabricate it.

### Animation and evidence contract

Use HTML/SVG timelines driven by bundled redacted event JSON. Each feature has a 10–20s sequence and transcript. Explicit Play; one sequence at a time. Show roles, tool calls, emitted summaries, decisions/results, not hidden model reasoning.

Map actual events into the animation and retain the source trace. Staged diagrams say `Illustration`; reconstructed captures say so and cite the source. No invented latency/token savings. Counts state measured versus estimated. “Omitted from next prompt” does not mean deleted from disk.

### Live OpenCode decision

**No public serving instance in v2.** Fixed free models do not constrain shell execution, files, network access, tool loops, or prompt injection. Tiny free quotas cannot reliably support multi-agent debate and long-context compaction. Public experience: animated evidence; public inference budget **zero**.

Keep a real owner-operated instance for captures, over Tailscale only. A later invited experiment requires a disposable isolated worker, fixed tiny sample repo, immutable model config, no personal repos/secrets, Docker socket or NAS mounts; deny-default egress except a credential-holding model gateway; explicit tool allowlist. Cap one concurrent session, five minutes, eight model attempts, 8,000 generated tokens total; destroy workspace afterward. Assign a separate explicit budget before enabling it. Default Docker isolation on a secret-bearing NAS is not sufficient justification for public arbitrary coding. Without these controls, record locally. No disabled “Try live” bait button.

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
* Preserve source trace and exact repo/revision/entrypoint/contribution; demonstrate this feature's specified outcome/failure, or explicitly mark missing implementation evidence UNKNOWN.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
