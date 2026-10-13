import type { Metadata } from "next";
import { connection } from "next/server";
import FollowUpCard from "@/components/follow-up-card";
import { getFollowUps } from "@/lib/follow-ups";

export const metadata: Metadata = { title: "Clients suivis | PAP Customers" };

export default async function FollowedClients() {
  await connection();
  const followUps = await getFollowUps();

  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients suivis</h1>
      <p className="mt-2 text-sm">Le statut et la note se modifient depuis la fiche du client.</p>

      {followUps.length === 0 ? (
        <p className="mt-6">Aucun client suivi pour le moment.</p>
      ) : (
        <ul className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {followUps.map((followUp) => (
            <li key={followUp.customerId} className="min-w-0">
              <FollowUpCard customer={followUp} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
