# premiere-pro (edit-premiere-project)

- **Source:** https://github.com/leancoderkavy/premiere-pro-mcp (`plugins/premiere-pro/skills/edit-premiere-project/`)
- **Author:** Premiere Pro MCP contributors (leancoderkavy). MIT, with `LICENSE` kept alongside.
- **Taken at commit:** `1cca748` (npm `premiere-pro-mcp` 1.24.3). The scout reviewed `324f830`; the skill changed by 2 lines since then, adding a safer timeout check.
- **Scout verdict:** ADD, 18/20 (vault T4). Installed 2026-10-24 at Parth's request.
- **Local changes:** none.
- **Needs:** the `premiere-pro` MCP server and its CEP panel on the Mac, connected to Claude. Without them the skill has nothing to drive.
- **Server check (2026-10-24):** the npm package has no install or postinstall scripts and uses stdio, local only, by default.
  HTTP mode (which binds 0.0.0.0) runs only with `start:http`, so don't use it. PostHog telemetry is off unless
  `POSTHOG_API_KEY` is set. The only outbound call is an update check against registry.npmjs.org. It shells out (`execFile`) to ffmpeg/ffprobe for media checks.
