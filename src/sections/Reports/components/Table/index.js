// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import { formatDuration } from 'core/thyme';
import { renderInjectable } from 'core/injectableComponent';

export type ReportTableProps = {
  projects: Array<projectTreeWithTimeType>,
};

function ReportTable(props: ReportTableProps) {
  const { projects } = props;

  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Project
          </Table.HeaderCell>
          {renderInjectable('reports.tableheader.project', props)}
          <Table.HeaderCell width={2} style={{ whiteSpace: 'nowrap' }}>
            Total spent
          </Table.HeaderCell>
          {renderInjectable('reports.tableheader.total', props)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {projects.map(project => (
          <Table.Row key={project.id}>
            <Table.Cell>
              {project.nameTree.join(' > ')}
            </Table.Cell>
            {renderInjectable('reports.tablerow.project', { project })}
            <Table.Cell textAlign="right">
              {formatDuration(project.time * 60)}
            </Table.Cell>
            {renderInjectable('reports.tablerow.total', { project })}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell />
          {renderInjectable('reports.tablefooter.project', props)}
          <Table.HeaderCell textAlign="right">
            {formatDuration(projects.reduce((total, project) => total + (project.time * 60), 0))}
          </Table.HeaderCell>
          {renderInjectable('reports.tablefooter.total', props)}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export default ReportTable;
