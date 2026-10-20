# Create shared visual, evidence, state and motion components

- Identifier: LEO-49
- Linear: https://linear.app/leochai/issue/LEO-49/create-shared-visual-evidence-state-and-motion-components
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Foundation — build & shared components
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-114, LEO-115, LEO-161
- Blocks: LEO-119, LEO-118, LEO-117, LEO-116, LEO-109, LEO-108, LEO-107, LEO-106, LEO-105, LEO-104, LEO-103, LEO-102, LEO-101, LEO-100, LEO-99, LEO-98, LEO-97, LEO-96, LEO-95, LEO-94, LEO-93, LEO-92, LEO-89, LEO-88, LEO-87, LEO-86, LEO-85, LEO-84, LEO-83, LEO-82, LEO-80, LEO-79, LEO-78, LEO-77, LEO-76, LEO-75, LEO-74, LEO-73, LEO-56, LEO-55, LEO-54, LEO-52, LEO-51, LEO-50
- Blocked by: LEO-48
- Related: LEO-160
- Created: 2026-09-10T20:21:35.557Z
- Updated: 2026-09-12T05:14:18.864Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: §1 globals; shared H/G/J/T/L/O/N components
Build order: M1, step 2 (relative day 30 target).

Implement the warm-paper typography, locale navigation/footer, inline proof blocks and distinct provenance/execution labels. Provide completed stills, transcripts and keyboard-accessible Play/Pause/Replay/Scrub controls for explanatory sequences. Define the evidence manifest so every run-backed exhibit can substantiate its claims.

Key constraints

* LIVE needs committed execution, run ID/server event time; RECORDED needs capture time/revision; UNKNOWN names missing evidence/failure. Fixtures/illustrations/local animation are source labels, never invented captures.
* Proof records repo, commit, capture date, input hash, provider/model, schema, redaction and contribution; distinguish measured from estimated metrics and upstream authorship.
* \~300 ms entrances; no loops/scroll-hijack; reduced motion shows numbered completed steps; focus visible, targets ≥44px, assets activate on demand.

Acceptance criteria (§14)

* §14 checks 1, 2, 8: visible conclusions survive no JS, failed assets and phone/reduced-motion/keyboard use.
* No replay/cache is LIVE; no unsupported metric or synthetic illustration mislabeled RECORDED.

## Feature-section work breakdown

* [LEO-114 · §1 · Global navigation, typography, state/proof and motion components](<https://linear.app/leochai/issue/LEO-114/1-global-navigation-typography-stateproof-and-motion-components>)
* [LEO-115 · §0 · Site-wide story, live-surface and authorship rules](<https://linear.app/leochai/issue/LEO-115/0-site-wide-story-live-surface-and-authorship-rules>)

## User-flow acceptance specs (§12)

* **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (D2 — motion & shared components):**

* Custom vanilla player (\~3 KB estimate — enforce a measured budget). State is a pure function of time `stateAt(model, t)`; rAF clock; Play/Pause/Replay buttons; native `input[type=range]` scrubber with `aria-valuetext`; step changes announced via `aria-live="polite"` (announce steps, not frames). Central registry enforces one active sequence.
* `prefers-reduced-motion` → completed final frame + numbered steps; "view as numbered steps" offered to everyone.
* Baseline HTML is the build-generated final frame — fully readable without JS. Bundled JSON is the only source of truth.
* anime.js v4 (MIT) is a fallback ONLY if hand-authoring keyframes proves too slow; deterministic state stays in our code, callbacks muted during seek. Rejected: Lottie/Rive/dotLottie, Scrollama, GSAP.
* Typography (D6) is owned by child LEO-161: Newsreader (display, Latin subset) + Source Sans 3 (UI, Latin subset) self-hosted WOFF2; Noto Serif SC 500 exact heading subsets for zh; system CJK body stack; ≤100 KB fonts/route measured.

**Build steps (in order):**

1. LEO-161 — typography pipeline (fonts + subsetting build) first; templates consume its tokens.
2. LEO-114 — global nav, typography tokens, state/proof components, the timeline-player component with full accessibility contract.
3. LEO-115 — site-wide story/live-surface/authorship rules applied across components.

## Comments

No comments returned by Linear.
