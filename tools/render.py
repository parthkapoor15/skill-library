#!/usr/bin/env python3
"""Rebuild REVIEWS.md from reviews.json (the single source of truth).

Usage: python3 tools/render.py
"""
import json
import pathlib
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
ORDER = {"ADD": 0, "WATCH": 1, "SKIP": 2}


def total(r):
    return r["fit"] + r["leverage"] + r["craft"] + r["originality"]


def scores(r):
    return f'F/L/C/O = {r["fit"]}/{r["leverage"]}/{r["craft"]}/{r["originality"]} ({total(r)})'


def main():
    reviews = json.loads((ROOT / "reviews.json").read_text())
    runs = defaultdict(list)
    for r in reviews:
        runs[r["date"]].append(r)

    out = ["# Reviews", "",
           "Newest first. Generated from `reviews.json` by `tools/render.py` — "
           "see `SCOUT.md` for how verdicts are reached.", ""]

    for date in sorted(runs, reverse=True):
        rs = sorted(runs[date], key=lambda r: (ORDER[r["verdict"]], -total(r)))
        n = {v: sum(r["verdict"] == v for r in rs) for v in ORDER}
        out += [f'## {date} — {len(rs)} reviewed · {n["ADD"]} ADD · {n["WATCH"]} WATCH · {n["SKIP"]} SKIP', ""]
        if not n["ADD"] and not n["WATCH"]:
            out += ["Nothing cleared the bar this run.", ""]
        for r in rs:
            if r["verdict"] == "ADD":
                out += [f'### ADD — {r["name"]}',
                        f'{r["url"]} · lane: {r["lane"]} · {scores(r)}', "",
                        f'**What it does:** {r["summary"]}', "",
                        f'**Why it\'s worth it for you:** {r["why"]}', "",
                        f'**Watch out for:** {r["caveat"]}', ""]
            elif r["verdict"] == "WATCH":
                out += [f'### WATCH — {r["name"]}',
                        f'{r["url"]} · lane: {r["lane"]} · {scores(r)}', "",
                        f'{r["summary"]} {r["why"]} *{r["caveat"]}*', ""]
        skips = [r for r in rs if r["verdict"] == "SKIP"]
        if skips:
            out += ["### Skipped", ""]
            for r in skips:
                warn = f' ⚠️ {r["flag"]}.' if r["flag"] else ""
                out.append(f'- [{r["name"]}]({r["url"]}) — {r["summary"]}{warn}')
            out.append("")

    (ROOT / "REVIEWS.md").write_text("\n".join(out))
    print(f"REVIEWS.md written: {len(reviews)} reviews across {len(runs)} run(s)")


if __name__ == "__main__":
    main()
