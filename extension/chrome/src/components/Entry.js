// @flow

import React, { Fragment } from 'react';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

type EntryProps = {
  entry: TempTimePropertyType;
};

function Entry({ entry }: EntryProps) {
  const { start, end, tracking } = entry;

  const duration = (end - start) / 1000;

  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');

  const Duration = (
    <Fragment>
      {hours}
      :
      {minutes}
      :
      {seconds}
    </Fragment>
  );

  return (
    <div>
      <Icon name="stopwatch" color={tracking ? 'blue' : 'black'} />
      {Duration}
    </div>
  );
}

export default Entry;
