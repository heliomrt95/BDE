// src/app/merch/page.tsx — Merch shop (route: /merch)

import { getProducts } from '@/services/merchService';
import ProductCard from '@/components/features/merch/ProductCard';
import PageWrapper from '@/components/layout/PageWrapper';

export default async function MerchPage() {
  const products = await getProducts();

  return (
    <PageWrapper>
      <h1>Boutique BDE</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
