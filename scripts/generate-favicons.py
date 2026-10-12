#!/usr/bin/env python3
"""Generate favicon assets from brand monogram (Minerva Modern, matches logo)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT_PATH = ROOT / "src/fonts/minerva-modern.woff"
PUBLIC = ROOT / "public"
APP = ROOT / "src/app"

BG = (255, 255, 255, 255)
FG = (10, 10, 10, 255)


def render_monogram(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), BG)
    draw = ImageDraw.Draw(img)
    font_size = max(8, int(size * 0.42))
    font = ImageFont.truetype(str(FONT_PATH), font_size)
    text = "SP"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=FG)

    if size >= 128:
        line_y = int(size * 0.72)
        line_w = int(size * 0.22)
        cx = size // 2
        gap = int(size * 0.06)
        line_h = max(1, size // 180)
        draw.rectangle(
            (cx - gap - line_w, line_y, cx - gap, line_y + line_h),
            fill=FG,
        )
        draw.rectangle(
            (cx + gap, line_y, cx + gap + line_w, line_y + line_h),
            fill=FG,
        )

    return img


def save_png(path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    render_monogram(size).convert("RGB").save(path, optimize=True)


def save_ico(path: Path) -> None:
    sizes = [16, 32, 48]
    images = [render_monogram(s).convert("RGBA") for s in sizes]
    path.parent.mkdir(parents=True, exist_ok=True)
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def main() -> None:
    targets: list[tuple[Path, int]] = [
        (PUBLIC / "icon-16.png", 16),
        (PUBLIC / "icon-32.png", 32),
        (PUBLIC / "apple-touch-icon.png", 180),
        (PUBLIC / "icon-192.png", 192),
        (PUBLIC / "icon-512.png", 512),
        (APP / "icon.png", 32),
        (APP / "apple-icon.png", 180),
    ]
    for path, size in targets:
        save_png(path, size)
        print(f"wrote {path} ({size}x{size})")

    save_ico(PUBLIC / "favicon.ico")
    print(f"wrote {PUBLIC / 'favicon.ico'}")

    ico_app = APP / "favicon.ico"
    save_ico(ico_app)
    print(f"wrote {ico_app}")


if __name__ == "__main__":
    main()
