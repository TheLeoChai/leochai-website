#!/usr/bin/env bash
# Publish site/ to the gh-pages branch.
# GitHub Pages builds the gh-pages branch directly (legacy build) — no Actions required.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
WT="$ROOT/.gh-pages-tmp"

git -C "$ROOT" worktree add --detach "$WT" main >/dev/null
trap 'git -C "$ROOT" worktree remove --force "$WT"' EXIT

git -C "$WT" checkout --orphan gh-pages
git -C "$WT" rm -rfq .
cp -r "$ROOT/site/." "$WT/"
git -C "$WT" add -A
git -C "$WT" commit -qm "Publish site $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git -C "$WT" push origin gh-pages

echo "Published. Preview: https://theleochai.github.io/leochai-website/"
