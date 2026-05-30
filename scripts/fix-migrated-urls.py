#!/usr/bin/env python3
"""Repair migrated course index.html links and project references."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COURSES = ROOT / "courses"
SITE = "https://skl-academy.tech"
ASSET_EXT = (".css", ".js", ".ico", ".png", ".jpg", ".svg", ".woff", ".woff2", ".json")


def fix_href_path(path: str) -> str:
    hash_part = ""
    if "#" in path:
        path, hash_part = path.split("#", 1)
        hash_part = "#" + hash_part
    if not path or path.startswith(("http://", "https://", "//", "#", "mailto:", "tel:")):
        return path + hash_part
    if path.lower().endswith(ASSET_EXT):
        return path + hash_part
    if path.endswith("/"):
        return path + hash_part
    if path.endswith(".html"):
        base = path[: -len(".html")]
        if base.startswith("../") or "/" in base:
            new_path = base + "/"
        else:
            new_path = "../" + base + "/"
        return new_path + hash_part
    if path.endswith("index.html"):
        base = path[: -len("index.html")]
        return base + hash_part
    return path + hash_part


def repair_html(content: str) -> str:
    content = content.replace("href==", "href=").replace("src==", "src=")

    content = re.sub(
        r"https://skl-academy\.tech/(courses/[^\"'?\s#]+?)\.html",
        r"https://skl-academy.tech/\1/",
        content,
    )

    def rewrite_href(m: re.Match) -> str:
        q, path = m.group(1), m.group(2)
        return f"href={q}{fix_href_path(path)}{q}"

    content = re.sub(r'href=(["\'])([^"\']*)\1', rewrite_href, content)

    content = content.replace('href="../../../index.html"', 'href="../../../"')
    content = content.replace("href='../../../index.html'", "href='../../../'")
    content = content.replace('href="../../../../index.html"', 'href="../../../../"')

    return content


def repair_course_indexes() -> int:
    n = 0
    for path in COURSES.rglob("index.html"):
        if path.parent.parent.parent != COURSES:
            continue
        text = path.read_text(encoding="utf-8")
        fixed = repair_html(text)
        if fixed != text:
            path.write_text(fixed, encoding="utf-8")
            n += 1
    return n


def update_refs(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text
    text = re.sub(
        r"https://skl-academy\.tech/(courses/[^\"'?\s#]+?)\.html",
        r"https://skl-academy.tech/\1/",
        text,
    )
    text = re.sub(
        r"(?<![\w./])(courses/[a-z0-9-]+/[a-z0-9-]+)\.html",
        r"\1/",
        text,
        flags=re.I,
    )
    text = re.sub(
        r"(\.\./)+courses/([a-z0-9-]+/[a-z0-9-]+)\.html",
        lambda m: m.group(0).replace(".html", "/"),
        text,
        flags=re.I,
    )
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    n = repair_course_indexes()
    print(f"Repaired {n} course index.html files")

    globs = [
        "index.html",
        "library.html",
        "404.html",
        "search-data.js",
        "search.js",
        "course-search.js",
        "script.js",
        "articles/*.html",
        "desk/*",
        "sandbox/**/*.html",
        "about/**/*.html",
        "courses/**/*.html",
    ]
    for g in globs:
        for p in ROOT.glob(g):
            if p.is_file() and p.name != "index.html" or (p.name == "index.html" and "courses" not in str(p)):
                if "courses" in str(p) and p.name == "index.html":
                    continue
                if update_refs(p):
                    print(f"  refs: {p.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
