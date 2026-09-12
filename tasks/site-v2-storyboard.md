# leochai.com v2 — Revised Site Storyboard

> **2026-09-12 superseding direction:** [Little World direction](../docs/little-world-direction.md) governs current design, order and handoff. Wave 1 Home was rejected; CP2 is not approved. Build the bilingual Little World prototype first, then Leo's world feedback, then future Home integration. The older Home-first composition and farm-only presentation below are historical; backend budgets, safety and evidence contracts remain in force.

> Revised 2026-09-10 from the converged storyboard and Leo's raw thoughts.
> **“I build systems you can understand.”** Home alone closes the call.
> People living on a little farm, a job pipeline talking in a chat window,
> coding tools explained through motion, and Leo's own opinions and recipes:
> a personal site with engineering evidence, not a documentation portal.
>
> This is the build spec. Proposed architecture is not a claim that these
> website integrations already run. This revision deploys nothing.

## 0. Laws and explicit revisions

1. **No puzzle required.** Show the conclusion, finished state, and concrete example before interaction. Motion explains an already visible result.
2. **One shared live simulation: Tiny World.** Explicitly revise “one live demo total” to admit two bounded, opt-in tools: a Job Matching run and an AI-Leo answer. These are additional live features; calling them previews does not erase their cost. No model calls on page load. No public OpenCode terminal. The farm runs short episodes, not 24/7 inference.
3. **Everything past Home is opt-in depth.** Add one Projects gallery. Home still links directly to the strongest case studies; the gallery is never a mandatory intermediate stop.
4. **Proof is inline.** No evidence drawers, nested demo hub, canvas dedup graph, standalone build-log, or standalone infrastructure visualization. Technical disclosures contain supporting detail, not conclusions.
5. **Uncertainty stays visible.** Keep the ambiguous merge, rejected world action, unsupported personal answer, and failed coding-tool run.
6. **Truthful states:** `LIVE`, `RECORDED`, `UNKNOWN`. A live connection does not prove live inference. Label input provenance and output execution separately. Never say “waking server…” without a real wake mechanism.
7. **Static first.** Public routes, articles, conclusions, images, and replays come from GitHub Pages. FastAPI on the NAS owns live work. NAS failure must not prevent reading the site.
8. **Honest authorship.** Distinguish Leo's projects, upstream modifications, companion tools, third-party components, licensed/generated art, illustrations, and verified captures. AI-Leo is not Leo speaking live.
9. **Personality has a budget.** Keep anime and recipes. Give the farm warmth. Reserve PC assembly for one small gallery exhibit. No game-lobby Home or floating avatar everywhere.

## 1. Page map, language, and global elements

### Page map changes

The original five core destinations were Home, three work pages, and Notes, plus article instances. The revision has **seven core destinations**: add Projects and Meet Leo. PC assembly lives within Projects, not on an eighth page. Articles use one shared template. Owner tools are outside the public site.

`<lang>` means `en` or `zh`. Use trailing slashes; keep fragment identifiers stable across languages.

| Destination | New URL | Change / purpose |
|---|---|---|
| Home | `/en/`, `/zh/`; `/` serves English Home | Immediate pitch, specimen, three primary cards, personal introduction |
| Projects | `/<lang>/projects/` | New finite gallery: Jobs, Tiny World, OpenCode, AI-Leo, then PC when ready |
| Job Matching | `/<lang>/work/job-matching/` | Case study plus bounded website chat preview at `#preview` |
| Tiny World | `/<lang>/work/tiny-world/` | Farm adaptation plus shared episode at `#live` |
| OpenCode | `/<lang>/work/opencode/` | Four animated feature stories with direct fragment links |
| Meet Leo | `/<lang>/leo/` | Biography, opinions, memory-backed Q&A at `#ask`; avatar belongs here |
| Notes | `/<lang>/notes/`, `/<lang>/notes/<slug>/` | AI/technology, build reflections, and recipes together |
| PC assembly | `/<lang>/projects/#pc-assembly` | Inline exhibit, no empty “coming soon” destination |
| Résumé / feeds | `/assets/leo-chai-resume.pdf`, `/<lang>/rss.xml` | One factual résumé source; feeds contain published locale articles |
| Owner launchpad | Private NAS `/owner/`, over Tailscale only | Separate origin outside `site/`; existing Jellyfin and owner tools |

### Concrete `/en`–`/zh` static-build strategy

- Keep sources outside generated `site/`: `content/en/`, `content/zh/`, route manifest, shared templates, asset manifests. Use **Eleventy as a build-time generator**, run locally or by the NAS publisher. No runtime locale router.
- Emit actual `index.html` files for every route, including `site/en/work/tiny-world/index.html` and its Chinese counterpart. Root `site/index.html` renders the same English Home source. English internal navigation uses `/en/...`; Chinese uses `/zh/...`. **No UI language toggle, browser-language redirect, or locale cookie.**
- `/` is canonical for English Home; `/en/` is a complete alias with canonical `/`. Other English pages are canonical under `/en/`. Set `lang`, translated metadata, and `hreflang="en"` / `hreflang="zh-Hans"` for existing pairs; root is `x-default`. Use Simplified Chinese. Slugs and fragments match across locales.
- Mirror every core page at launch. Translations record their source revision. Publish translated articles when ready; do not silently insert English into a Chinese article. Chinese Notes has an explicitly labeled “English articles awaiting translation” list. Missing Chinese articles get no generated route or false alternate-language link.
- Generate legacy `/work/<slug>/` and `/notes/.../` alias documents with visible links, canonical metadata, and a small redirect preserving fragments. These still work without JavaScript. No Pages rewrite or SPA 404 dependence.
- Build links/assets using a deployment base; verify production `/` and preview `/leochai-website/`. Share images, traces, and animation assets across locales; translate captions/transcripts. Backend events use localized event codes; original utterances retain a language label. No model translation on page load.
- Build to temporary output, validate, then promote to `site/`. Preserve `.nojekyll` and required `CNAME` value `leochai.com`. Publish through `./scripts/publish.sh`; **no GitHub Actions or force-push**.
- **Host decision:** preserve apex `leochai.com` per `AGENTS.md`. `www.leochai.com/` is an English-root entry point through the standard redirect to `leochai.com/`; it does not require `/en/`. This interprets Leo's request as English content at root, not retaining `www` in the address bar. Pages pairs apex and `www` according to its canonical host. [GitHub custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- Release discrepancy: README proposes a `www` cutover, AGENTS mandates apex, and the inspected working tree lacks `site/CNAME`. Prepare the release using the apex rule and restore that file before publishing. **Do not touch the old `TheLeoChai.github.io` repo without Leo's approval.** Verify the full artifact first; domain cutover is a separate deployment step.

### Global elements

| Element | Spec |
|---|---|
| Nav | `Leo Chai — Projects · Notes · Résumé`. Name links to locale Home; current section underlined. No dropdowns. Meet Leo is linked from Home and Projects. |
| Footer | Email · GitHub · locale RSS · “Static pages; live experiments run on my server at home.” Infrastructure explanation is inline, not another page. |
| Typography | Warm paper, dark ink, vermillion accent; serif statements, sans UI, mono actual data. Chinese typography retains hierarchy and readable line lengths. |
| Motion | One ~300ms entrance per element. Explanatory sequences run on Play, with Pause/Replay/Scrub, never automatic loops. Reduced motion shows completed diagrams and numbered steps. No scroll-hijack. |
| State chips | LIVE includes run ID and last event time; RECORDED includes capture time and revision; UNKNOWN names missing evidence/failure. Server timestamps, not connection status alone. |
| Bundled content | `Bundled fixture`, `Illustration`, `Local 3D animation` are source labels, not a fourth execution chip. A synthetic illustration is not a recorded run. |
| Page weight | Home initial compressed transfer ≤500 KB excluding optional résumé. No WebGL, Live2D runtime, or video download on Home. Optional detail assets load on activation. |
| Access | Conclusions/transcripts work without JS; keyboard controls, visible focus, touch targets ≥44px. Do not announce every farm tick through a screen reader. |
| Proof manifest | Run-backed exhibits record repo, commit, capture date, input/scenario hash, provider/model, trace schema, redaction note, and Leo's contribution. Metrics link to evidence. |

## 2. `/` and `/en/` — Home (`/zh/` mirrors)

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| H1 | Name; **“I build systems you can understand.”** Subhead: “Backend, AI tooling, and interfaces for complex data. Canada.” Résumé and email visible; `See the work ↓` | Who Leo is in three seconds | Scroll → H2; résumé → PDF; email → mailto |
| H2 | Synthetic source cards → already resolved canonical job. “Same opening, several postings. Deciding that is an identity problem.” Alternate specimen retains a conflicting requisition | Messy observations become dependable records; uncertainty matters | `Show an uncertain pair` → inline annotated swap; detail → J2 |
| H3 | Job Matching / Tiny World / OpenCode cards; each has a problem, visible outcome, verified artifact or measured number | Three concrete bodies of work | Direct → three case pages; `All projects` → G1 |
| H4 | ~120px farm postcard: path, crops, three residents, one action caption. Bundled recorded still first; passive subscription attaches only to an already active episode while visible | People inhabit the system; captured versus current activity is clear | `Visit the farm` → T3 `#live`; Home never creates a run |
| H5 | Two authored sentences about Leo, interests, and desired work; portrait or original anime still; one real dated opinion/project update | There is a person here, including anime interests | `Meet Leo / ask his AI version` → L1/L3; email visible |
| H6 | Three latest Notes titles with category/date, including recipes when published; contact links | Ideas and everyday life belong together | → article / résumé / email / GitHub |

**Home alone closes the call.** Remove the unexplained old “3,799 jobs · 1 dependable record” placeholder. A defensible fixture claim is “7 synthetic observations → 3 canonical jobs; rerun adds 0,” explicitly labeled synthetic and tied to job-agent evidence. It is not production accuracy.

## 3. `/<lang>/projects/` — a gallery, not a second homepage

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| G1 | “Things I've built.” Four primary project rows with static result image, one-sentence problem, contribution label, demo state | What each does before selecting it | → J1, T1, O1, L1 |
| G2 | Fixed order: Jobs, farm, OpenCode, AI-Leo. OpenCode tags `DEBATE`, `AUTOCOMPACT`, `AGENT POOL`, `XRAY` link directly to scenes | Depth without a maze | Tags → O2–O5; row image/title share destination |
| G3 | **`#pc-assembly` — “My PC, assembled.”** Finished render first, labeled parts, what Leo modeled versus sourced; 10–15s assembly clip | Leo enjoys making visual things; final object is immediately legible | Play bundled clip inline; future `Explore in 3D` stays in this scene |
| G4 | Contact and related personal Note | Easy next step | → Notes / email |

No filters, subcategories, pagination, carousel, hover-only text, or infinite scroll for five items. G3 appears only with a finished asset. First-90-day deliverable: render plus clip; interactive GLB viewer deferred. Timebox creation to two days after core work. Omit the card if unfinished; keep the task in the backlog.

## 4. `/<lang>/work/job-matching/` — “Same job?”

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| J1 | “Three postings, one job. Deciding that is an identity problem.” Contribution label and finished match card | Practical problem and outcome | Scroll → J2 |
| J2 | Clean merge / clean split / genuinely ambiguous fixtures; first conclusion displayed | Different requisitions stay separate; uncertainty is not forced away | Step fixtures/provenance inline |
| J3 | Four diagrams: sources → canonical identity/provenance → hard filters/scoring → review outbox; name deterministic versus model stages | Whole pipeline, not just an LLM reply | Diagram replay; → J4 |
| J4 | **`#preview` — website chat.** Discord-esque `#job-matches`; messages from Ingestion, Identity, Eligibility, Scoring, Review. Completed bundled transcript visible first | Pipeline end to end without visiting Discord | `Run sample live` → bounded run; Apply/Skip → demo decision; Replay → bundled capture |
| J5 | Pinned revision, source-priority excerpt, score contract, outbox receipt; failed/ambiguous-delivery example | Persistence and conservatism matter more than a flashy score | Technical disclosure inline; repo link |
| J6 | Limits: stale postings, unsupported ATS, unknown salary, conflicting identity, scoring evaluation still needed | LIVE does not mean full internet coverage or correct recommendations | → T1 / Note / repo |

### J4 live contract

- Use a **fixed synthetic candidate and seven bundled observations** through real job-agent normalization, deduplication, hard filtering, validated scoring, outbox, and review-state code. Fixture has two eligible canonical jobs and one deterministic rejection. No visitor résumé, arbitrary URL, or live scraping. Header: **“Live pipeline run on bundled sample jobs; website delivery adapter.”**
- Create a temporary SQLite database per run, preserving the actual project contract. RQ calls a pinned package/CLI adapter, not a JavaScript reimplementation. SSE exposes committed stage events. The website delivery adapter consumes the outbox and acknowledges the displayed card. It sends nothing to Leo's Discord and does not claim to test Discord transport.
- Show counts, duplicate provenance, retained conflict, eligibility reasons, fit/missing skills/concerns, threshold decisions, one card per qualifying canonical job, Apply/Skip/Open. Apply means **“mark approved in this demo; no application submitted.”** Open displays the bundled sample posting, never a purported current vacancy.
- `Repeat ingestion` within the run demonstrates stable IDs, cached scores, and no duplicate notification. An allowlisted threshold adjustment reuses scores. No new model request. Decisions are session-isolated; expire the run after one hour.
- Maximum three upstream attempts/run: two scores plus one shared retry. Total deadline 90 seconds. Malformed output stays unscored. Below-threshold results show reasons even if no match card qualifies.
- Errors remain visible in the channel: `Provider unavailable — scoring incomplete`, `Daily live sample limit reached`, or a named stage failure. Keep actual completed stages; a separate RECORDED panel provides replay. Never splice recorded success into a live transcript.
- Cache by evidence + candidate + model/provider configuration + prompt/schema version. Cached inference says `RECORDED — reused score from <time>` inside a genuinely live deterministic run. Fresh scoring requires a complete budget reservation.

## 5. `/<lang>/work/tiny-world/` — a farm with people in it

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| T1 | **“A little farm. People with partial views of it.”** Warm tile map; “Website adaptation of AI Society; simplified memory and prompt-based decisions; no activation steering.” | Visual idea of people living in a world, not a finished mind simulation | Scroll → T2 |
| T2 | Recorded resident tries to water with an empty can; rejection, then trip to well. Observation → proposal → rejection → next action visible | Intention does not override world state | Play/Pause trace; numbered stills |
| T3 | **`#live` — farm.** Map, selected resident observation/memory, event timeline, compact state diff. Bundled trace immediately usable | Residents share a world with different observations | `Watch a live episode` → attach/reserve; select resident; scrub local replay |
| T4 | Authoritative world / sensed events / retrieved memories / proposed action panels; rejected action retained | Memory creates continuity; reducer enforces reality | Step captured transition; technical disclosure |
| T5 | Limits: simplified adaptation, short episodes, free external model, no steering or human-level cognition claim | The shortcut is explicit | → L4 memory Q&A |
| T6 | AI Society repo, exact reused modules/new adapter, art credits, related Note | Who built which parts | → repo / O1 / Notes |

### Farm memory harness and steering workaround

**Setting:** an original overhead pixel-art farm: cottage, well, six crop beds, tool shed, meeting bench. Three fictional adult residents each have a role, brief preference, and finite task menu. Use original/licensed assets; “Stardew-like” means cozy presentation, not copied characters, music, or sprites.

**Shortcut: retrieved memories and a small plan in the prompt.** Borrow the observation–memory–planning pattern from [Generative Agents](https://arxiv.org/abs/2304.03442), not its whole implementation. This does not reproduce activation steering or AI Society's complete cognitive architecture.

1. FastAPI reserves a shared episode under a Redis lock. Postgres records seed, revision, budget, status. One RQ world worker owns mutations. Schedule six decision jobs at intervals of at least 45 seconds, cycling through the three residents twice. A scheduler enqueues due jobs; workers do not sleep while holding jobs.
2. Between decisions, deterministic reducers advance accepted walking/tasks at one-second ticks. **A tick is not an LLM call.** Observations depend on position, visible objects, witnessed speech. Actors never receive others' private memories or the omniscient state panel.
3. Store episode memories with actor, event ID, timestamp, text, source, validity, fixed event-type importance. Retrieve at most five using lexical relevance, then bounded recency/importance tie-breaks. Keep the latest two observations verbatim. This is a **website lexical adapter**, not FakeEmbedding presented as semantic retrieval.
4. One prompt/actor includes role/preference, permitted observations, retrieved memory IDs, short current plan, action schema. Maximum 2,000 input tokens and 256 output tokens. Request one JSON action, optional short speech, one-line next plan. No extra reflection, critic, embedding, or steering call.
5. Validate with Pydantic. Allow `move`, `water`, `harvest`, `refill`, `talk`, `wait`; targets are existing IDs. Reducers enforce range, capacity, inventory, preconditions. A schema-valid proposal can still fail physics. Rejection becomes a visible observation; the plan never writes authoritative truth.
6. Persist accepted/rejected actions and generated plans with provenance. End-of-episode digest is deterministic, not another model call. Reset memories between episodes. Continuity lasts minutes; do not claim lifelong memory.
7. Invalid output/timeout produces `wait` labeled `rule fallback — model unavailable`, never invented speech. At most two retries across the episode, within its eight-attempt reservation. Two consecutive inference failures end it. Keep the last committed frame and separate bundled replay.

All visitors share one episode. No public reset, dialogue injection, or actor steering. Step/Reset/“Rainy morning” operate **only on bundled replay variants**, explicitly labeled. This replaces the old controls that let one visitor disrupt everyone. Stop after six decisions or six minutes; end early after zero viewers for 60 seconds. No background inference just to keep a LIVE badge lit.

## 6. `/<lang>/leo/` — Meet Leo, then ask the AI version

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| L1 | Authored biography, dated projects, skills Leo says he is most comfortable with, portrait | Actual information without talking to a bot | Résumé / email / project links |
| L2 | Three source-backed answers already visible: strongest skill, current project, AI opinion; approved text/recording excerpt links | What Leo said, and when | Source inline; approved full source → Note/media |
| L3 | **`#ask` — “Ask an AI version of me.”** Input, suggested questions; persistent “AI-generated from my approved public notes; not Leo replying.” Anime avatar beside text, above on mobile | Personal memory experiment, not a substitute for contacting Leo | Submit → answer/citations; short follow-up; email |
| L4 | Approved source → retrieved excerpt → generated answer diagram; snippets used by current answer | Traceable basis; retrieval is not proof of correctness | Sources inline; → T4 / Note |
| L5 | “I don't have an approved source for that”; dates/corrections visible | AI does not invent private life, skills, or opinions | → email / Notes |

### AI-Leo retrieval architecture

- Start with approved bio, résumé, public project summaries, short opinion answers. Leo's home audio/video adds evidence when recorded; it is not a launch dependency. Never ingest general kimaki history, DMs, calendars, NAS folders, or Jellyfin libraries.
- Private ingestion stores selected originals on the NAS. RQ CPU transcription processes recordings; Leo corrects/approves transcript and publishable excerpts. Only approved excerpts enter the public corpus. Raw home recordings remain private; media citations require separately approved clips.
- Postgres stores source ID, approval, date, language, revision, public anchor, optional timecode, supersession links. Chunk ~300 tokens with 50-token overlap. Version a small lexical index; Chinese uses explicit segmentation/character n-grams. Maintain approved bilingual aliases for skills/project names.
- Reuse AI Society's evidence/validity concepts and compatible contracts through a pinned adapter. Its production embedding adapter is unfinished: do not instantiate it or change research thresholds to ship the website. **First release is lexical retrieval plus generation; RAG does not require a vector database.** Defer semantic embeddings until they improve a held-out question set.
- `POST /api/demos/leo/answers`: ≤500 characters, at most two previous turns, signed 15-minute session. Retrieve up to four approved passages, ≤1,200 tokens; total prompt ≤2,500 tokens. No matching evidence → immediate abstention, zero model calls. “Current” facts use latest approved nonsuperseded source and show its date; conflicts/staleness do not become current fact.
- RQ makes one free request, ≤400 output tokens, no model retry, 35-second total deadline. Schema: answer, cited source IDs, unsupported flag. Reject unknown citations. Distinguish Leo's stated opinion from synthesis; never invent a stronger skill ranking. Citation validation cannot guarantee entailment; evaluate separately.
- Return validated answer plus excerpts. Cache only three public starter questions by locale/corpus revision/prompt/model; outputs say RECORDED. Arbitrary questions stay ephemeral, expire after 15 minutes, never update Leo's memory or enter permanent conversation logs.
- Before submission: “Your question and public source excerpts are sent to an external model provider. Don't include private information.” Keep routing privacy restrictions fixed; incompatible provider → source-only fallback, not relaxed settings. Outage shows authored FAQ and `UNKNOWN — no answer generated`.

### Anime character decision

Keep anime identity. Ship an original/commissioned **still first**, credited with rights. Day 90 permits a Live2D rig only in L3 if optional download ≤2 MB and asset/runtime rights are checked. States: idle-still, brief question-sent motion, one answer-ready gesture. No constant loop, fake lip-sync, camera tracking, microphone, voice cloning, or floating mascot. It reflects application events, not emotions of a digital person. Rig/load/WebGL failure leaves still and text Q&A intact. Zero model calls for animation.

## 7. `/<lang>/work/opencode/` — “Keeping coding sessions usable”

> Leo's direction remains literal: **“Everything for opencode should be animated — people don't want to read boring documentation.”** Every feature gets an explanatory animation, a finished still, and a short visible conclusion.

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| O1 | Problem; “My OpenCode fork and companion tooling”; upstream link, pinned Leo changes, four feature tags | Work on an existing project with specific authorship | Tags → O2–O5; all scenes readable without tabs |
| O2 | **`#debate` / `DEBATE`.** Finished decision and unresolved disagreement first. Play sends task into two reviewer lanes, returns labeled objections, assembles decision and sources | Multiple viewpoints compared; agreement is not proof | Play/Pause/Scrub; captured transcript/implementation inline |
| O3 | **`#autocompact` / `AUTOCOMPACT`.** Before/after context: kept verbatim / summarized / omitted from next prompt. Older goals/constraints flow into high-level summary; recent working detail into low-level summary; retained raw turns bypass; summaries plus retained turns enter next context | What survives, changes form, and goes where | Replay; real before/after excerpt and diff inline |
| O4 | **`#agent-pool` / `AGENT POOL`.** Final task/result table first. Requests pass MCP dispatcher into finite worker slots; busy jobs queue; task IDs return results; timeout visibly fails | Delegation has finite capacity and result ownership | Replay contention/failure; tool contract inline |
| O5 | **`#xray` / `XRAY`.** Question and relevant file locations first. Files enter actual index representation; query → retrieval → file/line evidence; second sequence shows changed-file invalidation | Code indexing makes navigation inspectable | Replay; snippet and indexed revision inline |
| O6 | Upstream maintenance, summary loss, timeouts, stale indexes; one failure clip with visible outcome | Leo understands consequences | Fork/companion repos; Note; → N1 |

### Animation and evidence contract

Use HTML/SVG timelines driven by bundled redacted event JSON. Each feature has a 10–20s sequence and transcript. Explicit Play; one sequence at a time. Show roles, tool calls, emitted summaries, decisions/results, not hidden model reasoning.

Map actual events into the animation and retain the source trace. Staged diagrams say `Illustration`; reconstructed captures say so and cite the source. No invented latency/token savings. Counts state measured versus estimated. “Omitted from next prompt” does not mean deleted from disk.

**Verification boundary:** inspected checkout `73e07e431` declares a 0.75 compaction threshold in configuration; `packages/core/src/session/compaction.ts` includes high/low prompt passes. A schema default does not prove the active runtime honors it. Pin the running entrypoint, inspect upstream diff, capture a session before claiming a “75% trigger” or retention behavior. Debate, agent-pool, xray were not located in inspected paths. This does not prove absence; locate source/companion repos and contribution history before claiming implementation. Until then, show their proposed animation with `UNKNOWN — implementation evidence pending`, or omit from Home proof. Producing truthful evidence for all four is assigned work, not permission to fabricate it.

### Live OpenCode decision

**No public serving instance in v2.** Fixed free models do not constrain shell execution, files, network access, tool loops, or prompt injection. Tiny free quotas cannot reliably support multi-agent debate and long-context compaction. Public experience: animated evidence; public inference budget **zero**.

Keep a real owner-operated instance for captures, over Tailscale only. A later invited experiment requires a disposable isolated worker, fixed tiny sample repo, immutable model config, no personal repos/secrets, Docker socket or NAS mounts; deny-default egress except a credential-holding model gateway; explicit tool allowlist. Cap one concurrent session, five minutes, eight model attempts, 8,000 generated tokens total; destroy workspace afterward. Assign a separate explicit budget before enabling it. Default Docker isolation on a secret-bearing NAS is not sufficient justification for public arbitrary coding. Without these controls, record locally. No disabled “Try live” bait button.

## 8. `/<lang>/notes/` and `/<lang>/notes/<slug>/`

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| N1 | Reverse-chron one-line entries: title/date, `AI / Technology / Build / Recipe` label | Ideas and dinner share Leo's personal voice | → N2 |
| N2 | Title/date, AI-editing note when applicable, revision note, body with photos/figures/sources | Leo authored the thoughts; bot helps package them | Sources/repos; discuss by email |
| N3 | Recipe variant: finished dish, personal note, servings, ingredients, ordered steps; preserve quantities and informal comments | Recipe usable without manufactured filler | Print CSS; related recipe / RSS |
| N4 | Footer and previous/next entry | No dead ends | → index / email |

Launch content: “A duplicate is an identity problem,” “Provenance beats accuracy,” a rejected-design/failure post, and a real recipe from Leo. Publish supplied material; do not invent his opinions or a recipe to fill slots.

### Discord → kimaki → static post publishing

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

| Step | Owner experience | Backend action / failure |
|---|---|---|
| P1 · Capture | Photos/text in one thread; `/post draft` selects it | Accept configured guild/channel and Leo's user ID only; ignore bots/unrelated history. Thread/message IDs form idempotency key. |
| P2 · Ingest | Acknowledgement and missing-field list | Copy attachments promptly to private staging, not expiring Discord CDN links. ≤10 raster photos, ≤10 MB each, ≤50 MB total. Decode/re-encode, strip EXIF/GPS, generate responsive sizes. Reject invalid/oversized media clearly. |
| P3 · Compose | Leo's wording retained; optional `/post polish` | Private Postgres draft; RQ generates Markdown/front matter. First line defaults title; collision-safe stable slug; photo order retained. Zero LLM required. Optional cleanup is one bounded free call; cannot invent quantities, times, opinions, captions, facts. Show edits and original. |
| P4 · Preview | Private rendered preview, image order, title/category/language, Publish button | Preview on private owner service, never public Pages. Missing recipe details remain questions, not guesses. Surface missing alt text. Message edits create a new draft revision. |
| P5 · Publish | One click publishes exactly previewed revision | Callback rechecks owner and draft hash. Stale approval returns new preview. Restricted publisher writes approved content/assets in isolated checkout, runs pinned generator with raw HTML disabled/sanitized, validates routes/links/feeds/assets, commits content. Text is data, never a shell command or agent instruction. |
| P6 · Deliver | Public URL after verified publication | Serialize publishing with one lock; fetch first; update content/main then `./scripts/publish.sh`. No unrelated overwrite or force-push. Build/conflict/push failure retains draft and last good site. Persist commit/hash; reconcile ambiguous pushes before retry. Verify deployed article hash before “Published.” |
| P7 · Revise/remove | `/post update` or `/post unpublish` previews change | Revision/date and feed/index rebuild. Removal needs its own owner action; cannot promise removal from Git history or external caches. Private material belongs in neither public files nor public history. |

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

## 9. Owner tools and existing Jellyfin

| # | Scene — what appears | Visitor understands | Actions → destination |
|---|---|---|---|
| S1 | Private NAS launchpad: Jellyfin, draft previews, demo status/budgets | Leo's workspace, not portfolio content | Authenticated links → existing services |
| S2 | Existing Jellyfin sign-in/library outside website | Media stays in existing service | Existing NAS instance over Tailscale; Jellyfin authentication retained |

No `/secret` page, shortcut, client password, token, library metadata, media thumbnail, private inventory in `site/`, RSS, sitemap, JS, or public repo. Obscurity is not authorization. Reuse Jellyfin; no reinstall or new public media port. Owner access failure stays private, never bypassed through public demo API.

## 10. Live / recorded / bundled matrix and model budget

### Feature operating contract

| Feature / scenes | Runs live | Recorded / bundled baseline | Free-model use | Failure result |
|---|---|---|---|---|
| Locale mirrors / all | Nothing | Full locale HTML; shared assets | 0 at request time | Missing article translation explicitly listed as English-only |
| Farm / H4, G1, T2–T5 | One shared short episode; ticks + bounded decisions | Verified trace/still; separately labeled synthetic variants | ≤8 attempts/episode, ≤2 episodes/day | Failed episode marked; last frame; separate replay |
| Jobs / J2–J5 | Real pipeline on fixtures, website outbox/review | Completed trace and identity fixtures | ≤3 attempts/run, ≤4 fresh runs/day | Incomplete stage, no invented score; separate replay |
| AI-Leo / H5, L1–L5 | One grounded answer/request | Authored FAQ, starter captures, sources | ≤1 attempt/answer, ≤8 fresh answers/day | Abstain or source-only fallback |
| Anime / L3 | Local event gesture if gate passes | Still avatar | 0 | Still; text unaffected |
| PC / G3 | No backend; future local viewer | Render and assembly clip | 0 | Poster/parts list; no WebGL requirement |
| OpenCode / O1–O6 | No public runtime | Four animations, traces or explicit illustrations | 0 public | Missing evidence UNKNOWN; still/transcript retained |
| Publishing / P1–P7 | Private ingestion, processing, build/deploy | Published HTML/media on Pages | 0 required; ≤1 optional polish/post, ≤2/day | Draft retained; original text works; last good site |
| Owner / S1–S2 | Existing private services | No public payload | 0 | Private error, no exposure fallback |

### Launch budget: $0 in purchased inference

OpenRouter currently documents **50 requests/day and 20/minute** for unfunded free-model use; qualifying credit purchases increase the daily allowance. More keys do not create account quota. Availability is opportunistic, not an SLA. [OpenRouter limits](https://openrouter.ai/docs/api_reference/limits), [published free-tier figures](https://openrouter.ai/blog/tutorials/how-to-get-the-lowest-cost-llm-inference-on-openrouter/).

**Site ceiling: 40 upstream attempts per UTC day, six/minute, one in flight globally.** Deployment checks actual limits, eligibility, competing account usage; reduce this ceiling when needed. No paid fallback, auto-top-up, quota-evading key rotation, or trial-credit dependence. Free describes inference billing; NAS electricity/storage/bandwidth/maintenance still cost something.

| Reservation | Attempts/day | Max input/output tokens per attempt | Buys |
|---|---:|---|---|
| Farm | 16 | 2,000 / 256 | Two episodes, each six decisions plus two retries |
| Jobs | 12 | 3,000 / 500 | Four runs, each two scores plus one retry |
| AI-Leo | 8 | 2,500 / 400 | Eight uncached answers, no retry |
| Optional post polish | 2 | 4,000 / 1,000 | Two cleanups; long posts use deterministic formatting |
| Verification reserve | 2 | 3,000 / 500 | Smoke probes, not continual inference health checks |
| **Total** | **40** | **≤102,000 input / ≤16,296 output tokens/day** | Hard ceilings, not promised throughput |

- A server-side gateway holds the OpenRouter key. Pin tested `:free` model IDs/provider policy per feature in deployment config. No browser model/provider/key selection; no random free router for recorded comparisons. Verify zero-priced routes and schema/language behavior before release. Record exact model ID in captures; retired/unavailable model → fail closed. Model selection is a deployment gate, not a promise that today's model exists in 90 days.
- Redis atomically reserves each run's maximum attempts and enforces shared caps. Postgres durably records reservations/attempts so Redis restart cannot replenish quota. Reserve before enqueue; idempotency prevents double reservation. Failed calls/retries count conservatively. Release safely expired unused reservations; never refund unknown sent attempts. Disable implicit SDK retries and model-fallback loops.
- Budgets span locales/features and the provider account. No automatic transfer between allocations. Other account usage reduces availability; provider 429 overrides the local ledger.
- Per signed anonymous session and hashed-IP bucket: one fresh Job run/day, two AI-Leo answers/day, one farm-create request/day. Watching/replay consumes no model quota. Use short-lived capabilities, origin checks, payload limits and gateway limits together; CORS is not abuse prevention. Distributed abuse can still exhaust the allowance; accept replay as the degraded experience.
- Honor Retry-After; do not hold visitors through long throttles. Circuit-break repeated errors/exhaustion. Message: “Today's live allowance is used; explore the recorded example.” Do not promise an unverified provider reset time.

## 11. NAS architecture and state transitions

Use the existing decision: **kawaiinas + Caddy + DDNS**, `https://api.leochai.com`, FastAPI/Postgres/Redis/RQ. No cloud GPU, new host, or paid always-on inference. Give each integration a self-contained `services/` folder, README, and public scene link. No backend code in `site/`.

| Component | Responsibility / boundary |
|---|---|
| Pages | Locale HTML, conclusions, traces, animations, posters, published media. No keys/private drafts. |
| Caddy + demo FastAPI | HTTPS, limits, signed capabilities, snapshot/SSE, validation/admission; exact-origin CORS. No arbitrary URL proxy. |
| Redis | Limits, ephemeral sessions, queues, run lock, bounded event streams; not sole accounting ledger or world authority. |
| Postgres | Runs, authoritative world/events/memories, approved Leo corpus, attempt ledger, separately protected publishing tables; transactional event outbox. |
| RQ | Separate `world`, `jobs`, `leo`, `publish` queues/workers. Public workers lack Git/Discord credentials, Docker socket, owner storage, personal candidate files. |
| Inference gateway | Serial admission, free-model allowlist, privacy policy, receipts, deadlines/output caps; no NAS-access tools. |
| Job storage | Per-run SQLite, deleted after an hour; no access to real job database. |
| Owner/publisher | Tailscale-only preview/launchpad, authenticated internal bot route, isolated checkout, narrow deploy authority. Public requests cannot enqueue publishing. |

| Proposed API route | Contract |
|---|---|
| `GET /api/demos/status` | Timestamped observed availability/episode state; never starts inference |
| `POST /api/demos/world/runs` | Join existing shared episode or reserve one; fixed scenario, no arbitrary prompt |
| `GET /api/demos/world/runs/{id}` and `/events` | Redacted public snapshot/resumable SSE |
| `POST /api/demos/jobs/runs` | Reserve sample with session capability/idempotency key |
| `GET /api/demos/jobs/runs/{id}` and `/events` | Session-authorized progress/result; isolated visitors |
| `POST /api/demos/jobs/runs/{id}/actions` | Apply/Skip/re-ingest/allowlisted threshold; same session, no external effect |
| `POST /api/demos/leo/answers` | Bounded retrieval/answer job, short-lived capability |
| `GET /api/demos/leo/answers/{id}` | Session-authorized polling result/sources; no public conversation URL |

Authenticated streams use fetch streaming with capability headers, not tokens in SSE query URLs. Events carry run ID, monotonic sequence, server timestamp, provenance, execution kind. Commit state/outbox atomically; publisher fans out to Redis Streams. FastAPI streams without occupying an RQ worker per viewer. Reconnect from last sequence; trimmed history returns a snapshot plus sequence. Drop slow clients, never unbounded buffers. Cap public streams at 50, two/session; queued inference jobs at eight, admission wait at 15 seconds. Excess clients receive static fallback immediately.

| Transition | Visitor behavior |
|---|---|
| Initial load | Finished static scene/evidence, no blank loading shell |
| Live requested | “Queued” beside baseline; 202 alone never makes evidence LIVE |
| Fresh committed event/result | LIVE for execution, timestamp/model; input still says bundled where appropriate |
| No heartbeat for 20s, stale event, or run failure | UNKNOWN current status; last timestamp/completed stages retained; separate RECORDED option |
| Episode completes | Stop LIVE badge; captured trace becomes RECORDED with completion time |
| Cache/replay selected | RECORDED even if animated or delivered by online API |
| Capture missing/corrupt | UNKNOWN evidence; authored conclusion/diagram retained; illustration never relabeled capture |
| Redis/NAS/provider down | Admission closes; no unaccounted calls; static site remains usable |

Farm/public traces contain fictional data only; Leo citations contain approved excerpts only. Logs keep IDs/timings/error codes/counters, not raw questions/secrets. Rate-limit hashes expire after 24h; redacted NAS demo captures after seven days. Promote reviewed captures into the static bundle deliberately.

Before implementation, record per-service hosting in `services/README.md`; overall NAS choice is already recorded. Update `docs/infra.md` when actual infra changes. Its recovered-source/container notes conflict with older “not in repo” / “root-only” sections; resolve through deployment inspection, not assumptions.

## 12. User flows

- **F1 · 90-second lead:** H1 identity → H2 resolved specimen → H3 accomplishments → H4 farm image → H5 person → H6 contact. Zero required clicks or inference.
- **F2 · Engineer:** uncertain pair → J2 → completed J4 transcript → optional sample → J5 evidence → OpenCode animation → email.
- **F3 · Farm sharer:** `/<lang>/work/tiny-world/#live` → captured farm immediately → join/reserve episode → resident observation → adaptation label.
- **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
- **F5 · Casual explorer:** gallery → PC clip → recipe → RSS. Engineering knowledge optional.
- **F6 · Chinese visitor:** `/zh/` → mirrored core pages → locale event labels/shared budgets → Chinese Notes or explicitly English-only entry. No toggle/automatic switch.
- **F7 · Mobile/reduced motion:** diagrams readable; chat stacks; farm text timeline; optional rigs/viewers unloaded; numbered animation stills.
- **F8 · NAS/quota failure:** recorded farm and pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.
- **F9 · Publish dinner:** private Discord photos/text → draft → private preview → one Publish click → verified article link. No terminal/Markdown editing.
- **F10 · Owner evening:** Tailscale → private launchpad → existing Jellyfin sign-in. No public-site payload.

## 13. RISK FLAGS — decisions, not an everything-list

| Risk / conflict | Recommendation | Release boundary |
|---|---|---|
| Multiple live ideas contradict one-demo law | Explicit one simulation + two bounded tools; no public OpenCode; passive Home | No fourth inference surface during 90 days |
| Free models cannot sustain always-on farm | Two short shared episodes/day; recorded default | No continuous-inference claim or silent paid fallback |
| Farm shortcut misrepresents AI Society | Adaptation label, reused/replaced modules, no steering/fidelity claim | Label adjacent to exhibit |
| AI-Leo invents personal facts/opinions | Approved corpus, dates, corrections, abstention, no memory writes | Grounded-answer checks before live submission |
| End-to-end Jobs implies live discovery/Discord | Real pipeline on bundled input with website outbox; explicit boundaries | No current-vacancy/Discord-verification/auto-apply claim |
| Animation hides conclusions or weak evidence | Finished diagram first; four explanatory sequences with trace or illustration label | No fake metrics/unsupported authorship/autoplay maze |
| Gallery duplicates Home or becomes hub | One finite page, direct Home links, PC inline | No filters/nested gallery/new PC page |
| 3D PC consumes time/mobile budget | Poster/clip after core, two-day cap; defer WebGL | No Home dependency; omit unfinished card |
| Live2D intrusive or implies a real digital person | Still first; optional L3 event gestures | ≤2 MB optional rig, rights verified, no loop; otherwise still |
| Secret pages leak NAS | Tailscale private origin plus service authentication; reuse Jellyfin | No private data in Pages/repo/feeds/source maps |
| Public OpenCode abused despite fixed models | Public recorded showcase, private capture instance | Excluded from day 90, not hidden behind obscure URL |
| Discord bot publishes private chatter | Dedicated selection, owner allowlist, preview, hash-bound Publish | No publish-every-message or model-controlled deploy |
| Chinese doubles maintenance | Shared assets/structure, revision-linked core mirrors, asynchronous articles | No unlabeled English fallback |
| Domain/infra docs disagree | Apex AGENTS rule; inspect and prepare corrected release runbook | Old-repo cutover needs Leo approval after artifact review |
| Distributed visitors drain free quota | Finite allocations/admission; accept degradation | Exhaustion remains usable recorded site |

## 14. Build order — day 30 / 60 / 90

| Milestone | Build in order | Ship gate / exclusions |
|---|---|---|
| **Day 30 — static story** | Locale templates/manifest/aliases, state/proof components. H1–H6, G1–G2/G4, J1–J6 bundled transcript, T1–T6 captured or explicitly illustrated farm, L1–L5 authored FAQ/still. Locate OpenCode evidence; produce four diagrams and initial animations. Notes template, two supplied essays and supplied recipe. Private kimaki drafts/images/preview/restricted publisher. | Both core locales readable without JS/NAS; no unsupported metric; missing OpenCode evidence labeled. Base-path checks; one draft publishes and failed build preserves old site. Live inference, rig, PC do not block. |
| **Day 60 — farm and Jobs live** | Service entries; gateway accounting, queue isolation, outbox/SSE/reconnect/kill switches. T3 shared episodes; passive H4. J4 real sample pipeline/outbox/review/cache rerun. Complete OpenCode recorded animations for verified features; unresolved ones marked. | Rejection/timeout, shared viewers, isolated job actions, idempotency, restart, quota/provider/NAS failure checks pass. Daily cap 40. No public coding instance. |
| **Day 90 — grounded AI-Leo and personality** | Approved recordings if supplied, otherwise approved text. L3 lexical RAG/source UI after evaluation. More genuine Notes/recipes, translations/captions, reader-driven refinement. Private launchpad to existing Jellyfin. At most two days for G3 render/clip. Optional Live2D gesture only after rights/performance gate. | Grounded-answer check and private-data audit pass. PC/rig defer if they threaten gates. No public OpenCode, arbitrary world steering, live scraping, long-term visitor memory, semantic embedding migration, standalone infra page. |

### Acceptance checks deciding “done”

1. **Story:** a reader identifies Leo, three projects, email/résumé from Home without clicking. Every case has visible result, limit, authorship.
2. **Resilience:** disable JS/disconnect NAS; check both roots, core deep links, one article per available locale, posters, preview base path. No false LIVE on replay/cache.
3. **Accounting:** concurrent creation/retries/worker interruption/Redis restart/model retirement/429/malformed JSON cannot bypass budgets, make paid calls, or cross sessions. Probes count.
4. **Jobs:** seven observations preserve provenance; requisition conflicts retained; filter reasons visible; only eligible jobs score; no duplicate card on repeat; Apply only changes demo; incomplete scores remain incomplete.
5. **Farm:** observation isolation, invalid-action rejection, one writer, replay from committed events, SSE resume, zero-viewer shutdown. Captured actions replay deterministically; rerunning LLM does not promise identical decisions.
6. **AI-Leo:** freeze 24 questions: eight factual, four opinions, four current/correction, four unsupported/private, four injection attempts, distributed across English/Chinese. Require approved valid citations for factual claims, no invented biography/opinion, correct supersession, abstention on every unsupported case. Leo reviews voice/meaning. Any violation blocks free-form Q&A; authored FAQ ships. This is a release check, not a claimed accuracy benchmark.
7. **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
8. **Motion:** phone viewport, keyboard, reduced motion, failed asset loads, transfer caps. Every animated feature communicates its result as a still.

## 15. Evidence used for this revision

Local read-only inspection on 2026-09-10:

| Source | Establishes / does not establish |
|---|---|
| Original storyboard | Five core destinations, instant conclusions, one-live baseline, uncertainty, scene format; revised explicitly above |
| `AGENTS.md`, README, publish script, services docs, infra inventory | Static Pages deployment, NAS FastAPI/Postgres/Redis/RQ, existing Jellyfin, conflicting historical/domain notes; not a new runtime audit |
| job-agent `20bdedb`, README | Implemented discovery/dedupe/filter/scoring/outbox/review, synthetic 7→3 fixture/idempotent rerun; live scoring/Discord verification documented pending credentials |
| ai-society `ef5bcfa`, README and memory modules | Deterministic state ownership, provenance/validity, retrieval seams; real embedding adapter stub, Discord shell only FakeModel echo |
| leos-opencode `73e07e431`, compaction config/implementation | Threshold config and high/low prompts; active runtime behavior/upstream attribution/other feature locations still need verification |

These are working-checkout observations, not proof of deployed integrations. External constraints are linked where used. Real captures and deployment-time provider checks replace assumptions before LIVE labels or performance claims ship.
