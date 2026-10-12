"use server";

import { refresh } from "next/cache";
import { prisma } from "@/lib/prisma";
import { followUpStatuses } from "@/types/follow-up";

export type SaveFollowUpState = { error?: string; saved?: boolean };

export async function saveFollowUp(
  customerId: string,
  _previous: SaveFollowUpState,
  formData: FormData,
): Promise<SaveFollowUpState> {
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  // Appelable par un simple POST : on revérifie tout côté serveur
  if (note.length > 500) return { error: "La note ne doit pas dépasser 500 caractères." };
  if (status !== "" && !(followUpStatuses as readonly string[]).includes(status)) {
    return { error: "Statut inconnu." };
  }

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) return { error: "Client introuvable." };

    if (status === "") {
      await prisma.followUp.deleteMany({ where: { customerId } });
    } else {
      const data = { status, note: note || null };
      await prisma.followUp.upsert({ where: { customerId }, create: { customerId, ...data }, update: data });
    }
  } catch (error) {
    console.error(error);
    return { error: "Enregistrement impossible, réessayez." };
  }

  refresh();
  return { saved: true };
}
