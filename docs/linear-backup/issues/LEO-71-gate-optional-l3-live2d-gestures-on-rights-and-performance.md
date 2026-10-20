# Gate optional L3 Live2D gestures on rights and performance

- Identifier: LEO-71
- Linear: https://linear.app/leochai/issue/LEO-71/gate-optional-l3-live2d-gestures-on-rights-and-performance
- Status: Backlog
- Priority: Low
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-157
- Blocks: None
- Blocked by: LEO-68, LEO-67
- Related: None
- Created: 2026-09-10T20:24:44.555Z
- Updated: 2026-09-11T02:22:43.050Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: L3 anime character; F4/F7
Build order: M3, step 6 (relative day 90 target).

Assess asset/runtime rights and measured transfer cost for an optional Live2D rig used only beside AI-Leo text. If both gates pass, add idle-still, brief question-sent motion and one answer-ready gesture based on application events. Otherwise retain the credited still and defer the rig without blocking release.

Key constraints

* Optional download ≤2 MB, activation-only, zero model calls; no Home runtime or floating avatar.
* No constant loop, fake lip-sync, tracking camera, microphone, voice cloning or emotional digital-person claims.
* Rights must be verified; load/WebGL/rig failure leaves text and still intact; PC/rig cannot threaten grounded-answer/privacy gates.

Acceptance criteria (§14)

* §14 day 90 + check 8: rights and ≤2 MB transfer verified before enablement; keyboard/phone/reduced-motion and failed-asset behavior preserve still/Q&A.
* If either gate fails or schedule threatens core release, rig is deferred and authored/still experience ships.

## Feature-section work breakdown

* [LEO-157 · L3 · Anime still and optional Live2D rights/performance decision](<https://linear.app/leochai/issue/LEO-157/l3-anime-still-and-optional-live2d-rightsperformance-decision>)

## User-flow acceptance specs (§12)

* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-157 — L3 · Anime still and optional Live2D rights/performance decision

## Comments

No comments returned by Linear.
