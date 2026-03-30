// src/lib/crous/client.ts
// Thin fetch wrapper for the CROUS API.
// All response mapping happens here before reaching services.

const BASE_URL = process.env.CROUS_API_URL ?? 'https://api.crous-bordeaux.fr';

export async function crousFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 3600 }, // ISR cache
  });

  if (!res.ok) {
    throw new Error(`CROUS API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
