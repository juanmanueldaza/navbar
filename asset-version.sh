#!/usr/bin/env bash
# asset-version.sh: Simple asset versioning for cache busting in the navbar site.
# Usage: ./asset-version.sh <asset-file>
# Output: Renames <asset-file> to <asset-file>?v=<hash> and prints the new filename.

set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 <asset-file>" >&2
  exit 1
fi

ASSET="$1"
if [ ! -f "$ASSET" ]; then
  echo "Error: File '$ASSET' not found." >&2
  exit 2
fi

HASH=$(sha1sum "$ASSET" | awk '{print $1}')
EXT="${ASSET##*.}"
BASE="${ASSET%.*}"
NEW_ASSET="${BASE}.v${HASH:0:8}.${EXT}"

cp "$ASSET" "$NEW_ASSET"
echo "$NEW_ASSET"
