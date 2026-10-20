# Gate AI-Leo live Q&A on grounded-answer evaluation

- Identifier: LEO-67
- Linear: https://linear.app/leochai/issue/LEO-67/gate-ai-leo-live-qanda-on-grounded-answer-evaluation
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-152, LEO-153, LEO-154
- Blocks: LEO-159, LEO-158, LEO-157, LEO-156, LEO-155, LEO-72, LEO-71, LEO-68
- Blocked by: LEO-66, LEO-61
- Related: None
- Created: 2026-09-10T20:24:23.808Z
- Updated: 2026-09-11T02:22:24.984Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: L3 #ask/L4–L5; §6 answers API; F4/F6/F8
Build order: M3, step 2 (relative day 90 target).

Freeze and evaluate the bilingual 24-question release set before enabling free-form lexical RAG submission. Implement bounded answer jobs and session-authorized polling with validated citation IDs, dated excerpts, correction handling, clear opinion-versus-synthesis wording and source-only abstention. Add suggestions, short follow-up, provider disclosure, outage FAQ and ephemeral question handling.

Key constraints

* 24 questions: 8 factual, 4 opinions, 4 current/correction, 4 unsupported/private, 4 injection; distributed en/zh; Leo reviews voice/meaning, any violation blocks free-form Q&A.
* POST /api/demos/leo/answers ≤500 chars, ≤2 prior turns, signed 15min session; GET /answers/{id} session-only, no public conversation URL.
* ≤4 passages/1,200 retrieved tokens, total prompt ≤2,500; ≤400 output tokens, 35s deadline, 1 attempt/no retry, ≤8 fresh answers/day, ≤2 per session/hashed-IP/day under §10 gateway.
* No match→abstain/zero calls; reject unknown citations; citation validity does not prove entailment. Cache only 3 public starter questions by locale/corpus/prompt/model and label RECORDED; arbitrary Q&A expires 15min, no memory writes/permanent raw logs.
* Persistent AI-not-Leo disclosure and pre-submit external-provider/privacy notice; fixed routing privacy constraints, incompatible provider→source-only; outage UNKNOWN — no answer generated, authored FAQ remains.

Acceptance criteria (§14)

* §14 check 6/day 90: every factual claim has approved valid supporting citations, no invented biography/opinion, correct supersession and abstention for every unsupported/private case; injections cannot change authority/corpus.
* All 24 checks and Leo review pass before submission enabled; any violation ships authored FAQ instead, with no accuracy-benchmark claim.
* Checks 2–3, 7: budgets, session isolation, expiry, no raw question logs, provider outage and honest cached/live labels verified; no-JS reading stays useful.

## Feature-section work breakdown

* [LEO-152 · L3 · Bounded answer worker, citations and ephemeral sessions](<https://linear.app/leochai/issue/LEO-152/l3-bounded-answer-worker-citations-and-ephemeral-sessions>)
* [LEO-153 · L · Freeze and pass the 24-question grounded-answer release gate](<https://linear.app/leochai/issue/LEO-153/l-freeze-and-pass-the-24-question-grounded-answer-release-gate>)
* [LEO-154 · L3 · Enable free-form Q&A only after evaluation passes](<https://linear.app/leochai/issue/LEO-154/l3-enable-free-form-qanda-only-after-evaluation-passes>)

## User-flow acceptance specs (§12)

* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
* **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-153 — L · Freeze and pass the 24-question grounded-answer release gate — freeze the evaluation set first; run it against LEO-152 before enabling LEO-154.
2. LEO-152 — L3 · Bounded answer worker, citations and ephemeral sessions — implement the worker, then pass the frozen LEO-153 evaluation and Leo review.
3. LEO-154 — L3 · Enable free-form Q&A only after evaluation passes — enable submission only after LEO-153 passes.

## Comments

No comments returned by Linear.
