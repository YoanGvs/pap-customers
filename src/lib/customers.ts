import "server-only";
import { cache } from "react";
import type { Customer as StoredCustomer } from "@/generated/prisma/client";
import type { Customer } from "@/types/customer";
import { prisma } from "@/lib/prisma";

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 2,
});
const longDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "UTC" });

// Centimes et dates ISO -> texte affichable
function toCustomer(customer: StoredCustomer): Customer {
  return {
    id: customer.id,
    name: customer.name,
    type: customer.type,
    city: customer.city,
    orders: customer.orderCount,
    revenue: euros.format(customer.revenueCents / 100),
    lastOrder: longDate.format(new Date(customer.lastOrder)),
    department: customer.department ?? undefined,
    since: customer.since ? longDate.format(new Date(customer.since)) : undefined,
    contact: customer.contact ?? undefined,
    email: customer.email ?? undefined,
    phone: customer.phone ?? undefined,
    address: customer.address ?? undefined,
    averageOrder: customer.averageOrderCents === null ? undefined : euros.format(customer.averageOrderCents / 100),
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const customers = await prisma.customer.findMany({
    orderBy: [{ revenueCents: "desc" }, { id: "asc" }],
  });
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
