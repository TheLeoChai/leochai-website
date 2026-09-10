# Backend demo services

Live, testable demos of Leo's side projects, reachable from the main site. One folder per service, each independently deployable.

## Hosting decision (made 2026-09)

**This NAS (kawaiinas) + Caddy + DDNS on Cloudflare.** Public entrypoint is
`https://api.leochai.com` — DNS-only A record managed by DDNS, terminated by a
Caddy container with auto-Let's-Encrypt TLS, which routes to per-service
containers. Runpod stays available for GPU-flavored demos; the kimaki tunnel
(traforo) is for ad-hoc dev previews, not for hosted demos.

Full infrastructure inventory (DNS records, containers, DDNS notes, known
gaps): [`docs/infra.md`](../docs/infra.md).

## Status

- **Personal API** — live at https://api.leochai.com (FastAPI, `/docs` open,
  `GET/POST /api/posts`), backed by postgres + redis + worker containers.
  Source not yet in a repo — see gaps in `docs/infra.md`. No `services/`
  folder exists for it yet.

## Conventions

- Folder per service: `services/<name>/`
- Each service README must state: what it demos, how to run locally, where it's hosted, public URL
- The main site (`site/`) links to each live demo
