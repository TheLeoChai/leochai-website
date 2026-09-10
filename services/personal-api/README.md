# personal-api

Live content API for leochai.com — serves posts and photo albums to the site,
plus a run log. This is the backend currently running on the NAS behind
`https://api.leochai.com`.

**Code repo: [TheLeoChai/personal-api](https://github.com/TheLeoChai/personal-api)**
— source recovered from the live container (2026-09-10); that repo holds the
code, dev compose, prod-stack reference, and deploy runbook. This folder
keeps the contract snapshot + entry for the site's services list.

## What it demos

A personal content API: markdown posts (CRUD, slug-addressed), photo albums
with photos, and a run endpoint. Write endpoints require bearer auth;
reads are open.

## Public URL

- Base: **https://api.leochai.com**
- Interactive docs: https://api.leochai.com/docs (OpenAPI 3.1)
- Contract snapshot: [`openapi.json`](./openapi.json) (captured 2026-09-10)

Known surface: `GET/POST /api/posts`, `GET/PUT/DELETE /api/posts/{slug}`,
`GET/POST /api/albums`, `POST /api/albums/{album_id}/photos`, `POST /api/run`.

## Where it's hosted

NAS (kawaiinas) Docker stack: Caddy (TLS for `api.leochai.com`) →
`uvicorn app.main:app :8081` (FastAPI) + postgres (`personal` db) + redis +
worker. Full stack details: [`../../docs/infra.md`](../../docs/infra.md).

## How to run locally

⚠️ **Not possible yet — the source is not in any repo.** The code lives
inside the root-only Docker stack. To recover it (needs root/docker access):

```bash
docker cp <personal-api-container>:/app ./services/personal-api/src
```

Then move the source into this folder, commit it, and develop here with
`uvicorn` + a local postgres. Until then, this folder holds only the API
contract so frontend work can proceed against the live URL.

## Deploy

Rebuild the container from this folder's source once recovered; keep Caddy
routing unchanged. Update `docs/infra.md` when that happens.
