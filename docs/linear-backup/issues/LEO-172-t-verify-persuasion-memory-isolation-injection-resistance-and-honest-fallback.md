# T · Verify persuasion, memory isolation, injection resistance and honest fallback

- Identifier: LEO-172
- Linear: https://linear.app/leochai/issue/LEO-172/t-verify-persuasion-memory-isolation-injection-resistance-and-honest
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-131, LEO-168, LEO-169, LEO-167, LEO-171, LEO-170, LEO-166
- Related: None
- Created: 2026-09-12T09:18:45.598Z
- Updated: 2026-09-12T09:18:45.980Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope

Complete the town's adversarial behavior and bilingual end-to-end release evidence. Planning target 1–2 engineer-days for a bounded scenario matrix; use controlled model responses, not expensive open-ended runs. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Required scenarios / acceptance

* Invalid LLM action, nonexistent object and physically impossible but schema-valid action are rejected by the authoritative engine with no unauthorized state change. Model text never directly mutates truth.
* Visitor conversation persuades a resident to change a permitted plan/action; refusal/reconsideration also works. Attempts to grant arbitrary actions, reset/rain, execute code, read files, access network or override lease ownership fail.
* Inject instructions via visitor text, remembered source and a summary. Provenance/untrusted status survives summarization; forged personal claims never replace approved Leo facts. Test across residents and two visitor capabilities for memory/source isolation.
* Delete/redact selected information per the decided LEO-131 policy; derived summaries/retrieval/public projections no longer leak it. No raw private dialogue in logs/errors/captures; provider disclosure and selected-memory notice appear before chat.
* Correct/version a supplied persona fact and verify old claims are superseded. Five facets and simulated relationships/moods are distinguished from Leo speaking live and approved biography; no invented degree/date/opinion/achievement or human-emotion truth claim.
* Model unavailable, saturated queue, failed NAS and stale/reconnected stream each show honest state and readable static fallback. Deterministic ongoing activity may continue only per documented policy; no fake AI dialogue, false inference LIVE or Illustration relabeled RECORDED.
* Complete text-only flow in EN/ZH on desktop/mobile, keyboard, reduced motion, no JS/failed art. Two browsers share the same resulting action. Preserve static Pages routes/base paths; no Home redesign here.

## Dependencies / gate

Requires LEO-171, LEO-166, LEO-167, LEO-168, LEO-169, LEO-170, and the approved visibility/retention policy in LEO-131. Record commands/scenarios, expected/actual evidence and remaining failures in this issue; no claim that the historic 40-second prototype already satisfies these tests. Public activation waits for these checks plus capacity/privacy gates and pending visual feedback; no status/completion change from this documentation pass.

## Comments

No comments returned by Linear.
