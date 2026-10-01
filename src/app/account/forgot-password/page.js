import { Suspense } from 'react';
import ForgotPasswordView from '@/components/account/ForgotPasswordView';

export const metadata = { title: 'Reset password', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <ForgotPasswordView />
    </Suspense>
  );
}
