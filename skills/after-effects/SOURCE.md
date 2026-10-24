# after-effects

- **Source:** https://github.com/aedev-tools/adobe-agent-skills (`skills/after-effects/`)
- **Author:** aedev-tools. Apache-2.0, with `LICENSE` kept alongside.
- **Taken at commit:** `00f131e`
- **Scout verdict:** ADD, 16/20 (vault T10). Installed 2026-10-24 at Parth's request.
- **Local changes (Apache-2.0 §4b notice):** in `SKILL.md`, the scripts path `~/.claude/skills/after-effects-assistant/scripts` became
  `~/.claude/skills/after-effects/scripts` to match the skill's real folder name. Nothing else changed.
- **Safety read (2026-10-24):** 41 ExtendScript files and `runner.sh` (osascript/JXA). The only `eval` is inside the standard
  json2.js parser. No network calls.
- **Needs:** macOS with After Effects, and AE's "Allow Scripts to Write Files and Access Network" preference on.
  It only does anything where Claude can run commands on your Mac.
