import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FollowUpDialog from "@/components/follow-up-dialog";
import OrderList from "@/components/order-list";
import { getCustomer } from "@/lib/customers";

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CustomerPageProps): Promise<Metadata> {
  const { id } = await params;
  const customer = await getCustomer(id);
  return { title: `${customer?.name ?? "Client introuvable"} | PAP Customers` };
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    notFound();
  }

  const orders = customer.orderHistory ?? [];

  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <Link href="/clients" className="inline-block py-2 text-primary underline underline-offset-4">
        ← Retour aux clients
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Fiche client</h1>
      <p className="mt-2 text-sm">Données fictives lues depuis la base.</p>

      <section aria-labelledby="client-name" className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-surface p-6">
        <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background font-bold text-primary">{customer.name.slice(0, 1)}</span>
        <div>
          <h2 id="client-name" className="text-xl font-bold">{customer.name}</h2>
          <p className="mt-1 text-sm">{customer.type} · {customer.city}</p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section aria-labelledby="contact-title" className="rounded-xl bg-surface p-6">
          <h2 id="contact-title" className="text-lg font-bold">Coordonnées</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div><dt className="font-medium">Contact principal</dt><dd className="mt-1">{customer.contact ?? "Non renseigné"}</dd></div>
            <div><dt className="font-medium">E-mail</dt><dd className="mt-1 break-words">{customer.email ?? "Non renseigné"}</dd></div>
            <div><dt className="font-medium">Téléphone</dt><dd className="mt-1">{customer.phone ?? "Non renseigné"}</dd></div>
            <div><dt className="font-medium">Adresse</dt><dd className="mt-1">{customer.address ?? "Non renseignée"}</dd></div>
            <div><dt className="font-medium">Département</dt><dd className="mt-1">{customer.department ?? "Non renseigné"}</dd></div>
            <div><dt className="font-medium">Client depuis</dt><dd className="mt-1">{customer.since ?? "Non renseigné"}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="activity-title" className="rounded-xl bg-surface p-6">
          <h2 id="activity-title" className="text-lg font-bold">Résumé de l’activité</h2>
          <dl className="mt-4 grid gap-6 sm:grid-cols-2">
            <div><dt className="text-sm">Chiffre d’affaires total</dt><dd className="mt-2 text-2xl font-bold text-primary">{customer.revenue}</dd></div>
            <div><dt className="text-sm">Commandes</dt><dd className="mt-2 text-2xl font-bold">{customer.orders}</dd></div>
            <div><dt className="text-sm">Panier moyen</dt><dd className="mt-2 text-2xl font-bold">{customer.averageOrder ?? "Non renseigné"}</dd></div>
            <div><dt className="text-sm">Dernière commande</dt><dd className="mt-2 font-bold">{customer.lastOrder}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="orders-title" className="min-w-0 rounded-xl bg-surface p-6 lg:col-start-2 lg:row-start-2">
          <h2 id="orders-title" className="text-lg font-bold">Historique des commandes</h2>
          {orders.length > 0 ? (
            <OrderList orders={orders} />
          ) : (
            <p className="mt-4 text-sm">Aucune commande pour ce client.</p>
          )}
        </section>

        <section aria-labelledby="followup-title" className="rounded-xl bg-surface p-6 lg:col-start-1 lg:row-start-2">
          <h2 id="followup-title" className="text-lg font-bold">Suivi commercial</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-medium">Statut</dt>
              <dd className="mt-1 font-medium text-primary">{customer.followUp?.status ?? "Non suivi"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">Note de suivi</dt>
              <dd className="mt-1 text-sm leading-relaxed">{customer.followUp?.note ?? "Aucune note pour le moment."}</dd>
            </div>
          </dl>
          <FollowUpDialog
            customerId={customer.id}
            customerName={customer.name}
            status={customer.followUp?.status}
            note={customer.followUp?.note}
          />
        </section>
      </div>
    </main>
  );
}
