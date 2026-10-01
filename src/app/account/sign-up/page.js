import { Suspense } from 'react';
import SignUpView from '@/components/account/SignUpView';

export const metadata = { title: 'Create account', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <SignUpView />
    </Suspense>
  );
}
