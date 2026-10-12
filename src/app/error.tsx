"use client";

// Le détail de l'erreur est déjà dans les logs du serveur
export default function Error({ retry }: { retry: () => void }) {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <div role="alert">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="mt-4">Les données n’ont pas pu être chargées.</p>
      </div>
      <button type="button" onClick={() => retry()} className="mt-4 rounded-lg bg-primary px-4 py-3 font-medium text-white">
        Réessayer
      </button>
    </main>
  );
}
