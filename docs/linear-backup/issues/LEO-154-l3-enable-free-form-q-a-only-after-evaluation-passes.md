# L3 · Enable free-form Q&A only after evaluation passes

- Identifier: LEO-154
- Linear: https://linear.app/leochai/issue/LEO-154/l3-enable-free-form-qanda-only-after-evaluation-passes
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-67
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-153, LEO-66, LEO-61
- Related: None
- Created: 2026-09-10T22:33:55.346Z
- Updated: 2026-09-11T02:23:08.686Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

`#ask` **— “Ask an AI version of me.”** Input, suggested questions; persistent “AI-generated from my approved public notes; not Leo replying.” Anime avatar beside text, above on mobile

### Visitor understands

Personal memory experiment, not a substitute for contacting Leo

### Actions → destinations

Submit → answer/citations; short follow-up; email

### AI-Leo retrieval architecture

* Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
* Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
* Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk \~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
* Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
* `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
* RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
* Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
* Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

| Transition | Visitor behavior |
| -- | -- |
| Initial load | Finished static scene/evidence, no blank loading shell |
| Live requested | “Queued” beside baseline; 202 alone never makes evidence LIVE |
| Fresh committed event/result | LIVE for execution, timestamp/model; input still says bundled where appropriate |
| No heartbeat for 20s, stale event, or run failure | UNKNOWN current status; last timestamp/completed stages retained; separate RECORDED option |
| Episode completes | Stop LIVE badge; captured trace becomes RECORDED with completion time |
| Cache/replay selected | RECORDED even if animated or delivered by online API |
| Capture missing/corrupt | UNKNOWN evidence; authored conclusion/diagram retained; illustration never relabeled capture |
| Redis/NAS/provider down | Admission closes; no unaccounted calls; static site remains usable |

Routes (en or zh; stable fragments): Home `/en/` or `/zh/` (English root `/`); G `/<lang>/projects/`; J `/<lang>/work/job-matching/#preview`; T `/<lang>/work/tiny-world/#live`; L `/<lang>/leo/#ask`; O `/<lang>/work/opencode/` (`#debate`, `#autocompact`, `#agent-pool`, `#xray`); N `/<lang>/notes/` and `/<lang>/notes/<slug>/`; résumé `/assets/leo-chai-resume.pdf`; email uses mailto.

### Acceptance criteria

* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
* **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
* Public submission remains disabled until the 24-question gate and Leo review pass; regression, missing evidence or provider privacy incompatibility restores source-only/FAQ fallback.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
