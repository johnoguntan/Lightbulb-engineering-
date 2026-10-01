import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS, findProductBySlug } from '@/data/products';
import DynamicPdpView from '@/components/prototype/DynamicPdpView';

// Only the slugs in the catalog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function PdpSlugPage({ params }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();
  // Suspense lets the page stay static while the colour is read from ?colour=.
  return (
    <Suspense>
      <DynamicPdpView product={product} />
    </Suspense>
  );
}
