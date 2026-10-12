import type { Metadata } from "next";
import { connection } from "next/server";
import CustomerList from "@/components/customer-list";
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

      {customers.length === 0 ? (
        <p className="mt-6">Aucun client enregistré pour le moment.</p>
      ) : (
        <CustomerList customers={customers} />
      )}
    </main>
  );
}
