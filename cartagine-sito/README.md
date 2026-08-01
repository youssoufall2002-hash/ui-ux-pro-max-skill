# Cartagine Pizza — sito

Sito rinnovato della pizzeria **Cartagine Pizza** di Caprino Bergamasco (BG),
in sostituzione del vecchio sito realizzato con Mobirise.

## Contenuto

| File | Descrizione |
|---|---|
| `index.html` | L'intera pagina (una sola pagina, niente sottopagine) |
| `assets/img/` | Le fotografie del locale e dei piatti |
| `assets/fonts/` | I caratteri Fraunces e Figtree, serviti dal sito stesso |
| `assets/favicon.svg` | L'icona mostrata nella scheda del browser |
| `COME-CARICARE.txt` | Istruzioni per la messa online |

## Struttura della pagina

La home segue quattro momenti, ognuno risponde a una domanda:

1. **Presentazione** — che posto è
2. **Menu** — cosa si mangia
3. **Il locale** — gallery e recensioni
4. **Come venire** — orari, contatti, mappa

## Scelte tecniche

- Nessuna libreria esterna: solo HTML, CSS e JavaScript essenziale.
- I caratteri sono inclusi nel sito e non caricati dai server di Google,
  per evitare il trasferimento degli indirizzi IP dei visitatori.
- Dati strutturati `Restaurant` (orari, indirizzo, telefono, coordinate)
  per le ricerche locali e Google Maps.
- Il giorno corrente viene evidenziato automaticamente nella tabella orari.

## Aggiornare i contenuti

Tutto si modifica dentro `index.html`:

- **prezzi e piatti** → cercare `const MENU=`
- **orari** → cercare `const H=`
- **telefono** → cercare `035788138`
