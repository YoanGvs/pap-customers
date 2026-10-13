import type { FollowUpStatus } from "@/types/follow-up";

const colors: Record<FollowUpStatus, string> = {
  Normal: "bg-emerald-100 text-emerald-800",
  "À suivre": "bg-amber-100 text-amber-900",
  Prioritaire: "bg-red-100 text-red-800",
};

export default function FollowUpStatusBadge({ status }: { status?: FollowUpStatus }) {
  return (
    <span className={`inline-block rounded-md px-3 py-1 font-medium ${status ? colors[status] : "bg-background"}`}>
      {status ?? "Non suivi"}
    </span>
  );
}
