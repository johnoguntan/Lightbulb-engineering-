import { Suspense } from 'react';
import ResetPasswordView from '@/components/account/ResetPasswordView';

export const metadata = { title: 'Choose a new password', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordView />
    </Suspense>
  );
}
