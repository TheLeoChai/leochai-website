# P2 · Ingest · Private publishing pipeline

- Identifier: LEO-121
- Linear: https://linear.app/leochai/issue/LEO-121/p2-ingest-private-publishing-pipeline
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Publishing pipeline
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-57
- Sub-issues: None
- Blocks: LEO-122
- Blocked by: LEO-120, LEO-48, LEO-56
- Related: None
- Created: 2026-09-10T22:31:01.585Z
- Updated: 2026-09-11T02:24:04.892Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Owner experience

Acknowledgement and missing-field list

### Backend action / failure

Copy attachments promptly to private staging, not expiring Discord CDN links. ≤10 raster photos, ≤10 MB each, ≤50 MB total. Decode/re-encode, strip EXIF/GPS, generate responsive sizes. Reject invalid/oversized media clearly.

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Implement the exact stage behavior, limits and failures above; F9: private Discord photos/text → draft → private preview → one Publish click → verified article link; no terminal/Markdown editing.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
