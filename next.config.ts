import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimisation des images (ajouter les domaines autorisés ici)
  images: {
    remotePatterns: [
      // Supabase Storage (à configurer quand Supabase sera branché)
      // { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // Redirection future possible vers l'API CROUS
  async rewrites() {
    return [];
  },
};

export default nextConfig;
