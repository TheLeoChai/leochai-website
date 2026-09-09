# Backend demo services

Live, testable demos of Leo's side projects, reachable from the main site. One folder per service, each independently deployable.

## Status

Nothing deployed yet. Groundwork only.

## Hosting decision (to be made)

Options, in order of how this workspace is set up:

1. **This NAS (Synology) + kimaki tunnel (traforo)** — already running here; `kimaki tunnel -- pnpm dev` style wrapping gives public URLs. Zero extra cost, but NAS uptime = demo uptime.
2. **Runpod serverless / pods** — MCP tools are wired into this Discord; good for GPU-flavored demos. Pay per use.
3. **Cheap always-on host** (Fly.io, Railway, Hetzner) — most "production" feel, small monthly cost.

Pick one before the first service lands, and record the choice + public URL pattern here.

## Conventions

- Folder per service: `services/<name>/`
- Each service README must state: what it demos, how to run locally, where it's hosted, public URL
- The main site (`site/`) links to each live demo
