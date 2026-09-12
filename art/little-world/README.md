# Workshop courtyard source

`courtyard.tmj` is the authoritative finite, orthogonal Tiled map (32×20 cells,
16px tiles). It was spatially authored as Tiled JSON, not exported from a Tiled
GUI session. Open it in Tiled to inspect/edit normal tile layers, named vector
objects and semantic point anchors. The two `.tsj` files reference original
vendored Kenney sheets. Landscape and small original details are editable
colored Tiled vector objects. Colors in the source map are illustration paint,
not page CSS tokens.

The bake reads that geometry directly; it does not manufacture a Tiled file
after rendering. It remaps compatible Kenney colors, crops only used character
frames, applies civilian edits, packs used runtime sprites, and renders static
stills using the exact shared replay model. The scene is 512×320 native pixels.
The centered mobile camera `[128,48,256,256]` preserves every action location;
the full island provides a broader desktop composition. The site controls the
presentation scale with nearest-neighbor rendering.

## Reproduce

Requirements: Python 3.11+, Pillow 9.4+ (reference bake: 9.4.0), Node 22+. Pillow
is build tooling only, never a browser dependency. LEO-90's model and trace must
be integrated before the default complete-still bake.

```sh
python3 scripts/world-sources.py
python3 scripts/world-bake.py
```

Vendored sources are sufficient; the normal bake has no network access. To
restore them from their public sources, explicitly run
`python3 scripts/world-sources.py --fetch`; archive and member hashes must match.
For isolated art/model branches, use
`python3 scripts/world-bake.py --model-root /path/to/model-checkout`.

Outputs under `assets/world/`: `map-base.png`, transparent `map-front.png`,
`sprites.png`, `scene.json`, completed `poster.png`, and `still-1.png` through
`still-3.png`. Still times come from the trace's named events; the current
2000/19000/40000ms stills show rejection, harvested herbs and lunch together.
`poster.png` is identical to the completed third still. The bake invokes the
shared `createWorldModel` instead of duplicating event application or routes.
`poster-review.png` and `sprite-contact-sheet.png` here are enlarged review
artifacts and are not browser payload.

## Rendering contract

`scene.anchors` maps semantic IDs to `{x,y}` presentation foot positions.
`scene.sprites` maps used frame keys to `{x,y,w,h,anchorX,anchorY}` source atlas
rectangles. `scene.actors` maps resident IDs to `idle` and `walk` frame keys.
Draw base, state props, actors sorted by foot Y, carried items, then front.
Carried item foot position is actor foot plus `[11,3]`. `scene.heldSprites` maps
inventory keys to native 16×16 frames (anchor `[8,12]`), prebaked with Pillow's
nearest-neighbor sampling. `scene.carryScale` records their source scale (0.5);
the renderer never downsamples them. Placed world props remain at native scale.
Normal-motion stills select the same absolute-time walk frame as Canvas:
moving and `floor(time / 240) % 2`. Reduced-motion rendering can retain idle.

Initial herbs are baked into base. Replace bed-01 using `bed-watered` or
`bed-harvested` at `stateProps.bed`; the latter hides harvested leaves and adds
wet soil. Stool and meal are state overlays, never permanently present in base.
Can contents have visibly different empty/full frames. Kitchen steam appears
only while its meal is ready there. Water's brief splash is derived from the
accepted event's absolute time. All other state and positions come from the
shared model. No wall-clock randomness or inferred live state enters the bake.

Credits and source licensing are recorded in `../../ART-CREDITS.md`.
