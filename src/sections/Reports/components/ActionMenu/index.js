// @flow

import React, { Component } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import './ActionMenu.css';

class ActionMenu extends Component<*> {
  print = () => {
    window.print();
  };

  render() {
    const hasPrint = !!window.print;

    return (
      <section className="Report__ActionMenu">
        <Popup
          inverted
          position="bottom right"
          trigger={(
            <Button icon="save" />
          )}
          content="Save current report"
        />

        <Popup
          inverted
          position="bottom right"
          trigger={(
            <Button icon="folder open" />
          )}
          content="Load a report"
        />

        {hasPrint && (
          <Popup
            inverted
            position="bottom right"
            trigger={(
              <Button onClick={this.print} icon="print" />
            )}
            content="Print this report"
          />
        )}
      </section>
    );
  }
}

export default ActionMenu;
