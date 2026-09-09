# leochai.com

Personal website for Leo Chai — portfolio frontend on GitHub Pages, plus live, testable demos of side projects behind a hosted backend.

## Layout

```
site/            Static frontend — source of truth, published to gh-pages branch
services/        Backend demo services, one folder per project
tasks/           Task specs for scheduled / delegated agent work
scripts/         Helper scripts (publish.sh deploys the site)
```

## Deploy (frontend)

`site/` is published to the `gh-pages` branch, which GitHub Pages builds directly (legacy branch build — **not** GitHub Actions; the account is currently blocked from running Actions by a billing issue):

```bash
./scripts/publish.sh
```

Preview URL: https://theleochai.github.io/leochai-website/

### Custom domain (pending cutover)

`leochai.com` / `www.leochai.com` is currently bound to the old repo `TheLeoChai.github.io` (DNS on Cloudflare, proxied). To point the domain at this repo:

1. Remove the custom domain from `TheLeoChai.github.io` Pages settings
2. Set `www.leochai.com` as the custom domain on this repo's Pages settings
3. In Cloudflare, point DNS at this repo (CNAME `www` → `TheLeoChai.github.io`, apex → the same via Cloudflare flattening)
4. Update `site/CNAME`

## Backend demos

Each side project gets a folder under `services/` with its own README, runtime, and deployment notes. See `services/README.md` for the hosting plan.
