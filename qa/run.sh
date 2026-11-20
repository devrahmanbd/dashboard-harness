#!/bin/sh
# Dashboard QA runner — staging only.
# Runs qa/qa-dashboard.mjs detached (nohup) so an SSH drop does not kill it,
# then tails the log until the run finishes. Ctrl-C detaches; the run keeps
# going and still writes qa/report.md + qa/report.json.
set -eu

HARNESS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG="$HARNESS_DIR/qa/run.log"
WIDTHS="1440,1280,768,390,375"

for arg in "$@"; do
  case "$arg" in
    --widths=*) WIDTHS="${arg#--widths=}" ;;
    *) echo "unknown argument: $arg" >&2; echo "usage: $0 [--widths=1440,1280,768,390,375]" >&2; exit 2 ;;
  esac
done

mkdir -p "$HARNESS_DIR/qa/screenshots"

if [ ! -f "$HARNESS_DIR/.env" ]; then
  echo "ERROR: $HARNESS_DIR/.env not found." >&2
  echo "  cp $HARNESS_DIR/.env.example $HARNESS_DIR/.env" >&2
  echo "  # edit .env — set STAGING_OWNER_EMAIL and STAGING_OWNER_PASSWORD" >&2
  echo "  chmod 600 $HARNESS_DIR/.env" >&2
  exit 1
fi

command -v node >/dev/null 2>&1 || { echo "ERROR: node not found on PATH." >&2; exit 1; }

# Playwright fallback: the script reuses the repo install. If it is gone,
# install playwright-core into the harness (uses the cached Chromium).
if [ ! -d /opt/quesystem2-staging/node_modules/playwright ] \
  && [ ! -d "$HARNESS_DIR/node_modules/playwright" ] \
  && [ ! -d "$HARNESS_DIR/node_modules/playwright-core" ]; then
  echo "Repo Playwright install not found — installing playwright-core into the harness ..."
  (cd "$HARNESS_DIR" && npm install --no-save playwright-core)
fi

# Staging branch/commit (read-only) for the report.
STAGING_BRANCH="$(git -C /opt/quesystem2-staging rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
STAGING_COMMIT="$(git -C /opt/quesystem2-staging rev-parse --short HEAD 2>/dev/null || echo unknown)"
export STAGING_BRANCH STAGING_COMMIT

echo "Dashboard QA — staging $STAGING_BRANCH @ $STAGING_COMMIT — widths $WIDTHS"
echo "Log: $LOG"
nohup node "$HARNESS_DIR/qa/qa-dashboard.mjs" --widths="$WIDTHS" > "$LOG" 2>&1 &
PID=$!
echo "Started (pid $PID). Watching the log — Ctrl-C detaches, the run keeps going."
tail -f --pid="$PID" "$LOG"
wait "$PID"
STATUS=$?
echo "Run finished (exit $STATUS). Report: $HARNESS_DIR/qa/report.md"
exit "$STATUS"
