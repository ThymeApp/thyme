// @flow

import React, { lazy, Suspense } from 'react';

import Loading from 'components/Loading';

const TimeSheet = lazy(() => import('./TimeSheet.js'));

function TimeSheetPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TimeSheet />
    </Suspense>
  );
}

export default TimeSheetPage;
