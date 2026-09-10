# Session learnings (kimaki on leochai-website)

## Docker build context must be kimaki-readable
Being in the docker group lets the daemon do anything, but the docker CLI still reads the build context path with host permissions — `docker build /home/mihu/Server/app` fails with "path not found" because that dir is root-only. Build from a kimaki-readable path (e.g. the repo) instead, or `cp` files into the root-owned context via an `alpine` mount-helper container.

## Recreating compose containers by hand: network aliases are load-bearing
Caddy resolves `http://app:8000` via the compose network alias, not the container name. A hand-run `docker run` must pass `--network server_default --network-alias app` (and `--network-alias worker`) or the site 502s. Carry env via a chmod-600 env-file from `docker inspect`, never echo it.

## Column defaults don't save explicit NULLs
SQLAlchemy sends explicit NULL for columns without `server_default`, which violates NOT NULL regardless of a Postgres column default. The prod `posts.updated_at` bug needed BOTH the model fix and `ALTER TABLE ... SET DEFAULT now()`.

## kimaki tunnel URLs rotate per session
Each `tuistory launch "kimaki tunnel -p 8080 -- ..."` gets a new random subdomain, so CORS allow-lists go stale. Fixed by adding `allow_origin_regex` for `*.kimaki.dev` in personal-api `src/main.py` — prefer regex over env list for dev origins.

## GH-pages preview is redirect-dead until domain cutover
`theleochai.github.io/leochai-website/` 301s to `www.leochai.com/leochai-website/` (old repo's user-site → 404). The kimaki tunnel is the only live preview of new FE work until `leochai.com` cutover happens.
