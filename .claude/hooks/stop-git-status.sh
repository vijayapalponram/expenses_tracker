#!/usr/bin/env bash
# Stop hook — runs when Claude finishes responding.
# Shows a quick git summary so you know what changed.

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo .)
STATUS=$(git -C "$ROOT" status --short)

echo ""
echo "─────────────────────────────────────"
echo " Git status"
echo "─────────────────────────────────────"
if [ -z "$STATUS" ]; then
    echo " (clean — no uncommitted changes)"
else
    echo "$STATUS"
fi
echo "─────────────────────────────────────"
