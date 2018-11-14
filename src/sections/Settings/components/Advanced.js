// @flow

import React, { Component } from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

class AdvancedSettings extends Component<*> {
  render() {
    return (
      <Message
        warning
        icon="warning"
        header="Attention"
        content="The following settings are for advanced users / developers only. Adjust these at your own risk."
      />
    );
  }
}

export default AdvancedSettings;
