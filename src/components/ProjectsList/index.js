// @flow

import React from 'react';

import ProjectsList from './ProjectsList';

function projectsListWrapper({ projects }: { projects: Array<projectTreeType> }) {
  return (
    <table className="ProjectList">
      <tbody>
        <tr className="ProjectList__header">
          <th>Name</th>
          <th>Parent</th>
          <th />
        </tr>
        <ProjectsList projects={projects} />
      </tbody>
    </table>
  );
}

export default projectsListWrapper;
