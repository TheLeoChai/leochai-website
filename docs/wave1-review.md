# Wave 1 and Home design demonstration

> **Leo's 2026-09-12 decision: Home visual direction REJECTED** as a résumé/document/Claude artifact. CP2 is not approved. The checks and merged PRs below are historical implementation evidence, not visual sign-off. [Little World direction](little-world-direction.md) now governs: build Little World first without the old CP2 dependency, obtain world feedback, then revisit Home through LEO-76.

Scope: Foundation plus the first Home exemplar, after CP1 and before CP2.
Nothing in this run publishes to GitHub Pages or changes the domain. The
remaining core destinations have structural routes, not finished case studies.

## Review record

| Issue | Merged PR | Review |
| --- | --- | --- |
| LEO-112 | [#1](https://github.com/TheLeoChai/leochai-website/pull/1) | [Routing diff](https://critique.work/v/5053addf29b128634488c542c8288d2e) |
| LEO-113 | [#3](https://github.com/TheLeoChai/leochai-website/pull/3) | [Feeds and publication rules](https://critique.work/v/c85fe3242bcaa1fe51e5c26ad4a21c43) |
| LEO-161 | [#4](https://github.com/TheLeoChai/leochai-website/pull/4) | [Font pipeline](https://critique.work/v/73030888038adccc16b2d42787ef9cc1) |
| LEO-114 | [#5](https://github.com/TheLeoChai/leochai-website/pull/5) | [Shared components](https://critique.work/v/303e595a81b0bc28549cd1c6fc9a1ec8) |
| LEO-115 | [#6](https://github.com/TheLeoChai/leochai-website/pull/6) | [Evidence state policy](https://critique.work/v/e291ccec323dc794930721b277e9fc4a) |
| LEO-50 | [#7](https://github.com/TheLeoChai/leochai-website/pull/7) | [Home exemplar](https://critique.work/v/33e187459baa578d8d66e6b8e66c019c) |

The builder and reviewer are separate agents. Parent review includes generated
output, browser behavior and screenshots, not only the implementation report.
Integrated Home evidence is recorded below; Leo subsequently rejected this visual direction. CP2 remains unapproved.

## Explicit first-iteration limits

- An approved résumé PDF has not been supplied. Requesting it by email remains
  available; the site must not offer a fabricated download.
- Leo's biography sentences, dated personal update and Notes titles use marked
  placeholders until supplied. Placeholder notes are not published feed entries.
- Chinese headings may use system serif fallback. Exact Noto Serif SC heading
  subsets are deferred to iteration 2 under LEO-161.
- The farm postcard is an illustration, not a captured or live episode. Pixel
  art belongs to LEO-163. Home does not create runs or request inference.
- Chromium's no-JS meta refresh drops incoming legacy URL fragments. Real
  destination IDs remain present; aliases include explicit deep links, and the
  JavaScript redirect preserves hash/query. This is not reported as no-JS
  fragment preservation.
- No CNAME is introduced. The builder preserves any existing CNAME and emits
  `.nojekyll`; domain cutover requires its separate approval.

## Foundation evidence

LEO-112: production and preview-prefix artifacts passed route/metadata/link
validation. Isolated tests confirmed missing translations do not create false
routes and failed validation retains the previous output. Existing CNAME bytes
survive promotion. Parent Chromium checks passed for all four aliases with and
without JS, with the fragment limitation above. Baseline en/zh screenshots at
390/768/1440 had zero axe violations and zero horizontal overflow; root and
English alias rendered the same content. This baseline was intentionally bare;
visual approval applies to the later Home screenshots, not this scaffold.

LEO-113: real virtual-template feed fixtures cover encoded descriptions, drafts,
missing and published translations, both prefixes and owner-output rejection.

LEO-48 cleanup: empty feeds use the authored baseline timestamp
`2026-09-11T05:10:17Z`, recorded once as feed metadata. Repeated full builds are
byte-identical independently at both deployment prefixes; populated feeds keep
the newest article's actual publication date. The integrated tests and
both-prefix validation pass. Cleanup changes no authored pages, CNAME or
infrastructure.

LEO-161: pinned-source regeneration reproduced both WOFF2 hashes. Newsreader is
51,468 bytes; Source Sans 3 is 44,660 bytes (96,128 combined). Independent
Chromium requests confirmed exactly two local fonts for English and zero for
Chinese. Both locales remained readable with fonts blocked at all three
viewports. Missing declared dynamic glyphs and corrupt font bytes fail the build.

LEO-114: both-prefix builds, exact palette and 5.26:1 teal contrast gates,
regression tests and component browser checks passed. Parent review caught and
verified fixes for Replay scheduling multiple clocks and model serialization.
Intermediate timeline frames are also readable in the numbered no-JS steps.
A 12px gap fixed wrapped mobile action links. The two player modules total
2,106 gzip bytes against a 3,072-byte budget. No shipped specimen route exists.

LEO-115: independent policy tests cover fresh and stale live events, explicit
clocks, recorded provenance, failed and completed runs, and invalid dates.
Static builds cannot manufacture LIVE. The helper validates metadata, not the
existence or authenticity of capture assets; that remains an import obligation.

## Home evidence and CP2

LEO-50 implements all H1–H6 scenes in English and Chinese, with `/` and `/en/`
byte-identical. The identity example links to the pinned job-agent synthetic
fixture. Keyboard Enter/Space changes examples while keeping focus. Both
examples remain present without JavaScript or when the module fails to load.
All Home links and buttons meet the 44px touch target, including shared card
titles corrected during integration.

The builder and parent independently checked the rendered Home. Final axe,
resource-error and horizontal-overflow counts are zero at 390, 768 and 1440 in
both locales. Reduced motion has no running animations. Font-blocked rendering
passes all three widths in both locales. Production and preview-prefix builds,
Node tests, stylelint/token enforcement and the de-slop gate pass.

| Home resource estimate | English | Chinese |
| --- | ---: | ---: |
| Compressed initial resources | 105,782 bytes | 10,257 bytes |
| Included font bytes | 96,128 bytes | 0 bytes |
| External/backend/media requests | 0 | 0 |

Text resources are measured with gzip; WOFF2 uses its existing compressed size.
The local preview server itself does not enable transport gzip. Both pages are
below the 500 KB compressed contract and the 100 KB font limit.

Two screenshot self-critique passes were used. Pass 1 identified the missing
saturated decorative accent and exact hero text spacing. Final pass confirmed
hierarchy, the featured-plus-stacked cards and the deliberate farm bleed. The
parent separately removed opinion-like copy unsupported by supplied facts and
verified the shared card touch-target fix. No third aesthetic pass was taken.
Local review artifacts are in `/tmp/leochai-review/home-parent/` (six responsive
screenshots, no-JS stills, blocked-font stills, audit and budget reports).

Leo's designated thread was notified as soon as the passing Home build was
served by the current tunnel. CP2 was subsequently rejected; missing authored
content remains with Leo. Little World work is now authorized before Home
approval; production publication remains unauthorized. Tunnel URLs are session-specific; read the active
`leochai-dev` tuistory session before sharing a URL again.
