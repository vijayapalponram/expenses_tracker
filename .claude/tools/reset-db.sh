#!/usr/bin/env bash
# Deletes the H2 file database so Flyway runs all migrations fresh on the next boot.
# The DB file location matches datasource.url in application.yml: ~/test

set -euo pipefail

DB_FILES=(~/test.mv.db ~/test.trace.db)
DELETED=0

for FILE in "${DB_FILES[@]}"; do
  EXPANDED="${FILE/#\~/$HOME}"
  if [ -f "$EXPANDED" ]; then
    rm "$EXPANDED"
    echo "Deleted: $EXPANDED"
    DELETED=$((DELETED + 1))
  fi
done

if [ "$DELETED" -eq 0 ]; then
  echo "No H2 database files found — nothing to delete."
else
  echo ""
  echo "Done. Start the app with ./gradlew bootRun and Flyway will recreate the schema."
fi
