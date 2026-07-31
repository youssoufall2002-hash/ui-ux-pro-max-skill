#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_tokens.py — Turn a ui-ux-pro-max design-system recommendation into a
drop-in token set: tokens.css (light + dark CSS custom properties) and a
tailwind.config.js that maps those variables into the Tailwind theme.

The heavy lifting of *choosing* a palette, font pairing, spacing scale and style
is delegated to search.py (`--design-system --json`). This script owns the parts
search.py does not produce: a modular type scale, a derived dark theme, radii and
shadow tokens tuned to the chosen style, and the Tailwind wiring.

Usage
-----
    # Let the script call search.py for you:
    python generate_tokens.py --query "modern SaaS analytics dashboard" \
        --density 7 --variance 6 --out-dir ./design

    # Or feed it JSON you already captured from search.py --design-system --json:
    python search.py "portfolio" --design-system --json | \
        python generate_tokens.py --stdin --out-dir ./design

Design intent
-------------
Everything here is a *starting point a human refines*, not a locked result. The
dark-theme derivation and the style→radii/shadow maps are deliberately simple and
documented in references/token-model.md so the reasoning is legible and easy to
override. Prefer editing the emitted files over fighting the generator.
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

# ----------------------------------------------------------------------------
# Locating search.py
# ----------------------------------------------------------------------------

def find_search_py(explicit: str | None) -> Path | None:
    """Find src/ui-ux-pro-max/scripts/search.py by walking up from cwd.

    We walk up rather than hardcode a path so the skill works whether it's run
    from a repo checkout, an installed CLI, or a mirrored .claude/skills copy.
    """
    if explicit:
        p = Path(explicit).expanduser().resolve()
        return p if p.is_file() else None
    rel = Path("src/ui-ux-pro-max/scripts/search.py")
    here = Path.cwd().resolve()
    for base in [here, *here.parents]:
        cand = base / rel
        if cand.is_file():
            return cand
        # Also handle being *inside* the skill/scripts dirs of a mirror.
        cand2 = base / "scripts" / "search.py"
        if cand2.is_file() and (base / "core.py").exists() is False:
            pass
    # Fallback: common install locations relative to this file.
    for up in Path(__file__).resolve().parents:
        cand = up / rel
        if cand.is_file():
            return cand
    return None


def run_search(search_py: Path, query: str, dials: dict, project: str | None) -> dict:
    cmd = [sys.executable, str(search_py), query, "--design-system", "--json"]
    for name in ("variance", "motion", "density"):
        if dials.get(name) is not None:
            cmd += [f"--{name}", str(dials[name])]
    if project:
        cmd += ["--project-name", project]
    out = subprocess.run(cmd, capture_output=True, text=True)
    if out.returncode != 0:
        sys.exit(f"search.py failed:\n{out.stderr or out.stdout}")
    try:
        return json.loads(out.stdout)
    except json.JSONDecodeError:
        sys.exit(f"Could not parse search.py JSON output:\n{out.stdout[:500]}")


# ----------------------------------------------------------------------------
# Color helpers
# ----------------------------------------------------------------------------

def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb) -> str:
    return "#" + "".join(f"{max(0, min(255, round(c))):02X}" for c in rgb)


def relative_luminance(h: str) -> float:
    """WCAG relative luminance, 0 (black) .. 1 (white)."""
    def chan(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (chan(x) for x in hex_to_rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def mix(a: str, b: str, t: float) -> str:
    """Linear blend between two hex colors; t=0 -> a, t=1 -> b."""
    ra, ga, ba = hex_to_rgb(a)
    rb, gb, bb = hex_to_rgb(b)
    return rgb_to_hex((ra + (rb - ra) * t, ga + (gb - ga) * t, ba + (bb - ba) * t))


def contrast_ratio(a: str, b: str) -> float:
    la, lb = relative_luminance(a), relative_luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def readable_on(bg: str, light="#FFFFFF", dark="#0B0F17") -> str:
    """Pick whichever of light/dark text reads better on bg."""
    return dark if contrast_ratio(bg, dark) >= contrast_ratio(bg, light) else light


# ----------------------------------------------------------------------------
# Dark theme derivation
# ----------------------------------------------------------------------------
# The database palette is authored for light mode. Rather than naively invert
# (which wrecks accent hues and contrast), we keep the brand/accent hues and
# rebuild only the neutral ground: a near-black background, lifted surfaces, and
# a foreground flipped to light. Accents are nudged brighter only if they'd fail
# contrast on the dark ground. This is a sane default, not gospel — see the
# reference doc.

def derive_dark(colors: dict) -> dict:
    ink = "#0B0F17"          # near-black ground with a slight blue bias
    primary = colors["primary"]
    accent = colors.get("accent", primary)

    def lift(c, t):  # lift a color toward white for dark-mode surfaces/text
        return mix(c, "#FFFFFF", t)

    def ensure_contrast(c, bg, target=3.0):
        # Brighten c toward white until it clears `target` against bg.
        out = c
        for _ in range(12):
            if contrast_ratio(out, bg) >= target:
                break
            out = mix(out, "#FFFFFF", 0.12)
        return out

    background = ink
    foreground = "#E8ECF3"
    muted = mix(ink, "#FFFFFF", 0.10)      # elevated surface
    border = mix(ink, "#FFFFFF", 0.16)
    primary_d = ensure_contrast(primary, background, 3.0)
    accent_d = ensure_contrast(accent, background, 3.0)

    return {
        "primary": primary_d,
        "on_primary": readable_on(primary_d),
        "secondary": ensure_contrast(colors.get("secondary", primary), background, 3.0),
        "accent": accent_d,
        "on_accent": readable_on(accent_d),
        "background": background,
        "foreground": foreground,
        "muted": muted,
        "muted_foreground": mix(foreground, ink, 0.35),
        "border": border,
        "destructive": ensure_contrast(colors.get("destructive", "#DC2626"), background, 3.0),
        "ring": primary_d,
    }


def build_light(colors: dict) -> dict:
    bg = colors.get("background", "#FFFFFF")
    fg = colors.get("foreground", colors.get("text", "#0B0F17"))
    primary = colors["primary"]
    accent = colors.get("accent", colors.get("cta", primary))
    return {
        "primary": primary,
        "on_primary": colors.get("on_primary", readable_on(primary)),
        "secondary": colors.get("secondary", primary),
        "accent": accent,
        "on_accent": readable_on(accent),
        "background": bg,
        "foreground": fg,
        "muted": colors.get("muted", mix(bg, fg, 0.06)),
        "muted_foreground": mix(fg, bg, 0.35),
        "border": colors.get("border", mix(bg, fg, 0.14)),
        "destructive": colors.get("destructive", "#DC2626"),
        "ring": colors.get("ring", primary),
    }


# ----------------------------------------------------------------------------
# Type scale, radii, shadows
# ----------------------------------------------------------------------------

# Style keyword -> aesthetic knobs. We match on lowercased style name + keywords
# so new styles fall through to a balanced default rather than erroring.
STYLE_PROFILES = [
    (("brutal", "neobrutal", "swiss", "editorial"),
     {"ratio": 1.333, "radius": {"sm": "0px", "md": "0px", "lg": "0px", "xl": "0px", "full": "0px"},
      "shadow": {"sm": "2px 2px 0 0 rgb(0 0 0 / 1)", "md": "4px 4px 0 0 rgb(0 0 0 / 1)",
                 "lg": "6px 6px 0 0 rgb(0 0 0 / 1)"}}),
    (("glass", "glassmorph", "aurora", "gradient"),
     {"ratio": 1.25, "radius": {"sm": "8px", "md": "14px", "lg": "22px", "xl": "32px", "full": "9999px"},
      "shadow": {"sm": "0 1px 2px rgb(15 23 42 / 0.08)",
                 "md": "0 8px 24px -8px rgb(15 23 42 / 0.18)",
                 "lg": "0 24px 48px -12px rgb(15 23 42 / 0.28)"}}),
    (("minimal", "clean", "flat", "corporate"),
     {"ratio": 1.2, "radius": {"sm": "4px", "md": "8px", "lg": "12px", "xl": "16px", "full": "9999px"},
      "shadow": {"sm": "0 1px 2px rgb(15 23 42 / 0.06)",
                 "md": "0 4px 12px -2px rgb(15 23 42 / 0.10)",
                 "lg": "0 12px 32px -8px rgb(15 23 42 / 0.16)"}}),
    (("playful", "neumorph", "claymorph", "rounded", "bubbly"),
     {"ratio": 1.25, "radius": {"sm": "12px", "md": "20px", "lg": "28px", "xl": "40px", "full": "9999px"},
      "shadow": {"sm": "0 2px 6px rgb(15 23 42 / 0.10)",
                 "md": "0 10px 24px -6px rgb(15 23 42 / 0.16)",
                 "lg": "0 20px 48px -10px rgb(15 23 42 / 0.22)"}}),
]

DEFAULT_PROFILE = {
    "ratio": 1.25,
    "radius": {"sm": "6px", "md": "10px", "lg": "16px", "xl": "24px", "full": "9999px"},
    "shadow": {"sm": "0 1px 2px rgb(15 23 42 / 0.07)",
               "md": "0 6px 16px -4px rgb(15 23 42 / 0.12)",
               "lg": "0 16px 40px -8px rgb(15 23 42 / 0.20)"},
}


def style_profile(style: dict) -> dict:
    hay = (style.get("name", "") + " " + style.get("keywords", "")).lower()
    for keys, prof in STYLE_PROFILES:
        if any(k in hay for k in keys):
            return prof
    return DEFAULT_PROFILE


# A modular scale anchored at 1rem. Steps below/above base give a coherent ramp.
SCALE_STEPS = [("xs", -2), ("sm", -1), ("base", 0), ("lg", 1), ("xl", 2),
               ("2xl", 3), ("3xl", 4), ("4xl", 5), ("5xl", 6)]


def type_scale(ratio: float) -> dict:
    out = {}
    for name, step in SCALE_STEPS:
        rem = round(1.0 * (ratio ** step), 4)
        out[name] = f"{rem}rem"
    return out


FALLBACK_SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
FALLBACK_SERIF = "ui-serif, Georgia, Cambria, 'Times New Roman', serif"
FALLBACK_MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"


def font_stack(family: str) -> str:
    f = family.lower()
    if any(k in f for k in ("mono", "code", "consol", "courier")):
        base = FALLBACK_MONO
    elif any(k in f for k in ("serif", "playfair", "lora", "merri", "georgia", "garamond", "times")):
        base = FALLBACK_SERIF
    else:
        base = FALLBACK_SANS
    return f"'{family}', {base}"


# ----------------------------------------------------------------------------
# Emitters
# ----------------------------------------------------------------------------

def px_to_rem(px: str) -> str:
    m = re.match(r"([\d.]+)px", px.strip())
    if not m:
        return px
    return f"{round(float(m.group(1)) / 16, 4)}rem"


def build_model(ds: dict) -> dict:
    colors = ds.get("colors", {})
    typ = ds.get("typography", {})
    style = ds.get("style", {})
    spacing = ds.get("spacing_scale") or {
        "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px",
        "xl": "32px", "2xl": "48px", "3xl": "64px"}
    prof = style_profile(style)
    heading = typ.get("heading", "Inter")
    body = typ.get("body", heading)
    return {
        "project": ds.get("project_name", "Design System"),
        "style_name": style.get("name", "Custom"),
        "light": build_light(colors),
        "dark": derive_dark(colors),
        "fonts": {
            "heading": heading,
            "body": body,
            "heading_stack": font_stack(heading),
            "body_stack": font_stack(body),
            "import": typ.get("css_import", ""),
            "url": typ.get("google_fonts_url", ""),
        },
        "type_scale": type_scale(prof["ratio"]),
        "ratio": prof["ratio"],
        "spacing": spacing,
        "radius": prof["radius"],
        "shadow": prof["shadow"],
        "notes": colors.get("notes", ""),
    }


def emit_css(m: dict) -> str:
    L, D = m["light"], m["dark"]
    lines = []
    if m["fonts"]["import"]:
        lines.append(m["fonts"]["import"])
        lines.append("")
    lines.append(f"/* {m['project']} — design tokens ({m['style_name']} style) */")
    if m["notes"]:
        lines.append(f"/* Palette notes: {m['notes']} */")
    lines.append("/* Generated by design-tokens skill. Refine by hand — these are a starting point. */")
    lines.append("")

    def color_block(theme):
        b = []
        for k, v in theme.items():
            b.append(f"  --color-{k.replace('_', '-')}: {v};")
        return b

    # :root — light theme + non-themed tokens
    lines.append(":root {")
    lines += color_block(L)
    lines.append("")
    lines.append(f"  --font-heading: {m['fonts']['heading_stack']};")
    lines.append(f"  --font-body: {m['fonts']['body_stack']};")
    lines.append("")
    lines.append(f"  /* Modular type scale (ratio {m['ratio']}) */")
    for k, v in m["type_scale"].items():
        lines.append(f"  --text-{k}: {v};")
    lines.append("")
    lines.append("  /* Spacing scale */")
    for k, v in m["spacing"].items():
        lines.append(f"  --space-{k}: {v};")
    lines.append("")
    lines.append("  /* Radii */")
    for k, v in m["radius"].items():
        lines.append(f"  --radius-{k}: {v};")
    lines.append("")
    lines.append("  /* Elevation */")
    for k, v in m["shadow"].items():
        lines.append(f"  --shadow-{k}: {v};")
    lines.append("}")
    lines.append("")

    # Dark theme: media query + explicit override selectors
    dark_vars = color_block(D)
    lines.append("@media (prefers-color-scheme: dark) {")
    lines.append("  :root {")
    lines += ["  " + x for x in dark_vars]
    lines.append("  }")
    lines.append("}")
    lines.append("")
    lines.append("/* Explicit theme toggle wins over the media query in both directions */")
    lines.append(':root[data-theme="dark"], .dark {')
    lines += dark_vars
    lines.append("}")
    lines.append(':root[data-theme="light"] {')
    lines += color_block(L)
    lines.append("}")
    lines.append("")
    return "\n".join(lines)


def emit_tailwind(m: dict) -> str:
    def keys(d, prefix):
        return "\n".join(
            f"        '{k.replace('_', '-')}': 'var(--{prefix}-{k.replace('_', '-')})',"
            for k in d)
    colors = keys(m["light"], "color")
    spacing = keys(m["spacing"], "space")
    radius = keys(m["radius"], "radius")
    shadow = keys(m["shadow"], "shadow")
    text = keys(m["type_scale"], "text")
    return f"""/** Tailwind theme wired to tokens.css — swap this into your tailwind.config.
 *  Utilities like `bg-primary text-foreground p-md rounded-lg shadow-md` now
 *  resolve to the CSS variables, so light/dark theming is automatic.
 *  Requires `darkMode: ['class', '[data-theme="dark"]']` and importing tokens.css. */
module.exports = {{
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {{
    extend: {{
      colors: {{
{colors}
      }},
      fontFamily: {{
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      }},
      fontSize: {{
{text}
      }},
      spacing: {{
{spacing}
      }},
      borderRadius: {{
{radius}
      }},
      boxShadow: {{
{shadow}
      }},
    }},
  }},
}};
"""


def emit_readme(m: dict) -> str:
    return f"""# {m['project']} — design tokens

Generated by the `design-tokens` skill from the ui-ux-pro-max database.
Style: **{m['style_name']}** · type ratio **{m['ratio']}**.

## Files
- `tokens.css` — CSS custom properties. Light theme on `:root`, dark theme via
  `prefers-color-scheme` **and** an explicit `[data-theme="dark"]` / `.dark`
  override (the toggle beats the OS setting in both directions).
- `tailwind.config.js` — maps every token onto Tailwind's theme.

## Use it
1. Import the CSS once, globally: `@import "./tokens.css";`
2. Merge `tailwind.config.js` into your config (keep `darkMode` as shown).
3. Style through tokens: `bg-background text-foreground`, `p-md`, `rounded-lg`,
   `shadow-md`, `text-3xl font-heading`.

## Fonts
{m['fonts']['url'] or '(system fonts — no webfont import needed)'}

> These tokens are a **starting point**. The dark theme and the radii/shadow set
> are derived heuristically from the chosen style; tune them to taste. See the
> skill's `references/token-model.md` for how each value was derived.
"""


# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--query", help="Product brief to feed search.py (omit if using --stdin)")
    ap.add_argument("--stdin", action="store_true", help="Read search.py --design-system --json from stdin")
    ap.add_argument("--variance", type=int, help="1-10 style variance dial")
    ap.add_argument("--motion", type=int, help="1-10 motion dial (unused for tokens but passed through)")
    ap.add_argument("--density", type=int, help="1-10 density dial (drives spacing scale)")
    ap.add_argument("--project", help="Project name")
    ap.add_argument("--out-dir", default=".", help="Directory to write tokens.css + tailwind.config.js")
    ap.add_argument("--search-py", help="Explicit path to search.py (else auto-located)")
    ap.add_argument("--print", dest="do_print", action="store_true", help="Also print tokens.css to stdout")
    args = ap.parse_args()

    if args.stdin:
        raw = json.load(sys.stdin)
    else:
        if not args.query:
            ap.error("provide --query or pipe JSON with --stdin")
        search_py = find_search_py(args.search_py)
        if not search_py:
            sys.exit("Could not locate search.py. Pass --search-py /path/to/search.py")
        dials = {"variance": args.variance, "motion": args.motion, "density": args.density}
        raw = run_search(search_py, args.query, dials, args.project)

    ds = raw.get("design_system", raw)
    if args.project:
        ds["project_name"] = args.project
    model = build_model(ds)

    out = Path(args.out_dir).expanduser()
    out.mkdir(parents=True, exist_ok=True)
    (out / "tokens.css").write_text(emit_css(model), encoding="utf-8")
    (out / "tailwind.config.js").write_text(emit_tailwind(model), encoding="utf-8")
    (out / "TOKENS_README.md").write_text(emit_readme(model), encoding="utf-8")

    print(f"✅ Wrote design tokens for '{model['project']}' ({model['style_name']} style) to {out}/")
    print(f"   - tokens.css  ({len(model['light'])} color tokens x light/dark, "
          f"{len(model['type_scale'])} type steps, {len(model['spacing'])} spacing steps)")
    print(f"   - tailwind.config.js")
    print(f"   - TOKENS_README.md")
    if model["fonts"]["url"]:
        print(f"   Fonts: {model['fonts']['url']}")
    if args.do_print:
        print("\n" + "-" * 60 + "\n")
        print(emit_css(model))


if __name__ == "__main__":
    main()
