// @flow

import React from 'react';
import { connect } from 'react-redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { changeDateSort } from '../../actions/time';

import { getDateSort } from '../../selectors/time';

type DateSortType = {
  sort: sortDirection;
  toggleSorting: (sort: sortDirection) => void;
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

function mapStateToProps(state) {
  return {
    sort: getDateSort(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSorting(sort: sortDirection) {
      dispatch(changeDateSort(sort === 'asc' ? 'desc' : 'asc'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSort);
