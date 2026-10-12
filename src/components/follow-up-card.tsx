import Link from "next/link";
import type { FollowUp } from "@/types/follow-up";

export default function FollowUpCard({ customer }: { customer: FollowUp }) {
  return (
    <article className="h-full min-w-0 rounded-xl bg-surface p-4 break-words md:p-6">
      <h2 className="text-lg font-bold">
        <Link href={`/clients/${customer.customerId}`} className="text-primary underline underline-offset-4">
          {customer.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm">
        {customer.type} · {customer.city}
      </p>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="text-sm font-medium">Statut</dt>
          <dd className="mt-1 inline-block rounded-md bg-background px-3 py-1 font-medium text-primary">
            {customer.status}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium">Note de suivi</dt>
          <dd className="mt-1 text-sm leading-relaxed">
            {customer.note || "Aucune note pour le moment."}
          </dd>
        </div>
      </dl>
    </article>
  );
}
