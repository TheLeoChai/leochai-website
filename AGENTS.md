# Agent instructions

Personal website for Leo Chai. Live at https://leochai.com (frontend on GitHub Pages).

## Structure

- `site/` — static frontend only. **No server-side runtime is possible here**: GitHub Pages serves static files. No Node/Python servers, no APIs.
- `services/<project-name>/` — one self-contained folder per backend demo. Each has its own README stating: what it demos, how to run it locally, where it is hosted, and its public URL (if live).
- `tasks/` — markdown task specs for kimaki scheduled/delegated sessions.

## Deploy

- Frontend: `./scripts/publish.sh` (copies `site/` to the `gh-pages` branch; Pages builds it directly).
- Preview URL: https://theleochai.github.io/leochai-website/
- Do NOT use GitHub Actions: the account is currently locked for Actions due to a billing issue (owner must resolve at github.com/settings/billing). Revisit after that's fixed.
- Custom domain `leochai.com` is still bound to the old repo `TheLeoChai.github.io`. Cutover steps are in `README.md`. Don't touch the old repo without asking Leo.

## Rules

- Never commit secrets (`.env`, API keys, tokens). Keep a `.env.example` instead.
- Never force-push `main` or `gh-pages`.
- The Pages domain is `leochai.com` (CNAME in `site/CNAME` + Pages settings). Don't remove it.
- Backend hosting decisions (NAS tunnel vs cloud) must be recorded in `services/README.md` before building on them.
- When adding a new demo service, also add a card/link for it in `site/` so visitors can actually reach and test it.
