#!/bin/zsh
# Publishes public/corres to corres.app (GitHub Pages, repo tamkin-anwar/corres-site).
# public/corres stays the one copy to edit; anwarcreativestudio.com/corres/ keeps
# serving the same pages, since Google's and Apple's reviews point there.
set -euo pipefail
here=${0:A:h}/..
site=${CORRES_SITE_DIR:-$here/../corres-site}

[[ -d $site/.git ]] || git clone https://github.com/tamkin-anwar/corres-site.git "$site"
git -C "$site" pull --ff-only --quiet

rsync -a --delete --exclude .git --exclude CNAME --exclude .nojekyll --exclude README.md \
  "$here/public/corres/" "$site/"
print -n corres.app > "$site/CNAME"
touch "$site/.nojekyll"

cd "$site"
git add -A
if git diff --cached --quiet; then
  echo "corres.app is already up to date"
else
  git commit -q -m "Publish from anwar-creative-studio-portfolio $(git -C "$here" rev-parse --short HEAD)"
  git push -q
  echo "Published to corres.app"
fi
