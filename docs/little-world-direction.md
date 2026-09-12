# Little World direction — 2026-09-12

This records Leo's current instruction and overrides conflicting Home-first, visual and handoff rules in the earlier storyboard, design system, handoff and Wave 1 review. Their budget, privacy, evidence and static-hosting contracts remain in force.

## Decision and order

Leo rejected Wave 1 Home as resembling a résumé/document/Claude artifact. CP2 is **not approved**; merged LEO-50 and LEO-114 remain historical completed work, not visual approval. Little World comes first to discover the site's design and does not wait for old Home CP2.

1. **Now:** a polished, spacious pixel world prototype on the existing `/en/work/tiny-world/` and `/zh/work/tiny-world/` routes, retaining `#live`. Show two or three connected cooking, music, building or garden activities. The world should feel inhabited and worth looking at before its technical explanation. Use licensed/original art and truthful bundled fixtures. No backend or inference. Choose the workshop courtyard over the alternative stacked terrace: broad garden/workshop left, shared table right, a winding connecting path and creek in the foreground. This preserves breadth and legibly connected activity.
2. **Next:** independent visual review of actual initial and revised desktop/mobile screenshots, then Leo's Little World visual feedback. Future Home integration belongs to unfinished LEO-76; do not rebuild Home during this prototype.
3. **Later:** shared episodes and gateway work under LEO-62 and existing backend issues. Security, accounting, isolation and inference budgets are unchanged.

The eventual Home opening combines a world occupying more than half the screen with Leo's name and a short hello. Later, normal page chapters cover music, cooking, Waterloo + Wilfrid Laurier double-degree life, teaching/speaking, projects and contact. Present a playful, serious builder with a full life. Exact biography and wording require Leo's later input; do not invent them or position him solely as a game developer.

## Visual and motion contract

Retain blue-shaded off-white, purple-tinted ink, pastels, turquoise and existing subtle Miku hints. Sharp edges, hard shadows, forced grid breaks, gradient/word bans and a two-pass critique cap are **not requirements**. Choose composition, spacing and surfaces to serve the scene; the rejected Home is not an exemplar.

Use existing palette tokens in `assets/css/tokens.css` and shared templates in `content/_includes/`; `site/` is generated output. Preserve accessible contrast, visible focus, keyboard controls and 44px targets. Keep Miku hints within the authorized specification; add no character art or logos.

Show the completed poster immediately. Explanatory replay requires explicit Play, with Pause/Replay/Step or scrub controls. Gentle ambient motion is permitted if pauseable and suspended when hidden; reduced motion disables ambient motion and retains completed stills/numbered steps. No autoplay audio. No-JS visitors receive readable text and stills. A bundled fixture must never claim to be a recorded live run.

## Ownership and acceptance

| Owner | Responsibility |
| --- | --- |
| LEO-53 | Current direction and feature rollup |
| LEO-163 | Licensed art, authored spatial composition, reproducible bake, completed poster, credits |
| LEO-90 | Scene/trace interface, stable event IDs and pure deterministic `stateAt(trace, time)` replay; fixture and state validation |
| LEO-91 | Bilingual page/Canvas renderer, controls, responsive composition and static fallback; consumes art and schema |
| LEO-89 / 92 / 93 / 94 | Concise introduction / readable state details / truthful limits / exact provenance and credits |
| [LEO-164](https://linear.app/leochai/issue/LEO-164) | Independent screenshot review of initial and revised renders before Leo feedback |
| LEO-76 | Future Home world opening after Little World feedback |
| LEO-160 | Index only; decisions live in feature issues and this document |

Art and schema feed the renderer, which feeds visual review. Scene and trace share stable semantic anchors, sprite rectangles, actor IDs, integer timestamps, sequence numbers, actions and visible state changes. Authored movement paths are presentation, not claimed simulation telemetry. The old empty-can example can remain a small deterministic garden sequence; it does not constrain the world to a farm or replace connected activities. Retain Canvas 2D without a game engine, pixel-preserving rendering and absolute-time state derivation. The historical tiny Home postcard deliverable is deferred to LEO-76's new scope.

Acceptance requires licensed, coherent art at desktop and mobile sizes; two or three legibly connected activities; a useful completed still; deterministic seeking/replay; truthful bilingual fixture/limit/credit copy; no-JS and failed-asset fallback; keyboard/reduced-motion checks; production and preview-prefix builds; measured page assets. Retain the replay-code target of 15 KB gzip and existing Home 500 KB initial ceiling for future integration. Review visual quality separately from automated passes.

## Execution and review

Use native subagents with actual model selection: `gpt-6-astra` at high for frontend/art and independent visual review; medium for bounded tooling/docs/Linear work. Builder and reviewer are separate. Each issue has a branch and reviewed PR to `main`; only merged implementation issues become Done. Do not force-push any branch, upload critiques, publish, run the publish script or change domains. The only authorized notification is the explicitly requested completion callback to session `ses_f7203b7f8ffe26tPnR1h5IRq6D`, after verifying the actual CLI invocation; do not send other notifications. Review initial and revised screenshots at 390, 768 and 1440px in both locales, recording concrete visual findings; iterate as needed without an arbitrary pass cap. Passing tests or an agent review does not constitute Leo's visual sign-off.
