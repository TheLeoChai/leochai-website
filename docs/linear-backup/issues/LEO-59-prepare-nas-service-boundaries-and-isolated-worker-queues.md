# Prepare NAS service boundaries and isolated worker queues

- Identifier: LEO-59
- Linear: https://linear.app/leochai/issue/LEO-59/prepare-nas-service-boundaries-and-isolated-worker-queues
- Status: Backlog
- Priority: High
- Estimate: None
- Labels: day-60
- Milestone: Backend platform & budgets
- Assignee: None
- Creator: Leo Chai
- Parent: None
- Sub-issues: LEO-131, LEO-130
- Blocks: LEO-149, LEO-148, LEO-147, LEO-146, LEO-133, LEO-132, LEO-111, LEO-110, LEO-69, LEO-64, LEO-60
- Blocked by: LEO-58
- Related: None
- Created: 2026-09-10T20:23:44.370Z
- Updated: 2026-09-12T09:25:57.391Z
- Completed: None
- Due date: None
- Cycle: None
- Archived: None

## Description

## Town integration gate — 2026-09-12

LEO-165 owns actual NAS CPU/RAM/GPU and AI Society reuse/model-capacity audit before town backend/inference provisioning. Its supplied source evidence is not a deployment test. Keep existing NAS FastAPI/Postgres/Redis/RQ/Caddy/DDNS and static GitHub Pages; no migration/new capacity. LEO-144 owns durable shared world; in-memory AI Society world/memory is not already persistent. LEO-169 owns bounded public admission. Unrelated platform scopes below remain effective.

Storyboard: /volume1/projects/leochai-website/tasks/site-v2-storyboard.md
Scenes / scope: §11 architecture; T3/J4/L3/P1–P7/S1–S2 service boundaries
Build order: M2, step 1 (relative day 60 target).

Record each integration's existing NAS hosting decision in services/README.md before implementation and give each backend a self-contained service folder, runbook and public scene link. Configure the FastAPI/Postgres/Redis/RQ boundaries and separate world, jobs, leo and publish queues using the existing hosting stack. Inspect actual deployment state before reconciling infra documentation.

Key constraints

* Use existing NAS/Caddy/DDNS and [api.leochai.com](<http://api.leochai.com>); no new host, cloud GPU, paid always-on inference or backend runtime in site/.
* Public workers have no publisher/Git/Discord credentials, owner storage, personal candidate database or Docker socket; private publisher/launchpad stay Tailscale-only.
* Exact-origin CORS plus capabilities, validation and limits; no arbitrary URL proxy; no public OpenCode instance.

Acceptance criteria (§14)

* §14 day 60 + checks 2–3, 7: queue/credential isolation and public/private boundaries verified; NAS failure leaves Pages usable.
* Per-service READMEs record local run/hosting/public URL as applicable; docs/infra.md changes reflect inspected facts, not old conflicting notes.

## Feature-section work breakdown

* [LEO-130 · §11 · NAS architecture, service inventory and worker isolation](<https://linear.app/leochai/issue/LEO-130/11-nas-architecture-service-inventory-and-worker-isolation>)
* [LEO-131 · §11 · Demo data retention, logs and deployment documentation](<https://linear.app/leochai/issue/LEO-131/11-demo-data-retention-logs-and-deployment-documentation>)

## User-flow acceptance specs (§12)

* **F3 · Persistent-town visitor:** `/<lang>/work/tiny-world/#live` → readable poster → same authoritative persistent town → talk to an available Leo facet → observe permitted resulting actions. No episode creation/reset; conversation visibility awaits LEO-131.
* **F4 · Meet Leo:** H5 → authored L1/L2 → L3 question → citations → email when unsupported.
* **F8 · NAS/quota failure:** honest timestamped/static world or separately labeled Illustration, recorded pipeline, authored Leo FAQ with unavailable answer state, functional Notes/contact/animations.
* **F9 · Publish dinner:** private Discord photos/text → draft → private preview → one Publish click → verified article link. No terminal/Markdown editing.
* **F10 · Owner evening:** Tailscale → private launchpad → existing Jellyfin sign-in. No public-site payload.

Acceptance: exercise the applicable flow at this milestone, record the result and relevant failure behavior in the implementing child, and keep the authored/static baseline usable independently of later live activation. These sub-issues contain the full implementation requirements; this parent remains the feature rollup in its original milestone.

## Build steps (in order, 2026-09-11)

1. LEO-130 — §11 · NAS architecture, service inventory and worker isolation
2. LEO-131 — §11 · Demo data retention, logs and deployment documentation

Town acceptance: inspect reuse rather than add another architecture; public workers cannot access private files/kimaki history or privileged credentials. Process/Redis restart cannot lose durable town state or replenish inference reservations; LEO-144/135/132 own those contracts. No backend provisioning before LEO-165 closes; record inspected hosting/infra only in a later authorized implementation session.

## Comments

No comments returned by Linear.
