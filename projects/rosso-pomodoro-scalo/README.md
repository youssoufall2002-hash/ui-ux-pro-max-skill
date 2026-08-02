# Rosso Pomodoro — Scalo Milano 🍕

Sito web per la pizzeria napoletana **Rosso Pomodoro Scalo Milano**.
Costruito con **Next.js 14 (App Router)**, **React** e **Tailwind CSS**.

Stile: *insegna vintage napoletana* — verde bottiglia, crema, rosso e giallo vintage, con
i font condensati da manifesto **Anton** (titoli), **Oswald** (etichette) e **Fraunces**
(testo old-style). Impaginazione a poster con cornici, timbri, badge, striscia a scorrimento
e menù con puntini di guida. Palette e tipografia generate con la skill [UI/UX Pro Max](../../).

## Sezioni

- **Hero** — headline, call-to-action e illustrazione pizza in puro CSS (nessuna immagine esterna).
- **Menù** — pizze suddivise in Classiche / Speciali / Bianche, con ingredienti e prezzi.
- **Storia** — i tre pilastri: impasto, forno a legna, ingredienti DOP.
- **Dove siamo** — indirizzo, orari e mappa Google incorporata.
- **Prenotazioni** — form che compone e invia il messaggio direttamente su **WhatsApp**
  (funziona senza backend), più tutti i contatti (telefono, email, Instagram).

## Avvio

```bash
cd projects/rosso-pomodoro-scalo
npm install
npm run dev      # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm run start
```

## Personalizzazione

Tutti i dati modificabili sono centralizzati — **non serve toccare i componenti**:

| Cosa | File |
|------|------|
| Nome, telefono, WhatsApp, email, indirizzo, orari, Instagram | `lib/site.ts` |
| Pizze, ingredienti, prezzi, categorie | `lib/menu.ts` |
| Colori e font | `tailwind.config.ts` |

> ⚠️ I valori di contatto, indirizzo, orari e prezzi in `lib/site.ts` e `lib/menu.ts`
> sono **segnaposto di esempio**: sostituiscili con i dati reali della pizzeria prima
> di pubblicare.

### Foto

Il sito non richiede immagini per funzionare. Per aggiungere foto reali dei piatti/del locale,
crea una cartella `public/` e usa il componente `next/image` nelle sezioni (Hero, Storia).

## Deploy

Il progetto è pronto per **Vercel** (consigliato per Next.js): importa il repo, imposta come
root directory `projects/rosso-pomodoro-scalo`, e il deploy è automatico. In alternativa
qualsiasi hosting che supporti Node.js.

---

Font © rispettivi autori (Google Fonts). Contenuti di esempio da personalizzare.
