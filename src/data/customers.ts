import type { OrderPreview } from "@/components/order-list";

// L'identifiant relie le nom cliqué à sa fiche. Les champs avec ? peuvent manquer.
export type Customer = {
  id: string;
  name: string;
  type: string;
  city: string;
  orders: number;
  revenue: string;
  lastOrder: string;
  department?: string;
  since?: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
  averageOrder?: string;
  orderHistory?: OrderPreview[];
};

// Exemples existants regroupés ici : les montants et compteurs ne sont pas calculés.
export const customers: Customer[] = [
  {
    id: "9",
    name: "Les Explorateurs",
    type: "Crèche privée",
    city: "Lyon",
    orders: 18,
    revenue: "128 400 €",
    lastOrder: "28 août 2026",
    department: "Rhône (69)",
    since: "15 mars 2021",
    contact: "Camille Martin",
    email: "contact@exemple.fr",
    phone: "04 00 00 00 00",
    address: "12 rue des Jardins, 69000 Lyon",
    averageOrder: "7 133,33 €",
    orderHistory: [
      { reference: "CMD-2026-084", date: "28/08/2026", dateTime: "2026-08-28", amount: "4 850 €", status: "Livrée" },
      { reference: "CMD-2026-083", date: "18/07/2026", dateTime: "2026-07-18", amount: "8 200 €", status: "Livrée" },
      { reference: "CMD-2026-082", date: "02/06/2026", dateTime: "2026-06-02", amount: "3 600 €", status: "Livrée" },
      { reference: "CMD-2026-081", date: "14/05/2026", dateTime: "2026-05-14", amount: "5 480 €", status: "Livrée" },
    ],
  },
  { id: "1", name: "Marie Dupont", type: "Crèche", city: "Lyon", orders: 24, revenue: "3 120 €", lastOrder: "28 août 2026" },
  { id: "2", name: "Lucas Bernard", type: "École", city: "Paris", orders: 18, revenue: "2 450 €", lastOrder: "20 août 2026" },
  { id: "3", name: "Sophie Martin", type: "Mairie", city: "Nantes", orders: 15, revenue: "1 980 €", lastOrder: "17 août 2026" },
  { id: "4", name: "Thomas Petit", type: "Crèche", city: "Lille", orders: 11, revenue: "1 340 €", lastOrder: "12 août 2026" },
  { id: "5", name: "Camille Leroy", type: "Association", city: "Bordeaux", orders: 9, revenue: "980 €", lastOrder: "3 août 2026" },
  { id: "6", name: "Julie Moreau", type: "École", city: "Toulouse", orders: 7, revenue: "760 €", lastOrder: "28 juillet 2026" },
  { id: "7", name: "Antoine Roux", type: "Particulier", city: "Rennes", orders: 4, revenue: "420 €", lastOrder: "15 juillet 2026" },
  { id: "8", name: "Léa Fontaine", type: "Mairie", city: "Strasbourg", orders: 2, revenue: "210 €", lastOrder: "2 juillet 2026" },
];

export function getCustomer(id: string) {
  return customers.find((customer) => customer.id === id);
}
