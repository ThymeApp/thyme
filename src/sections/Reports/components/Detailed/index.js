// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';

import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import { timeElapsed } from 'core/thyme';
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

    const rows = projects.reduce((acc, project) => [
      ...acc,
      ...project.entries.map(entry => ({
        ...entry,
        project,
      })),
    ], []);

    if (rows.length === 0) {
      return null;
    }

    const reportTable = createTable(
      'reports.detailed', [
        {
          name: enabledEndDate ? 'Start Date' : 'Date',
          header: () => (enabledEndDate ? 'Start Date' : 'Date'),
          row: entry => format(entry.start, 'DD/MM/YYYY'),
        },
        {
          name: 'Start',
          header: () => 'Start',
          row: entry => format(entry.start, 'HH:mm'),
        },
        enabledEndDate ? {
          name: 'End Date',
          header: () => 'End Date',
          row: entry => format(entry.end, 'DD/MM/YYYY'),
        } : null,
        {
          name: 'End',
          header: () => 'End',
          row: entry => format(entry.end, 'HH:mm'),
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
        },
        {
          name: 'Project',
          header: () => 'Project',
          row: entry => treeDisplayName(entry.project),
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
