import { Suspense } from 'react';
import AccountView from '@/components/account/AccountView';

export const metadata = { title: 'Your account', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <AccountView />
    </Suspense>
  );
}
