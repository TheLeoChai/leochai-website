# §0 · Site-wide story, live-surface and authorship rules

- Identifier: LEO-115
- Linear: https://linear.app/leochai/issue/LEO-115/0-site-wide-story-live-surface-and-authorship-rules
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
- Blocked by: LEO-48
- Related: None
- Created: 2026-09-10T22:30:28.368Z
- Updated: 2026-09-11T05:13:11.441Z
- Completed: 2026-09-11T05:11:12.674Z
- Due date: None
- Cycle: None
- Archived: None

## Description

## 0. Laws and explicit revisions

1. **No puzzle required.** Show the conclusion, finished state, and concrete example before interaction. Motion explains an already visible result.
2. **One shared live simulation: Tiny World.** Explicitly revise “one live demo total” to admit two bounded, opt-in tools: a Job Matching run and an AI-Leo answer. These are additional live features; calling them previews does not erase their cost. No model calls on page load. No public OpenCode terminal. The farm runs short episodes, not 24/7 inference.
3. **Everything past Home is opt-in depth.** Add one Projects gallery. Home still links directly to the strongest case studies; the gallery is never a mandatory intermediate stop.
4. **Proof is inline.** No evidence drawers, nested demo hub, canvas dedup graph, standalone build-log, or standalone infrastructure visualization. Technical disclosures contain supporting detail, not conclusions.
5. **Uncertainty stays visible.** Keep the ambiguous merge, rejected world action, unsupported personal answer, and failed coding-tool run.
6. **Truthful states:** `LIVE`, `RECORDED`, `UNKNOWN`. A live connection does not prove live inference. Label input provenance and output execution separately. Never say “waking server…” without a real wake mechanism.
7. **Static first.** Public routes, articles, conclusions, images, and replays come from GitHub Pages. FastAPI on the NAS owns live work. NAS failure must not prevent reading the site.
8. **Honest authorship.** Distinguish Leo's projects, upstream modifications, companion tools, third-party components, licensed/generated art, illustrations, and verified captures. AI-Leo is not Leo speaking live.
9. **Personality has a budget.** Keep anime and recipes. Give the farm warmth. Reserve PC assembly for one small gallery exhibit. No game-lobby Home or floating avatar everywhere.

### Feature operating contract

| Feature / scenes | Runs live | Recorded / bundled baseline | Free-model use | Failure result |
| -- | -- | -- | -- | -- |
| Locale mirrors / all | Nothing | Full locale HTML; shared assets | 0 at request time | Missing article translation explicitly listed as English-only |
| Farm / H4, G1, T2–T5 | One shared short episode; ticks + bounded decisions | Verified trace/still; separately labeled synthetic variants | ≤8 attempts/episode, ≤2 episodes/day | Failed episode marked; last frame; separate replay |
| Jobs / J2–J5 | Real pipeline on fixtures, website outbox/review | Completed trace and identity fixtures | ≤3 attempts/run, ≤4 fresh runs/day | Incomplete stage, no invented score; separate replay |
| AI-Leo / H5, L1–L5 | One grounded answer/request | Authored FAQ, starter captures, sources | ≤1 attempt/answer, ≤8 fresh answers/day | Abstain or source-only fallback |
| Anime / L3 | Local event gesture if gate passes | Still avatar | 0 | Still; text unaffected |
| PC / G3 | No backend; future local viewer | Render and assembly clip | 0 | Poster/parts list; no WebGL requirement |
| OpenCode / O1–O6 | No public runtime | Four animations, traces or explicit illustrations | 0 public | Missing evidence UNKNOWN; still/transcript retained |
| Publishing / P1–P7 | Private ingestion, processing, build/deploy | Published HTML/media on Pages | 0 required; ≤1 optional polish/post, ≤2/day | Draft retained; original text works; last good site |
| Owner / S1–S2 | Existing private services | No public payload | 0 | Private error, no exposure fallback |

### Acceptance criteria

* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* Only the farm simulation, bounded Jobs tool and bounded AI-Leo tool may use public inference; no fourth surface during the first 90 days.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

### Leo Chai - 2026-09-11T05:13:11.454Z

- Comment ID: 0dd378c2-11ef-4d0e-8762-67bdbd2cf812
- Updated: 2026-09-11T05:13:11.441Z
- Parent comment: None
- Resolved: None
- On behalf of: None

Independently reviewed and squash-merged PR #6: https://github.com/TheLeoChai/leochai-website/pull/6 (544ed38), feature branch deleted. Critique: https://critique.work/v/e291ccec323dc794930721b277e9fc4a . Full tests/build and parent evidence/component regression tests pass. Static macro cannot emit LIVE without runtime clock; event+heartbeat expire at 20 seconds; replay/cache/synthetic/failure/completion and malformed dates are covered. Capture metadata is explicitly not cryptographic/file verification. No page or CSS changes.

---
