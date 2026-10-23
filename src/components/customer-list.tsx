"use client";

import { useState } from "react";
import Link from "next/link";
import CustomerCard from "@/components/customer-card";
import type { Customer } from "@/types/customer";

type Sort = "revenue" | "name" | "recent";
type View = "cards" | "list";

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
  const [view, setView] = useState<View>("cards");

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

      <div className="mt-6 flex items-center justify-between gap-4">
        <p role="status" className="text-sm">
          {visibleCustomers.length === 0
            ? `Aucun client ne correspond à « ${search.trim()} ».`
            : `${visibleCustomers.length} client${visibleCustomers.length > 1 ? "s" : ""}`}
        </p>
        {/* Le tableau déborde sous lg : le choix n'apparaît qu'à partir de là */}
        <div role="group" aria-label="Affichage des clients" className="hidden gap-2 lg:flex">
          <button
            type="button"
            aria-pressed={view === "cards"}
            onClick={() => setView("cards")}
            className="rounded-lg bg-surface px-4 py-2 text-sm font-medium aria-pressed:bg-primary aria-pressed:text-white"
          >
            Cartes
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className="rounded-lg bg-surface px-4 py-2 text-sm font-medium aria-pressed:bg-primary aria-pressed:text-white"
          >
            Liste
          </button>
        </div>
      </div>

      <ul className={`mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${view === "list" ? "lg:hidden" : ""}`}>
        {visibleCustomers.map((customer) => (
          <li key={customer.id}>
            <CustomerCard customer={customer} />
          </li>
        ))}
      </ul>

      {view === "list" && visibleCustomers.length > 0 && (
        <table className="mt-3 hidden w-full rounded-xl bg-surface text-left text-sm lg:table">
          <caption className="sr-only">Liste des clients</caption>
          <thead>
            <tr>
              <th scope="col" className="p-4 font-medium">Client</th>
              <th scope="col" className="p-4 font-medium">Structure</th>
              <th scope="col" className="p-4 font-medium">Ville</th>
              <th scope="col" className="p-4 font-medium">Chiffre d’affaires</th>
              <th scope="col" className="p-4 font-medium">Commandes</th>
              <th scope="col" className="p-4 font-medium">Dernière commande</th>
            </tr>
          </thead>
          <tbody>
            {visibleCustomers.map((customer) => (
              <tr key={customer.id} className="border-t border-background">
                <td className="p-4">
                  <Link href={`/clients/${customer.id}`} className="font-medium text-primary underline underline-offset-4">
                    {customer.name}
                  </Link>
                </td>
                <td className="p-4">{customer.type}</td>
                <td className="p-4">{customer.city}</td>
                <td className="p-4 font-bold text-primary">{customer.revenue}</td>
                <td className="p-4">{customer.orders}</td>
                <td className="p-4">{customer.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
