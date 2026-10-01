import { Suspense } from 'react';
import CatalogView from '@/components/prototype/CatalogView';

export const metadata = { title: 'Bags & Carry' };

export default function Page() {
  return (
    <Suspense>
      <CatalogView />
    </Suspense>
  );
}
