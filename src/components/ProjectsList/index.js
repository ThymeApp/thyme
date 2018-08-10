// @flow

import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import ProjectsList from './ProjectsList';

function projectsListWrapper({ projects }: { projects: Array<projectTreeType> }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Name
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={2}>
            Parent
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <ProjectsList projects={projects} />
      </Table.Body>
    </Table>
  );
}

export default projectsListWrapper;
