// Valeurs provisoires en attendant les vraies donnees.
const customers = [
  { name: "Marie Dupont", type: "Crèche", city: "Lyon", orders: 24, revenue: "3 120 €" },
  { name: "Lucas Bernard", type: "École", city: "Paris", orders: 18, revenue: "2 450 €" },
  { name: "Sophie Martin", type: "Mairie", city: "Nantes", orders: 15, revenue: "1 980 €" },
  { name: "Thomas Petit", type: "Crèche", city: "Lille", orders: 11, revenue: "1 340 €" },
  { name: "Camille Leroy", type: "Association", city: "Bordeaux", orders: 9, revenue: "980 €" },
  { name: "Julie Moreau", type: "École", city: "Toulouse", orders: 7, revenue: "760 €" },
  { name: "Antoine Roux", type: "Particulier", city: "Rennes", orders: 4, revenue: "420 €" },
  { name: "Léa Fontaine", type: "Mairie", city: "Strasbourg", orders: 2, revenue: "210 €" },
];

export default function Clients() {
  return (
    <main className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Clients</h1>

      <ul className="mt-6 flex flex-col gap-4 md:hidden">
        {customers.map((customer) => (
          <li key={customer.name} className="rounded-xl bg-surface p-4">
            <p className="font-medium">{customer.name}</p>
            <p className="mt-1 text-sm">
              {customer.type} · {customer.city}
            </p>
            <p className="mt-1 text-sm">{customer.orders} commandes</p>
            <p className="mt-1 font-bold text-primary">{customer.revenue}</p>
          </li>
        ))}
      </ul>

      <table className="mt-6 hidden w-full rounded-xl bg-surface md:table">
        <thead>
          <tr className="text-left text-sm">
            <th className="p-4 font-medium">Nom</th>
            <th className="p-4 font-medium">Structure</th>
            <th className="p-4 font-medium">Ville</th>
            <th className="p-4 font-medium">Commandes</th>
            <th className="p-4 font-medium">Chiffre d’affaires</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.name} className="border-t border-background">
              <td className="p-4">{customer.name}</td>
              <td className="p-4">{customer.type}</td>
              <td className="p-4">{customer.city}</td>
              <td className="p-4">{customer.orders}</td>
              <td className="p-4 font-bold text-primary">{customer.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
