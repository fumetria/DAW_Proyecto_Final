#!/usr/bin/env bash
set -euo pipefail

echo "Vercel ignored build step"
echo "VERCEL_ENV=${VERCEL_ENV:-}"
echo "VERCEL_GIT_COMMIT_REF=${VERCEL_GIT_COMMIT_REF:-}"
echo "VERCEL_GIT_COMMIT_SHA=${VERCEL_GIT_COMMIT_SHA:-}"

# Vercel may expose the commit message via env var; if not, fall back to git.
COMMIT_MSG="${VERCEL_GIT_COMMIT_MESSAGE:-}"
if [[ -z "${COMMIT_MSG}" ]]; then
  COMMIT_MSG="$(git log -1 --pretty=%B 2>/dev/null || true)"
fi
COMMIT_MSG_FIRST_LINE="$(printf "%s" "${COMMIT_MSG}" | head -n 1 | tr -d '\r')"
echo "Commit: ${COMMIT_MSG_FIRST_LINE}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git work tree; proceeding with build."
  exit 1
fi

# If this is the first commit (no parent), proceed with build.
if ! git rev-parse HEAD^ >/dev/null 2>&1; then
  echo "No parent commit found; proceeding with build."
  exit 1
fi

is_doc_only_path() {
  local p="$1"

  # Normalize Windows backslashes (just in case).
  p="${p//\\//}"

  case "$p" in
    # Root documentation
    docs/*|documentacion\ proyecto/*|README.md|README.MD|readme.md)
      return 0
      ;;

    # Frontend docs folder (if it exists)
    frontend/docs/*)
      return 0
      ;;

    # General documentation-like files
    *.md|*.MD|*.rst|*.txt|*.adoc)
      return 0
      ;;

    # Typical doc assets
    *.pdf|*.doc|*.docx|*.ppt|*.pptx|*.xls|*.xlsx)
      return 0
      ;;

    # Images often used in docs
    *.png|*.jpg|*.jpeg|*.gif|*.webp|*.svg)
      return 0
      ;;
  esac

  return 1
}

changed_files="$(git diff --name-only HEAD^..HEAD || true)"
if [[ -z "${changed_files}" ]]; then
  echo "No changed files detected; proceeding with build."
  exit 1
fi

echo "Changed files:"
printf "%s\n" "${changed_files}" | sed 's/^/ - /'

non_doc_changes=0
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  if ! is_doc_only_path "$f"; then
    non_doc_changes=1
    echo "Non-doc change detected: $f"
    break
  fi
done <<< "${changed_files}"

if [[ "${non_doc_changes}" -eq 0 ]]; then
  echo "Only documentation changes detected."
  echo "Skipping build."
  exit 0
fi

echo "Code/product changes detected."
echo "Proceeding with build."
exit 1
