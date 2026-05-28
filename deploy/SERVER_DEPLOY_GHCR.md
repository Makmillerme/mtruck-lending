# Deploy mtrucklending from GHCR

## Server path

`/root/apps/mtrucklending`

## Prerequisites

- Public repo: `https://github.com/Makmillerme/mtrucklending`
- Public GHCR image: `ghcr.io/makmillerme/mtrucklending:latest`
- No `docker login` required when the package is public

## One-time setup

```bash
mkdir -p /root/apps/mtrucklending
cd /root/apps/mtrucklending

git clone https://github.com/Makmillerme/mtrucklending.git .

cp .env.example .env
# edit .env — SMTP settings for contact form
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

## Nginx (optional)

Proxy your domain to `http://127.0.0.1:3002`.

## Cleanup legacy partial deploy

```bash
docker stop mtrucklending 2>/dev/null || true
docker rm mtrucklending 2>/dev/null || true
docker rmi mtrucklending:local 2>/dev/null || true
rm -rf /root/apps/mtrucklending
```
