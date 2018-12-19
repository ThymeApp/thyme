// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const Settings = lazy(() => import('./Settings.js'));

function SettingsPage(props: any) {
  return (
    <Suspense fallback={<Loading />}>
      <Settings {...props} />
    </Suspense>
  );
}

export default SettingsPage;
