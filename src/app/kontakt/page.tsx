'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KontaktPage() {
  const [status, setStatus] = useState('idle');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch('https://formspree.io/f/xvgrwaby', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setStatus('success');
      router.push('/'); // ali katera koli druga stran (npr. /hvala)
    } else {
      setStatus('error');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 mt-32">
      <h1 className="text-2xl font-bold mb-4">Kontaktirajte nas</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {status === 'success' && (
          <p className="text-green-600">Sporočilo uspešno poslano. Preusmerjam...</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Prišlo je do napake. Poskusite znova.</p>
        )}
      </form>
    </main>
  );
}
