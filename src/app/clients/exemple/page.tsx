import type { Metadata } from "next";
import Link from "next/link";
import OrderList, { type OrderPreview } from "@/components/order-list";

// TypeScript vérifie les informations de la page affichées dans l'onglet.
export const metadata: Metadata = {
  title: "Fiche d’exemple | PAP Customers",
};

// Contenu fixe de la maquette : aucune lecture de base ni aucun calcul ici.
const orders: OrderPreview[] = [
  { reference: "CMD-2026-084", date: "28/08/2026", dateTime: "2026-08-28", amount: "4 850 €", status: "Livrée" },
  { reference: "CMD-2026-083", date: "18/07/2026", dateTime: "2026-07-18", amount: "8 200 €", status: "Livrée" },
  { reference: "CMD-2026-082", date: "02/06/2026", dateTime: "2026-06-02", amount: "3 600 €", status: "Livrée" },
  { reference: "CMD-2026-081", date: "14/05/2026", dateTime: "2026-05-14", amount: "5 480 €", status: "Livrée" },
];

export default function CustomerExample() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <Link href="/clients" className="inline-block py-2 text-primary underline underline-offset-4">
        ← Retour aux clients
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Fiche client</h1>
      <p className="mt-2 text-sm">Fiche d’exemple · Données fictives, non enregistrables.</p>

      <section aria-labelledby="client-name" className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-surface p-6">
        <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background font-bold text-primary">LE</span>
        <div>
          <h2 id="client-name" className="text-xl font-bold">Les Explorateurs</h2>
          <p className="mt-1 text-sm">Crèche privée · Lyon</p>
        </div>
        <p className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-900">Actif</p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section aria-labelledby="contact-title" className="rounded-xl bg-surface p-6">
          <h2 id="contact-title" className="text-lg font-bold">Coordonnées</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div><dt className="font-medium">Contact principal</dt><dd className="mt-1">Camille Martin</dd></div>
            <div><dt className="font-medium">E-mail</dt><dd className="mt-1 break-words">contact@exemple.fr</dd></div>
            <div><dt className="font-medium">Téléphone</dt><dd className="mt-1">04 00 00 00 00</dd></div>
            <div><dt className="font-medium">Adresse</dt><dd className="mt-1">12 rue des Jardins<br />69000 Lyon</dd></div>
            <div><dt className="font-medium">Département</dt><dd className="mt-1">Rhône (69)</dd></div>
            <div><dt className="font-medium">Client depuis</dt><dd className="mt-1"><time dateTime="2021-03-15">15 mars 2021</time></dd></div>
          </dl>
        </section>

        <section aria-labelledby="activity-title" className="rounded-xl bg-surface p-6">
          <h2 id="activity-title" className="text-lg font-bold">Résumé de l’activité</h2>
          <dl className="mt-4 grid gap-6 sm:grid-cols-2">
            <div><dt className="text-sm">Chiffre d’affaires total</dt><dd className="mt-2 text-2xl font-bold text-primary">128 400 €</dd></div>
            <div><dt className="text-sm">Commandes</dt><dd className="mt-2 text-2xl font-bold">18</dd></div>
            <div><dt className="text-sm">Panier moyen</dt><dd className="mt-2 text-2xl font-bold">7 133,33 €</dd></div>
            <div><dt className="text-sm">Dernière commande</dt><dd className="mt-2 font-bold"><time dateTime="2026-08-28">28 août 2026</time></dd></div>
          </dl>
        </section>

        <section aria-labelledby="orders-title" className="min-w-0 rounded-xl bg-surface p-6 lg:col-start-2 lg:row-start-2">
          <h2 id="orders-title" className="text-lg font-bold">Historique des commandes</h2>
          <p className="mt-1 text-sm">4 commandes affichées sur 18.</p>

          <OrderList orders={orders} />
        </section>

        <section aria-labelledby="followup-title" className="rounded-xl bg-surface p-6 lg:col-start-1 lg:row-start-2">
          <h2 id="followup-title" className="text-lg font-bold">Suivi commercial</h2>
          <p id="followup-help" className="mt-2 text-sm">Aperçu uniquement : la modification et la sauvegarde seront ajoutées plus tard.</p>
          {/* Les champs restent désactivés pour ne pas laisser croire qu'une saisie serait sauvegardée. */}
          <fieldset disabled aria-describedby="followup-help" className="mt-4 space-y-4">
            <legend className="sr-only">Aperçu du formulaire de suivi</legend>
            <div>
              <label htmlFor="client-status" className="block text-sm font-medium">Statut du suivi</label>
              <select id="client-status" defaultValue="normal" className="mt-2 w-full rounded-lg border border-foreground/40 bg-background p-3 text-foreground">
                <option value="normal">Normal</option>
                <option value="follow-up">À suivre</option>
                <option value="priority">Prioritaire</option>
              </select>
            </div>
            <div>
              <label htmlFor="client-note" className="block text-sm font-medium">Note de suivi</label>
              <textarea id="client-note" rows={4} placeholder="Ajouter une note de suivi…" className="mt-2 w-full rounded-lg border border-foreground/40 bg-background p-3 text-foreground placeholder:text-foreground/70" />
            </div>
            <button type="button" className="w-full cursor-not-allowed rounded-lg bg-primary px-4 py-3 font-medium text-white opacity-60">Enregistrer</button>
          </fieldset>
        </section>
      </div>
    </main>
  );
}
