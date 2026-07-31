# Token model — how each value is derived

Read this when you need to explain a token, tune the dark theme, or change the
type ramp / style mapping. The goal is that nothing in the output is a black box.

## What comes from the database (verbatim)

`search.py --design-system --json` returns a recommendation the generator uses
as-is:

- **Colors** — `primary`, `on_primary`, `secondary`, `accent`, `background`,
  `foreground`, `muted`, `border`, `destructive`, `ring`. These are already
  WCAG-adjusted in the database (the `notes` field records any adjustment).
- **Typography** — a heading/body font pairing plus the Google Fonts import URL.
- **Spacing scale** — 7 steps (`xs`…`3xl`), overridden by the `--density` dial.
- **Style** — name + keywords + effects; used to pick radii, shadows and the
  type ratio.

## What the generator derives

### Type scale (`--text-*`)
A modular scale anchored at `1rem` (`--text-base`). Each step multiplies by a
ratio, so the ramp is harmonious rather than arbitrary. The ratio is chosen from
the style so the type *feels* like the aesthetic:

| Style family | Ratio | Feel |
|---|---|---|
| brutalist / swiss / editorial | 1.333 (perfect fourth) | dramatic, big headlines |
| minimal / corporate / flat | 1.2 (minor third) | tight, restrained |
| everything else (default) | 1.25 (major third) | balanced |

Steps run `xs` (−2) … `5xl` (+6) from base. To change the ramp, edit `type_scale`
or the `STYLE_PROFILES` ratios in `scripts/generate_tokens.py`.

### Font stacks
The family name is wrapped in a fallback stack chosen by heuristic — mono
fallbacks for code/mono faces, serif fallbacks for serif faces, otherwise a
system sans stack. This guarantees a graceful fallback before the webfont loads.

### Dark theme
The database palette is authored for light mode. Naively inverting it wrecks
accent hues and contrast, so instead the generator keeps the brand/accent hues
and rebuilds only the neutral ground:

- **background** → a near-black with a slight blue bias (`#0B0F17`).
- **foreground** → a light off-white (`#E8ECF3`).
- **muted / border** → the ground lifted toward white by a fixed amount, so
  surfaces read as elevated.
- **primary / secondary / accent / destructive** → kept, but brightened toward
  white *only if* they fail a 3:1 contrast ratio against the dark ground. A color
  that already reads well is left untouched, preserving brand identity.
- **on-primary / on-accent** → recomputed to whichever of light/dark text wins
  the contrast check against the (possibly brightened) color.

This is a sane default, not gospel. If a brand needs a specific dark palette,
edit the `[data-theme="dark"]` block in `tokens.css` directly — the media-query
block and the selector block hold the same values, so change both (or delete the
media query if you only want an explicit toggle).

### Radii and shadows
Picked from the same style family as the type ratio, because roundness and
elevation carry as much of an aesthetic as color does:

- **brutalist** → 0 radius, hard offset shadows (`4px 4px 0 0 black`).
- **glass / gradient** → generous radii, soft diffuse shadows.
- **minimal / corporate** → small radii, subtle shadows.
- **playful / neumorphic** → large radii, medium soft shadows.
- **default** → moderate radii and shadows.

Change these in `STYLE_PROFILES` (matched on lowercased style name + keywords, so
unknown styles fall through to the default rather than erroring).

## Contrast helpers
The generator computes WCAG relative luminance and contrast ratios internally
(`relative_luminance`, `contrast_ratio`, `readable_on`) to pick readable text
colors and to decide whether a color needs brightening for dark mode. These are
standard sRGB formulas; no external dependency.

## Extending
- **New style aesthetic** → add a tuple to `STYLE_PROFILES` with its keywords and
  radii/shadow/ratio.
- **Different neutral ground for dark mode** → change `ink`, `foreground`, and the
  `lift` amounts in `derive_dark`.
- **More/fewer type steps** → edit `SCALE_STEPS`.
