# talking-head-editor

- **Source:** https://github.com/griffinwooldridge/talking-head-editor (repo root is the skill)
- **Author:** Griffin Wooldridge — MIT licence, kept alongside as `LICENSE`. Bundled fonts
  (Fraunces, Geist, Geist Mono) are SIL OFL, see `mg/fonts/OFL.txt`.
- **Taken at commit:** `0a73a3e` (2026-10-08)
- **Installed:** 2026-10-24, in Parth's Claude (vault T1–T10 batch)
- **Contents:** `SKILL.md`, `README.md`, `scripts/` (voice, transcribe, cut, render_cut, captions,
  compose, qa, extract_brand, setup), `references/` (5 files), `mg/` (kit, examples, fonts, grain,
  build/render/snap). Left out: `docs/demo.gif` and `.gitignore` (repo-only).
- **Local changes:** none to any file. `LICENSE` sits one level up and is added back into the
  zip by `tools/package.py`.
- **Safety read:** all shipped code and text files read on 2026-10-23. Python runs only
  ffmpeg/ffprobe and local whisper / DeepFilterNet / OpenCV; no network calls in the scripts.
  `setup.sh` (run once, by you) builds a venv inside the skill, pip-installs torch 2.5.1,
  deepfilternet, openai-whisper and opencv, downloads GSAP 3.12.5 from cdnjs, and checks
  `npx hyperframes@0.8.52` (pinned). `extract_brand.js` is meant to be pasted into a browser
  console on a brand's public site; it only reads computed styles.
- **Needs:** a shell where Claude can run it (Claude Code or Cowork on the Mac), ffmpeg, Node 18+,
  Python 3.9–3.12. Transcription is English (`small.en`); Hindi would need a model swap.

## Install in Claude

1. Run `scripts/setup.sh` once on the machine that will do the editing.
2. Customize → Skills → **+** → Upload a skill → `dist/talking-head-editor.zip`
   (or clone into `~/.claude/skills/` for Claude Code).

## Updating

Re-copy from upstream, bump the commit above, and run `python3 tools/package.py talking-head-editor`.
