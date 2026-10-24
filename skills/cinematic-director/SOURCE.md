# cinematic-director

- **Source:** https://github.com/wuwangzhang1216/DirectorSKILL (repo root is the skill; skill name `cinematic-director`)
- **Author:** wangzhang-wu (wuwangzhang1216). MIT licence, kept alongside as `LICENSE`
- **Taken at commit:** `c65ae0d` (2026-08-31, v2.1.0)
- **Installed:** 2026-10-24, in Parth's Claude (vault T1–T10 batch)
- **Contents:** the parts the skill loads: `SKILL.md`, `README.md`, `references/` (13 files plus
  `director_styles/`, 22 files), `assets/` (8 templates). Repo-only material (`evals/`, CI
  workflows, `CONTRIBUTING.md`, `CHANGELOG.md`, lint config) is left out.
- **Local changes:** none to any file. `LICENSE` sits one level up, and `tools/package.py` adds it back into the zip.
- **Safety read (2026-10-20):** markdown only, no scripts and no binaries. The only code in the
  repo is GitHub CI that validates `evals.json` and lints the markdown. It has no external links
  except its own GitHub pages and badges, no hidden comments and no instructions aimed at the
  host agent beyond routing its own references.
- **Needs:** nothing. Pure instructions.

## Install in Claude

Customize → Skills → **+** → Upload a skill → `dist/cinematic-director.zip`.

## Updating

Re-copy `SKILL.md`, `README.md`, `references/` and `assets/` from upstream, bump the commit above,
and run `python3 tools/package.py cinematic-director`.
