import type { Metadata } from "next";

export const metadata: Metadata = { title: "Vue d’ensemble | PAP Customers" };

const topCustomers = [
  { name: "Marie Dupont", orders: 24, revenue: "3 120 €" },
  { name: "Lucas Bernard", orders: 18, revenue: "2 450 €" },
  { name: "Sophie Martin", orders: 15, revenue: "1 980 €" },
  { name: "Thomas Petit", orders: 11, revenue: "1 340 €" },
  { name: "Camille Leroy", orders: 9, revenue: "980 €" },
];

export default function Home() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Vue d’ensemble</h1>

      <section className="mt-6 flex flex-col gap-4 md:flex-row">
        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Chiffre d’affaires</p>
          <p className="mt-2 text-3xl font-bold text-primary">12 450 €</p>
        </article>

        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Clients</p>
          <p className="mt-2 text-3xl font-bold text-primary">128</p>
        </article>

        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Commandes</p>
          <p className="mt-2 text-3xl font-bold text-primary">342</p>
        </article>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Meilleurs clients</h2>

        <ul className="mt-4 flex flex-col gap-4 md:hidden">
          {topCustomers.map((customer) => (
            <li key={customer.name} className="rounded-xl bg-surface p-4">
              <p className="font-medium">{customer.name}</p>
              <p className="mt-1 text-sm">{customer.orders} commandes</p>
              <p className="mt-1 font-bold text-primary">{customer.revenue}</p>
            </li>
          ))}
        </ul>

        <table className="mt-4 hidden w-full rounded-xl bg-surface md:table">
          <caption className="sr-only">Les cinq meilleurs clients — valeurs d’exemple</caption>
          <thead>
            <tr className="text-left text-sm">
              <th scope="col" className="p-4 font-medium">Nom</th>
              <th scope="col" className="p-4 font-medium">Commandes</th>
              <th scope="col" className="p-4 font-medium">Chiffre d’affaires</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer) => (
              <tr key={customer.name} className="border-t border-background">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.orders}</td>
                <td className="p-4 font-bold text-primary">
                  {customer.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
