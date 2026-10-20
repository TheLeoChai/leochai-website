# L · AI-Leo approved corpus and retrieval architecture

- Identifier: LEO-151
- Linear: https://linear.app/leochai/issue/LEO-151/l-ai-leo-approved-corpus-and-retrieval-architecture
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Meet Leo & AI-Leo
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-66
- Sub-issues: None
- Blocks: LEO-152
- Blocked by: LEO-65, LEO-54
- Related: None
- Created: 2026-09-10T22:33:37.401Z
- Updated: 2026-09-11T02:25:07.026Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### AI-Leo retrieval architecture

* Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
* Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
* Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk \~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
* Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
* `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
* RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
* Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
* Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

### Acceptance criteria

* **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Verify bilingual lexical retrieval, approval/supersession, dated anchors and no-source zero-call abstention; recordings remain optional and originals private.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
