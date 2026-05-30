#!/usr/bin/env python3
"""Generate sitemap.xml for skl-academy.tech."""
from __future__ import annotations

from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://skl-academy.tech"
TODAY = date.today().isoformat()

# (path, priority, changefreq)
STATIC_PAGES = [
    ("/", "1.0", "weekly"),
    ("/about/", "0.8", "monthly"),
    ("/library.html", "0.9", "weekly"),
    ("/desk/", "0.6", "monthly"),
]

SANDBOX_SLUGS = [
    ("typing", "0.7", "monthly"),
    ("web-playground", "0.9", "monthly"),
    ("pc-architecture", "0.8", "monthly"),
]


def url_entry(path: str, priority: str, changefreq: str) -> str:
    loc = f"{SITE}{path}" if path.startswith("/") else f"{SITE}/{path}"
    return f"""    <url>
        <loc>{loc}</loc>
        <lastmod>{TODAY}</lastmod>
        <changefreq>{changefreq}</changefreq>
        <priority>{priority}</priority>
    </url>"""


def collect_course_lessons() -> list[str]:
    paths = []
    courses = ROOT / "courses"
    for index in sorted(courses.rglob("index.html")):
        if index.parent.parent.parent != courses:
            continue
        rel = index.parent.relative_to(ROOT).as_posix()
        paths.append(f"/{rel}/")
    return paths


def collect_articles() -> list[str]:
    articles = ROOT / "articles"
    paths = []
    for html in sorted(articles.glob("*.html")):
        paths.append(f"/articles/{html.name}")
    return paths


def main() -> None:
    entries: list[str] = []

    for path, prio, freq in STATIC_PAGES:
        entries.append(url_entry(path, prio, freq))

    for path in collect_articles():
        prio = "0.8" if path.endswith(("url-journey.html", "billion-dollar-bugs.html", "reading-code.html")) else "0.7"
        entries.append(url_entry(path, prio, "monthly"))

    for slug, prio, freq in SANDBOX_SLUGS:
        entries.append(url_entry(f"/sandbox/{slug}/", prio, freq))

    for path in collect_course_lessons():
        entries.append(url_entry(path, "0.9", "weekly"))

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )

    out = ROOT / "sitemap.xml"
    out.write_text(xml, encoding="utf-8")
    print(f"Wrote {len(entries)} URLs to {out}")


if __name__ == "__main__":
    main()
