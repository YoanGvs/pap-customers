import Link from "next/link";
import type { Customer } from "@/data/customers";

export default function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <article className="h-full rounded-xl bg-surface p-6">
      <h2 className="text-lg font-bold">
        <Link href={`/clients/${customer.id}`} className="text-primary underline underline-offset-4">
          {customer.name}
        </Link>
      </h2>
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
