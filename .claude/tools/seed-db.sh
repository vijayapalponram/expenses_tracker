#!/usr/bin/env bash
# Seeds the database with a test admin and a test resident via the registration API.
# Requires the app to be running on BASE_URL (default: http://localhost:5000).

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5000}"
REGISTER="$BASE_URL/api/users/register"

register() {
  local LABEL="$1"
  local PAYLOAD="$2"

  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$REGISTER" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")

  if [ "$RESPONSE" -eq 201 ] || [ "$RESPONSE" -eq 200 ]; then
    echo "  ✓ $LABEL registered (HTTP $RESPONSE)"
  elif [ "$RESPONSE" -eq 409 ]; then
    echo "  ~ $LABEL already exists (HTTP $RESPONSE) — skipped"
  else
    echo "  ✗ $LABEL failed (HTTP $RESPONSE)"
  fi
}

echo "Seeding test users against $REGISTER ..."
echo ""

register "Admin user" '{
  "name": "Test Admin",
  "email": "admin@example.com",
  "password": "password123",
  "flatNumber": "A0",
  "role": "admin"
}'

register "Resident (Flat A1)" '{
  "name": "Alice Resident",
  "email": "alice@example.com",
  "password": "password123",
  "flatNumber": "A1",
  "role": "resident"
}'

register "Resident (Flat B2)" '{
  "name": "Bob Resident",
  "email": "bob@example.com",
  "password": "password123",
  "flatNumber": "B2",
  "role": "resident"
}'

echo ""
echo "Done. Get a token with:"
echo "  ./tools/generate-token.sh admin@example.com password123"
