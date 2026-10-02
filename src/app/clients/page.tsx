import type { Metadata } from "next";
import Link from "next/link";
import CustomerCard, { type CustomerPreview } from "@/components/customer-card";

export const metadata: Metadata = { title: "Clients | PAP Customers" };

// Exemples fixes : aucun tri ni calcul automatique à cette étape.
const customers: CustomerPreview[] = [
  { name: "Marie Dupont", type: "Crèche", city: "Lyon", orders: 24, revenue: "3 120 €", lastOrder: "28 août 2026" },
  { name: "Lucas Bernard", type: "École", city: "Paris", orders: 18, revenue: "2 450 €", lastOrder: "20 août 2026" },
  { name: "Sophie Martin", type: "Mairie", city: "Nantes", orders: 15, revenue: "1 980 €", lastOrder: "17 août 2026" },
  { name: "Thomas Petit", type: "Crèche", city: "Lille", orders: 11, revenue: "1 340 €", lastOrder: "12 août 2026" },
  { name: "Camille Leroy", type: "Association", city: "Bordeaux", orders: 9, revenue: "980 €", lastOrder: "3 août 2026" },
  { name: "Julie Moreau", type: "École", city: "Toulouse", orders: 7, revenue: "760 €", lastOrder: "28 juillet 2026" },
  { name: "Antoine Roux", type: "Particulier", city: "Rennes", orders: 4, revenue: "420 €", lastOrder: "15 juillet 2026" },
  { name: "Léa Fontaine", type: "Mairie", city: "Strasbourg", orders: 2, revenue: "210 €", lastOrder: "2 juillet 2026" },
];

export default function Clients() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="mt-2 text-sm">Contenu d’exemple. Les fiches individuelles seront reliées à l’étape suivante.</p>
      <Link href="/clients/exemple" className="mt-4 inline-block py-2 text-primary underline underline-offset-4">
        Voir la fiche d’exemple : Les Explorateurs
      </Link>

      <p id="search-help" className="mt-6 text-sm">Recherche et tri : aperçu, non disponibles pour le moment.</p>
      <fieldset disabled aria-describedby="search-help" className="mt-3 grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">Aperçu de la recherche et du tri</legend>
        <div>
          <label htmlFor="customer-search" className="block text-sm font-medium">Rechercher un client</label>
          <input id="customer-search" type="search" placeholder="Nom du client" className="mt-2 w-full rounded-lg border border-foreground/40 bg-surface p-3 placeholder:text-foreground/70" />
        </div>
        <div>
          <label htmlFor="customer-sort" className="block text-sm font-medium">Trier les clients</label>
          <select id="customer-sort" className="mt-2 w-full rounded-lg border border-foreground/40 bg-surface p-3">
            <option>Chiffre d’affaires décroissant</option>
          </select>
        </div>
      </fieldset>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <li key={customer.name}>
            <CustomerCard customer={customer} />
          </li>
        ))}
      </ul>
    </main>
  );
}
