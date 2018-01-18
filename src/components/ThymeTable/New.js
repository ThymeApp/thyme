// @flow

import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTime } from '../../actions/time';

import Entry from './Entry';

type NewType = {
  onEntryCreate: (entry: timePropertyType) => void,
};

function New({ onEntryCreate }: NewType) {
  return (
    <table className="ThymeTable">
      <tbody>
        <Entry onAdd={onEntryCreate} />
      </tbody>
    </table>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onEntryCreate(entry: timePropertyType) {
      dispatch(addTime({
        ...entry,
        id: shortid.generate(),
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(New);
