# creative-director

- **Source:** https://github.com/smixs/creative-director-skill (`creative-director/`)
- **Author:** Serge Shima. CC BY 4.0, attribution required. `LICENSE` is kept alongside, and upstream's `NOTICE` (the credit line) ships inside the skill folder.
- **Taken at commit:** `ac06eb2`
- **Scout verdict:** WATCH, 15/20 (2026-10-22). Parth chose to install it anyway on 2026-10-24.
- **Contents:** `SKILL.md`, `assets/output-templates.md`, `references/` (8 method files plus the
  571-card `legendary-campaigns/` library and its 6 indexes).
- **Left out:** `scripts/` (3 Python helpers that regenerate the campaign indexes; SKILL.md never calls them) and the repo's README images.
- **Local changes:** none to any file.
- **Safety read (2026-10-24):** all 591 markdown files and the 3 scripts were read. The scripts read and write only the skill's own card files, with no network, shell or environment access. Links point only to the author's pages and to public campaign sources (YouTube, Vimeo, D&AD and so on). The only hidden text is 3 HTML `TODO: verify brand` notes. There are no invisible characters and no instructions aimed at the host agent beyond routing its own references.
- **Needs:** nothing. Pure instructions.

## Install in Claude

Customize → Skills → **+** → Upload a skill → `dist/creative-director.zip`.
