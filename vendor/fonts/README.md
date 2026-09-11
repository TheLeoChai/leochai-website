# Self-hosted type (LEO-161, iteration 1)

Newsreader Roman (optical size fixed at 48, weight 400–600) and Source Sans 3
Roman (weight 400–650) come from Google Fonts. `sources.json` pins the full
upstream revision, source checksums, axes and filenames; original sources and
both SIL Open Font Licenses are kept here. Upstream source paths are
`https://github.com/google/fonts/tree/<revision>/ofl/newsreader` and
`.../ofl/sourcesans3`. Sources are never copied into public output.

Regenerate offline after installing the pinned tools once:

```sh
uv venv /tmp/leochai-fonts-venv
uv pip install --python /tmp/leochai-fonts-venv/bin/python -r vendor/fonts/requirements.txt
/tmp/leochai-fonts-venv/bin/python scripts/generate-fonts.py
```

Alternatively activate that environment and run `npm run fonts:generate`.
Regeneration uses fixed source timestamps and exact tool versions, emits WOFF2,
and derives CSS unicode ranges plus a SHA-256/cmap manifest from the emitted
fonts. Commit generated assets together. Ordinary `npm run build` and
`npm run check` need only Node and committed artifacts: no font network requests
or Python installation. Font URLs resolve relative to CSS at either deployment
prefix. All faces use `swap`; no preload is installed.

The selected repertoire is the actual source glyph intersection with Latin,
Latin Extended-A, combining accents, punctuation, currency, arrows and minus.
Rendered body text, headings, accessibility strings and dynamic manifests fail
validation for unsupported glyphs. NFC normalization allows equivalent accents.
CJK scripts and CJK punctuation explicitly use system fallback. Chinese body
uses PingFang SC → Microsoft YaHei → Noto Sans CJK SC; Chinese headings use
Songti SC → SimSun → Noto Serif CJK SC. **Iteration 2 TODO:** replace Chinese
heading fallback with exact Noto Serif SC 500 subsets, including dynamic text.
The Latin-only iteration was explicitly approved by Leo.

Any string inserted by JavaScript must already exist in the rendered static
baseline or be registered in `assets/fonts/dynamic-text.json`. Example:

```json
{"routes":{"/en/work/tiny-world/":[{"role":"body","text":"Episode paused"}]}}
```

Roles are `display` or `body`; routes omit the deployment prefix. Keep manifests
in sync with dynamic content sources. The checker cannot infer arbitrary strings
constructed by JavaScript. There is no dynamic text in the current scaffold.

Measured iteration-1 assets: Newsreader **51,468 bytes**, Source Sans 3
**44,660 bytes**, total **96,128 bytes** (96.128 KB). Independent regeneration
produced identical SHA-256 checksums for both WOFF2 files.

Each build writes `site/fonts/route-bytes.json`. The English bound charges both
fonts in full even when cached or unused; Chinese system-only pages download no
fonts. The sum must remain ≤100,000 bytes. Recheck actual network use for the
image-heavy and farm pages as those pages are implemented; this scaffold is not
evidence about future page markup. For a browser fallback check, abort `*.woff2`
requests, disable JS, and verify heading/body text remains visible. Typography
CSS deliberately contains only font roles; layout and visual tokens belong to
LEO-114.
