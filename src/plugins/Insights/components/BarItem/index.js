// @flow

import React, { Component } from 'react';

import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { formatDuration } from 'core/thyme';

import './BarItem.css';

type BarItemProps = {
  project: {
    id: string;
    name: string;
    nameTree: string[];
    colour: string;
    time: number;
  };
  hours: number;
  barHeight: number;
};

class BarItem extends Component<BarItemProps> {
  render() {
    const { project, hours, barHeight } = this.props;

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
        {project.nameTree.join(' > ')}
        {` (${formatDuration(project.time * 60)})`}
      </Popup>
    );
  }
}

export default BarItem;
