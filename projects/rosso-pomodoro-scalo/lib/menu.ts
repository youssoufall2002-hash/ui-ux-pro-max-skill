/**
 * Menù di esempio — personalizza pizze, ingredienti e prezzi.
 * I prezzi sono indicativi e vanno aggiornati.
 */

export type Pizza = {
  name: string;
  ingredients: string;
  price: string;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  pizzas: Pizza[];
};

export const menu: MenuCategory[] = [
  {
    id: "classiche",
    title: "Le Classiche",
    note: "Impasto a 24h di lievitazione, cotto nel forno a legna.",
    pizzas: [
      {
        name: "Marinara",
        ingredients: "Pomodoro San Marzano, aglio, origano, basilico, olio EVO",
        price: "€ 7,50",
      },
      {
        name: "Margherita",
        ingredients: "Pomodoro San Marzano, fiordilatte, basilico, olio EVO",
        price: "€ 9,00",
        signature: true,
      },
      {
        name: "Margherita DOP",
        ingredients: "Pomodoro San Marzano DOP, mozzarella di bufala campana, basilico",
        price: "€ 11,50",
        signature: true,
      },
      {
        name: "Napoli",
        ingredients: "Pomodoro, fiordilatte, acciughe di Cetara, capperi, origano",
        price: "€ 10,50",
      },
      {
        name: "Diavola",
        ingredients: "Pomodoro, fiordilatte, salame piccante di Napoli",
        price: "€ 11,00",
      },
    ],
  },
  {
    id: "speciali",
    title: "Le Speciali",
    note: "Le nostre pizze firma, nate allo Scalo.",
    pizzas: [
      {
        name: "Scalo",
        ingredients:
          "Crema di zucca, fiordilatte, 'nduja di Spilinga, provola affumicata, basilico croccante",
        price: "€ 14,00",
        signature: true,
      },
      {
        name: "Capricciosa",
        ingredients: "Pomodoro, fiordilatte, prosciutto cotto, funghi, carciofi, olive",
        price: "€ 13,00",
      },
      {
        name: "Ortolana",
        ingredients: "Fiordilatte, zucchine, melanzane, peperoni e pomodorini arrosto",
        price: "€ 12,50",
      },
      {
        name: "Bufala e Crudo",
        ingredients: "Mozzarella di bufala DOP, prosciutto crudo di Parma 24 mesi, rucola, scaglie di grana",
        price: "€ 14,50",
        signature: true,
      },
    ],
  },
  {
    id: "bianche",
    title: "Le Bianche",
    note: "Senza pomodoro, per chi ama i sapori pieni.",
    pizzas: [
      {
        name: "Quattro Formaggi",
        ingredients: "Fiordilatte, gorgonzola DOP, provola affumicata, grana padano",
        price: "€ 12,00",
      },
      {
        name: "Boscaiola",
        ingredients: "Fiordilatte, funghi porcini, salsiccia di maiale, provola affumicata",
        price: "€ 13,50",
      },
      {
        name: "Mortazza",
        ingredients: "Fiordilatte, mortadella IGP, granella di pistacchio, stracciatella",
        price: "€ 13,50",
        signature: true,
      },
    ],
  },
];
