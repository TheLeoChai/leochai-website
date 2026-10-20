# Create Leo-approved bilingual source corpus and lexical retrieval

- Identifier: LEO-66
- Linear: https://linear.app/leochai/issue/LEO-66/create-leo-approved-bilingual-source-corpus-and-lexical-retrieval
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-151
- Blocks: LEO-154, LEO-153, LEO-152, LEO-67
- Blocked by: LEO-65, LEO-54
- Related: None
- Created: 2026-09-10T20:24:14.104Z
- Updated: 2026-09-11T02:22:20.662Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: L1–L5; §6 ingestion/retrieval; F4/F6
Build order: M3, step 1 (relative day 90 target).

Prepare the approved biography, résumé, project summaries and short opinion answers, using approved recordings only if supplied and approved text otherwise. Add private CPU transcription/correction/approval for selected recordings and version public excerpts with source IDs, dates, languages, anchors/timecodes and supersession links. Build a small lexical index with Chinese segmentation or character n-grams and approved bilingual aliases through a pinned evidence/validity adapter.

Key constraints

* Never ingest general kimaki history, DMs, calendars, NAS folders or Jellyfin; raw recordings stay private and media citations require separately approved clips.
* Chunks \~300 tokens/50 overlap; retrieve ≤4 approved passages/≤1,200 tokens; current facts use latest valid nonsuperseded source, conflicts do not become facts.
* Do not instantiate unfinished embedding adapter or change research thresholds; semantic/vector migration deferred. Only approved public excerpts may enter model prompts; no model calls needed for corpus indexing.

Acceptance criteria (§14)

* §14 day 90 + checks 6–7: approval, correction/supersession, date/language and public-anchor provenance are demonstrable across English/Chinese.
* Private originals and unapproved text are absent from public corpus/artifacts/history; no-source queries abstain without inference.
* Leo approves source voice/meaning; recordings are not a blocker when approved text exists.

## Feature-section work breakdown

* [LEO-151 · L · AI-Leo approved corpus and retrieval architecture](<https://linear.app/leochai/issue/LEO-151/l-ai-leo-approved-corpus-and-retrieval-architecture>)

## User-flow acceptance specs (§12)

* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-151 — L · AI-Leo approved corpus and retrieval architecture

## Comments

No comments returned by Linear.
