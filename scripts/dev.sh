#!/usr/bin/env bash
# Serve site/ locally for development preview.
# For a public URL run it through the kimaki tunnel (-p needed: http.server
# doesn't print a detectable localhost URL):
#   kimaki tunnel -p 8080 -- ./scripts/dev.sh
set -euo pipefail
cd "$(dirname "$0")/../site"
PORT="${1:-8080}"
exec python3 -m http.server "$PORT"
