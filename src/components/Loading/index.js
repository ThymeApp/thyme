// @flow

import React from 'react';

import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';

type LoadingType = {
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive',
  noPadding?: boolean;
};

function Loading({ size, noPadding }: LoadingType) {
  return (
    <div style={{ padding: noPadding ? '' : '5em 0' }}>
      <Loader active inline="centered" size={size || 'massive'} />
    </div>
  );
}

export default Loading;
