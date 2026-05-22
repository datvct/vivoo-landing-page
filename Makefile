# ============================================================
# Makefile — vivoo-frontend
# ============================================================
.PHONY: help build up down restart logs ps clean ssl-init ssl-renew deploy

COMPOSE        = docker compose
COMPOSE_FILE   = docker-compose.yml
ENV_FILE       = .env.production
APP            = vivoo-frontend
DOMAIN         = vivooeye.com

# ── Default target ───────────────────────────────────────────
help: ## Show this help message
	@echo ""
	@echo "  Vivoo Frontend — Docker Commands"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ── Build ────────────────────────────────────────────────────
build: ## Build Docker image (no cache)
	$(COMPOSE) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build --no-cache $(APP)

build-cache: ## Build Docker image (with cache)
	$(COMPOSE) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build $(APP)

# ── Lifecycle ────────────────────────────────────────────────
up: ## Start all services in background
	$(COMPOSE) -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d --remove-orphans

down: ## Stop and remove containers
	$(COMPOSE) -f $(COMPOSE_FILE) down

restart: ## Restart app container
	$(COMPOSE) -f $(COMPOSE_FILE) restart $(APP)

# ── Logs ─────────────────────────────────────────────────────
logs: ## Tail logs of all services
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f

logs-app: ## Tail logs of app only
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f $(APP)

logs-nginx: ## Tail Nginx logs
	$(COMPOSE) -f $(COMPOSE_FILE) logs -f nginx

# ── Status ───────────────────────────────────────────────────
ps: ## Show running containers
	$(COMPOSE) -f $(COMPOSE_FILE) ps

# ── Shell ────────────────────────────────────────────────────
shell: ## Open shell in app container
	$(COMPOSE) -f $(COMPOSE_FILE) exec $(APP) sh

shell-nginx: ## Open shell in nginx container
	$(COMPOSE) -f $(COMPOSE_FILE) exec nginx sh

# ── PM2 ─────────────────────────────────────────────────────
pm2-status: ## PM2 process list inside container
	$(COMPOSE) -f $(COMPOSE_FILE) exec $(APP) pm2 list

pm2-logs: ## PM2 logs inside container
	$(COMPOSE) -f $(COMPOSE_FILE) exec $(APP) pm2 logs

pm2-reload: ## Gracefully reload app with PM2
	$(COMPOSE) -f $(COMPOSE_FILE) exec $(APP) pm2 reload all

# ── SSL (Let's Encrypt) ──────────────────────────────────────
ssl-init: ## Issue SSL certificate for domain (first time)
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm certbot certonly \
		--webroot --webroot-path=/var/www/certbot \
		--email admin@$(DOMAIN) \
		--agree-tos --no-eff-email \
		-d $(DOMAIN) -d www.$(DOMAIN)
	$(COMPOSE) -f $(COMPOSE_FILE) restart nginx

ssl-renew: ## Renew SSL certificates
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm certbot renew
	$(COMPOSE) -f $(COMPOSE_FILE) exec nginx nginx -s reload

ssl-test: ## Test SSL renewal (dry run)
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm certbot renew --dry-run

# ── Deploy ───────────────────────────────────────────────────
deploy: ## Full deployment (pull → build → up)
	chmod +x deploy.sh && bash deploy.sh production

# ── Cleanup ──────────────────────────────────────────────────
clean: ## Remove stopped containers and unused images
	$(COMPOSE) -f $(COMPOSE_FILE) down --remove-orphans
	docker image prune -f
	docker volume prune -f

clean-all: ## Full cleanup including volumes (⚠ destructive)
	$(COMPOSE) -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -af
