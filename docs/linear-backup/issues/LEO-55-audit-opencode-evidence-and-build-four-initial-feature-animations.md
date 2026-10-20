# Audit OpenCode evidence and build four initial feature animations

- Identifier: LEO-55
- Linear: https://linear.app/leochai/issue/LEO-55/audit-opencode-evidence-and-build-four-initial-feature-animations
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: OpenCode
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-100, LEO-101, LEO-102, LEO-103, LEO-104, LEO-105, LEO-116, LEO-117, LEO-118
- Blocks: LEO-149, LEO-148, LEO-147, LEO-146, LEO-129, LEO-128, LEO-64, LEO-58
- Blocked by: LEO-49
- Related: LEO-160
- Created: 2026-09-10T20:23:22.406Z
- Updated: 2026-09-11T02:20:32.296Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: O1–O6; G2 tags; H3 proof; F2
Build order: M1, step 8 (relative day 30 target).

Locate source, companion repositories and contribution history for debate, autocompact, agent pool and xray. Build four finished diagrams, 10–20 second initial HTML/SVG sequences and transcripts, including disagreement, retained/summarized/omitted context, finite-worker timeout and changed-file invalidation. Attach pinned trace/diff evidence where verified and retain a failure outcome.

Key constraints

* Inspected 73e07e431 config threshold 0.75 and high/low passes do not prove runtime behavior; pin entrypoint and capture before claiming 75% trigger or retention.
* Debate/agent-pool/xray evidence is pending: show proposed animation as Illustration with UNKNOWN — implementation evidence pending, or omit from Home proof.
* Zero public inference/no public OpenCode or Try-live bait; owner captures private only. No hidden reasoning, invented savings or upstream authorship claims; omitted prompt data is not disk deletion.

Acceptance criteria (§14)

* §14 day 30 + checks 1–2, 8: all four features have initial animation, still, visible conclusion and transcript; unresolved evidence is labeled.
* No unsupported metric; one user-triggered sequence at a time; keyboard/reduced motion/no-JS preserves outcomes and all fragments resolve.

## Feature-section work breakdown

* [LEO-100 · O1 · Fork authorship and four feature links](<https://linear.app/leochai/issue/LEO-100/o1-fork-authorship-and-four-feature-links>)
* [LEO-101 · O2 · DEBATE decision, objections and disagreement](<https://linear.app/leochai/issue/LEO-101/o2-debate-decision-objections-and-disagreement>)
* [LEO-102 · O3 · AUTOCOMPACT retained, summarized and omitted context](<https://linear.app/leochai/issue/LEO-102/o3-autocompact-retained-summarized-and-omitted-context>)
* [LEO-103 · O4 · AGENT POOL finite slots, ownership and timeout](<https://linear.app/leochai/issue/LEO-103/o4-agent-pool-finite-slots-ownership-and-timeout>)
* [LEO-104 · O5 · XRAY retrieval evidence and changed-file invalidation](<https://linear.app/leochai/issue/LEO-104/o5-xray-retrieval-evidence-and-changed-file-invalidation>)
* [LEO-105 · O6 · Maintenance limits and visible failure](<https://linear.app/leochai/issue/LEO-105/o6-maintenance-limits-and-visible-failure>)
* [LEO-116 · O · Animation and evidence contract for all four features](<https://linear.app/leochai/issue/LEO-116/o-animation-and-evidence-contract-for-all-four-features>)
* [LEO-117 · O · Verification boundary and source/contribution audit](<https://linear.app/leochai/issue/LEO-117/o-verification-boundary-and-sourcecontribution-audit>)
* [LEO-118 · O · Recorded public showcase and private capture-instance decision](<https://linear.app/leochai/issue/LEO-118/o-recorded-public-showcase-and-private-capture-instance-decision>)

## User-flow acceptance specs (§12)

* **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (D2 applied to OpenCode explainers):**

* Same custom JSON-driven player as LEO-49's component: `stateAt(model, t)`, Play/Pause/Replay, native range scrubber, aria-live steps, reduced-motion stills, build-generated final frame as no-JS baseline. One sequence at a time. anime.js v4 fallback only. No Lottie/Rive/scroll-driven libs.
* Each feature = one 10–20s HTML/SVG sequence driven by bundled redacted event JSON + finished still + transcript. Staged diagrams say `Illustration`; reconstructed captures cite the source. Unresolved implementations stay `UNKNOWN — implementation evidence pending` (LEO-117 boundary).

**Build steps (in order):**

1. LEO-117 — evidence/contribution audit FIRST (determines which features get captured traces vs Illustration labels).
2. LEO-116 — animation & evidence contract applied to all four features.
3. LEO-101 — DEBATE; 4. LEO-102 — AUTOCOMPACT; 5. LEO-103 — AGENT POOL; 6. LEO-104 — XRAY (parallelizable once 1–2 done).
4. LEO-100 — O1 fork authorship hub; LEO-105 — O6 limits/failure; LEO-118 — showcase decision (wrap-up).

## Comments

No comments returned by Linear.
