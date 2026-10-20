# P1 · Capture · Private publishing pipeline

- Identifier: LEO-120
- Linear: https://linear.app/leochai/issue/LEO-120/p1-capture-private-publishing-pipeline
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-30
- Milestone: Publishing pipeline
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-57
- Sub-issues: None
- Blocks: LEO-121
- Blocked by: LEO-56, LEO-48
- Related: None
- Created: 2026-09-10T22:30:56.688Z
- Updated: 2026-09-11T02:25:36.260Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Owner experience

Photos/text in one thread; `/post draft` selects it

### Backend action / failure

Accept configured guild/channel and Leo's user ID only; ignore bots/unrelated history. Thread/message IDs form idempotency key.

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Implement the exact stage behavior, limits and failures above; F9: private Discord photos/text → draft → private preview → one Publish click → verified article link; no terminal/Markdown editing.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
