#!/usr/bin/env bash
# verify-21st-mcp.sh — verify the 21st.dev MCP server is configured and reachable.
#
# Checks, in order:
#   1. .mcp.json exists and is valid JSON.
#   2. It declares a "21st" HTTP server pointing at the 21st.dev MCP endpoint.
#   3. The API key is referenced via ${API_KEY_21ST} (never hardcoded in git).
#   4. API_KEY_21ST is present in the environment (warning if absent — see below).
#   5. The endpoint is reachable and authenticates via an MCP `initialize` handshake.
#
# Exit codes: 0 = all critical checks passed, 1 = a critical check failed.
# A missing/invalid API key is reported but does NOT fail the run by default,
# since keys live outside git (shell env / .claude/settings.local.json). Set
# STRICT=1 to also fail when the key is missing or the live probe is unauthenticated.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MCP_JSON="$REPO_ROOT/.mcp.json"
ENDPOINT="https://21st.dev/api/mcp"
STRICT="${STRICT:-0}"

red()   { printf '\033[31m%s\033[0m\n' "$1"; }
green() { printf '\033[32m%s\033[0m\n' "$1"; }
amber() { printf '\033[33m%s\033[0m\n' "$1"; }
cyan()  { printf '\033[36m%s\033[0m\n' "$1"; }

pass() { green "  PASS  $1"; }
fail() { red   "  FAIL  $1"; FAILED=1; }
warn() { amber "  WARN  $1"; }

FAILED=0

cyan "==> Verifying 21st.dev MCP configuration"
echo "    config:   $MCP_JSON"
echo "    endpoint: $ENDPOINT"
echo

# --- 1. .mcp.json exists and is valid JSON ----------------------------------
if [ ! -f "$MCP_JSON" ]; then
  fail ".mcp.json not found at $MCP_JSON"
  exit 1
fi

if command -v jq >/dev/null 2>&1; then
  JQ=1
else
  JQ=0
  warn "jq not found — falling back to python3 for JSON parsing."
fi

# python3 fallback for reading a dotted path out of .mcp.json.
py_get() {
  python3 - "$MCP_JSON" "$1" <<'PY' 2>/dev/null
import json, sys
path = sys.argv[1]
keys = sys.argv[2].split(".")
try:
    with open(path) as f:
        data = json.load(f)
except Exception:
    sys.exit(0)
cur = data
for k in keys:
    if not k:
        continue
    if isinstance(cur, dict) and k in cur:
        cur = cur[k]
    else:
        sys.exit(0)
if cur is None:
    sys.exit(0)
print(cur if isinstance(cur, str) else json.dumps(cur))
PY
}

get() {
  # get <dotted.path> <jq.path>
  if [ "$JQ" = "1" ]; then
    jq -r "$2 // empty" "$MCP_JSON" 2>/dev/null
  else
    py_get "$1"
  fi
}

if [ "$JQ" = "1" ]; then
  if jq empty "$MCP_JSON" >/dev/null 2>&1; then
    pass ".mcp.json is present and valid JSON."
  else
    fail ".mcp.json is present but is NOT valid JSON."
    exit 1
  fi
else
  if python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$MCP_JSON" >/dev/null 2>&1; then
    pass ".mcp.json is present and valid JSON."
  else
    fail ".mcp.json is present but is NOT valid JSON."
    exit 1
  fi
fi

# --- 2. "21st" server is declared with the expected endpoint ----------------
URL="$(get "mcpServers.21st.url" '.mcpServers["21st"].url')"
TYPE="$(get "mcpServers.21st.type" '.mcpServers["21st"].type')"

if [ -z "$URL" ]; then
  fail 'No "21st" server found under mcpServers in .mcp.json.'
else
  pass "\"21st\" server declared (type=${TYPE:-unset})."
  if [ "$URL" = "$ENDPOINT" ]; then
    pass "Endpoint URL matches $ENDPOINT."
  else
    warn "Endpoint URL is \"$URL\" (expected $ENDPOINT). Probing the configured URL."
    ENDPOINT="$URL"
  fi
fi

# --- 3. API key is referenced, not hardcoded --------------------------------
KEYREF="$(get "mcpServers.21st.headers" '.mcpServers["21st"].headers')"
if printf '%s' "$KEYREF" | grep -q '\${API_KEY_21ST}'; then
  pass "API key is referenced via \${API_KEY_21ST} (not hardcoded)."
elif printf '%s' "$KEYREF" | grep -Eq '"(x-api-key|Authorization)"[[:space:]]*:[[:space:]]*"[^$][^"]+"'; then
  fail "A credential appears to be HARDCODED in .mcp.json — move it to \${API_KEY_21ST}."
else
  warn "Could not confirm the API-key header shape; inspect .mcp.json headers manually."
fi

# --- 4. API_KEY_21ST present in the environment -----------------------------
if [ -n "${API_KEY_21ST:-}" ]; then
  pass "API_KEY_21ST is set in the environment (length ${#API_KEY_21ST})."
else
  if [ "$STRICT" = "1" ]; then
    fail "API_KEY_21ST is not set (STRICT=1)."
  else
    warn "API_KEY_21ST is not set. Export it or add it to .claude/settings.local.json."
    warn "Get a key at https://21st.dev/mcp — the live probe below will report 401 until then."
  fi
fi

# --- 5. Live MCP handshake --------------------------------------------------
echo
cyan "==> Probing endpoint with an MCP initialize handshake"
if ! command -v curl >/dev/null 2>&1; then
  warn "curl not found — skipping the live reachability probe."
else
  BODY='{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"verify-21st-mcp","version":"1"}}}'
  RESP_FILE="$(mktemp)"
  trap 'rm -f "$RESP_FILE"' EXIT

  AUTH_HEADER=(-H "x-api-key: ${API_KEY_21ST:-}")
  CODE="$(curl -sS -m 25 -o "$RESP_FILE" -w '%{http_code}' \
    -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    "${AUTH_HEADER[@]}" \
    -d "$BODY" 2>>"$RESP_FILE" || echo "000")"

  case "$CODE" in
    200)
      pass "Endpoint returned HTTP 200 — reachable and authenticated."
      pass "21st.dev MCP is fully verified."
      ;;
    401|403)
      if [ -n "${API_KEY_21ST:-}" ]; then
        fail "Endpoint reachable but returned HTTP $CODE — API_KEY_21ST was rejected. Get a fresh key at https://21st.dev/mcp."
      else
        msg="Endpoint reachable (HTTP $CODE) but no API_KEY_21ST supplied — expected until you set a key."
        if [ "$STRICT" = "1" ]; then fail "$msg"; else warn "$msg"; fi
      fi
      ;;
    000)
      fail "Could not reach $ENDPOINT (network/proxy error or timeout)."
      ;;
    *)
      warn "Endpoint returned unexpected HTTP $CODE."
      head -c 300 "$RESP_FILE"; echo
      ;;
  esac
fi

echo
if [ "$FAILED" = "0" ]; then
  green "==> Verification passed."
  exit 0
else
  red "==> Verification FAILED — see the FAIL lines above."
  exit 1
fi
