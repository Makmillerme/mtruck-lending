# Deploy mtrucklending from GHCR

## Server path

`/root/apps/mtrucklending`

## Prerequisites

- Public repo: `https://github.com/Makmillerme/mtruck-lending`
- Public GHCR image: `ghcr.io/makmillerme/mtruck-lending:latest`
- No `docker login` required when the package is public

## One-time setup

```bash
mkdir -p /root/apps/mtrucklending
cd /root/apps/mtrucklending

git clone https://github.com/Makmillerme/mtruck-lending.git .

cp .env.example .env
# edit .env — SMTP, CTA_RECEIVER_EMAIL, REVIEWS_ADMIN_PASSWORD (min. 8 chars)

# Or sync secrets from your Windows machine (recommended — .env is gitignored):
# powershell -ExecutionPolicy Bypass -File deploy/sync-env-to-server.ps1

# Reviews are stored in data/site-reviews.json (mounted into the container).
# After git pull, ensure data/ exists; seed file is committed in the repo.
mkdir -p data
```

## Deploy / update

```bash
cd /root/apps/mtrucklending
bash deploy/server-deploy.sh
```

Manual equivalent:

```bash
git pull
docker compose -f docker-compose.server.yml pull
docker compose -f docker-compose.server.yml up -d
```

App listens on host **3002** → container 3000.

## Reviews (JSON)

- Public list: `GET /api/reviews`
- Admin UI: `/admin/reviews` (password from `REVIEWS_ADMIN_PASSWORD` in server `.env`)
- `REVIEWS_ADMIN_PASSWORD` is **required**; without it login returns HTTP 503
- Session cookie uses `COOKIE_SECURE=false` by default so login works over `http://IP:3002`
- Do **not** commit `.env` to git; sync with `deploy/sync-env-to-server.ps1` before/after deploy
- Persistence: host directory `./data` is mounted to `/app/data` in the container
- Edits from admin or new submissions update `data/site-reviews.json` on the server

## Public URL

This app is **not** `komerciyamtruck.duckdns.org` (that is a separate project on the same server).

Until you configure your own nginx vhost:

- On the server: `http://127.0.0.1:3002` (or the host’s public IP with port **3002** open)
- Local dev: `http://localhost:3000`

## Nginx (optional)

Proxy **your** Expert Travel domain to `http://127.0.0.1:3002` (do not reuse the komerciyamtruck vhost).

## Cleanup legacy partial deploy

```bash
docker stop mtrucklending 2>/dev/null || true
docker rm mtrucklending 2>/dev/null || true
docker rmi mtrucklending:local 2>/dev/null || true
rm -rf /root/apps/mtrucklending
```
