// @flow

import React from 'react';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import './Entry.css';

type EntryProps = {
  entry: TempTimePropertyType;
  onStart: () => void;
  onStop: () => void;
  onAdd: () => void;
};

function Entry({
  entry,
  onStart,
  onStop,
  onAdd,
}: EntryProps) {
  const { start, end, tracking } = entry;

  const duration = (end - start) / 1000;

  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');

  const Duration = (
    <div className="Entry__Duration">
      <Icon name="stopwatch" color={tracking ? 'blue' : 'black'} />
      {hours}
      :
      {minutes}
      :
      {seconds}
    </div>
  );

  return (
    <div className="Entry">
      {Duration}

      <Button.Group size="large" vertical>
        <Button
          icon
          color="blue"
          onClick={tracking ? onStop : onStart}
          labelPosition="left"
        >
          <Icon name={tracking ? 'pause' : 'play'} />
          {tracking ? 'Stop tracking time' : 'Start time tracking'}
        </Button>
        <Button
          className="EntrySubmit"
          icon
          onClick={onAdd}
          labelPosition="left"
        >
          <Icon name="add" />
          Add this entry
        </Button>
      </Button.Group>
    </div>
  );
}

export default Entry;
