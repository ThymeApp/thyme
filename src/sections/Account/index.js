// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Account = lazy(() => import('./Account.js'));

function SettingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Account />
    </Suspense>
  );
}

export default SettingsPage;
