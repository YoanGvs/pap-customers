import type { OrderPreview } from "@/components/order-list";

// Informations déjà préparées pour les écrans (montants et dates lisibles).
export type Customer = {
  id: string;
  name: string;
  type: string;
  city: string;
  orders: number;
  revenue: string;
  lastOrder: string;
  department?: string;
  since?: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
  averageOrder?: string;
  orderHistory?: OrderPreview[];
};
