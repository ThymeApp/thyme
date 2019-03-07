// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';

import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import { sortByTime, timeElapsed } from 'core/thyme';
import { treeDisplayName } from 'core/projects';

import { create as createTable } from 'register/table';

import './ReportDetailed.css';

type ReportDetailedType = {
  enabledEndDate: boolean;
  round: Rounding;
  roundAmount: number;
  projects: ProjectTreeWithTimeType[];
};

type ReportDetailedState = {
  opened: boolean;
};

const sortAsc = sortByTime('asc');

class ReportDetailed extends Component<ReportDetailedType, ReportDetailedState> {
  state = {
    opened: false,
  };

  toggleDetails = (e: Event, data: { checked: boolean }) => {
    this.setState({
      opened: data.checked,
    });
  };

  render() {
    const {
      round,
      roundAmount,
      projects,
      enabledEndDate,
    } = this.props;
    const { opened } = this.state;

    const rows = projects
      .reduce((acc, project) => [
        ...acc,
        ...project.entries.map(entry => ({
          ...entry,
          project,
        })),
      ], [])
      .sort(sortAsc);

    if (rows.length === 0) {
      return null;
    }

    const reportTable = createTable(
      'reports.detailed', [
        {
          name: enabledEndDate ? 'Start Date' : 'Date',
          header: () => (enabledEndDate ? 'Start Date' : 'Date'),
          row: entry => format(entry.start, 'DD/MM/YYYY'),
          collapsing: true,
        },
        {
          name: 'Start',
          header: () => 'Start',
          row: entry => format(entry.start, 'HH:mm'),
          collapsing: true,
        },
        enabledEndDate ? {
          name: 'End Date',
          header: () => 'End Date',
          row: entry => format(entry.end, 'DD/MM/YYYY'),
          collapsing: true,
        } : null,
        {
          name: 'End',
          header: () => 'End',
          row: entry => format(entry.end, 'HH:mm'),
          collapsing: true,
        },
        {
          name: 'Duration',
          header: () => 'Duration',
          row: entry => timeElapsed(
            entry.start,
            entry.end,
            false,
            false,
            round,
            roundAmount,
          ),
          textAlign: 'right',
          collapsing: true,
        },
        {
          name: 'Project',
          header: () => 'Project',
          row: entry => treeDisplayName(entry.project),
          collapsing: true,
        },
        {
          name: 'Notes',
          header: () => 'Notes',
          row: entry => entry.notes,
        },
      ],
      rows,
    );

    return (
      <section className="ReportDetailed">
        <div className="ReportDetailed__toggle">
          <Checkbox
            label="Detailed view"
            toggle
            checked={opened}
            onChange={this.toggleDetails}
            style={opened ? { marginRight: '2em' } : {}}
          />

          {opened && reportTable.filters}
        </div>

        {opened && reportTable.table}
      </section>
    );
  }
}

export default ReportDetailed;
