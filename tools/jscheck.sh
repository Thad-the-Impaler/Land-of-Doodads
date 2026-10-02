#!/bin/sh
# Syntax-check JavaScript files with no node installed: macOS ships a JS engine
# behind `osascript -l JavaScript`, and new Function(src) parses without running.
# Usage: tools/jscheck.sh js/*.js
status=0
for f in "$@"; do
  out=$(osascript -l JavaScript -e 'function run(argv){var s=$.NSString.stringWithContentsOfFileEncodingError(argv[0],4,null).js; try{new Function(s); return "OK";}catch(e){return "ERR "+e.message;}}' "$f" 2>&1)
  case "$out" in
    OK) printf 'ok    %s\n' "$f" ;;
    *)  printf 'FAIL  %s  %s\n' "$f" "$out"; status=1 ;;
  esac
done
exit $status
