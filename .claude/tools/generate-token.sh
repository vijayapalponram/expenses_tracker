#!/usr/bin/env bash
# Usage: ./tools/generate-token.sh [email] [password]
# Calls the login endpoint and prints the JWT as a ready-to-use Authorization header.

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:5000}"
EMAIL="${1:-admin@example.com}"
PASSWORD="${2:-password123}"

RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Login failed. Response:"
  echo "$RESPONSE"
  exit 1
fi

echo ""
echo "Token:"
echo "$TOKEN"
echo ""
echo "Authorization header (copy this):"
echo "Authorization: Bearer $TOKEN"
echo ""
echo "curl example:"
echo "  curl -H 'Authorization: Bearer $TOKEN' $BASE_URL/api/..."
