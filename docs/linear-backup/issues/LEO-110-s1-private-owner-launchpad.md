# S1 · Private owner launchpad

- Identifier: LEO-110
- Linear: https://linear.app/leochai/issue/LEO-110/s1-private-owner-launchpad
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
- Blocked by: LEO-59, LEO-57
- Related: None
- Created: 2026-09-10T22:29:59.909Z
- Updated: 2026-09-11T02:26:21.468Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

### What appears

Private NAS launchpad: Jellyfin, draft previews, demo status/budgets

### Visitor understands

Leo's workspace, not portfolio content

### Actions → destinations

Authenticated links → existing services

Private NAS `/owner/`, separate origin outside site/, over Tailscale only.

### Constraints and failure behavior (copied specification)

No `/secret` page, shortcut, client password, token, library metadata, media thumbnail, private inventory in `site/`, RSS, sitemap, JS, or public repo. Obscurity is not authorization. Reuse Jellyfin; no reinstall or new public media port. Owner access failure stays private, never bypassed through public demo API.

### Acceptance criteria

* **Publisher/privacy:** wrong author/stale Publish rejected; duplicate events yield one draft; malformed media/Markdown cannot execute scripts; deployment recoverable; no originals/drafts/secrets/Jellyfin/private text in public output/history. Published content hash verified.
* F10: Tailscale → private launchpad → existing Jellyfin sign-in; no public-site payload.

Specification: revised 2026-09-10, `tasks/site-v2-storyboard.md`; requirements are reproduced here so this issue can be implemented from Linear.

## Comments

No comments returned by Linear.
