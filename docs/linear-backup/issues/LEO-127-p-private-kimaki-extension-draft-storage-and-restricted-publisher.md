# P · Private kimaki extension, draft storage and restricted publisher

- Identifier: LEO-127
- Linear: https://linear.app/leochai/issue/LEO-127/p-private-kimaki-extension-draft-storage-and-restricted-publisher
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Publishing pipeline
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-57
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-56, LEO-48
- Related: None
- Created: 2026-09-10T22:31:33.363Z
- Updated: 2026-09-11T02:25:29.282Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

### Discord → kimaki → static post publishing

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

| Step | Owner experience | Backend action / failure |
| -- | -- | -- |
| P1 · Capture | Photos/text in one thread; `/post draft` selects it | Accept configured guild/channel and Leo's user ID only; ignore bots/unrelated history. Thread/message IDs form idempotency key. |
| P2 · Ingest | Acknowledgement and missing-field list | Copy attachments promptly to private staging, not expiring Discord CDN links. ≤10 raster photos, ≤10 MB each, ≤50 MB total. Decode/re-encode, strip EXIF/GPS, generate responsive sizes. Reject invalid/oversized media clearly. |
| P3 · Compose | Leo's wording retained; optional `/post polish` | Private Postgres draft; RQ generates Markdown/front matter. First line defaults title; collision-safe stable slug; photo order retained. Zero LLM required. Optional cleanup is one bounded free call; cannot invent quantities, times, opinions, captions, facts. Show edits and original. |
| P4 · Preview | Private rendered preview, image order, title/category/language, Publish button | Preview on private owner service, never public Pages. Missing recipe details remain questions, not guesses. Surface missing alt text. Message edits create a new draft revision. |
| P5 · Publish | One click publishes exactly previewed revision | Callback rechecks owner and draft hash. Stale approval returns new preview. Restricted publisher writes approved content/assets in isolated checkout, runs pinned generator with raw HTML disabled/sanitized, validates routes/links/feeds/assets, commits content. Text is data, never a shell command or agent instruction. |
| P6 · Deliver | Public URL after verified publication | Serialize publishing with one lock; fetch first; update content/main then `./scripts/publish.sh`. No unrelated overwrite or force-push. Build/conflict/push failure retains draft and last good site. Persist commit/hash; reconcile ambiguous pushes before retry. Verify deployed article hash before “Published.” |
| P7 · Revise/remove | `/post update` or `/post unpublish` previews change | Revision/date and feed/index rebuild. Removal needs its own owner action; cannot promise removal from Git history or external caches. Private material belongs in neither public files nor public history. |

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Verify the existing extension seam, private route authorization and isolation before unattended publishing; no public request can enqueue publishing.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
