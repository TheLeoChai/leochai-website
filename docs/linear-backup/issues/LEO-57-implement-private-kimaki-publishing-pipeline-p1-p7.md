# Implement private kimaki publishing pipeline (P1–P7)

- Identifier: LEO-57
- Linear: https://linear.app/leochai/issue/LEO-57/implement-private-kimaki-publishing-pipeline-p1-p7
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-30
- Milestone: Publishing pipeline
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-120, LEO-127, LEO-121, LEO-122, LEO-123, LEO-124, LEO-125, LEO-126
- Blocks: LEO-129, LEO-128, LEO-111, LEO-110, LEO-69, LEO-58
- Blocked by: LEO-48, LEO-56
- Related: LEO-160
- Created: 2026-09-10T20:23:30.593Z
- Updated: 2026-09-11T02:20:24.456Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: P1–P7; N1–N4 output; F9; §11 private publisher boundary
Build order: M1, step 10 (relative day 30 target).

Verify the existing kimaki extension seam and add a narrow owner-only thread-to-draft handler with private media staging, revisioned preview and one hash-bound Publish action. Build deterministic Markdown/front matter and a restricted serialized publisher that validates, commits approved content and calls [publish.sh](<http://publish.sh>), then verifies the deployed article hash. Add update/unpublish previews, durable receipts, backups and documented setup/recovery.

Key constraints

* Configured guild/channel/owner allowlist; thread/message idempotency; no unrestricted coding-agent execution or public draft reads.
* ≤10 raster photos, ≤10 MB each/≤50 MB total; decode/re-encode, strip EXIF/GPS, responsive output; preserve originals privately and ask for missing facts/alt text.
* Zero LLM required; optional polish ≤1 attempt/post, ≤2/day, 4,000 input/1,000 output tokens within §10 gateway, never invent facts. Keep disabled until accounting exists.
* Private preview/internal auth; repo-scoped publisher credentials isolated from public workers; text is data, sanitized/raw-HTML-disabled generation, content-only writes; no force-push/Actions. Fetch/lock, reconcile ambiguous pushes, retain last good site.

Acceptance criteria (§14)

* §14 day 30 + check 7: one draft publishes exactly its approved preview revision and deployed hash verifies; failed build/conflict/push preserves draft and last good site.
* Wrong author/stale Publish rejected; duplicate event gives one draft; malformed media/Markdown cannot execute scripts; update/removal require owner action.
* Private originals/drafts/secrets never reach public output/history; document services/site-publisher/README.md and hosting decision before unattended use.

## Feature-section work breakdown

* [LEO-120 · P1 · Capture · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-120/p1-capture-private-publishing-pipeline>)
* [LEO-121 · P2 · Ingest · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-121/p2-ingest-private-publishing-pipeline>)
* [LEO-122 · P3 · Compose · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-122/p3-compose-private-publishing-pipeline>)
* [LEO-123 · P4 · Preview · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-123/p4-preview-private-publishing-pipeline>)
* [LEO-124 · P5 · Publish · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-124/p5-publish-private-publishing-pipeline>)
* [LEO-125 · P6 · Deliver · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-125/p6-deliver-private-publishing-pipeline>)
* [LEO-126 · P7 · Revise/remove · Private publishing pipeline](<https://linear.app/leochai/issue/LEO-126/p7-reviseremove-private-publishing-pipeline>)
* [LEO-127 · P · Private kimaki extension, draft storage and restricted publisher](<https://linear.app/leochai/issue/LEO-127/p-private-kimaki-extension-draft-storage-and-restricted-publisher>)

## User-flow acceptance specs (§12)

* **F9 · Publish dinner:** private Discord photos/text → draft → private preview → one Publish click → verified article link. No terminal/Markdown editing.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Decision & build steps (2026-09-11)

**Decision (D5 — publishing backend, Python):**

* pyvips (`pip install "pyvips[binary]"`) in a bounded RQ worker: decode/limit-check → EXIF orientation + ICC normalize to sRGB → strip ALL metadata (tested `keep=0`) → sizes 320/640/960/1280/1600 from source → WebP + JPEG fallback → reopen-verify → publish set + manifest (content-addressed filenames).
* One rendering/sanitization boundary: markdown-it-py with raw HTML disabled (js-default preset) → nh3 with explicit allowlist (img src constrained to generated asset namespace; explicit heading IDs preserved) → one controlled HTML insertion boundary: sanitized article HTML inserted as HTML (not double-escaped); surrounding text/metadata escaped; published content is data, never evaluated as Eleventy/template code.
* sharp/rehype-sanitize rejected — backend is Python; no duplicate Node pipeline. Publisher credentials repo-scoped, separate from inference keys. Docs in `services/site-publisher/README.md` before unattended publishing.

**Build steps (in order):**

1. LEO-127 — private kimaki extension seam, draft storage, restricted publisher foundations.
2. LEO-120 — P1 capture; 3. LEO-121 — P2 ingest (pyvips pipeline lives here); 4. LEO-122 — P3 compose (markdown-it-py + nh3 lives here); 5. LEO-123 — P4 preview; 6. LEO-124 — P5 publish (hash-bound); 7. LEO-125 — P6 deliver; 8. LEO-126 — P7 revise/remove. Each P-step depends on the previous.

## Comments

No comments returned by Linear.
