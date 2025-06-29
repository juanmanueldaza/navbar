#!/usr/bin/env bash
# sanitize.sh: Minimal HTML/JS sanitization utility for the navbar site
# Usage: ./sanitize.sh <input-file> <output-file>
# Removes <script> tags (single and multiline) and inline event handlers (e.g., onclick) from HTML/JS files.

set -e

if [ $# -ne 2 ]; then
  echo "Usage: $0 <input-file> <output-file>" >&2
  exit 1
fi

in="$1"
out="$2"

if [ ! -f "$in" ]; then
  echo "Error: File '$in' not found." >&2
  exit 2
fi

# Remove <script>...</script> blocks (single and multiline) and inline on* event handlers
awk 'BEGIN{IGNORECASE=1}/<script[ >]/{f=1}f && /<\/script>/{f=0;next}!f' "$in" | \
  sed -E 's/ on[a-zA-Z]+=["'\''][^"'\'']*["'\'']//gI' > "$out"

echo "Sanitized output written to $out"
