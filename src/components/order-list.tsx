export type OrderPreview = {
  reference: string;
  date: string;
  dateTime: string;
  amount: string;
  status: string;
};

function OrderCard({ order }: { order: OrderPreview }) {
  return (
    <article className="py-4">
      <h3 className="font-medium">{order.reference}</h3>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <dt>Date</dt><dd><time dateTime={order.dateTime}>{order.date}</time></dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Montant HT</dt><dd className="font-bold">{order.amount}</dd>
        </div>
        <div className="flex justify-between gap-4"><dt>Statut</dt><dd>{order.status}</dd></div>
      </dl>
    </article>
  );
}

export default function OrderList({ orders }: { orders: OrderPreview[] }) {
  return (
    <>
      {/* Liste sur mobile, tableau à partir de md */}
      <ul className="mt-4 divide-y divide-background md:hidden">
        {orders.map((order) => <li key={order.reference}><OrderCard order={order} /></li>)}
      </ul>
      <table className="mt-4 hidden w-full text-left text-sm md:table">
        <caption className="sr-only">Dernières commandes du client</caption>
        <thead>
          <tr>
            <th scope="col" className="py-3 pr-3">Commande</th>
            <th scope="col" className="py-3 pr-3">Date</th>
            <th scope="col" className="py-3 pr-3">Montant HT</th>
            <th scope="col" className="py-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.reference} className="border-t border-background">
              <td className="py-4 pr-3 font-medium">{order.reference}</td>
              <td className="py-4 pr-3"><time dateTime={order.dateTime}>{order.date}</time></td>
              <td className="py-4 pr-3 font-bold">{order.amount}</td>
              <td className="py-4">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
