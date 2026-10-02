import Link from "next/link";

export default function CustomerNotFound() {
  return (
    <main id="contenu" tabIndex={-1} className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Client introuvable</h1>
      <p className="mt-4">Aucun client ne correspond à cette adresse.</p>
      <Link href="/clients" className="mt-4 inline-block py-2 text-primary underline underline-offset-4">
        Retour aux clients
      </Link>
    </main>
  );
}
