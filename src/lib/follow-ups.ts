import "server-only";
import { prisma } from "@/lib/prisma";
import { followUpStatuses, type FollowUp, type FollowUpStatus } from "@/types/follow-up";

export async function getFollowUps(): Promise<FollowUp[]> {
  const followUps = await prisma.followUp.findMany({ include: { customer: true } });

  return followUps
    .map((followUp) => ({
      customerId: followUp.customerId,
      name: followUp.customer.name,
      type: followUp.customer.type,
      city: followUp.customer.city,
      status: followUp.status as FollowUpStatus,
      note: followUp.note ?? undefined,
    }))
    // Prioritaire d'abord, Normal en dernier
    .sort((a, b) => followUpStatuses.indexOf(b.status) - followUpStatuses.indexOf(a.status));
}
