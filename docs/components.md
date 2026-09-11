# Shared components (LEO-114)

Author in `content/_includes/components/`; the build also copies these patterns
to `site/_includes/components/`. All shared styling lives in
`assets/css/components.css`, emitted as `site/css/components.css`. Page CSS may
compose these components but must not duplicate their styles.

Import macros from `components/ui.njk`:

- `button(label, href, variant='solid')`: anchor action; variants `solid`,
  `outline`, `accent`. Wrap related actions in `.actions` for wrapping and gaps.
- `source(label)`: provenance label, separate from execution state.
- `state(proof, locale='en')`: execution badge and required evidence text.
- `card(title, href, summary, highlight=false, heading='h2')`: article with one
  linked heading; `{% call card(...) %}` supplies supporting content. Highlight
  adds the single hard offset shadow. Choose `h2` or `h3` for document hierarchy.
- `prose()`: call block for readable article text.
- `figure(src, alt, caption, width, height)`: image and visible caption. Pass
  `false` for `src` and a call block for an inline SVG; use CSS color tokens.
- `callout(title)`: call block with a short visible limit or explanation.
- `evidence(manifest, locale='en')`: inline table of all nine proof fields.
  Missing values explicitly say “Not supplied”.

Navigation/footer are included by `base.njk`. Navigation links to locale Home,
Projects, Notes, and the supplied résumé; while the PDF is unavailable it uses
the approved request email. The active case-study section is marked as a
location. `route.pageStyles`/`route.pageScripts` arrays load page-specific CSS and
ES modules; top-level `pageStyles`/`pageScripts` are fallback layout hooks.

## Execution metadata boundary

`lib/evidence.js` enforces the [execution and authorship policy](evidence-policy.md).
Static `state(proof, locale)` calls emit RECORDED or UNKNOWN only. The helper's
optional third argument supplies an explicit runtime clock; LIVE then also
requires active committed execution and fresh server event/heartbeat evidence.
A source label cannot grant an execution state. Capture metadata is an authoring
contract, not proof of asset existence or cryptographic verification.

Proof manifest keys: `repo`, `commit`, `capturedAt`, `inputHash`, `provider`,
`model`, `schema`, `redaction`, `contribution`. Explain non-model execution in the
provider/model values rather than inventing an inference provider.

## Timeline contract

Import `timeline` from `components/timeline.njk`; call
`timeline(model, locale='en', heading='h2')`. Add `/js/timeline.js` once through
`route.pageScripts` on pages that use the player. No player JS loads globally.
`tests/fixtures/timeline.json` demonstrates the model without adding a route.

A model has a stable unique `id`, `title`, optional `sourceLabel`, positive
`duration` in milliseconds, and ordered `steps`. Every step includes `at`,
`title`, `body`, and the **complete** `items` frame. Every item has `id`, `label`,
`detail`, and `status` (`pending`, `complete`, `uncertain`, `failed`). The first
step is at zero and the final step is at `duration`. Empty item arrays are
allowed; duplicate item IDs and incomplete frames fail the build.

`stateAt(model,t)` clamps time and selects a complete frame without side effects.
It does not replay callbacks or combine patches when seeking. The renderer
emits `timeline:state` with `{time,progress,stepIndex,frame}` for future custom
HTML/SVG diagrams. The central registry permits only one playing sequence.
Replay cancels the previous clock. Native range keys scrub in one-percent
increments; Home/End select the endpoints. Only step changes enter the polite
live region. Model text never uses `innerHTML`.

Final frames and all numbered step details come from the same JSON at build
time. Intermediate labels are in static HTML so the font gate checks them too.
No JS, failed script fetches, and malformed enhancement data retain the final
frame and steps. Controls are initially hidden and never autoplay. Reduced
motion selects the final frame and hides motion controls, including when the
preference changes during playback. Numbered steps stay available to everyone.

## Verification

`npm run build` and `npm run check` enforce Stylelint and the content gate before
rendering/promoting. The CSS rule rejects literal/named/function colors outside
`tokens.css`, unapproved token names or definitions, changed/missing pinned
tokens, gradients, and alternative shadows. No custom Radix hover steps are
needed: interaction uses the approved ink/elevation tokens.

`npm test` covers deterministic and reverse seeking, single-player ownership,
Replay while playing, reduced motion, cleanup, invalid evidence origins,
script-safe JSON, intermediate glyph coverage, and CSS enforcement. The two
player modules together gzip to 2,106 bytes against a 3,072-byte budget.

`node scripts/component-specimen.mjs` writes a temporary development specimen to
`.build/components-review/`; it never enters the route manifest or `site/`.
Review screenshots are `/tmp/leo114-{390,768,1440}.png`. First screenshot critique:
390px action links wrapped without a row gap; fixed by using `.actions` with a
12px gap. At 1440px hierarchy, sharp edges, bounded prose, and restrained teal
follow the visual contract. Home is not yet an approved exemplar, so these are
component checks, not Home composition approval. No second aesthetic pass was
needed beyond checking the action-gap correction.
