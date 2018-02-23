// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';

import './SavedReports.css';

function SavedReports() {
  return (
    <div className="SavedReports">
      <div className="SavedReports__new">
        <Input
          name="report-name"
          type="text"
          placeholder="Report name"
          value=""
          onChange={() => {}}
          onKeyPress={() => {}}
          style={{ marginRight: 12 }}
        />
        <Button color="blue">Save this report</Button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(null, mapDispatchToProps)(SavedReports);
