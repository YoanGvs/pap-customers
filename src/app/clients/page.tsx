import type { Metadata } from "next";
import CustomerCard from "@/components/customer-card";
import { customers } from "@/data/customers";

export const metadata: Metadata = { title: "Clients | PAP Customers" };

export default function Clients() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="mt-2 text-sm">Données fictives. Choisissez un client pour consulter sa fiche.</p>

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
          <li key={customer.id}>
            <CustomerCard customer={customer} />
          </li>
        ))}
      </ul>
    </main>
  );
}
