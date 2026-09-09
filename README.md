# leochai.com

Personal website for Leo Chai — portfolio frontend on GitHub Pages, plus live, testable demos of side projects behind a hosted backend.

## Layout

```
site/          Static frontend, deployed to GitHub Pages at leochai.com
services/      Backend demo services, one folder per project
tasks/         Task specs for scheduled / delegated agent work
.github/       CI: deploys site/ to GitHub Pages on push to main
```

## Deploy (frontend)

1. Edit anything under `site/`
2. `git push origin main`
3. GitHub Actions deploys `site/` to Pages → https://leochai.com

## Backend demos

Each side project gets a folder under `services/` with its own README, runtime, and deployment notes. See `services/README.md` for the hosting plan.
