#!/usr/bin/env bash
# Build and validate, then serve the generated production-base site.
# Public preview: kimaki tunnel -p 8080 -- ./scripts/dev.sh
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.mjs
exec python3 -m http.server "${1:-8080}" --directory site
