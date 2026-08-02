#!/usr/bin/env python3
"""
Build sito parrucchiere — implementazione del §12 del design system.

    Leggi cliente.json, duplica /template, applica i contenuti, imposta
    --volt su accento, genera in /siti/<slug>. Non modificare struttura,
    tipografia o spaziature. Elenca alla fine i campi mancanti.

Uso:
    python3 build.py <cliente.json> [--img <dir_foto>] [--force]

Regole applicate:
  - §6  si ferma se mancano le foto prima/dopo (non sostituisce con altro)
  - §8  si ferma se restano token {{...}} non sostituiti (niente placeholder)
  - §2  imposta --volt su cliente.accento; nessun'altra variabile cambia
  - §12 elenca alla fine i campi mancanti
"""
import argparse
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "template"
SITI = ROOT / "siti"

GIORNI = {  # ordine + mapping schema.org
    "lun": "Monday", "mar": "Tuesday", "mer": "Wednesday", "gio": "Thursday",
    "ven": "Friday", "sab": "Saturday", "dom": "Sunday",
}


class BuildError(Exception):
    pass


def fail(msg):
    raise BuildError(msg)


def expand_block(html, name, items, render):
    """Ripete il blocco <!-- BEGIN:name --> … <!-- END:name --> per ogni item."""
    pat = re.compile(r"<!-- BEGIN:%s.*?-->(.*?)<!-- END:%s -->" % (name, name), re.S)
    m = pat.search(html)
    if not m:
        fail("blocco '%s' non trovato nel template" % name)
    block = m.group(1)
    out = "".join(render(block, it) for it in items)
    return html[:m.start()] + out + html[m.end():]


def schema_orari(orari):
    """orari{} -> array OpeningHoursSpecification (JSON-LD)."""
    spec = []
    for k, v in orari.items():
        if not v or "chiuso" in v.lower():
            continue
        parts = re.split(r"[–\-—]", v)
        if len(parts) != 2:
            continue
        spec.append({
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "https://schema.org/" + GIORNI.get(k, k),
            "opens": parts[0].strip(),
            "closes": parts[1].strip(),
        })
    return json.dumps(spec, ensure_ascii=False)


def build(cliente_path: Path, img_dir: Path | None, force: bool):
    cli = json.loads(cliente_path.read_text(encoding="utf-8"))
    missing = []  # campi vuoti/assenti da segnalare (§12)

    def need(key, value):
        if value in (None, "", [], {}):
            missing.append(key)
        return value

    slug = cli.get("slug") or fail("campo obbligatorio mancante: slug")

    # §6 — foto prima/dopo obbligatorie: se mancano, fermarsi e chiedere
    prima_dopo = (cli.get("foto") or {}).get("prima_dopo") or []
    if len([p for p in prima_dopo if p]) < 2:
        fail("§6: mancano le foto prima/dopo. Chiedile al cliente — "
             "non le sostituisco con un carosello.")

    if not TEMPLATE.exists():
        fail("template non trovato in %s" % TEMPLATE)

    dest = SITI / slug
    if dest.exists():
        if not force:
            fail("%s esiste già. Usa --force per sovrascrivere." % dest)
        shutil.rmtree(dest)

    # duplica /template -> /siti/<slug>
    shutil.copytree(TEMPLATE, dest)
    # rimuovi gli artefatti del template dall'output cliente
    for junk in ("cliente.json", "README.md", "img/.gitkeep"):
        p = dest / junk
        if p.exists():
            p.unlink()

    html = (dest / "index.html").read_text(encoding="utf-8")

    # --- blocchi ripetuti ---
    servizi = need("servizi", cli.get("servizi") or [])
    html = expand_block(html, "servizi", servizi, lambda b, s: (
        b.replace("{{servizio_nome}}", str(s.get("nome", "")))
         .replace("{{servizio_prezzo}}", str(s.get("prezzo", "")))))

    galleria = (cli.get("foto") or {}).get("galleria") or []
    need("foto.galleria", galleria)
    html = expand_block(html, "galleria", galleria,
                        lambda b, g: b.replace("{{galleria_foto}}", str(g)))

    orari = need("orari", cli.get("orari") or {})
    html = expand_block(html, "orari", list(orari.items()), lambda b, kv: (
        b.replace("{{orario_giorno}}", str(kv[0]))
         .replace("{{orario_valore}}", str(kv[1]))))

    # --- sostituzioni semplici ---
    foto = cli.get("foto") or {}
    repl = {
        "{{nome}}": need("nome", cli.get("nome", "")),
        "{{citta}}": need("citta", cli.get("citta", "")),
        "{{telefono}}": need("telefono", cli.get("telefono", "")),
        "{{whatsapp}}": need("whatsapp", cli.get("whatsapp", "")),
        "{{instagram}}": need("instagram", cli.get("instagram", "")),
        "{{indirizzo}}": need("indirizzo", cli.get("indirizzo", "")),
        "{{mappa_embed}}": need("mappa_embed", cli.get("mappa_embed", "")),
        "{{foto_hero}}": need("foto.hero", foto.get("hero", "")),
        "{{foto_prima}}": prima_dopo[0],
        "{{foto_dopo}}": prima_dopo[1],
        "{{schema_orari}}": schema_orari(orari),
    }
    for k, v in repl.items():
        html = html.replace(k, str(v))

    # §8 — nessun token residuo, altrimenti fermarsi
    leftover = sorted(set(re.findall(r"{{.*?}}", html)))
    if leftover:
        shutil.rmtree(dest)
        fail("§8: token non risolti, build interrotto: " + ", ".join(leftover))

    (dest / "index.html").write_text(html, encoding="utf-8")

    # --- §2 accento: imposta --volt su cliente.accento ---
    accento = cli.get("accento")
    if accento:
        if not re.fullmatch(r"#[0-9A-Fa-f]{6}", accento):
            fail("accento non valido (atteso #RRGGBB): %r" % accento)
        css = (dest / "style.css").read_text(encoding="utf-8")
        css, n = re.subn(r"(--volt:\s*)#[0-9A-Fa-f]{6}", r"\g<1>" + accento, css, count=1)
        if n:
            (dest / "style.css").write_text(css, encoding="utf-8")
    else:
        missing.append("accento (uso default --volt)")

    # --- foto: copia da img_dir se fornita; segnala i file mancanti ---
    ref_imgs = [foto.get("hero", "")] + list(galleria) + list(prima_dopo)
    ref_imgs = [x for x in ref_imgs if x]
    if img_dir:
        for name in ref_imgs:
            src = img_dir / name
            if src.exists():
                shutil.copy(src, dest / "img" / name)
            else:
                missing.append("foto assente: %s" % name)
    else:
        missing.append("foto non copiate (passa --img <dir>): " + ", ".join(ref_imgs))

    return dest, missing


def main(argv=None):
    ap = argparse.ArgumentParser(description="Build sito parrucchiere (§12)")
    ap.add_argument("cliente", help="percorso di cliente.json")
    ap.add_argument("--img", help="cartella con le foto del cliente (WebP)")
    ap.add_argument("--force", action="store_true", help="sovrascrive /siti/<slug>")
    args = ap.parse_args(argv)

    try:
        dest, missing = build(
            Path(args.cliente).resolve(),
            Path(args.img).resolve() if args.img else None,
            args.force,
        )
    except BuildError as e:
        print("BUILD FERMATO:", e, file=sys.stderr)
        return 1

    print("Sito generato in:", dest)
    if missing:
        print("\nCampi mancanti / da completare (§12):")
        for m in missing:
            print("  -", m)
    else:
        print("Nessun campo mancante.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
