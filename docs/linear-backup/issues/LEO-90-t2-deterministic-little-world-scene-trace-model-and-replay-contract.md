# T2 · Deterministic Little World scene/trace model and replay contract

- Identifier: LEO-90
- Linear: https://linear.app/leochai/issue/LEO-90/t2-deterministic-little-world-scenetrace-model-and-replay-contract
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Tiny World
- Assignee: Leo Chai
- Creator: Leo Chai
- Parent: LEO-53
- Sub-issues: None
- Blocks: LEO-91
- Blocked by: None
- Related: None
- Created: 2026-09-10T22:28:26.182Z
- Updated: 2026-10-15T20:37:58.383Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Current authority — 2026-09-12

Latest agreed persistent-town direction (2026-09-12) is owned by LEO-62 and its bounded children; it supersedes conflicting short-episode requirements and older repository text. This issue retains the art/illustration prototype scope below and does not claim implemented autonomy. Existing authored 40s JSON trace is Illustration, not a captured run or LIVE. Backend/inference provisioning waits for LEO-165; no implementation or spend in this documentation pass. Wave 1 Home remains rejected/CP2 unapproved; Leo's world visual verdict is pending and Home integration is separately later in LEO-76. Retain blue off-white, purple ink, pastels/turquoise and subtle Miku hints; sharp edges, hard shadows, forced grid breaks, gradient/word bans and two-pass cap are not requirements.

Own scene.json/trace.json interface and pure stateAt(trace, time) model, separate from LEO-91 page renderer and LEO-163 art. Stable semantic IDs, actor IDs, integer timestamps, sequence numbers, action/target, visible state changes and observation references; presentation routes are explicitly authored metadata, not recorded telemetry. Bundle deterministic fictional garden -> herbs -> shared cooking table and maker activity, coordinated with art anchors. The empty-can rejection/refill may form one garden sequence; avoid making the entire experience that tutorial.

Seek order and replay frequency must not affect state. Enforce rejected actions as visible observations without impossible state mutation. Static completed snapshot and numbered event steps derive from the same fixture. Tests meaningfully verify seek determinism, boundaries, rejection and fixture consistency. No memory/backend/model inference claims. Replay code target <=15 KB gzip. LEO-91 consumes model and assets.

Acceptance: polished spacious pixel world with two or three connected cooking/music/building/garden activities; completed poster immediately; explicit Play for explanatory replay, pauseable ambient motion permitted except reduced motion; no autoplay audio; no-JS text/stills and failed-asset fallback. Keyboard, 44px targets, truthful bilingual fixture labels, production/preview prefixes, measured assets. Use source assets/css/tokens.css and content/\_includes; site/ is generated. Native gpt-6-astra high for frontend/art/review, medium for bounded tooling. Reviewed ticket PRs to main; no force push or publishing. LEO-164 independently reviews actual initial and revised screenshots before Leo visual feedback.

## Prototype boundary and future dependency

The existing 40-second authored JSON fixture, its deterministic seek/playback tests and merged PR evidence remain historical prototype work pending Leo's visual verdict. Its clock is not town truth. LEO-144 owns persistent authority/clock/restart; LEO-136 owns snapshots/events; LEO-170 owns the future live renderer/talk adapter. Illustration playback cannot claim shared autonomous life, model inference or RECORDED evidence. Live mode renders five Leo facets from authoritative state; prototype controls never mutate it.

## Comments

### Leo Chai - 2026-09-12T05:23:42.893Z

- Comment ID: cdbb7722-7920-410a-a373-f334a0ef7249
- Updated: 2026-09-12T05:23:42.876Z
- Parent comment: None
- Resolved: None
- On behalf of: None

PR #10 merged after independent model/fixture/test review: https://github.com/TheLeoChai/leochai-website/pull/10 . Eight model tests passed under Node 22.23.2, including every 16ms frame plus backwards seeks, rejected-action state preservation, malformed provenance/IDs/targets/timestamps, and detached data. Model is 2,257 bytes gzip estimate. In Review pending integrated browser direct-seek/playback equality and scene/visual acceptance through LEO-91/164; no claim of live inference or recorded simulation.

---
