# ffmpeg-skill

- **Source:** https://github.com/kajisho5/ffmpeg-skill (repo root is the skill)
- **Author:** kajisho5 — MIT licence, kept alongside as `LICENSE`
- **Taken at commit:** `11a70aa` (2026-10-17, release 2.10.4)
- **Installed:** 2026-10-24, in Parth's Claude (vault T1–T10 batch)
- **Contents:** the files upstream itself ships (its `package.json` `files` list): `SKILL.md`,
  `README.md`, `scripts/` (42 tools + `_common/`), `templates/`, `references/` (4 files),
  `docs/contract.md`, `mcp/server.py`, `bin/install.js`. Repo-only material (tests, evals,
  demo GIFs, brand art, CI) is left out.
- **Local changes:** none to any file. `LICENSE` sits one level up and is added back into the
  zip by `tools/package.py`.
- **Safety read:** all 76 shipped code/text files read in full on 2026-10-18. Stdlib-only Python
  (optional `faster_whisper`); runs only ffmpeg/ffprobe, fc-* font tools, sysctl, and local
  whisper/parakeet if present; no network calls, no `shell=True`, deletes only its own partial
  outputs and work dirs. Optional speech engines may download their model weights on first use.
- **Needs:** ffmpeg + ffprobe on the machine where Claude runs it; Python 3.9+.

## Install in Claude

1. Settings → Capabilities: turn on "Code execution and file creation".
2. Customize → Skills → **+** → Upload a skill → `dist/ffmpeg-skill.zip`.

## Updating

Re-copy the shipped files from upstream, bump the commit above, and run
`python3 tools/package.py ffmpeg-skill`.
