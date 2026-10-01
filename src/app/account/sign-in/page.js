import { Suspense } from 'react';
import SignInView from '@/components/account/SignInView';

export const metadata = { title: 'Sign in', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <SignInView />
    </Suspense>
  );
}
