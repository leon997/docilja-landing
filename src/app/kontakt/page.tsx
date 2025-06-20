"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KontaktPage() {
  const router = useRouter();

  useEffect(() => {
    // Popravi zgodovino brskalnika
    if (window.history.state && window.history.state.idx === 0) {
      router.replace('/');
    }
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 mt-32">
      <h1 className="text-2xl font-bold mb-4">Kontaktirajte nas</h1>
      <form
      
        action="mailto:info@2dest.com"
        method="POST"
        encType="text/plain"
        className="flex flex-col gap-4"
      >
        {/* Ostali form elementi ostanejo enaki */}
        <input
          type="text"
          name="ime in priimek"
          placeholder="Ime in Priimek"
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