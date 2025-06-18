export default function KontaktPage() {
  return (
    <main className="max-w-xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Kontaktirajte nas</h1>
      <form
        action="mailto:info@2dest.com"
        method="POST"
        encType="text/plain"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="ime"
          placeholder="Ime"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="priimek"
          placeholder="Priimek"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="E-pošta"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="sporocilo"
          placeholder="Vaše vprašanje"
          rows={5}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-accent"
        >
          Pošlji
        </button>
      </form>
    </main>
  );
}
