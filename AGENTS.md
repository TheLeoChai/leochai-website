# Agent instructions

Personal website for Leo Chai. Live at https://leochai.com (frontend on GitHub Pages).

## Structure

- `site/` — static frontend only. **No server-side runtime is possible here**: GitHub Pages serves static files. No Node/Python servers, no APIs.
- `services/<project-name>/` — one self-contained folder per backend demo. Each has its own README stating: what it demos, how to run it locally, where it is hosted, and its public URL (if live).
- `tasks/` — markdown task specs for kimaki scheduled/delegated sessions.

## Rules

- Never commit secrets (`.env`, API keys, tokens). Keep a `.env.example` instead.
- Frontend deploys automatically on push to `main` via `.github/workflows/deploy.yml`. Never force-push `main`.
- The Pages domain is `leochai.com` (CNAME in `site/CNAME` + Pages settings). Don't remove it.
- Backend hosting decisions (NAS tunnel vs cloud) must be recorded in `services/README.md` before building on them.
- When adding a new demo service, also add a card/link for it in `site/` so visitors can actually reach and test it.
