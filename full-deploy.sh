#!/bin/bash
set -euo pipefail

DOMAIN=${DOMAIN:-adaptiserv.fr}
WWW_DOMAIN=${WWW_DOMAIN:-www.${DOMAIN}}
EMAIL=${EMAIL:-contact@adaptiserv.fr}

echo "=== Adaptiserv - Full Deploy with SSL (${DOMAIN}) ==="

cd "$(dirname "$0")"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found"
  exit 1
fi

echo "Checking disk space before"
df -h / | grep -E "(Avail|Available|Filesystem)" | cat

echo "Stopping and cleaning previous stack"
docker compose down --remove-orphans || true
docker container prune -f || true
docker image prune -af || true
docker builder prune -f || true
if [ "${CLEAN_VOLUMES:-false}" = "true" ]; then docker volume prune -f || true; fi
rm -f certbot/.well-known/acme-challenge/test || true
rm -f nginx.conf.bak || true

mkdir -p certbot ssl

echo "Configuring nginx.conf for domain ${DOMAIN}..."
sed -i.bak "s/YOUR_DOMAIN/${DOMAIN}/g; s/YOUR_WWW_DOMAIN/${WWW_DOMAIN}/g" nginx.conf

echo "Building images..."
docker compose build web

echo "Starting web and nginx (HTTP only for challenge)..."
docker compose up -d web nginx

echo "Waiting for nginx port 80 to be ready..."
for i in {1..20}; do
  if curl -fsS http://$DOMAIN/.well-known/acme-challenge/test 2>/dev/null || curl -fsS http://localhost/.well-known/acme-challenge/test 2>/dev/null; then
    break
  fi
  sleep 2
done

echo "Placing webroot test file..."
mkdir -p certbot/.well-known/acme-challenge
echo "ok" > certbot/.well-known/acme-challenge/test

echo "Requesting certificates via webroot for ${DOMAIN}, ${WWW_DOMAIN}..."
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d ${DOMAIN} -d ${WWW_DOMAIN} --email ${EMAIL} --agree-tos --no-eff-email --non-interactive

echo "Reloading nginx with SSL..."
docker compose restart nginx

echo "Done. Visit: https://${DOMAIN}"

echo "Post-deploy cleanup"
rm -f certbot/.well-known/acme-challenge/test || true
docker image prune -f || true
docker builder prune -f || true
echo "Docker system usage"
docker system df | cat
echo "Disk space after"
df -h / | grep -E "(Used|Avail|Available|Filesystem)" | cat


