# S2 · Existing Jellyfin authentication and library

- Identifier: LEO-111
- Linear: https://linear.app/leochai/issue/LEO-111/s2-existing-jellyfin-authentication-and-library
- Status: Backlog
- Priority: No priority
- Estimate: None
- Labels: day-90
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: LEO-69
- Sub-issues: None
- Blocks: None
- Blocked by: LEO-57, LEO-59
- Related: None
- Created: 2026-09-10T22:30:06.683Z
- Updated: 2026-09-11T02:26:16.898Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

Existing Jellyfin sign-in/library outside website

### Visitor understands

Media stays in existing service

### Actions → destinations

Existing NAS instance over Tailscale; Jellyfin authentication retained

Private NAS `/owner/`, separate origin outside site/, over Tailscale only.

### Constraints and failure behavior (copied specification)

No `/secret` page, shortcut, client password, token, library metadata, media thumbnail, private inventory in `site/`, RSS, sitemap, JS, or public repo. Obscurity is not authorization. Reuse Jellyfin; no reinstall or new public media port. Owner access failure stays private, never bypassed through public demo API.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* F10: Tailscale → private launchpad → existing Jellyfin sign-in; no public-site payload.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
