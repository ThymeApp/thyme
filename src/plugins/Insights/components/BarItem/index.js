// @flow

import React from 'react';

import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { formatDuration } from 'core/thyme';
import { treeDisplayName } from 'core/projects';

import './BarItem.css';

type BarItemProps = {
  project: ProjectTreeWithTimeType & { colour: string };
  hours: number;
  barHeight: number;
};

function BarItem({ project, hours, barHeight }: BarItemProps) {
  return (
    <Popup
      position="right center"
      inverted
      horizontalOffset={3}
      trigger={(
        <div
          className="Insights__Bar"
          key={project.id}
          style={{
            height: (barHeight * (project.time / (hours * 60)) - 4),
            backgroundColor: project.colour,
          }}
        />
      )}
    >
      {treeDisplayName(project)}
      {` (${formatDuration(project.time * 60)})`}
    </Popup>
  );
}

export default BarItem;
