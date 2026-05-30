#!/usr/bin/env python3
"""Migrate courses/*/lesson.html -> courses/*/lesson/index.html (trailing-slash URLs)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COURSES = ROOT / "courses"
SITE = "https://skl-academy.tech"
SKIP_FILES = {"404.html"}
ASSET_EXT = (".css", ".js", ".ico", ".png", ".jpg", ".svg", ".woff", ".woff2", ".json")

REDIRECT_TEMPLATE = """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <link rel="canonical" href="{canonical}">
  <meta http-equiv="refresh" content="0;url={path}">
  <script>location.replace("{path}");</script>
  <title>Перенаправление…</title>
</head>
<body><p><a href="{path}">Перейти к уроку</a></p></body>
</html>
"""


def bump_relative_prefix(path: str) -> str:
    if path.startswith("../"):
        return "../" + path
    return path


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
            return base + "/" + hash_part
        return "../" + base + "/" + hash_part
    if path.endswith("index.html"):
        return path[: -len("index.html")] + hash_part
    return path + hash_part


def transform_html(content: str) -> str:
    content = re.sub(
        r"https://skl-academy\.tech/(courses/[^\"'?\s#]+?)\.html",
        r"https://skl-academy.tech/\1/",
        content,
    )

    def bump_attr(m: re.Match) -> str:
        prefix, quote, dots, rest = m.group(1), m.group(2), m.group(3), m.group(4)
        return f"{prefix}{quote}{dots}../{rest}{quote}"

    for attr in ("href", "src"):
        content = re.sub(
            rf'({attr}=)(["\'])(\.\./+)([^"\']*)\2',
            bump_attr,
            content,
        )

    def rewrite_href(m: re.Match) -> str:
        quote, path = m.group(1), m.group(2)
        return f"href={quote}{fix_href_path(path)}{quote}"

    content = re.sub(r'href=(["\'])([^"\']*)\1', rewrite_href, content)

    content = content.replace('href="../../../index.html"', 'href="../../../"')
    content = content.replace("href='../../../index.html'", "href='../../../'")
    content = content.replace('href="../../../../index.html"', 'href="../../../../"')
    content = content.replace("href='../../../../index.html'", "href='../../../../'")

    return content


def course_files() -> list[Path]:
    files = []
    for path in sorted(COURSES.rglob("*.html")):
        if path.name in SKIP_FILES:
            continue
        if path.parent == COURSES:
            continue
        # skip redirect stubs (already migrated)
        if path.name == "index.html" and path.parent.parent.parent == COURSES:
            continue
        if path.name != "index.html":
            files.append(path)
    return files


def migrate_lesson(html_path: Path) -> None:
    slug = html_path.stem
    course_dir = html_path.parent
    dest_dir = course_dir / slug
    dest_file = dest_dir / "index.html"

    if dest_file.exists() and html_path.read_text(encoding="utf-8").startswith("<!DOCTYPE html>\n<html lang=\"ru\">\n<head>\n  <meta charset=\"UTF-8\">\n  <link rel=\"canonical\""):
        return  # already redirect stub

    content = html_path.read_text(encoding="utf-8")
    if len(content) < 500 and "location.replace" in content:
        return

    content = transform_html(content)
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_file.write_text(content, encoding="utf-8")

    rel = f"/{html_path.relative_to(ROOT).as_posix().replace('.html', '/')}"
    canonical = f"{SITE}{rel}"
    html_path.write_text(
        REDIRECT_TEMPLATE.format(canonical=canonical, path=rel),
        encoding="utf-8",
    )


def update_text_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
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
    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def collect_reference_files() -> list[Path]:
    out: list[Path] = []
    globs = [
        "index.html",
        "library.html",
        "404.html",
        "search-data.js",
        "search.js",
        "course-search.js",
        "script.js",
        "articles/*.html",
        "desk/*.html",
        "desk/*.js",
        "sandbox/**/*.html",
        "about/**/*.html",
        "courses/courses.js",
    ]
    for g in globs:
        out.extend(ROOT.glob(g))
    return sorted({p for p in out if p.is_file()})


def main() -> None:
    lessons = course_files()
    print(f"Migrating {len(lessons)} lesson files...")
    for path in lessons:
        migrate_lesson(path)
        print(f"  OK {path.relative_to(ROOT)}")

    updated = [p for p in collect_reference_files() if update_text_file(p)]
    print(f"Updated {len(updated)} reference files:")
    for p in updated:
        print(f"  {p.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
