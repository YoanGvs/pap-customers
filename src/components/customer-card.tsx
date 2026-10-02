// Ce type décrit les informations que la page doit fournir à une carte.
// Le montant reste du texte d'affichage tant que les calculs ne sont pas branchés.
export type CustomerPreview = {
  name: string;
  type: string;
  city: string;
  orders: number;
  revenue: string;
  lastOrder: string;
};

export default function CustomerCard({ customer }: { customer: CustomerPreview }) {
  return (
    <article className="h-full rounded-xl bg-surface p-6">
      <h2 className="text-lg font-bold">{customer.name}</h2>
      <p className="mt-1 text-sm">{customer.type} · {customer.city}</p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt>Chiffre d’affaires</dt>
          <dd className="text-xl font-bold text-primary">{customer.revenue}</dd>
        </div>
        <div><dt>Commandes</dt><dd className="font-medium">{customer.orders}</dd></div>
        <div><dt>Dernière commande</dt><dd className="font-medium">{customer.lastOrder}</dd></div>
      </dl>
    </article>
  );
}
