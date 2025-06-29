#!/usr/bin/env bash
# test-navbar.sh: Minimal test runner for the navbar Bash scripts and config
# Usage: ./test-navbar.sh

set -e

failures=0

echo "[TEST] asset-version.sh: should create versioned asset file"
touch test.js
echo "console.log('test');" > test.js
out=$(./asset-version.sh test.js)
if [[ $out =~ test.v[0-9a-f]{8}\.js ]] && [ -f "$out" ]; then
  echo "PASS: asset-version.sh versioned file created: $out"
  rm "$out"
else
  echo "FAIL: asset-version.sh did not create versioned file" >&2
  failures=$((failures+1))
fi
rm test.js

if [ $failures -eq 0 ]; then
  echo "All tests passed."
  exit 0
else
  echo "$failures test(s) failed."
  exit 1
fi
