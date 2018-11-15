// @flow

import React from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { changeDateSort } from '../../actions';

import { getDateSort } from '../../selectors';

type DateSortType = {
  sort: SortDirection;
  toggleSorting: (sort: SortDirection) => void;
};

function DateSort({ sort, toggleSorting }: DateSortType) {
  return (
    <div className="DateSort">
      <Button
        onClick={() => toggleSorting(sort)}
        labelPosition="left"
        content={sort === 'asc' ? 'Oldest first' : 'Newest first'}
        icon={sort === 'asc' ? 'caret down' : 'caret up'}
      />
    </div>
  );
}

function mapStateToProps(state: StateShape) {
  return {
    sort: getDateSort(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    toggleSorting(sort: SortDirection) {
      dispatch(changeDateSort(sort === 'asc' ? 'desc' : 'asc'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSort);
