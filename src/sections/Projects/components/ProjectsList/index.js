// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import Responsive from 'components/Responsive';

import ProjectsList from './ProjectsList';

type ProjectsListWrapperProps = {
  canAddRates: boolean;
  projects: Array<projectTreeType>;
};

function ProjectsListWrapper({ canAddRates, projects }: ProjectsListWrapperProps) {
  return (
    <Table>
      <Responsive min="tablet">
        {matched => matched && (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell width={5}>
                Parent
              </Table.HeaderCell>
              {canAddRates && (
                <Table.HeaderCell width={3}>
                  Hourly Rate
                </Table.HeaderCell>
              )}
              <Table.HeaderCell width={1}>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        )}
      </Responsive>
      <Table.Body>
        <ProjectsList canAddRates={canAddRates} projects={projects} />
      </Table.Body>
    </Table>
  );
}

export default ProjectsListWrapper;
