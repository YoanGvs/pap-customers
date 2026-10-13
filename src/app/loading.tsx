export default function Loading() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <p role="status" className="animate-pulse">Chargement…</p>
    </main>
  );
}
