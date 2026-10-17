# Hairline

- **Source:** https://github.com/lucasmarkes/hairline (`skills/`)
- **Author:** Lucas Marques — MIT licence, kept alongside as `LICENSE`
- **Taken at commit:** `37d2e78` (2026-10-14)
- **Adopted:** 2026-10-17 — installed in Claude the same day (both skills, verified file-for-file against this commit)
- **Contents:** `hairline-create` (build a figure from an idea) and `hairline-adopt`
  (rebuild an SVG as a figure — it hands off to `hairline-create`, so install both).
- **Local changes:** none. Files are byte-for-byte the upstream copy.

## Install in Claude

1. Settings → Capabilities: turn on "Code execution and file creation".
2. Customize → Skills → **+** → Create skill → Upload a skill.
3. Upload `hairline-create.zip`, then `hairline-adopt.zip` (from `dist/` in this repo).

## Updating

The scout re-checks this repo for new commits. To take an update, re-copy
`skills/` from upstream, bump the commit above, and rebuild the zips with
`python3 tools/package.py hairline`.
