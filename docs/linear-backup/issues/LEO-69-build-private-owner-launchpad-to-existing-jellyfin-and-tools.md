# Build private owner launchpad to existing Jellyfin and tools

- Identifier: LEO-69
- Linear: https://linear.app/leochai/issue/LEO-69/build-private-owner-launchpad-to-existing-jellyfin-and-tools
- Status: Backlog
- Priority: Medium
- Estimate: None
- Labels: day-90
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-110, LEO-111
- Blocks: LEO-159, LEO-158, LEO-81, LEO-72, LEO-70
- Blocked by: LEO-59, LEO-57
- Related: None
- Created: 2026-09-10T20:24:30.763Z
- Updated: 2026-09-11T02:22:33.375Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: S1–S2; P4 previews/status budgets; F10
Build order: M3, step 4 (relative day 90 target).

Create a separate private /owner/ launchpad linking existing Jellyfin sign-in, draft previews and demo status/budgets. Reuse existing services and authentication through owner-only access. Document access/recovery and verify no owner content becomes a public website dependency.

Key constraints

* Tailscale-only separate origin outside site/; keep Jellyfin authentication, no reinstall or new public media port.
* No /secret page, client-side password/token, media thumbnails, library metadata or private inventory in Pages, RSS, sitemap, JS, source maps or public repo.
* Zero model calls; owner access failure stays private and cannot bypass through public demo API.

Acceptance criteria (§14)

* §14 day 90 + check 7/F10: authenticated owner reaches existing Jellyfin and tools; unauthorized requests cannot read private payloads.
* Audit generated output and public history for secrets/drafts/originals/Jellyfin/private text; NAS failure leaves public Notes/story functional.

## Feature-section work breakdown

* [LEO-110 · S1 · Private owner launchpad](<https://linear.app/leochai/issue/LEO-110/s1-private-owner-launchpad>)
* [LEO-111 · S2 · Existing Jellyfin authentication and library](<https://linear.app/leochai/issue/LEO-111/s2-existing-jellyfin-authentication-and-library>)

## User-flow acceptance specs (§12)

* **F10 · Owner evening:** Tailscale → private launchpad → existing Jellyfin sign-in. No public-site payload.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-111 — S2 · Existing Jellyfin authentication and library
2. LEO-110 — S1 · Private owner launchpad

## Comments

No comments returned by Linear.
