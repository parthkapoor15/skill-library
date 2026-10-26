# Reviews

Newest first. Generated from `reviews.json` by `tools/render.py` — see `SCOUT.md` for how verdicts are reached.

## 2026-10-26 — 21 reviewed · 0 ADD · 1 WATCH · 20 SKIP

### WATCH — Video Editor Skills (DaVinci Resolve)
https://github.com/appariciojunior/video-editor-skills · lane: Post-production · F/L/C/O = 4/3/4/3 (14)

Twelve short, code-free skills that make Claude a first-pass editor in Resolve Studio 21. They cover transcript cuts, vlog pacing, B-roll, loudness, captions, Remotion overlays and YouTube Deliver settings. Each lesson comes from a real edit, and LEARNINGS.md explains them. Examples: StartRendering([job], False) is the only form that starts a scripted render, and the Rec.709-A tag stops the faded look on YouTube. The resolve-scripting, youtube-export and voice-and-audio notes would save Parth real debugging time the next time a script drives Resolve: silent setters, render jobs stuck at Ready, SRT import offsets, the AI Music Remixer muting a track. *Two things block an ADD. The licence is CC BY-NC 4.0, which bars use in paid work. And rough-cut, resolve-scripting and music cues overlap the edunascimentt set Parth already has installed. It would become an ADD if the author relicenses it, or if the unique notes (export colour tags, render-job traps, audio diagnosis) were contributed to a permissively licensed skill.*

### Skipped

- [zero-slop](https://github.com/manavmishra/ZeroSlop/blob/main/SKILL.md) — A measured de-slop editor (MIT) with local Python scorers and fidelity checks. Its only network call is a GitHub release check, and an opt-in remote API is clearly separated. It does the same job as the adopted better-writing skill, and is not clearly better for Parth's short pitches and emails. The repo is also heavy, with growth, distribution and MCP folders.
- [capcut-edit](https://github.com/renezander030/capcut-cli/tree/master/skills/capcut-edit) — A well-built CLI skill (MIT) that edits CapCut and JianYing drafts. It has transactional batch writes, .bak snapshots and tested shell recipes. Parth cuts in Premiere and Resolve, though, so the CapCut draft format is the wrong target for his work.
- [edit-timeline-studio](https://github.com/MartinDelophy/ai-video-editor/tree/main/skills/edit-timeline-studio) — A very large skill that drives one browser editor, Timeline Studio, through its own .timeline format, command layer and local model routing. Its discipline is good: diff before apply, and every caption tied to audible speech. None of it carries over to a Premiere or Resolve timeline.
- [novel-writing](https://github.com/wgwtest/novel-writing) — A careful prose-fiction skill covering scene causality, character knowledge and manuscript versioning. It rules out screenplay work in so many words, and Parth's 26 installed screenwriting skills already cover story craft for his medium.
- [davinci-resolve (offload-harness)](https://github.com/dmmdea/offload-harness/tree/main/skill/davinci-resolve) — The author's personal operations log for driving Resolve on their own editing rig. It covers SSH into a named Windows box, launching Resolve in another user's session through Task Scheduler, and a private CLI and sidecar that ship only in another repo. The Resolve 21.1 API catalogue in references/ is useful, but the skill can't run anywhere else.
- [company-research](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/company-research) — A company brief framed for PM interviews (executive quotes, product strategy). An agency brief before a pitch is the nearest use, and deep-research already covers it.
- [alterlab-cdm-film-pitch](https://github.com/AlterLab-IEU/AlterLab-FC-Skills/tree/main/skills/cdm/alterlab-cdm-film-pitch) — A persona prompt ('You are FilmPitchDeveloper') with emoji headings and a list of deliverables (treatment, lookbook, deck, grant). It has no method beyond generic advice. The installed sw-industry-business and sw-series-engine-bible skills already cover pitches and treatments with real sources.
- [youtube-transcript](https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/youtube-transcript) — Downloads YouTube captions with yt-dlp and falls back to Whisper. The installed watch skill already does this and also analyses pacing and frames.
- [davinci-resolve (Major-AI-Skills)](https://github.com/alivirgo/Major-AI-Skills/tree/master/skills/davinci-resolve) — A generic Resolve API overview from a mass-produced pack of 413 skills. Some of its advice is wrong: it says to poll IsRenderingInProgress, which field reports show can be False before a render starts. The appariciojunior and installed resolve-scripting skills are far better.
- [melt-mlt](https://github.com/sanand0/scripts/tree/main/agents-archive/melt-mlt) — A melt / MLT command-line editor reference. The author has moved it to agents-archive, and MLT isn't part of Parth's pipeline.
- [elicitation](https://github.com/tasteray/skills/tree/main/elicitation) — A conversational kit for psychological profiling (narrative identity, motivational interviewing). It serves none of Parth's lanes.
- [kanecli-skill](https://github.com/LambdaTest/agent-skills/tree/main/kanecli-skill) — A vendor skill for LambdaTest's kane-cli. It tells the agent never to use Playwright or Selenium directly and never to write tests by hand, which hijacks every browser task toward a paid grid.
- [business-health-diagnostic](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/business-health-diagnostic) — A SaaS metrics health check (MRR, churn, CAC). It doesn't apply to a freelance post-production business.
- [positioning-statement](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/positioning-statement) — A Geoffrey Moore positioning-statement template. It is a one-off exercise that Claude handles unprompted, and it is written for B2B SaaS rather than a freelancer's positioning.
- [jest-skill](https://github.com/LambdaTest/agent-skills/tree/main/jest-skill) — A generic Jest test-writing playbook. It adds nothing to what Claude already does, and Parth's tools are not test-suite heavy.
- [junit-5-skill](https://github.com/LambdaTest/agent-skills/tree/main/junit-5-skill) — A JUnit 5 and Mockito playbook. Parth doesn't work in Java.
- [customer-journey-map](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/customer-journey-map) — A standard NNGroup journey-map template for product teams.
- [epic-hypothesis](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/epic-hypothesis) — Turns product epics into testable hypotheses. This is PM process with no bearing on Parth's work.
- [subtitle-craft](https://github.com/openakita/openakita) — Listed on claudskills.com, but plugins/subtitle-craft no longer exists in the current repo, so there was nothing to review.
- [full-funnel-campaign-orchestrator](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/orchestrators/full-funnel-campaign-orchestrator) — A 30-line list of sibling skill names to call in order, with no method of its own.

## 2026-10-24 — 26 reviewed · 1 ADD · 1 WATCH · 24 SKIP

### ADD — OpenCutAgent (premiere-edit)
https://github.com/leonardogrig/opencutagent · lane: Post-production · F/L/C/O = 5/4/4/4 (17)

**What it does:** A Premiere Pro panel plus a local Node MCP engine that lets Claude edit the live timeline. It transcribes the source media, removes silences and fillers with a dry run first, and handles serial-restart retakes: Claude marks keep/cut per segment, you review the marks in the panel, then it applies them with cut points placed in the quiet between words. Big cut lists are applied through Premiere's own XML round-trip, so effects and transforms survive. Bundled skills: premiere-edit, remove-silences, setup.

**Why it's worth it for you:** This is the gap every earlier talking-head WATCH was missing: the cuts land in his real Premiere sequence, not in a rendered mp4, so he keeps grading and finishing in the NLE and Cmd+Z undoes any of it. Retake clean-up on raw interviews and VO is the first pass of most agency jobs, and this turns it into a reviewable keep/cut list. He builds Premiere panels himself, so the CEP host file and the bridge are worth reading as reference too.

**Watch out for:** This is an app, not a drop-in skill. It needs his Mac: a CEP panel with Premiere developer mode on (PlayerDebugMode), Node, ffmpeg, Claude Code signed in, and an ElevenLabs key for Scribe transcription (about $0.22 per hour of source, cached). An opt-in cloud mode sends media to the author's proxy instead; leave it off. Works on 100%-speed clips in flat sequences only, so no multicam or nested sequences. ppro_run_script runs arbitrary ExtendScript, and the README also offers a curl | bash one-liner; use the local ./install.sh instead. The licence is MIT plus Commons Clause, so it isn't queued here: install it from the repo on his machine.

### WATCH — boring-tools
https://github.com/brookejlacey/boring-tools · lane: Post-production · F/L/C/O = 4/3/5/3 (15)

Edit video as text: cuts.tsv plus a per-shoot rebuild.sh are the project file. The chain runs VAD, per-span whisper.cpp, take grouping, face tracking on a square crop, eyeline matching across framings, measured subject edges for layout, wall-patch object removal, wall cards and captions, then verifies frame counts and A/V drift. Models are pinned by SHA-256 and the jobs run offline. Cut-down sets from one take (15/30/60, vertical and landscape) where a client note means editing one number and rerunning, with the drift check reported each time. *Overlaps talking-head-editor (queued yesterday) almost entirely, and like it renders mp4s rather than an NLE timeline. It is macOS-only with VideoToolbox defaults and tuned to one creator's ad format. It would be an ADD if cuts.tsv exported to FCPXML/EDL for Premiere or Resolve, or if it did clearly better than talking-head-editor on take selection.*

### Skipped

- [narration-video-director](https://github.com/indieshade/video-director-workflow) — A Chinese-language director skill for voice-over motion explainers on HyperFrames/Remotion, with 25 reference files. Thoughtful, but it covers explainer motion design, not his edit or film work, and overlaps creative-director (WATCH).
- [motion-design-skills](https://github.com/PHANTOMTONYT/motion-design-skills) — Five HyperFrames/GSAP style recipes (kinetic type, 3D toy, cartoon, system diagrams, data charts). The motion-discipline notes are good, but it overlaps Hairline, Remotion (WATCH) and talking-head-editor's graphics, and it targets social explainers.
- [/better](https://gist.github.com/joshp123/a1443d30fa1b7c577e74882895cea61b) — A /better prompt that asks what a top professional would do differently before redoing a task. I couldn't read the full file (gist clone blocked, page summary only) and there is no licence, so it isn't scored as safe; the idea is a one-paragraph habit, not a skill.
- [palmier-reels](https://github.com/glebis/claude-skills/tree/main/palmier-reels) — Builds 9:16 narrative text reels from a spec through Palmier Pro's local MCP. The spec-rebuild idea is solid, but it is locked to an NLE he doesn't use and to Telegram reels.
- [init-xcode-app](https://github.com/glebis/claude-skills/tree/main/init-xcode-app) — XcodeGen SwiftUI scaffolder with CI/release/CloudKit modules. It is useful boilerplate, but it carries the author's house conventions (bundle prefix, paths), and he already has his macOS QC app's structure.
- [name-audition](https://github.com/glebis/claude-skills/tree/main/name-audition) — Product-name domain/collision/trademark screen. It duplicates replica-brand's naming checks.
- [perso-dubbing](https://github.com/perso-ai/perso-dubbing-plugin) — Commercial dubbing/lip-sync API client. It sends Amplitude telemetry by default (opt-out) and tells Claude to tag the host silently and never mention it. ⚠️ ⚠️ instructs Claude to add a telemetry host tag silently and never surface it to the user; default-on Amplitude telemetry.
- [social](https://github.com/coreyhaines31/marketingskills/tree/main/skills/social) — A broad social-content playbook for SaaS marketers. It is well organised but generic, and he doesn't run a content calendar.
- [final-cut-pro (FCPXML)](https://github.com/madappgang/claude-code/tree/main/plugins/video-editing/skills/final-cut-pro) — An FCPXML reference sheet (Jan 2026). He doesn't cut in Final Cut Pro, and it has no tooling to validate against an NLE.
- [video-router](https://github.com/Orkas-AI/Orkas-VideoStudio/tree/main/packages/skills/video-router) — Only routes a brief to generate/compose/edit inside the Orkas runtime; it is useless without that stack.
- [youtube-skills](https://github.com/ZeroPointRepo/youtube-skills) — Wrappers for a paid transcript API (TranscriptAPI.com) that offer to sign up for an account and write the key into your shell profile.
- [humanizer-zh-tw](https://github.com/nagameTW/formosa-humanizer) — Taiwanese Traditional Chinese de-AI rewriter; wrong language for his work.
- [altitude-horizon-framework](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/altitude-horizon-framework) — PM-to-Director career framework; irrelevant to a freelance filmmaker.
- [video-editing (muse import)](https://github.com/aicodedecode/awesome-muse-skills/tree/main/skills-imported/video-editing) — A 66-line generic talking-head cutting checklist copied into a 1,750-skill aggregator; references tools it doesn't ship.
- [color-science](https://github.com/lebobo88/RLM-Creative/tree/main/.claude/skills/color-science) — A generic colour-space delivery table and mood-to-LUT presets wired to the author's multi-agent studio. It knows less than a working colourist, and there is no licence.
- [ppt-generator-pro](https://github.com/op7418/NanoBanana-PPT-Skills) — Image-only slides from Gemini plus Kling transitions. It needs two API keys, hasn't been updated since January, and the Slides type does decks better.
- [write-concisely](https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/docs/skills/write-concisely) — Strunk & White rules pasted as a list; Claude already applies these.
- [geb-skill](https://github.com/LambdaTest/agent-skills/tree/main/geb-skill) — Groovy/Geb browser-test generator; not his stack.
- [hyperexecute-skill](https://github.com/LambdaTest/agent-skills/tree/main/hyperexecute-skill) — Operates LambdaTest's paid HyperExecute cloud runner; vendor-specific.
- [jasmine-skill](https://github.com/LambdaTest/agent-skills/tree/main/jasmine-skill) — Jasmine test boilerplate; Claude writes these unprompted.
- [offer-extraction](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/foundations/offer-extraction) — 47 lines of direct-response offer clichés.
- [generic-language-killer](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/qa/generic-language-killer) — 30-line 'remove fluff' prompt; no pattern list or examples.
- [performance-diagnosis](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/operator-os/performance-diagnosis) — 26-line ad-funnel checklist; he doesn't run paid ads.
- [objection-crusher](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/copy-chief/objection-crusher) — Five-line objection prompt; nothing Claude doesn't do unasked.

## 2026-10-23 — 26 reviewed · 1 ADD · 5 WATCH · 20 SKIP

### ADD — talking-head-editor
https://github.com/griffinwooldridge/talking-head-editor · lane: Post-production · F/L/C/O = 4/4/5/4 (17)

**What it does:** Raw talking-head recording in, finished video out. DeepFilterNet voice cleanup with a capped reduction and a sync check to zero samples, Whisper in pause-separated chunks so retakes aren't merged, cuts that wait for a word's real end (it catches soft '-ts' and '-ence' tails), automatic face reframing with punch-ins, word-timed captions, and motion graphics written as pure render(t) code on HyperFrames with real sub-frame motion blur. Frame counts are asserted at every stage.

**Why it's worth it for you:** The talking-head jobs agencies send him (founder pieces, explainers, interview pulls). Take selection, pause tightening and the clipped-tail check become scripts with an audit he can listen against, instead of an afternoon of blade work. Each graphic is a small JS file, so a client note like 'faster' or 'rethink that one' means editing one function and re-rendering it, not rebuilding a comp.

**Watch out for:** It renders a finished mp4, not a Premiere or Resolve timeline. video-editor-assistant (10-17 ADD) is the one that lands cuts in the NLE, and this one is for jobs delivered as a file. Transcription is English-only (small.en), so Hindi needs a model swap. setup.sh pip-installs torch, whisper and DeepFilterNet into a venv, pulls GSAP from cdnjs and runs pinned npx hyperframes. It's a single commit from a new author, so it's young.

### WATCH — Remotion skills (official)
https://github.com/remotion-dev/skills · lane: Building tools & sites · F/L/C/O = 3/4/5/3 (15)

Remotion's own skills for making video in React: 12 skills behind a router, including an editable Studio timeline, .cube LUT colour correction, FFmpeg silence detection and Whisper-WebGPU captions. Since 10-20 there's a version bump to 4.0.538 and one new render-performance rule (keep useCurrentFrame in the smallest component). Data-driven titles, map explainers and caption burn-ins as code he can version and re-render, with an editable Studio timeline for client tweaks. *Unchanged from last time: it pays off only once he starts a real Remotion project, and then it is an ADD. There's no licence file. The Remotion License most likely applies, which is free for individuals and small teams. The skills are copied several times inside the router folder.*

### WATCH — Check Skill (coder-eval)
https://github.com/UiPath/coder_eval/tree/main/plugins/coder-eval/skills/check-skill · lane: Wildcard · F/L/C/O = 3/3/5/4 (15)

Builds labelled positive and distractor requests and measures whether a skill's description triggers it (precision, recall, F1). The repo's six commits since 10-20 are harness fixes (Docker, Codex, delegate). The check-skill folder itself is unchanged. Puts a number on whether his own skills fire once the library grows and newer skills start dropping out of the listing. *Needs the coder-eval CLI, a sandbox and a paid agent run per row (16–24 runs). It overlaps skill-creator's own trigger evals. It becomes an ADD when he maintains several custom skills and sees misfires.*

### WATCH — 超级峰的视频设计方法论 (chaojifeng-video-design)
https://github.com/mileson/chaojifeng-video-design · lane: Post-production · F/L/C/O = 3/3/5/4 (15)

A Chinese-language director's method for explainers, product demos, launch films and music visuals: a story line and audience change first, then shot jobs, a sound event map, music cue selection by section, and a delivery record that keeps 'not watched / not listened' marked as unverified. Stdlib scripts validate the plan and measure a finished film (cut points, loudness, true peak, energy dips) and audit SFX hits against the event map. Its film_probe and reference-film-study method (measure a reference's cuts, loudness and sound events, then separate what was measured from what was inferred) would help when he breaks down a reference spot for a client. *All instructions are in Chinese, and it is aimed at motion-design explainers and launch films, not his edit work. It would be an ADD if an English edition appears or he takes on product-launch or explainer jobs where the music-led planning pays off.*

### WATCH — Sepia (de-AI writing)
https://github.com/Nanako0129/sepia · lane: AI filmmaking · F/L/C/O = 3/3/5/4 (15)

De-AI writing that fixes narrative structure before word choice, based on the StoryScope study. It splits work into write, review, refactor and recreate, uses a two-stage defect-list protocol, and has domain routes for fiction, journalism, release notes and tickets. It ships behavioural evals. Rescuing a treatment, synopsis or festival statement drafted with AI: a defect list first, then minimal fixes, deepest layer first. *It overlaps better-writing (10-17 ADD), and you only need one. It's prose-only, with no screenplay format. It would be an ADD if it beats better-writing head to head on one of his treatments.*

### WATCH — claude-real-video
https://github.com/HUANGCHIHHUNGLeo/claude-real-video · lane: Post-production · F/L/C/O = 4/3/4/3 (14)

Lets Claude 'watch' a video: the crv CLI pulls scene-aware keyframes into 3x3 contact sheets plus a local Whisper transcript (optional speaker labels), and the skill reads the manifest and grids. It treats on-screen text and subtitles as untrusted data. Breaking down a reference ad or a client's rough cut by asking Claude about it directly, with timings, instead of describing it by hand. *The skill is a thin wrapper around a pip package. The code shipped on PyPI isn't the repo you read, and the CLI upsells a paid 'pro' tier. Its --cookies-from-browser option (off by default, passed through to yt-dlp) reads browser login cookies. It overlaps video-use (WATCH) and the ffmpeg-skill contact sheets. It would be an ADD if the extractor shipped inside the skill.*

### Skipped

- [claude-video-harness](https://github.com/skailabinfo/claude-video-harness) — A Russian-language harness for vertical talking-head reels on Remotion, with a taste interview, take and false-start detection, person matting for a poster frame, and Buffer publishing. talking-head-editor (today's ADD) does the same job in English with stronger cut rules.
- [saas-product-demo-video](https://github.com/noamdorr/saas-product-demo-video) — A Remotion playbook for 20–45 s SaaS demo films: an asset intake form, a 'vibe' read from a reference video via Gemini, and beat sync with librosa. It's sound but narrow (software product reels), and it leans on the Superpowers plugin.
- [Claude AI Music Skills](https://github.com/bitwize-music-studio/claude-ai-music-skills) — A well-built Suno album pipeline: concept, sourced research, lyrics with prosody and pronunciation checks, mastering and promo, across 50+ skills and an MCP server. Music albums aren't his work.
- [explainer-studio](https://github.com/reedodev/explainer-studio) — Korean-language storyboard.json to hand-drawn explainer MP4 in eight styles, with TTS through an unofficial Edge endpoint. It's a neat engine but far from Parth's work.
- [cc-tree](https://github.com/skymanbp/cc-tree) — Recursive radial-tree exploration (12 framings per node, 12 evidence fields per child, scored and recursed to convergence) with brainstorm, attack, design and code-audit presets. It's original but very token-heavy, and nothing in his week needs it.
- [vibe-creating-prompt](https://github.com/Alisa0808/vibe-creating-skill) — Judges whether a video-model prompt suits 'vibe' writing and rewrites it toward emotion and imagery over shot specs. cinematic-director (queued) already shapes prompts per tool, and with more rigour.
- [slide-wright](https://github.com/arifszn/slide-wright) — Themed reveal.js decks with a two-slide approval gate and PPTX/PDF export. The Slides artifact type and the installed pptx skill already cover his pitch decks.
- [flow-video-recorder](https://github.com/muayadjamal/flow-video-recorder) — Records narrated app walkthroughs with Playwright or Maestro on the iOS simulator, with cursor ripples, captions and TTS. It's off his lanes and failed the safety gate. ⚠️ ⚠️ Prerequisite step pipes a remote installer straight into bash (curl -Ls get.maestro.mobile.dev | bash)..
- [sales-enablement](https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement) — SaaS sales collateral for rep teams (battle cards, demo scripts); wrong shape for a filmmaker pitching agencies.
- [AlterLab FC Skills (cdm-preproduction et al.)](https://github.com/AlterLab-IEU/AlterLab-FC-Skills) — A university pack of 70+ persona prompts ('You are PreProductionPlanner…') in a fixed 150–300-line emoji template, including cinema preproduction, postproduction and screenwriter. They're generic job descriptions with no method or tools, and DirectorSKILL already covers shot lists better.
- [humanizer-ru (ilyautov)](https://github.com/ilyautov/humanizer-ru/tree/main/skills/humanizer-ru) — Russian-only de-AI editor with a marker scanner; careful but irrelevant to Parth.
- [seo-audit](https://github.com/coreyhaines31/marketingskills/tree/main/skills/seo-audit) — Thorough technical and on-page SEO audit, but his portfolio sites don't live on search traffic.
- [humanizer-ru (Vladimir-Human)](https://github.com/Vladimir-Human/humanizer-ru) — Russian-only de-AI editor; Parth doesn't write in Russian.
- [revops](https://github.com/coreyhaines31/marketingskills/tree/main/skills/revops) — B2B revenue-ops and lead-scoring design; a solo freelancer has no sales pipeline to run.
- [espresso-skill](https://github.com/LambdaTest/agent-skills/tree/main/espresso-skill) — Android Espresso test generator; he doesn't build Android apps.
- [flutter-testing-skill](https://github.com/LambdaTest/agent-skills/tree/main/flutter-testing-skill) — Flutter test generator; not his stack.
- [gauge-skill](https://github.com/LambdaTest/agent-skills/tree/main/gauge-skill) — Gauge BDD spec generator; not his stack.
- [schwartz-awareness-mapper](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/copy-chief/schwartz-awareness-mapper) — Lists Schwartz's five awareness levels in 50 lines; no repo licence.
- [mechanism-builder](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/copy-chief/mechanism-builder) — A 36-line 'unique mechanism' copy outline; no repo licence.
- [headline-matrix](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/copy-chief/headline-matrix) — A list of seven headline angles; Claude does this unprompted.

## 2026-10-22 — 24 reviewed · 2 ADD · 3 WATCH · 19 SKIP

### ADD — Premiere Pro MCP: edit-premiere-project
https://github.com/leancoderkavy/premiere-pro-mcp · lane: Post-production · F/L/C/O = 5/4/5/4 (18)

**What it does:** Operating skill for a local Premiere Pro MCP server: a CEP and UXP bridge with 436 tools. Claude inspects the timeline first, builds an edit plan, previews it, and applies it only with a one-time confirmation token. It reads the timeline back after each change, refuses raw ExtendScript unless asked, and checks exports frame by frame. Updated 2026-10-21; telemetry stays off unless you set a PostHog key.

**Why it's worth it for you:** Premiere work for agencies gets done from Claude: rough cuts and selects from transcripts, cleaning up bins and metadata (Scene/Shot/Take, ALE intake), verifying a delivery export against the spec, and OTIO/XML conform checks, all against the open project with an undo-safe preview first. It also sits right next to his own UXP command palette: same host, an MCP surface he can study or extend.

**Watch out for:** The skill does nothing without the MCP server and its CEP panel running on his Mac (installed with npx and opened in Premiere). That is a computer-side install of a large codebase I only spot-checked: endpoints, telemetry and the skill's safety rules, not all 880 files. The server's own plugin ships this skill, so install it from there instead of as a loose zip. That's why it isn't queued.

### ADD — Screenwriting Skills (26-skill pack)
https://github.com/jtydhr88/screenwriting-skills · lane: AI filmmaking · F/L/C/O = 4/4/5/4 (17)

**What it does:** 26 dramaturgy skills distilled from 47 craft books and 23 volumes of scripts: McKee, Field, Truby, Chekhov, Ozu, Japanese, Korean and French practice, series bibles, writers' room. Each skill is a numbered principle set with checklists, and a workflow skill routes between them. The bodies are in Chinese, but it answers in whatever language you ask in.

**Why it's worth it for you:** Script development for the features he wants to direct: diagnosing a scene that "doesn't turn" (McKee's value check, beats, enter late and leave early), premise and theme tests, and series-engine bibles. It argues from named sources instead of generic story advice, which fits his first-principles taste.

**Watch out for:** Not queued, for two reasons. The NOTICE carves the quoted book and script excerpts out of the MIT licence, so redistributing the pack isn't clean. And installing all 26 skills would put 26 descriptions on his shelf. Install it straight from the author's plugin marketplace, or pick sw-workflow, sw-scene-craft and sw-story-structure. About 850 KB of skill text in total, so expect heavy context.

### WATCH — video-use
https://github.com/browser-use/video-use · lane: Post-production · F/L/C/O = 4/3/5/3 (15)

Edit by conversation from a word-level transcript. Claude packs the takes into a phrase view, confirms a plain-English strategy, writes an EDL, extracts each segment with 30 ms fades, adds overlays and burns subtitles last. Its hard rules for ffmpeg correctness are excellent. Fast social cut-downs and talking-head edits from raw takes without opening an NLE. The take-picking and EDL logic is the reusable part. *Renders a finished mp4, not a Premiere or Resolve timeline. Transcription needs a paid ElevenLabs key. It overlaps the queued ffmpeg-skill and the video-editor-assistant ADD. It would be an ADD if it exported the EDL as XML/OTIO for an NLE, or ran local Whisper.*

### WATCH — Creative Director
https://github.com/smixs/creative-director-skill · lane: Business & outreach · F/L/C/O = 3/3/5/4 (15)

Ad-concepting engine: Pollard's idea levels, insight mining, three methods from different families (SIT/TRIZ, bisociation, inversion), and weighted scoring against a 571-campaign case library with saturation caps. It loops until an idea clears 9. Local helper scripts only maintain the library. CC-BY-4.0. Writing the idea section of a director's treatment, or pitching a spec concept to an agency: it tests whether a concept is derivative before he shoots a single frame. *Built for agency creatives, not directors: most of Parth's agency work arrives with the concept decided. Heavy (dozens of reference files). It would be an ADD once he starts pitching original concepts or spec ads, ideally paired with the treatment-writer WATCH.*

### WATCH — object-separation
https://github.com/Barty-Bart/motion-graphics/tree/main/skills/object-separation · lane: Post-production · F/L/C/O = 4/3/4/3 (14)

Local SAM 2.1 rotoscoping in one SKILL.md. It picks the model size from the machine, places the click points on a gridded frame, propagates in 60-frame chunks and writes a mask per frame plus a green-tinted check render. Nothing is uploaded. Quick mattes for a product or person when Resolve's Magic Mask or Premiere's object mask struggles, or for feeding AE and compositing scripts. *Masks are computed at 960 px wide and hard-edged, so they don't hold up at 4K finishing. Output is a PNG matte sequence, not an alpha ProRes. It would be an ADD with source-resolution mattes, edge refinement and an alpha-channel export.*

### Skipped

- [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) — 51 code-rendered film styles (oil paint, ukiyo-e, satellite briefing and more), each with a demo film. Inventive, but the skill clones and updates the library at run time and then runs its Node tools. ⚠️ ⚠️ Self-update: the skill's setup.sh clones and pulls the library from GitHub on each use, so the code that runs can change after review..
- [Humanizer](https://github.com/blader/humanizer) — Careful, maintained (v3.1) AI-tell remover with ranked patterns, a no-new-facts rule and voice matching from a sample. Good, but it does the same job as better-writing, already an ADD; not clearly better.
- [Adobe Premiere Pro MCP (hetpatel-11)](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) — Another Premiere MCP with an install/operate skill. It sends anonymous telemetry by default to the author's Cloudflare worker (documented, opt-out). leancoderkavy/premiere-pro-mcp does the same job with telemetry off by default and preview/confirm edit plans.
- [VideoDB](https://github.com/video-db/skills) — SDK guide for VideoDB's cloud: upload or stream video, index scenes and speech, search moments, subtitles and overlays. It needs client footage uploaded to a third-party cloud and a paid key. The local parts (transcode, subtitles) are already covered by ffmpeg-skill.
- [claude-youtube-editor](https://github.com/hassancs91/claude-youtube-editor) — One YouTuber's full channel pipeline as a repo template: AssemblyAI cut, Remotion screens, ElevenLabs voice cleanup, SFX, thumbnails and an upload script, wired to several paid APIs. Well made, but built for a solo creator's channel, not client post.
- [github-image-upload](https://github.com/drogers0/gh-image/tree/main/skills/github-image-upload) — Attaches screenshots and files to GitHub PRs and issues through GitHub's internal upload endpoint. A dev convenience, mis-filed under Post-production. ⚠️ ⚠️ Non-image uploads use the full-access user_session cookie, read from a logged-in browser (macOS Keychain prompt). Opt-in and documented, but fails the gate..
- [pricing](https://github.com/coreyhaines31/marketingskills/tree/main/skills/pricing) — SaaS tiering and Van Westendorp pricing. Freelance day rates and post packages aren't SaaS packaging.
- [product-marketing](https://github.com/coreyhaines31/marketingskills/tree/main/skills/product-marketing) — Builds a positioning/ICP context file that the rest of the pack reads. Useful only if he adopts the marketing pack.
- [site-architecture](https://github.com/coreyhaines31/marketingskills/tree/main/skills/site-architecture) — Sitemap, navigation and URL planning with Mermaid templates. Overkill for portfolio microsites; Claude does this unprompted.
- [FireRed OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) — A separate Chinese editing-agent app with its own LLM/VLM keys and a web UI. The Claude skills only install it and drive its session API, and the instructions are mostly in Chinese. Last updated July.
- [Beautiful Prose](https://github.com/SHADOWPR0/beautiful_prose) — A ban-list style contract (no em dashes, no not-X-but-Y) with register tags. Covered better by better-writing (ADD) and humanizer. Unmaintained since December.
- [cypress-skill](https://github.com/LambdaTest/agent-skills/tree/main/cypress-skill) — Generic Cypress test writer plus TestMu cloud setup. Claude writes Cypress tests fine unprompted.
- [programmatic-seo](https://github.com/coreyhaines31/marketingskills/tree/main/skills/programmatic-seo) — Template pages at scale for SEO. Not relevant to a portfolio.
- [signup](https://github.com/coreyhaines31/marketingskills/tree/main/skills/signup) — Signup-funnel CRO. His tools have no signup funnels.
- [cucumber-skill](https://github.com/LambdaTest/agent-skills/tree/main/cucumber-skill) — Gherkin/BDD test generator with a vendor-cloud upsell. Parth's tools don't use BDD.
- [video-color-grading (each::sense)](https://github.com/eachlabs/skills/tree/main/skills/video-color-grading) — Sends your video URL and a prompt like "teal shadows, warm highlights" to a paid each::sense API. No scopes, LUTs or node structure, and no licence file. Not a grading workflow.
- [detox-skill](https://github.com/LambdaTest/agent-skills/tree/main/detox-skill) — React Native E2E tests. Parth builds no React Native apps.
- [cutaway](https://github.com/half144/cutaway) — Repo is no longer public (clone refused), so there's nothing to review.
- [avatar-extraction](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/foundations/avatar-extraction) — A 40-line buyer-persona template with no method behind it, and no repo licence.

## 2026-10-21 — 20 reviewed · 0 ADD · 2 WATCH · 18 SKIP

### WATCH — Axiom (Apple OS development)
https://github.com/CharlesWiltgen/Axiom · lane: Building tools & sites · F/L/C/O = 4/3/5/3 (15)

A large, actively maintained Apple-platform plugin: 285 skills (including axiom-macos for windows, menus, sandboxing, notarization and AppKit bridging), 42 agents, hooks, and six arm64 CLI tools (axbuild, xclog, xcsym, xcui, xcprof, xcproject) that give Claude short build, crash and profiling summaries. The tools ship as prebuilt Mach-O binaries. Their Go and Swift source is in the repo, but I couldn't check that the binaries match it. When he next works on the macOS delivery-spec QC app: sandbox and security-scoped bookmark access to client drives, Developer ID notarization, and axbuild's short error summary instead of a truncated xcodebuild log. *It's a plugin, not one skill: 285 skill descriptions would crowd his shelf and it uses 'You MUST use this skill' triggers. It becomes an ADD when he's actively building the QC app again, installed as just axiom-macos plus axiom-swiftui with the tools built from source.*

### WATCH — LintLang
https://github.com/hermes-labs-ai/lintlang · lane: Building tools & sites · F/L/C/O = 3/3/5/3 (14)

Deterministic offline linter for SKILL.md, CLAUDE.md, tool definitions and system prompts. The skill is host-neutral, now pins lintlang 0.8.3 via uvx (which fixes a BOM-less UTF-16 file scanning silently clean and adds .cursor/rules discovery), treats scan output as untrusted, and says plainly that PASS doesn't mean safe. A quick second opinion before publishing his own skills or the CLAUDE.md for his QC app or UXP panel. *Still heuristic, and the rules keep changing between versions. Leave the optional after-every-edit hook off. It becomes an ADD if he starts writing skills regularly and the rule set settles.*

### Skipped

- [last30days](https://github.com/mvanhorn/last30days-skill) — Recent-topic research across Reddit, X, YouTube, HN and more, ranked by engagement. Its scripts include macOS Chrome/Safari cookie extraction that decrypts with the Keychain 'Safe Storage' key (consent-gated, but it is browser-credential access), and it ships 580 files. It's a research tool, not post-production; Claude's own search covers most of it. ⚠️ Bundled scripts read and decrypt browser cookies via the macOS Keychain (opt-in, but fails the gate).
- [youtube-fetcher (Video Fetcher to Markdown)](https://github.com/JimmySadek/youtube-fetcher-to-markdown) — Pulls captions (or a yt-dlp download plus local Whisper) from YouTube, Instagram, TikTok and others into an Obsidian note with timestamps and a frame contact sheet. Well built and careful (browser cookies only when the user asks), but it is note-taking for reference videos, not a post-production task he does on jobs.
- [video-editing (V3)](https://github.com/maxazure/video-editing-skill) — A 2,900-line, mostly Chinese SKILL.md plus ~450 files of FFmpeg scripts for Xiaohongshu/Douyin short-form talking-head videos (transcribe, rough cut, multicam switch, captions, platform lint, CapCut/EDL export). Its timeline and multicam tools overlap the queued ffmpeg-skill, which does the same job tidier and in English; this one is tuned to Chinese social platforms. Only SKILL.md and the network-touching code (font downloads, optional Pexels/OpenAI keys) were read, not every script. MIT is stated in the README with no LICENSE file.
- [NoizAI skills](https://github.com/NoizAI/skills) — Ten skills wrapping Noiz's paid TTS, voice-cloning, sound-FX and music API (local Kokoro fallback for TTS). Mostly companion-voice and 'chat with anyone' cloning; no fit for scratch VO or client work over tools he already uses.
- [cro](https://github.com/coreyhaines31/marketingskills/tree/main/skills/cro) — SaaS landing-page and form conversion audits. His portfolio's contact form doesn't need an A/B testing framework.
- [yuwen-publish-precheck](https://github.com/yuwen-cool/yuwen-publish-precheck) — Pre-publish moderation check for Douyin, Xiaohongshu and WeChat Channels copy, with sourced rules and rewrites. Careful work, but only for Chinese platforms.
- [epic-breakdown-advisor](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/epic-breakdown-advisor) — Splits product epics into user stories with Richard Lawrence's nine patterns. Product-management only; was filed under AI filmmaking because of the word 'story'. CC BY-NC-SA licence.
- [pol-probe-advisor](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/pol-probe-advisor) — Picks a 'proof of life' prototype type for a product hypothesis. Product-management only; no film or client use.
- [ads](https://github.com/coreyhaines31/marketingskills/tree/main/skills/ads) — Paid-media playbooks for Google, Meta and LinkedIn campaigns. He doesn't buy ads for his own work.
- [analytics](https://github.com/coreyhaines31/marketingskills/tree/main/skills/analytics) — GA4/GTM event-tracking setup and audits. Claude already handles the one-off tracking snippet a microsite needs.
- [content-strategy](https://github.com/coreyhaines31/marketingskills/tree/main/skills/content-strategy) — SaaS blog and topic-cluster planning. Not how he gets work.
- [onboarding](https://github.com/coreyhaines31/marketingskills/tree/main/skills/onboarding) — Post-signup activation for SaaS products. No fit.
- [screen-creative-skills](https://github.com/GongLingRui/screen-creative-skills) — 31 short Chinese-drama development skills (script and IP evaluators, plot-point and character analysers, novel screening) with English copies. Each one is a scoring table plus an output template; the evaluator grades 'ideological value'. Claude gives deeper script notes unprompted. The latest commit only touched the README.
- [user-story-mapping-workshop](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/user-story-mapping-workshop) — Facilitates an agile user-story-mapping workshop. Software product process, unrelated to his work.
- [cicd-pipeline-skill](https://github.com/LambdaTest/agent-skills/tree/main/cicd-pipeline-skill) — Templates for test pipelines in GitHub Actions, Jenkins, GitLab and Azure, steering toward LambdaTest. Claude writes a GitHub Actions file for his apps unprompted.
- [capybara-skill](https://github.com/LambdaTest/agent-skills/tree/main/capybara-skill) — Ruby/RSpec Capybara test generator with a LambdaTest cloud section. He doesn't write Ruby.
- [codeception-skill](https://github.com/LambdaTest/agent-skills/tree/main/codeception-skill) — PHP Codeception test generator. Not his stack.
- [popups](https://github.com/coreyhaines31/marketingskills/tree/main/skills/popups) — Conversion popups and exit-intent modals. No use for a filmmaker's site.

## 2026-10-20 — 28 reviewed · 2 ADD · 3 WATCH · 23 SKIP

### ADD — cinematic-director (DirectorSKILL)
https://github.com/wuwangzhang1216/DirectorSKILL · lane: AI filmmaking · F/L/C/O = 5/4/5/4 (18)

**What it does:** A director and previs skill. It turns a script, a brief or a single keyframe into a beat sheet, a director's book, blocking, a shot list with coverage and risk scores, keyframe prompts and image-to-video motion prompts, plus sound and edit plans. It also carries a coded failure manual (F1–F19) with a repair cost ladder and 20 optional director-style lenses.

**Why it's worth it for you:** It changes how he writes AI-video prompts and fixes failed ones. Each clip gets one camera move and one action that ends in a stated end state, and the same invariant text is repeated in every prompt. The prompt shape is picked to suit the tool (motion-only, full description, first/last frame, or timestamped multi-shot). A failure like 'face changed' or 'slideshow' maps to a code and the cheapest fix, instead of random re-rolls. It also covers the edit plan for cutting the clips together.

**Watch out for:** Markdown only, no scripts (about 11k lines of references, loaded only a section at a time). Most of each director-style file is in Chinese, with English summaries. The tool-capability tables are a 2026-08 snapshot and will go stale. It is clearly stronger than the four storyboard skills on WATCH, so those can probably be dropped. The history is one squashed commit, though it has a CHANGELOG at v2.1.0 and CI-checked evals.

### ADD — after-effects
https://github.com/aedev-tools/adobe-agent-skills/tree/main/skills/after-effects · lane: Post-production · F/L/C/O = 4/4/4/4 (16)

**What it does:** Lets Claude drive After Effects on macOS. runner.sh uses osascript/JXA to make AE run an ExtendScript file, with arguments and results passed through JSON files. It ships 43 ES3 scripts: audits (project, missing footage, expression errors, fonts) and actions (relink footage, font/expression replace, comps from CSV, SRT import, batch render queue, incremental save), plus nine rule files on ExtendScript's limits.

**Why it's worth it for you:** Agency AE cleanup and versioning becomes a chat request: audit a handed-over project, relink footage from a new drive, swap a font across the project, conform fps or resolution on every comp, build lower-third variants from a CSV, queue 16x9 and 9x16 renders. Changes are wrapped in undo groups and risky ones dry-run first. It sits alongside his UXP and pipeline-TD work.

**Watch out for:** macOS only, and AE's 'Allow Scripts to Write Files and Access Network' preference must be on. The skill hard-codes ~/.claude/skills/after-effects-assistant but its folder is named after-effects, so fix the name on install. Scripts Claude writes for itself run without review except for operations it treats as destructive. runner.sh doesn't escape the script path, so avoid paths with quotes. One commit from March 2026 and none since. Total 16, so it misses the adoption bar of 17.

### WATCH — video-edit
https://github.com/tenfoldmarc/video-edit-skill · lane: Post-production · F/L/C/O = 3/3/5/4 (15)

Turns raw 9:16 talking-head clips into a finished Instagram reel. It transcribes with faster-whisper, keeps the last clean take of each line in an EDL, assembles a CFR A-roll, adds HyperFrames/GSAP overlays and SFX, and checks every cut frame by frame inside the Reels safe zone. The take-selection and dead-air pass on talking-head work: an EDL built from the transcript, plus a frame-accurate cut check on the render instead of scrubbing by eye. *Built around one creator's IG look (fixed looks, a hard-coded 'follow' insert, Apify scraping of his reels), and it renders HTML rather than producing an NLE timeline. Setup pulls npx hyperframes and remote SFX. It has no licence. It would be an ADD if the take-picking/EDL stage worked on its own and exported XML/EDL for Premiere or Resolve.*

### WATCH — motion-video-director
https://github.com/Miftahul-Islam-Efaz/Motion-graphics-skill · lane: Post-production · F/L/C/O = 4/3/4/3 (14)

A director, motion-designer and sound-designer workflow for code-rendered video. Per-project taste and progress files, one beats.json driving both visuals and SFX, deterministic Playwright canvas renders, contact-sheet previews before export, and loudness/peak QA. Promo or motion pieces for his own tools and clients: one cue file drives animation and sound, and references get broken into timed contact sheets first. *Commercial single-user licence despite the public repo, so he'd need to buy it or get the author's OK. It overlaps the installed animation skills. It would be an ADD if relicensed and proven on a real promo.*

### WATCH — cold-email
https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email · lane: Business & outreach · F/L/C/O = 3/3/5/3 (14)

Cold outreach, now v2.2 with ten reference files and evals. The update moves it further into multichannel SDR operations: sending domains, LinkedIn automation, cadences by tier, AI-SDR reply triage. The value-first teardown play is still the useful part for agency pitching: ask permission first, then send a short video with three specific fixes to their reel or delivery. *The update moves it further from a freelancer sending ten emails. It becomes an ADD only as a slimmed freelancer variant; otherwise copy outbound-plays.md §1 by hand.*

### Skipped

- [remotion-motion-graphics](https://github.com/haidrrrry/claude-remotion-skill) — Remotion style guide plus snippet library. Mostly general motion-design hygiene that overlaps the installed animation skills and Remotion's official skills (on WATCH).
- [claudemy](https://github.com/assafkip/claudemy) — Researches a topic and renders a cited two-host audio course of 2-minute lessons. A neat idea, but personal learning, not any of Parth's lanes.
- [telegram-checklist](https://github.com/bablobanov/hermes-telegram-checklist) — Creates native Telegram checklists from a Telethon user session (Hermes agent). Careful scoping, but no tie to any of Parth's lanes.
- [3d-logo](https://github.com/hasuwini77/3d-logo-skill/tree/main/skills/3d-logo) — Generates a React Three Fiber spinning-coin component from a logo. Well made, but a one-off effect that wouldn't change any recurring task.
- [frontend-slides](https://github.com/zarazhangrui/frontend-slides) — Animated single-file HTML slide decks with style previews. It overlaps frontend-design and the Slides artifact type he already has.
- [emails](https://github.com/coreyhaines31/marketingskills/tree/main/skills/emails) — SaaS lifecycle and drip email sequences. A freelancer pitching agencies doesn't run automated nurture flows.
- [free-tools](https://github.com/coreyhaines31/marketingskills/tree/main/skills/free-tools) — Plans free tools as SEO lead magnets. Mildly interesting given his own tools, but SaaS-growth framing and one-off.
- [superCMO-skills](https://github.com/SupercmoHQ/superCMO-skills) — Marketing UGC/ad-video factory (AI actors, product photos) that runs on seven paid API keys (fal, WaveSpeed, ElevenLabs, Gemini…). It's e-commerce ad generation, not the editing or filmmaking Parth does.
- [youtube-clipper](https://github.com/op7418/Youtube-clipper-skill) — Downloads YouTube videos, chapters them and burns Chinese-English bilingual subtitles. It's aimed at repurposing other people's videos, untouched since January, and covered by ffmpeg-skill for the mechanics.
- [ai-film-skills (re-upload)](https://github.com/Jv1337x/ai-film-skills) — Malicious re-upload of 62656456/ai-film-skills. The README is rewritten as a 'download the application' page whose button links to a zip in the repo containing util.exe (no source), Application.cmd and cert.txt. Only listed, never extracted or run. ⚠️ ⚠️ Malware lure: bundled Windows executable with launcher, linked from the README's download button..
- [privacyscrubber-guard](https://github.com/moxno/privacyscrubber-mcp/tree/main/skills/privacyscrubber-guard) — PII/secret scrubbing in front of coding agents, which needs an npx MCP server. Its core is a 1.1 MB minified proprietary ps-pii-engine.cjs, and that is a lot of trust to extend for no gain to Parth's work.
- [fish-audio](https://github.com/AceDataCloud/Skills/tree/main/skills/fish-audio) — TTS and voice cloning through AceDataCloud's paid API reseller. It's a thin API wrapper; going straight to the voice tool he already uses is simpler.
- [user-story](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/user-story) — Agile user stories with Gherkin acceptance criteria. Product-management backlog work, mis-shelved under AI filmmaking.
- [user-story-mapping](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/user-story-mapping) — Jeff Patton story maps for software backlogs. Not Parth's work; mis-shelved under AI filmmaking.
- [user-story-splitting](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/user-story-splitting) — Story-splitting patterns for agile backlogs. Not Parth's work; mis-shelved under AI filmmaking.
- [video-production + agent-video-producer](https://github.com/travisjneuman/.claude/tree/main/skills/video-production) — Generic film-school primer (shot types, three-point lighting, export table) plus a thin subagent wrapper. Well below Parth's level, with a few loose facts.
- [appium-skill](https://github.com/LambdaTest/agent-skills/tree/main/appium-skill) — Appium mobile test generation that steers you toward LambdaTest's cloud grid. Parth doesn't ship mobile apps.
- [behat-skill](https://github.com/LambdaTest/agent-skills/tree/main/behat-skill) — PHP Behat BDD test generation. Outside his stack.
- [behave-skill](https://github.com/LambdaTest/agent-skills/tree/main/behave-skill) — Python Behave BDD test generation. Not useful for his solo tools; Claude writes plain tests unprompted.
- [marketing-ideas](https://github.com/coreyhaines31/marketingskills/tree/main/skills/marketing-ideas) — A list of SaaS marketing tactics. Generic brainstorming Claude does unprompted.
- [venice-x402](https://github.com/veniceai/skills/tree/main/skills/venice-x402) — API reference for Venice wallet credits paid in USDC. No connection to his work.
- [venice-crypto-rpc](https://github.com/veniceai/skills/tree/main/skills/venice-crypto-rpc) — Pay-per-call blockchain JSON-RPC proxy reference. No connection to his work.
- [venice-augment](https://github.com/veniceai/skills/tree/main/skills/venice-augment) — Venice's paid scrape/search/parse endpoints. Claude already reads documents and searches the web.

## 2026-10-19 — 24 reviewed · 0 ADD · 1 WATCH · 23 SKIP

### WATCH — Treatment Writer
https://github.com/ur-grue/autopunk-media-skills/tree/main/skills/screenwriting/development/treatment-writer · lane: AI filmmaking · F/L/C/O = 4/3/4/2 (13)

Prompt-only skill (MIT) that turns a logline, protagonist, act summaries and theme into a 900–1,300-word present-tense treatment with a fixed structure (title block, logline, premise, ≤5 characters with want/flaw, three-act prose, theme) and a quality checklist; worked example included. Gives Parth a consistent, producer-ready treatment format for his own feature ideas and for pitching to production houses, instead of re-specifying length and structure each time. *It is a template, not new capability: Claude writes treatments unprompted, and the word budget is short for a feature treatment. Would become an ADD if chained with its sibling beat-sheet-builder/logline-writer into a development pack with an editable length and genre-voice setting. Part of a 412-skill collection, so cherry-pick only.*

### Skipped

- [Spark Video (episode producer)](https://github.com/modelstudioai/skills/tree/main/skills/spark-video) — Serious screenwriter→director→render→review→stitch pipeline for AI short dramas on Alibaba Bailian/Wan, with confirmation gates. Skipped: its SKILL.md tells the agent to git-pull the skill from origin at the start of every session, so code that was never reviewed would run, and it is locked to DashScope. ⚠️ ⚠️ Self-update: instructs the agent to `git pull` the skill (incl. scripts) at every session start — unreviewed code updates..
- [Picture Lock Checklist](https://github.com/ur-grue/autopunk-media-skills/tree/main/skills/tv-documentary/post-production/picture-lock-checklist) — Well-written checklist template (editorial, clearances, technical, accessibility, delivery, lock verdict), but it only reformats counts the user types in; Claude produces the same checklist when asked, and Parth's own delivery-spec QC app covers the technical half against real files.
- [Vox Video Director](https://github.com/modelstudioai/skills/tree/main/skills/vox-video-director) — Topic → paper-collage explainer video via the Bailian CLI plus ffmpeg; competent scripts, but it requires an Alibaba Bailian account and uploads media to a third-party host, and the one look it makes is a trend style.
- [copywriting](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting) — Strongest of the pack: diagnose-before-drafting (respect an existing voice), a three-question line gate and a "leave it alone" test. Still built around SaaS conversion pages; better-writing covers Parth's portfolio and pitch prose, so not worth a shelf slot.
- [Broadcaster Pitch Writer](https://github.com/ur-grue/autopunk-media-skills/tree/main/skills/tv-documentary/business/broadcaster-pitch-writer) — Generic documentary-commissioning pitch template (logline, audience, comps, financing); aimed at UK broadcaster pitches rather than Parth's agency and production-house work, and adds little over asking Claude directly.
- [Cinematic Storyboard Sheet](https://github.com/0xagi-bsky-social/Codex-Skills/tree/main/cinematic-storyboard-sheet) — Codex-only: the whole skill is one prompt for Codex's image_gen tool and it forbids any other output, so it does nothing in Claude.
- [ad-creative](https://github.com/coreyhaines31/marketingskills/tree/main/skills/ad-creative) — Thorough performance-ad copy system (hooks, format taxonomy, platform specs) for SaaS paid acquisition; ad copy at scale is not Parth's work.
- [Story pitch](https://github.com/jamditis/claude-skills-journalism/tree/main/journalism-core/skills/story-pitch) — Solid pitch guide, but for journalists pitching editors and outlets; not Parth's client or production-house pitching.
- [copy-editing](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copy-editing) — Seven-sweep marketing-copy edit for conversion pages; overlaps forjd/better-writing (already an ADD) for the editing Parth actually does.
- [Wonda CLI](https://github.com/degausai/wonda) — A 2,264-line manual for a paid ($19.99/mo) content SaaS; installs via `curl | bash`, and includes Reddit account creation and LinkedIn/X automation. ⚠️ ⚠️ Install path is `curl -fsSL wonda.sh/install.sh | bash`; skill drives social-account creation and automation..
- [Transcript Timecoder](https://github.com/ur-grue/autopunk-media-skills/tree/main/skills/tv-documentary/post-production/transcript-timecoder) — Estimates timecodes from words-per-minute rather than reading media or ASR timings, so the "broadcast-standard" timecodes it writes into a paper edit are guesses that will not line up with the footage.
- [venice-audio-transcription](https://github.com/veniceai/skills/tree/main/skills/venice-audio-transcription) — Endpoint reference for Venice's paid transcription API; useful only with a Venice account, and the ffmpeg-skill already queued covers local ASR.
- [storyboard (PM)](https://github.com/deanpeters/Product-Manager-Skills/tree/main/skills/storyboard) — A six-frame product user-journey storyboard for PMs, not a film storyboard; CC BY-NC-SA.
- [venice-models](https://github.com/veniceai/skills/tree/main/skills/venice-models) — Model catalogue endpoint docs for one vendor's API.
- [venice-billing](https://github.com/veniceai/skills/tree/main/skills/venice-billing) — Billing and usage endpoint docs for one vendor's API.
- [competitors](https://github.com/coreyhaines31/marketingskills/tree/main/skills/competitors) — SEO "X vs Y" and alternatives landing pages for SaaS products; no use for a freelance editor.
- [gtm-strategy](https://github.com/phuryn/pm-skills/tree/main/pm-go-to-market/skills/gtm-strategy) — Product-launch GTM outline for software products; not Parth's work (it was mis-shelved under Post-production on the catalogue).
- [Taisly social posting](https://github.com/taisly/agent) — Wrapper for a third-party SaaS that posts short-form video to TikTok/Reels/Shorts; publishing, not post-production.
- [scroll-stopping-creative](https://github.com/realkimbarrett/advertising-skills/tree/main/skills/operator-os/scroll-stopping-creative) — 22-line list of attention principles; no method, no examples, and the repo has no licence file.
- [langchain-crawlbase](https://github.com/crawlbase/langchain-crawlbase) — A Python LangChain package for a paid scraping API; contains no SKILL.md at all.
- [n8n-nodes-crawlbase](https://github.com/crawlbase/n8n-nodes-crawlbase) — An n8n node package for a paid scraping API; not a Claude skill, no licence file.
- [api-skill suite](https://github.com/LambdaTest/agent-skills/tree/main/api-skill) — Eighteen generic REST/GraphQL API design and testing skills plus an installer shell script; enterprise backend work that is not part of Parth's toolmaking.
- [davinci-resolve (code-buddy)](https://github.com/phuetz/code-buddy) — Listed on skills.sh, but no DaVinci Resolve skill exists in the repo at 7b77f46, and the repo is under the Business Source License (not redistributable).

## 2026-10-18 — 20 reviewed · 1 ADD · 1 WATCH · 18 SKIP

### ADD — ffmpeg-skill
https://github.com/kajisho5/ffmpeg-skill · lane: Post-production · F/L/C/O = 5/4/5/4 (18)

**What it does:** 42 stdlib-Python FFmpeg tools behind one contract: probe first, edit, then check.py against a platform spec and look.py contact sheets before reporting. Covers lossless cuts, loudness to LUFS/true-peak targets, audio sync with drift fix, multicam, LUT and HDR-to-SDR, proxies, batch, and timeline export to FCPXML/EDL/OTIO.

**Why it's worth it for you:** The mechanical end of agency jobs (proxies for a folder of rushes, a -14 LUFS / -1 dBTP pass, a lav-to-camera sync, the same master cut down for Reels, Shorts and YouTube with a PASS/FAIL check on each) becomes one sentence to Claude with a five-line, measured report. It also writes an EDL or FCPXML you can open in Resolve or Premiere. It sits next to your delivery-QC app, it doesn't replace it.

**Watch out for:** Needs ffmpeg/ffprobe on whatever machine Claude runs it on. It is file-level only and doesn't drive Resolve or Premiere; video-editor-assistant (yesterday's ADD) covers those. The captioning and template defaults are aimed at social video. Transcription needs a local whisper/parakeet, which downloads its model on first use.

### WATCH — Director Master (山音超级导演大师)
https://github.com/Shanyin-ai/shanyin-director-master · lane: AI filmmaking · F/L/C/O = 4/3/4/4 (15)

A gated five-step director workflow: tone, then rhythm plan, then script trims, then a shot breakdown, ending in a nine-column storyboard xlsx (shot no., timecode, angle, size, picture, location, sound, notes, narrative purpose). It has a rule to write only what the camera can see, and shot-length baselines taken from 551 shots of real shorts. Turning a script into a shot-by-shot plan with a stated purpose for every shot is the prep work for the directing you're moving into. It pauses for your sign-off at each step instead of dumping a whole table at once. *Everything is in Chinese, including the trigger description, so it won't fire on English requests. An English fork or bilingual description would make it an ADD. MIT, pure markdown, nothing to run.*

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

## 2026-10-17 — 19 reviewed · 3 ADD · 3 WATCH · 13 SKIP

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

### WATCH — H3 Storyboard & Performance
https://github.com/phileiny/h3-storyboard-skill · lane: Wildcard · F/L/C/O = 3/3/4/5 (15)

Two thousand lines of measured findings on getting acting out of MiniMax H3 — which directions actually render emotion, with each rule marked by how it was verified. The rarest thing in AI film: performance direction tested against output, not vibes. Composition-before-content is the spine. *Written in Traditional Chinese and tied to one model. Worth a translated read even if you never install it.*

### WATCH — AI Video Storyboard
https://github.com/aicontentskills/ai-video-storyboard-skill · lane: AI filmmaking · F/L/C/O = 4/3/3/3 (13)

Turns a brief into a multi-shot plan for videos longer than one AI generation, built on one good idea: consistency across shots beats any single perfect shot. Right instinct for The Second Cup and the mythic film — a locked look bible before generating. *Pure prompt, no tooling, ad-and-reel shaped rather than cinematic. Needs a scene-to-shot grammar and per-model prompt formats to become an ADD.*

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
