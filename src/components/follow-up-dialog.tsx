"use client";

import { useActionState, useRef } from "react";
import { saveFollowUp, type SaveFollowUpState } from "@/app/clients/[id]/actions";
import { followUpStatuses, type FollowUpStatus } from "@/types/follow-up";

type FollowUpDialogProps = {
  customerId: string;
  customerName: string;
  status?: FollowUpStatus;
  note?: string;
};

export default function FollowUpDialog({ customerId, customerName, status, note }: FollowUpDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    async (previous: SaveFollowUpState, formData: FormData) => {
      const result = await saveFollowUp(customerId, previous, formData);
      if (result.saved) dialogRef.current?.close();
      return result;
    },
    {},
  );

  function open() {
    // Repart des valeurs enregistrées si on avait annulé une saisie
    formRef.current?.reset();
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button type="button" onClick={open} className="mt-4 w-full rounded-lg bg-primary px-4 py-3 font-medium text-white">
        Modifier le suivi
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="followup-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl bg-surface p-6 text-foreground backdrop:bg-foreground/50"
      >
        <h2 id="followup-dialog-title" className="text-lg font-bold">Suivi de {customerName}</h2>

        <form ref={formRef} action={formAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="client-status" className="block text-sm font-medium">Statut du suivi</label>
            <select id="client-status" name="status" defaultValue={status ?? ""} className="mt-2 w-full rounded-lg border border-foreground/40 bg-background p-3">
              <option value="">Non suivi</option>
              {followUpStatuses.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="client-note" className="block text-sm font-medium">Note de suivi</label>
            <textarea
              id="client-note"
              name="note"
              rows={4}
              maxLength={500}
              defaultValue={note ?? ""}
              placeholder="Ajouter une note de suivi…"
              className="mt-2 w-full rounded-lg border border-foreground/40 bg-background p-3 placeholder:text-foreground/70"
            />
          </div>

          {state.error && <p role="alert" className="text-sm font-medium text-red-700">{state.error}</p>}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-lg border border-foreground/40 px-4 py-3 font-medium">
              Annuler
            </button>
            <button type="submit" disabled={pending} className="rounded-lg bg-primary px-4 py-3 font-medium text-white disabled:opacity-60">
              {pending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
