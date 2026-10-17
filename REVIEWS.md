# Reviews

Newest first. Generated from `reviews.json` by `tools/render.py` — see `SCOUT.md` for how verdicts are reached.

## 2026-10-17 — 21 reviewed · 2 ADD · 6 WATCH · 13 SKIP

### ADD — Video Editor Assistant
https://github.com/edunascimentt/video-editor-assistant · lane: Post-production · F/L/C/O = 5/5/5/4 (19)

**What it does:** Eleven skills from a working editor: rough cuts from a timeline's own audio in Resolve and Premiere, multicam switching by audio correlation, cutting raw rushes to a client brief under a duration cap, and picking a music bed by measurement.

**Why it's worth it for you:** briefing-cut is literally your agency job — rushes plus a brief in, ordered selects under a cap out — and rough-cut-premiere lands a new sequence without touching the original. Scripts decide where splices land to the frame; Claude only decides what deserves cutting, and a report proves no word was clipped.

**Watch out for:** Filler-word rules are written for Brazilian Portuguese; you'd retune them for English and Hindi. Expects the open-source davinci-resolve-mcp repo installed alongside.

### ADD — Better Writing
https://github.com/forjd/better-writing · lane: Business & outreach · F/L/C/O = 4/4/5/3 (16)

**What it does:** Rewrites and drafts prose so it stops sounding generated, without inventing facts. Has a light-edit mode where every word starts as kept and a change needs a named failure. Eval-tested.

**Why it's worth it for you:** Applications, treatments and pitch emails are where AI-flavoured prose costs you most. It audits a voice sample before imitating it and marks missing facts instead of making them up.

**Watch out for:** Overlaps what Claude does when asked well; the gain is discipline, not a new capability.

### WATCH — Color Grade AI
https://github.com/isaacrowntree/color-grade-ai · lane: Post-production · F/L/C/O = 4/3/4/4 (15)

Measures a frame or clip, fits a correction by applying candidates and re-measuring, and emits a .cube LUT; detects log vs Rec.709 first and can match one shot to another. Shot-matching bulk interview angles to a hero shot is real time saved; the measure-then-fit loop is a better idea than preset LUTs. *Your grading is judgement, and your Resolve connection already generates LUTs. Becomes an ADD if it learns to read your CST/ACES pipeline instead of assuming display-referred 709. Last updated August.*

### WATCH — Remotion skills (official)
https://github.com/remotion-dev/skills · lane: Building tools & sites · F/L/C/O = 3/4/5/3 (15)

Remotion's own skills for making video in React code: creating, captions, maps, rendering, studio preview. Programmatic motion for buildlog demos and data-driven titles, maintained by the people who make the tool. *Only earns its place the day you start a Remotion project; until then it's shelf weight.*

### WATCH — H3 Storyboard & Performance
https://github.com/phileiny/h3-storyboard-skill · lane: Wildcard · F/L/C/O = 3/3/4/5 (15)

Two thousand lines of measured findings on getting acting out of MiniMax H3 — which directions actually render emotion, with each rule marked by how it was verified. The rarest thing in AI film: performance direction tested against output, not vibes. Composition-before-content is the spine. *Written in Traditional Chinese and tied to one model. Worth a translated read even if you never install it.*

### WATCH — Check Skill (coder-eval)
https://github.com/UiPath/coder_eval/tree/main/plugins/coder-eval/skills/check-skill · lane: Wildcard · F/L/C/O = 3/3/4/4 (14)

Generates and runs a test suite measuring whether a skill actually triggers when it should — precision and recall for skill descriptions. Pipeline-TD thinking applied to this library: proof a skill fires, not hope. *Heavy setup (the whole coder-eval harness). Becomes useful when you start writing your own skills.*

### WATCH — AI Video Storyboard
https://github.com/aicontentskills/ai-video-storyboard-skill · lane: AI filmmaking · F/L/C/O = 4/3/3/3 (13)

Turns a brief into a multi-shot plan for videos longer than one AI generation, built on one good idea: consistency across shots beats any single perfect shot. Right instinct for The Second Cup and the mythic film — a locked look bible before generating. *Pure prompt, no tooling, ad-and-reel shaped rather than cinematic. Needs a scene-to-shot grammar and per-model prompt formats to become an ADD.*

### WATCH — LintLang
https://github.com/hermes-labs-ai/lintlang · lane: Building tools & sites · F/L/C/O = 3/3/4/3 (13)

A deterministic linter for SKILL.md, CLAUDE.md and system prompts — ambiguous tool descriptions, missing bounds, injection-prone phrasing. Could become the scout's own second opinion on craft. *Young and a little heuristic; watch whether rules stabilise.*

### Skipped

- [Resolve Multicam Workflow](https://github.com/web594/resolve-multicam-workflow) — A German studio's in-house Resolve pipeline, hardcoded to their Windows folders and gear. Video Editor Assistant covers the same ground portably.
- [Short-drama skills](https://github.com/zenstory-ai/drama-skills) — A well-built end-to-end pipeline for Chinese vertical micro-drama — novel analysis to storyboard to video prompts. Wrong language and wrong form for your films.
- [oil-ui](https://github.com/oil-oil/oil-ui) — UI design exploration skill, mostly in Chinese, overlapping frontend-design. Phones home on every load. ⚠️ Runs a network update check every time the skill loads.
- [agmsg](https://github.com/fujibee/agmsg) — Message-passing between Claude Code, Codex and Gemini sessions. Clever plumbing for multi-agent coders, not for your work.
- [DaVinci Resolve skills (ChaiWithJai)](https://github.com/ChaiWithJai/davinci-resolve-claude-skills) — Beginner guidance distilled from the Resolve manual — setup, troubleshooting, webcam grading. You'd be teaching it. Stale since May.
- [oGab video editor](https://github.com/gabrielxreis/ogab) — Portuguese-language social-video factory, script to Resolve render with AI voice. Reels-shaped, and the installer pipes a remote script into your shell. ⚠️ Installs via curl | bash, which also installs Homebrew.
- [Better Design](https://github.com/marvkr/better-design/tree/main/skills/better-design) — Tied to one vendor's design-system product; frontend-design already does the general job.
- [Presentation skill](https://github.com/siril9/presentation-skill) — Editable PowerPoint generation with visual QA — a duplicate of what Slides and pptx already give you.
- [Little Canary](https://github.com/hermes-labs-ai/little-canary) — Screens inbound text for prompt injection with a sacrificial model. Smart idea for people building agents; nothing for you to run.
- [Knowledge-work skills (tronghieu)](https://github.com/tronghieu/agent-skills) — Eighteen consultant personas — strategist, PM, socratic questioner. Hats, not tools.
- [TerminalSkills davinci-resolve](https://github.com/TerminalSkills/skills/tree/main/skills/davinci-resolve) — One of 1,000+ skills in a bulk collection; generic scripting notes with nothing you don't already have.
- [OneWave 225-skill pack](https://github.com/OneWave-AI/claude-skills) — Volume over craft: 225 thin skills in one install, most a paragraph of advice.
- [Claude Code Video Toolkit](https://github.com/wilwaldon/Claude-Code-Video-Toolkit) — A link list, not a skill — no SKILL.md, untouched since February.
