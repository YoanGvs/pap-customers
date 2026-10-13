export const followUpStatuses = ["Normal", "À suivre", "Prioritaire"] as const;

export type FollowUpStatus = (typeof followUpStatuses)[number];

export type FollowUp = {
  customerId: string;
  name: string;
  type: string;
  city: string;
  status: FollowUpStatus;
  note?: string;
};
