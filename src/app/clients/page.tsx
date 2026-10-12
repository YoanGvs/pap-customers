import type { Metadata } from "next";
import { connection } from "next/server";
import CustomerCard from "@/components/customer-card";
import { getCustomers } from "@/lib/customers";

export const metadata: Metadata = { title: "Clients | PAP Customers" };

export default async function Clients() {
  // Rendu à chaque requête, sinon la liste reste figée au build
  await connection();
  const customers = await getCustomers();

  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="mt-2 text-sm">Données fictives lues depuis la base. Choisissez un client pour consulter sa fiche.</p>

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

      {customers.length === 0 && <p className="mt-6">Aucun client enregistré pour le moment.</p>}
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
