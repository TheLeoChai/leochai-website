# P7 · Revise/remove · Private publishing pipeline

- Identifier: LEO-126
- Linear: https://linear.app/leochai/issue/LEO-126/p7-reviseremove-private-publishing-pipeline
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
- Blocked by: LEO-125, LEO-56, LEO-48
- Related: None
- Created: 2026-09-10T22:31:28.713Z
- Updated: 2026-09-11T02:23:42.314Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### Owner experience

`/post update` or `/post unpublish` previews change

### Backend action / failure

Revision/date and feed/index rebuild. Removal needs its own owner action; cannot promise removal from Git history or external caches. Private material belongs in neither public files nor public history.

Extend **existing kimaki**, using a private channel such as `#site-drafts`. Add a narrow handler and authenticated internal FastAPI endpoints; do not operate another general-purpose bot or route messages into unrestricted coding-agent execution. Verify kimaki's extension seam during implementation; this handler is new work.

Reuse personal-api's Postgres/Redis/RQ infrastructure, but add **private** draft tables/routes, not publicly readable `/api/posts` or album reads. Published Markdown/media in Git are the public source of truth; API holds workflow receipts/drafts. Notes require no NAS reads after publication. Back up drafts, originals, receipts.

Publisher credentials are repo-scoped, separate from inference keys, unavailable to public workers/models. Fixed build commands operate on content only; uploads cannot alter templates, scripts, dependencies, or destinations. Document setup/recovery in `services/site-publisher/README.md` before unattended publishing. One preview/one click replaces manual Git work without publishing casual chatter automatically.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* Implement the exact stage behavior, limits and failures above; F9: private Discord photos/text → draft → private preview → one Publish click → verified article link; no terminal/Markdown editing.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
