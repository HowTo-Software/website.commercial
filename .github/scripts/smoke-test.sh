#!/usr/bin/env bash
# Smoke-tests a running site. Usage: smoke-test.sh http://host:port
set -euo pipefail

BASE_URL="${1:?usage: smoke-test.sh <base-url>}"
BASE_URL="${BASE_URL%/}"
ATTEMPTS="${SMOKE_ATTEMPTS:-30}"

for i in $(seq 1 "$ATTEMPTS"); do
  if curl -fs -o /dev/null --max-time 5 "$BASE_URL/"; then
    break
  fi
  if [[ "$i" -eq "$ATTEMPTS" ]]; then
    echo "::error::$BASE_URL/ did not respond after $ATTEMPTS attempts"
    exit 1
  fi
  sleep 2
done

check() {
  local path="$1" expected="$2" body
  body="$(curl -fsS --max-time 10 "$BASE_URL$path")"
  if ! grep -qF -- "$expected" <<< "$body"; then
    echo "::error::$path did not contain '$expected'"
    exit 1
  fi
  echo "OK  GET $path"
}

check "/" "blazor.web.js"
check "/css/app.css" "{"
check "/_framework/blazor.web.js" "Blazor"

# Interactive Server rendering depends on the SignalR circuit endpoint.
negotiate="$(curl -fsS --max-time 10 -X POST "$BASE_URL/_blazor/negotiate?negotiateVersion=1")"
if ! grep -qF '"connectionToken"' <<< "$negotiate"; then
  echo "::error::/_blazor/negotiate did not return a connection token"
  exit 1
fi
echo "OK  POST /_blazor/negotiate"

# Retain the four active projects without reintroducing removed clients or an empty filter.
portfolio="$(curl -fsS --max-time 10 "$BASE_URL/")"
for project_id in 01 02 03 05; do
  if ! grep -qF -- "data-project-id=\"$project_id\"" <<< "$portfolio"; then
    echo "::error::Active portfolio project $project_id is missing"
    exit 1
  fi
done
for removed in 'Unorthodox Ways' 'unorthodox-ways' 'Legacy Asset Group' 'legacy-asset-group' 'data-project-filter="community"'; do
  if grep -qiF -- "$removed" <<< "$portfolio"; then
    echo "::error::Removed portfolio content or empty category is still rendered"
    exit 1
  fi
done
if [[ "$(curl -sS --max-time 10 -o /dev/null -w '%{http_code}' "$BASE_URL/images/project-unorthodox-ways.webp")" != "404" ]]; then
  echo "::error::Removed portfolio screenshot is still served"
  exit 1
fi
echo "OK  Active portfolio projects and removal checks"

echo "Smoke test passed for $BASE_URL"
