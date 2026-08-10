# Bozze serate BlackMotion

Ogni serata ha il suo file, così non si sovrascrivono a vicenda.

- `_template-serata.html` — base riutilizzabile: duplica questo file e riempi i campi
  (data, titolo, venue, descrizione, DJ) + la data del countdown nello `<script>` in fondo.
- `blackmotion-urban-shadows.html` — bozza serata **Urban Shadows** (Zero Club, Bergamo).

## Come aggiungere una nuova serata
1. Copia `_template-serata.html` in `blackmotion-<nome-serata>.html`
2. Modifica: `date-big`, `date-meta`, `title`, `venue`, `desc`, i blocchi DJ
3. Aggiorna il countdown: `var EVENT = new Date(anno, mese0based, giorno, ora, min)`
