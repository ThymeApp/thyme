// @flow

import React from 'react';

import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';

function Loading() {
  return (
    <div style={{ padding: '5em 0' }}>
      <Loader active inline="centered" size="massive" />
    </div>
  );
}

export default Loading;
