#!/bin/bash
set -euo pipefail

echo "Building Docker image..."
docker compose build web

echo "Starting container..."
docker compose up -d web

echo "Waiting for app to be ready on http://localhost:3000 ..."
for i in {1..20}; do
  if curl -fsS http://localhost:3000 >/dev/null 2>&1; then
    echo "App is up."
    exit 0
  fi
  sleep 2
done

echo "App did not become ready in time"
docker compose logs --no-color web | tail -n 200
exit 1

