# Little World independent visual review — LEO-164

Status: independent review complete; ready for Leo's Little World visual feedback. Material visual findings and the pixel-parity engineering check are resolved. This is not Leo's approval. Review authority is the 2026-09-12 Little World direction and live LEO-53/LEO-164, which supersede the rejected Wave 1 Home exemplar and the former two-pass cap.

## Initial evidence and critique

Actual initial 1536×960 poster inspected with `view_image`: `initial/art-poster.png`, copied from the art worktree before revisions. This is art-stage evidence; responsive page and motion review remain pending.

- Composition: the broad island, left workshop, right kitchen, garden and foreground creek establish a coherent place. The connecting dirt clearing is legible and spacious. Purple outlines and pastel terrain generally belong together.
- Material defect: repeated large trees have hollow arch silhouettes that look like cutout or broken sprites, and their dark outlines compete with the activities. Replace with intact canopies.
- Material defect: a continuous horizontal fence blocks the bridge entrance. Open the fence at the bridge so the route reads as traversable.
- Material defect: large rectangular grass patches reveal hard tile boundaries and reduce the authored-landscape quality. Blend or eliminate the unintended rectangular patches.
- Scale risk: the front table/radio/resident grouping is much smaller than the two buildings; cooking at the right building and eating at the foreground table may read as scattered tiny props at mobile scale. Verify the actual page and strengthen activity silhouettes if needed.

Initial findings sent to parent and art builder before revised evidence. Art builder had already identified the canopy, texture and bridge-fence defects independently.

Revised art evidence `revised/art-poster.png` inspected directly. Tree canopies are now intact, their clusters quieter, and bridge access visibly connects to the communal table. The prominent rectangular grass patches are gone. A stray partial tree at the left remained in this intermediate image; parent had already requested its removal. Remaining squared dirt junctions read as paths rather than unintended texture seams. No additional art blocker identified before responsive page inspection; small activity/resident scale remains a page-stage question.

## Responsive page, motion and fallback review

Initial English/Chinese viewport screenshots at 390, 768 and 1440px were independently captured and directly inspected (`initial/{en,zh}-{390,768,1440}-viewport.png`), alongside the English desktop full page. All use a 1000px viewport height and reduced motion to freeze the initial state. Geometry and enhancement readiness are recorded in `initial/geometry.json`; all six were ready without horizontal overflow.

- Desktop: the 1152×720 world starts at approximately y291, so it dominates the opening. The heading and brief hello frame it without an explanation panel obscuring the art. Both languages maintain the same hierarchy.
- Mobile: the initial world starts at approximately y335 after a tall navigation/introduction region. The central crop leaves residents only around 15–20px high; their shared table activity is harder to read than the buildings. Requested the authored 256×256 crop and less vertical space above the world.
- Tablet: the complete 704×440 world is legible and unclipped. Intro whitespace is looser than needed but does not block understanding.
- Story stills: three full-world thumbnails reduce the important event differences to a few pixels. Requested activity-focused crops or an equivalent close view so the empty can, garden-to-kitchen transfer and gathering can be understood visually.
- The completed canvas shows a held watering can next to the gardener that differs from the initial art poster; parent is checking poster/model parity separately.

Initial responsive findings were delivered to the page builder and parent before revision. Revised responsive images, actual motion and fallback evidence remain pending.

Actual initial replay was explicitly started in Chromium and sampled at 0, 3, 8, 14, 20, 27, 34 and 40 seconds; all eight scene screenshots were directly inspected (`motion/actual-*.png`, `motion/actual-timing.json`). These are actual time-progressing browser frames, not states inferred only from model tests. The garden-to-kitchen meal and workshop-to-table stool routes visibly connect three activities. Residents gather coherently at the end, with no camera motion or scroll hijack. The held watering can was too large relative to the gardener and obscured the resident silhouette; this finding went to parent/page builder. Page builder reports the final art already reduces its sprite; revised playback must confirm that change. This review samples motion over time and does not claim a full-frame-rate video inspection.

## Verdict

Revised English/Chinese screenshots at all three required widths were independently captured and directly inspected (`revised/{en,zh}-{390,768,1440}-viewport.png`), along with the revised English full page. Final revised geometry is in `revised/geometry.json`.

- Mobile world begins at y255 rather than y335, an 80px improvement. The 256×256 authored crop enlarges the relevant scene while preserving garden, kitchen/workbench interaction anchors, gathering table and creek entrance. Some outer architecture/trees are intentionally cropped; no activity is lost.
- Desktop keeps the spacious 1152×720 world and clear title/brief hello hierarchy. Tablet trims 28px of intro spacing. English and Chinese remain balanced, with readable captions and unclipped controls.
- The three focused story images now visibly distinguish the garden/well snag, parallel kitchen/workshop activity, and final gathering. Their close views solve the initial repeated-thumbnail problem and give no-JS visitors meaningful stills.
- Intact canopies, unobstructed bridge access, smoother terrain and removal of the stray partial tree resolve the initial art defects. The table, radio and individual residents now read as a gathering spot within the wider courtyard.
- The revised actual mobile replay was explicitly played and sampled at the same eight timestamps, with every frame directly inspected (`motion-revised/actual-*.png`, timing JSON alongside). The smaller carried props no longer obscure the gardener/cook/maker silhouettes. Walking routes and eventual gathering remain inside the mobile crop. Garden, cooking and seat repair form three connected activities; the radio is a secondary music hint, not a separately claimed simulated activity.

No remaining material visual defect requires another aesthetic iteration before Leo feedback. The world is a coherent, inhabited prototype with playful art and a restrained surrounding page. Leo still decides whether this visual personality should inform the future Home opening. This review does not approve Home CP2, final biography, live episodes or publication.

## Supporting checks and limits

Parent's final `final/audit.json` was independently read: all six locale/width combinations have zero axe violations, browser errors and horizontal overflow. Both locales' no-JS, reduced-motion and blocked-enhancement runs report no overflow or running animations. Representative final screenshots were directly inspected: `final/no-js-en-390.png`, `final/reduced-motion-zh-390.png`, and `final/blocked-enhancement-en-390.png`. The completed scene and numbered story remain readable; reduced motion offers still navigation without playback.

The intermediate `final-interactions/interactions.json` recorded a 21-pixel poster difference and 21/49-pixel story-still differences. These were resolved in the accepted build. I independently read `accepted-interactions/interactions.json`: poster and all three baked stills now have **zero pixel difference** against Canvas in both locales. Direct seeking and playback agree on pixels, captions and observations at all six checkpoints; initial/paused scheduling is zero and replay scheduling is one.

Final regression confirmation directly inspected `accepted/viewport-en-390.png`, `accepted/viewport-zh-390.png` and `accepted/viewport-en-1440.png`: adjusted navigation targets fit, controls remain readable, and the sprite correction causes no composition regression. `accepted/audit.json` reconfirms zero axe violations, browser errors and overflow in all six locale/width cases, plus zero overflow/animations across the six fallback cases.

I also independently read `supplemental.json`: all 16 check groups pass, including keyboard operation, at least 44×44px tested navigation/player targets, discrete reduced-motion controls, failed trace/base/poster handling and blocked-font layout. The visibility test uses a synthetic hidden event rather than an actual OS background-tab lifecycle; blocked-font checks do not assess glyph quality. `budget.json` records zero overflow at 320px, 4,894 bytes gzip estimated replay code, and observed tunnel transfers of 237,268 bytes English / 185,812 bytes Chinese, unchanged after Play. Those transfer observations include tunnel-injected resources and are distinct from source gzip estimates.

Motion review used real time-progressing browser frames, not a full-frame-rate video. It verifies meaningful positions, carried-object readability, activity connections and final composition; deterministic/scheduler checks provide separate engineering evidence. No ambient animation is necessary for this prototype, and none is claimed. No publishing or external critique upload occurred during this review.
