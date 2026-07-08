#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/root/apps/mtrucklending}"
REPO_URL="${REPO_URL:-https://github.com/Makmillerme/mtruck-lending.git}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.server.yml}"

log() {
  printf '[deploy] %s\n' "$*"
}

cleanup_legacy() {
  log "Stopping legacy containers/images if present"
  docker stop mtrucklending 2>/dev/null || true
  docker rm mtrucklending 2>/dev/null || true
  docker rmi mtrucklending:local 2>/dev/null || true
}

ensure_repo() {
  if [ ! -d "${APP_DIR}/.git" ]; then
    log "Cloning repository into ${APP_DIR}"
    rm -rf "${APP_DIR}"
    mkdir -p "${APP_DIR}"
    git clone "${REPO_URL}" "${APP_DIR}"
  fi
}

deploy() {
  cd "${APP_DIR}"
  log "Updating repository"
  git pull --ff-only

  if [ ! -f .env ]; then
    log "Missing .env — copy from .env.example and fill SMTP + REVIEWS_ADMIN_PASSWORD"
    cp .env.example .env
    exit 1
  fi

  if ! grep -qE '^[[:space:]]*REVIEWS_ADMIN_PASSWORD=' .env; then
    log "ERROR: REVIEWS_ADMIN_PASSWORD is missing in .env — admin login at /admin/reviews will fail (HTTP 503)"
    log "Add: REVIEWS_ADMIN_PASSWORD=your-password-min-8-chars"
    exit 1
  fi

  ADMIN_PASS_RAW="$(grep -E '^[[:space:]]*REVIEWS_ADMIN_PASSWORD=' .env | head -n1 | cut -d= -f2-)"
  ADMIN_PASS_STRIPPED="${ADMIN_PASS_RAW%\"}"
  ADMIN_PASS_STRIPPED="${ADMIN_PASS_STRIPPED#\"}"
  ADMIN_PASS_STRIPPED="${ADMIN_PASS_STRIPPED%\'}"
  ADMIN_PASS_STRIPPED="${ADMIN_PASS_STRIPPED#\'}"
  ADMIN_PASS_STRIPPED="$(printf '%s' "${ADMIN_PASS_STRIPPED}" | tr -d '\r' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  if [ "${#ADMIN_PASS_STRIPPED}" -lt 8 ]; then
    log "ERROR: REVIEWS_ADMIN_PASSWORD must be at least 8 characters"
    exit 1
  fi

  mkdir -p data

  log "Pulling image and starting container"
  docker compose -f "${COMPOSE_FILE}" pull
  docker compose -f "${COMPOSE_FILE}" up -d
  docker compose -f "${COMPOSE_FILE}" ps
}

cleanup_legacy
ensure_repo
deploy
log "Done. App should be on http://127.0.0.1:3002"
