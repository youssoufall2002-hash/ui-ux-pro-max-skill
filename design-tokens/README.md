# UI-UX-Pro-Max — Design Tokens

Three-layer design-token set generated with the `design-system` skill.

**Aesthetic:** precise, technical, premium — deep **indigo** primary + a signature **amber** accent on a cool **slate** neutral scale. Avoids the AI-slop defaults (cream+serif, acid-on-black, hairline broadsheet).

## Files

| File | Purpose |
|------|---------|
| `tokens.json` | Source of truth — primitive → semantic → component + dark layer |
| `tokens.css` | Generated CSS variables (import this) |
| `tailwind.tokens.cjs` | Generated Tailwind color config (merge into `theme.extend.colors`) |
| `preview.html` | Live swatch + component preview (open beside `tokens.css`) |

## Regenerate

```bash
SKILL=.claude/skills/design-system
node $SKILL/scripts/generate-tokens.cjs --config design-tokens/tokens.json -o design-tokens/tokens.css
node $SKILL/scripts/generate-tokens.cjs --config design-tokens/tokens.json --format tailwind -o design-tokens/tailwind.tokens.cjs
```

Edit `tokens.json` only — never the generated `.css`.

## Layers

- **Primitive** (`--primitive-*`) — raw values: the slate/indigo/amber ramps, spacing, type, radius, shadow, duration. Never referenced directly by components.
- **Semantic** (`--color-*`, `--typography-*`, `--spacing-*`) — purpose aliases: `primary`, `accent`, `foreground`, `muted-foreground`, `border`, `ring`, … This is the tier dark mode swaps.
- **Component** (`--button-*`, `--input-*`, `--card-*`, `--badge-*`) — per-component values that reference the semantic tier.

## Dark mode

Applied via `.dark` class or `[data-theme="dark"]`. Only the semantic tier is redefined; primitives stay fixed.

## Accessibility

All text/background pairs verified at **WCAG AA** (≥ 4.5:1): primary on white 6.29:1, accent-fg on amber 9.39:1, foreground on background 17.06:1, muted-fg on background 4.55:1. Interactive elements get a visible indigo focus-glow ring (`--button-focus-ring`).

## Usage

```css
@import "./tokens.css";

.btn { background: var(--button-bg); color: var(--button-fg); border-radius: var(--button-radius); }
.btn:focus-visible { box-shadow: var(--button-focus-ring); }
```

Rule: reference tokens with `var()` — never hardcode hex. Validate with
`node .claude/skills/design-system/scripts/validate-tokens.cjs --dir <src>`.
