'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold mb-4">Nešto je pošlo po zlu 😬</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Pokušaj ponovno
      </button>
    </div>
  );
}