# Sync local .env to production server (secrets stay out of git).
# Usage from repo root:
#   powershell -ExecutionPolicy Bypass -File deploy/sync-env-to-server.ps1
#
# Optional:
#   -Server root@91.239.232.91
#   -RemoteDir /root/apps/mtrucklending

param(
  [string]$Server = "root@91.239.232.91",
  [string]$RemoteDir = "/root/apps/mtrucklending"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $root ".env"

if (-not (Test-Path $envPath)) {
  throw "Local .env not found at $envPath"
}

$raw = Get-Content -Raw -Path $envPath
if ($raw -notmatch '(?m)^\s*REVIEWS_ADMIN_PASSWORD\s*=') {
  throw "REVIEWS_ADMIN_PASSWORD is missing in local .env"
}

Write-Host "[sync-env] Uploading .env to ${Server}:${RemoteDir}/.env"
scp $envPath "${Server}:${RemoteDir}/.env"

Write-Host "[sync-env] Restarting container so env is reloaded"
ssh $Server "cd $RemoteDir && docker compose -f docker-compose.server.yml up -d --force-recreate"

Write-Host "[sync-env] Done. Test login at /admin/reviews"
