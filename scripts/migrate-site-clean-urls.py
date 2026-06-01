#!/usr/bin/env python3
"""Migrate library, articles, desk/sandbox links to trailing-slash URLs without .html."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://skl-academy.tech"
REDIRECT_TEMPLATE = """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <link rel="canonical" href="{canonical}">
  <meta http-equiv="refresh" content="0;url={path}">
  <script>location.replace("{path}");</script>
  <title>Перенаправление…</title>
</head>
<body><p><a href="{path}">Перейти</a></p></body>
</html>
"""


def is_redirect_stub(content: str) -> bool:
    return len(content) < 600 and "location.replace" in content


def write_redirect(stub_path: Path, target_path: str) -> None:
    canonical = f"{SITE}{target_path}"
    stub_path.write_text(
        REDIRECT_TEMPLATE.format(canonical=canonical, path=target_path),
        encoding="utf-8",
    )


def transform_library_content(content: str) -> str:
    content = content.replace(
        "https://skl-academy.tech/library.html", "https://skl-academy.tech/library/"
    )
    content = content.replace('href="index.html"', 'href="/"')
    content = content.replace("href='index.html'", "href='/'")
    content = re.sub(
        r'href="images/',
        'href="../images/',
        content,
    )
    content = re.sub(
        r'href="styles\.css"',
        'href="../styles.css"',
        content,
    )
    content = re.sub(
        r'href="articles/([a-z0-9-]+)\.html"',
        r'href="/articles/\1/"',
        content,
    )
    return content


def transform_article_content(content: str, slug: str) -> str:
    content = re.sub(
        rf"https://skl-academy\.tech/articles/{re.escape(slug)}\.html",
        f"https://skl-academy.tech/articles/{slug}/",
        content,
    )
    content = re.sub(
        r"https://skl-academy\.tech/articles/([a-z0-9-]+)\.html",
        r"https://skl-academy.tech/articles/\1/",
        content,
    )
    content = content.replace('href="../images/', 'href="../../images/')
    content = content.replace("href='../images/", "href='../../images/")
    content = content.replace('src="../images/', 'src="../../images/')
    content = content.replace("src='../images/", "src='../../images/")
    content = content.replace('href="../styles.css"', 'href="../../styles.css"')
    content = content.replace("href='../styles.css'", "href='../../styles.css'")
    content = content.replace('href="styles.css"', 'href="../styles.css"')
    content = content.replace("href='styles.css'", "href='../styles.css'")
    content = content.replace('href="../library.html"', 'href="/library/"')
    content = content.replace("href='../library.html'", "href='/library/'")
    content = content.replace('href="../index.html"', 'href="/"')
    content = content.replace("href='../index.html'", "href='/'")
    content = content.replace('src="../script.js"', 'src="../../script.js"')
    content = content.replace("src='../script.js'", "src='../../script.js'")
    content = content.replace('src="script.js"', 'src="../script.js"')
    content = content.replace("src='script.js'", "src='../script.js'")
    return content


def migrate_library() -> None:
    src = ROOT / "library.html"
    if not src.exists():
        return
    dest_dir = ROOT / "library"
    dest = dest_dir / "index.html"
    content = transform_library_content(src.read_text(encoding="utf-8"))
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    write_redirect(src, "/library/")
    print(f"  OK library.html -> library/index.html")


def migrate_articles() -> None:
    articles_dir = ROOT / "articles"
    for html_path in sorted(articles_dir.glob("*.html")):
        slug = html_path.stem
        dest_dir = articles_dir / slug
        dest = dest_dir / "index.html"
        content = html_path.read_text(encoding="utf-8")
        if is_redirect_stub(content):
            continue
        if dest.exists() and not is_redirect_stub(dest.read_text(encoding="utf-8")):
            write_redirect(html_path, f"/articles/{slug}/")
            print(f"  SKIP article {slug} (already migrated)")
            continue
        content = transform_article_content(content, slug)
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        write_redirect(html_path, f"/articles/{slug}/")
        print(f"  OK articles/{slug}.html -> articles/{slug}/index.html")


def global_replace_text(text: str) -> str:
    text = re.sub(
        r"https://skl-academy\.tech/library\.html",
        "https://skl-academy.tech/library/",
        text,
    )
    text = re.sub(
        r"https://skl-academy\.tech/articles/([a-z0-9-]+)\.html",
        r"https://skl-academy.tech/articles/\1/",
        text,
    )
    text = re.sub(
        r"https://skl-academy\.tech/sandbox/([a-z0-9-]+)/index\.html",
        r"https://skl-academy.tech/sandbox/\1/",
        text,
    )
    # Relative hrefs (site root and nested)
    text = re.sub(
        r'(?<=[="\'`])library\.html',
        "library/",
        text,
    )
    text = re.sub(
        r'(?<=[="\'`])articles/([a-z0-9-]+)\.html',
        r"articles/\1/",
        text,
    )
    text = re.sub(
        r'(?<=[="\'`])desk/index\.html',
        "desk/",
        text,
    )
    text = re.sub(
        r'(?<=[="\'`])/desk/index\.html',
        "/desk/",
        text,
    )
    text = re.sub(
        r'(?<=[="\'`])sandbox/([a-z0-9-]+)/index\.html',
        r"sandbox/\1/",
        text,
    )
    text = re.sub(
        r'(?<=[="\'`])/sandbox/([a-z0-9-]+)/index\.html',
        r"/sandbox/\1/",
        text,
    )
    text = re.sub(
        r"root \+ '/articles/([a-z0-9-]+)\.html'",
        r"root + '/articles/\1/'",
        text,
    )
    text = re.sub(
        r"root \+ '/sandbox/([a-z0-9-]+)/index\.html'",
        r"root + '/sandbox/\1/'",
        text,
    )
    return text


def collect_files() -> list[Path]:
    patterns = [
        "*.html",
        "*.js",
        "*.py",
        "*.md",
        "courses/**/*.html",
        "courses/**/*.js",
        "articles/**/*.html",
        "desk/**/*",
        "sandbox/**/*.html",
        "about/**/*.html",
        "library/**/*.html",
    ]
    found: set[Path] = set()
    for pattern in patterns:
        for path in ROOT.glob(pattern):
            if path.is_file() and ".git" not in path.parts:
                found.add(path)
    return sorted(found)


def update_references() -> None:
    updated = 0
    for path in collect_files():
        if path.name.endswith(".pyc"):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        new_text = global_replace_text(text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            updated += 1
            print(f"  updated {path.relative_to(ROOT)}")
    print(f"Updated {updated} files")


def main() -> None:
    print("Migrating library...")
    migrate_library()
    print("Migrating articles...")
    migrate_articles()
    print("Updating references...")
    update_references()


if __name__ == "__main__":
    main()
