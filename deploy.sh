#!/bin/bash
# ============================================================
# deploy.sh — Vivoo Frontend Deployment Script
# Usage: ./deploy.sh [production|staging]
# ============================================================

set -euo pipefail

# ── Config ──────────────────────────────────────────────────
ENV=${1:-production}
APP_NAME="vivoo-frontend"
DOMAIN="vivooeye.com"
COMPOSE_FILE="docker-compose.yml"

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'

log()     { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*" >&2; exit 1; }
step()    { echo -e "\n${BOLD}══ $* ══${NC}"; }

# ── Checks ───────────────────────────────────────────────────
step "Pre-flight checks"

command -v docker  >/dev/null 2>&1 || error "Docker is not installed."
command -v docker  compose version >/dev/null 2>&1 || \
  command -v docker-compose >/dev/null 2>&1         || error "Docker Compose is not installed."

[[ -f ".env.production" ]] || error ".env.production not found. Copy .env.production.example and fill in values."

success "All checks passed."

# ── Load env ─────────────────────────────────────────────────
step "Loading environment"
export $(grep -v '^#' .env.production | xargs)
log "Environment: ${ENV}"
log "Domain:      ${DOMAIN}"

# ── Pull latest code ─────────────────────────────────────────
step "Pulling latest code"
git pull origin main
success "Code updated."

# ── Build & deploy ───────────────────────────────────────────
step "Building Docker image"
docker compose -f $COMPOSE_FILE --env-file .env.production build --no-cache vivoo-frontend
success "Image built."

step "Starting services"
docker compose -f $COMPOSE_FILE --env-file .env.production up -d --remove-orphans
success "Services started."

# ── Wait for health ──────────────────────────────────────────
step "Waiting for app to be healthy"
RETRIES=12
until docker inspect --format='{{.State.Health.Status}}' ${APP_NAME} 2>/dev/null | grep -q "healthy"; do
  if [[ $RETRIES -le 0 ]]; then
    warn "Health check timed out. Check logs: docker compose logs ${APP_NAME}"
    break
  fi
  log "Waiting... ($RETRIES retries left)"
  sleep 5
  RETRIES=$((RETRIES - 1))
done

# ── Cleanup old images ───────────────────────────────────────
step "Cleaning up old images"
docker image prune -f
success "Cleanup done."

# ── Summary ──────────────────────────────────────────────────
step "Deployment complete"
echo ""
echo -e "  ${GREEN}✔${NC}  App:     https://${DOMAIN}"
echo -e "  ${GREEN}✔${NC}  Status:  docker compose ps"
echo -e "  ${GREEN}✔${NC}  Logs:    docker compose logs -f ${APP_NAME}"
echo ""
