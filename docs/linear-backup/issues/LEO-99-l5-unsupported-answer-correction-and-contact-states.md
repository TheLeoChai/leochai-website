# L5 · Unsupported-answer, correction and contact states

- Identifier: LEO-99
- Linear: https://linear.app/leochai/issue/LEO-99/l5-unsupported-answer-correction-and-contact-states
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-54
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-49
- Related: None
- Created: 2026-09-10T22:29:03.455Z
- Updated: 2026-09-11T02:27:21.369Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

“I don't have an approved source for that”; dates/corrections visible

### Visitor understands

AI does not invent private life, skills, or opinions

### Actions → destinations

→ email / Notes

Routes (en or zh; stable fragments): Home `/en/` or `/zh/` (English root `/`); G `/<lang>/projects/`; J `/<lang>/work/job-matching/#preview`; T `/<lang>/work/tiny-world/#live`; L `/<lang>/leo/#ask`; O `/<lang>/work/opencode/` (`#debate`, `#autocompact`, `#agent-pool`, `#xray`); N `/<lang>/notes/` and `/<lang>/notes/<slug>/`; résumé `/assets/leo-chai-resume.pdf`; email uses mailto.

### Constraints and failure behavior (copied specification)

### AI-Leo retrieval architecture

* Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
* Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
* Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk \~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
* Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
* `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
* RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
* Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
* Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

### Anime character decision

Keep anime identity. Ship an original/commissioned **still first**, credited with rights. Day 90 permits a Live2D rig only in L3 if optional download ≤2 MB and asset/runtime rights are checked. States: idle-still, brief question-sent motion, one answer-ready gesture. No constant loop, fake lip-sync, camera tracking, microphone, voice cloning, or floating mascot. It reflects application events, not emotions of a digital person. Rig/load/WebGL failure leaves still and text Q&A intact. Zero model calls for animation.

### Acceptance criteria

Milestone interpretation: this child owns the day-30 authored/static/replay scene. Apply the checks below to the bundled evidence and presentation; live execution, runtime fault injection and the AI-Leo generated-answer evaluation are implemented and verified by the separate day-60/day-90 live parents (LEO-62, LEO-63, LEO-67). Those later implementations do not block acceptance of a truthful static scene.

* What appears is implemented as specified above; the stated conclusion is visible and each action reaches its named destination.
* **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
* **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
* **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.
* **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.

Show the finished conclusion before interaction. Static HTML, conclusions and transcripts remain usable without JS or NAS. No model call on page load. Distinguish input provenance from LIVE / RECORDED / UNKNOWN execution; use server timestamps, capture revision and honest authorship. Keyboard, visible focus, ≥44px targets; reduced motion retains stills/numbered steps; optional assets load on activation.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
