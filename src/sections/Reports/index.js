// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Reports = lazy(() => import('./Reports.js'));

function SettingsPage(props: any) {
  return (
    <Suspense fallback={<Loading />}>
      <Reports {...props} />
    </Suspense>
  );
}

export default SettingsPage;
