# NAS infrastructure (kawaiinas)

Verified 2026-09-10 from live reads: Cloudflare DNS API, external HTTPS probes,
and process inspection on the NAS itself.

The NAS hosts the public backend for leochai.com. Everything below runs on the
same box (`kawaiinas`, LAN `192.168.2.20`, Tailscale `100.97.57.4`).

## Public hostnames

```
Internet ──> Cloudflare DNS
              ├─ api.leochai.com   A → NAS public IP   (DNS-only, DDNS-managed)
              │    └─ vpn.leochai.com CNAME → api.leochai.com (OpenVPN endpoint)
              ├─ leochai.com       A → GitHub Pages    (proxied)
              └─ www.leochai.com   CNAME → theleochai.github.io (proxied)

https://api.leochai.com  :443  ──> NAS ──> Caddy container ──> Personal API (FastAPI)
                                       (auto Let's Encrypt TLS)
```

### DNS records on Cloudflare (zone `leochai.com`)

| Record | Type | Target | Proxy | Notes |
|---|---|---|---|---|
| `api.leochai.com` | A | `142.188.246.243` | no | NAS public IP, updated by DDNS. Last changed 2026-09-03 |
| `vpn.leochai.com` | CNAME | `api.leochai.com` | no | OpenVPN endpoint; follows the DDNS-managed API record. Added 2026-07-14 |
| `leochai.com` | A | `185.199.108–111.153` | yes | GitHub Pages apex (4 records) |
| `www.leochai.com` | CNAME | `theleochai.github.io` | yes | GitHub Pages |
| `nas.leochai.com` | A | `173.33.99.249` | no | **STALE** — old public IP, last touched 2025-10-21 |
| `proxy.leochai.com` | A | `184.145.4.143` | yes | **STALE?** — old public IP from 2025-10-15, purpose unclear |
| `_domainconnect` | CNAME | `domains.squarespace.com` | yes | Registrar integration |
| apex | MX ×5 | Google Workspace | no | `aspmx.l.google.com` + alts |
| apex | TXT | `v=spf1 include:_spf.google.com ~all` | no | SPF |
| `google._domainkey` | TXT | RSA key | no | DKIM |

> **Stale records:** `nas.leochai.com` and `proxy.leochai.com` point at old
> public IPs (the NAS IP has changed at least once since October 2025 — it was
> `173.33.99.249` / `184.145.4.143`, now `142.188.246.243`). Only
> `api.leochai.com` is DDNS-managed. Decide: delete these, or repoint them at
> `api.leochai.com`.

## DDNS

- `api.leochai.com` tracks the NAS's changing home IP and is **currently
  correct**: the record matches the IP the NAS itself reports today
  (`curl ifconfig.me` → `142.188.246.243`).
- The updater mechanism is **not visible to the `kimaki` user**: no crontab
  entries, no ddclient/cloudflare process on the host. It is either the UGOS
  built-in DDNS client or a root-owned container.
- To inspect/confirm: UGOS Control Panel → external access / DDNS, or
  `docker ps` as root.
- `vpn.leochai.com` rides on the same record via CNAME, so OpenVPN keeps
  working across IP changes automatically.

## Caddy (reverse proxy + TLS)

- Runs as Docker container `caddy` (`caddy run --config /etc/caddy/Caddyfile`).
- Terminates TLS for `api.leochai.com` with an auto-renewed Let's Encrypt
  cert (verified live: valid until 2026-11-15, issuer LE, HTTP/2).
- The Caddyfile itself lives inside the container mount and is root-only from
  the `kimaki` user. Inspect with: `docker exec <caddy-container> cat /etc/caddy/Caddyfile`.

## Running containers (verified via /proc, 2026-09-10)

| Container | Image/process | Role |
|---|---|---|
| `caddy` | caddy | Reverse proxy + auto-TLS for `api.leochai.com` |
| personal-api | python3.11, `uvicorn app.main:app :8081` | FastAPI "Personal API" v0.1.0 — routes `GET/POST /api/posts`, `/docs`; fronted by Caddy |
| postgres | postgres | Database `personal` (user `personal`) backing the API |
| redis | redis :6379 | Cache/queue for the API stack |
| worker | `python worker.py` | Background worker for the API stack |
| second uvicorn | python3.12, `uvicorn main:app :8000` | Unknown service; not exposed publicly (probe: 404 via Caddy) — needs owner confirmation |
| openvpn-as | OpenVPN Access Server | VPN endpoint via `vpn.leochai.com` |
| jellyfin | jellyfin | Media server (no domain) |

## Known gaps

- **Personal API source code is not in any local git repo.** The four project
  repos under `/volume1/projects/` (ai-society, job-agent, leochai-website,
  leos-opencode) contain nothing matching `app.main` / the API routes. The
  source is inside the container image or a root-only build directory. It
  should be moved into a repo under `/volume1/projects/` so it is versioned.
- **Docker is root-only** on this NAS. The `kimaki` user cannot run
  `docker ps`/`docker exec` or read `/volume1/docker` compose files. Anything
  container-level needs root, or docker group membership for `kimaki`.
- The second uvicorn (`:8000`) has no known purpose.

## How this was verified (reproduce)

```bash
# current public IP as seen from the NAS
curl -s ifconfig.me

# DNS records (Cloudflare MCP): zone leochai.com, list dns_records

# live TLS + backend through the public name, hitting the LAN IP directly
curl -sv --resolve api.leochai.com:443:192.168.2.20 https://api.leochai.com/docs

# container inventory without docker access
for p in /proc/[0-9]*/cgroup; do grep -o 'docker-[0-9a-f]*' "$p" 2>/dev/null; done | sort -u
```
