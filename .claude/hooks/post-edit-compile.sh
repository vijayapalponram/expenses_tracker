#!/usr/bin/env bash
# PostToolUse hook — runs after Edit/Write.
# CLAUDE_TOOL_INPUT is a JSON string provided by Claude Code.

FILE=$(echo "$CLAUDE_TOOL_INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('file_path', ''))
except Exception:
    pass
" 2>/dev/null)

if [[ "$FILE" == *.java ]]; then
    echo "[hook] Java file edited: $FILE"
    echo "[hook] Running compile check..."
    cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
    ./gradlew compileJava -q 2>&1 | tail -20
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo "[hook] Compile OK"
    fi
fi
