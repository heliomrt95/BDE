// src/app/error.tsx — Global error boundary (Client Component required)

'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main>
      <h1>Une erreur est survenue</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Réessayer</button>
    </main>
  );
}
