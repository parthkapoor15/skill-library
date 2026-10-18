# Reviews

Newest first. Generated from `reviews.json` by `tools/render.py` — see `SCOUT.md` for how verdicts are reached.

## 2026-10-18 — 21 reviewed · 1 ADD · 2 WATCH · 18 SKIP

### ADD — ffmpeg-skill
https://github.com/kajisho5/ffmpeg-skill · lane: Post-production · F/L/C/O = 5/4/5/4 (18)

**What it does:** 42 stdlib-Python FFmpeg tools behind one contract: probe first, edit, then check.py against a platform spec and look.py contact sheets before reporting. Covers lossless cuts, loudness to LUFS/true-peak targets, audio sync with drift fix, multicam, LUT and HDR-to-SDR, proxies, batch, and timeline export to FCPXML/EDL/OTIO.

**Why it's worth it for you:** The mechanical end of agency jobs (proxies for a folder of rushes, a -14 LUFS / -1 dBTP pass, a lav-to-camera sync, the same master cut down for Reels, Shorts and YouTube with a PASS/FAIL check on each) becomes one sentence to Claude with a five-line, measured report. It also writes an EDL or FCPXML you can open in Resolve or Premiere. It sits next to your delivery-QC app, it doesn't replace it.

**Watch out for:** Needs ffmpeg/ffprobe on whatever machine Claude runs it on. It is file-level only and doesn't drive Resolve or Premiere; video-editor-assistant (yesterday's ADD) covers those. The captioning and template defaults are aimed at social video. Transcription needs a local whisper/parakeet, which downloads its model on first use.

### WATCH — Director Master (山音超级导演大师)
https://github.com/Shanyin-ai/shanyin-director-master · lane: AI filmmaking · F/L/C/O = 4/3/4/4 (15)

A gated five-step director workflow: tone, then rhythm plan, then script trims, then a shot breakdown, ending in a nine-column storyboard xlsx (shot no., timecode, angle, size, picture, location, sound, notes, narrative purpose). It has a rule to write only what the camera can see, and shot-length baselines taken from 551 shots of real shorts. Turning a script into a shot-by-shot plan with a stated purpose for every shot is the prep work for the directing you're moving into. It pauses for your sign-off at each step instead of dumping a whole table at once. *Everything is in Chinese, including the trigger description, so it won't fire on English requests. An English fork or bilingual description would make it an ADD. MIT, pure markdown, nothing to run.*

### WATCH — cold-email
https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email · lane: Business & outreach · F/L/C/O = 3/3/5/3 (14)

Cold outreach skill with ten reference files: a 'value-first teardown' play for services, follow-up angles, reply handling, deliverability, and a list of AI tells to strip from the copy. It has evals and is actively maintained. The teardown play fits agency pitching: open by naming one specific thing in their reel or their delivery, ask permission, then send three concrete fixes. That beats a generic 'I'm an editor' email. *Built for B2B SaaS SDRs: sending domains, sequences and tooling are mostly irrelevant for a freelancer sending ten emails, and the AI-tells list overlaps better-writing. A slimmed freelancer/services variant would make it an ADD.*

### Skipped

- [AI storyboard system](https://github.com/rainlib/ai-storyboard) — A Chinese-only multi-agent project scaffold (scriptwriter, storyboard artist, director review, animator) built around 9-beat boards. GPL-3, untouched since January, and its 9-grid approach is already on WATCH via h3-storyboard.
- [venice-video](https://github.com/veniceai/skills/tree/main/skills/venice-video) — Accurate API reference for Venice's paid video-generation endpoints (Kling, Seedance and others). Only useful if you build on a Venice account.
- [storyboard-creation (inference.sh)](https://github.com/inferen-sh/skills/tree/main/guides/video/storyboard-creation) — Standard shot vocabulary wrapped around a paid CLI that generates the images. Its required CLI installs via curl | sh, and the repo has no licence. ⚠️ ⚠️ Setup tells you to pipe cli.inference.sh into sh (download-and-execute)..
- [venice-audio-speech](https://github.com/veniceai/skills/tree/main/skills/venice-audio-speech) — Venice TTS API reference; vendor docs, not a workflow.
- [venice-audio-music](https://github.com/veniceai/skills/tree/main/skills/venice-audio-music) — Venice async music/SFX API reference; vendor docs, not a workflow.
- [venice-image-generate](https://github.com/veniceai/skills/tree/main/skills/venice-image-generate) — Venice image-generation API reference; vendor docs.
- [venice-image-edit](https://github.com/veniceai/skills/tree/main/skills/venice-image-edit) — Venice image edit/upscale API reference; vendor docs.
- [churn-prevention](https://github.com/coreyhaines31/marketingskills/tree/main/skills/churn-prevention) — Well made, but it's SaaS cancel flows and dunning, and you sell services, not subscriptions.
- [ffmpeg-usage](https://github.com/ychoi-kr/claude-ffmpeg-skill) — A page of ffmpeg recipes, a year old. kajisho5/ffmpeg-skill does all of it with tested scripts.
- [FFmpeg Claude Skill](https://github.com/donghaozhang/ffmpeg-claude-skill) — Recipe docs with no scripts, superseded by kajisho5/ffmpeg-skill. The repo's .claude/settings.local.json pre-allows pip install, git push and gh repo create if you open the repo in Claude Code.
- [venice-characters](https://github.com/veniceai/skills/tree/main/skills/venice-characters) — Venice chat-persona catalogue API; nothing to do with film characters.
- [venice-chat](https://github.com/veniceai/skills/tree/main/skills/venice-chat) — Venice chat-completions API reference; vendor docs.
- [venice-embeddings](https://github.com/veniceai/skills/tree/main/skills/venice-embeddings) — Venice embeddings API reference; vendor docs.
- [Courier](https://github.com/trycourier/courier-skills) — Integration guide for Courier's notification platform; only relevant if you build on Courier.
- [serpapi-search-tools-python](https://github.com/serpapi/serpapi-search-tools-python) — A Python library for a paid search API, not a skill (no SKILL.md).
- [serpapi-cli](https://github.com/serpapi/serpapi-cli) — A Go CLI for a paid search API, not a skill (no SKILL.md).
- [crawlbase-mcp](https://github.com/crawlbase/crawlbase-mcp) — A paid scraping MCP server, not a skill. Pitched on anti-bot evasion.
- [smartui-skill](https://github.com/LambdaTest/agent-skills/tree/main/smartui-skill) — Config snippets for a paid visual-regression cloud.

## 2026-10-17 — 22 reviewed · 3 ADD · 6 WATCH · 13 SKIP

### ADD — Video Editor Assistant
https://github.com/edunascimentt/video-editor-assistant · lane: Post-production · F/L/C/O = 5/5/5/4 (19)

**What it does:** Eleven skills from a working editor: rough cuts from a timeline's own audio in Resolve and Premiere, multicam switching by audio correlation, cutting raw rushes to a client brief under a duration cap, and picking a music bed by measurement.

**Why it's worth it for you:** briefing-cut is literally your agency job — rushes plus a brief in, ordered selects under a cap out — and rough-cut-premiere lands a new sequence without touching the original. Scripts decide where splices land to the frame; Claude only decides what deserves cutting, and a report proves no word was clipped.

**Watch out for:** Filler-word rules are written for Brazilian Portuguese; you'd retune them for English and Hindi. Expects the open-source davinci-resolve-mcp repo installed alongside.

### ADD — Hairline
https://github.com/lucasmarkes/hairline · lane: Building tools & sites · F/L/C/O = 3/3/5/5 (16)

**What it does:** Two skills that make isometric single-stroke line figures that react to the pointer, shipped as one dependency-free HTML file. hairline-create builds a figure from an idea; hairline-adopt rebuilds an SVG (icon, logo) as one.

**Why it's worth it for you:** Each buildlog project could get a living figure instead of a screenshot — Delivery Spec Validator as a sieve that lets the clean files through. And the skill itself is a lesson in pipeline-TD thinking: a fixed engine Claude may not touch, ten hard rules, a validator that rejects the page, and a look-check that screenshots eight poses before handing over.

**Watch out for:** Web interaction, not film motion graphics: it answers a mouse, it doesn't render to a timeline (you'd screen-record it). One visual language, so it suits a site that commits to that look. The look-check installs playwright-core once via npm.

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
