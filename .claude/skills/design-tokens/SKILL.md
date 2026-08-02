---
name: design-tokens
description: >-
  Generate a complete, drop-in design-token set — tokens.css (light + dark CSS
  custom properties for color, a modular type scale, spacing, radii, shadows)
  plus a matching tailwind.config — sourced from the ui-ux-pro-max database of
  curated palettes, font pairings and styles. Use this whenever someone needs
  the foundational design variables for a new product or wants to "set up a
  design system / theme / tokens / palette / tailwind theme / CSS variables"
  before building UI, even if they don't say the word "tokens" — e.g. "I'm
  starting a fintech dashboard, give me a color and type system", "set up dark
  mode variables for my portfolio", "generate a Tailwind theme for a calm
  meditation app". Prefer this over hand-picking hex codes and font-sizes: it
  pulls real, WCAG-checked palettes and proven font pairings and assembles them
  into a coherent, themeable system in one step. This produces the *variables* a
  project is built on; reach for the generic design-system skill instead when
  the need is token-architecture theory or slide generation. Do NOT use it for
  jobs that only look adjacent: a chart/series color palette (that's dataviz), a
  logo or full brand identity (that's design/brand), a one-off contrast or single
  color fix on existing UI, converting an existing token export to another format
  (e.g. Figma → Style Dictionary), building a specific page or component, or
  wiring a dark-mode toggle in app code — this skill creates the foundational
  token set itself, it doesn't critique, convert, or build features on top of one.
license: MIT
---

# Design Tokens

Turn a one-line product brief into the foundational design variables a UI is
built on: a `tokens.css` with light **and** dark themes, and a `tailwind.config`
wired to them. The palette, font pairing, spacing scale and style come from the
ui-ux-pro-max database (real, WCAG-checked choices — not invented hex codes);
this skill adds the parts that database doesn't emit: a modular type scale, a
derived dark theme, radii and shadows tuned to the chosen style, and the Tailwind
mapping.

## When this is the right tool

Reach for this at the **start** of a build, when the question is "what are the
colors, fonts, spacing and theming variables for this product?" — before any
component code exists. If the user is instead asking for a whole rendered page,
a component, or a design *critique*, this skill still helps as step one (generate
the tokens, then build on them), but it isn't the whole job.

It is deliberately narrow: it produces the token *foundation*. It does not write
components or pages. That narrowness is the point — every project needs this
layer, and doing it from curated data beats eyeballing hex codes every time.

## The one command

The bundled generator does the whole transform. Prefer it over assembling tokens
by hand — it's deterministic, WCAG-aware, and saves reinventing the derivation
each time.

```bash
python3 scripts/generate_tokens.py \
  --query "<product brief>" \
  [--variance 1-10] [--motion 1-10] [--density 1-10] \
  [--project "Name"] \
  --out-dir <where-to-write>
```

It writes three files to `--out-dir`:

- **`tokens.css`** — the source of truth. `:root` holds the light theme plus the
  non-themed tokens (type scale, spacing, radii, shadows, font stacks). The dark
  theme is applied two ways so it's robust: `@media (prefers-color-scheme: dark)`
  for OS preference, and an explicit `:root[data-theme="dark"]` / `.dark`
  override so a UI toggle beats the OS setting in both directions.
- **`tailwind.config.js`** — maps every token onto Tailwind's theme so utilities
  like `bg-background text-foreground p-md rounded-lg shadow-md text-3xl
  font-heading` resolve to the variables. Keeps `darkMode: ['class',
  '[data-theme="dark"]']`.
- **`TOKENS_README.md`** — how to wire the two into a project, plus the webfont URL.

### The dials

`search.py`'s design dials flow straight through and are worth setting:

- `--density` drives the **spacing scale** (1 = spacious/marketing, 10 =
  dense/dashboard). Set this to match the product — a data table wants a
  different rhythm than a landing page.
- `--variance` biases **style** selection (1 = centered/minimal, 10 =
  bold/asymmetric), which in turn changes the radii and shadow character.
- `--motion` is passed through for completeness; it doesn't affect static tokens,
  so leave it unset unless you're also capturing the motion recommendation.

## Workflow

1. **Pin the brief.** One concrete product + audience makes for better sourcing
   than a vague noun. "b2b invoicing dashboard for accountants" beats "an app".
2. **Pick dials from the product type**, not at random — density especially.
3. **Run the generator** into the project (or a scratch dir to preview).
4. **Read the output back to the user** — name the style it chose, the palette
   (primary/accent/background), the font pairing, and the density. This is where
   they course-correct ("too corporate, make it warmer") before any UI is built.
5. **Refine, don't fight.** The dark theme, radii and shadows are *heuristic
   starting points*. If a specific value is off, edit `tokens.css` directly — it's
   a plain, readable file. Don't re-run with random dials hoping for a better
   roll; adjust the query, or hand-tune the one token that's wrong.

## Reading the result to the user

After generating, summarize like this so they can react without opening files:

> **Style:** Glassmorphism · **Density:** 7/10 (standard)
> **Palette:** deep blue primary `#1E40AF`, amber accent `#D97706`, near-white ground
> **Type:** Fira Code headings / Fira Sans body, 1.25 modular scale
> **Themes:** light + a derived near-black dark mode
> Written to `./design/` — `tokens.css`, `tailwind.config.js`, `TOKENS_README.md`.

## How the derivations work

The color/font/spacing/style come verbatim from the database. The rest is
derived — and you should understand the reasoning so you can tune it or explain
it. It's documented in **`references/token-model.md`**: read it when a user asks
why a value is what it is, when the dark theme needs adjusting, or when you want
to change the type ratio or the style→radii/shadow mapping.

## Not this skill

- **A full page or component** — generate tokens first, then build on them.
- **Token-architecture theory, three-layer primitive/semantic/component systems,
  or slides** — that's the generic `design-system` skill.
- **A design critique of existing UI** — different job entirely.
