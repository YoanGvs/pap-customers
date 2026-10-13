"use client";

import { useState } from "react";
import CustomerCard from "@/components/customer-card";
import type { Customer } from "@/types/customer";

type Sort = "revenue" | "name" | "recent";

// "Léa" doit ressortir quand on tape "lea"
function simplify(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function compare(a: Customer, b: Customer, sort: Sort) {
  if (sort === "name") return a.name.localeCompare(b.name, "fr");
  if (sort === "recent") return (b.lastOrderDate ?? "").localeCompare(a.lastOrderDate ?? "");
  return b.revenueCents - a.revenueCents;
}

export default function CustomerList({ customers }: { customers: Customer[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("revenue");

  const visibleCustomers = customers
    .filter((customer) => simplify(customer.name).includes(simplify(search.trim())))
    .sort((a, b) => compare(a, b, sort));

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customer-search" className="block text-sm font-medium">Rechercher un client</label>
          <input
            id="customer-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom du client"
            className="mt-2 w-full rounded-lg border border-foreground/40 bg-surface p-3 placeholder:text-foreground/70"
          />
        </div>
        <div>
          <label htmlFor="customer-sort" className="block text-sm font-medium">Trier les clients</label>
          <select
            id="customer-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="mt-2 w-full rounded-lg border border-foreground/40 bg-surface p-3"
          >
            <option value="revenue">Chiffre d’affaires décroissant</option>
            <option value="name">Nom de A à Z</option>
            <option value="recent">Commande la plus récente</option>
          </select>
        </div>
      </div>

      <p role="status" className="mt-6 text-sm">
        {visibleCustomers.length === 0
          ? `Aucun client ne correspond à « ${search.trim()} ».`
          : `${visibleCustomers.length} client${visibleCustomers.length > 1 ? "s" : ""}`}
      </p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleCustomers.map((customer) => (
          <li key={customer.id}>
            <CustomerCard customer={customer} />
          </li>
        ))}
      </ul>
    </>
  );
}
