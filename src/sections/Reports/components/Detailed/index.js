// @flow

import React, { useState, useCallback } from 'react';
import format from 'date-fns/format';

import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import { sortByTime, timeElapsed } from 'core/thyme';
import { treeDisplayName } from 'core/projects';

import { create as createTable } from 'register/table';

import './ReportDetailed.css';

type ReportDetailedProps = {
  enabledEndDate: boolean;
  round: Rounding;
  roundAmount: number;
  projects: ProjectTreeWithTimeType[];
};

const sortAsc = sortByTime('asc');

function ReportDetailed({
  round,
  roundAmount,
  projects,
  enabledEndDate,
}: ReportDetailedProps) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDetails = useCallback(
    (e: Event, data: { checked: boolean }) => setIsOpened(data.checked),
    [],
  );

  const rows = projects
    .reduce((acc, project) => [
      ...acc,
      ...project.entries.map((entry) => ({
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
        row: (entry) => format(entry.start, 'DD/MM/YYYY'),
        collapsing: true,
      },
      {
        name: 'Start',
        header: () => 'Start',
        row: (entry) => format(entry.start, 'HH:mm'),
        collapsing: true,
      },
      enabledEndDate ? {
        name: 'End Date',
        header: () => 'End Date',
        row: (entry) => format(entry.end, 'DD/MM/YYYY'),
        collapsing: true,
      } : null,
      {
        name: 'End',
        header: () => 'End',
        row: (entry) => format(entry.end, 'HH:mm'),
        collapsing: true,
      },
      {
        name: 'Duration',
        header: () => 'Duration',
        row: (entry) => timeElapsed(
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
        row: (entry) => treeDisplayName(entry.project),
        collapsing: true,
      },
      {
        name: 'Notes',
        header: () => 'Notes',
        row: (entry) => entry.notes,
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
          checked={isOpened}
          onChange={toggleDetails}
          style={isOpened ? { marginRight: '2em' } : {}}
        />

        {isOpened && reportTable.filters}
      </div>

      {isOpened && reportTable.table}
    </section>
  );
}

export default ReportDetailed;
