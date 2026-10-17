#!/usr/bin/env python3
"""Zip each skill in skills/<group>/ into dist/<skill-name>.zip for upload to Claude.

Each zip holds one top-level folder named after the skill, containing its SKILL.md,
plus the group's LICENSE when there is one.

Usage: python3 tools/package.py <group> [<group> ...]
"""
import pathlib
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent


def package(group: str) -> None:
    base = ROOT / "skills" / group
    licence = base / "LICENSE"
    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    for skill in sorted(p.parent for p in base.glob("*/SKILL.md")):
        out = dist / f"{skill.name}.zip"
        with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(skill.rglob("*")):
                if f.is_file():
                    z.write(f, f"{skill.name}/{f.relative_to(skill)}")
            if licence.exists():
                z.write(licence, f"{skill.name}/LICENSE")
        print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for g in sys.argv[1:]:
        package(g)
