// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Settings = lazy(() => import('./Settings.js'));

function SettingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Settings />
    </Suspense>
  );
}

export default SettingsPage;
