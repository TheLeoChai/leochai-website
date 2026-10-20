# Build one persistent shared town with five Leo facets and visitor conversation

- Identifier: LEO-62
- Linear: https://linear.app/leochai/issue/LEO-62/build-one-persistent-shared-town-with-five-leo-facets-and-visitor
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Tiny World
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-165, LEO-144, LEO-169, LEO-168, LEO-166, LEO-172, LEO-171, LEO-167
- Blocks: LEO-150, LEO-65
- Blocked by: LEO-61, LEO-53
- Related: None
- Created: 2026-09-10T20:23:55.566Z
- Updated: 2026-09-12T09:20:54.486Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Agreed persistent-town direction — 2026-09-12

This feature owns the continuous life contract; detailed implementation belongs to the bounded children below. Latest user agreement supersedes the older short-episode specification and conflicting repository/storyboard text. This documentation pass authorizes no implementation, provisioning, paid calls, local edits or deployment.

One shared PERSISTENT town runs continuously on Leo's NAS. Everyone observes the same authoritative town, not a per-viewer sandbox or predetermined replay. Persistent objects, inventory, activities, character state, relationships and selected memories survive restarts. Continuity is desired even with no viewers; exact world-clock/offline catch-up semantics must be settled in LEO-144 before implementation.

### Approved five facets

* Mayor Leo: debate/leadership history.
* Engineer Leo: coding/building obsession; some high-school robotics.
* Teacher Leo: knowledgeable; teaches math; understanding and patient.
* Chef Leo: likes cooking; seeks new ingredients.
* Artsy Leo: listens to music, plays piano, likes anime; strong aesthetic taste.
  These are the supplied facts only; further characterization is for Leo to supply. Five AI versions/facets of Leo, not Leo speaking live. Fictional personas and world events are separate from approved real-life biography. Never invent degrees, dates, opinions or achievements.

### Life and conversation acceptance

* LLM-guided daily routines are context, not executable fixed scripts. Residents react to events/visitors, revise plans and develop relationships from actual interactions/outcomes without prescribed outcomes. HIGH personality/approved biography/usual schedule/long-term context; MEDIUM mood/emotion, energy/tiredness, plans, relationships/commitments; LOW surroundings/recent conversation/events/next action. Durable memory is separate from bounded model context (LEO-166/167).
* Deterministic engine ticks progress validated actions; LLM calls happen at decision boundaries/events. Model proposes intent; authoritative engine validates and commits rules, never direct text mutation (LEO-144/168).
* Visitors only TALK, text baseline. Persuasion may change permitted goals/actions; residents can refuse/reconsider. No direct object manipulation, rain/reset controls, steering API, arbitrary code/file/network authority.
* Exactly one visitor conversation per resident; others may approach another resident. Server-atomic capability/ownership and fenced lease across processes. Exactly FIVE REAL-WORLD minutes without an accepted visitor message ends the hold; assistant replies/heartbeats/rejected messages do not renew. Goodbye releases immediately; safely interrupt activity then resume/reassess. LEO-135 owns disconnect/reconnect/restart/late-response semantics; disconnect must not silently release immediately.
* One-resident-per-visitor, max-active-session fairness cap and absolute maximum duration are PROPOSALS, not approved rules. Microphone/audio is not required.

### Capacity, privacy and honesty gates

Before any town backend/inference provisioning, complete the NAS CPU/RAM/GPU and AI Society reuse audit and model-capacity decision in LEO-165. No paid calls or new capacity before that decision; an external model needs explicit Leo approval of budget, latency and privacy. Existing Jobs/AI-Leo and other allocations remain effective and cannot be transferred. This ticket records future work; no implementation is authorized by this documentation pass.
Continuous LLM life exceeds the old 40 attempts/day plan. Farm eight-attempt reservations, 16/day and two episodes/day are historical, not a new town allocation. Jobs/AI-Leo and unrelated budgets remain effective. World persistence is independent of model availability: queue/pause decisions honestly, allow only documented safe deterministic continuation, no fake dialogue/inference LIVE or catch-up call storms.
Conversation visibility is OPEN: private text/public resulting actions is suggested only. Leo must decide; LEO-131 owns disclosure, retention/deletion and provider visibility. No private files/kimaki history, raw private conversation logs or visitor rewriting of approved bio. Selected memories preserve provenance/untrusted status through summaries.

### Ordered ownership / dependencies

1. LEO-165 — read-only NAS/module audit and model-capacity decision, before backend/inference provisioning.
2. LEO-144 — shared authority, durable state, world-clock/offline policy and restart; LEO-131 — privacy decision. LEO-166 — five personas/layered context.
3. LEO-167 — durable provenance-aware memory/relationships; LEO-132/169 — bounded accounting/admission/security; LEO-135 — atomic talk/lease; LEO-136/142/143 — public snapshots/stream/truthful states.
4. LEO-168 — autonomous planning/execution using those contracts; LEO-170 under LEO-53 — live Canvas adapter.
5. LEO-171 — multi-client/lease/restart tests; LEO-172 — persuasion/injection/privacy/end-to-end evidence. LEO-164/53 retain pending visual review/Leo feedback.
6. LEO-76 — separate later Home integration, world-first composition followed by normal personal chapters; no whole-site game focus.

Children target roughly 0.5–2 engineer-day slices where feasible, not promised estimates; split after audit if needed. Parent is a rollup, not one giant implementation task.

### Visitor flows

F3: bilingual Tiny World/#live → immediate readable poster → same persistent town → talk to an available resident → observable allowed action/outcome. F6: mirrored EN/ZH core pages, locale labels/shared budgets, Chinese Notes or explicitly English-only entry; no automatic locale switch. F7: mobile/reduced-motion readable timeline, stacked text chat, optional rigs/viewers unloaded and numbered stills. F8: NAS/model unavailable → honest last-known/static world or separately labeled Illustration, completed pipeline baseline, authored Leo FAQ/unavailable answer state, functional Notes/contact/animations.

### Historical prototype / superseded episode work

LEO-53/90/91/163/164 and their existing comments/PRs document the authored 40s JSON illustration and art/Canvas review, not real autonomy. Art visual verdict remains pending. The former three-fictional-resident, six decisions ≥45s apart, six-minute ceiling, 60s zero-viewer shutdown, episode memory reset, no visitor dialogue and join/create-episode acceptance are superseded. Historical evidence/status is retained; do not implement those clauses for the persistent town. Captured real events may replay deterministically, but future LLM choices are not promised identical.

## Comments

No comments returned by Linear.
