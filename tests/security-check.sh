#!/bin/bash
FAIL=0

echo "Checking index.html..."
# Find lines with target="_blank" but NOT rel="noopener noreferrer"
if grep 'target="_blank"' index.html | grep -v 'rel="noopener noreferrer"'; then
  echo "❌ FAIL: index.html contains insecure target=\"_blank\" links."
  FAIL=1
else
  echo "✅ PASS: index.html is secure."
fi

echo "Checking project.mobirise..."
# Find lines with target=\"_blank\" but NOT rel=\"noopener noreferrer\"
if grep 'target=\\"_blank\\"' project.mobirise | grep -v 'rel=\\"noopener noreferrer\\"'; then
  echo "❌ FAIL: project.mobirise contains insecure target=\"_blank\" links."
  FAIL=1
else
  echo "✅ PASS: project.mobirise is secure."
fi

if [ $FAIL -eq 1 ]; then
  exit 1
fi
exit 0
