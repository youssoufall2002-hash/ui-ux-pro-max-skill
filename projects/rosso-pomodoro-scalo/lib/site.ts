/**
 * Configurazione centrale del sito.
 * ⚠️ PERSONALIZZA questi valori con i dati reali della pizzeria
 *    (telefono, indirizzo, orari) prima di andare online.
 */

export const site = {
  name: "Rosso Pomodoro",
  place: "Scalo · Milano",
  legalName: "Rosso Pomodoro Scalo Milano",
  tagline: "La vera pizza napoletana, nel cuore dello Scalo di Milano",
  description:
    "Pizzeria napoletana a Milano: impasto a lunga lievitazione, forno a legna e ingredienti campani DOP. Prenota il tuo tavolo allo Scalo.",

  // Contatti — SOSTITUISCI con i dati reali
  phone: "+39 02 1234 5678",
  phoneHref: "tel:+390212345678",
  whatsapp: "393000000000", // numero in formato internazionale senza "+" per wa.me
  email: "scalomilano@rossopomodoro.it",
  instagram: "https://www.instagram.com/rossopomodoroscalomilano",

  // Indirizzo — SOSTITUISCI con l'indirizzo reale
  address: {
    street: "Via dello Scalo, 00",
    zip: "20100",
    city: "Milano",
    country: "Italia",
  },
  mapsQuery: "Rosso Pomodoro Scalo Milano",

  // Orari di apertura — SOSTITUISCI con gli orari reali
  hours: [
    { days: "Lunedì", time: "Chiuso", closed: true },
    { days: "Martedì – Giovedì", time: "12:00 – 15:00 · 19:00 – 23:00" },
    { days: "Venerdì – Sabato", time: "12:00 – 15:30 · 19:00 – 00:00" },
    { days: "Domenica", time: "12:00 – 15:30 · 19:00 – 23:00" },
  ],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery,
)}&output=embed`;
