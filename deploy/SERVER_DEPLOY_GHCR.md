# Deploy mtrucklending from GHCR

## Server path

`/root/apps/mtrucklending`

## One-time setup

```bash
mkdir -p /root/apps/mtrucklending
cd /root/apps/mtrucklending

git clone https://github.com/Makmillerme/mtrucklending.git .
# or: git pull if already cloned

cat > .env << 'EOF'
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="EuroTruck <noreply@example.com>"
# CTA_RECEIVER_EMAIL=sales@example.com
EOF

# Private GHCR package — one-time login with PAT (read:packages)
docker login ghcr.io
```

## Run / update

```bash
cd /root/apps/mtrucklending

git pull
docker compose -f docker-compose.server.yml pull
docker compose -f docker-compose.server.yml up -d
```

App listens on host **3002** → container 3000.

Image: `ghcr.io/makmillerme/mtrucklending:latest` (built on push to `main`).

## Nginx (optional)

Proxy your domain to `http://127.0.0.1:3002`.
