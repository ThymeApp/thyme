// @flow

import React, { Fragment } from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';

import ProjectsList from './ProjectsList';

function projectsListWrapper({ projects }: { projects: Array<projectTreeType> }) {
  return (
    <Table>
      <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={2} width={6}>
              Parent
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Responsive>
      <Table.Body>
        <ProjectsList projects={projects} />
      </Table.Body>
    </Table>
  );
}

export default projectsListWrapper;
