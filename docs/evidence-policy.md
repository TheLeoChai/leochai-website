# Execution, provenance and authorship (LEO-115)

This contract applies to every page and shared template. It implements storyboard
§0 and §11 without adding a live service. Page-specific story and resilience
acceptance remains with the page issues and release gate.

## Execution helper

Use `state(proof, locale)` from `components/ui.njk`; use `source(label)` separately
for input provenance. Static templates emit only RECORDED or UNKNOWN. Never hardcode
a LIVE badge in authored content or pass a build timestamp as a runtime clock.

`proofState(proof, locale='en', { now })` is a pure metadata policy helper. The
optional `now` is the current Unix time in milliseconds, supplied by a future
runtime consumer on each evaluation. No clock means no LIVE. It performs no
network calls and does not implement a timer, service authentication, or event
integrity checks. A future consumer must reevaluate on events and before the
20-second expiry, including after tab suspension; it must not persist the result.

| State | Required evidence |
| --- | --- |
| LIVE | `state: 'LIVE'`, `origin: 'live'`, `committed: true`, `lifecycle: 'active'`, nonempty `runId`, `lastEventAt`, `lastHeartbeatAt`, explicit `now`. Both timestamps must be less than 20 seconds old and not in the future. `delivery` is absent or `'live'`. |
| RECORDED | `origin: 'capture'`, valid `capturedAt`, nonempty `revision`, and `captureValid` is not false. Selected by `state: 'RECORDED'`, `delivery: 'replay'`/`'cache'`, or `lifecycle: 'completed'`. |
| UNKNOWN | Missing, invalid or stale evidence; queued work; failed or completed live runs without a capture. Visible reason and any valid last server event are retained. |

Timestamps are UTC ISO instants with `Z`, optional 1–3 fractional digits, and a
real calendar date. Convert timezone offsets to UTC before calling the helper.
A connection, HTTP 202, online API, animation playback, input fixture, or source
label cannot establish LIVE. A fresh heartbeat does not repair a stale event.
A completed run becomes RECORDED only when real capture metadata is supplied;
completion never manufactures a capture. For a failed run, retain completed
stages and the failure visibly, with a separate captured replay if one exists.
A recorded failed attempt may show RECORDED with its failed outcome described
beside it; that chip establishes capture provenance, not successful execution.

Capture metadata is an authoring contract, **not cryptographic verification or
proof that a file exists**. The capture importer/author must validate the actual
asset and set `captureValid: false` if it is missing or corrupt. Do not fill in
capture dates, revisions, model names, or metrics without evidence. Synthetic
illustrations use `origin: 'illustration'` or `'synthetic'`, never `'capture'`.
A real pipeline run on synthetic inputs can have a real capture: label its inputs
as bundled/synthetic independently. Preserve all nine proof-manifest fields in
the inline evidence table; missing values remain “Not supplied”.

## Template and content obligations

- Show the conclusion, finished result and concrete example before interaction.
  Every case exposes its limits and authorship inline. Supporting disclosures
  must not hide conclusions or uncertainty.
- Identify Leo's original work, upstream modifications, companion tools and
  third-party components accurately. Credit licensed/generated art and distinguish
  illustrative diagrams from verified captures. Evidence tables state Leo's
  contribution; they do not imply he authored an upstream project.
- AI-Leo is an AI representation, not Leo speaking live. State that beside the
  answer/transcript, even if execution is LIVE. Authored FAQ, captured AI answer
  and newly generated answer have separate descriptions. Sources and their dates
  remain visible; unsupported personal answers abstain or show source-only text.
- Source labels such as “Bundled fixture”, “Illustration” and “Local 3D animation”
  are independent from the three execution states. Do not turn them into a fourth
  execution state or use them to imply an actual run.
- Only Tiny World, bounded Job Matching and bounded AI-Leo may use public
  inference in the first 90 days. All are opt-in: no model calls on page load,
  public OpenCode terminal, or continuous farm inference. Home is static first;
  reading it requires neither inference nor a NAS request.
- Public routes, conclusions, articles, images, stills and bundled replays come
  from GitHub Pages. Missing JS or a sleeping NAS must leave those usable. Never
  say “waking server…” unless a real wake mechanism exists. Page features retain
  authored fallbacks when captures are absent; they never invent evidence.

The regression suite uses clearly artificial metadata inside tests only. It
checks static template output, replay/cache, synthetic provenance, invalid dates,
staleness, completion and failure without contacting the NAS or a model.
