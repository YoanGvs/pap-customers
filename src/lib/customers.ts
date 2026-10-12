import "server-only";
import { cache } from "react";
import type { Customer as StoredCustomer, Order } from "@/generated/prisma/client";
import type { Customer } from "@/types/customer";
import { prisma } from "@/lib/prisma";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency", currency: "EUR", minimumFractionDigits: 2, trailingZeroDisplay: "stripIfInteger",
});
const longDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "UTC" });

type CustomerWithOrders = StoredCustomer & { orders: Order[] };

// Les chiffres se déduisent des commandes, rien n'est stocké en double
function getRevenueCents(orders: Order[]) {
  return orders.reduce((total, order) => total + order.amountCents, 0);
}

// Centimes et dates ISO -> texte affichable
function toCustomer(customer: CustomerWithOrders): Customer {
  const orderCount = customer.orders.length;
  const revenueCents = getRevenueCents(customer.orders);
  const lastOrder = customer.orders.map((order) => order.date).sort().at(-1);

  return {
    id: customer.id,
    name: customer.name,
    type: customer.type,
    city: customer.city,
    orders: orderCount,
    revenue: euros.format(revenueCents / 100),
    lastOrder: lastOrder ? longDate.format(new Date(lastOrder)) : "Aucune",
    department: customer.department ?? undefined,
    since: customer.since ? longDate.format(new Date(customer.since)) : undefined,
    contact: customer.contact ?? undefined,
    email: customer.email ?? undefined,
    phone: customer.phone ?? undefined,
    address: customer.address ?? undefined,
    averageOrder: orderCount > 0 ? euros.format(Math.round(revenueCents / orderCount) / 100) : undefined,
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const customers = await prisma.customer.findMany({ include: { orders: true } });
  // Tri en JS : le chiffre d'affaires n'est pas une colonne
  customers.sort((a, b) => getRevenueCents(b.orders) - getRevenueCents(a.orders));
  return customers.map(toCustomer);
}

// cache() : une seule lecture pour generateMetadata et la page
export const getCustomer = cache(async (id: string): Promise<Customer | null> => {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: { orders: { orderBy: { date: "desc" } } },
  });
  if (!customer) return null;

  return {
    ...toCustomer(customer),
    orderHistory: customer.orders.map((order) => ({
      reference: order.reference,
      date: shortDate.format(new Date(order.date)),
      dateTime: order.date,
      amount: euros.format(order.amountCents / 100),
      status: order.status,
    })),
  };
});
