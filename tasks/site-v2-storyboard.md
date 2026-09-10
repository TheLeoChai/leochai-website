# leochai.com v2 — Site Storyboard

> Converged output of the Astra–Claude debate (2026-09-10). Positioning:
> **"I build systems you can understand."** Five pages. Everything past Home
> is opt-in depth. The home page alone must close the call.

## 0. Laws (decided in debate)

1. **No puzzle required.** Conclusions show immediately; interaction is opt-in delight on top of an instant-legible base state.
2. **One live demo** (Tiny World). Everything else is recorded/inline evidence with repo links.
3. **No destinations that are really drawers.** Proof renders inline; "Technical details" is a disclosure, not a nested click-hole.
4. **Uncertainty stays visible.** The ambiguous/wrong merge case is a feature, not a bug to hide.
5. **Cut from the site:** Evidence Bench, canvas dedup graph, demos hub, standalone build-log, standalone infra viz. Their strongest findings survive as inline content and repo links.
6. **Truthful states everywhere:** `live / recorded / unknown`, never "waking server…".

## 1. Global elements

| Element | Spec |
|---|---|
| Nav | `Leo Chai — Work · Notes · Résumé` (current page underlined). No dropdowns. |
| Footer (every page) | email · GitHub · RSS · "this site is a static export; the live parts run on a server at home →" |
| Motion | One entrance animation per element, once-only, ~300ms, disabled under `prefers-reduced-motion` (completed still shown instead). No loops, no scroll-hijack. |
| State chips | Small monospace tags: `LIVE`, `RECORDED`, `UNKNOWN` with timestamp where relevant. Same component everywhere. |
| Typography | Warm paper bg, dark ink, one accent (vermillion). Serif for statements, sans for UI, mono for actual data only. |

## 2. `/` — Home

| # | Scene | Visitor understands | Actions → destination |
|---|---|---|---|
| H1 | **Hero.** Name; "I build systems you can understand."; one concrete subhead ("Backend, AI tooling, and interfaces for complex data. Canada."); one button `See the work ↓`; résumé + email always visible | Who Leo is in 3 seconds | Scroll ↓ → H2 · click résumé → PDF |
| H2 | **Merge specimen (static base).** Two short fictional job listings → one merged record, pre-resolved, reads in 2s. Caption: "Same opening, three postings. Deciding that is an identity problem." Below it, a quiet button: `Show an uncertain pair` | The site's subject in one glance: messy data → dependable records | Tap `uncertain pair` → swaps to the ambiguous case, annotated ("Different requisition — kept separate. Here's why."). Tap again → back |
| H3 | **Three case cards** (Job Matching / Tiny World / OpenCode): problem in one sentence, one number as proof ("3,799 jobs · 1 dependable record"), `How it works →` | Three credible accomplishments, scannable in 15s | → `/work/<slug>` |
| H4 | **Tiny World pulse (~120px tall).** A real, live SSE strip of the simulation — ticks moving, an action getting rejected, labeled `LIVE` (falls back to `RECORDED` chip + still frame when NAS is away) | "This is real, running at his home, right now" | Click → `/work/tiny-world#live` |
| H5 | **Meet Leo.** 2 sentences of who he is and what he wants to work on; photo optional | There's a person, not a content mill | → About anchor / email |
| H6 | **Footer.** 3 latest Notes titles + email + résumé + GitHub | Easy exit, easy contact | → notes / mailto |

**Home alone closes the call.** Nothing above requires a click to be understood.

## 3. `/work/job-matching` — case study: "Same job?"

| # | Scene | Notes |
|---|---|---|
| J1 | Problem header: "Three postings, one job. Deciding that is an identity problem." | 1-sentence problem statement, always first |
| J2 | The specimen, full size — same component as Home, more room; visitor can step through 3 fixture pairs (clean merge / clean split / genuinely ambiguous) | The ambiguity case shows what the system actually did + why, no spin |
| J3 | How it works — 4 diagrams max: heterogeneous ATS ingestion → canonical identity → provenance → conservative merge. Plain-language captions | Complex data storyline |
| J4 | Inline evidence, on scroll: real revision hash, 2 file excerpts, the scoring contract snippet. `Technical details` disclosure for the rest | No drawers; evidence is content |
| J5 | Limits: what it still gets wrong (e.g. cross-company duplicates) | Honesty = credibility |
| J6 | Footer: repo link · related Note ("A duplicate is an identity problem") · next case study → | No dead ends |

## 4. `/work/tiny-world` — case study + the one live demo

| # | Scene | Notes |
|---|---|---|
| T1 | Problem header: "What happened, what was observed, what can change." | |
| T2 | A recorded moment (animated still): Alice's action rejected — with the concrete reason on screen | The memorable beat, works offline |
| T3 | **`#live` — embedded live demo.** Floor plan + event timeline + observations panel + state diff. Runs via SSE; multiple visitors see the same ticks. Controls: step / reset / one allowlisted variation. States: `LIVE` (SSE ok) → `RECORDED` (bundled trace, fully explorable) → `UNKNOWN` (honest chip). Deep-linkable | The infra-growth feature (SSE sync, reconnect, backpressure) |
| T4 | How it works: observations vs beliefs vs authoritative state, deterministic reducers, provenance-carrying actions | |
| T5 | Limits: "observation ≠ belief" boundary; what's simulated vs real | |
| T6 | Footer: repo link (ai-society) · next case → | |

## 5. `/work/opencode` — case study: "Keeping long sessions usable"

| # | Scene | Notes |
|---|---|---|
| O1 | Problem: coding agents forget; long sessions become unusable | |
| O2 | Context timeline visualization (static, recorded): which turns are kept / summarized / dropped at compaction, before→after | The compaction work made visible; fold in what was planned as "Context Budget" as a static chart |
| O3 | Leo's exact changes at a pinned revision (75% trigger, two-pass canonical summaries) — `Technical details` disclosure with diffs | Authorship honesty: this is a fork; label says so |
| O4 | Maintenance reality: what it costs to track upstream | Claude's "consequences and judgment" |
| O5 | Footer: fork link · next → Notes | |

## 6. `/notes` + `/notes/<slug>`

- Index: reverse-chron, one line per entry. Essays **and** dated build entries live here (build-log folded in).
- Launch essays (each a defensible take): "A duplicate is an identity problem" · "Provenance beats accuracy" · one failure post ("A design I rejected").
- Article template: title, date, revision note if changed, body with inline figures, repo links, "discuss by email".

## 7. User flows

- **F1 · The 90-second lead** (primary): land H1 → H2 static read (2s) → H3 scan (15s) → H4 pulse ("real!") → H5 → footer → email or résumé. **Zero clicks needed to be convinced.**
- **F2 · The engineer**: H2 → taps `uncertain pair` → `/work/job-matching` → J2 fixtures → J4 technical details → ai-society via T6 → Notes essay → email.
- **F3 · The sharer**: gets `/work/tiny-world#live` link → lands directly at T3 running live → back-reads T1–T2 → done.
- **F4 · Mobile**: H1 hero stacks; specimen readable before any animation; case cards full-width; Tiny World controls touch-sized; SSE pulse still works.
- **F5 · NAS asleep**: H4 shows still + `RECORDED`; T3 loads bundled trace (fully explorable); every image/case study unaffected. The site never shows a broken state — degraded is honest, broken is failure.

## 8. Build order (scenes → milestones)

- **Day 30**: Global elements · H1–H3, H5–H6 (H4 as `RECORDED` still) · J1–J6 static · O1–O5 static · Notes index + 2 essays. *Ship — Home closes the call.*
- **Day 60**: Demo API (`/api/demos/world/runs` + SSE + rate limits + recorded fallback) · T3 live · H4 goes `LIVE`.
- **Day 90**: Polish from real reader feedback · more Notes · refined fixtures.
