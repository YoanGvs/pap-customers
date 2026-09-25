export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <h1 className="text-2xl font-bold">Vue d’ensemble</h1>

      <section className="mt-6 flex flex-col gap-4 md:flex-row">
        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Chiffre d’affaires</p>
          <p className="mt-2 text-3xl font-bold text-primary">12 450 €</p>
        </article>

        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Clients</p>
          <p className="mt-2 text-3xl font-bold text-primary">128</p>
        </article>

        <article className="flex-1 rounded-xl bg-surface p-6">
          <p className="text-sm">Commandes</p>
          <p className="mt-2 text-3xl font-bold text-primary">342</p>
        </article>
      </section>
    </main>
  );
}
