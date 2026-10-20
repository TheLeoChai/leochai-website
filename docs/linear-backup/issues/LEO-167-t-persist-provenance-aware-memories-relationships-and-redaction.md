# T · Persist provenance-aware memories, relationships and redaction

- Identifier: LEO-167
- Linear: https://linear.app/leochai/issue/LEO-167/t-persist-provenance-aware-memories-relationships-and-redaction
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: None
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-62
- Sub-issues: None
- Blocks: LEO-172, LEO-168
- Blocked by: LEO-165, LEO-166, LEO-131, LEO-144
- Related: None
- Created: 2026-09-12T09:17:54.663Z
- Updated: 2026-09-12T09:17:55.403Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Scope

Implement durable selected memory and relationship transitions for five Leo facets in the single persistent town. Planning target 0.5–2 engineer-days; bounded storage/retrieval slice, not a full cognitive architecture. Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.

## Work and acceptance

* Persist selected memories separately from bounded prompt context with resident/subject, source/event ID, timestamp, world/persona revision, visibility, provenance, untrusted/approved status and correction/supersession lineage. Use audited reusable modules, not unverified semantic-memory claims.
* Derive relationship changes and commitments from actual committed interactions/outcomes with causal event references; no pre-scripted relationship outcome or promise of human emotion/intelligence. Keep fictional relationships separate from factual claims about real Leo.
* Preserve private memory and visitor-source isolation in retrieval. A visitor claim remains untrusted through summarization, compaction and later recall; it never rewrites approved biography. No private files/kimaki history ingestion.
* Durable objects, inventory, activities and character state live in LEO-144; this slice adds selected memories/relationships surviving restart, without resetting at episode/viewer boundaries.
* Follow the Leo-approved visibility, retention/deletion decision in LEO-131. Define selection limits and storage bounds; do not log raw private conversations. Track summary derivatives so deletion/redaction propagates to retrieval, snapshots/events/captures where applicable and backups under the agreed policy. Prevent redacted content from being rehydrated.
* Test restart preserves valid memory/relationships; two visitors/residents cannot retrieve each other's private sources; forged biography stays untrusted after a summary; correction and deletion remove/supersede all affected retrieval results without corrupting shared world state.

## Dependencies / open

Requires LEO-165, LEO-166, LEO-144 persistence and LEO-131 privacy decision. Conversation visibility and retention duration/deletion handling are OPEN, not defaults; private text/public resulting actions is only a suggestion. This gate blocks storing real visitor conversations/memories until resolved.

## Comments

No comments returned by Linear.
