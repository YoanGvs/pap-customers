import type { Metadata } from "next";
import FollowUpCard, { type FollowUp } from "@/components/follow-up-card";

export const metadata: Metadata = { title: "Clients suivis | PAP Customers" };

const followedCustomers: FollowUp[] = [
  {
    name: "Les Explorateurs",
    type: "Crèche",
    city: "Lyon",
    status: "Prioritaire",
    note: "Faire le point sur les besoins pour le prochain équipement.",
  },
  {
    name: "École des Tilleuls",
    type: "École",
    city: "Paris",
    status: "À suivre",
    note: "Reprendre contact après la rentrée.",
  },
  {
    name: "Mairie de Bellevue",
    type: "Mairie",
    city: "Nantes",
    status: "Normal",
  },
];

export default function FollowedClients() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients suivis</h1>
      <p className="mt-2 text-sm">
        Exemples de suivi. Les statuts et notes seront modifiables plus tard.
      </p>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {followedCustomers.map((customer) => (
          <li key={customer.name} className="min-w-0">
            <FollowUpCard customer={customer} />
          </li>
        ))}
      </ul>
    </main>
  );
}
