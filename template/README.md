# /template — sito parrucchiere

Template statico riusabile che implementa il design system (§2–§10 del CLAUDE.md).
Il build (§12) lo duplica in `/siti/<slug>` e sostituisce i token con i dati di `cliente.json`.

**Non modificare struttura, tipografia o spaziature.** Il template è il vincolo, non un punto di partenza da reinterpretare.

## File

```
template/
  index.html     struttura fissa dei componenti (§5, ordine non modificabile)
  style.css      token colore/tipo/spazio, layout, movimento (§2–§4, §7)
  script.js      solo lo slider prima/dopo (§6) — vanilla, nessun framework
  cliente.json   esempio dei dati d'ingresso (§11)
  img/           foto del cliente in WebP (§9)
```

## Convenzione dei token (per il build, §12)

Il build fa due cose sul solo `index.html`:

**1. Sostituzione `{{campo}}`** con i valori di `cliente.json`:

| Token | Origine |
|---|---|
| `{{nome}}` `{{citta}}` `{{telefono}}` `{{whatsapp}}` `{{indirizzo}}` | campi omonimi |
| `{{instagram}}` `{{mappa_embed}}` | campi omonimi |
| `{{foto_hero}}` | `foto.hero` |
| `{{foto_prima}}` `{{foto_dopo}}` | `foto.prima_dopo[0]`, `[1]` |
| `{{schema_orari}}` | `orari` → array `OpeningHoursSpecification` (JSON-LD) |

**2. Ripetizione dei blocchi** marcati `<!-- BEGIN:x -->` … `<!-- END:x -->`:

| Blocco | Itera su | Token interni |
|---|---|---|
| `servizi` | `servizi[]` | `{{servizio_nome}}` `{{servizio_prezzo}}` |
| `galleria` | `foto.galleria[]` | `{{galleria_foto}}` |
| `orari` | `orari{}` | `{{orario_giorno}}` `{{orario_valore}}` |

**3. Accento:** il build imposta `--volt` su `cliente.accento` (§2, §12). Nessun'altra variabile cambia.

Il build **elenca alla fine i campi mancanti** (§12) e **si ferma** se manca `foto.prima_dopo` (§6) o se restano token non sostituiti (§8: niente placeholder nel file finale).

## Note di conformità

- **Colore (§2):** `--chrome` è usato come testo solo su fondo scuro (`--ink`, footer), dove il contrasto è ≥ 4.5:1 (§9). Su `--paper` chrome resta **solo** bordo/linea; il testo secondario su chiaro è `--ink`. Così si rispettano insieme «solo questi token» e il quality floor.
- **Font (§3):** caricati via `<link>` Google Fonts (CSS, non un framework JS). Per un pacchetto 100% offline, self-hostare i tre font in `/img/../fonts` e sostituire il `<link>` con `@font-face`.
- **Movimento (§7):** animati solo il caricamento hero e lo slider; hover = solo colore; `prefers-reduced-motion` azzera tutto.
- **`{{mappa_embed}}`** è l'`src` dell'iframe di Google Maps (campo `mappa_embed` in `cliente.json`). Se vuoto, il build lo segnala tra i campi mancanti.

## Anteprima locale

Apri `template/index.html` nel browser: i token `{{…}}` restano visibili (è il template, non un sito finale). Per vedere un sito reale, esegui il build su un `cliente.json` compilato.
