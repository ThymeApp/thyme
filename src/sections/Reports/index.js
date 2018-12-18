// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Reports = lazy(() => import('./Reports.js'));

function SettingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Reports />
    </Suspense>
  );
}

export default SettingsPage;
