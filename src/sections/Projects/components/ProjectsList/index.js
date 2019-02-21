// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import { render as renderComponent } from 'register/component';

import { useResponsive } from 'components/Responsive';

import ProjectsList from './ProjectsList';

type ProjectsListWrapperProps = {
  projects: ProjectTreeType[];
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
  onChangeParent: (project: ProjectTreeType, parent: string | null) => void;
};

function ProjectsListWrapper(props: ProjectsListWrapperProps) {
  const {
    projects,
    onUpdateProject,
    onRemoveProject,
    onArchiveProject,
    onChangeParent,
  } = props;
  const [isMinTablet] = useResponsive({ min: 'tablet' });

  if (projects.length === 0) {
    return (
      <div className="ProjectList--empty">
        No projects added yet, add projects using above form.
      </div>
    );
  }

  return (
    <Table>
      {isMinTablet && (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            {renderComponent('projects.tableheader.name', props)}
            <Table.HeaderCell width={5}>
              Parent
            </Table.HeaderCell>
            {renderComponent('projects.tableheader.parent', props)}
            <Table.HeaderCell width={1}>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        <ProjectsList
          onUpdateProject={onUpdateProject}
          onRemoveProject={onRemoveProject}
          onArchiveProject={onArchiveProject}
          onChangeParent={onChangeParent}
        />
      </Table.Body>
    </Table>
  );
}

export default ProjectsListWrapper;
