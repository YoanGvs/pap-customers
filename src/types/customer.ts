import type { OrderPreview } from "@/components/order-list";

// Client prêt à afficher (montants et dates formatés)
export type Customer = {
  id: string;
  name: string;
  type: string;
  city: string;
  orders: number;
  revenue: string;
  lastOrder: string;
  // Valeurs brutes, pour le tri
  revenueCents: number;
  lastOrderDate?: string;
  department?: string;
  since?: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
  averageOrder?: string;
  orderHistory?: OrderPreview[];
};
