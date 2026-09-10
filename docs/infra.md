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

> **Stale records (deleted 2026-09-10):** `nas.leochai.com` and
> `proxy.leochai.com` pointed at old public IPs and were removed from
> Cloudflare. Only `api.leochai.com` is DDNS-managed.

## DDNS

- `api.leochai.com` tracks the NAS's changing home IP and is **currently
  correct**: the record matches the IP the NAS itself reports today
  (`curl ifconfig.me` → `142.188.246.243`).
- **Updater identity (updated 2026-09-10):** the compose project defines two
  `oznu/cloudflare-ddns` containers (`cf-ddns-api`, `cf-ddns-nas`) but both
  have been dead (`Exited 1`) for ~10 months. The record was still updated
  2026-09-03, so the working updater is something else — most likely the
  UGOS built-in DDNS. Unconfirmed; works as of today.
- `vpn.leochai.com` rides on the same record via CNAME, so OpenVPN keeps
  working across IP changes automatically.

## Caddy (reverse proxy + TLS)

- Runs as Docker container `caddy` (`caddy run --config /etc/caddy/Caddyfile`).
- Terminates TLS for `api.leochai.com` with an auto-renewed Let's Encrypt
  cert (verified live: valid until 2026-11-15, issuer LE, HTTP/2).
- The Caddyfile itself lives inside the container mount and is root-only from
  the `kimaki` user. Inspect with: `docker exec <caddy-container> cat /etc/caddy/Caddyfile`.

## OpenVPN Access Server (VPN)

Container `openvpn-as` runs an OpenVPN Access Server, UGOS-integrated (portal
redirect carries `?os=ugospro`).

- **Hostname:** `vpn.leochai.com` — a CNAME to `api.leochai.com`, so it rides
  on the DDNS-managed record and survives IP changes.
- **Client portal:** port `943/tcp` (`https://vpn.leochai.com:943`) — login,
  download profile, or use the OpenVPN Connect app pointing at this host.
- **Admin UI:** `https://vpn.leochai.com:943/admin`
- **Tunnel:** OpenVPN AS default `1194/udp` (assumed; container config is
  root-only and OpenVPN silently drops probes, so the exact port/forward
  couldn't be verified externally).

### External reachability (check-host.net, 2026-09-10)

| Port | Result |
|---|---|
| `443/tcp` (Caddy / Personal API) | ✅ reachable (external node connected) — manual router forward |
| `943/tcp` (VPN portal) | ❌ **blocked** — 8/8 external nodes timed out |
| `1194/udp` (VPN tunnel) | ✅ **already mapped on the router** — UPnP `AddPortMapping` returned 718 `ConflictInMappingEntry`, i.e. the port is taken by an existing mapping. Tunnel likely reachable; unverifiable by probe (OpenVPN ignores packets) |
| `9443`, `9444`, `8443` | ❌ blocked externally (probed 2026-09-10) |

### UPnP on the router (2026-09-10)

- IGD is alive: `http://192.168.2.1:49152/.../WANPPPConn1`, external IP
  matches DDNS (`142.188.246.243`).
- Mapping table enumerates as **empty** — no live UPnP leases.
- Adding `943/tcp` via UPnP is **refused** with code 606 (*Action not
  authorized*) — the router restricts UPnP adds; 1194/udp returns 718
  (conflict → already mapped, presumably statically or by the NAS itself).
- **No UPnP/forward script exists on the NAS** (searched kimaki data, scripts,
  cron, `/volume1/general`). If one existed, it wasn't here.
- Consequence: `943` can only be opened via a **manual router forward**
  (router admin UI) or by proxying it through Caddy (see below).

**Consequence:** the VPN portal only works from inside the LAN or over
Tailscale. To make the portal usable from outside: forward `943/tcp` on the
router to `192.168.2.20`, **or** add a Caddy site `vpn.leochai.com` on 443
proxying to `192.168.2.20:943` (needs one root `docker exec` to edit the
Caddyfile — 443 is the only externally-open TLS port).

### How to connect

1. **From LAN / Tailscale:** open `https://192.168.2.20:943` (or
   `https://100.97.57.4:943`), sign in, install OpenVPN Connect or download
   the profile.
2. **From the internet:** first forward `943/tcp` + `1194/udp` on the router;
   then use `https://vpn.leochai.com:943` anywhere.



## Running containers (verified via docker, 2026-09-10)

All service containers belong to the Docker Compose project `server`, rooted
at `/home/mihu/Server` (root-owned). Source repo for the API:
[TheLeoChai/personal-api](https://github.com/TheLeoChai/personal-api),
prod-stack reference in its `docs/prod-stack.md`.

| Container | Image/process | Role |
|---|---|---|
| `server-caddy-1` | caddy | Reverse proxy + TLS (Cloudflare DNS-01) for `api.leochai.com`; serves `/media/*` from uploads; `:8443/xiaoesp/*` → nas-ingest |
| `server-app-1` | python3.12, `uvicorn main:app :8000` | **Personal API** (FastAPI) — fronted by Caddy on 443 |
| `server-worker-1` | `python worker.py` | RQ worker for the API's `/api/run` queue |
| `server-db-1` | postgres:16 | Database `personal` backing the API |
| `server-redis-1` | redis :6379 | RQ broker |
| `server-nas-ingest-1` | internal :8081 | Separate service ("xiaoesp"), only at `api.leochai.com:8443/xiaoesp/*` |
| `openvpn-as` | OpenVPN Access Server | VPN endpoint via `vpn.leochai.com` |
| `jellyfin-app-1` | jellyfin :8899 | Media server (no domain) |

**Access:** `kimaki` was added to the `docker` group (2026-09-10), so
container inspection/build no longer needs root. The compose project folder
`/home/mihu/Server` itself remains root-only.

## Known gaps

- ~~**Personal API source code is not in any local git repo.**~~
  **Resolved 2026-09-10:** source recovered from the container into
  [TheLeoChai/personal-api](https://github.com/TheLeoChai/personal-api)
  (local: `/volume1/projects/personal-api`) — contract, compose stack, schema
  and prod reference included.
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
