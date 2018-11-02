// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import { formatDuration } from 'core/thyme';
import { render as renderComponent } from 'register/component';

export type ReportTableProps = {
  projects: projectTreeWithTimeType[];
  hideColumns: Array<string | null>;
};

function ReportTable(props: ReportTableProps) {
  const { projects, hideColumns } = props;

  const showProject = hideColumns.indexOf('project') === -1;
  const showTotal = hideColumns.indexOf('total') === -1;

  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          {showProject && (
            <Table.HeaderCell>
              Project
            </Table.HeaderCell>
          )}
          {renderComponent('reports.tableheader.project', props)}
          {showTotal && (
            <Table.HeaderCell textAlign="right" width={2} style={{ whiteSpace: 'nowrap' }}>
              Total spent
            </Table.HeaderCell>
          )}
          {renderComponent('reports.tableheader.total', props)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {projects.map(project => (
          <Table.Row key={project.id}>
            {showProject && (
              <Table.Cell>
                {project.nameTree.join(' > ')}
              </Table.Cell>
            )}
            {renderComponent('reports.tablerow.project', { ...props, project })}
            {showTotal && (
              <Table.Cell textAlign="right">
                {formatDuration(project.time * 60)}
              </Table.Cell>
            )}
            {renderComponent('reports.tablerow.total', { ...props, project })}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          {showProject && <Table.HeaderCell />}
          {renderComponent('reports.tablefooter.project', props)}
          {showTotal && (
            <Table.HeaderCell textAlign="right">
              {formatDuration(projects.reduce((total, project) => total + (project.time * 60), 0))}
            </Table.HeaderCell>
          )}
          {renderComponent('reports.tablefooter.total', props)}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export default ReportTable;
