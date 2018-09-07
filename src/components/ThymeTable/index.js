// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import { updateTime, removeTime } from '../../actions/time';
import { addProject } from '../../actions/projects';

import { getDateSort } from '../../selectors/time';

import NewTime from './New';
import Entry from './Entry';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';

type ThymeTableType = {
  sort: sortDirection;
  entries: Array<timeType>;
  now: Date;
  onEntryUpdate: (entry: timePropertyType) => void;
  onEntryRemove: (id: string) => void;
  onAddProject: (project: string) => string;
};

function ThymeTable({
  sort,
  entries,
  now,
  onEntryUpdate,
  onEntryRemove,
  onAddProject,
}: ThymeTableType) {
  const New = (
    <NewTime
      now={now}
      onAddNewProject={onAddProject}
    />
  );

  const Entries = (
    <Fragment>
      {sort === 'desc' && New}
      {entries.map(entry => (
        <Entry
          key={entry.id}
          onRemove={onEntryRemove}
          onUpdate={onEntryUpdate}
          onAddNewProject={onAddProject}
          entry={entry}
          now={now}
        />
      ))}
      {sort === 'asc' && New}
    </Fragment>
  );

  const TableContent = (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Date
          </Table.HeaderCell>
          <Table.HeaderCell>
            Start
          </Table.HeaderCell>
          <Table.HeaderCell>
            End
          </Table.HeaderCell>
          <Table.HeaderCell>
            Duration
          </Table.HeaderCell>
          <Table.HeaderCell>
            Project
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={2}>
            Notes
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Entries}
      </Table.Body>
    </Table>
  );

  return (
    <Fragment>
      <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth} />
      <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
        {TableContent}
      </Responsive>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    sort: getDateSort(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEntryUpdate(entry) {
      dispatch(updateTime(entry));
    },
    onEntryRemove(id) {
      dispatch(removeTime(id));
    },
    onAddProject(project) {
      const newProjectAction = addProject({ parent: null, name: project });

      dispatch(newProjectAction);

      return newProjectAction.id;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThymeTable);
